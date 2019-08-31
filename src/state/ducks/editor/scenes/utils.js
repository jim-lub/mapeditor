import { firebase } from 'state/lib/firebase';

export const fetchScenesByProjectId = (projectId) => {
  return firebase.scenes()
    .where("projectId", "==", projectId)
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(doc => ({
        uid: doc.id,
        name: doc.data().name
      }))
    )
}
