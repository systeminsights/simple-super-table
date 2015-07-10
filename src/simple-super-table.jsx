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
};

const renderHelpers = {
  // :: {k : v} -> ReactElement
  renderHeader: function(column) {
    const colKey = R.head(R.keys(column));
    return <th key={colKey}>{column[colKey]}</th>;
  },

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
    filterableColumns: T.array
  },

  getInitialState: function() {
    return {
      filterText: ''
    };
  },

  render: function() {
    const colKeys = dataHelpers.extractColkeys(this.props.columns);
    const filterableColumns = R.isNil(this.props.filterableColumns) ? colKeys : this.props.filterableColumns;
    const filteredData = R.isEmpty(filterableColumns) ?
      this.props.data : dataHelpers.filterData(filterableColumns, this.state.filterText, this.props.data);

    const filterTextInput = R.isEmpty(filterableColumns) ?
      null : <input type="search" valueLink={this.linkState('filterText')} />;

    return (
      <div>
        {filterTextInput}
        <table>
          <thead>
          <tr>
            {R.map(renderHelpers.renderHeader, this.props.columns)}
          </tr>
          </thead>
          <tbody>
            {R.map(renderHelpers.renderRow(this.props.primaryKeyGen, colKeys))(filteredData)}
          </tbody>
        </table>
      </div>
    );
  },
});

export default SimpleSuperTable;
