import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import SimpleSuperTable from '../src';

describe('sort', function() {
  const data = [
    {a: 'stu', b: 'mno', c: 123},
    {a: 'abc', b: 'vwx', c: 789},
    {a: 'jkl', b: 'def', c: 456},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
  ];
  const primaryKeyGen = R.prop('a');
  let renderTree = null;

  describe('default', function() {
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

    it('should sort column a in ascending order', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[0].getDOMNode().textContent).to.equal(data[1]['a']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[0].getDOMNode().textContent).to.equal(data[2]['a']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[0].getDOMNode().textContent).to.equal(data[0]['a']);
    });
  });

  describe('provide default sort column', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          defaultSortColumn={'c'}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort column c in ascending order', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });
  });

  describe('provide default sort ascending', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          defaultSortColumn={'c'}
          defaultSortAscending={false}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort column c in descending order', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
    });
  });

  describe('click column header to sort', function() {
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

    it('should sort column c in ascending order', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });

    it('should toggle sort for column c to descending order', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[2].getDOMNode());
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
    });

    it('should toggle sort for column c to ascending order', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[2].getDOMNode());
      TU.Simulate.click(ths[2].getDOMNode());
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });
  });

  describe('sortable columns', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          sortableColumns={['b', 'c']}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort by column b by default', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[1].getDOMNode().textContent).to.equal(data[2]['b']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[1].getDOMNode().textContent).to.equal(data[0]['b']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[1].getDOMNode().textContent).to.equal(data[1]['b']);
    });

    it('should disallow column a sort', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[1].getDOMNode().textContent).to.equal(data[2]['b']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[1].getDOMNode().textContent).to.equal(data[0]['b']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[1].getDOMNode().textContent).to.equal(data[1]['b']);
    });

    it('should allow column c sort', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });
  });

  describe('disable sort', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          sortableColumns={[]}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should not sort upfront', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[0].getDOMNode().textContent).to.equal(data[0]['a']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[0].getDOMNode().textContent).to.equal(data[1]['a']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[0].getDOMNode().textContent).to.equal(data[2]['a']);
    });

    it('should disallow column a sort', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[0].getDOMNode().textContent).to.equal(data[0]['a']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[0].getDOMNode().textContent).to.equal(data[1]['a']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[0].getDOMNode().textContent).to.equal(data[2]['a']);
    });

    it('should disallow column b sort', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[1].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[1].getDOMNode().textContent).to.equal(data[0]['b']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[1].getDOMNode().textContent).to.equal(data[1]['b']);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[1].getDOMNode().textContent).to.equal(data[2]['b']);
    });

    it('should disallow column c sort', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
    });
  });

  describe('custom sorter', function() {
    const columnASorter = sinon.spy(function(data, colKey) {
      return R.sort((a, b) => {
        // Custom ordering jkl < abc < stu
        const ordering = {jkl: 0, abc: 1, stu: 2};
        return ordering[R.prop(colKey, a)] - ordering[R.prop(colKey, b)];
      }, data);
    });

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          defaultSortColumn={'c'}
          columnSorters={{a: columnASorter}}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort column a using custom sorter', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(columnASorter).to.have.been.calledWith(data, 'a');
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[0].getDOMNode().textContent).to.equal(data[2]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[0].getDOMNode().textContent).to.equal(data[1]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[0].getDOMNode().textContent).to.equal(data[0]['a'].toString());
    });

    it('should sort column a using custom sorter in descending order', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
      TU.Simulate.click(ths[0].getDOMNode());
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs.length).to.equal(3);
      expect(columnASorter).to.have.been.calledWith(data, 'a');
      expect(TU.scryRenderedDOMComponentsWithTag(trs[0], 'td')[0].getDOMNode().textContent).to.equal(data[0]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[1], 'td')[0].getDOMNode().textContent).to.equal(data[1]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithTag(trs[2], 'td')[0].getDOMNode().textContent).to.equal(data[2]['a'].toString());
    });
  });
});
