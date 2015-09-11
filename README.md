# Simple Super Table

[![Build Status](https://travis-ci.org/systeminsights/simple-super-table.svg?branch=master)](https://travis-ci.org/systeminsights/simple-super-table)

React component for rendering low volume data tables (~500). Provides search,
sort and csv export for free.

# Roadmap

- Sticky headers
- Cache search results.

# Usage

The component is exported as per [UMD](https://github.com/umdjs/umd). It can be
included using the `<script>` tag or require'd like any other react component.
The examples below use the es6 import syntax.

## Props

The component accepts the below props.

### title

Optional, string. Title of the table.

### data

**Required**, array of objects. Each key in the object is a column. The object
structure should be consistent across all the rows.

```js
const data = [
  {col1: 1, col2: 'b', col3: 'c'},
  {col1: 2, col2: 'b', col3: 'c'},
  {col1: 3, col2: 'b', col3: 'c'},
  {col1: 4, col2: 'b', col3: 'c'},
  {col1: 5, col2: 'b', col3: 'c'},
// ...
];
```
### columns

**Required**, array of objects. Orders the column to display and each key value
pair specifies the column key and the corresponding label for that column.
columns can be nested to render spanned headers.

```js
const columns = [
  {col1: 'Column 1'},
  {col2: 'Column 2', sorter: <function>},
  {col3: 'Something else', sorter: <function>},
];

const nestedColumns = [
  {col1: 'Column 1'},
  {
    span: 'Column 2',
    columns: [
      {col2: 'A'},
      {col3: 'B'},
    ],
  },
]

```

### columnsForDownload

Optional, array of objects. Specify the columns to include for download. Use the
same syntax as 'columns' prop without nested headers. Defaults to columns.

### primaryKeyGen

**Required**, function. Called for each row, with the row data (object for the
  corresponding row) to generate a unique identifier for that row.

```js
const primaryKeyGen = function primaryKeyGen(rowData) {
  return rowData['col1'];
};
```

### columnSorters

Optional, object. Custom sorting functions for columns. Expects the key to be
column keys and values to be functions. The function will be invoked with rows
and the column key. The function has to return the ordered rows in ascending
order.

```js
const columnSorters = {
  col1: function(data, colKey) {
    return sortedRows;
  },
};
```

### columnRenderers

Optional, object. Custom renderer functions for columns. Expects the key to be
column keys and values to be functions. The function will be invoked with
column data, row data, column key and filter text.

```js
const columnRenderers = {
  col1: function(colData, rowData, colKey, filterText) {
    // text or react component.  
    return <h1>colData</h1>;
  }
};
```

### rowClassGetter

Optional, function. Return a CSS class for the given row. The function will be
invoked for each row with the corresponding row data.

```js
const rowClassGetter = function rowClassGetter(rowData) {
  return 'my-own-class';
};
```

### columnClassGetter

Optional, function. Return a CSS class for the given column. The function will
be invoked for each column with the corresponding column data, row data and
column key.

```js
const columnClassGetter = function columnClassGetter(colData, rowData, colKey) {
  return 'my-own-class';
};
```

### onRowClick

Optional, function. Sets a handler for row click events. The handler will be
invoked with row data.

```js
const rowClickHandler = function(rowData) {
  // ...Event handling logic...
};
```

### onColumnClick

Optional, function. Sets a handler for column click events. The handler will be
invoked with column data, row data, column key. Specify an event handler for
column click will cause the row click handler to be ignored.

```js
const colClickHandler = function(colData, rowData, colKey) {
  // ...Event handling logic...  
};
```

### defaultSortColumn

Optional, string. Column key that should be used for sorting the table upfront.
Defaults to the first column specified in *columns* props.

### defaultSortAscending

Optional, boolean. Set true to sort in the ascending direction upfront.
Defaults to true.

### sortableColumns

Optional array. Array of strings. Specify the column keys of the sortable
columns, defaults to everything. To disable sorting, pass an empty array.

```js
const sortableColumns = ['col1', 'col2'];
```

### filterableColumns

Optional array. Array of strings. Specify the colKeys of the filterable columns,
defaults to everything. To disable sorting, pass an empty array. Filters use a
regular expression match, numerical columns are converted to string before
filtering.

```js
const filterableColumns = ['col1', 'col2'];
```

### messages

Optional object. Key value pair of messages to override with custom strings.

```js
const messages = {
  'No data': 'My custom no data message',
  'No matching data': 'My custom no matching data message',
  'Filter': 'My custom filter message',
};
```

## Exposed CSS classes

| Class Combination      | Element(s)                                                                                 |
|------------------------|--------------------------------------------------------------------------------------------|
| .simple-super-table    | Main container                                                                             |
| .title                 | Title                                                                                      |
| .filter                | Filter input box                                                                           |
| .col.{colKey}          | Each column in header and body                                                             |
| .row                   | Each row in body                                                                           |
| .row-clickable         | Main container, when onRowClick handler<br> is defined and onColumnClick is not defined.   |
| .col-clickable         | Main container, when onColumnClick is defined                                              |
| .sortable              | Columns in header which are sortable                                                       |
| .sorted.{asc/desc}     | The header column by which the data has been sorted                                        |
| .filter-text-highlight | Child element of a column rendered by filter text highlight column renderer                |
| .highlight             | Text spans to be highlighted inside .filter-text-highlight                                 |

## Bundled column renderers

The project bundles commonly used column renderers. You can compose them inside other renderers or use them as is.

### barRenderer

Renders a horizontal bar. To create a new renderer, pass minValue, maxValue, width, height, a color mapper function and
a data formatter function. The color mapper and data formatter functions will be invoked with the column data and row
data.

```js
const myBarRenderer = SimpleSuperTable.columnRenderers.barRenderer(0, 250, 100, 20, () => '#ffff00', (colData) => colData);
// will return a bar which expects values in the range [0, 250], 100px wide, 20px tall and filled with '#ffff00' color.
```

## Basic table

```js
import SimpleSuperTable from 'simple-super-table';
// CommonJS:
// const SimpleSuperTable = require('simple-super-table').default;

const data = [
  {col1: 1, col2: 'a'},
  {col1: 2, col2: 'b'},
];

const columns = [
  {col1: 'Index'},
  {col2: 'Alpha'},
];

const primaryKeyGen = function primaryKeyGen(rowData) {
  return rowData['col1'];  
};

const YourComponent extends React.component {
  render() {
    return (
      <SimpleSuperTable
        data={data}
        columns={columns}
        primaryKeyGen={primaryKeyGen}
      />
    );
  }
};
```

# License

[MIT](./LICENSE.txt)

### Credits

<div>Icons made by <a href="http://www.flaticon.com/authors/freepik" title="Freepik">Freepik</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a>             is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>
<div>Icon made by <a href="http://fontawesome.io" title="Dave Gandy">Dave Gandy</a> from <a href="http://www.flaticon.com" title="Flaticon">www.flaticon.com</a> is licensed under <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0">CC BY 3.0</a></div>

# Contributing

The project is written in JS es6 and uses webpack for packaging stuff. Io.js is required to run the tests and build the project.
`npm run build-dist` creates the distribution build, do this everytime you make changes to the project.
`npm start` starts the playground app, from app.js and index.html. Styles are defined in src/style.less.
