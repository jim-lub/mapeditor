import { firebase } from 'state/lib/firebase';

import {
  setAuthUser,
  setAuthError
} from './actions';

import {
  updateDbUser
} from './utils';

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
        })
    } else {
      dispatch(setAuthUser({ authUser: null }));
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
