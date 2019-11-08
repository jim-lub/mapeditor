import _ from 'lodash';

export const selectionGridToFlattenedTilemapIndexList = ({
  selectionGrid, tilemapSize,
  initialMapGridColumnIndex, initialMapGridRowIndex,
  initialTilemapColumnIndex, initialTilemapRowIndex
}) => {
  const grid = _selectionIndexesToTilemapIndexes({
    selectionGrid, tilemapSize,
    initialMapGridColumnIndex, initialMapGridRowIndex,
    initialTilemapColumnIndex, initialTilemapRowIndex
  });

  const list = _.flatten(grid).filter(val => val);

  return list;
}

const _selectionIndexesToTilemapIndexes = ({
  selectionGrid, tilemapSize,
  initialMapGridColumnIndex, initialMapGridRowIndex,
  initialTilemapColumnIndex, initialTilemapRowIndex
}) => {
  let columnStep = -1;
  let columnOffset = initialTilemapColumnIndex;
  let mapGridColumnIndex = initialMapGridColumnIndex;

  return selectionGrid.map((selectionColumn, selectionColumnIndex) => {
    let tilemapColumnIndex = selectionColumnIndex + columnOffset;

    columnStep++;
    if ((tilemapColumnIndex + 1) > tilemapSize.columns) {
      tilemapColumnIndex = 0;
      columnOffset = -columnStep;
      mapGridColumnIndex++;
    }

    return _convertIndexesInRow({
      tilemapSize,
      selectionColumn,
      mapGridColumnIndex,
      tilemapColumnIndex,
      initialMapGridRowIndex,
      initialTilemapRowIndex
    });
  });
}

const _convertIndexesInRow = ({
  tilemapSize, selectionColumn,
  mapGridColumnIndex, tilemapColumnIndex,
  initialMapGridRowIndex, initialTilemapRowIndex
}) => {
  let rowStep = -1;
  let rowOffset = initialTilemapRowIndex;
  let mapGridRowIndex = initialMapGridRowIndex;

  return selectionColumn.map((selectionValue, selectionRowIndex) => {
    if (!selectionValue) return null;
    const { tilesetColumnIndex, tilesetRowIndex } = selectionValue;
    let tilemapRowIndex = selectionRowIndex + rowOffset;

    rowStep++;
    if ((tilemapRowIndex + 1) > tilemapSize.rows) {
      tilemapRowIndex = 0;
      rowOffset = -rowStep;
      mapGridRowIndex++;
    }

    return {
      mapGridColumnIndex,
      mapGridRowIndex,
      tilemapColumnIndex,
      tilemapRowIndex,
      tilesetColumnIndex,
      tilesetRowIndex
    }
  });
}
