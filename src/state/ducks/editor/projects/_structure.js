const [createProjectActionTypes, actions, reducer] = reduxHelper();


// create project
createProjectRequest
createProjectSuccess
createProjectFailure

firestore.addProject(userId, name, description);

export const createProject = () => dispatch => {
  dispatch( createProject.actionTypes.request() );

  db.addProject(userId, name, description)
    .then(ref => {
      dispatch( createProject.actionTypes.success({ uid: ref.uid }) );
    })
    .catch(e => {
      dispatch( createProject.actionTypes.failure({ error: e }) )
    });
}


// delete project
deleteProjectRequest
deleteProjectSuccess
updateProjectFailure

firestore.deleteProject(userId, name, description);


// update project
updateProjectRequest
updateProjectSuccess
updateProjectFailure

firestore.updateProject(userId, name, description);
