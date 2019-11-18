import {
  colorLayer,
  tilesetLayer
} from './components';

import {
  clearCanvasAndResetScaleTransform,
  setScaleTransform
} from './utils';

import * as layerTypes from 'lib/constants/layerTypes';

// replace this block after tileset upload feature is implemented
import tilesetImageConfig from 'lib/constants/__dev__/tilesetImageConfig';
let image = new Image();
image.src = tilesetImageConfig.image;
// replace this block after tileset upload feature is implemented

export default ({
  canvasRef, canvasWidth, canvasHeight,
  layerSortOrder, layerPropertiesObject,
  tilemapData, scale
}) => {
  if (!canvasRef || !canvasRef.current) return;
  const ctx = canvasRef.current.getContext('2d');

  clearCanvasAndResetScaleTransform({ ctx, canvasWidth, canvasHeight });
  setScaleTransform({ ctx, scale });

  layerSortOrder.forEach(layerId => {
    const { layerType, tileSize, visible } = layerPropertiesObject[layerId];
    const tilemap = tilemapData[layerId];

    if (!tilemap) return;

    if (visible && layerType === layerTypes.color) {
      colorLayer({
        ctx,
        tileSize,
        tilemap
      })
    }

    if (visible && layerType === layerTypes.tileset) {
      tilesetLayer({
        ctx,
        image,
        tileSize,
        tilemap
      })
    }
  })
}
