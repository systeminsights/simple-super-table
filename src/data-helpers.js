const R = require('ramda');
const json2csv = require('json2csv');

// :: Ord[{k : v}] -> Ord[k]
const extractColKeys = R.compose(
  R.flatten,
  R.map(R.keys),
  R.flatten,
  R.map(R.ifElse(R.has('span'), R.prop('columns'), R.identity))
);

// :: Ord[{k : v}] -> Ord[v]
const extractColValues = R.compose(
  R.flatten,
  R.map(R.values),
  R.flatten,
  R.map(R.ifElse(R.has('span'), R.prop('columns'), R.identity))
);

// :: [String] -> String -> [Object] -> [Object]
const filterData = R.curry((filterByColKeys, filterText, data) => {
  return R.filter(R.compose(
    R.match(new RegExp(filterText, 'gi')),
    R.join(' '),
    R.map((v) => R.isNil(v) ? '' : v.toString()),
    R.props(filterByColKeys)
  ))(data);
});

// :: String -> Bool -> [Object] -> [Object]
const sortData = R.curry((colKey, sortAscending, data) => {
  const sortedData = R.sortBy(R.compose(R.ifElse(R.is(String), R.toLower, R.identity), R.prop(colKey)))(data);
  return sortAscending ? sortedData : R.reverse(sortedData);
});

// Generate browser download for CSV
const pushDataForDownload = function pushDataForDownload(fileName, columns, data) {
  const fields = extractColKeys(columns);
  const fieldNames = extractColValues(columns);

  json2csv({data: data, fields: fields, fieldNames: fieldNames}, (err, csv) => {
    const link = document.createElement('a');
    link.setAttribute(
        "href",
        URL.createObjectURL(new Blob([csv], { type: "text/csv;encoding:utf-8" }))
    );
    link.setAttribute('download', `${fileName}.csv`);
    link.click();
  });
};

module.exports = {
  extractColKeys,
  extractColValues,
  filterData,
  sortData,
  pushDataForDownload,
};
