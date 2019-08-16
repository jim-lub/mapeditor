import { SignIn, Dashboard, Projects, TilesetManager, Workspace } from 'views/pages';
import * as ruleTypes from 'views/lib/authorization/ruleTypes';

const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin'
  },

  {
    path: "/auth/signin",
    exact: true,
    component: SignIn,
    ruleset: [ ruleTypes.IS_NOT_SIGNED_IN ],
    redirectTo: '/'
  },

  {
    path: "/editor/workspace",
    exact: true,
    component: Workspace,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin'
  },
  {
    path: "/editor/projects",
    exact: true,
    component: Projects,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin'
  },
  {
    path: "/editor/tilesets",
    exact: true,
    component: TilesetManager,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin'
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
