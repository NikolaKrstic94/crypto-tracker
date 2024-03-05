import { HttpContext } from '@angular/common/http';

export interface AssetsServiceOptions {
  search?: string;
  ids?: string[];
  limit?: number;
  offset?: number;
  httpHeaderAccept?: 'application/json';
  context?: HttpContext;
  transferCache?: boolean;
}
