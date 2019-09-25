import * as actions from './actions';
import * as selectors from './selectors';

import * as tilemapDataUtils from 'lib/editor/tilemap-data-utils';
import {
  uuid,
  buildTwoDimensionalArray
} from 'lib/utils';

export const buildMapGrid = ({ mapProperties: { mapSize }, firestoreMapGrid }) => (
  buildTwoDimensionalArray({
    columns: mapSize.columns,
    rows: mapSize.rows,
    mapFn: ({ columnIndex, rowIndex }) => {
      const uuid_prefix = `S3G-${columnIndex}${rowIndex}-`;

      if (firestoreMapGrid[columnIndex]) {
        if (firestoreMapGrid[columnIndex][rowIndex]) {
          return firestoreMapGrid[columnIndex][rowIndex];
        }
      }

      return uuid.create( uuid_prefix );
    }
  })
)

export const convertMapGridToDataChunks = ({ mapProperties: { mapSize }, mapGrid }) => {
  const MAX_COLUMNS_PER_CHUNK = 20;
  const chunks = Math.ceil( mapSize.columns / MAX_COLUMNS_PER_CHUNK );

  return [...new Array(chunks)].map((val, index) => {
    const indexStart = index * MAX_COLUMNS_PER_CHUNK;
    const indexEnd = (index + 1) * MAX_COLUMNS_PER_CHUNK;

    return JSON.stringify( mapGrid.slice(indexStart, indexEnd) )
  })
}

export const convertDataChunksToMapGrid = ({ dataChunks = [] }) => (
  dataChunks
    .map(dataChunk => JSON.parse(dataChunk))
    .reduce((mapGrid, dataChunk) => mapGrid.concat( dataChunk ), [])
)


export const validateTilemapDataBySegmentId = ({ segmentId }) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let isModified = false;
    const state = getState();

    const { segmentSize } = selectors.getMapProperties(state);
    const tilemapData = selectors.getTilemapDataBySegmentId(state, { segmentId });
    const layerSortOrder = selectors.getLayerSortOrder(state);

    layerSortOrder.forEach(layerId => {
      if (tilemapData[layerId]) {
        /*
          validate tiles; if columns and row match return else error
        */
        return;
      }

      const { tileSize } = selectors.getLayerPropertiesById(state, { layerId });
      tilemapData[layerId] = tilemapDataUtils.buildTilemapDataArray({ segmentSize, tileSize });
      isModified = true;
    });

    if (isModified) {
      dispatch( actions.setTilemapDataBySegmentId({ segmentId, tilemapData }))
    }

    resolve()
  });
}

export const buildTilemapDataSegment = () => (dispatch, getState) => {
  const state = getState();
  const { segmentSize } = selectors.getMapProperties(state);
  const layerSortOrder = selectors.getLayerSortOrder(state);

  return layerSortOrder.reduce((obj, layerId) => ({
    ...obj,
    [layerId]: buildTwoDimensionalArray({
      columns: segmentSize.width / selectors.getLayerPropertiesById(state, { layerId }).tileSize.width,
      rows: segmentSize.height / selectors.getLayerPropertiesById(state, { layerId }).tileSize.height,
      mapFn: () => {
        return 0
        // return "#"+((1<<24)*Math.random()|0).toString(16); // fill with random color for DEVELOPMENT ONLY -> replace with 0 (zero) fill
      }
    })
  }), {});
}

export const convertTilemapDataToDataChunks = () => {

}

export const convertDataChunksToTilemapData = () => {

}

export const inputModifiersObjectMatches = (inputModifiersObject, modifierKeys = []) => {
  const activeKeys = Object.entries(inputModifiersObject)
    .filter(([modifierKey, value]) => value)
    .map(([modifierKey, value]) => modifierKey);

  if (activeKeys.length !== modifierKeys.length) return false;
  if (activeKeys.length === 0 && modifierKeys.length === 0) return true;

  return modifierKeys.every(modifierKey => activeKeys.includes(modifierKey));
}
