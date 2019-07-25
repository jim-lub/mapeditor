import { firebase } from 'state/lib/firebase';

export const getScenesCollectionByProjectId = ({ projectId }) => {
  return firebase.scenes()
    .where("project.id", "==", projectId)
    .get()
    .then(snapshot => {
      const collection = [];

      snapshot.docs.forEach(doc => {
        collection.push({
          uid: doc.id,
          ...doc.data()
        });
      });

      return collection;
    })
}
