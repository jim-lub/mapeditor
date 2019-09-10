import { firebase } from 'state/lib/firebase';

import * as mapGridUtils from 'lib/editor/map/utils/map-grid';

const enableSuccessLog = true;
const enableFailureLog = true;

export const updateMapPropertiesFirestore = ({ sceneId, mapProperties }) => dispatch => {
  return firebase.scene(sceneId)
    .set({
      mapProperties
    }, { merge: true });
}

export const fetchMapGridCollectionFirestore = ({ sceneId }) => dispatch => {
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
}

export const updateMapGridCollectionFirestore = ({ sceneId, mapProperties, mapGrid }) => dispatch => {
  return dispatch( deleteMapGridCollectionFirestore({ sceneId }))
    .then(() => {
      const chunks = mapGridUtils
        .convertMapGridToChunkDataArray({ mapProperties, mapGrid })
        .filter(data => data);

      chunks.map((data, index) =>
        dispatch( _addMapGridChunkFirestore({
          sceneId,
          chunkData: data,
          mergeOrder: index
        }))
      )

      return Promise.all(chunks);
    })
    .then(() => (enableSuccessLog) ? console.log('Firestore: mapGrid collection updated!') : null)
}

const _addMapGridChunkFirestore = ({ sceneId, mergeOrder, chunkData }) => dispatch => {
  return firebase.scene(sceneId)
    .collection('mapGrid')
    .add({
      mergeOrder, chunkData
    })
}

export const deleteMapGridCollectionFirestore = ({ sceneId }) => dispatch => {
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
    .then(() => (enableSuccessLog) ? console.log('Firestore: mapGrid collection cleared!') : null)
}







export const validateMapProperties = ({ mapProperties }) => {
  if (!mapProperties.hasOwnProperty('mapSize')) {
    mapProperties['mapSize'] = {
      columns: 1,
      rows: 1
    }
  }

  if (!mapProperties.hasOwnProperty('segmentSize')) {
    mapProperties['segmentSize'] = {
      width: 512,
      height: 512
    }
  }

  if (!mapProperties.hasOwnProperty('allowedTileSizes')) {
    mapProperties['allowedTileSizes'] = [16, 32, 64, 128, 256];
  }

  return mapProperties;
}

export const buildMapGrid = ({ mapGrid, mapProperties }) => {
  const { columns, rows } = mapProperties.mapSize;
  let columnIndex = 0, rowIndex = 0, parsedMapGrid;

  return [...new Array(columns)].map(() => {
    const rowArray = [...new Array(rows)].map(() => {
      let value;

      if (mapGrid[columnIndex]) {
        if (mapGrid[columnIndex][rowIndex]) {
          value = mapGrid[columnIndex][rowIndex];
        } else {
          value = "->" + columnIndex + ", " + rowIndex + "<-";
        }
      } else {
        value = "->" + columnIndex + ", " + rowIndex + "<-";
      }

      rowIndex++;
      return value;
    });

    rowIndex = 0;
    columnIndex++;

    return rowArray;
  });
}

export const buildLayerPropertiesObject = () => {

}

export const buildSegmentPropertiesObject = () => {

}

export const buildTilemapDataObject = () => {

}
