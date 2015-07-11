import React from 'react/addons';
const T = React.PropTypes;
const {LinkedStateMixin} = React.addons;
import R from 'ramda';

import dataHelpers from './data-helpers';
import renderHelpers from './render-helpers';

import Header from './header.jsx';

// TODO: use ES6 class syntax when an alternative for mixins is available.
const SimpleSuperTable = React.createClass({
  mixins: [LinkedStateMixin],

  propTypes: {
    data: T.array.isRequired,
    columns: T.array.isRequired,
    primaryKeyGen: T.func.isRequired,
    filterableColumns: T.array,
    defaultSortColumn: T.string,
    defaultSortAscending: T.bool,
    sortableColumns: T.array,
    onRowClick: T.func,
    onColumnClick: T.func,
    rowClassGetter: T.func,
    columnClassGetter: T.func,
    columnRenderers: T.object,
    title: T.string,
  },

  getDefaultProps: function() {
    return {
      defaultSortAscending: true,
      rowClassGetter: R.always(''),
      columnClassGetter: R.always(''),
      columnRenderers: {},
      title: '',
    };
  },

  getInitialState: function() {
    const sortableColumns = R.defaultTo(dataHelpers.extractColkeys(this.props.columns), this.props.sortableColumns);

    return {
      filterText: '',
      sortColKey: R.defaultTo(sortableColumns[0], this.props.defaultSortColumn),
      sortAscending: this.props.defaultSortAscending,
    };
  },

  handleHeaderClick: function(e) {
    const colKey = e.currentTarget.getAttribute('data-col-key');
    if (R.isNil(this.props.sortableColumns) || R.contains(colKey, this.props.sortableColumns)) {
      this.setState({
        sortColKey: colKey,
        sortAscending: this.state.sortColKey === colKey ? !this.state.sortAscending : true,
      });
    }
  },

  handleRowClick: function(e) {
    if (!R.isNil(this.props.onRowClick)) {
      const primaryKey = e.currentTarget.getAttribute('data-primary-key');
      const foundRow = R.find((d) => R.equals(primaryKey, this.props.primaryKeyGen(d)))(this.props.data);
      if (!R.isNil(foundRow)) {
        this.props.onRowClick(foundRow);
      }
    }
  },

  handleColumnClick: function(e) {
    if (!R.isNil(this.props.onColumnClick)) {
      e.stopPropagation()
      const colKey = e.currentTarget.getAttribute('data-col-key');
      const primaryKey = e.currentTarget.getAttribute('data-primary-key');
      const foundRow = R.find((d) => R.equals(primaryKey, this.props.primaryKeyGen(d)))(this.props.data);
      if (!R.isNil(foundRow)) {
        this.props.onColumnClick(foundRow[colKey], foundRow, colKey);
      }
    }
  },

  render: function() {
    const colKeys = dataHelpers.extractColkeys(this.props.columns);
    const filterableColumns = R.defaultTo(colKeys, this.props.filterableColumns);
    const filteredData = R.ifElse(
      R.isEmpty,
      () => this.props.data,
      () => dataHelpers.filterData(filterableColumns, this.state.filterText, this.props.data)
    )(filterableColumns);
    const sortedFilteredData = dataHelpers.sortData(this.state.sortColKey, this.state.sortAscending, filteredData);
    const filterTextInput = R.ifElse(
      R.isEmpty,
      () => null,
      () => {
        return (
          <input
            type="text"
            className="filter"
            valueLink={this.linkState('filterText')}
            placeholder={'Filter'}
          />
        );
      }
    )(filterableColumns);

    const sortableColumns = R.defaultTo(dataHelpers.extractColkeys(this.props.columns), this.props.sortableColumns);

    const clickableClassName = R.isNil(this.props.onColumnClick) ?
      R.isNil(this.props.onRowClick) ? '' : 'row-clickable' : 'col-clickable';

    return (
      <div className={`simple-super-table ${clickableClassName}`}>
        <div className="top-bar">
          <div className="title-container"><span className="title">{this.props.title}</span></div>
          <div className="filter-container">{filterTextInput}</div>
        </div>
        <table>
          <Header
            columns={this.props.columns}
            sortableColumns={sortableColumns}
            sortColKey={this.state.sortColKey}
            sortAscending={this.state.sortAscending}
            onHeaderClick={this.handleHeaderClick}
          />
          <tbody>
            {R.map(renderHelpers.renderRow(
              this.props.primaryKeyGen,
              colKeys,
              this.handleRowClick,
              this.handleColumnClick,
              this.props.rowClassGetter,
              this.props.columnClassGetter,
              this.props.columnRenderers,
              this.state.filterText
            ))(sortedFilteredData)}
          </tbody>
        </table>
      </div>
    );
  },
});

export default SimpleSuperTable;
