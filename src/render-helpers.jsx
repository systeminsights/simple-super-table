import React from 'react';
import R from 'ramda';

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

export default renderHelpers;
