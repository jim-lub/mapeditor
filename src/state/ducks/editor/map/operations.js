// import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as selectors from './selectors';
import * as firestore from './firestore';

import * as mapGridUtils from 'lib/editor/map-grid-utils';
import * as tilemapDataUtils from 'lib/editor/tilemap-data-utils';

export const initializeMap = ({ sceneId }) => dispatch => {
  dispatch( actions.initializeMapRequest() );

  return dispatch( firestore.fetchSceneData({ sceneId }))
    .then(sceneData => {
      const { mapProperties, chunks = "null" } = sceneData;

      dispatch( actions.setMapProperties({
        mapProperties: {
          ...mapProperties,
          chunks
        }
      }) );

      return dispatch( firestore.fetchMapGridCollection({ sceneId }) )
        .then(firestoreMapGrid => {
          dispatch( actions.setMapGrid({
            mapGrid: mapGridUtils.buildMapGrid({ mapProperties, firestoreMapGrid })
          }))
        })
    })
    .then(() => dispatch( actions.initializeMapSuccess() ))
    .catch(e => console.log(e));
}

export const storeMap = ({ sceneId }) => (dispatch, getState) => {
  dispatch( actions.storeMapRequest() );

  const state = getState();
  const mapProperties = selectors.getMapProperties(state);
  const mapGrid = selectors.getMapGrid(state);

  Promise.all([
    dispatch( firestore.updateMapProperties({ sceneId, mapProperties })),
    dispatch( firestore.updateMapGridCollection({ sceneId, mapProperties, mapGrid })),
  ])
  .then(() => {
    dispatch( actions.storeMapSuccess() );
  })
  .catch(e => console.log(e));
}

export const validateTilemapDataBySegmentId = ({ segmentId }) => (dispatch, getState) => {
  let modified = false;
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
    };

    const { tileSize } = selectors.getLayerPropertiesById(state, { layerId });

    tilemapData[layerId] = tilemapDataUtils.buildTilemapDataArray({ segmentSize, tileSize });
    modified = true;
  })

  if (modified) {
    dispatch( actions.setTilemapDataBySegmentId({ segmentId, tilemapData }) );
  }
}
