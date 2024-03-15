import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root',
})
export class AssetsPriceUpdateService {
  private readonly destroy$ = new Subject<void>();
  private pricesWebsocketSubject!: WebSocketSubject<any>;
  private pricesSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  prices$ = this.pricesSubject.asObservable();

  constructor() {
    this.listenForPriceUpdates();
  }

  private listenForPriceUpdates(): void {
    if(this.pricesWebsocketSubject) {
      this.pricesWebsocketSubject.pipe(takeUntil(this.destroy$)).subscribe({
        next: (msg: any) => this.pricesSubject.next(msg),
        error: (err: any) => console.error('WebSocket error:', err),
        complete: () => console.log('WebSocket connection closed'),
      });
    }
  }

  createNewWsConnection(assetIds: string[]) {
    const pricesUrl = `wss://ws.coincap.io/prices?assets=${assetIds.join(',')}`

    if(this.pricesWebsocketSubject) {
      this.pricesWebsocketSubject.complete();
    }

    this.pricesWebsocketSubject = webSocket(pricesUrl);

    this.listenForPriceUpdates();
  }

  emitCurrentPageAssetsIds(assetIds: string[]) {
    this.createNewWsConnection(assetIds);
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
