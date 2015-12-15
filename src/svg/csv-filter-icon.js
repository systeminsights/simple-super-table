const React = require('react');
const CsvIcon = require('./csv-icon');
const FilterIcon = require('./filter-icon');

const CsvFilterIcon = React.createClass({
  propTypes: {
    size: React.PropTypes.number,
  },

  getDefaultProps: function getDefaultProps() {
    return {
      size: 35,
    };
  },

  render: function render() {
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

module.exports = CsvFilterIcon;
