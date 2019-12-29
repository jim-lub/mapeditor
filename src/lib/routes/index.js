import { SignIn, Dashboard, Scenes, TilesetManager, Editor } from 'views/pages';
import * as ruleTypes from 'views/lib/authorization/ruleTypes';

import { ReactComponent as DashboardIcon } from 'assets/static/icons/sidebar/dashboard.svg';
import { ReactComponent as EditorIcon } from 'assets/static/icons/sidebar/editor.svg';
import { ReactComponent as ScenesIcon } from 'assets/static/icons/sidebar/projects.svg';
import { ReactComponent as TilesetsIcon } from 'assets/static/icons/sidebar/tilesets.svg';
// import { ReactComponent as AccountSettingsIcon } from 'assets/static/icons/sidebar/account-settings.svg';
import { ReactComponent as SignInIcon } from 'assets/static/icons/sidebar/signin.svg';

const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin',
    name: "Dashboard",
    icon: DashboardIcon
  },

  {
    path: "/auth/signin",
    exact: true,
    component: SignIn,
    ruleset: [ ruleTypes.IS_NOT_SIGNED_IN ],
    redirectTo: '/',
    name: "Sign in",
    icon: SignInIcon
  },

  {
    path: "/editor",
    exact: true,
    component: Editor,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin',
    name: "Editor",
    icon: EditorIcon
  },
  {
    path: "/scenes",
    exact: true,
    component: Scenes,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin',
    name: "Scenes",
    icon: ScenesIcon
  },
  {
    path: "/tilesets",
    exact: true,
    component: TilesetManager,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin',
    name: "Tilesets",
    icon: TilesetsIcon
  },

];

const nav = [
  { name: "Dashboard", route: routes[0], icon: "dashboard", auth: true },

  { name: "Sign In", route: routes[1], icon: "signin", auth: false },

  { name: "Workspace", route: routes[2], icon: "editor_workspace", auth: true },
  { name: "Projects", route: routes[3], icon: "editor_projects", auth: true },
  { name: "Tilesets", route: routes[4], icon: "editor_tilesets", auth: true },
]

export {
  nav
}

export default routes;
