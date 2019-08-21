import { fetchProjects } from 'state/ducks/editor/projects';
import { fetchScenes } from 'state/ducks/editor/scenes';

/***
* Intialize the store after auth change. Every dispatch fetches data asynchronously.
***/
export const initializeStore = () => (dispatch, getState) => {
  const initialize = [
    // dispatch(fetchProjects()),
    dispatch(fetchProjects()).then(() => dispatch(fetchScenes()))
  ];

  Promise.all(initialize)
    .then(() => console.log('Store initialized'))
    .catch(e => console.error(e));
}
