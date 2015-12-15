const React = require('react/addons');
const TU = React.addons.TestUtils;
const R = require('ramda');
const {SimpleSuperTable} = require('../src');

describe.skip('filtering rows', function() {
  const data = [
    {a: 'abc', b: 'def', c: 789},
    {a: 'jkl', b: 'mno', c: 456},
    {a: 'stu', b: 'vwx', c: 123},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
  ];
  const primaryKeyGen = R.prop('a');
  let renderTree = null;

  describe('filter by all columns', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('for column a', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'a'}});
      const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
      expect(rows.length).to.equal(1);
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols[0].getDOMNode().textContent).to.equal(data[0]['a']);
    });

    it('for column b', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'm'}});
      const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
      expect(rows.length).to.equal(1);
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols[1].getDOMNode().textContent).to.equal(data[1]['b']);
    });

    it('for column c', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 3}});
      const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
      expect(rows.length).to.equal(1);
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
    });
  });

  describe('filter by subset of columns', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          filterableColumns={['a', 'c']}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('for column a', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'a'}});
      const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
      expect(rows.length).to.equal(1);
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols[0].getDOMNode().textContent).to.equal(data[0]['a']);
    });

    it('for column b', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'm'}});
      const rows = TU.scryRenderedDOMComponentsWithTag(tableBody, 'row');
      expect(rows.length).to.equal(0);
    });

    it('for column c', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tableBody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 3}});
      const rows = TU.scryRenderedDOMComponentsWithClass(tableBody, 'row');
      expect(rows.length).to.equal(1);
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
    });
  });

  describe('filter by none', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          filterableColumns={[]}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should not render the filter box', function() {
      const filterContainer = TU.scryRenderedDOMComponentsWithClass(renderTree, 'filter-container');
      expect(filterContainer.length).to.equal(0);
    });
  });
});
