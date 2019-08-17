import { firebase } from 'state/lib/firebase';

import {
  setAuthUser,
  clearAuthUser,
  setAuthError
} from './actions';


import {
  updateDbUser
} from './utils';

import { initializeStore } from 'state/lib/initialize-terminate-store/initializeStore';
import { terminateStore } from 'state/lib/initialize-terminate-store/terminateStore';

export const listenToAuthChanges = () => (dispatch) => {
  firebase.auth.onAuthStateChanged(authUser => {

    if (authUser) {
      firebase.user(authUser.uid)
        .get()
        .then(snapshot => {
          const dbUser = snapshot.data();

          dispatch(
            setAuthUser({
              authUser: {
                ...dbUser,
                uid: authUser.uid
              }
            })
          );

          // dispatch(
          //   initializeStore({
          //     userId: authUser.uid
          //   })
          // )
        })
    } else {
      dispatch(clearAuthUser());
      dispatch(terminateStore());
    }

  })
}

export const signInWithGoogle = () => (dispatch) => {
  firebase.doSignInWithGoogle()
    .then(authUser => {
        dispatch(
        updateDbUser({
          uid: authUser.user.uid,
          username: authUser.additionalUserInfo.profile.name,
          email: authUser.additionalUserInfo.profile.email,
          avatar: authUser.additionalUserInfo.profile.picture,
          provider_ref: "google"
        })
      )
    })
    .catch(e => dispatch(setAuthError({ error: e })))
}

export const signOut = () => dispatch => {
  firebase.doSignOut()
    .catch(e => dispatch(setAuthError({ error: e })));
}
