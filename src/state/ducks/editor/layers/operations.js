import * as actions from './actions';
import * as selectors from './selectors';
import * as utils from './utils';

import { uuid } from 'lib/utils';

export const initializeStore = ({ layerSortOrder = [], layerPropertiesObject }) => dispatch => {
  if (layerSortOrder.length === 0) return;
  layerSortOrder.forEach(layerId => {
    const {
      type: layerType,
      name: layerName,
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
  const layerId = uuid.create();
  const sortOrder = selectors.getLayerSortOrder( getState() );
  const layerSortOrder = utils.modifyLayerSortOrderArray({ sortOrder, layerId, action: 'add' });

  dispatch( actions.setLayerPropertiesById({
      layerId,
      layerType,
      layerName,
      tileSize,
      visible: true,
      locked: false
  }));

  dispatch( actions.setLayerSortOrder({ layerSortOrder }));
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
