import * as database from './firebase';

export const createFile = ({ fileName, fileType, parentId }) => dispatch => {
  return dispatch(
    database.newFile({
      fileName,
      fileType,
      parentId
    })
  )
  .then(uid => uid);
}

export const getFiles = ({ uid }) => dispatch => {
  return dispatch(
    database.readFiles({
      query: ['parentId', '==', uid]
    })
  )
  .then(filesArray => filesArray);
}

export const getFilesBySceneId = ({ sceneId }) => null;
