/**
 * CoinCap API 2.0
 * v2.0.1  CoinCap is a useful tool for real-time pricing and market activity for over 1,000 cryptocurrencies. By collecting exchange data from thousands of markets, we are able to offer transparent and accurate data on asset price and availability.   Our API will offer insight into exactly which exchanges and markets contribute to our pricing.   For all endpoints, a single page offers 100 responses by default and supports up to 2,000 responses per page upon requests.   ## Status Codes and Error Response  The following are error codes you may encounter as you use CoinCap.   Note: all CoinCap requests are GET requests  200: Successful - this is the data you were looking for  400-417: Client error - these will often be accompanied by some response in the body that will give the user direction on how to change the request. Here are some examples of 400: Bad Request responses: - 'use valid interval': m1, m5, m15, m30, h1, h2, h6, h12, d1': Interval must be m1 for one minute, m5 for 5 minute, m15 for 15 minute, m30 for 30 minute, h1 for one hour, h2 for 2 hour, h6 for 6 hour, h12 for 12 hour, and d1 for one day - 'query requires end': If user includes a start query, there must be an end query - 'query requires start': If user includes an end query, there must be a start query - 'limit exceeds 2000': bad request, exceeds max limit - 'missing exchange': This endpoint requires user to specify exchange in parameters - 'missing interval': This endpoint requires user to specify interval (ex: m1, m15, d1, etc) in parameters - 'missing base': This endpoint requires user to specify base asset (ex: BTC) - 'missing quote': This endpoint requires user to specify quote asset (ex: USD)  500-505: Server Error - Looks like something went down on our end. Try back again soon!  For a full list of HTTP Status Code definitions, please visit [here](https://www.w3.org/Protocols/rfc2616/rfc2616-sec10.html).  ## Headers  We encourage clients to use compression via the `Accept-Encoding` header.  `Accept-Encoding: gzip` or `Accept-Encoding: deflate`  If you have an API Key use it as a `Bearer Token`.   Programmatically, set the header field `Authorization=Bearer XXXX`  ## Limits  #### Free Tier (No API Key)  - 200 requests per minute - 11 years historical data  #### Free Tier (API Key)  - 500 requests per minute - 11 years historical data  ## Request API Key  Click [here](https://coincap.io/api-key) to request your API key
 *
 * OpenAPI spec version: 1.0.0
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *//* tslint:disable:no-unused-variable member-ordering */

import { Inject, Injectable, Optional }                      from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams,
         HttpResponse, HttpEvent }                           from '@angular/common/http';
import { CustomHttpUrlEncodingCodec }                        from '../encoder';

import { Observable }                                        from 'rxjs';

import { InlineResponse2009 } from '../model/inlineResponse2009';

import { BASE_PATH, COLLECTION_FORMATS }                     from '../variables';
import { Configuration }                                     from '../configuration';


@Injectable()
export class CandlesService {

    protected basePath = '{{host}}';
    public defaultHeaders = new HttpHeaders();
    public configuration = new Configuration();

    constructor(protected httpClient: HttpClient, @Optional()@Inject(BASE_PATH) basePath: string, @Optional() configuration: Configuration) {
        if (basePath) {
            this.basePath = basePath;
        }
        if (configuration) {
            this.configuration = configuration;
            this.basePath = basePath || configuration.basePath || this.basePath;
        }
    }

    /**
     * @param consumes string[] mime-types
     * @return true: consumes contains 'multipart/form-data', false: otherwise
     */
    private canConsumeForm(consumes: string[]): boolean {
        const form = 'multipart/form-data';
        for (const consume of consumes) {
            if (form === consume) {
                return true;
            }
        }
        return false;
    }


    /**
     * /candles
     * ### Request  | Key        | Required | Value                     | Description | |------------|----------|------------------------------------------------|-------------| | exchange   | required | poloniex               | exchange id | interval   | required | m1, m5, m15, m30, h1, h2, h4, h8, h12, d1, w1  | candle interval | baseId     | required | ethereum              | base id | quoteId    | required | bitcoin                 | quote id | start      | optional | 1528410925604          | UNIX time in milliseconds. omiting will return the most recent candles | end        | optional | 1528411045604          | UNIX time in milliseconds. omiting will return the most recent candles  ### Response  | Key        | Description | |------------|-------------| | open   | the price (quote) at which the first transaction was completed in a given time period | | high   | the top price (quote) at which the base was traded during the time period | | low   | the bottom price (quote) at which the base was traded during the time period | | close   | the price (quote) at which the last transaction was completed in a given time period | | volume  | the amount of base asset traded in the given time period | | period  | timestamp for starting of that time period, represented in UNIX milliseconds |
     * @param exchange 
     * @param interval 
     * @param baseId 
     * @param quoteId 
     * @param observe set whether or not to return the data Observable as the body, response or events. defaults to returning the body.
     * @param reportProgress flag to report request and response progress.
     */
    public candles(exchange?: string, interval?: string, baseId?: string, quoteId?: string, observe?: 'body', reportProgress?: boolean): Observable<InlineResponse2009>;
    public candles(exchange?: string, interval?: string, baseId?: string, quoteId?: string, observe?: 'response', reportProgress?: boolean): Observable<HttpResponse<InlineResponse2009>>;
    public candles(exchange?: string, interval?: string, baseId?: string, quoteId?: string, observe?: 'events', reportProgress?: boolean): Observable<HttpEvent<InlineResponse2009>>;
    public candles(exchange?: string, interval?: string, baseId?: string, quoteId?: string, observe: any = 'body', reportProgress: boolean = false ): Observable<any> {





        let queryParameters = new HttpParams({encoder: new CustomHttpUrlEncodingCodec()});
        if (exchange !== undefined && exchange !== null) {
            queryParameters = queryParameters.set('exchange', <any>exchange);
        }
        if (interval !== undefined && interval !== null) {
            queryParameters = queryParameters.set('interval', <any>interval);
        }
        if (baseId !== undefined && baseId !== null) {
            queryParameters = queryParameters.set('baseId', <any>baseId);
        }
        if (quoteId !== undefined && quoteId !== null) {
            queryParameters = queryParameters.set('quoteId', <any>quoteId);
        }

        let headers = this.defaultHeaders;

        // to determine the Accept header
        let httpHeaderAccepts: string[] = [
            'application/json'
        ];
        const httpHeaderAcceptSelected: string | undefined = this.configuration.selectHeaderAccept(httpHeaderAccepts);
        if (httpHeaderAcceptSelected != undefined) {
            headers = headers.set('Accept', httpHeaderAcceptSelected);
        }

        // to determine the Content-Type header
        const consumes: string[] = [
        ];

        return this.httpClient.request<InlineResponse2009>('get',`${this.basePath}/v2/candles`,
            {
                params: queryParameters,
                withCredentials: this.configuration.withCredentials,
                headers: headers,
                observe: observe,
                reportProgress: reportProgress
            }
        );
    }

}
