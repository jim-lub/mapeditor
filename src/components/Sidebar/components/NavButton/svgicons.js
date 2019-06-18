import { ReactComponent as Dashboard } from 'assets/static/icons/svg/dashboard.svg';
import { ReactComponent as Workspace } from 'assets/static/icons/svg/editor.svg';
import { ReactComponent as Projects } from 'assets/static/icons/svg/projects.svg';
import { ReactComponent as Tilesets } from 'assets/static/icons/svg/tilesets.svg';
import { ReactComponent as Settings } from 'assets/static/icons/svg/settings.svg';

export default (name) => {
  switch(name.toUpperCase()) {
    case 'DASHBOARD':
      return Dashboard;
    case 'WORKSPACE':
      return Workspace;
    case 'PROJECTS':
      return Projects;
    case 'TILESETS':
      return Tilesets;

    case 'SIGN IN':
      return Settings;

    case 'SETTINGS':
      return Settings;

    default:
      return Dashboard;
  }

}
