import React from 'react';
import R from 'ramda';
import toCSV from 'to-csv';

const dataHelpers = {
  // :: Ord[{k : v}] -> Ord[k]
  extractColkeys: R.compose(
    R.flatten,
    R.map(R.keys),
    R.flatten,
    R.map(R.ifElse(R.has('span'), R.prop('columns'), R.identity))
  ),

  // :: [String] -> String -> [Object] -> [Object]
  filterData: R.curry((filterByColKeys, filterText, data) => {
    return R.filter(R.compose(
      R.match(new RegExp(filterText, 'gi')),
      R.join(' '),
      R.map((v) => v.toString()),
      R.props(filterByColKeys)
    ))(data);
  }),

  // :: String -> Bool -> [Object] -> [Object]
  sortData: R.curry((colKey, sortAscending, data) => {
    const sortedData = R.sortBy(R.prop(colKey))(data);
    return sortAscending ? sortedData : R.reverse(sortedData);
  }),

  // Generate browser download for CSV
  pushDataForDownload: function(fileName, data) {
    const csvData = toCSV(data);
    const encodedUri = encodeURI(`data:text/csv;charset=utf-8,${csvData}`);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `${fileName}.csv`);
    link.click();
  },
};

export default dataHelpers;
