export const GuitarType = {
  Electro: 'electro',
  Acoustic: 'acoustic',
  Ukulele: 'ukulele',
} as const;

export type GuitarType = typeof GuitarType[keyof typeof GuitarType];