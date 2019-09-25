export const buildTilemapDataArray = ({ segmentSize, tileSize }) => {
  const columns = segmentSize.width / tileSize.width;
  const rows = segmentSize.height / tileSize.height;

  return [...new Array( columns )].map((val, columnIndex) => {
    return [...new Array( rows )].map((val, rowIndex) => {
      // return 0;
      return "#"+((1<<24)*Math.random()|0).toString(16); // fill with random color for DEVELOPMENT ONLY -> replace with 0 (zero) fill
    })
  });
}
