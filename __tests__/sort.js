const React = require('react/addons');
const TU = React.addons.TestUtils;
const R = require('ramda');
const {SimpleSuperTable} = require('../src');

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
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort column a in ascending order', function() {
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[0].getDOMNode().textContent).to.equal(data[1]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[0].getDOMNode().textContent).to.equal(data[2]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[0].getDOMNode().textContent).to.equal(data[0]['a']);
    });
  });

  describe('provide default sort column', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          defaultSortColumn={'c'}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort column c in ascending order', function() {
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });
  });

  describe('provide default sort ascending', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
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
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
    });
  });

  describe('click column header to sort', function() {
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

    it('should sort column c in ascending order', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });

    it('should toggle sort for column c to descending order', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[2].getDOMNode());
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
    });

    it('should toggle sort for column c to ascending order', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[2].getDOMNode());
      TU.Simulate.click(ths[2].getDOMNode());
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });
  });

  describe('sortable columns', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          sortableColumns={['b', 'c']}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort by column b by default', function() {
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[1].getDOMNode().textContent).to.equal(data[2]['b']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[1].getDOMNode().textContent).to.equal(data[0]['b']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[1].getDOMNode().textContent).to.equal(data[1]['b']);
    });

    it('should disallow column a sort', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[1].getDOMNode().textContent).to.equal(data[2]['b']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[1].getDOMNode().textContent).to.equal(data[0]['b']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[1].getDOMNode().textContent).to.equal(data[1]['b']);
    });

    it('should allow column c sort', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
    });
  });

  describe('disable sort', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          sortableColumns={[]}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should not sort upfront', function() {
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[0].getDOMNode().textContent).to.equal(data[0]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[0].getDOMNode().textContent).to.equal(data[1]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[0].getDOMNode().textContent).to.equal(data[2]['a']);
    });

    it('should disallow column a sort', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[0].getDOMNode().textContent).to.equal(data[0]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[0].getDOMNode().textContent).to.equal(data[1]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[0].getDOMNode().textContent).to.equal(data[2]['a']);
    });

    it('should disallow column b sort', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[1].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[1].getDOMNode().textContent).to.equal(data[0]['b']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[1].getDOMNode().textContent).to.equal(data[1]['b']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[1].getDOMNode().textContent).to.equal(data[2]['b']);
    });

    it('should disallow column c sort', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[2].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[2].getDOMNode().textContent).to.equal(data[0]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[2].getDOMNode().textContent).to.equal(data[1]['c'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[2].getDOMNode().textContent).to.equal(data[2]['c'].toString());
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
          columnWidths={{a: 10, b: 10, c: 10}}
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
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(columnASorter).to.have.been.calledWith(data, 'a');
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[0].getDOMNode().textContent).to.equal(data[2]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[0].getDOMNode().textContent).to.equal(data[1]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[0].getDOMNode().textContent).to.equal(data[0]['a'].toString());
    });

    it('should sort column a using custom sorter in descending order', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const ths = TU.scryRenderedDOMComponentsWithClass(thead, 'col');
      TU.Simulate.click(ths[0].getDOMNode());
      TU.Simulate.click(ths[0].getDOMNode());
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(3);
      expect(columnASorter).to.have.been.calledWith(data, 'a');
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[0].getDOMNode().textContent).to.equal(data[0]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[0].getDOMNode().textContent).to.equal(data[1]['a'].toString());
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[0].getDOMNode().textContent).to.equal(data[2]['a'].toString());
    });
  });

  describe('case insensitive sort', function() {
    const data = [{a: 'aaa'}, {a: 'CBA'}, {a: 'ABC'}, {a: 'DEF'}];
    const columns = [{a: 'A'}];

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={R.prop('a')}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should sort column a in ascending order', function() {
      const tbody = TU.findRenderedDOMComponentWithClass(renderTree, 'table-body');
      const trs = TU.scryRenderedDOMComponentsWithClass(tbody, 'row');
      expect(trs.length).to.equal(4);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[0], 'col')[0].getDOMNode().textContent).to.equal(data[0]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[1], 'col')[0].getDOMNode().textContent).to.equal(data[2]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[2], 'col')[0].getDOMNode().textContent).to.equal(data[1]['a']);
      expect(TU.scryRenderedDOMComponentsWithClass(trs[3], 'col')[0].getDOMNode().textContent).to.equal(data[3]['a']);
    });
  })
});
