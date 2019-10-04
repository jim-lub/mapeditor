import * as types from './types';

export const setTilemapDataObject = ({ tilemapDataObject }) => ({
  type: types.setTilemapDataObject,
  payload: { tilemapDataObject }
});

export const clearTilemapDataObject = () => ({
  type: types.clearTilemapDataObject
});


export const setTilemapDataSegment = ({ segmentId, tilemapData }) => ({
  type: types.setTilemapDataSegment,
  payload: {
    segmentId,
    tilemapData
  }
});

export const clearTilemapDataSegment = ({ segmentId }) => ({
  type: types.clearTilemapDataSegment,
  payload: { segmentId }
});


export const addLayerToTilemapDataSegment = ({ segmentId, layerId, tilemapData }) => ({
  type: types.addLayerToTilemapDataSegment,
  payload: {
    segmentId,
    layerId,
    tilemapData
  }
});

export const removeLayerFromTilemapDataSegment = ({ segmentId, layerId }) => ({
  type: types.removeLayerFromTilemapDataSegment,
  payload: {
    segmentId,
    layerId
  }
});


export const setSingleTileValue = ({ segmentId, layerId, columnIndex, rowIndex, value }) => ({
  type: types.setSingleTileValue,
  payload: {
    segmentId,
    layerId,
    columnIndex,
    rowIndex,
    value
  }
});

export const clearSingleTileValue = ({ segmentId, layerId, columnIndex, rowIndex }) => ({
  type: types.clearSingleTileValue,
  payload: {
    segmentId,
    layerId,
    columnIndex,
    rowIndex
  }
});
