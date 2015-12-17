const React = require('react/addons');
const TU = React.addons.TestUtils;
const R = require('ramda');
const {SimpleSuperTable} = require('../src');

describe('events', function () {
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
  const primaryIntKeyGen = R.prop('c');
  let renderTree = null;

  describe('row click', function () {
    let rowClickHandler = null;

    describe('when primary key is a string', function () {
      beforeEach(function () {
        rowClickHandler = sinon.stub();

        renderTree = TU.renderIntoDocument(
          <SimpleSuperTable
            data={data}
            columns={columns}
            columnWidths={{a: 10, b: 10, c: 10}}
            primaryKeyGen={primaryKeyGen}
            onRowClick={rowClickHandler}
          />
        );
      });

      afterEach(function () {
        React.unmountComponentAtNode(document.body);
      });

      it('should invoke the row click handler', function () {
        const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
        const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
        expect(rows.length).to.equal(3);
        TU.Simulate.click(rows[1].getDOMNode());
        expect(rowClickHandler).to.have.been.calledWith(data[1]);
      });
    });

    describe('when primary key is not a string', function () {
      beforeEach(function () {
        rowClickHandler = sinon.stub();

        renderTree = TU.renderIntoDocument(
          <SimpleSuperTable
            data={data}
            columns={columns}
            columnWidths={{a: 10, b: 10, c: 10}}
            primaryKeyGen={primaryIntKeyGen}
            onRowClick={rowClickHandler}
          />
        );
      });

      afterEach(function () {
        React.unmountComponentAtNode(document.body);
      });

      it('should invoke the row click handler', function () {
        const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
        const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
        expect(rows.length).to.equal(3);
        TU.Simulate.click(rows[1].getDOMNode());
        expect(rowClickHandler).to.have.been.calledWith(data[1]);
      });
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
          columnWidths={{a: 10, b: 10, c: 10}}
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
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
      expect(rows.length).to.equal(3);
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[1], 'col');
      expect(cols.length).to.equal(3);
      TU.Simulate.click(cols[1].getDOMNode());
      expect(columnClickHandler).to.have.been.calledWith(data[1]['b'], data[1], 'b');
    });

    it('should not invoke the row click handler', function () {
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
      expect(rows.length).to.equal(3);
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[1], 'col');
      expect(cols.length).to.equal(3);
      TU.Simulate.click(cols[1].getDOMNode());
      expect(rowClickHandler).not.to.have.been.called;
    });
  });
});
