import * as ROUTES from './routes';

export default {
  'Dashboard': {
    ...ROUTES.DASHBOARD
  },

  '-': null,

  'Workspace': {
    ...ROUTES.EDITOR_WORKSPACE
  },
  'Projects': {
    ...ROUTES.EDITOR_PROJECTS
  },
  'Tilesets': {
    ...ROUTES.EDITOR_TILESETS
  },

}
