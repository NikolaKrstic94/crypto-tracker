export * from './assets.service';
import { AssetsService } from './assets.service';
export * from './candles.service';
import { CandlesService } from './candles.service';
export * from './exchanges.service';
import { ExchangesService } from './exchanges.service';
export * from './markets.service';
import { MarketsService } from './markets.service';
export * from './rESTfulAPIDocumentation.service';
import { RESTfulAPIDocumentationService } from './rESTfulAPIDocumentation.service';
export * from './rates.service';
import { RatesService } from './rates.service';
export const APIS = [AssetsService, CandlesService, ExchangesService, MarketsService, RESTfulAPIDocumentationService, RatesService];