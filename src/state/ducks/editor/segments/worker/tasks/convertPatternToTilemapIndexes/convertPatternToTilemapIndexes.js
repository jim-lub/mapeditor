import _ from 'lodash';

export default ({
  inputSegmentColumnIndex, inputSegmentRowIndex,
  inputTilemapColumnIndex, inputTilemapRowIndex, pattern,
  mapGrid, segmentSize, layerId, layerProperties: { tileSize }
}) => {
  // console.log('---------------------------------');
  // console.log('received pattern and processing..');
  // console.log('position:  ', inputTilemapColumnIndex, inputTilemapRowIndex);
  // console.log('layerId:   ', layerId)
  // console.log('layerType: ', pattern.layerType);
  // console.log('grid:      ', pattern.grid);
  // console.log('list:      ', pattern.list);
  // console.log('mapgrid:   ', mapGrid);

  const tilemapSize = {
    columns: segmentSize.width / tileSize.width,
    rows: segmentSize.height / tileSize.height
  }

  const indexesList = _patternToTilemapIndexesList({
    inputSegmentColumnIndex,
    inputSegmentRowIndex,
    inputTilemapColumnIndex,
    inputTilemapRowIndex,
    pattern: pattern.grid,
    tilemapSize
  });

  const indexesListWithSegmentIDs = indexesList
    .map(({ segmentColumnIndex, segmentRowIndex, ...rest }) => {
      const segmentId = (mapGrid[segmentColumnIndex]) ? mapGrid[segmentColumnIndex][segmentRowIndex] : null;

      return (segmentId)
        ? { segmentId, ...rest }
        : null
    })
    .filter(val => val);

  const segmentIDs = _.uniq( indexesListWithSegmentIDs.map(({ segmentId }) => segmentId) );

  return {
    updateReduxStore: true,
    payload: {
      segmentIDs,
      layerId,
      list: indexesListWithSegmentIDs,
    }
  }
}

const _patternToTilemapIndexesList = ({ ...rest }) => {
  return _.flatten(
    _convertColumnIndexes({ ...rest })
  );
}

const _convertColumnIndexes = ({
  inputSegmentColumnIndex, inputTilemapColumnIndex,
  pattern, tilemapSize, ...rest
}) => {
  let columnStep = -1;
  let columnOffset = Number(inputTilemapColumnIndex);
  let segmentColumnIndex = Number(inputSegmentColumnIndex);

  return pattern.map((patternColumn, patternColumnIndex) => {
    columnStep++;
    let tilemapColumnIndex = patternColumnIndex + columnOffset;

    if ((tilemapColumnIndex + 1) > tilemapSize.columns) {
      tilemapColumnIndex = 0;
      columnOffset = -columnStep;
      segmentColumnIndex++;
    }

    return _convertRowIndexes({
      segmentColumnIndex,
      tilemapColumnIndex,
      patternColumn,
      tilemapSize,
      ...rest
    })
  });
}

const _convertRowIndexes = ({
  segmentColumnIndex, inputSegmentRowIndex,
  tilemapColumnIndex, inputTilemapRowIndex,
  patternColumn, tilemapSize
}) => {
  let rowStep = -1;
  let rowOffset = Number(inputTilemapRowIndex);
  let segmentRowIndex = Number(inputSegmentRowIndex);

  return patternColumn.map((value, patternRowIndex) => {
    rowStep++;
    let tilemapRowIndex = patternRowIndex + rowOffset;
    if ((tilemapRowIndex + 1) > tilemapSize.rows) {
      tilemapRowIndex = 0;
      rowOffset = -rowStep;
      segmentRowIndex++;
    }

    if (!value) return null;

    return {
      segmentColumnIndex,
      segmentRowIndex,
      tilemapColumnIndex,
      tilemapRowIndex,
      value
    }
  })
}
