export const drawColorTile = ({ ctx, tileSize, tilemapColumnIndex, tilemapRowIndex, value }) => {
  if (!value || value === 0) return;

  ctx.fillRect(
    tileSize.width * tilemapColumnIndex,
    tileSize.height * tilemapRowIndex,
    tileSize.width,
    tileSize.height
  )
}
