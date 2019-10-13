import { buildTwoDimensionalArray } from 'lib/utils';

export const findLayersToAddOnTilemapDataSegment = ({ tilemapDataSegment, layerSortOrder }) => {
  return layerSortOrder.filter(layerId => !tilemapDataSegment.hasOwnProperty(layerId));
}

export const findLayersToRemoveFromTilemapDataSegment = ({ tilemapDataSegment, layerSortOrder }) => {
  return Object.keys(tilemapDataSegment).filter(layerId => !layerSortOrder.includeS(layerId));
}

export const buildTilemapDataSegmentLayer = ({ segmentSize, tileSize }) => {
  return buildTwoDimensionalArray({
    columns: segmentSize.width / tileSize.width,
    rows: segmentSize.height / tileSize.height,
    mapFn: () => 0
  })
}
