import * as actions from './actions';
import * as selectors from './selectors';
import * as utils from './utils';

import { uuid } from 'lib/utils';
import layerConstants from 'lib/constants/layerConstants';

export const initializeStore = ({ layerSortOrder = [], layerPropertiesObject }) => dispatch => {
  if (layerSortOrder.length === 0) return;

  layerSortOrder.forEach(layerId => {
    const {
      layerType,
      layerName,
      tileSize,
      visible = true,
      locked = false
    } = layerPropertiesObject[layerId];

    dispatch( actions.setLayerPropertiesById({
        layerId,
        layerType,
        layerName,
        tileSize,
        visible,
        locked
    }));
  });

  dispatch( actions.setLayerSortOrder({ layerSortOrder }) );
}

export const clearStore = () => dispatch => {
  dispatch( actions.clearActiveLayerId() );
  dispatch( actions.clearLayerSortOrder() );
  dispatch( actions.clearAllLayerProperties() );
}

export const createLayer = ({ layerType, layerName, tileSize }) => (dispatch, getState) => {
  const state = getState();
  const layerId = uuid.create();
  const sortOrder = selectors.getLayerSortOrder( state );
  const layerSortOrder = utils.modifyLayerSortOrderArray({ sortOrder, layerId, action: 'add' });
  const defaultLayerName = layerConstants[layerType].defaultNewLayerName + (selectors.getCreatedLayersCount(state, { layerType }) + 1).toString();

  dispatch( actions.incrementCreatedLayersCount({ layerType }) );

  dispatch( actions.setLayerPropertiesById({
      layerId,
      layerType,
      layerName: layerName || defaultLayerName,
      tileSize,
      visible: true,
      locked: false
  }));

  dispatch( actions.setLayerSortOrder({ layerSortOrder }));
  dispatch( actions.setActiveLayerId({ layerId }));
}

export const deleteLayer = ({ layerId }) => (dispatch, getState) => {
  const sortOrder = selectors.getLayerSortOrder( getState() );
  const layerSortOrder = utils.modifyLayerSortOrderArray({ sortOrder, layerId, action: 'remove' });
  dispatch( actions.setLayerSortOrder({ layerSortOrder }));
  dispatch( actions.clearLayerPropertiesById({ layerId }));
}

export const updateLayer = ({ layerId, layerName }) => dispatch => {
  dispatch( actions.setLayerPropertiesById({
      layerId,
      layerName
  }));
}

export const moveLayer = ({ sourceIndex, destinationIndex }) => (dispatch, getState)=> {
  const sortOrder = selectors.getLayerSortOrder( getState() );
  const layerSortOrder = utils.modifyLayerSortOrderArray({ sortOrder, sourceIndex, destinationIndex, action: 'move' });

  dispatch( actions.setLayerSortOrder({ layerSortOrder }));
}

export const toggleLayerVisibility = ({ layerId }) => (dispatch, getState) => {
  const layerProperties = selectors.getLayerPropertiesById( getState(), { layerId } );

  dispatch( actions.setLayerPropertiesById({
      layerId,
      visible: !layerProperties.visible
  }));
}

export const toggleLayerLock = ({ layerId }) => (dispatch, getState) => {
  const layerProperties = selectors.getLayerPropertiesById( getState(), { layerId } );
  dispatch( actions.setLayerPropertiesById({
      layerId,
      locked: !layerProperties.locked
  }));
}

export const setActiveLayerId = actions.setActiveLayerId;
