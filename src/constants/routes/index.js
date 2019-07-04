import { SignIn, Dashboard, ProjectManager, TilesetManager, Workspace } from 'views/pages';
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
    component: ProjectManager,
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
  { name: "Dashboard", route: routes[0], auth: true },

  { name: "Sign In", route: routes[1], auth: false },

  { name: "Workspace", route: routes[2], auth: true },
  { name: "Projects", route: routes[3], auth: true },
  { name: "Tilesets", route: routes[4], auth: true },
]


export {
  nav
}

export default routes;
