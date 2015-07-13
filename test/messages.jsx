import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import SimpleSuperTable from '../src';

describe('messages', function() {
  describe('data exists', function() {
    const data = [
      {a: 'abc', b: 'def', c: '123'},
      {a: 'jkl', b: 'mno', c: '456'},
      {a: 'pqr', b: 'stu', c: '789'},
    ];
    const columns = [
      {a: 'A'},
      {b: 'B'},
      {c: 'C'},
    ];
    const primaryKeyGen = R.prop('a');
    const title = 'Test Table';
    let renderTree = null;

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

    it('should not display no data message', function() {
      const noDataMessage = TU.scryRenderedDOMComponentsWithClass(renderTree, 'no-data-message');
      expect(noDataMessage.length).to.equal(0);
    });
  });

  describe('no data', function() {
    const data = [];
    const columns = [
      {a: 'A'},
      {b: 'B'},
      {c: 'C'},
    ];
    const primaryKeyGen = R.prop('a');
    const title = 'Test Table';
    let renderTree = null;

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

    it('should display a message', function() {
      const noDataMessage = TU.findRenderedDOMComponentWithClass(renderTree, 'no-data-message');
      expect(noDataMessage.getDOMNode().textContent).to.equal('No data');
    });
  });

  describe('no data with custom message', function() {
    const data = [];
    const columns = [
      {a: 'A'},
      {b: 'B'},
      {c: 'C'},
    ];
    const primaryKeyGen = R.prop('a');
    const title = 'Test Table';
    let renderTree = null;

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          title={title}
          messages={{'No data': 'Custom no data message'}}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should display the custom message', function() {
      const noDataMessage = TU.findRenderedDOMComponentWithClass(renderTree, 'no-data-message');
      expect(noDataMessage.getDOMNode().textContent).to.equal('Custom no data message');
    });
  });

  describe('no data after filter', function() {
    const data = [
      {a: 'abc', b: 'def', c: '123'},
      {a: 'jkl', b: 'mno', c: '456'},
      {a: 'pqr', b: 'stu', c: '789'},
    ];
    const columns = [
      {a: 'A'},
      {b: 'B'},
      {c: 'C'},
    ];
    const primaryKeyGen = R.prop('a');
    const title = 'Test Table';
    let renderTree = null;

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          title={title}
        />
      );
      const filterInput = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      TU.Simulate.change(filterInput, {target: {value: 'xyz'}});
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should display a message', function() {
      const noMatchingDataMessage = TU.findRenderedDOMComponentWithClass(renderTree, 'no-matching-data-message');
      expect(noMatchingDataMessage.getDOMNode().textContent).to.equal('No matching data');
    });
  });

  describe('no data after filter with custom message', function() {
    const data = [
      {a: 'abc', b: 'def', c: '123'},
      {a: 'jkl', b: 'mno', c: '456'},
      {a: 'pqr', b: 'stu', c: '789'},
    ];
    const columns = [
      {a: 'A'},
      {b: 'B'},
      {c: 'C'},
    ];
    const primaryKeyGen = R.prop('a');
    const title = 'Test Table';
    let renderTree = null;

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          title={title}
          messages={{'No matching data': 'Custom no matching data message'}}
        />
      );
      const filterInput = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      TU.Simulate.change(filterInput, {target: {value: 'xyz'}});
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should display the custom message', function() {
      const noMatchingDataMessage = TU.findRenderedDOMComponentWithClass(renderTree, 'no-matching-data-message');
      expect(noMatchingDataMessage.getDOMNode().textContent).to.equal('Custom no matching data message');
    });
  });

  describe('data exists after filter', function() {
    const data = [
      {a: 'abc', b: 'def', c: '123'},
      {a: 'jkl', b: 'mno', c: '456'},
      {a: 'pqr', b: 'stu', c: '789'},
    ];
    const columns = [
      {a: 'A'},
      {b: 'B'},
      {c: 'C'},
    ];
    const primaryKeyGen = R.prop('a');
    const title = 'Test Table';
    let renderTree = null;

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          primaryKeyGen={primaryKeyGen}
          title={title}
          />
      );
      const filterInput = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      TU.Simulate.change(filterInput, {target: {value: 'abc'}});
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should not display a message', function() {
      const noMatchingDataMessage = TU.scryRenderedDOMComponentsWithClass(renderTree, 'no-matching-data-message');
      expect(noMatchingDataMessage.length).to.equal(0);
    });
  });
});
