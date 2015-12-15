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
    const {spannedColumns, columns} = extractSpannedColumns(this.props.columns);

    const rowForSpannedColumns = R.ifElse(
      R.isEmpty,
      () => null,
      () => {
        const paddedSpannedColumns = R.reduce((acc, next) => {
          if (R.isEmpty(acc) && next.position !== 0) {
            return R.concat([{
              label: '',
              position: 0,
              spanLength: next.position,
            }, next], acc);
          } else if (R.isEmpty(acc) && next.position === 0) {
            return R.append(next, acc);
          } else if (R.last(acc).position + R.last(acc).spanLength !== next.position) {
            return R.concat(acc, [{
              label: '',
              position: R.last(acc).position + R.last(acc).spanLength,
              spanLength: next.position - (R.last(acc).position + R.last(acc).spanLength),
            }, next]);
          }

          return R.append(next, acc);
        })([], spannedColumns);

        const rightPadding = R.ifElse(
          R.lt(R.__, columns.length),
          (len) => [{position: len, spanLength: columns.length - len}],
          () => []
        )(R.last(paddedSpannedColumns).position + R.last(paddedSpannedColumns).spanLength);

        return (
          <div className="row">
            {R.map((c) => {
              return (
                <div className="col"
                  key={c.position}
                  colSpan={c.spanLength}
                >{c.label}</div>
              );
            })(paddedSpannedColumns.concat(rightPadding))}
          </div>
        );
      }
    )(spannedColumns);

    return (
      <div className="table-header">
        {rowForSpannedColumns}
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
