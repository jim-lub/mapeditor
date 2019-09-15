import * as utils from './utils';

import * as layerTypes from 'lib/constants/layerTypes';

export const drawCanvasHandler = (canvasRef, canvasWidth, canvasHeight, {
  segmentId, segmentProperties,
  layerProperties, layerSortOrder,
  tilemapData
}) => {
  if (!canvasRef || !canvasRef.current) {
    return;
  }

  const ctx = canvasRef.current.getContext('2d');

  utils.clearCanvasAndResetScaleTransform(ctx, { canvasWidth, canvasHeight });
  utils.setScaleTransform(ctx, { scaleModifier: 1 });

  layerSortOrder.forEach((layerId, index) => {
    const { type, tileSize, visible } = layerProperties[layerId];
    const tilemap = tilemapData[layerId];

    if (visible && type === layerTypes.color) {
      _drawColorLayer(ctx, {
        tileSize,
        tilemap
      })
    }

    if (visible && type === layerTypes.tileset) {

    }

    if (visible && type === layerTypes.collision) {

    }

  });
}

const _drawColorLayer = (ctx, { tileSize, tilemap }) => {
  tilemap.forEach((tilemapColumn, columnIndex) => {
    tilemapColumn.forEach((tileValue, rowIndex) => {

      if (tileValue) {
        ctx.fillStyle = tileValue;

        ctx.fillRect(
          Math.round(tileSize.width * columnIndex),
          Math.round(tileSize.height * rowIndex),
          tileSize.width,
          tileSize.height
        )
      }

    })
  })
}

// const _drawTilesetLayer = (ctx, { tileSize }) => {
//
// }
//
// const _drawCollisionLayer = (ctx, { tileSize }) => {
//
// }
