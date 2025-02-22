import { GuitarStringId, GuitarTypeId } from "../constant";

export interface QueryParams {
  sortBy: string;
  sortOrder: 'asc' | 'desc';
  page: number;
  guitarTypes?: GuitarTypeId[];
  guitarStrings?: GuitarStringId[];
}