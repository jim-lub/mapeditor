import { buildEmptyGrid } from 'lib/utils/buildEmptyGrid';

export default ({ segmentId, segmentSize, tilemapData, layerSortOrder, layerProperties }) => {
  const redundantLayers = _findRedundantLayers({ tilemapData, layerSortOrder });
  const missingLayers = _findMissingLayers({ tilemapData, layerSortOrder });

  if (redundantLayers.length === 0 && missingLayers.length === 0) {
    return {
      updateReduxStore: false,
      payload: {}
    }
  }

  const tilemapDataWithRedundantLayersRemoved =
    _removeReduntantLayersFromTilemap({
      redundantLayers,
      tilemapData
    });

  const tilemapDataWithMissingLayersAdded =
    _addMissingLayersToTilemap({
      missingLayers,
      tilemapData: tilemapDataWithRedundantLayersRemoved,
      segmentSize,
      layerProperties
    });

  return {
    updateReduxStore: true,
    payload: {
      segmentId,
      tilemapData: tilemapDataWithMissingLayersAdded
    }
  }
}


const _findRedundantLayers = ({ tilemapData, layerSortOrder }) =>
  Object.keys(tilemapData).filter(layerId => !layerSortOrder.includes(layerId));

const _findMissingLayers = ({ tilemapData, layerSortOrder }) =>
  layerSortOrder.filter(layerId => !tilemapData.hasOwnProperty(layerId));

const _removeReduntantLayersFromTilemap = ({ redundantLayers, tilemapData }) => ({
  ...Object.entries(tilemapData)
    .reduce((obj, [key, value]) => {
      if (!redundantLayers.includes(key)) {
        obj = { ...obj, [key]: value }
      }

      return obj;
    }, {})
})

const _addMissingLayersToTilemap = ({ missingLayers, tilemapData, segmentSize, layerProperties }) => ({
  ...tilemapData,
  ...missingLayers.reduce((obj, layerId) => {
    const { tileSize } = layerProperties[layerId];
    const columns = segmentSize.width / tileSize.width;
    const rows = segmentSize.height / tileSize.height;

    obj = {
      ...obj,
      [layerId]: buildEmptyGrid({ columns, rows })
    }

    return obj;
  }, {})
})
