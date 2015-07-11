import React from 'react/addons';
const TU = React.addons.TestUtils;
import SimpleSuperTable from '../src/';
import R from 'ramda';

import sampleData from '../fixtures/sample-data';

describe('styling', function() {
  const data = [
    {a: 'abc', b: 'def', c: 123},
    {a: 'ghi', b: 'jkl', c: 456},
    {a: 'mno', b: 'pqr', c: 789},
  ];
  const columns = [
    {a: 'A'},
    {b: 'B'},
    {c: 'C'},
  ];
  const primaryKeyGen = R.prop('a');
  let renderTree = null;

  describe('base classes', function() {
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

    it('should assign class to the main container', function() {
      expect(renderTree.getDOMNode().className).to.contain('simple-super-table');
    });

    it('should assign class to filter input', function() {
      const input = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      expect(input.getDOMNode().className).to.contain('filter');
    });

    it('should assign col and colKey to header column class', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const tr = TU.findRenderedDOMComponentWithTag(thead, 'tr');
      const ths = TU.scryRenderedDOMComponentsWithTag(tr, 'th');
      expect(ths[0].getDOMNode().className).to.contain('col');
      expect(ths[0].getDOMNode().className).to.contain('a');
      expect(ths[1].getDOMNode().className).to.contain('col');
      expect(ths[1].getDOMNode().className).to.contain('b');
      expect(ths[2].getDOMNode().className).to.contain('col');
      expect(ths[2].getDOMNode().className).to.contain('c');
    });

    it('should assign row to body rows', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(trs[0].getDOMNode().className).to.contain('row');
      expect(trs[1].getDOMNode().className).to.contain('row');
      expect(trs[2].getDOMNode().className).to.contain('row');
    });

    it('should assign col and colKey to body column class', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const tds = TU.scryRenderedDOMComponentsWithTag(tbody, 'td');
      expect(tds[0].getDOMNode().className).to.contain('col');
      expect(tds[0].getDOMNode().className).to.contain('a');
      expect(tds[1].getDOMNode().className).to.contain('col');
      expect(tds[1].getDOMNode().className).to.contain('b');
      expect(tds[2].getDOMNode().className).to.contain('col');
      expect(tds[2].getDOMNode().className).to.contain('c');
    });
  });

  describe('sorted column headers', function() {
    describe('ascending', function() {
      beforeEach(function() {
        renderTree = TU.renderIntoDocument(
          <SimpleSuperTable
            data={data}
            columns={columns}
            primaryKeyGen={primaryKeyGen}
            sortableColumns={['a', 'c']}
            defaultSortColumn={'a'}
            defaultSortAscending={true}
          />
        );
      });

      afterEach(function() {
        React.unmountComponentAtNode(document.body);
      });

      it('should assign sorted class to column a', function() {
        const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
        const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
        expect(ths[0].getDOMNode().className).to.contain('sorted');
        expect(ths[0].getDOMNode().className).to.contain('asc');
        expect(ths[1].getDOMNode().className).not.to.contain('sorted');
        expect(ths[2].getDOMNode().className).not.to.contain('sorted');
      });
    });

    describe('descending', function() {
      beforeEach(function() {
        renderTree = TU.renderIntoDocument(
          <SimpleSuperTable
            data={data}
            columns={columns}
            primaryKeyGen={primaryKeyGen}
            sortableColumns={['a', 'c']}
            defaultSortColumn={'c'}
            defaultSortAscending={false}
          />
        );
      });

      afterEach(function() {
        React.unmountComponentAtNode(document.body);
      });

      it('should assign sorted class to column c', function() {
        const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
        const ths = TU.scryRenderedDOMComponentsWithTag(thead, 'th');
        expect(ths[0].getDOMNode().className).not.to.contain('sorted');
        expect(ths[1].getDOMNode().className).not.to.contain('sorted');
        expect(ths[2].getDOMNode().className).to.contain('sorted');
        expect(ths[2].getDOMNode().className).to.contain('desc');
      });
    });
  });

  describe('onRowClick event handler defined', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          onRowClick={R.identity}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should assign row-clickable to main container', function() {
      expect(renderTree.getDOMNode().className).to.contain('row-clickable');
    });
  });

  describe('onColumnClick event handler defined', function() {
    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          onColumnClick={R.identity}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should assign col-clickable to main container', function() {
      expect(renderTree.getDOMNode().className).to.contain('col-clickable');
    });

    it('should not assign row-clickable to main container', function() {
      expect(renderTree.getDOMNode().className).not.to.contain('row-clickable');
    });
  });
});
