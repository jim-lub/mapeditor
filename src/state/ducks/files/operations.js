import * as database from './database';
import * as storage from './storage';

import fileConstants from 'lib/constants/fileConstants';

export const getFiles = ({ uid }) => dispatch => {
  return dispatch(
    database.getFileRefsByQuery({
      query: ['parentId', '==', uid]
    })
  )
  .then(filesArray => {
    return filesArray.map(({ fileType, ...rest }) => ({
      fileType,
      storage: fileConstants[fileType].hasOwnProperty('storage'),
      ...rest,
    }));
  })
  .catch(e => console.log(e));
}

export const createFile = ({ fileName, fileType, file, parentId }) => dispatch => {
  return dispatch(
    database.createFile({
      fileName,
      fileType,
      parentId
    })
  )
  .then(uid => {
    // upload file
    return dispatch(
      storage.uploadFile({
        uid,
        file
      })
    )
  })
  .then(uid => uid)
  .catch(e => console.log(e));
}

export const updateFile = ({ uid, fileName }) => dispatch => {
  return dispatch(
    database.updateFile({
      uid,
      fileName: fileName + "-|"
    })
  )
  .then(uid => uid)
  .catch(e => console.log(e));
}

export const deleteFile = ({ uid }) => dispatch => {
  return dispatch(
    database.deleteFile({
      uid
    })
  )
  .then(uid => uid)
  .catch(e => console.log(e));
}

export const getFilesBySceneId = ({ sceneId }) => null;
