# Percentiles

## Get percentiles for an http test

**get** `/accounts/{account_id}/dex/http-tests/{test_id}/percentiles`

Get percentiles for an http test for a given time period between 1 hour and 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `from: string`

  Start time for the query in ISO (RFC3339 - ISO 8601) format.

- `to: string`

  End time for the query in ISO (RFC3339 - ISO 8601) format.

- `colo: optional string`

  Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

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

- `result: optional HTTPDetailsPercentiles`

  - `dnsResponseTimeMs: optional Percentiles`

    - `p50: optional number`

      p50 observed in the time period.

    - `p90: optional number`

      p90 observed in the time period.

    - `p95: optional number`

      p95 observed in the time period.

    - `p99: optional number`

      p99 observed in the time period.

  - `resourceFetchTimeMs: optional Percentiles`

  - `serverResponseTimeMs: optional Percentiles`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/http-tests/$TEST_ID/percentiles \
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
  "success": true,
  "result": {
    "dnsResponseTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "resourceFetchTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "serverResponseTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    }
  }
}
```

## Domain Types

### HTTP Details Percentiles

- `HTTPDetailsPercentiles object { dnsResponseTimeMs, resourceFetchTimeMs, serverResponseTimeMs }`

  - `dnsResponseTimeMs: optional Percentiles`

    - `p50: optional number`

      p50 observed in the time period.

    - `p90: optional number`

      p90 observed in the time period.

    - `p95: optional number`

      p95 observed in the time period.

    - `p99: optional number`

      p99 observed in the time period.

  - `resourceFetchTimeMs: optional Percentiles`

  - `serverResponseTimeMs: optional Percentiles`

### Test Stat Over Time

- `TestStatOverTime object { slots, avg, max, min }`

  - `slots: array of object { timestamp, value }`

    - `timestamp: string`

    - `value: number`

  - `avg: optional number`

    average observed in the time period.

  - `max: optional number`

    highest observed in the time period.

  - `min: optional number`

    lowest observed in the time period.
