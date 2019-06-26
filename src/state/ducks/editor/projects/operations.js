import { firebase } from 'state/lib/firebase';

import {
  setProjectsCollection,
  clearProjectsCollection
} from './actions';

export const initializeProjectsCollection = ({ userId }) => (dispatch) => {
  return firebase.projects()
    .where("owner.id", "==", userId)
    .get()
    .then(snapshot => {
      const collection = [];

      snapshot.docs.forEach(doc => {
        collection.push(doc.data());
      });

      return collection;
    })
    .then(collection => {
      dispatch(
        setProjectsCollection({ collection })
      )
    })
    .catch(e => console.log(e));
}

export const terminateProjectsCollection = () => (dispatch) => {
  dispatch(clearProjectsCollection());
}

export const insertProject = () => (dispatch) => {

}

export const deleteProject = () => (dispatch) => {

}

export const renameProject = () => (dispatch) => {

}
