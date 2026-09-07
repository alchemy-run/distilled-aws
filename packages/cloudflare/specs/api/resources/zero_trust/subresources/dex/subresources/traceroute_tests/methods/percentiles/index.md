## Get percentiles for a traceroute test

**get** `/accounts/{account_id}/dex/traceroute-tests/{test_id}/percentiles`

Get percentiles for a traceroute test for a given time period between 1 hour and 7 days.

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

- `result: optional object { hopsCount, packetLossPct, roundTripTimeMs }`

  - `hopsCount: optional Percentiles`

    - `p50: optional number`

      p50 observed in the time period.

    - `p90: optional number`

      p90 observed in the time period.

    - `p95: optional number`

      p95 observed in the time period.

    - `p99: optional number`

      p99 observed in the time period.

  - `packetLossPct: optional Percentiles`

  - `roundTripTimeMs: optional Percentiles`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID/percentiles \
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
    "hopsCount": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "packetLossPct": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    },
    "roundTripTimeMs": {
      "p50": 0,
      "p90": 0,
      "p95": 0,
      "p99": 0
    }
  }
}
```
