import React from 'react';
import R from 'ramda';
import json2csv from 'json2csv';

const dataHelpers = {
  // :: Ord[{k : v}] -> Ord[k]
  extractColKeys: R.compose(
    R.flatten,
    R.map(R.keys),
    R.flatten,
    R.map(R.ifElse(R.has('span'), R.prop('columns'), R.identity))
  ),

  // :: Ord[{k : v}] -> Ord[v]
  extractColValues: R.compose(
    R.flatten,
    R.map(R.values),
    R.flatten,
    R.map(R.ifElse(R.has('span'), R.prop('columns'), R.identity))
  ),

  // :: [String] -> String -> [Object] -> [Object]
  filterData: R.curry((filterByColKeys, filterText, data) => {
    return R.filter(R.compose(
      R.match(new RegExp(filterText, 'gi')),
      R.join(' '),
      R.map((v) => R.isNil(v) ? '' : v.toString()),
      R.props(filterByColKeys)
    ))(data);
  }),

  // :: String -> Bool -> [Object] -> [Object]
  sortData: R.curry((colKey, sortAscending, data) => {
    const sortedData = R.sortBy(R.compose(R.ifElse(R.is(String), R.toLower, R.identity), R.prop(colKey)))(data);
    return sortAscending ? sortedData : R.reverse(sortedData);
  }),

  // Generate browser download for CSV
  pushDataForDownload: function pushDataForDownload(fileName, columns, data) {
    const fields = dataHelpers.extractColKeys(columns);
    const fieldNames = dataHelpers.extractColValues(columns);

    json2csv({data: data, fields: fields, fieldNames: fieldNames}, (err, csv) => {
      const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csv}`);
      const link = document.createElement('a');
      link.setAttribute('href', encodedUri);
      link.setAttribute('download', `${fileName}.csv`);
      link.click();
    });
  },
};

export default dataHelpers;
