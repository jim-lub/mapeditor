import { SignIn, Dashboard, Scenes, Files, Editor } from 'views/pages';
import * as ruleTypes from 'views/lib/authorization/ruleTypes';

import { ReactComponent as DashboardIcon } from 'assets/static/icons/sidebar/dashboard.svg';
import { ReactComponent as EditorIcon } from 'assets/static/icons/sidebar/editor.svg';
import { ReactComponent as ScenesIcon } from 'assets/static/icons/sidebar/projects.svg';
import { ReactComponent as FilesIcon } from 'assets/static/icons/sidebar/files.svg';
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
    path: "/files",
    exact: true,
    component: Files,
    ruleset: [ ruleTypes.IS_SIGNED_IN ],
    redirectTo: '/auth/signin',
    name: "Files",
    icon: FilesIcon
  },

];

export default routes;
