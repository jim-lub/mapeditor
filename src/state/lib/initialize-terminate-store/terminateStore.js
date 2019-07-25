import { terminateProjectsCollection } from 'state/ducks/editor/projects';
import { terminateScenesCollection } from 'state/ducks/editor/scenes';

export const terminateStore = () => (dispatch) => {
  dispatch( terminateProjectsCollection() );
  dispatch( terminateScenesCollection() );

  console.log('Store terminated');
}
