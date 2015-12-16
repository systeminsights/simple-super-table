import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import SimpleSuperTable from '../src';

describe('filtering rows', function() {
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
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('for column a', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'a'}});
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(1);
      const tds = TU.scryRenderedDOMComponentsWithTag(trs[0], 'td');
      expect(tds[0].getDOMNode().textContent).to.equal(data[0]['a']);
    });

    it('for column b', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'm'}});
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(1);
      const tds = TU.scryRenderedDOMComponentsWithTag(trs[0], 'td');
      expect(tds[1].getDOMNode().textContent).to.equal(data[1]['b']);
    });

    it('for column c', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 3}});
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(1);
      const tds = TU.scryRenderedDOMComponentsWithTag(trs[0], 'td');
      expect(tds[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
    });
  });

  describe('filter by subset of columns', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
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
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'a'}});
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(1);
      const tds = TU.scryRenderedDOMComponentsWithTag(trs[0], 'td');
      expect(tds[0].getDOMNode().textContent).to.equal(data[0]['a']);
    });

    it('for column b', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 'm'}});
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(0);
    });

    it('for column c', function() {
      const inputField = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      TU.Simulate.change(inputField.getDOMNode(), {target: {value: 3}});
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(1);
      const tds = TU.scryRenderedDOMComponentsWithTag(trs[0], 'td');
      expect(tds[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
    });
  });

  describe('filter by none', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
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
