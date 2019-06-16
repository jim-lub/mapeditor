import * as ROUTES from './routes';

export default {
  'Dashboard': {
    icon: 'icons/sidebar/dashboard.png',
    ...ROUTES.DASHBOARD
  },
  'Sign In': {
    icon: 'icons/sidebar/signin.png',
    ...ROUTES.AUTH_SIGN_IN
  },

  '-': null,

  'Workspace': {
    icon: 'icons/sidebar/editor_workspace.png',
    ...ROUTES.EDITOR_WORKSPACE
  },
  'Projects': {
    icon: 'icons/sidebar/editor_projects.png',
    ...ROUTES.EDITOR_PROJECTS
  },
  'Tilesets': {
    icon: 'icons/sidebar/editor_tilesets.png',
    ...ROUTES.EDITOR_TILESETS
  },

}
