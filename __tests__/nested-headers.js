const React = require('react/addons');
const TU = React.addons.TestUtils;
const R = require('ramda');
const {SimpleSuperTable} = require('../src');

const sampleData = require('../fixtures/sample-data');

describe('nested headers', function() {
  const data = sampleData.orders;
  const columnWidths = {
    orderDate: 10,
    region: 10,
    rep: 10,
    item: 10,
    units: 10,
    unitCost: 10,
    total: 10,
  };
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
          columnWidths={columnWidths}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      expect(rows.length).to.equal(2);
    });

    it('should render spanned cols', function() {
      const tableHeader = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(tableHeader, 'row');
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols.length).to.equal(6);
      expect(cols[0].getDOMNode().textContent).to.be.empty;
      expect(cols[1].getDOMNode().textContent).to.be.empty;
      expect(cols[2].getDOMNode().textContent).to.be.empty;
      expect(cols[3].getDOMNode().textContent).to.be.empty;
      expect(cols[4].getDOMNode().textContent).to.be.empty;
      expect(cols[5].getDOMNode().textContent).to.equal(columns[5].span);
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
          columnWidths={columnWidths}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should render two header rows', function() {
      const tableHeader = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(tableHeader, 'row');
      expect(rows.length).to.equal(2);
    });

    it('should render spanned cols', function() {
      const tableHeader = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(tableHeader, 'row');
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols.length).to.equal(5);
      expect(cols[0].getDOMNode().textContent).to.be.empty;
      expect(cols[1].getDOMNode().textContent).to.be.empty;
      expect(cols[2].getDOMNode().textContent).to.be.empty;
      expect(cols[3].getDOMNode().textContent).to.equal(columns[3].span);
      expect(cols[4].getDOMNode().textContent).to.equal(columns[4].span);
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
          columnWidths={columnWidths}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      expect(rows.length).to.equal(2);
    });

    it('should render spanned cols', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols.length).to.equal(6);
      expect(cols[0].getDOMNode().textContent).to.equal(columns[0].span);
      expect(cols[1].getDOMNode().textContent).to.be.empty;
      expect(cols[2].getDOMNode().textContent).to.be.empty;
      expect(cols[3].getDOMNode().textContent).to.be.empty;
      expect(cols[4].getDOMNode().textContent).to.be.empty;
      expect(cols[5].getDOMNode().textContent).to.be.empty;
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
          columnWidths={columnWidths}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      expect(rows.length).to.equal(2);
    });

    it('should render spanned cols', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols.length).to.equal(5);
      expect(cols[0].getDOMNode().textContent).to.equal(columns[0].span);
      expect(cols[1].getDOMNode().textContent).to.equal(columns[1].span);
      expect(cols[2].getDOMNode().textContent).to.be.empty;
      expect(cols[3].getDOMNode().textContent).to.be.empty;
      expect(cols[4].getDOMNode().textContent).to.be.empty;
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
          columnWidths={columnWidths}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      expect(rows.length).to.equal(2);
    });

    it('should render spanned cols', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols.length).to.equal(5);
      expect(cols[0].getDOMNode().textContent).to.equal(columns[0].span);
      expect(cols[2].getDOMNode().textContent).to.be.empty;
      expect(cols[3].getDOMNode().textContent).to.be.empty;
      expect(cols[4].getDOMNode().textContent).to.equal(columns[4].span);
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
          columnWidths={columnWidths}
          primaryKeyGen={primaryKeyGen}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should render two header rows', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      expect(rows.length).to.equal(2);
    });

    it('should render spanned cols', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols.length).to.equal(5);
      expect(cols[0].getDOMNode().textContent).to.be.empty;
      expect(cols[1].getDOMNode().textContent).to.be.empty;
      expect(cols[2].getDOMNode().textContent).to.equal(columns[2].span);
      expect(cols[3].getDOMNode().textContent).to.equal(columns[3].span);
      expect(cols[4].getDOMNode().textContent).to.be.empty;
    });
  })
});
