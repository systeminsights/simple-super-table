import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import SimpleSuperTable from '../src';

describe('events', function() {
  const data = [
    {a: 'abc', b: 'lmn', c: 123},
    {a: 'def', b: 'opq', c: 456},
    {a: 'ghi', b: 'rst', c: 789},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
  ];
  const primaryKeyGen = R.prop('a');
  let renderTree = null;

  describe('row click', function () {
    let rowClickHandler = null;

    beforeEach(function () {
      rowClickHandler = sinon.stub();

      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          onRowClick={rowClickHandler}
        />
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(document.body);
    });

    it('should invoke the row click handler', function () {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      TU.Simulate.click(trs[1].getDOMNode());
      expect(rowClickHandler).to.have.been.calledWith(data[1]);
    });
  });

  describe('column click', function () {
    let rowClickHandler = null;
    let columnClickHandler = null;

    beforeEach(function () {
      rowClickHandler = sinon.stub();
      columnClickHandler = sinon.stub();

      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          onRowClick={rowClickHandler}
          onColumnClick={columnClickHandler}
        />
      );
    });

    afterEach(function () {
      React.unmountComponentAtNode(document.body);
    });

    it('should invoke the column click handler', function () {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      const tds = TU.scryRenderedDOMComponentsWithTag(trs[1], 'td');
      expect(tds.length).to.equal(3);
      TU.Simulate.click(tds[1].getDOMNode());
      expect(columnClickHandler).to.have.been.calledWith(data[1]['b'], data[1], 'b');
    });

    it('should not invoke the row click handler', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      const tds = TU.scryRenderedDOMComponentsWithTag(trs[1], 'td');
      expect(tds.length).to.equal(3);
      TU.Simulate.click(tds[1].getDOMNode());
      expect(rowClickHandler).not.to.have.been.called;
    });
  });
});
