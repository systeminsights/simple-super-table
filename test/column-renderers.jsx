import React from 'react/addons';
const TU = React.addons.TestUtils;
import R from 'ramda';
import {columnRenderers} from '../src';

describe('column renderers', function() {
  describe('filterTextHighlightRenderer', function() {
    const rowData = {a: 'abcabc', b: 'def', c: 123};

    it('should not highlight when filter text is empty', function() {
      const renderTree = TU.renderIntoDocument(columnRenderers.filterTextHighlightRenderer(rowData['a'], rowData, 'a', ''));
      const spans = TU.scryRenderedDOMComponentsWithTag(renderTree, 'span');
      expect(spans.length).to.equal(1);
      expect(spans[0].getDOMNode().textContent).to.equal(rowData['a']);
      expect(spans[0].getDOMNode().className).to.include('filter-text-highlight');
    });

    it('should create a highlight span for each match', function() {
      const renderTree = TU.renderIntoDocument(columnRenderers.filterTextHighlightRenderer(rowData['a'], rowData, 'a', 'a'));
      const spans = TU.scryRenderedDOMComponentsWithTag(renderTree, 'span');
      expect(spans.length).to.equal(5);
      expect(spans[0].getDOMNode().textContent).to.equal(rowData['a']);
      expect(spans[0].getDOMNode().className).to.include('filter-text-highlight');
      expect(spans[1].getDOMNode().textContent).to.equal('a');
      expect(spans[1].getDOMNode().className).to.include('highlight');
      expect(spans[2].getDOMNode().textContent).to.equal('bc');
      expect(spans[2].getDOMNode().className).not.to.include('highlight');
      expect(spans[3].getDOMNode().textContent).to.equal('a');
      expect(spans[3].getDOMNode().className).to.include('highlight');
      expect(spans[4].getDOMNode().textContent).to.equal('bc');
      expect(spans[4].getDOMNode().className).not.to.include('highlight');
    });

    it('should treat numerical match as string match', function() {
      const renderTree = TU.renderIntoDocument(columnRenderers.filterTextHighlightRenderer(rowData['c'], rowData, 'c', 3));
      const spans = TU.scryRenderedDOMComponentsWithTag(renderTree, 'span');
      expect(spans.length).to.equal(3);
      expect(spans[0].getDOMNode().textContent).to.equal(rowData['c'].toString());
      expect(spans[0].getDOMNode().className).to.include('filter-text-highlight');
      expect(spans[1].getDOMNode().textContent).to.equal('12');
      expect(spans[1].getDOMNode().className).not.to.include('highlight');
      expect(spans[2].getDOMNode().textContent).to.equal('3');
      expect(spans[2].getDOMNode().className).to.include('highlight');
    });
  });
});
