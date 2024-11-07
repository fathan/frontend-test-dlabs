import type { IUser } from '@/interfaces/user';
import type { TTypeForm } from '@/types/app';

export interface IStateFormUser {
  selectedRowId: string | number | undefined;
  layout: string;
  form: IUser;
}

export interface IPropsFormUser {
  typeForm: TTypeForm;
  rowId?: string | number | undefined;
}