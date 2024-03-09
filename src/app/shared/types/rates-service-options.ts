import { HttpContext } from '@angular/common/http';

export interface RatesServiceOptions {
  id:string,
  httpHeaderAccept?: 'application/json';
  context?: HttpContext;
  transferCache?: boolean;
}
