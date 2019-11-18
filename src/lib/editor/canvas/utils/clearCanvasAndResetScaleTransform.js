export const clearCanvasAndResetScaleTransform = ({ ctx, canvasWidth, canvasHeight, sX = 0, sY = 0 }) => {
  if (!ctx) return;

  ctx.clearRect(
    sX,
    sY,
    canvasWidth,
    canvasHeight
  )

  ctx.setTransform(1, 0, 0, 1, 0, 0);
}
