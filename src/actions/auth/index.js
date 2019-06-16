import { firebase } from 'lib/firebase';

const _setAuthUser = ({ authUser = null }) => {
  return {
    type: 'AUTH_SET_AUTH_USER',
    payload: {
      authUser
    }
  }
}

const _setAuthError = ({ error = null }) => {
  return {
    type: 'AUTH_SET_ERROR',
    payload: {
      error
    }
  }
}

const _updateDbUser = ({ uid, username, email, avatar, provider_ref }) => (dispatch) => {
  firebase.user(uid)
    .set({
      uid,
      username,
      email,
      avatar,
      provider_ref
    },
    { merge: true });
}

export const listenToAuthChanges = () => (dispatch) => {
  firebase.auth.onAuthStateChanged(authUser => {

    if (authUser) {
      firebase.user(authUser.uid)
        .get()
        .then(snapshot => {
          const dbUser = snapshot.data();

          dispatch(
            _setAuthUser({
              authUser: {
                ...dbUser,
                uid: authUser.uid
              }
            })
          );
        })
    } else {
      dispatch(_setAuthUser({ authUser: null }));
    }

  })
}

export const signInWithGoogle = () => (dispatch) => {
  firebase.doSignInWithGoogle()
    .then(authUser => {
        dispatch(
        _updateDbUser({
          uid: authUser.user.uid,
          username: authUser.additionalUserInfo.profile.name,
          email: authUser.additionalUserInfo.profile.email,
          avatar: authUser.additionalUserInfo.profile.picture,
          provider_ref: "google"
        })
      )
    })
    .catch(e => dispatch(_setAuthError({ error: e })))
}

export const signOut = () => dispatch => {
  firebase.doSignOut()
    .catch(e => dispatch(_setAuthError({ error: e })));
}
