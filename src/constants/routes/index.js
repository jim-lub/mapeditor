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
  { name: "Dashboard", path: routes[0].path, auth: true },

  { name: "Sign In", path: routes[1].path, auth: false },

  { name: "Workspace", path: routes[2].path, auth: true },
  { name: "Projects", path: routes[3].path, auth: true },
  { name: "Tilesets", path: routes[4].path, auth: true },
]


export {
  nav
}

export default routes;
