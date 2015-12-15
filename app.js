/*eslint-disable no-undef */
import './src/style.less';

import React from 'react';
import R from 'ramda';
import moment from 'moment';

import SampleData from './fixtures/sample-data.json';

const dateSorter = function(data, colKey) {
  return R.sort((a, b) => {
    return moment(R.prop(colKey, a), 'M/D/YY').valueOf() - moment(R.prop(colKey, b), 'M/D/YY').valueOf();
  })(data);
};

const data = SampleData.orders;
const columns = [
  {orderDate: 'Order Date'},
  {region: 'Region'},
  {rep: 'Representative'},
  {
    span: 'Sales',
    columns: [
      {item: 'Item'},
      {units: 'Units'},
    ],
  },
  {
    span: 'Cost',
    columns: [
      {unitCost: 'Unit Cost'},
      {total: 'Total'},
    ],
  },
];
const columnWidths = {
  orderDate: 125,
  region: 100,
  rep: 150,
  item: 100,
  units: 100,
  unitCost: 100,
  total: 300,
};
const primaryKeyGen = R.prop('orderDate');
const columnSorters = {
  orderDate: dateSorter,
};
const columnRenderers = {
  total: SimpleSuperTable.columnRenderers.barRenderer(0, 2000, 200, 20, R.always('#0000cc'), R.identity),
};

React.render(
  <SimpleSuperTable.default
    data={data}
    columns={columns}
    columnWidths={columnWidths}
    primaryKeyGen={primaryKeyGen}
    title={'Sales in 2015'}
    columnSorters={columnSorters}
    columnRenderers={columnRenderers}
    onRowClick={(rowData) => console.log('row was clicked', rowData)}
  />,
  document.getElementById('component')
);
