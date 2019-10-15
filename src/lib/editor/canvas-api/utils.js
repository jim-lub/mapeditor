export const clearCanvas = (ctx, { canvasWidth, canvasHeight, sX = 0, sY = 0 }) => {
  if (!ctx) return;

  ctx.clearRect(
    sX,
    sY,
    canvasWidth,
    canvasHeight
  )
}

export const clearCanvasAndResetScaleTransform = (ctx, { canvasWidth, canvasHeight, sX = 0, sY = 0 }) => {
  if (!ctx) return;

  ctx.clearRect(
    sX,
    sY,
    1000,
    1000
  )

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}

export const setScaleTransform = (ctx, { scaleModifier }) => {
  if (!ctx) return;

  ctx.scale(scaleModifier, scaleModifier);
}
