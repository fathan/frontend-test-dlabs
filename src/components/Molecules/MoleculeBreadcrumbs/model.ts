export interface IBreadcrumbData {
  path: string;
  breadcrumbName: string;
  isTitle?: boolean;
  children?: IBreadcrumbData[];
}