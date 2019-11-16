import {
  getLayerSortOrder,
  getLayerPropertiesObject
} from './layers';

import { getTilemapData } from './segments';

import { drawCanvasHandler } from 'lib/editor/canvas-api';

export const handleCanvasUpdate = ({ segmentId, canvasRef, canvasWidth, canvasHeight, zoomScaleModifier }) => (dispatch, getState) => {
  const state = getState();

  const layerProperties = getLayerPropertiesObject(state);
  const layerSortOrder = getLayerSortOrder(state);
  const tilemapData = getTilemapData(state, { segmentId });

  const paint = () => drawCanvasHandler({
    canvasRef, canvasWidth, canvasHeight,
    segmentId,
    layerSortOrder, layerProperties,
    tilemapData,
    zoomScaleModifier
  });

  window.requestAnimationFrame(paint);
}
