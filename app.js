require('./src/style.less');

const React = require('react');
const R = require('ramda');
const moment = require('moment');

const SampleData = require('./fixtures/sample-data.json');
const {SimpleSuperTable, ColumnRenderers} = require('./src');

const dateSorter = function dateSorter(data, colKey) {
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
const primaryKeyGen = R.prop('orderDate');
const columnSorters = {
  orderDate: dateSorter,
};
const columnRenderers = {
  total: ColumnRenderers.barRenderer(0, 2000, 200, 20, R.always('#0000cc'), (_) => _),
};
const columnWidths = {
  orderDate: 125,
  region: 125,
  rep: 300,
  item: 125,
  units: 125,
  unitCost: 125,
  total: 300,
};

const headerRenderers = {
  total: R.always(<h1>TOTAL</h1>),
};

React.render(
  <SimpleSuperTable
    data={data}
    columns={columns}
    columnWidths={columnWidths}
    primaryKeyGen={primaryKeyGen}
    title={'Sales in 2015'}
    columnSorters={columnSorters}
    columnRenderers={columnRenderers}
    headerRenderers={headerRenderers}
  />,
  document.getElementById('component')
);
