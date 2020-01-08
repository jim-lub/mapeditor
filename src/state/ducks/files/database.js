import { firebase } from 'state/lib/firebase';

export const getFileRef = ({ uid }) => dispatch => {
  return firebase.file(uid)
    .get()
    .then(file => file.data())
    .catch(e => e);
}

export const getFileRefsByQuery = ({ query }) => dispatch => {
  const [field, comparison, value] = query;

  return firebase.files()
    .where(field, comparison, value)
    .get()
    .then((querySnapshot, index) => {
      const filesArray = [];

      querySnapshot.forEach(doc => {
        const { fileName, fileType } = doc.data();

        filesArray.push({
          uid: doc.id,
          fileName,
          fileType
        })
      });

      return filesArray;
    })
    .then(filesArray => filesArray)
    .catch(e => e)
}

export const createFile = ({ fileName, fileType, parentId }) => dispatch => {
  return firebase.files()
    .add({
      fileName,
      fileType,
      parentId,
      createdAt: firebase.serverTimestamp,
      modifiedAt: firebase.serverTimestamp,
    })
    .then(ref => ref.id)
    .catch(e => e)
}

export const updateFile = ({ uid, fileName }) => dispatch => {
  return firebase.file(uid)
    .update({
      fileName,
      modifiedAt: firebase.serverTimestamp,
    })
    .then(() => uid)
    .catch(e => e)
}

export const deleteFile = ({ uid }) => dispatch => {
  return firebase.file(uid)
    .delete()
    .then(() => uid)
    .catch(e => e)
}

export const writeFileToFirestore = () => dispatch => {

}

export const batchWriteFileToFirestore = () => dispatch => {

}

export const storeFileInStorage = () => dispatch => {

}
