const React = require('react/addons');
const TU = React.addons.TestUtils;
const R = require('ramda');
const {SimpleSuperTable} = require('../src');

describe('CSV export', function() {
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

  describe('export original csv', function() {
    const mockLink = {
      setAttribute: sinon.stub(),
      click: sinon.stub(),
    };
    let createElement = null;

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          title={title}
        />
      );
      createElement = sinon.stub(document, 'createElement').returns(mockLink);
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
      createElement.restore();
      mockLink.setAttribute.reset();
      mockLink.click.reset();
    });

    it('should invoke download', function() {
      const originalCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'original-csv');
      TU.Simulate.click(originalCSVButton);
      expect(document.createElement).to.have.been.calledWith('a');
      expect(mockLink.setAttribute).to.have.been.calledWith('href'); // TODO: Verify the passed CSV data
      expect(mockLink.setAttribute).to.have.been.calledWith('download', 'Test Table.csv');
    });
  });

  describe.skip('export filtered csv', function() {
    const mockLink = {
      setAttribute: sinon.stub(),
      click: sinon.stub(),
    };
    let createElement = null;

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={data}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          title={title}
          />
      );
      createElement = sinon.stub(document, 'createElement').returns(mockLink);
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
      createElement.restore();
      mockLink.setAttribute.reset();
      mockLink.click.reset();
    });

    it('should invoke download', function() {
      const filterCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'csv-filter');
      TU.Simulate.click(filterCSVButton);
      expect(document.createElement).to.have.been.calledWith('a');
      expect(mockLink.setAttribute).to.have.been.calledWith('href'); // TODO: Verify the passed CSV data
      expect(mockLink.setAttribute).to.have.been.calledWith('download', 'Test Table.csv');
    });
  });

  describe('no data provided', function() {
    const mockLink = {
      setAttribute: sinon.stub(),
      click: sinon.stub(),
    };
    let createElement = null;

    beforeEach(function() {
      renderTree = TU.renderIntoDocument(
        <SimpleSuperTable
          data={[]}
          columns={columns}
          columnWidths={{a: 10, b: 10, c: 10}}
          primaryKeyGen={primaryKeyGen}
          title={title}
        />
      );
      createElement = sinon.stub(document, 'createElement').returns(mockLink);
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
      createElement.restore();
      mockLink.setAttribute.reset();
      mockLink.click.reset();
    });

    it('should disable original csv button', function() {
      const originalCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'original-csv');
      expect(originalCSVButton.getDOMNode().className).to.contain('disabled');
      TU.Simulate.click(originalCSVButton);
      expect(document.createElement).not.to.have.been.calledWith('a');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('href');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('download', 'Test Table.csv');
    });

    it.skip('should disable filter csv button', function() {
      const filterCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'csv-filter');
      expect(filterCSVButton.getDOMNode().className).to.contain('disabled');
      TU.Simulate.click(filterCSVButton);
      expect(document.createElement).not.to.have.been.calledWith('a');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('href');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('download', 'Test Table.csv');
    });
  });

  describe.skip('no data after filtering', function() {
    const mockLink = {
      setAttribute: sinon.stub(),
      click: sinon.stub(),
    };
    let createElement = null;

    beforeEach(function() {
      try {
        renderTree = TU.renderIntoDocument(
          <SimpleSuperTable
            data={data}
            columns={columns}
            columnWidths={{a: 10, b: 10, c: 10}}
            primaryKeyGen={primaryKeyGen}
            title={title}
          />
        );
        createElement = sinon.stub(document, 'createElement').returns(mockLink);
        const filterInput = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
        TU.Simulate.change(filterInput.getDOMNode(), {target: {value: 'xyz'}});
      } catch (err) {
        console.dir(err);
      }
    });

    afterEach(function() {
      React.unmountComponentAtNode(document.body);
      createElement.restore();
      mockLink.setAttribute.reset();
      mockLink.click.reset();
    });

    it('should invoke download on original csv button', function() {
      const originalCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'original-csv');
      expect(originalCSVButton.getDOMNode().className).not.to.contain('disabled');
      TU.Simulate.click(originalCSVButton);
      expect(document.createElement).to.have.been.calledWith('a');
      expect(mockLink.setAttribute).to.have.been.calledWith('href'); // TODO: Verify the passed CSV data
      expect(mockLink.setAttribute).to.have.been.calledWith('download', 'Test Table.csv');
    });

    it.skip('should disable filter csv button', function() {
      const filterCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'csv-filter');
      expect(filterCSVButton.getDOMNode().className).to.contain('disabled');
      TU.Simulate.click(filterCSVButton);
      expect(document.createElement).not.to.have.been.calledWith('a');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('href');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('download', 'Test Table.csv');
    });
  });

  describe('no filterable columns', function() {
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

    it('should not render the csv filter button', function() {
      const filterCSVButton = TU.scryRenderedDOMComponentsWithClass(renderTree, 'csv-filter');
      expect(filterCSVButton.length).to.equal(0);
    });
  });
});
