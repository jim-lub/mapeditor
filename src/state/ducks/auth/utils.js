import { firebase } from 'state/lib/firebase';

export const updateDbUser = ({ uid, username, email, avatar, provider_ref }) => (dispatch) => {
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
