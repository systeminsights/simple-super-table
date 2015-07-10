import './src/style.less';

import React from 'react';
import R from 'ramda';
import SimpleSuperTable from './src';

const data = [
  {a: 'abc', b: 'def', c: 'ghi'},
  {a: 'jkl', b: 'mno', c: 'pqr'},
  {a: '123', b: '456', d: '789'},
];
const columns = [
  {a: 'A'},
  {b: 'B'},
  {c: 'C'},
];
const primaryKeyGen = R.prop('a');

React.render(
  <SimpleSuperTable
    data={data}
    columns={columns}
    primaryKeyGen={primaryKeyGen}
  />,
  document.getElementById('component')
);
