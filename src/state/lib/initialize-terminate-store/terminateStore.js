import { terminateProjectsCollection } from 'state/ducks/editor/projects';

export const terminateStore = () => (dispatch) => {
  dispatch( terminateProjectsCollection() );

  console.log('Store terminated');
}
