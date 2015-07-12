import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import SimpleSuperTable from '../src';

describe('basic table rendering', function() {
  const data = [
    {a: 'abc', b: 'def', c: '123'},
    {a: 'jkl', b: 'mno', c: '456'},
    {a: 'pqr', b: 'stu', c: '789'},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
  ];
  const primaryKeyGen = R.prop('a');
  const title = 'Test Table';
  let renderTree = null;

  beforeEach(function() {
    renderTree = TU.renderIntoDocument(
      <SimpleSuperTable
        data={data}
        columns={columns}
        primaryKeyGen={primaryKeyGen}
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

  it('should render a table element with thead and tbody', function() {
    const table = TU.findRenderedDOMComponentWithTag(renderTree, 'table');
    expect(table).to.be.ok;

    const thead = TU.findRenderedDOMComponentWithTag(table, 'thead');
    expect(thead).to.be.ok;

    const tbody = TU.findRenderedDOMComponentWithTag(table, 'tbody');
    expect(tbody).to.be.ok;
  });

  it('should render one row inside thead', function() {
    const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
    const tr = TU.findRenderedDOMComponentWithTag(thead, 'tr');
    expect(tr).to.be.ok;
  });

  it('should render headers inside thead row', function() {
    const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
    const tr = TU.findRenderedDOMComponentWithTag(thead, 'tr');
    const ths = TU.scryRenderedDOMComponentsWithTag(tr, 'th');
    expect(ths.length).to.equal(columns.length);
    expect(ths[0].getDOMNode().textContent).to.equal(columns[0]['a']);
    expect(ths[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(ths[1].getDOMNode().textContent).to.equal(columns[1]['b']);
    expect(ths[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(ths[2].getDOMNode().textContent).to.equal(columns[2]['c']);
    expect(ths[2]._reactInternalInstance._currentElement.key).to.equal('c');
  });

  it('should render rows inside tbody', function() {
    const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    expect(trs.length).to.equal(3);
    expect(trs[0]._reactInternalInstance._currentElement.key).to.equal(data[0]['a']);
    expect(trs[1]._reactInternalInstance._currentElement.key).to.equal(data[1]['a']);
    expect(trs[2]._reactInternalInstance._currentElement.key).to.equal(data[2]['a']);
  });

  it('should render row 1 with column data', function() {
    const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    const tds = TU.scryRenderedDOMComponentsWithTag(trs[0], 'td');
    expect(tds.length).to.equal(3);
    expect(tds[0].getDOMNode().textContent).to.equal(data[0]['a']);
    expect(tds[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(tds[1].getDOMNode().textContent).to.equal(data[0]['b']);
    expect(tds[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(tds[2].getDOMNode().textContent).to.equal(data[0]['c']);
    expect(tds[2]._reactInternalInstance._currentElement.key).to.equal('c');
  });

  it('should render row 2 with column data', function() {
    const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    const tds = TU.scryRenderedDOMComponentsWithTag(trs[1], 'td');
    expect(tds.length).to.equal(3);
    expect(tds[0].getDOMNode().textContent).to.equal(data[1]['a']);
    expect(tds[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(tds[1].getDOMNode().textContent).to.equal(data[1]['b']);
    expect(tds[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(tds[2].getDOMNode().textContent).to.equal(data[1]['c']);
    expect(tds[2]._reactInternalInstance._currentElement.key).to.equal('c');
  });

  it('should render row 3 with column data', function() {
    const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    const tds = TU.scryRenderedDOMComponentsWithTag(trs[2], 'td');
    expect(tds.length).to.equal(3);
    expect(tds[0].getDOMNode().textContent).to.equal(data[2]['a']);
    expect(tds[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(tds[1].getDOMNode().textContent).to.equal(data[2]['b']);
    expect(tds[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(tds[2].getDOMNode().textContent).to.equal(data[2]['c']);
    expect(tds[2]._reactInternalInstance._currentElement.key).to.equal('c');
  });
});
