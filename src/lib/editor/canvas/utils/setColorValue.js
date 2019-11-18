export const setColorValue = ({ ctx, value }) => {
  if (ctx.fillStyle === value) return;
  if (ctx.fillStyle === `#${value}`) return;

  if (value && value !== 0) {
    if (value.startsWith('#')) {
      ctx.fillStyle = value;
    } else {
      ctx.fillStyle = "#" + value;
    }
  }
}
