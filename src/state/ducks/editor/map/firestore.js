import { firebase } from 'state/lib/firebase';
import * as actions from './actions';
import * as utils from './utils';

import statusMessages from 'lib/constants/statusMessages';

export const fetchSceneData = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .get()
    .then(scene => scene.data())
    .catch(e => console.log(e));
}

export const updateMapProperties = ({ sceneId, mapProperties }) => dispatch => {
  return firebase.scene(sceneId)
    .set({
      modifiedAt: firebase.serverTimestamp,
      mapProperties
    }, { merge: true });
}

export const updateLayerProperties = ({ sceneId, layerProperties }) => dispatch => {
  return firebase.scene(sceneId)
    .set({
      layerProperties
    }, { merge: true });
}

export const updateLayerSortOrder = ({ sceneId, layerSortOrder }) => dispatch => {
  return firebase.scene(sceneId)
    .set({
      layerSortOrder
    }, { merge: true });
}

/*** MAP GRID ***/
export const getMapGridCollection = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .collection('mapGrid')
    .orderBy('mergeOrder')
    .get()
    .then(querySnapshot => {
      const dataChunks = [];

      querySnapshot.forEach(doc => {
        dataChunks.push(
          doc.data().chunkData
        )
      });

      return dataChunks;
    })
    .then(dataChunks => utils.convertDataChunksToMapGrid({ dataChunks }))
    .catch(e => console.log(e));
}

export const updateMapGridCollection = ({ sceneId, mapProperties, mapGrid }) => dispatch => {
  dispatch( actions.setStatusMessage({ ...statusMessages['firestore-mapGrid']['delete'] }) );

  return dispatch( deleteMapGridCollection({ sceneId }))
    .then(() => {
      dispatch( actions.setStatusMessage({ ...statusMessages['firestore-mapGrid']['chunk'] }) );
      const mapGridDataChunksArray = utils.convertMapGridToDataChunks({ mapProperties, mapGrid });

      firebase.scene(sceneId).set({
        modifiedAt: firebase.serverTimestamp,
        mapgridChunks: mapGridDataChunksArray.length || 0
      }, { merge: true });

      dispatch( actions.setStatusMessage({ ...statusMessages['firestore-mapGrid']['write'] }) );

      const chunks = mapGridDataChunksArray.map((chunkData, index) =>
        firebase.scene(sceneId)
          .collection('mapGrid')
          .add({
            mergeOrder: index,
            chunkData
          })
      )


      return Promise.all(chunks);
    })
    .catch(e => console.log(e));
}

export const deleteMapGridCollection = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .collection('mapGrid')
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(doc =>
        firebase.scene(sceneId)
          .collection('mapGrid')
          .doc(doc.id)
          .delete())
    )
    .catch(e => console.log(e));
}

/*** TILEMAP DATA ***/
export const getTilemapDataCollection = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .collection('tilemapData')
    .orderBy('mergeOrder')
    .get()
    .then(querySnapshot => {
      const dataChunks = [];

      querySnapshot.forEach(doc => {
        dataChunks.push(
          doc.data().dataChunk
        )
      });

      return dataChunks;
    })
    .then(dataChunks => utils.convertDataChunksToTilemapData({ dataChunks }))
    .catch(e => console.log(e));
}

export const updateTilemapDataCollection = ({ sceneId, tilemapData }) => dispatch => {
  dispatch( actions.setStatusMessage({ ...statusMessages['firestore-tilemapData']['delete'] }) );

  return dispatch( deleteTilemapDataCollection({ sceneId}) )
    .then(() => {
      dispatch( actions.setStatusMessage({ ...statusMessages['firestore-tilemapData']['chunk'] }) );
      return dispatch( utils.convertTilemapDataToDataChunks({ tilemapData }) )
    })
    .then((tilemapDataChunksArray) => {
      dispatch( actions.setStatusMessage({ ...statusMessages['firestore-tilemapData']['write'] }) );

      firebase.scene(sceneId).set({
        modifiedAt: firebase.serverTimestamp,
        tilemapDataChunks: tilemapDataChunksArray.length || 0
      }, { merge: true });

      const chunks = tilemapDataChunksArray.map((dataChunk, index) =>
        firebase.scene(sceneId)
          .collection('tilemapData')
          .add({
            mergeOrder: index,
            dataChunk
          })
      )

      return Promise.all(chunks);
    })
    .catch(e => console.log(e));
}

export const deleteTilemapDataCollection = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .collection('tilemapData')
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(doc =>
        firebase.scene(sceneId)
          .collection('tilemapData')
          .doc(doc.id)
          .delete())
    )
    .catch(e => console.log(e));
}
