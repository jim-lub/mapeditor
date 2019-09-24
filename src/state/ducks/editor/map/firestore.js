import { firebase } from 'state/lib/firebase';

import * as utils from './utils';

/*** GENERAL ***/
export const fetchSceneData = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .get()
    .then(scene => scene.data())
    .catch(e => console.log(e));
}

/*** MAP PROPERTIES ***/
export const updateMapProperties = ({ sceneId, mapProperties }) => dispatch => {
  return firebase.scene(sceneId)
    .set({
      mapProperties
    }, { merge: true });
}

/*** MAP GRID ***/
export const fetchMapGridCollection = ({ sceneId }) => dispatch => {
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
  return dispatch( deleteMapGridCollection({ sceneId }))
    .then(() => {
      const chunks = utils.convertMapGridToDataChunks({ mapProperties, mapGrid });

      firebase.scene(sceneId).set({
        chunks: chunks.length || 0
      }, { merge: true });

      chunks.map((chunkData, index) =>
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
