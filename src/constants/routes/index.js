import { SignIn, Dashboard, ProjectManager, TilesetManager, Workspace } from 'views/pages';

const routes = [
  {
    path: "/",
    exact: true,
    component: Dashboard,
  },

  {
    path: "/auth/signin",
    exact: true,
    component: SignIn,
  },

  {
    path: "/editor/workspace",
    exact: true,
    component: Workspace,
  },
  {
    path: "/editor/projects",
    exact: true,
    component: ProjectManager,
  },
  {
    path: "/editor/tilesets",
    exact: true,
    component: TilesetManager,
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
