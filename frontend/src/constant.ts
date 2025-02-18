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

export const GuitarStrings = [
  {
    id: '4-strings',
    name: '4-strings',
    label: 4,
  },
  {
    id: '6-strings',
    name: '6-strings',
    label: 6,
  },
  {
    id: '7-strings',
    name: '7-strings',
    label: 7,
  },
  {
    id: '12-strings',
    name: '12-strings',
    label: 12,
  },
] as const;

export const GuitarTypes = [
  {
    id: 'electro',
    name: 'electro',
    label: 'Электрогитары',
  },
  {
    id: 'acoustic',
    name: 'acoustic',
    label: 'Акустические гитары',
  },
  {
    id: 'ukulele',
    name: 'ukulele',
    label: 'Укулеле',
  },
] as const