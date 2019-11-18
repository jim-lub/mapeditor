import { drawColorTile } from '../utils';

export const colorLayer = ({ ctx, tileSize, tilemap }) => {
  tilemap.forEach((tilemapColumn, tilemapColumnIndex) => {
    tilemapColumn.forEach((value, tilemapRowIndex) => {
      drawColorTile({
        ctx,
        tileSize,
        tilemapColumnIndex,
        tilemapRowIndex,
        value
      })
    })
  })
}
