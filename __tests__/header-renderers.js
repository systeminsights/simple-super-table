const React = require('react/addons');
const TU = React.addons.TestUtils;
const R = require('ramda');
const {SimpleSuperTable} = require('../src');

const sampleData = require('../fixtures/sample-data');

describe('header renderers', function() {
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
  const headerRenderers = {
    total: (colKey, sortAscending, columnWidth) => <h1>CUSTOM TOTAL</h1>
  };
  const primaryKeyGen = R.prop('a');

  describe('one nested column to the right', function() {
    const columns = [
      {orderDate: 'Order Date'},
      {region: 'Region'},
      {rep: 'Representative'},
      {item: 'Item'},
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
          headerRenderers={headerRenderers}
        />
      );
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
    });

    it('should render one header row', function() {
      const thead = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(thead, 'row');
      expect(rows.length).to.equal(1);
    });

    it('should render custom rendered cols', function() {
      const tableHeader = TU.findRenderedDOMComponentWithClass(renderTree, 'table-header');
      const rows = TU.scryRenderedDOMComponentsWithClass(tableHeader, 'row');
      const cols = TU.scryRenderedDOMComponentsWithClass(rows[0], 'col');
      expect(cols.length).to.equal(7);
      expect(cols[0].getDOMNode().textContent).to.equal(columns[0].orderDate);
      expect(cols[1].getDOMNode().textContent).to.equal(columns[1].region);
      expect(cols[2].getDOMNode().textContent).to.equal(columns[2].rep);
      expect(cols[3].getDOMNode().textContent).to.equal(columns[3].item);
      expect(cols[4].getDOMNode().textContent).to.equal(columns[4].units);
      expect(cols[5].getDOMNode().textContent).to.equal(columns[5].unitCost);
      expect(cols[6].getDOMNode().textContent).to.not.equal(columns[6].total);

      const totalColumn = TU.findRenderedDOMComponentWithTag(cols[6], 'h1');
      expect(totalColumn.getDOMNode().textContent).to.equal('CUSTOM TOTAL');
    });
  });
});
