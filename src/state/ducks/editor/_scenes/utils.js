import { firebase } from 'state/lib/firebase';

export const fetchScenesByProjectId = ({ projectId, sortBy = 'createdAt', sortOrder = 'desc' }) => {
  return firebase.scenes()
    .where("projectId", "==", projectId)
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
