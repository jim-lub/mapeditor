import { firebase } from 'state/lib/firebase';

import * as actions from './actions';

export const listenToProjectChanges = ({ userId }) => (dispatch, getState) => {
  if (!userId) return null;

  return firebase.projects()
    .where("ownerId", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( actions.setProjectCollectionRequest() );

      const projectCollection = [];

      snapshot.forEach(doc => {
        const { name, description, createdAt } = doc.data();

        projectCollection.push({
          uid: doc.id,
          name: name,
          description: description,
          createdAt: createdAt
        });
      });

      try {
        dispatch( actions.setProjectCollectionSuccess({ projectCollection }) );
      } catch (error) {
        dispatch( actions.setProjectCollectionFailure({ error }) );
      }
    });
};

export const createProject = ({ name, description }) => (dispatch, getState) => {
  const { uid: userId } = getState().auth.authUser;

  dispatch( actions.createProjectRequest() );

  firebase.projects()
    .add({
      ownerId: userId,
      createdAt: firebase.serverTimestamp,
      name: name,
      description: description
    })
    .then(ref => {
      dispatch( actions.createProjectSuccess({ projectId: ref.id }) );
    })
    .catch(error => {
      dispatch( actions.createProjectFailure({ error }) );
    })
};

export const deleteProject = ({ projectId }) => (dispatch) => {
  console.log('Delete project: ' + projectId);
};

export const updateProject = ({ projectId, name, description }) => (dispatch) => {
  console.log('Update project: ' + projectId);
};

export const setActiveProject = actions.setActiveProject;
