export const setScaleTransform = ({ ctx, scale }) => {
  if (!ctx) return;

  ctx.setTransform(scale, 0, 0, scale, 0, 0);
}
