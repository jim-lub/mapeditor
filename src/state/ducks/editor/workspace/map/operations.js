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
      const mapGrid = utils.buildMapGrid({ mapProperties, mapGrid: JSON.parse( sceneData.mapGrid ) });

      dispatch( actions.setMapProperties({ mapProperties }) );
      dispatch( actions.setMapGrid({ mapGrid }));
    })
    .then(() => {
      dispatch( actions.initializeMapSuccess() );
    })
    .catch(error => dispatch( actions.initializeMapFailure({ error }) ));

  // build layerSortOrder array
  // build layerProperties object
  // build segmentProperties object
  // build tilemapData object
  // return all to loadScene
}

export const saveScene = ({ sceneId }) => dispatch => {
  return dispatch ( _saveSceneData({ sceneId }) );
  // _saveTilemapData();
}

const _saveSceneData = ({ sceneId }) => (dispatch, getState) => {
  const { mapProperties, mapGrid } = getState().editor.workspace.map;

  return firebase.scene(sceneId)
    .set({
      mapProperties,
      mapGrid: JSON.stringify(mapGrid)
    }, { merge: true })
    .then(() => {
      console.log('saved..')
    })
}

// const _saveTilemapData = () => {
//
// }
