import { configureTestStore } from 'state/store';

import * as operations from '../operations';
import * as selectors from '../selectors';

describe('map/operations', () => {
  it('should set the current scene', () => {
    const initialState = {
      editor: {
        map: {
          currentScene: {}
        }
      }
    }

    const { dispatch, getState } = configureTestStore(initialState);

    dispatch( operations.setCurrentScene({ uid: 'scene-001' }) );

    const newState = getState();
    const currentScene = selectors.getCurrentScene(newState);

    expect(currentScene.uid).toBe('scene-001')
  });
});
