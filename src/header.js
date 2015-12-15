const React = require('react');
const R = require('ramda');

const renderHelpers = require('./render-helpers');

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
    columns: React.PropTypes.array.isRequired,
    columnWidths: React.PropTypes.object.isRequired,
    sortableColumns: React.PropTypes.array.isRequired,
    sortColKey: React.PropTypes.string.isRequired,
    sortAscending: React.PropTypes.bool.isRequired,
    onHeaderClick: React.PropTypes.func.isRequired,
  },

  render: function render() {
    const {columns} = extractSpannedColumns(this.props.columns);

    const spannedColumns = R.map((c) => {
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
    })(this.props.columns);

    return (
      <div className="table-header">
        {R.find(R.has('span'))(this.props.columns) ? <div className="row">{spannedColumns}</div> : null}
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

module.exports = Header;
