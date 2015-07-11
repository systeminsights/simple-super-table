import React from 'react/addons';
const TU = React.addons.TestUtils;
import SimpleSuperTable from '../src/';
import R from 'ramda';

describe('column renderers', function() {
  const data = [
    {a: 'abc', b: 'def', c: '123'},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
  ];
  const primaryKeyGen = R.prop('a');
  const columnRenderers = {
    b: function() {
      return <h1>Custom Stuff</h1>;
    },
  };
  let renderTree = null;

  before(function() {
    sinon.spy(columnRenderers, 'b');
  });

  beforeEach(function () {
    renderTree = TU.renderIntoDocument(
      <SimpleSuperTable
        data={data}
        columns={columns}
        primaryKeyGen={primaryKeyGen}
        columnRenderers={columnRenderers}
      />
    );
  });

  afterEach(function () {
    React.unmountComponentAtNode(document.body);
    columnRenderers.b.reset();
  });

  it('should render column a and b the normal way', function() {
    const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    const tr = TU.findRenderedDOMComponentWithTag(tbody, 'tr');
    const tds = TU.scryRenderedDOMComponentsWithTag(tbody, 'td');
    expect(tds[0].getDOMNode().textContent).to.equal(data[0]['a']);
    expect(tds[2].getDOMNode().textContent).to.equal(data[0]['c']);
  });

  it('should render the result of columnRenderer for column b', function () {
    expect(columnRenderers.b.lastCall.args).to.eql([data[0]['b'], data[0], 'b', '']);
    const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
    const tr = TU.findRenderedDOMComponentWithTag(tbody, 'tr');
    const tds = TU.scryRenderedDOMComponentsWithTag(tr, 'td');
    const h1 = TU.findRenderedDOMComponentWithTag(tds[1], 'h1');
    expect(h1).to.be.defined;
    expect(h1.getDOMNode().textContent).to.equal('Custom Stuff');
  });

  it('should pass the text filter to column renderer', function() {
    const input = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
    TU.Simulate.change(input, {target: {value: 'abc'}});
    expect(columnRenderers.b.lastCall.args).to.eql([data[0]['b'], data[0], 'b', 'abc']);
  });
});
