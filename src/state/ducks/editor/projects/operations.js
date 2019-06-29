import { firebase } from 'state/lib/firebase';

import { getProjectsCollectionByUserId } from './utils';

import {
  setProjectsCollection,
  clearProjectsCollection
} from './actions';

export const initializeProjectsCollection = ({ userId }) => (dispatch) => {
  return getProjectsCollectionByUserId({ userId })
    .then(collection => {
      dispatch(
        setProjectsCollection({ collection })
      )
    })
    .catch(e => console.error(e));
}

export const terminateProjectsCollection = () => (dispatch) => {
  dispatch(clearProjectsCollection());
}

export const createProject = ({ userId, projectName, projectDesc }) => (dispatch) => {
  console.log(userId, projectName, projectDesc)
  firebase.projects()
    .add({
      owner: {
        id: userId
      },
      name: projectName,
      description: projectDesc
    })
    .then(() => getProjectsCollectionByUserId({ userId }))
    .then(collection => {
      dispatch(
        setProjectsCollection({ collection })
      );
    })
    .catch(e => console.error(e));
}

export const deleteProject = ({ userId, projectId }) => (dispatch) => {
  firebase.projects().doc(projectId)
    .delete()
    .then(() => getProjectsCollectionByUserId({ userId }))
    .then(collection => {
      dispatch(
        setProjectsCollection({ collection })
      );
    })
    .catch(e => console.error(e));
}

export const renameProject = () => (dispatch) => {

}
