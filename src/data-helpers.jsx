import React from 'react';
import R from 'ramda';

const dataHelpers = {
  // :: Ord[{k : v}] -> Ord[k]
  extractColkeys: R.compose(
    R.flatten,
    R.map(R.keys)
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
};

export default dataHelpers;
