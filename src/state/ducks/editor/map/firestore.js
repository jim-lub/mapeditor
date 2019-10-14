import { firebase } from 'state/lib/firebase';
import * as utils from './utils';

export const getMapData = ({ uid }) => dispatch => {
  return firebase.scene(uid)
    .get()
    .then(scene => scene.data())
    .catch(e => console.log(e));
}

export const getMapGrid = ({ uid }) => dispatch => {
  return firebase.scene(uid)
    .collection('mapGrid')
    .get()
    .then(mapGrid => {
      let mapGridJSON;

      mapGrid.forEach(doc => mapGridJSON = doc.data().data);

      return (!!mapGridJSON)
        ? JSON.parse( mapGridJSON )
        : null

    })
    .catch(e => console.log(e));
}

export const getTilemapData = ({ uid }) => dispatch => {
  return firebase.scene(uid)
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


export const setMapData = ({ uid, mapProperties, layerSortOrder, layerProperties }) => dispatch => {
  return firebase.scene(uid)
    .update({
      modifiedAt: firebase.serverTimestamp,
      mapProperties,
      layerProperties,
      layerSortOrder
    });
}

export const setMapGrid = ({ uid, mapGrid }) => dispatch => {
  return dispatch( clearMapGrid({ uid }) )
    .then(() =>
      firebase.scene(uid)
        .collection('mapGrid')
        .add({
          data: JSON.stringify(mapGrid)
        })
    )
    .catch(e => console.log(e));
}

export const setTilemapData = ({ uid, tilemapDataObject }) => dispatch => {
  return dispatch( clearTilemapData({ uid }) )
    .then(() => dispatch( utils.convertTilemapDataToDataChunks({ tilemapDataObject }) ))
    .then(dataChunks => Promise.all([
      ...dataChunks.map((dataChunk, index) =>
        firebase.scene(uid)
          .collection('tilemapData')
          .add({
            mergeOrder: index,
            dataChunk
          }))
      ])
    )
    .catch(e => console.log(e));
}

export const clearMapGrid = ({ uid }) => dispatch => {
  return firebase.scene(uid)
    .collection('mapGrid')
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(doc =>
        firebase.scene(uid)
          .collection('mapGrid')
          .doc(doc.id)
          .delete())
    )
    .catch(e => console.log(e));
}

export const clearTilemapData = ({ uid }) => dispatch => {
  return firebase.scene(uid)
    .collection('tilemapData')
    .get()
    .then(querySnapshot =>
      querySnapshot.forEach(doc =>
        firebase.scene(uid)
          .collection('tilemapData')
          .doc(doc.id)
          .delete())
    )
    .catch(e => console.log(e));
}
