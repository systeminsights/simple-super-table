# Simple Super Table

React component for rendering low volume data tables (~500). Provides search,
sort and csv export for free.

## 2.0 - Lessons from 1.0

- Nobody asked for un-camelcasing and titlecasing the headers.
- Take a function for primary key generation.
- Spans are bad. Give the entire data, let the table decide what to do.
- Rows are rows and columns are columns, no cells involved. Its easier to
identify a data point with rowdata[colKey]. Use maps (objects) instead of
arrays and indexes wherever possible.
- Request for external stylesheet, assign base classes.
- *Always* write tests first. Make the tests as much e2e as possible.
- Avoid splitting functionality into mixins, use helper objects instead.
Mixins are bad because they make assumptions about state/props.
- Headers can span.
- Cache search results.

# Roadmap

- Basic table rendering
- Search & highlight matching text
- Sortable columns
- CSV export
- Sticky headers

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
  {col2: 'Column 2'},
  {col3: 'Something else'},
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

### primaryKeyGen

**Required**, function. Called for each row, with the row data (object for the
  corresponding row) to generate a unique identifier for that row.

```js
const primaryKeyGen = function primaryKeyGen(rowData) {
  return rowData['col1'];
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

## Exposed CSS classes

| Class Combination    | Element(s)                                                                                 |
|----------------------|--------------------------------------------------------------------------------------------|
| .simple-super-table  | Main container                                                                             |
| .title               | Title                                                                                      |
| .filter              | Filter input box                                                                           |
| .col.{colKey}        | Each column in header and body                                                             |
| .row                 | Each row in body                                                                           |
| .row-clickable       | Main container, when onRowClick handler is defined and onColumnClick is not defined.       |
| .col-clickable       | Main container, when onColumnClick is defined                                              |
| .sortable            | Columns in header which are sortable                                                       |
| .sorted.{asc|desc|}  | The header column by which the data has been sorted                                        |

## Basic table

```js
import SimpleSuperTable from 'simple-super-table';

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
