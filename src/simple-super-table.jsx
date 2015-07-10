import React from 'react';
const T = React.PropTypes;
import R from 'ramda';

const dataHelpers = {
  // :: Ord[{k : v}] -> Ord[k]
  extractColkeys: function(columns) {
    return R.compose(
      R.flatten,
      R.map(R.keys)
    )(columns);
  },
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

class SimpleSuperTable extends React.Component {
  static propTypes = {
    data: T.array.isRequired,
    columns: T.array.isRequired,
    primaryKeyGen: T.func.isRequired,
  }

  render() {
    const colKeys = dataHelpers.extractColkeys(this.props.columns);

    return (
      <table>
        <thead>
          <tr>
            {R.map(renderHelpers.renderHeader, this.props.columns)}
          </tr>
        </thead>
        <tbody>
          {R.map(renderHelpers.renderRow(this.props.primaryKeyGen, colKeys))(this.props.data)}
        </tbody>
      </table>
    );
  }
}

export default SimpleSuperTable;
