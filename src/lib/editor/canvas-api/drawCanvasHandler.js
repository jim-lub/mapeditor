import * as utils from './utils';

import * as layerTypes from 'lib/constants/layerTypes';

export const drawCanvasHandler = (canvasRef, canvasWidth, canvasHeight, {
  segmentId,
  layerProperties, layerSortOrder,
  tilemapData, zoomScaleModifier
}) => {
  if (!canvasRef || !canvasRef.current) {
    return;
  }

  const ctx = canvasRef.current.getContext('2d');

  utils.clearCanvasAndResetScaleTransform(ctx, { canvasWidth, canvasHeight });
  utils.setScaleTransform(ctx, { scaleModifier: zoomScaleModifier });

  layerSortOrder.forEach((layerId, index) => {
    const { layerType, tileSize, visible } = layerProperties[layerId];
    const tilemap = tilemapData[layerId];

    if (visible && layerType === layerTypes.color) {
      _drawColorLayer(ctx, {
        tileSize,
        tilemap
      })
    }

    if (visible && layerType === layerTypes.tileset) {
      _drawTilesetLayer(ctx, {
        tileSize,
        tilemap
      })
    }

    if (visible && layerType === layerTypes.collision) {

    }

  });

  // const  drawSegmentBorder = false;
  // if (drawSegmentBorder) {
  //   ctx.strokeStyle = "#b5b5b5";
  //   ctx.beginPath();
  //   ctx.moveTo(canvasWidth, 0);
  //   ctx.lineTo(canvasWidth, canvasHeight);
  //   ctx.lineTo(0, canvasHeight);
  //   ctx.stroke();
  // }
}

const _drawColorLayer = (ctx, { tileSize, tilemap }) => {
  tilemap.forEach((tilemapColumn, columnIndex) => {
    tilemapColumn.forEach((tileValue, rowIndex) => {

      if (tileValue && tileValue !== 0) {
        ctx.fillStyle = "#" + tileValue;

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

const _drawTilesetLayer = (ctx, { tileSize, tilemap }) => {
  tilemap.forEach((tilemapColumn, columnIndex) => {
    tilemapColumn.forEach((tileValue, rowIndex) => {

      if (tileValue && tileValue !== 0) {
        ctx.fillStyle = "red";
        ctx.font = "10px Arial";
        ctx.fillText(
          `${tileValue}`,
          Math.round(tileSize.width * columnIndex + 5),
          Math.round(tileSize.height * rowIndex + 10),
        );
      }

    })
  })
}

// const _drawCollisionLayer = (ctx, { tileSize }) => {
//
// }
