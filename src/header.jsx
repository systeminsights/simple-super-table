import React from 'react';
const T = React.PropTypes;
import R from 'ramda';

import renderHelpers from './render-helpers';

const extractSpannedColumns = function(columnsWithSpans) {
  let spannedColumns = [];
  const columns = R.mapIndexed((c, i) => {
    if (R.has('span', c)) {
      spannedColumns.push({
        label: c.span,
        spanLength: c.columns.length,
        position: R.last(spannedColumns) ? (i - R.last(spannedColumns).position) + (R.last(spannedColumns).position + R.last(spannedColumns).spanLength - 1) : i,
      });
      return c.columns;
    } else {
      return c;
    }
  })(columnsWithSpans);

  return {
    spannedColumns: spannedColumns,
    columns: R.flatten(columns),
  };
};

const Header = React.createClass({
  propTypes: {
    columns: T.array.isRequired,
    sortableColumns: T.array.isRequired,
    sortColKey: T.string.isRequired,
    sortAscending: T.bool.isRequired,
    onHeaderClick: T.func.isRequired,
  },

  render: function() {
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
          } else {
            return R.append(next, acc);
          }
        })([], spannedColumns);

        const rightPadding = R.ifElse(
          R.lt(R.__, columns.length),
          (len) => [{position: len, spanLength: columns.length - len}],
          () => []
        )(R.last(paddedSpannedColumns).position + R.last(paddedSpannedColumns).spanLength);

        return (
          <tr>
            {R.map((c) => {
              return (
                <th
                  key={c.position}
                  colSpan={c.spanLength}
                  >{c.label}</th>
              );
            })(paddedSpannedColumns.concat(rightPadding))}
          </tr>
        );
      }
    )(spannedColumns);

    return (
      <thead>
        {rowForSpannedColumns}
        <tr>
          {R.map(renderHelpers.renderHeader(
            this.props.onHeaderClick,
            this.props.sortableColumns,
            this.props.sortColKey,
            this.props.sortAscending
          ))(columns)}
        </tr>
      </thead>
    );
  },
});

export default Header;
