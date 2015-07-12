import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import SimpleSuperTable from '../src';

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

  describe('export filtered csv', function() {
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

    it('should disable filter csv button', function() {
      const filterCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'csv-filter');
      expect(filterCSVButton.getDOMNode().className).to.contain('disabled');
      TU.Simulate.click(filterCSVButton);
      expect(document.createElement).not.to.have.been.calledWith('a');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('href');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('download', 'Test Table.csv');
    });
  });

  describe('no data after filtering', function() {
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
          primaryKeyGen={primaryKeyGen}
          title={title}
        />
      );
      createElement = sinon.stub(document, 'createElement').returns(mockLink);
      const filterInput = TU.findRenderedDOMComponentWithTag(renderTree, 'input');
      TU.Simulate.change(filterInput.getDOMNode(), {target: {value: 'xyz'}});
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

    it('should disable filter csv button', function() {
      const filterCSVButton = TU.findRenderedDOMComponentWithClass(renderTree, 'csv-filter');
      expect(filterCSVButton.getDOMNode().className).to.contain('disabled');
      TU.Simulate.click(filterCSVButton);
      expect(document.createElement).not.to.have.been.calledWith('a');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('href');
      expect(mockLink.setAttribute).not.to.have.been.calledWith('download', 'Test Table.csv');
    });
  });
});
