import _ from 'lodash';

import { buildGrid } from 'lib/utils';

export const createPattern = ({ size, value, selection }) => {
  if (size) {
    const { grid = [], list = [] } = _createPatternBySize({ size, value });

    console.log(grid, list);
  }

  if (selection) {
    const { grid = [], list = [] } = _createPatternBySelection({ selection });

    console.log(grid, list);
  }

  return [];
}

const _createPatternBySize = ({ size: { columns = 0, rows = 0 }, value }) => {
  const grid = buildGrid({
    columns,
    rows,
    fill: value
  });

  const list = _.flatten(
    grid.map((column, columnIndex) =>
      column.map((value, rowIndex) => ({
        columnIndex,
        rowIndex,
        value
      }))
    )
  );

  return {
    grid,
    list
  }
}

const _createPatternBySelection = ({ selection }) => {
  if (selection.length === 0) return {};

  const { columnIndex: lowestColumnIndex } = _.minBy(selection, 'columnIndex');
  const { columnIndex: highestColumnIndex } = _.maxBy(selection, 'columnIndex');
  const { rowIndex: lowestRowIndex } = _.minBy(selection, 'rowIndex');
  const { rowIndex: highestRowIndex } = _.maxBy(selection, 'rowIndex');

  const selectionBoundaryWidthInColumns = (highestColumnIndex + 1) - lowestColumnIndex;
  const selectionBoundaryHeightInRows = (highestRowIndex + 1) - lowestRowIndex;
  const selectionColumnOffset = lowestColumnIndex;
  const selectionRowOffset = lowestRowIndex;

  const sortedSelection = _.sortBy(selection, ['columnIndex', 'rowIndex']);
  const selectionList = sortedSelection
    .map(({ columnIndex, rowIndex }) => ({
      columnIndex: columnIndex - selectionColumnOffset,
      rowIndex: rowIndex - selectionRowOffset,
      tilesetColumnIndex: columnIndex,
      tilesetRowIndex: rowIndex
    }));

  const selectionGrid = buildGrid({
    columns: selectionBoundaryWidthInColumns,
    rows: selectionBoundaryHeightInRows,
    fill: ({ columnIndex, rowIndex }) => {
      const selected = _.find(selectionList, { columnIndex , rowIndex });

      if (selected) {
        const { tilesetColumnIndex, tilesetRowIndex } = selected;

        return ({
          tilesetColumnIndex,
          tilesetRowIndex
        });
      }

      return null;
    }
  });

  return {
    grid: selectionGrid,
    list: selectionList
  }
}

export const inputModifiersObjectContains = (inputModifiersObject, modifierKeys = []) => {
  const activeKeys = Object.entries(inputModifiersObject)
    .filter(([modifierKey, value]) => value)
    .map(([modifierKey, value]) => modifierKey);

  if (activeKeys.length !== modifierKeys.length) return false;
  if (activeKeys.length === 0 && modifierKeys.length === 0) return true;

  return modifierKeys.every(modifierKey => activeKeys.includes(modifierKey));
}
