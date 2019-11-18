export const clearCanvas = (ctx, { canvasWidth, canvasHeight, sX = 0, sY = 0 }) => {
  if (!ctx) return;

  ctx.clearRect(
    sX,
    sY,
    canvasWidth,
    canvasHeight
  )
}
