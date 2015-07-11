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
    const title = 'Test Title';

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

    it('should assign class to the main container', function() {
      expect(renderTree.getDOMNode().className).to.contain('simple-super-table');
    });

    it('should assign title class to title', function() {
      const titleDiv = TU.findRenderedDOMComponentWithClass(renderTree, 'title-container');
      const titleSpan = TU.findRenderedDOMComponentWithTag(titleDiv, 'span');
      expect(titleSpan.getDOMNode().className).to.contain('title');
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

  describe('rowClassGetter', function() {
    const rowClassGetter = sinon.spy(R.always('my-row'));

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          rowClassGetter={rowClassGetter}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
      rowClassGetter.reset();
    });

    it('should add the result of invocation to row class', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const trs = TU.scryRenderedDOMComponentsWithTag(tbody, 'tr');
      expect(rowClassGetter).to.have.been.calledWith(data[0]);
      expect(rowClassGetter).to.have.been.calledWith(data[1]);
      expect(rowClassGetter).to.have.been.calledWith(data[2]);
      expect(trs[0].getDOMNode().className).to.contain('my-row');
      expect(trs[1].getDOMNode().className).to.contain('my-row');
      expect(trs[2].getDOMNode().className).to.contain('my-row');
    });
  });

  describe('columnClassGetter', function() {
    const columnClassGetter = sinon.spy(R.always('my-col'));

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data.slice(0, 1)}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          columnClassGetter={columnClassGetter}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
      columnClassGetter.reset();
    });

    it('should add the result of invocation to column class', function() {
      const tbody = TU.findRenderedDOMComponentWithTag(renderTree, 'tbody');
      const tr = TU.findRenderedDOMComponentWithTag(tbody, 'tr');
      const tds = TU.scryRenderedDOMComponentsWithTag(tr, 'td');
      expect(columnClassGetter).to.have.been.calledWith(data[0]['a'], data[0], 'a');
      expect(columnClassGetter).to.have.been.calledWith(data[0]['b'], data[0], 'b');
      expect(columnClassGetter).to.have.been.calledWith(data[0]['c'], data[0], 'c');
      expect(tds[0].getDOMNode().className).to.contain('my-col');
      expect(tds[1].getDOMNode().className).to.contain('my-col');
      expect(tds[2].getDOMNode().className).to.contain('my-col');
    });
  });
});
