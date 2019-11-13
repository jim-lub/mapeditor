import { buildTwoDimensionalArray, buildEmptyTilemapGrid } from 'lib/utils';

export const findLayersToAddOnTilemapDataSegment = ({ tilemapDataSegment, layerSortOrder }) => {
  return layerSortOrder.filter(layerId => !tilemapDataSegment.hasOwnProperty(layerId));
}

export const findLayersToRemoveFromTilemapDataSegment = ({ tilemapDataSegment, layerSortOrder }) => {
  return Object.keys(tilemapDataSegment).filter(layerId => !layerSortOrder.includes(layerId));
}

export const buildTilemapDataSegmentLayer = ({ segmentSize, tileSize }) => {
  return buildEmptyTilemapGrid({
    columns: segmentSize.width / tileSize.width,
    rows: segmentSize.height / tileSize.height,
  })
  // return buildTwoDimensionalArray({
  //   columns: segmentSize.width / tileSize.width,
  //   rows: segmentSize.height / tileSize.height,
  //   mapFn: () => 0
  // })
}

export const inputModifiersObjectMatches = (inputModifiersObject, modifierKeys = []) => {
  const activeKeys = Object.entries(inputModifiersObject)
    .filter(([modifierKey, value]) => value)
    .map(([modifierKey, value]) => modifierKey);

  if (activeKeys.length !== modifierKeys.length) return false;
  if (activeKeys.length === 0 && modifierKeys.length === 0) return true;

  return modifierKeys.every(modifierKey => activeKeys.includes(modifierKey));
}
