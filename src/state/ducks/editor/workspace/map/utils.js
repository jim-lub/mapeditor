export const validateMapProperties = ({ mapProperties }) => {
  if (!mapProperties.hasOwnProperty('mapSize')) {
    mapProperties['mapSize'] = {
      columns: 1,
      rows: 1
    }
  }

  if (!mapProperties.hasOwnProperty('segmentSize')) {
    mapProperties['segmentSize'] = {
      width: 512,
      height: 512
    }
  }

  if (!mapProperties.hasOwnProperty('allowedTileSizes')) {
    mapProperties['allowedTileSizes'] = [16, 32, 64, 128, 256];
  }

  return mapProperties;
}

export const buildMapGrid = ({ mapGrid, mapProperties }) => {
  const { columns, rows } = mapProperties.mapSize;
  let columnIndex = 0;
  let rowIndex = 0;

  return [...new Array(columns)].map(() => {
    const rowArray = [...new Array(rows)].map(() => {
      let value;

      if (mapGrid[columnIndex]) {
        if (mapGrid[columnIndex][rowIndex]) {
          value = mapGrid[columnIndex][rowIndex];
        } else {
          console.log('NEW ID')
          value = "NEW ID: " + columnIndex + ", " + rowIndex;
        }
      } else {
        console.log('NEW ID')
        value = "NEW ID: " + columnIndex + ", " + rowIndex;
      }

      rowIndex++;
      return value;
    });

    rowIndex = 0;
    columnIndex++;

    return rowArray;
  });
}

export const buildLayerPropertiesObject = () => {

}

export const buildSegmentPropertiesObject = () => {

}

export const buildTilemapDataObject = () => {

}
