import { firebase } from 'state/lib/firebase';

import * as actions from './actions';

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
            actions.setAuthUser({
              authUser: {
                ...dbUser,
                uid: authUser.uid
              }
            })
          );
        })
    } else {
      dispatch({ type: 'CLEAR_STORE'});
      dispatch(actions.clearAuthUser());
    }

  })
}

export const signUpWithEmail = ({ email, password }) => dispatch => {
  firebase.doCreateUserWithEmailAndPassword(email, password)
    .then(authUser => {
      dispatch(
        updateDbUser({
          uid: authUser.user.uid,
          username: "",
          email,
          avatar: null,
          provider_ref: null
        })
      );
    })
    .catch(e => dispatch(actions.setAuthError({ error: { ...e, form: 'signup' } })));
}

export const signInWithEmail = ({ email, password }) => dispatch => {
  firebase.doSignInWithEmailAndPassword(email, password)
    .then(authUser => {})
    .catch(e => dispatch(actions.setAuthError({ error: { ...e, form: 'signin' } })));
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
    .catch(e => dispatch(actions.setAuthError({ error: e })))
}

export const signOut = () => dispatch => {
  firebase.doSignOut()
    .catch(e => dispatch(actions.setAuthError({ error: e })));
}
