## List User Agent Blocking rules

**get** `/zones/{zone_id}/firewall/ua_rules`

Fetches User Agent Blocking rules in a zone. You can filter the results using several optional parameters.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

### Query Parameters

- `description: optional string`

  A string to search for in the description of existing rules.

- `page: optional number`

  Page number of paginated results.

- `paused: optional boolean`

  When true, indicates that the rule is currently paused.

- `per_page: optional number`

  The maximum number of results per page. You can only set the value to `1` or to a multiple of 5 such as `5`, `10`, `15`, or `20`.

- `user_agent: optional string`

  A string to search for in the user agent values of existing rules.

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

- `result: array of object { id, configuration, description, 2 more }`

  - `id: optional string`

    The unique identifier of the User Agent Blocking rule.

  - `configuration: optional object { target, value }`

    The configuration object for the current rule.

    - `target: optional string`

      The configuration target for this rule. You must set the target to `ua` for User Agent Blocking rules.

    - `value: optional string`

      The exact user agent string to match. This value will be compared to the received `User-Agent` HTTP header value.

  - `description: optional string`

    An informative summary of the rule.

  - `mode: optional "block" or "challenge" or "js_challenge" or "managed_challenge"`

    The action to apply to a matched request.

    - `"block"`

    - `"challenge"`

    - `"js_challenge"`

    - `"managed_challenge"`

  - `paused: optional boolean`

    When true, indicates that the rule is currently paused.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/ua_rules \
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
      "configuration": {
        "target": "ua",
        "value": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/603.2.4 (KHTML, like Gecko) Version/10.1.1 Safari/603.2.4"
      },
      "description": "Prevent access from abusive clients identified by this User Agent to mitigate a DDoS attack",
      "mode": "js_challenge",
      "paused": false
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
