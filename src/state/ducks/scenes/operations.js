import { firebase } from 'state/lib/firebase';
import { getAuthUser } from 'state/ducks/auth';
import { setRequestStatus } from 'state/ducks/editor/requestStatus';

import * as actions from './actions';
import * as database from './database';

export const listenToSceneChanges = () => (dispatch, getState) => {
  const authUser = getAuthUser( getState() );

  if (!authUser || !authUser.uid) {
    return;
  }

  firebase.scenes()
    .where("ownerId", "==", authUser.uid)
    .orderBy("modifiedAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( setRequestStatus({ key: 'fetchScenes', type: 'REQUEST' }) );

      const scenes = {};

      snapshot.forEach(doc => {
        const uid = doc.id;
        const { name, description, createdAt, modifiedAt } = doc.data();

        scenes[uid] = {
          uid,
          name,
          description,
          createdAt: (createdAt) ? createdAt.toDate() : null,
          modifiedAt: (modifiedAt) ? modifiedAt.toDate() : null,
        }
      });

      dispatch( actions.setScenes({ scenes }) );
      dispatch( setRequestStatus({ key: 'fetchScenes', type: 'SUCCESS' }) );
    });
}

export const createScene = database.createScene;
