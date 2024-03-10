import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class AssetsPriceUpdateService {
  private readonly destroy$ = new Subject<void>();
  private pricesUrl: string = 'wss://ws.coincap.io/prices?assets=ALL';
  private pricesWebsocketSubject: WebSocketSubject<any>;
  private pricesSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  prices$ = this.pricesSubject.asObservable();

  constructor() {
    this.pricesWebsocketSubject = webSocket(this.pricesUrl);
    this.listenForPriceUpdates();
  }

  private listenForPriceUpdates(): void {
    this.pricesWebsocketSubject.pipe(takeUntil(this.destroy$)).subscribe({
      next: (msg: any) => this.pricesSubject.next(msg),
      error: (err: any) => console.error('WebSocket error:', err),
      complete: () => console.log('WebSocket connection closed'),
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
