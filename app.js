import './src/style.less';

import React from 'react';
import R from 'ramda';
import SimpleSuperTable from './src';

import SampleData from './fixtures/sample-data.json';

console.log(SampleData);

const data = SampleData.orders;
const columns = [
  {orderDate: 'Order Date'},
  {region: 'Region'},
  {rep: 'Representative'},
  {item: 'Item'},
  {units: 'Units'},
  {unitCost: 'Unit Cost'},
  {total: 'Total'},
];
const primaryKeyGen = R.prop('orderDate');

React.render(
  <SimpleSuperTable
    data={data}
    columns={columns}
    primaryKeyGen={primaryKeyGen}
  />,
  document.getElementById('component')
);
