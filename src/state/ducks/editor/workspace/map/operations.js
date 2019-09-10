import { firebase } from 'state/lib/firebase';

import * as actions from './actions';
import * as utils from './utils';

export const loadScene = ({ sceneId }) => dispatch => {
  return dispatch ( _initializeMap({ sceneId }) )
    .then(() => {
      console.log('success');
    });
}

const _initializeMap = ({ sceneId }) => dispatch => {
  dispatch( actions.initializeMapRequest() );

  return firebase.scene(sceneId)
    .get()
    .then(scene => scene.data())
    .then(sceneData => {
      const mapProperties = utils.validateMapProperties({ mapProperties: sceneData.mapProperties });

      dispatch( actions.setMapProperties({ mapProperties }) );

      return mapProperties;
    })
    .then(mapProperties => {
      return dispatch( utils.fetchMapGridCollectionFirestore({ sceneId }) )
        .then(mapGrid => {
          const validatedMapGrid = utils.buildMapGrid({ mapProperties, mapGrid: mapGrid });

          dispatch( actions.setMapGrid({ mapGrid: validatedMapGrid }));
        })
    })
    .then(() => {
      dispatch( actions.initializeMapSuccess() );
    })
    .catch(e => console.log(e));
    // .catch(error => dispatch( actions.initializeMapFailure({ error }) ));

  // build layerSortOrder array
  // build layerProperties object
  // build segmentProperties object
  // build tilemapData object
  // return all to loadScene
}

const _getMapGrid = (sceneId) => dispatch => {
  return dispatch( utils.fetchMapGridCollectionFirestore({ sceneId }))
}

export const saveScene = ({ sceneId }) => dispatch => {
  return dispatch ( _saveSceneData({ sceneId }) );
  // _saveTilemapData();
}

const _saveSceneData = ({ sceneId }) => (dispatch, getState) => {
  const { mapProperties, mapGrid } = getState().editor.workspace.map;

  const promises = [
    // if mapProperties modified:
    dispatch ( utils.updateMapPropertiesFirestore({ sceneId, mapProperties })),

    // if mapGrid modified:
    dispatch ( utils.updateMapGridCollectionFirestore({ sceneId, mapProperties, mapGrid })),
  ]

  return Promise.all(promises);
}

// const _saveTilemapData = () => {
//
// }
