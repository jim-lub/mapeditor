import * as actions from './actions';
import * as selectors from './selectors';
import * as types from './types';

import { recordUndoAction } from '../history';

import {
  getMapGrid,
  getMapProperties,
  getColumnAndRowIndexBySegmentId
} from '../map';

import {
  getActiveLayerId,
  getActiveLayerProperties,
  getLayerSortOrder,
  getLayerPropertiesObject
} from '../layers';

import { setRequestStatus } from '../requestStatus';

import * as taskTypes from './worker/tasks/types';
import TaskWorker from './worker/segments.worker';
let taskWorker;

export const listenToTaskWorkerEvents = () => dispatch => {
  taskWorker = new TaskWorker();

  taskWorker.addEventListener('message', ({ data: { key, result, error } }) => {
    const handleDispatch = () => dispatch( _dispatchTaskWorkerEvent({ key, result, error }) );

    setTimeout(handleDispatch, 0);
  });
}

const _dispatchTaskWorkerEvent = ({ key, result, error }) => dispatch => {
  if (result) {
    const { updateReduxStore = false, reduxActionType, payload = {} } = result;

    // Abstract this code block away in future; currently needed to pass state to history
    if (reduxActionType === types.setTileValues) {
      // dispatch( recordUndoAction({ payload }) )
    }

    if (updateReduxStore && Object.values(types).includes(reduxActionType)) {
      dispatch({
        type: reduxActionType,
        payload
      });
    }
    dispatch( setRequestStatus({ key, type: 'SUCCESS' }) );
  }

  if (error) {
    // handle error
    dispatch( setRequestStatus({ key, type: 'FAILURE', error }) );
  }
}

const _sendTaskToWorker = ({ key, taskType, reduxActionType, payload }) => dispatch => {
  if (!taskWorker) return;

  dispatch( setRequestStatus({ key, type: 'REQUEST' }) );

  taskWorker.postMessage({
    key,
    taskType,
    reduxActionType,
    payload
  })
}

export const initializeStore = ({ tilemapDataObject }) => dispatch =>
  dispatch( actions.initializeStore({ tilemapDataObject }) );

export const clearStore = () => dispatch =>
  dispatch( actions.clearStore() );;

export const validateSegment = ({ segmentId }) => (dispatch, getState) => {
  const state = getState();
  const { segmentSize } = getMapProperties(state);
  const tilemapData = selectors.getTilemapData(state, { segmentId });
  const layerSortOrder = getLayerSortOrder(state);
  const layerProperties = getLayerPropertiesObject(state);

  dispatch( _sendTaskToWorker({
    /* payload return: { segmentId, tilemapData } */
    key: segmentId,
    taskType: taskTypes.validateSegment,
    reduxActionType: types.setTilemapData,
    payload: {
      segmentId,
      segmentSize,
      tilemapData,
      layerSortOrder,
      layerProperties
    }
  }));
}

export const setTileValues = ({ inputSegmentId, inputColumnIndex, inputRowIndex, pattern }) => (dispatch, getState)=> {
  const state = getState();
  const mapGrid = getMapGrid(state);
  const { columnIndex: inputSegmentColumnIndex, rowIndex: inputSegmentRowIndex } = getColumnAndRowIndexBySegmentId(state, { segmentId: inputSegmentId });
  const { segmentSize } = getMapProperties(state);
  const layerId = getActiveLayerId(state);
  const layerProperties = getActiveLayerProperties(state);

  dispatch( _sendTaskToWorker({
    /* payload return: { segmentIDs, layerId, list  } */
    key: 'randomKey',
    taskType: taskTypes.convertPatternToTilemapIndexes,
    reduxActionType: types.setTileValues,
    payload: {
      inputSegmentColumnIndex,
      inputSegmentRowIndex,
      inputTilemapColumnIndex: inputColumnIndex,
      inputTilemapRowIndex: inputRowIndex,
      pattern,
      mapGrid,
      segmentSize,
      layerId,
      layerProperties
    }
  }));
}

export const clearTileValues = ({ inputSegmentId, inputColumnIndex, inputRowIndex, pattern }) => (dispatch, getState)=> {
  const state = getState();
  const mapGrid = getMapGrid(state);
  const { columnIndex: inputSegmentColumnIndex, rowIndex: inputSegmentRowIndex } = getColumnAndRowIndexBySegmentId(state, { segmentId: inputSegmentId });
  const { segmentSize } = getMapProperties(state);
  const layerId = getActiveLayerId(state);
  const layerProperties = getActiveLayerProperties(state);

  dispatch( _sendTaskToWorker({
    /* payload return: { segmentIDs, layerId, list  } */
    key: 'randomKey',
    taskType: taskTypes.convertPatternToTilemapIndexes,
    reduxActionType: types.clearTileValues,
    payload: {
      inputSegmentColumnIndex,
      inputSegmentRowIndex,
      inputTilemapColumnIndex: inputColumnIndex,
      inputTilemapRowIndex: inputRowIndex,
      pattern,
      mapGrid,
      segmentSize,
      layerId,
      layerProperties
    }
  }));
}
