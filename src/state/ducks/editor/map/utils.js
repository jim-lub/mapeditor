import * as actions from './actions';
import * as selectors from './selectors';

import * as tilemapDataUtils from 'lib/editor/tilemap-data-utils';

export const validateTilemapDataBySegmentId = ({ segmentId }) => (dispatch, getState) => {
  return new Promise((resolve, reject) => {
    let isModified = false;
    const state = getState();

    const { segmentSize } = selectors.getMapProperties(state);
    const tilemapData = selectors.getTilemapDataBySegmentId(state, { segmentId });
    const layerSortOrder = selectors.getLayerSortOrder(state);

    layerSortOrder.forEach(layerId => {
      if (tilemapData[layerId]) {
        /*
          validate tiles; if columns and row match return else error
        */
        return;
      }

      const { tileSize } = selectors.getLayerPropertiesById(state, { layerId });
      tilemapData[layerId] = tilemapDataUtils.buildTilemapDataArray({ segmentSize, tileSize });
      isModified = true;
    });

    if (isModified) {
      dispatch( actions.setTilemapDataBySegmentId({ segmentId, tilemapData }))
    }

    resolve()
  });
}
