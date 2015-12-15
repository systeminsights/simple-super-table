import React from 'react';
const T = React.PropTypes;
import R from 'ramda';

import renderHelpers from './render-helpers';

const extractSpannedColumns = function extractSpannedColumns(columnsWithSpans) {
  const spannedColumns = [];
  const columns = R.mapIndexed((c, i) => {
    if (R.has('span', c)) {
      spannedColumns.push({
        label: c.span,
        spanLength: c.columns.length,
        position: R.last(spannedColumns) ? (i - R.last(spannedColumns).position) + (R.last(spannedColumns).position + R.last(spannedColumns).spanLength - 1) : i,
      });
      return c.columns;
    }

    return c;
  })(columnsWithSpans);

  return {
    spannedColumns: spannedColumns,
    columns: R.flatten(columns),
  };
};

const Header = React.createClass({
  propTypes: {
    columns: T.array.isRequired,
    columnWidths: T.object.isRequired,
    sortableColumns: T.array.isRequired,
    sortColKey: T.string.isRequired,
    sortAscending: T.bool.isRequired,
    onHeaderClick: T.func.isRequired,
  },

  render: function render() {
    const {columns} = extractSpannedColumns(this.props.columns);

    return (
      <div className="table-header">
        <div className="row">
          {R.map((c) => {
            const width = R.has('span', c) ? R.compose(
              R.reduce(R.add)(0),
              R.map((keys) => this.props.columnWidths[R.head(keys)]),
              R.map(R.keys))(c.columns) : this.props.columnWidths[R.head(R.keys(c))];

            return (
              <div key={R.has('span', c) ? c.span : R.head(R.keys(c))}
                   className="col"
                   style={{minWidth: width, maxWidth: width}}>
                <div className="content">
                  <div className="header">{R.has('span', c) ? c.span : ''}</div>
                </div>
              </div>
            );
          })(this.props.columns)}
        </div>
        <div className="row">
          {R.map(renderHelpers.renderHeader(
            this.props.columnWidths,
            this.props.onHeaderClick,
            this.props.sortableColumns,
            this.props.sortColKey,
            this.props.sortAscending
          ))(columns)}
        </div>
      </div>
    );
  },
});

export default Header;
