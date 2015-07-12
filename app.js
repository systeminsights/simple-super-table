import './src/style.less';

import React from 'react';
import R from 'ramda';

import SampleData from './fixtures/sample-data.json';

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
const primaryKeyGen = R.prop('orderDate');

React.render(
  <SimpleSuperTable.default
    data={data}
    columns={columns}
    primaryKeyGen={primaryKeyGen}
    filterableColumns={['rep', 'item']}
  />,
  document.getElementById('component')
);
