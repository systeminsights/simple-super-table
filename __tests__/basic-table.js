const React = require('react/addons');
const TU = React.addons.TestUtils;
const R = require('ramda');
const {SimpleSuperTable} = require('../src');

describe('basic table rendering', function() {
  const data = [
    {a: 'abc', b: 'def', c: '123', d: ''},
    {a: 'jkl', b: 'mno', c: '456', d: 'xyz'},
    {a: 'pqr', b: 'stu', c: '789', d: null},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
    {d: 'D'}
  ];
  const primaryKeyGen = R.prop('a');
  const title = 'Test Table';
  let renderTree = null;

  beforeEach(function() {
    renderTree = TU.renderIntoDocument(
      <SimpleSuperTable
        data={data}
        columns={columns}
        columnWidths={{a: 10, b: 10, c: 10, d: 10}}
        primaryKeyGen={primaryKeyGen}
        filterableColumns={['a', 'b', 'c']}
        title={title}
      />
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(document.body);
  });

  it('should render a title div', function() {
    const titleDiv = TU.findRenderedDOMComponentWithClass(renderTree, 'title-container');
    expect(titleDiv.getDOMNode().textContent).to.equal(title);
  });

  it('should render a table element with table header and table body', function() {
    const tableContainer = TU.findRenderedDOMComponentWithClass(renderTree, 'table-container');
    expect(tableContainer).to.be.ok;

    const header = TU.findRenderedDOMComponentWithClass(tableContainer, 'table-header');
    expect(header).to.be.ok;

    const body = TU.findRenderedDOMComponentWithClass(tableContainer, 'table-body');
    expect(body).to.be.ok;
  });

  it('should render one row inside table head', function() {
    const header = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
    const row = TU.findRenderedDOMComponentWithClass(header, 'row');
    expect(row).to.be.ok;
  });

  it('should render headers inside header row', function() {
    const header = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
    const row = TU.findRenderedDOMComponentWithClass(header, 'row');
    const cols = TU.scryRenderedDOMComponentsWithClass(row, 'col');
    expect(cols.length).to.equal(columns.length);
    expect(cols[0].getDOMNode().textContent).to.equal(columns[0]['a']);
    expect(cols[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(cols[1].getDOMNode().textContent).to.equal(columns[1]['b']);
    expect(cols[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(cols[2].getDOMNode().textContent).to.equal(columns[2]['c']);
    expect(cols[2]._reactInternalInstance._currentElement.key).to.equal('c');
  });

  it('should render rows inside tbody', function() {
    const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
    const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
    expect(rows.length).to.equal(3);
    expect(rows[0]._reactInternalInstance._currentElement.key).to.equal(data[0]['a']);
    expect(rows[1]._reactInternalInstance._currentElement.key).to.equal(data[1]['a']);
    expect(rows[2]._reactInternalInstance._currentElement.key).to.equal(data[2]['a']);
  });

  it('should render row 1 with column data', function() {
    const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
    const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
    const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
    expect(cols.length).to.equal(4);
    expect(cols[0].getDOMNode().textContent).to.equal(data[0]['a']);
    expect(cols[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(cols[1].getDOMNode().textContent).to.equal(data[0]['b']);
    expect(cols[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(cols[2].getDOMNode().textContent).to.equal(data[0]['c']);
    expect(cols[2]._reactInternalInstance._currentElement.key).to.equal('c');
    expect(cols[3].getDOMNode().textContent).to.equal('-');
    expect(cols[3]._reactInternalInstance._currentElement.key).to.equal('d');
  });

  it('should render row 2 with column data', function() {
    const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
    const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
    const cols = TU.scryRenderedDOMComponentsWithClass(rows[1], 'col');
    expect(cols.length).to.equal(4);
    expect(cols[0].getDOMNode().textContent).to.equal(data[1]['a']);
    expect(cols[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(cols[1].getDOMNode().textContent).to.equal(data[1]['b']);
    expect(cols[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(cols[2].getDOMNode().textContent).to.equal(data[1]['c']);
    expect(cols[2]._reactInternalInstance._currentElement.key).to.equal('c');
    expect(cols[3].getDOMNode().textContent).to.equal(data[1]['d']);
    expect(cols[3]._reactInternalInstance._currentElement.key).to.equal('d');
  });

  it('should render row 3 with column data', function() {
    const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
    const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
    const cols = TU.scryRenderedDOMComponentsWithClass(rows[2], 'col');
    expect(cols.length).to.equal(4);
    expect(cols[0].getDOMNode().textContent).to.equal(data[2]['a']);
    expect(cols[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(cols[1].getDOMNode().textContent).to.equal(data[2]['b']);
    expect(cols[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(cols[2].getDOMNode().textContent).to.equal(data[2]['c']);
    expect(cols[2]._reactInternalInstance._currentElement.key).to.equal('c');
    expect(cols[3].getDOMNode().textContent).to.equal('-');
    expect(cols[3]._reactInternalInstance._currentElement.key).to.equal('d');
  });
});
