import {
  SignIn,

  Dashboard,

  Editor,
  Projects,
  Tilesets,
  Workspace,
} from 'containers';

export const DASHBOARD = {
  route: '/',
  exact: true,
  container: Dashboard,
  authorization_rules: ['IS_SIGNED_IN'],
  authorization_redirect: '/auth/signin'
}

export const AUTH_SIGN_IN = {
  route: '/auth/signin',
  exact: false,
  container: SignIn,
  authorization_rules: ['IS_NOT_SIGNED_IN'],
  authorization_redirect: '/'
}

export const EDITOR = {
  route: '/editor',
  exact: true,
  container: Editor,
  authorization_rules: ['IS_SIGNED_IN'],
  authorization_redirect: '/auth/signin'
}

export const EDITOR_WORKSPACE = {
  route: '/editor/workspace',
  exact: false,
  container: Workspace,
  authorization_rules: ['IS_SIGNED_IN'],
  authorization_redirect: '/auth/signin'
}

export const EDITOR_PROJECTS = {
  route: '/editor/projects',
  exact: false,
  container: Projects,
  authorization_rules: ['IS_SIGNED_IN'],
  authorization_redirect: '/auth/signin'
}

export const EDITOR_TILESETS = {
  route: '/editor/tilesets',
  exact: false,
  container: Tilesets,
  authorization_rules: ['IS_SIGNED_IN'],
  authorization_redirect: '/auth/signin'
}
