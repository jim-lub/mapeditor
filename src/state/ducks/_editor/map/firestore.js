import { firebase } from 'state/lib/firebase';
import * as utils from './utils';

export const getMapData = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .get()
    .then(scene => scene.data())
    .catch(e => console.log(e));
}

export const getMapGrid = ({ sceneId }) => dispatch => {
  return firebase.scene(sceneId)
    .collection('mapGrid')
    .get()
    .then(mapGrid => {
      let mapGridJSON;

      mapGrid.forEach(doc => mapGridJSON = doc.data().data);

      return JSON.parse( mapGridJSON );
    })
    .catch(e => console.log(e));
}

export const getTilemapData = ({ sceneId }) => dispatch => {
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


export const setMapData = ({
  sceneId,
  mapProperties,
  layerProperties, layerSortOrder
}) => dispatch => {
  return firebase.scene(sceneId)
    .set({
      modifiedAt: firebase.serverTimestamp,
      mapProperties,
      layerProperties,
      layerSortOrder
    }, { merge: true });
}

export const setMapGrid = ({ sceneId, mapGrid }) => dispatch => {
  return dispatch( clearMapGrid({ sceneId }) )
    .then(() => {
      return firebase.scene(sceneId)
        .collection('mapGrid')
        .add({
          data: JSON.stringify(mapGrid)
        })
    })
    .catch(e => console.log(e));
}

export const setTilemapData = ({ sceneId, tilemapData }) => dispatch => {
  return dispatch( clearTilemapData({ sceneId }) )
    .then(() => dispatch( utils.convertTilemapDataToDataChunks({ tilemapData }) ))
    .then(dataChunks => {
      const storeDataChunks = dataChunks.map((dataChunk, index) => (
        firebase.scene(sceneId)
          .collection('tilemapData')
          .add({
            mergeOrder: index,
            dataChunk
          })));

      return Promise.all(storeDataChunks);
    })
    .catch(e => console.log(e));
}


export const clearMapGrid = ({ sceneId }) => dispatch => {
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

export const clearTilemapData = ({ sceneId }) => dispatch => {
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
