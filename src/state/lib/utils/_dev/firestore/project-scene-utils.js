import { firebase } from 'state/lib/firebase';

export const firestore_fillProjects = a => (dispatch, getState) => {
  const { uid: userId } = getState().auth.authUser;

  const promise = Array.from(Array(a)).map(() => _createProject({ userId }));
  Promise.all(promise)
    .then(data => {
      console.log(data);
    })
};

const _createProject = ({ userId }) => {
  return firebase.projects()
    .add({
      ownerId: userId,
      createdAt: firebase.serverTimestamp,
      name: "test " + Math.floor(Math.random() * 10),
      description: ""
    })
    .then(ref => {
      return ref.id;
    })
    .catch(e => console.error(e));
};

const _createScene = () => {

};

export const firestore_fillProjectsAndScenes = (projects, scenes) => {

};
