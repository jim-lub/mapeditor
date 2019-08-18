import { fetchProjects } from 'state/ducks/editor/projects';

/***
* Intialize the store after auth change. Every dispatch fetches data asynchronously.
***/
export const initializeStore = () => (dispatch, getState) => {
  const initialize = [
    dispatch(fetchProjects()),
    // dispatch(fetchProjects()).then(() => dispatch(fetchProjects()))
  ];

  Promise.all(initialize)
    .then(() => console.log('Store initialized'))
    .catch(e => console.error(e));
}
