import {
  uuid,
  memorySizeOf,
  buildTwoDimensionalArray
} from 'state/lib/utils';

import * as mapConstants from 'lib/constants/mapConstants';

export const buildMapGrid = ({ mapSize }) => {
  return buildTwoDimensionalArray({
    columns: mapSize.columns,
    rows: mapSize.rows,
    mapFn: () => uuid.create()
  });
}

export const convertTilemapDataObjectToDataChunks = ({ tilemapDataObject, segmentProperties }) => async dispatch => {
  const toJSON = (obj) => JSON.stringify(obj);

  const filterOutNoDataSegments = async (tilemapDataObject) => Promise.all(
    Object.entries(tilemapDataObject)
      .filter(([segmentId, tilemapData]) => {
        if (segmentProperties.hasOwnProperty(segmentId)) {
          return (segmentProperties[segmentId].includeFirestore || segmentProperties[segmentId].modified)
        }
        return false;
      }));

  const calculateMemorySizeForEachSegment = async (tilemapDataObject) => Promise.all(
    tilemapDataObject.map(([segmentId, tilemapData]) => ({
      segmentData: {
        [segmentId]: tilemapData
      },
      memorySize: memorySizeOf( toJSON({ [segmentId]: tilemapData }), 'KiB' )
    }))
  )

  const mergeSegmentsInDataChunks = async (tilemapDataObject) => {
    let accumulateMemorySizeForSingleDataChunk = 0,
        accumulateSegmentsForSingleDataChunk = [];

    return tilemapDataObject.reduce((dataChunksArray, data, index) => {
      const { segmentData, memorySize } = data;

      accumulateMemorySizeForSingleDataChunk += memorySize
      accumulateSegmentsForSingleDataChunk.push(segmentData);

      const nextSegmentMemorySize = (tilemapDataObject[(index + 1)])
        ? tilemapDataObject[(index + 1)].memorySize
        : null;

      const exceedsDataChunkMaxMemorySize = ((accumulateMemorySizeForSingleDataChunk + nextSegmentMemorySize) > mapConstants.MAX_TILEMAP_DATA_CHUNK_SIZE);
      const isLastSegmentInArray = (nextSegmentMemorySize === null);

      if (exceedsDataChunkMaxMemorySize || isLastSegmentInArray) {
        accumulateMemorySizeForSingleDataChunk = 0;
        dataChunksArray = [...dataChunksArray, JSON.stringify(accumulateSegmentsForSingleDataChunk)];
        accumulateSegmentsForSingleDataChunk = [];
      }

      return dataChunksArray;
    }, [])
  }

  const filteredTilemapDataObject = await filterOutNoDataSegments(tilemapDataObject);
  const tilemapDataObjectWithMemorySizes = await calculateMemorySizeForEachSegment(filteredTilemapDataObject);
  return await mergeSegmentsInDataChunks(tilemapDataObjectWithMemorySizes);
}

export const convertDataChunksToTilemapDataObject = ({ dataChunks = [] }) => {
  return dataChunks
    .map(dataChunk => JSON.parse(dataChunk))
    .reduce((mapGrid, dataChunk) => mapGrid.concat( dataChunk ), []);
}
