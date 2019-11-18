export const drawImageTile = ({
  ctx, image, tileSize,
  tilemapColumnIndex, tilemapRowIndex, value
}) => {
  if (!value || value === 0) return;
  const [tilesetColumnIndex, tilesetRowIndex] = value;

  ctx.drawImage(
    image,
    tileSize.width * tilesetColumnIndex,
    tileSize.height * tilesetRowIndex,
    tileSize.width,
    tileSize.height,
    tileSize.width * tilemapColumnIndex,
    tileSize.height * tilemapRowIndex,
    64,
    64
  )
}
