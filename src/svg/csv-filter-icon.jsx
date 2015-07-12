import React from 'react';
const T = React.PropTypes;

import CsvIcon from './csv-icon';
import FilterIcon from './filter-icon';

const CsvFilterIcon = React.createClass({
  propTypes: {
    size: T.number,
  },

  getDefaultProps: function() {
    return {
      size: 35,
    };
  },

  render: function() {
    return (
      <div style={{position: 'relative'}}>
        <div style={{width: this.props.size, height: this.props.size}} />
        <div style={{position: 'absolute', right: 0, bottom: -3}}>
          <CsvIcon
            size={this.props.size * 0.75}
          />
        </div>
        <div style={{position: 'absolute', left: 0, top: 0}}>
          <FilterIcon
            size={this.props.size * 0.5}
          />
        </div>
      </div>
    );
  },
});

export default CsvFilterIcon;
