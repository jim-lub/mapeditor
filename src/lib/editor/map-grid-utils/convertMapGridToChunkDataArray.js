const MAX_CHUNK_SIZE = 10000;

export const convertMapGridToChunkDataArray = ({ mapProperties, mapGrid }) => {
  const { columns, rows } = mapProperties.mapSize;
  const TOTAL_CHUNKS = Math.ceil( ( columns * rows ) / MAX_CHUNK_SIZE );
  const COLUMNS_PER_CHUNK = Math.ceil( columns / TOTAL_CHUNKS );

  return [...new Array(TOTAL_CHUNKS)].map((data, index) => {
    const indexStart = ( index * COLUMNS_PER_CHUNK );
    const indexEnd = (index + 1) * COLUMNS_PER_CHUNK;
    const chunk = mapGrid.slice(indexStart, indexEnd);

    return ( chunk.length > 0 )
      ? JSON.stringify( chunk )
      : null;
  });
};
