import { firebase } from 'state/lib/firebase';

export const uploadFile = ({ uid, file }) => dispatch => new Promise((resolve, reject) => {
  const extension = file.type.split("/")[1];
  const fileName = `${uid}.${extension}`;

  const uploadTask = firebase.storageRef().child(`images/${fileName}`).put(file);

  return uploadTask.on(
    firebase.TaskEvent.STATE_CHANGED,
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log(`Upload progress: ${progress}`)
    },
    (error) => {
      console.log(error)
      reject();
    },
    () => {
      console.log('upload completed')
      resolve(uid)
    }
  )
});

// export const uploadFile3 = ({ uid, file }) => dispatch => {
//
//   // return uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
//   //   function(snapshot) {
//   //     // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
//   //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
//   //     console.log('Upload is ' + progress + '% done');
//   //     switch (snapshot.state) {
//   //       case firebase.storage.TaskState.PAUSED: // or 'paused'
//   //         console.log('Upload is paused');
//   //         break;
//   //
//   //       case firebase.storage.TaskState.RUNNING: // or 'running'
//   //         console.log('Upload is running');
//   //         break;
//   //
//   //       default:
//   //         break;
//   //     }
//   //   }, function(error) {
//   //
//   //   // A full list of error codes is available at
//   //   // https://firebase.google.com/docs/storage/web/handle-errors
//   //   switch (error.code) {
//   //     case 'storage/unauthorized':
//   //       // User doesn't have permission to access the object
//   //       break;
//   //
//   //     case 'storage/canceled':
//   //       // User canceled the upload
//   //       break;
//   //
//   //     case 'storage/unknown':
//   //       // Unknown error occurred, inspect error.serverResponse
//   //       break;
//   //
//   //     default:
//   //       // other error
//   //       break;
//   //   }
//   // }, function() {
//   //   // Upload completed successfully, now we can get the download URL
//   //   uploadTask.snapshot.ref.getDownloadURL().then(function(downloadURL) {
//   //     console.log('File available at', downloadURL);
//   //   });
//   // });
//
// }
