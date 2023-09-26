import { IUser } from ".";

export interface IUserSearchResult {
  total: number;
  data: IUser[];
}
