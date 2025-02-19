export const GuitarStringsCount = {
  Four: 4,
  Six: 6,
  Seven: 7,
  Twelve: 12
} as const;

export type GuitarStringsCount = typeof GuitarStringsCount[keyof typeof GuitarStringsCount];