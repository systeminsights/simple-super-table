import React from 'react/addons';
const T = React.PropTypes;
const {LinkedStateMixin} = React.addons;
import R from 'ramda';

const dataHelpers = {
  // :: Ord[{k : v}] -> Ord[k]
  extractColkeys: function(columns) {
    return R.compose(
      R.flatten,
      R.map(R.keys)
    )(columns);
  },

  // :: [String] -> String -> [Object] -> [Object]
  filterData: R.curry((filterByColKeys, filterText, data) => {
    return R.filter(R.compose(
        R.match(new RegExp(filterText, 'gi')),
        R.join(' '),
        R.map((v) => v.toString()),
        R.props(filterByColKeys)
    ))(data);
  }),

  // :: String -> Bool -> [Object] -> [Object]
  sortData: R.curry((colKey, sortAscending, data) => {
    const sortedData = R.sortBy(R.prop(colKey))(data);
    return sortAscending ? sortedData : R.reverse(sortedData);
  }),
};

const renderHelpers = {
  // :: {k : v} -> ReactElement
  renderHeader: R.curry((onClickHandler, column) => {
    const colKey = R.head(R.keys(column));
    return (
      <th
        key={colKey}
        onClick={onClickHandler}
        data-col-key={colKey}
      >{column[colKey]}</th>
    );
  }),

  // :: String -> String -> ReactElement
  renderCol: R.curry((rowData, colKey) => {
    return <td key={colKey}>{rowData[colKey]}</td>;
  }),

  // :: ((Object) -> String) -> [String] -> Object -> ReactElement
  renderRow: R.curry((primaryKeyGen, colKeys, rowData) => {
    return (
      <tr key={primaryKeyGen(rowData)}>
        {R.map(renderHelpers.renderCol(rowData))(colKeys)}
      </tr>
    );
  }),
};

// TODO: use ES6 class syntax when an alternative for mixins is available.
const SimpleSuperTable = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    data: T.array.isRequired,
    columns: T.array.isRequired,
    primaryKeyGen: T.func.isRequired,
    filterableColumns: T.array,
    defaultSortColumn: T.string,
    defaultSortAscending: T.bool,
    sortableColumns: T.array,
  },

  getDefaultProps: function() {
    return {
      defaultSortAscending: true
    };
  },

  getInitialState: function() {
    const sortableColumns = R.isNil(this.props.sortableColumns) ?
      dataHelpers.extractColkeys(this.props.columns) : this.props.sortableColumns;

    return {
      filterText: '',
      sortColKey: R.isNil(this.props.defaultSortColumn) ? sortableColumns[0] : this.props.defaultSortColumn,
      sortAscending: this.props.defaultSortAscending,
    };
  },

  handleHeaderClick: function(e) {
    const colKey = e.currentTarget.getAttribute('data-col-key');
    if (R.isNil(this.props.sortableColumns) || R.contains(colKey, this.props.sortableColumns)) {
      this.setState({
        sortColKey: colKey,
        sortAscending: this.state.sortColKey === colKey ? !this.state.sortAscending : true,
      });
    }
  },

  render: function() {
    const colKeys = dataHelpers.extractColkeys(this.props.columns);
    const filterableColumns = R.isNil(this.props.filterableColumns) ? colKeys : this.props.filterableColumns;
    const filteredData = R.isEmpty(filterableColumns) ?
      this.props.data : dataHelpers.filterData(filterableColumns, this.state.filterText, this.props.data);
    const sortedFilteredData = dataHelpers.sortData(this.state.sortColKey, this.state.sortAscending, filteredData);

    const filterTextInput = R.isEmpty(filterableColumns) ?
      null : <input type="search" valueLink={this.linkState('filterText')} />;

    return (
      <div>
        {filterTextInput}
        <table>
          <thead>
          <tr>
            {R.map(renderHelpers.renderHeader(this.handleHeaderClick))(this.props.columns)}
          </tr>
          </thead>
          <tbody>
            {R.map(renderHelpers.renderRow(this.props.primaryKeyGen, colKeys))(sortedFilteredData)}
          </tbody>
        </table>
      </div>
    );
  },
});

export default SimpleSuperTable;
