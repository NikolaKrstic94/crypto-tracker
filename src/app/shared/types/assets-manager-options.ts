import { HttpContext } from '@angular/common/http';

export interface AssetsManagerOptions {
  search?: string;
  ids?: string[];
  limit?: number;
  offset?: number;
  httpHeaderAccept?: 'application/json';
  context?: HttpContext;
  transferCache?: boolean;
}
