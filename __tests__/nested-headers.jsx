import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import SimpleSuperTable from '../src';

import sampleData from '../fixtures/sample-data';

describe('nested headers', function() {
  const data = sampleData.orders;
  const primaryKeyGen = R.prop('a');

  describe('one nested column to the right', function() {
    const columns = [
      {orderDate: 'Order Date'},
      {region: 'Region'},
      {rep: 'Representative'},
      {item: 'Item'},
      {units: 'Units'},
      {
        span: 'Cost',
        columns: [
          {unitCost: 'Unit'},
          {total: 'Total'},
        ],
      },
    ];
    let renderTree = null;

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

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      expect(trs.length).to.equal(2);
    });

    it('should render spanned ths', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      const ths = TU.scryRenderedDOMComponentsWithTag(trs[0], 'th');
      expect(ths.length).to.equal(2);
      expect(ths[0].props.colSpan).to.equal(5);
      expect(ths[0]._reactInternalInstance._currentElement.key).to.equal('0');
      expect(ths[0].getDOMNode().textContent).to.be.empty;
      expect(ths[1].props.colSpan).to.equal(2);
      expect(ths[1]._reactInternalInstance._currentElement.key).to.equal('5');
      expect(ths[1].getDOMNode().textContent).to.equal(columns[5].span);
    });
  });

  describe('two nested columns to the right', function() {
    const columns = [
      {orderDate: 'Order Date'},
      {region: 'Region'},
      {rep: 'Representative'},
      {
        span: 'Item',
        columns: [
          {item: 'Name'},
          {units: 'Units'},
        ],
      },
      {
        span: 'Cost',
        columns: [
          {unitCost: 'Unit'},
          {total: 'Total'},
        ],
      },
    ];
    let renderTree = null;

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

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      expect(trs.length).to.equal(2);
    });

    it('should render spanned ths', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      const ths = TU.scryRenderedDOMComponentsWithTag(trs[0], 'th');
      expect(ths.length).to.equal(3);
      expect(ths[0].props.colSpan).to.equal(3);
      expect(ths[0]._reactInternalInstance._currentElement.key).to.equal('0');
      expect(ths[0].getDOMNode().textContent).to.be.empty;
      expect(ths[1].props.colSpan).to.equal(2);
      expect(ths[1]._reactInternalInstance._currentElement.key).to.equal('3');
      expect(ths[1].getDOMNode().textContent).to.equal(columns[3].span);
      expect(ths[2].props.colSpan).to.equal(2);
      expect(ths[2]._reactInternalInstance._currentElement.key).to.equal('5');
      expect(ths[2].getDOMNode().textContent).to.equal(columns[4].span);
    });
  });

  describe('one nested column to the left', function() {
    const columns = [
      {
        span: 'Order',
        columns: [
          {orderDate: 'Order Date'},
          {region: 'Region'},
        ],
      },
      {rep: 'Representative'},
      {item: 'Name'},
      {units: 'Units'},
      {unitCost: 'Unit'},
      {total: 'Total'},
    ];
    let renderTree = null;

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

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      expect(trs.length).to.equal(2);
    });

    it('should render spanned ths', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      const ths = TU.scryRenderedDOMComponentsWithTag(trs[0], 'th');
      expect(ths.length).to.equal(2);
      expect(ths[0].props.colSpan).to.equal(2);
      expect(ths[0]._reactInternalInstance._currentElement.key).to.equal('0');
      expect(ths[0].getDOMNode().textContent).to.equal(columns[0].span);
      expect(ths[1].props.colSpan).to.equal(5);
      expect(ths[1]._reactInternalInstance._currentElement.key).to.equal('2');
      expect(ths[1].getDOMNode().textContent).to.be.empty;
    });
  });

  describe('two nested columns to the left', function() {
    const columns = [
      {
        span: 'Order',
        columns: [
          {orderDate: 'Order'},
          {region: 'Region'},
        ]
      },
      {
        span: 'Sale',
        columns: [
          {rep: 'Representative'},
          {item: 'Name'},
        ],
      },
      {units: 'Units'},
      {unitCost: 'Unit'},
      {total: 'Total'},
    ];
    let renderTree = null;

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

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      expect(trs.length).to.equal(2);
    });

    it('should render spanned ths', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      const ths = TU.scryRenderedDOMComponentsWithTag(trs[0], 'th');
      expect(ths.length).to.equal(3);
      expect(ths[0].props.colSpan).to.equal(2);
      expect(ths[0]._reactInternalInstance._currentElement.key).to.equal('0');
      expect(ths[0].getDOMNode().textContent).to.equal(columns[0].span);
      expect(ths[1].props.colSpan).to.equal(2);
      expect(ths[1]._reactInternalInstance._currentElement.key).to.equal('2');
      expect(ths[1].getDOMNode().textContent).to.equal(columns[1].span);
      expect(ths[2].props.colSpan).to.equal(3);
      expect(ths[2]._reactInternalInstance._currentElement.key).to.equal('4');
      expect(ths[2].getDOMNode().textContent).to.be.empty;
    });
  });

  describe('two nested columns on either side', function() {
    const columns = [
      {
        span: 'Order',
        columns: [
          {orderDate: 'Order'},
          {region: 'Region'},
        ]
      },
      {rep: 'Representative'},
      {item: 'Name'},
      {units: 'Units'},
      {
        span: 'Cost',
        columns: [
          {unitCost: 'Unit'},
          {total: 'Total'},
        ],
      },
    ];
    let renderTree = null;

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

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      expect(trs.length).to.equal(2);
    });

    it('should render spanned ths', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      const ths = TU.scryRenderedDOMComponentsWithTag(trs[0], 'th');
      expect(ths.length).to.equal(3);
      expect(ths[0].props.colSpan).to.equal(2);
      expect(ths[0]._reactInternalInstance._currentElement.key).to.equal('0');
      expect(ths[0].getDOMNode().textContent).to.equal(columns[0].span);
      expect(ths[1].props.colSpan).to.equal(3);
      expect(ths[1]._reactInternalInstance._currentElement.key).to.equal('2');
      expect(ths[1].getDOMNode().textContent).to.be.empty;
      expect(ths[2].props.colSpan).to.equal(2);
      expect(ths[2]._reactInternalInstance._currentElement.key).to.equal('5');
      expect(ths[2].getDOMNode().textContent).to.equal(columns[4].span);
    });
  });


  describe('scattered nested columns', function() {
    const columns = [
      {orderDate: 'Order'},
      {region: 'Region'},
      {
        span: 'Sale',
        columns: [
          {rep: 'Representative'},
          {item: 'Name'},
        ],
      },
      {
        span: 'Unit',
        columns: [
          {unitCost: 'Cost'},
          {units: 'Units'},
        ],
      },
      {total: 'Total'},
    ];
    let renderTree = null;

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

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      expect(trs.length).to.equal(2);
    });

    it('should render spanned ths', function() {
      const thead = TU.findRenderedDOMComponentWithTag(renderTree, 'thead');
      const trs = TU.scryRenderedDOMComponentsWithTag(thead, 'tr');
      const ths = TU.scryRenderedDOMComponentsWithTag(trs[0], 'th');
      expect(ths.length).to.equal(4);
      expect(ths[0].props.colSpan).to.equal(2);
      expect(ths[0]._reactInternalInstance._currentElement.key).to.equal('0');
      expect(ths[0].getDOMNode().textContent).to.be.empty;
      expect(ths[1].props.colSpan).to.equal(2);
      expect(ths[1]._reactInternalInstance._currentElement.key).to.equal('2');
      expect(ths[1].getDOMNode().textContent).to.equal(columns[2].span);
      expect(ths[2].props.colSpan).to.equal(2);
      expect(ths[2]._reactInternalInstance._currentElement.key).to.equal('4');
      expect(ths[2].getDOMNode().textContent).to.equal(columns[3].span);
      expect(ths[3].props.colSpan).to.equal(1);
      expect(ths[3]._reactInternalInstance._currentElement.key).to.equal('6');
      expect(ths[3].getDOMNode().textContent).to.be.empty;
    });
  })
});
