import { initializeProjectsCollection } from 'state/ducks/editor/projects';

export const initializeStore = ({ userId }) => (dispatch) => {
    dispatch( initializeProjectsCollection({ userId }) )
    .then(() => console.log('Store initialized'))
    .catch(e => console.error(e));
}
