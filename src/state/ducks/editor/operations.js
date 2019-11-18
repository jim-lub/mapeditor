import {
  getLayerSortOrder,
  getLayerPropertiesObject
} from './layers';

import { getTilemapData } from './segments';

import { render } from 'lib/editor/canvas';

export const handleCanvasUpdate = ({ segmentId, canvasRef, canvasWidth, canvasHeight, zoomScaleModifier }) => (dispatch, getState) => {
  const state = getState();

  const layerSortOrder = getLayerSortOrder(state);
  const layerPropertiesObject = getLayerPropertiesObject(state);
  const tilemapData = getTilemapData(state, { segmentId });

  const paint = () => render({
    canvasRef, canvasWidth, canvasHeight,
    layerSortOrder, layerPropertiesObject,
    tilemapData,
    scale: zoomScaleModifier
  });

  window.requestAnimationFrame(paint);
}
