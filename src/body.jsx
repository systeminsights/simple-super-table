import React from 'react';
import R from 'ramda';

import renderHelpers from './render-helpers';

const Body = React.createClass({
  propTypes: {
    data: React.PropTypes.array.isRequired,
    colKeys: React.PropTypes.array.isRequired,
    primaryKeyGen: React.PropTypes.func.isRequired,
    columnWidths: React.PropTypes.object.isRequired,
    filterText: React.PropTypes.string.isRequired,
    onRowClick: React.PropTypes.func.isRequired,
    onColumnClick: React.PropTypes.func.isRequired,
    columnRenderers: React.PropTypes.object.isRequired,
    rowClassGetter: React.PropTypes.func,
    columnClassGetter: React.PropTypes.func,
  },

  render: function render() {
    return (
      <div className="table-body">
        {R.map(renderHelpers.renderRow(
          this.props.primaryKeyGen,
          this.props.colKeys,
          this.props.columnWidths,
          this.props.onRowClick,
          this.props.onColumnClick,
          this.props.rowClassGetter,
          this.props.columnClassGetter,
          this.props.columnRenderers,
          this.props.filterText
        ))(this.props.data)}
      </div>
    );
  },
});

export default Body;
