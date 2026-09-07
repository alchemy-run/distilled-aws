## List rate limits

**get** `/zones/{zone_id}/rate_limits`

Fetches the rate limits for a zone.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Query Parameters

- `page: optional number`

  Defines the page number of paginated results.

- `per_page: optional number`

  Defines the maximum number of results per page. You can only set the value to `1` or to a multiple of 5 such as `5`, `10`, `15`, or `20`.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of RateLimit`

  - `id: optional string`

    The unique identifier of the rate limit.

  - `action: optional object { mode, response, timeout }`

    The action to perform when the threshold of matched traffic within the configured period is exceeded.

    - `mode: optional "simulate" or "ban" or "challenge" or 2 more`

      The action to perform.

      - `"simulate"`

      - `"ban"`

      - `"challenge"`

      - `"js_challenge"`

      - `"managed_challenge"`

    - `response: optional object { body, content_type }`

      A custom content type and reponse to return when the threshold is exceeded. The custom response configured in this object will override the custom error for the zone. This object is optional.
      Notes: If you omit this object, Cloudflare will use the default HTML error page. If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone challenge pages and you should not provide the "response" object.

      - `body: optional string`

        The response body to return. The value must conform to the configured content type.

      - `content_type: optional string`

        The content type of the body. Must be one of the following: `text/plain`, `text/xml`, or `application/json`.

    - `timeout: optional number`

      The time in seconds during which Cloudflare will perform the mitigation action. Must be an integer value greater than or equal to the period.
      Notes: If "mode" is "challenge", "managed_challenge", or "js_challenge", Cloudflare will use the zone's Challenge Passage time and you should not provide this value.

  - `bypass: optional array of object { name, value }`

    Criteria specifying when the current rate limit should be bypassed. You can specify that the rate limit should not apply to one or more URLs.

    - `name: optional "url"`

      - `"url"`

    - `value: optional string`

      The URL to bypass.

  - `description: optional string`

    An informative summary of the rule. This value is sanitized and any tags will be removed.

  - `disabled: optional boolean`

    When true, indicates that the rate limit is currently disabled.

  - `match: optional object { headers, request, response }`

    Determines which traffic the rate limit counts towards the threshold.

    - `headers: optional array of object { name, op, value }`

      - `name: optional string`

        The name of the response header to match.

      - `op: optional "eq" or "ne"`

        The operator used when matching: `eq` means "equal" and `ne` means "not equal".

        - `"eq"`

        - `"ne"`

      - `value: optional string`

        The value of the response header, which must match exactly.

    - `request: optional object { methods, schemes, url }`

      - `methods: optional array of "GET" or "POST" or "PUT" or 4 more`

        The HTTP methods to match. You can specify a subset (for example, `['POST','PUT']`) or all methods (`['_ALL_']`). This field is optional when creating a rate limit.

        - `"GET"`

        - `"POST"`

        - `"PUT"`

        - `"DELETE"`

        - `"PATCH"`

        - `"HEAD"`

        - `"_ALL_"`

      - `schemes: optional array of string`

        The HTTP schemes to match. You can specify one scheme (`['HTTPS']`), both schemes (`['HTTP','HTTPS']`), or all schemes (`['_ALL_']`). This field is optional.

      - `url: optional string`

        The URL pattern to match, composed of a host and a path such as `example.org/path*`. Normalization is applied before the pattern is matched. `*` wildcards are expanded to match applicable traffic. Query strings are not matched. Set the value to `*` to match all traffic to your zone.

    - `response: optional object { origin_traffic }`

      - `origin_traffic: optional boolean`

        When true, only the uncached traffic served from your origin servers will count towards rate limiting. In this case, any cached traffic served by Cloudflare will not count towards rate limiting. This field is optional.
        Notes: This field is deprecated. Instead, use response headers and set "origin_traffic" to "false" to avoid legacy behaviour interacting with the "response_headers" property.

  - `period: optional number`

    The time in seconds (an integer value) to count matching traffic. If the count exceeds the configured threshold within this period, Cloudflare will perform the configured action.

  - `threshold: optional number`

    The threshold that will trigger the configured mitigation action. Configure this value along with the `period` property to establish a threshold per period.

- `success: true`

  Defines whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Defines the total number of results for the requested service.

  - `page: optional number`

    Defines the current page within paginated list of results.

  - `per_page: optional number`

    Defines the number of results per page of results.

  - `total_count: optional number`

    Defines the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/rate_limits \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "372e67954025e0ba6aaa6d586b9e0b59",
      "action": {
        "mode": "challenge",
        "response": {
          "body": "<error>This request has been rate-limited.</error>",
          "content_type": "text/xml"
        },
        "timeout": 86400
      },
      "bypass": [
        {
          "name": "url",
          "value": "api.example.com/*"
        }
      ],
      "description": "Prevent multiple login failures to mitigate brute force attacks",
      "disabled": false,
      "match": {
        "headers": [
          {
            "name": "Cf-Cache-Status",
            "op": "ne",
            "value": "HIT"
          }
        ],
        "request": {
          "methods": [
            "GET",
            "POST"
          ],
          "schemes": [
            "HTTP",
            "HTTPS"
          ],
          "url": "*.example.org/path*"
        },
        "response": {
          "origin_traffic": true
        }
      },
      "period": 900,
      "threshold": 60
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```
