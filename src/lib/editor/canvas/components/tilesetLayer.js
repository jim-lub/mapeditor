import { drawImageTile } from '../utils';

export const tilesetLayer = ({ ctx, image, tileSize, tilemap }) => {
  tilemap.forEach((tilemapColumn, tilemapColumnIndex) => {
    tilemapColumn.forEach((value, tilemapRowIndex) => {
      drawImageTile({
        ctx,
        image,
        tileSize,
        tilemapColumnIndex,
        tilemapRowIndex,
        value
      })
    })
  })
}
