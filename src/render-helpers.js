const React = require('react');
const R = require('ramda');

const SortIcon = require('./svg/sort-icon');

// :: fn -> [String] -> String -> Bool -> {k : v} -> ReactElement
const renderHeader = function renderHeader(columnWidths, onClickHandler, sortableColKeys, sortColKey, sortAscending) {
  return (column) => {
    const colKey = R.head(R.keys(column));
    const sortable = R.contains(colKey, sortableColKeys) ? 'sortable' : '';
    const sorted = colKey === sortColKey ? `sorted ${sortAscending ? 'asc' : 'desc'}` : '';
    const sortIcon = sortable ?
      <SortIcon size={12.5} sorted={colKey === sortColKey} ascending={sortAscending}/> : null;

    return (
      <div
        key={colKey}
        style={{minWidth: columnWidths[colKey], maxWidth: columnWidths[colKey]}}
        className={`col ${colKey} ${sortable} ${sorted}`}
        onClick={onClickHandler}
        data-col-key={colKey}
      >
        <div className="content">
          <div className="header">{column[colKey]}</div>
          <div className="sort-icon-container">{sortIcon}</div>
        </div>
      </div>
    );
  };
};

// :: Object -> String -> fn -> String -> fn -> {k: fn} -> filterText -> ReactElement
const renderCol = function renderCol(rowData, columnWidths, primaryKey, onColumnClickHandler, columnClassGetter, columnRenderers, filterText) {
  // TODO: onClick
  return (colKey) => {
    return (
      <div
        key={colKey}
        style={{minWidth: columnWidths[colKey], maxWidth: columnWidths[colKey]}}
        className={`col ${colKey} ${columnClassGetter(rowData[colKey], rowData, colKey)}`}
        data-col-key={colKey}
        data-primary-key={primaryKey}
      >
        <div
          className="content">{R.has(colKey, columnRenderers) ? columnRenderers[colKey](rowData[colKey], rowData, colKey, filterText) : R.ifElse(R.anyPass([R.isNil, R.isEmpty]), R.always('-'), (_) => _)(rowData[colKey])}</div>
      </div>
    );
  };
};

// :: ((Object) -> String) -> [String] -> fn -> fn -> fn -> fn -> {k: fn} -> Object -> String -> ReactElement
const renderRow = function renderRow(primaryKeyGen, colKeys, columnWidths, onRowClickHandler, onColumnClickHandler, rowClassGetter, columnClassGetter, columnRenderers, filterText) {
  // TODO: onClick
  return (rowData) => {
    const totalWidth = R.reduce(R.add)(0)(R.values(columnWidths));

    return (
      <div
        key={primaryKeyGen(rowData)}
        className={`row ${rowClassGetter(rowData)}`}
        style={{minWidth: totalWidth}}
        data-primary-key={primaryKeyGen(rowData)}
      >{R.map(renderCol(
        rowData,
        columnWidths,
        primaryKeyGen(rowData),
        onColumnClickHandler,
        columnClassGetter,
        columnRenderers,
        filterText
        ))(colKeys)}</div>
    );
  };
};

module.exports = {
  renderHeader,
  renderCol,
  renderRow,
};
