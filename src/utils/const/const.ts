export enum AppRoute {
  Main = '/',
  Login = '/login',
}

export enum APIRoute {
  Login = '/:id/getStateInstance/:token',
  Contact = '/:id/checkWhatsapp/:token',
}

export enum NameSpace {
  Contacts = 'Contacts',
  User = 'User',
  Chat = 'Chat',
}

export enum AuthorizationStatus {
  Auth = 'authorized',
  NoAuth = 'notAuthorized',
  Unknown = 'unknown',
}

export enum FetchStatus {
  Idle = 'Idle',
  Pending = 'Pending',
  Success = 'Success',
  Failed = 'Failed',
}
