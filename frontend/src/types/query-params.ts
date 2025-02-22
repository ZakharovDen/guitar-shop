import { GuitarString, GuitarTypeId } from "../constant";

export interface QueryParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  guitarTypes?: GuitarTypeId[];
  guitarStringsCount?: GuitarString[];
}