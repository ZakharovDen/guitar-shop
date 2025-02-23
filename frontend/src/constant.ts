export enum AppRoute {
  Main = '/',
  Registration = '/registration',
  ProductList = '/products',
  ProductInfo = '/products/:id',
  ProductAdd = '/products/add',
  ProductEdit = '/products/:id/edit',
  Error = '/error',
}

export const AppRouteNew = {
  Main: { path: '/', label: 'Вход' },
  Registration: { path: '/registration', label: 'Регистрация' },
  ProductList: { path: '/products', label: 'Товары' },
  ProductInfo: { path: '/products/:id', label: 'Товар' },
  ProductAdd: { path: '/products/add', label: 'Новый товар' },
  ProductEdit: { path: '/products/:id/edit', label: 'Добавить название товара!!!' },
  Error: { path: '/error', label: 'Страница не найдена' },
}


export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

export const GuitarStrings = [
  {
    id: 4,
    name: '4-strings',
    label: 4,
  },
  {
    id: 6,
    name: '6-strings',
    label: 6,
  },
  {
    id: 7,
    name: '7-strings',
    label: 7,
  },
  {
    id: 12,
    name: '12-strings',
    label: 12,
  },
] as const;

export type GuitarString = typeof GuitarStrings[number];

export type GuitarStringId = GuitarString['id'];

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
] as const;

export type GuitarType = typeof GuitarTypes[number];

export type GuitarTypeId = GuitarType['id'];