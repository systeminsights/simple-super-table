import React from 'react/addons';
const T = React.PropTypes;
const {LinkedStateMixin} = React.addons;
import R from 'ramda';

import DownloadIcon from './svg/download-icon';
import FilterIcon from './svg/filter-icon';

import dataHelpers from './data-helpers';
import {filterTextHighlightRenderer} from './column-renderers';

import Header from './header';
import Body from './body';

// TODO: use ES6 class syntax when an alternative for mixins is available.
const SimpleSuperTable = React.createClass({
  propTypes: {
    data: T.array.isRequired,
    columns: T.array.isRequired,
    primaryKeyGen: T.func.isRequired,
    columnsForDownload: T.array,
    filterableColumns: T.array,
    defaultSortColumn: T.string,
    defaultSortAscending: T.bool,
    sortableColumns: T.array,
    onRowClick: T.func,
    onColumnClick: T.func,
    rowClassGetter: T.func,
    columnClassGetter: T.func,
    columnsSorters: T.object,
    columnRenderers: T.object,
    title: T.string,
    messages: T.object,
  },

  mixins: [LinkedStateMixin],

  getDefaultProps: function getDefaultProps() {
    return {
      defaultSortAscending: true,
      rowClassGetter: R.always(''),
      columnClassGetter: R.always(''),
      columnSorters: {},
      columnRenderers: {},
      title: '',
    };
  },

  getInitialState: function getInitialState() {
    const sortableColumns = R.defaultTo(dataHelpers.extractColKeys(this.props.columns), this.props.sortableColumns);

    return {
      filterText: '',
      sortColKey: R.defaultTo(sortableColumns[0], this.props.defaultSortColumn),
      sortAscending: this.props.defaultSortAscending,
    };
  },

  render: function render() {
    const messages = R.merge({
      'No data': 'No data',
      'No matching data': 'No matching data',
      'Filter': 'Filter',
    }, R.defaultTo({}, this.props.messages));

    const colKeys = dataHelpers.extractColKeys(this.props.columns);
    const filterableColumns = R.defaultTo(colKeys, this.props.filterableColumns);
    const filteredData = R.ifElse(
      R.isEmpty,
      () => this.props.data,
      () => dataHelpers.filterData(filterableColumns, this.state.filterText, this.props.data)
    )(filterableColumns);

    const sortedFilteredData = (() => {
      if (R.has(this.state.sortColKey, this.props.columnSorters)) {
        const sortedData = this.props.columnSorters[this.state.sortColKey](filteredData, this.state.sortColKey);
        return this.state.sortAscending ? sortedData : R.reverse(sortedData);
      }
      return dataHelpers.sortData(this.state.sortColKey, this.state.sortAscending, filteredData);
    })();

    const filterContainer = R.ifElse(
      R.isEmpty,
      () => null,
      () => {
        return (
          <div className="filter-container">
            <div className="icon"><FilterIcon size={15}/></div>
            <input
              type="text"
              className="filter"
              valueLink={this.linkState('filterText')}
              placeholder={messages.Filter}
            />
          </div>
        );
      }
    )(filterableColumns);

    const sortableColumns = R.defaultTo(dataHelpers.extractColKeys(this.props.columns), this.props.sortableColumns);
    const clickableClassName = (() => {
      if (R.isNil(this.props.onColumnClick)) {
        if (R.isNil(this.props.onRowClick)) { return ''; }
        return 'row-clickable';
      }
      return 'col-clickable';
    })();

    const columnRenderers = R.compose(
      R.merge(R.__, this.props.columnRenderers),
      R.fromPairs,
      R.map((k) => [k, filterTextHighlightRenderer])
    )(filterableColumns);

    const titleContainer = R.ifElse(
      R.isEmpty,
      () => null,
      () => <div className="title-container"><span className="title">{this.props.title}</span></div>
    )(this.props.title);

    const messageContainer = R.ifElse(
      R.identity,
      ([data, _sortedFilteredData]) => {
        if (R.isEmpty(data)) {
          return (
            <div className="message-container">
              <h3 className="no-data-message">{messages['No data']}</h3>
            </div>
          );
        } else if (R.isEmpty(_sortedFilteredData)) {
          return (
            <div className="message-container">
              <h3 className="no-matching-data-message">{messages['No matching data']}</h3>
            </div>
          );
        }

        return null;
      },
      () => null
    )([this.props.data, sortedFilteredData]);

    const filterCsvButton = null;

    return (
      <div className={`simple-super-table ${clickableClassName}`}>
        <div className="top-bar">
          {titleContainer}
          {filterContainer}
          <div className="csv-container">
            {filterCsvButton}
            <div
              className={`original-csv ${R.isEmpty(this.props.data) ? 'disabled' : ''}`}
              onClick={R.isEmpty(this.props.data) ? null : this.handleOriginalCSVClick}
            ><DownloadIcon size={18}/></div>
          </div>
        </div>
        <div className="table-container">
          <table>
            <Header
              columns={this.props.columns}
              sortableColumns={sortableColumns}
              sortColKey={this.state.sortColKey}
              sortAscending={this.state.sortAscending}
              onHeaderClick={this.handleHeaderClick}
            />
            <Body
              data={sortedFilteredData}
              colKeys={colKeys}
              primaryKeyGen={this.props.primaryKeyGen}
              filterText={this.state.filterText}
              onRowClick={this.handleRowClick}
              onColumnClick={this.handleColumnClick}
              columnRenderers={columnRenderers}
              rowClassGetter={this.props.rowClassGetter}
              columnClassGetter={this.props.columnClassGetter}
            />
          </table>
          {messageContainer}
        </div>
      </div>
    );
  },

  handleHeaderClick: function handleHeaderClick(e) {
    const colKey = e.currentTarget.getAttribute('data-col-key');
    if (R.isNil(this.props.sortableColumns) || R.contains(colKey, this.props.sortableColumns)) {
      this.setState({
        sortColKey: colKey,
        sortAscending: this.state.sortColKey === colKey ? !this.state.sortAscending : true,
      });
    }
  },

  handleRowClick: function handleRowClick(e) {
    if (!R.isNil(this.props.onRowClick)) {
      const primaryKey = e.currentTarget.getAttribute('data-primary-key');
      const foundRow = R.find((d) => R.equals(primaryKey, this.props.primaryKeyGen(d).toString()))(this.props.data);
      if (!R.isNil(foundRow)) {
        this.props.onRowClick(foundRow);
      }
    }
  },

  handleColumnClick: function handleColumnClick(e) {
    if (!R.isNil(this.props.onColumnClick)) {
      e.stopPropagation();
      const colKey = e.currentTarget.getAttribute('data-col-key');
      const primaryKey = e.currentTarget.getAttribute('data-primary-key');
      const foundRow = R.find((d) => R.equals(primaryKey, this.props.primaryKeyGen(d)))(this.props.data);
      if (!R.isNil(foundRow)) {
        this.props.onColumnClick(foundRow[colKey], foundRow, colKey);
      }
    }
  },

  handleFilteredCSVClick: function handleFilteredCSVClick() {
    const colKeys = dataHelpers.extractColKeys(R.defaultTo(this.props.columns, this.props.columnsForDownload));
    const filterableColumns = R.defaultTo(colKeys, this.props.filterableColumns);
    const filteredData = R.ifElse(
      R.isEmpty,
      () => this.props.data,
      () => dataHelpers.filterData(filterableColumns, this.state.filterText, this.props.data)
    )(filterableColumns);
    const sortedFilteredData = dataHelpers.sortData(this.state.sortColKey, this.state.sortAscending, filteredData);
    dataHelpers.pushDataForDownload(
      R.isEmpty(this.props.title) ? 'file' : this.props.title,
      R.defaultTo(this.props.columns, this.props.columnsForDownload),
      sortedFilteredData
    );
  },

  handleOriginalCSVClick: function handleOriginalCSVClick() {
    dataHelpers.pushDataForDownload(
      R.isEmpty(this.props.title) ? 'file' : this.props.title,
      R.defaultTo(this.props.columns, this.props.columnsForDownload),
      this.props.data
    );
  },
});

export default SimpleSuperTable;
