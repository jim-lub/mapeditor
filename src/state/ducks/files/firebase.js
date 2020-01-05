import { firebase } from 'state/lib/firebase';

export const readFile = ({ uid }) => dispatch => {
  return firebase.file(uid)
    .get()
    .then(file => file.data())
    .catch(e => console.log(e));
}

export const readFiles = ({ query }) => dispatch => {
  const [field, comparison, value] = query;

  return firebase.files()
    .where(field, comparison, value)
    .get()
    .then((querySnapshot, index) => {
      const filesArray = [];

      querySnapshot.forEach(doc => {
        const { fileName, fileType } = doc.data();

        filesArray.push({
          fileName,
          fileType
        })
      });

      return filesArray;
    })
    .then(filesArray => filesArray)
    .catch(e => console.log(e))
}

export const newFile = ({ fileName, fileType, parentId }) => dispatch => {
  return firebase.files()
    .add({
      fileName,
      fileType,
      parentId,
      createdAt: firebase.serverTimestamp,
      modifiedAt: firebase.serverTimestamp,
    })
    .then(ref => ref.id)
    .catch(e => console.log(e))
}

export const writeFile = ({ uid, fileName, fileType }) => dispatch => {
  return firebase.file(uid)
    .update({
      fileName,
      fileType,
      modifiedAt: firebase.serverTimestamp,
    })
}

export const deleteFile = ({ uid }) => dispatch => {

}

export const writeFileToFirestore = () => dispatch => {

}

export const batchWriteFileToFirestore = () => dispatch => {

}

export const storeFileInStorage = () => dispatch => {

}
