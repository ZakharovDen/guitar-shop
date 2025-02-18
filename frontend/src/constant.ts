export enum AppRoute {
  Main = '/',
  Registration = '/registration',
  ProductList = '/products',
  ProductInfo = '/products/:id',
  ProductAdd = '/products/add',
  ProductEdit = '/products/:id/edit',
  Error = '/error',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}