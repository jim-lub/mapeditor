import { firebase } from 'state/lib/firebase';

export const getProjectsCollectionByUserId = ({ userId }) => {
  return firebase.projects()
    .where("owner.id", "==", userId)
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
