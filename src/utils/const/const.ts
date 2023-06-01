export enum AppRoute {
  Main = '/',
  Login = '/login',
}

export enum APIRoute {
  Login = '/:id/getStateInstance/:token',
  Contact = '/:id/checkWhatsapp/:token',
  SendMessage = '/:id/sendMessage/:token',
  GetMessage = '/:id/getMessage/:token',
  GetMessages = '/:id/getChatHistory/:token',
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
