import { firebase } from 'state/lib/firebase';

import * as mapGridUtils from 'lib/editor/map-grid-utils';

const enableSuccessLog = true;

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
      const chunkDataArray = [];

      querySnapshot.forEach(doc => {
        chunkDataArray.push(
          doc.data().chunkData
        )
      });

      return chunkDataArray;
    })
    .then(chunkDataArray => mapGridUtils.convertChunkDataArrayToMapGrid({ chunkDataArray }))
    .catch(e => console.log(e));
}

export const updateMapGridCollection = ({ sceneId, mapProperties, mapGrid }) => dispatch => {
  return dispatch( deleteMapGridCollection({ sceneId }))
    .then(() => {
      const chunks = mapGridUtils
        .convertMapGridToChunkDataArray({ mapProperties, mapGrid })
        .filter(data => data);
        
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
