import { firebase } from 'state/lib/firebase';

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
    })

};
