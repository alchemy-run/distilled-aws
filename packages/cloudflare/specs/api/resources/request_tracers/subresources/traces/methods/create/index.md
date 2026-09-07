## Request Trace

**post** `/accounts/{account_id}/request-tracer/trace`

Request Trace

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `method: string`

  HTTP Method of tracing request

- `url: string`

  URL to which perform tracing request

- `body: optional object { base64, json, plain_text }`

  - `base64: optional string`

    Base64 encoded request body

  - `json: optional unknown`

    Arbitrary json as request body

  - `plain_text: optional string`

    Request body as plain text

- `context: optional object { bot_score, geoloc, skip_challenge, threat_score }`

  Additional request parameters

  - `bot_score: optional number`

    Bot score used for evaluating tracing request processing

  - `geoloc: optional object { city, continent, is_eu_country, 7 more }`

    Geodata for tracing request

    - `city: optional string`

    - `continent: optional string`

    - `is_eu_country: optional boolean`

    - `iso_code: optional string`

    - `latitude: optional number`

    - `longitude: optional number`

    - `postal_code: optional string`

    - `region_code: optional string`

    - `subdivision_2_iso_code: optional string`

    - `timezone: optional string`

  - `skip_challenge: optional boolean`

    Whether to skip any challenges for tracing request (e.g.: captcha)

  - `threat_score: optional number`

    Threat score used for evaluating tracing request processing

- `cookies: optional map[string]`

  Cookies added to tracing request

- `headers: optional map[string]`

  Headers added to tracing request

- `protocol: optional string`

  HTTP Protocol of tracing request

- `skip_response: optional boolean`

  Skip sending the request to the Origin server after all rules evaluation

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { status_code, trace }`

  Trace result with an origin status code

  - `status_code: optional number`

    HTTP Status code of zone response

  - `trace: optional Trace`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/request-tracer/trace \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "method": "PUT",
          "url": "https://some.zone/some_path",
          "cookies": {
            "cookie_name_1": "cookie_value_1",
            "cookie_name_2": "cookie_value_2"
          },
          "headers": {
            "header_name_1": "header_value_1",
            "header_name_2": "header_value_2"
          },
          "protocol": "HTTP/1.1"
        }'
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
  "success": true,
  "result": {
    "status_code": 0,
    "trace": [
      {
        "action": "execute",
        "action_parameters": {
          "id": "4814384a9e5d4991b9815dcfc25d2f1f"
        },
        "description": "some rule",
        "expression": "ip.src ne 1.1.1.1",
        "kind": "zone",
        "matched": true,
        "name": "some ruleset name",
        "step_name": "rule_id01",
        "type": "rule"
      }
    ]
  }
}
```
