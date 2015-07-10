import React from 'react/addons';
const TU = React.addons.TestUtils;
import SimpleSuperTable from '../src/';
import R from 'ramda';

describe('basic table rendering', function() {
  const data = [
    {a: 'abc', b: 'def', c: 'ghi'},
    {a: 'jkl', b: 'mno', c: 'pqr'},
    {a: '123', b: '456', c: '789'},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
  ];
  const primaryKeyGen = R.prop('a');
  let renderTree = null;

  beforeEach(function() {
    renderTree = TU.renderIntoDocument(
      <SimpleSuperTable
        data={data}
        columns={columns}
        primaryKeyGen={primaryKeyGen}
        />
    );
  });

  afterEach(function() {
    React.unmountComponentAtNode(document.body);
  });

  it('should render a table element with thead and tbody', function() {
    let table = TU.findRenderedDOMComponentWithTag(renderTree, 'table');
    expect(table).to.be.ok;

    let thead = TU.findRenderedDOMComponentWithTag(table, 'thead');
    expect(thead).to.be.ok;

    let tbody = TU.findRenderedDOMComponentWithTag(table, 'tbody');
    expect(tbody).to.be.ok;
  });

  it('should render rows inside tbody', function() {
    let tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    let trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    expect(trs.length).to.equal(3);
    expect(trs[0]._reactInternalInstance._currentElement.key).to.equal(data[0]['a']);
    expect(trs[1]._reactInternalInstance._currentElement.key).to.equal(data[1]['a']);
    expect(trs[2]._reactInternalInstance._currentElement.key).to.equal(data[2]['a']);
  });

  it('should render row 1 with column data', function() {
    let tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    let trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    let tds = TU.scryRenderedDOMComponentsWithTag(trs[0], 'td');
    expect(tds.length).to.equal(3);
    expect(tds[0].getDOMNode().textContent).to.equal(data[0]['a']);
    expect(tds[1].getDOMNode().textContent).to.equal(data[0]['b']);
    expect(tds[2].getDOMNode().textContent).to.equal(data[0]['c']);
  });

  it('should render row 2 with column data', function() {
    let tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    let trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    let tds = TU.scryRenderedDOMComponentsWithTag(trs[1], 'td');
    expect(tds.length).to.equal(3);
    expect(tds[0].getDOMNode().textContent).to.equal(data[1]['a']);
    expect(tds[1].getDOMNode().textContent).to.equal(data[1]['b']);
    expect(tds[2].getDOMNode().textContent).to.equal(data[1]['c']);
  });

  it('should render row 3 with column data', function() {
    let tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    let trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
    let tds = TU.scryRenderedDOMComponentsWithTag(trs[2], 'td');
    expect(tds.length).to.equal(3);
    expect(tds[0].getDOMNode().textContent).to.equal(data[2]['a']);
    expect(tds[0]._reactInternalInstance._currentElement.key).to.equal('a');
    expect(tds[1].getDOMNode().textContent).to.equal(data[2]['b']);
    expect(tds[1]._reactInternalInstance._currentElement.key).to.equal('b');
    expect(tds[2].getDOMNode().textContent).to.equal(data[2]['c']);
    expect(tds[2]._reactInternalInstance._currentElement.key).to.equal('c');
  });
});
