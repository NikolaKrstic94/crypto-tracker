import { MatPaginator } from '@angular/material/paginator';

export interface PageSizeAndPageOptions {
  pageSize: number;
  pageOptions: number[];
  paginator: MatPaginator | undefined;
}
