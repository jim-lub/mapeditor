import { firebase } from 'state/lib/firebase';
import * as actions from './actions';

export const fetchProjectsByOwnerId = ({ userId, sortBy = 'createdAt', sortOrder = 'desc'}) => {
  return firebase.projects()
    .where("ownerId", "==", userId)
    .orderBy(sortBy, sortOrder)
    .get()
    .then(snapshot => {
      return snapshot.docs.map(doc => {
        const { name, description, createdAt } = doc.data();

        return {
          uid: doc.id,
          name: name,
          description: description,
          createdAt: createdAt.toDate()
        }
      });
    });
};

export const onProjectStateChange = () => (dispatch, getState) => {
  const state = getState();
  console.log(state);

  if (state.auth.authUser) {
    const { uid: userId } = state.auth.authUser;

    return firebase.projects()
    .where("ownerId", "==", userId)
    .onSnapshot(snapshot => {
      snapshot.forEach(doc => {
        console.log(doc.data());
      });
    });
  }
}

export const onProjectStateChange2 = ({ userId }) => (dispatch) => {
  return firebase.projects()
    .where("ownerId", "==", userId)
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {
      dispatch( actions.fetchProjectsBegin() );

      const projects = [];

      snapshot.forEach(doc => {
        const { name, description, createdAt } = doc.data();

        projects.push({
          uid: doc.id,
          name: name,
          description: description,
          createdAt: createdAt
        });
      });

      try {
        console.log(projects)
        dispatch( actions.fetchProjectsSuccess({ projects }) );
      } catch (error) {
        console.log(error);
      }
    })
}
