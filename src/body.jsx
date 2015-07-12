import React from 'react';
const T = React.PropTypes;
import R from 'ramda';

import renderHelpers from './render-helpers';

const Body = React.createClass({
  propTypes: {
    data: T.array.isRequired,
    colKeys: T.array.isRequired,
    primaryKeyGen: T.func.isRequired,
    filterText: T.string.isRequired,
    onRowClick: T.func.isRequired,
    onColumnClick: T.func.isRequired,
    columnRenderers: T.object.isRequired,
    rowClassGetter: T.func,
    columnClassGetter: T.func,
  },

  render: function() {
    return (
      <tbody>
        {R.map(renderHelpers.renderRow(
          this.props.primaryKeyGen,
          this.props.colKeys,
          this.props.onRowClick,
          this.props.onColumnClick,
          this.props.rowClassGetter,
          this.props.columnClassGetter,
          this.props.columnRenderers,
          this.props.filterText
        ))(this.props.data)}
      </tbody>
    );
  },
});

export default Body;
