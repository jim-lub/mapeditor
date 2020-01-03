import { firebase } from 'state/lib/firebase';
import { setRequestStatus } from 'state/ducks/editor/requestStatus';

export const createScene = ({ name, description = "", segmentSize, columns, rows }) => (dispatch, getState) => {
  const state = getState();
  dispatch( setRequestStatus({ key: 'createScene', type: 'REQUEST' }) );

  firebase.scenes()
    .add({
      ownerId: state.auth.authUser.uid,
      createdAt: firebase.serverTimestamp,
      modifiedAt: firebase.serverTimestamp,
      name,
      description,
      mapProperties: {
        segmentSize: {
          width: Number(segmentSize),
          height: Number(segmentSize)
        },
        mapSize: {
          columns: Number(columns),
          rows: Number(rows)
        },
        allowedTileSizes: [64]
      }
    })
    .then(sceneRef => {
      dispatch( setRequestStatus({ key: 'createScene', type: 'SUCCESS' }) );
    })
    .catch(error => {
      dispatch( setRequestStatus({ key: 'createScene', type: 'FAILURE', error }) );
    })
}
