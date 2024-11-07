export interface ITableHeaders {
  key: string;
  label: string;
  positionText: string;
  sortable?: boolean;
}

export interface ITableSort {
  column: string;
  order: 'asc' | 'desc';
}