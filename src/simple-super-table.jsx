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
  renderCol: R.curry((rowData, primaryKey, onColumnClickHandler, colKey) => {
    return (
      <td
        key={colKey}
        onClick={onColumnClickHandler}
        data-col-key={colKey}
        data-primary-key={primaryKey}
        >{rowData[colKey]}</td>
    );
  }),

  // :: ((Object) -> String) -> [String] -> Object -> ReactElement
  renderRow: R.curry((primaryKeyGen, colKeys, onRowClickHandler, onColumnClickHandler, rowData) => {
    return (
      <tr
        key={primaryKeyGen(rowData)}
        data-primary-key={primaryKeyGen(rowData)}
        onClick={onRowClickHandler}
      >{R.map(renderHelpers.renderCol(rowData, primaryKeyGen(rowData), onColumnClickHandler))(colKeys)}</tr>
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
    onRowClick: T.func,
    onColumnClick: T.func,
  },

  getDefaultProps: function() {
    return {
      defaultSortAscending: true,
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

  handleRowClick: function(e) {
    if (!R.isNil(this.props.onRowClick)) {
      const primaryKey = e.currentTarget.getAttribute('data-primary-key');
      const foundRow = R.find((d) => R.equals(primaryKey, this.props.primaryKeyGen(d)))(this.props.data);
      if (!R.isNil(foundRow)) {
        this.props.onRowClick(foundRow);
      }
    }
  },

  handleColumnClick: function(e) {
    if (!R.isNil(this.props.onColumnClick)) {
      e.stopPropagation()
      const colKey = e.currentTarget.getAttribute('data-col-key');
      const primaryKey = e.currentTarget.getAttribute('data-primary-key');
      const foundRow = R.find((d) => R.equals(primaryKey, this.props.primaryKeyGen(d)))(this.props.data);
      if (!R.isNil(foundRow)) {
        this.props.onColumnClick(foundRow[colKey], foundRow, colKey);
      }
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
            {R.map(renderHelpers.renderRow(this.props.primaryKeyGen, colKeys, this.handleRowClick, this.handleColumnClick))(sortedFilteredData)}
          </tbody>
        </table>
      </div>
    );
  },
});

export default SimpleSuperTable;
