import { Injectable, inject } from '@angular/core';
import { InlineResponse2004DataInner, RatesService } from '../../open-api-spec';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatesManagementService {
  ratesService = inject(RatesService);

  selectedCurrencySubject = new BehaviorSubject<InlineResponse2004DataInner>({
    currencySymbol: 'USD',
    id: 'united-states-dollar',
    rateUsd: '1',
    symbol: 'USD'
  });

  selectedCurrency$ = this.selectedCurrencySubject.asObservable();
  constructor() {}

  getRateById(id: string) {
    return this.ratesService.ratesId(id);
  }

  getAllRates() {
    return this.ratesService.rates();
  }

  setCurrency(currency: InlineResponse2004DataInner) {
    this.selectedCurrencySubject.next(currency);
  }
}
