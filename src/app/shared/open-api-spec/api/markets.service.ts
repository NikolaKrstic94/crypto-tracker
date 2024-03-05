/**
 * CoinCap API 2.0
 * v2.0.1  CoinCap is a useful tool for real-time pricing and market activity for over 1,000 cryptocurrencies. By collecting exchange data from thousands of markets, we are able to offer transparent and accurate data on asset price and availability.   Our API will offer insight into exactly which exchanges and markets contribute to our pricing.   For all endpoints, a single page offers 100 responses by default and supports up to 2,000 responses per page upon requests.   ## Status Codes and Error Response  The following are error codes you may encounter as you use CoinCap.   Note: all CoinCap requests are GET requests  200: Successful - this is the data you were looking for  400-417: Client error - these will often be accompanied by some response in the body that will give the user direction on how to change the request. Here are some examples of 400: Bad Request responses: - \'use valid interval\': m1, m5, m15, m30, h1, h2, h6, h12, d1\': Interval must be m1 for one minute, m5 for 5 minute, m15 for 15 minute, m30 for 30 minute, h1 for one hour, h2 for 2 hour, h6 for 6 hour, h12 for 12 hour, and d1 for one day - \'query requires end\': If user includes a start query, there must be an end query - \'query requires start\': If user includes an end query, there must be a start query - \'limit exceeds 2000\': bad request, exceeds max limit - \'missing exchange\': This endpoint requires user to specify exchange in parameters - \'missing interval\': This endpoint requires user to specify interval (ex: m1, m15, d1, etc) in parameters - \'missing base\': This endpoint requires user to specify base asset (ex: BTC) - \'missing quote\': This endpoint requires user to specify quote asset (ex: USD)  500-505: Server Error - Looks like something went down on our end. Try back again soon!  For a full list of HTTP Status Code definitions, please visit [here](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).  ## Headers  We encourage clients to use compression via the `Accept-Encoding` header.  `Accept-Encoding: gzip` or `Accept-Encoding: deflate`  If you have an API Key use it as a `Bearer Token`.   Programmatically, set the header field `Authorization=Bearer XXXX`  ## Limits  #### Free Tier (No API Key)  - 200 requests per minute - 11 years historical data  #### Free Tier (API Key)  - 500 requests per minute - 11 years historical data  ## Request API Key  Click [here](https://coincap.io/api-key) to request your API key
 *
 * The version of the OpenAPI document: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
/* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent, HttpParameterCodec, HttpContext 
        }       from '@angular/common/http';
import { CustomHttpParameterCodec }                          from '../encoder';
import { Observable }                                        from 'rxjs';

// @ts-ignore
import { InlineResponse2008 } from '../model/inlineResponse2008';

// @ts-ignore
import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';



@Injectable({
  providedIn: 'root'
})
export class MarketsService {

    protected basePath = 'http://localhost';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();
    public encoder: HttpParameterCodec;

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string|string[], @Optional() configuration: Configuration) {
        if (configuration) {
            this.configuration = configuration;
        }
        if (typeof this.configuration.basePath !== 'string') {
            if (Array.isArray(basePath) && basePath.length > 0) {
                basePath = basePath[0];
            }

            if (typeof basePath !== 'string') {
                basePath = this.basePath;
            }
            this.configuration.basePath = basePath;
        }
        this.encoder = this.configuration.encoder || new CustomHttpParameterCodec();
    }


    // @ts-ignore
    private addToHttpParams(httpParams: HttpParams, value: any, key?: string): HttpParams {
        if (typeof value === "object" && value instanceof Date === false) {
            httpParams = this.addToHttpParamsRecursive(httpParams, value);
        } else {
            httpParams = this.addToHttpParamsRecursive(httpParams, value, key);
        }
        return httpParams;
    }

    private addToHttpParamsRecursive(httpParams: HttpParams, value?: any, key?: string): HttpParams {
        if (value == null) {
            return httpParams;
        }

        if (typeof value === "object") {
            if (Array.isArray(value)) {
                (value as any[]).forEach( elem => httpParams = this.addToHttpParamsRecursive(httpParams, elem, key));
            } else if (value instanceof Date) {
                if (key != null) {
                    httpParams = httpParams.append(key, (value as Date).toISOString().substring(0, 10));
                } else {
                   throw Error("key may not be null if value is Date");
                }
            } else {
                Object.keys(value).forEach( k => httpParams = this.addToHttpParamsRecursive(
                    httpParams, value[k], key != null ? `${key}.${k}` : k));
            }
        } else if (key != null) {
            httpParams = httpParams.append(key, value);
        } else {
            throw Error("key may not be null if value is not object or array");
        }
        return httpParams;
    }

    /**
     * /markets
     * ### Request  | Key        | Required | Value      | Description | |------------|----------|------------|-------------| | exchangeId | optional | poloniex   | search by exchange id | baseSymbol | optional | BTC    | returns all containing the base symbol | quoteSymbol| optional | ETH    | returns all containing the quote symbol | baseId     | optional | bitcoin  | returns all containing the base id | quoteId    | optional | ethereum  | returns all containing the quote id | assetSymbol| optional | BTC    | returns all assets containing symbol (base and quote) | assetId    | optional | bitcoin  | returns all assets containing id (base and quote) | limit      | optional | 5    | max limit of 2000 | offset     | optional | 1    | offset  ### Response  | Key             | Description | |-----------------------|-------------| | exchangeId   | unique identifier for exchange | | rank     | rank is in ascending order - this number represents the amount of volume transacted by this market in relation to other markets on that exchange | | baseSymbol   | most common symbol used to identify asset, base is asset purchased | | baseId    | unique identifier for this asset, base is asset purchased | | quoteSymbol   | most common symbol used to identify asset, quote is asset used to purchase base | | quoteId       | unique identifier for this asset, quote is asset used to purchase base | | priceQuote   | the amount of quote asset traded for one unit of base asset | | priceUsd    | quote price translated to USD | | volumeUsd24Hr   | volume transacted on this market in last 24 hours | | percentExchangeVolume | the amount of daily volume a single market transacts in relation to total daily volume of all markets on the exchange | | tradesCount24Hr  | number of trades on this market in the last 24 hours | | updated    | UNIX timestamp (milliseconds) since information was received from this particular market |
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public markets(observe?: 'body', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<InlineResponse2008>;
    public markets(observe?: 'response', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpResponse<InlineResponse2008>>;
    public markets(observe?: 'events', reportProgress?: boolean, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<HttpEvent<InlineResponse2008>>;
    public markets(observe: any = 'body', reportProgress: boolean = false, options?: {httpHeaderAccept?: 'application/json', context?: HttpContext, transferCache?: boolean}): Observable<any> {

        let localVarHeaders = this.defaultHeaders;

        let localVarHttpHeaderAcceptSelected: string | undefined = options && options.httpHeaderAccept;
        if (localVarHttpHeaderAcceptSelected === undefined) {
            // to determine the Accept header
            const httpHeaderAccepts: string[] = [
                'application/json'
            ];
            localVarHttpHeaderAcceptSelected = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        }
        if (localVarHttpHeaderAcceptSelected !== undefined) {
            localVarHeaders = localVarHeaders.set('Accept', localVarHttpHeaderAcceptSelected);
        }

        let localVarHttpContext: HttpContext | undefined = options && options.context;
        if (localVarHttpContext === undefined) {
            localVarHttpContext = new HttpContext();
        }

        let localVarTransferCache: boolean | undefined = options && options.transferCache;
        if (localVarTransferCache === undefined) {
            localVarTransferCache = true;
        }


        let responseType_: 'text' | 'json' | 'blob' = 'json';
        if (localVarHttpHeaderAcceptSelected) {
            if (localVarHttpHeaderAcceptSelected.startsWith('text')) {
                responseType_ = 'text';
            } else if (this.configuration.isJsonMime(localVarHttpHeaderAcceptSelected)) {
                responseType_ = 'json';
            } else {
                responseType_ = 'blob';
            }
        }

        let localVarPath = `/v2/markets`;
        return this.httpClient.request<InlineResponse2008>('get', `${this.configuration.basePath}${localVarPath}`,
            {
                context: localVarHttpContext,
                responseType: <any>responseType_,
                withCredentials: this.configuration.withCredentials,
                headers: localVarHeaders,
                observe: observe,
                transferCache: localVarTransferCache,
                reportProgress: reportProgress
            }
        );
    }

}
