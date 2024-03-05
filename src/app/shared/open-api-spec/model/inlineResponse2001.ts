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
import { InlineResponse2001Data } from './inlineResponse2001Data';


export interface InlineResponse2001 { 
    data?: InlineResponse2001Data;
    timestamp?: number;
}

