/*eslint-disable no-undef */
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
const columnRenderers = {
  total: SimpleSuperTable.columnRenderers.barRenderer(0, 2000, 200, 20, R.always('#0000cc')),
};

React.render(
  <SimpleSuperTable.default
    data={data}
    columns={columns}
    primaryKeyGen={primaryKeyGen}
    title={'Sales in 2015'}
    sortableColumns={['region', 'rep', 'item', 'units', 'unitCost', 'total']}
    columnRenderers={columnRenderers}
  />,
  document.getElementById('component')
);
