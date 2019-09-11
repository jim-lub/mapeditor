export const convertChunkDataArrayToMapGrid = ({ chunkDataArray }) => {
  const mapGrid = [];

  chunkDataArray.forEach(data => mapGrid.push( ...JSON.parse( data )));

  return mapGrid;
}
