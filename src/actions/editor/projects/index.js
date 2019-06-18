import { firebase } from 'lib/firebase';

const _updateProjectsForCurrentUser = ({ projects = [] }) => {
  return {
    type: 'EDITOR_PROJECTS_UPDATE_FOR_CURRENT_USER',
    payload: {
      projects
    }
  }
}

export const loadProjectsForCurrentUser = ({ userID }) => {

}

export const addProject = ({ userId, projectName, projectDesc }) => (dispatch) => {
  firebase.projects()
    .add({
      owner: {
        id: userId
      },
      collaborators: [],
      name: projectName,
      description: projectDesc
    })
    .then(docRef => {
      console.log(`Created project with #ID: ${docRef.id}`);

      const allProjects = [];

      firebase.projects()
        .where("owner.id", "==", userId).get()
        .then(snapshot => {
          snapshot.docs.forEach(doc => {
            allProjects.push(doc.data());
          });

          console.log(allProjects);
        });


    })
    .catch(e => console.log(e));
}
