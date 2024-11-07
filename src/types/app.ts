import {
  FORM_CREATE,
  FORM_UPDATE
} from '@configurations/constants';

export type TTypeForm = typeof FORM_CREATE | typeof FORM_UPDATE;

export type TTypeAction = 'create' | 'update' | 'delete' | 'view' | 'export' | 'import' | 'search' | 'download'