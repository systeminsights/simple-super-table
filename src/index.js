import SimpleSuperTable from './simple-super-table';
import {filterTextHighlightRenderer, barRenderer} from './column-renderers';

export default SimpleSuperTable;
export const columnRenderers = {
  filterTextHighlightRenderer: filterTextHighlightRenderer,
  barRenderer: barRenderer,
};
