## By Time

**get** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}/dns_analytics/report/bytime`

Retrieves a list of aggregate metrics grouped by time interval.

See [Analytics API properties](https://developers.cloudflare.com/dns/reference/analytics-api-properties/) for detailed information about the available query parameters.

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

  Identifier.

### Query Parameters

- `dimensions: optional string`

  A comma-separated list of dimensions to group results by.

- `filters: optional string`

  Segmentation filter in 'attribute operator value' format.

- `limit: optional number`

  Limit number of returned metrics.

- `metrics: optional string`

  A comma-separated list of metrics to query.

- `since: optional string`

  Start date and time of requesting data period in ISO 8601 format.

- `sort: optional string`

  A comma-separated list of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

- `time_delta: optional "all" or "auto" or "year" or 7 more`

  Unit of time to group data by.

  - `"all"`

  - `"auto"`

  - `"year"`

  - `"quarter"`

  - `"month"`

  - `"week"`

  - `"day"`

  - `"hour"`

  - `"dekaminute"`

  - `"minute"`

- `until: optional string`

  End date and time of requesting data period in ISO 8601 format.

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

- `result: optional ByTime`

  - `data: array of object { dimensions, metrics }`

    Array with one row per combination of dimension values.

    - `dimensions: array of string`

      Array of dimension values, representing the combination of dimension values corresponding to this row.

    - `metrics: array of array of number`

      Array with one item per requested metric. Each item is an array of values, broken down by time interval.

  - `data_lag: number`

    Number of seconds between current time and last processed event, in another words how many seconds of data could be missing.

  - `max: unknown`

    Maximum results for each metric (object mapping metric names to values). Currently always an empty object.

  - `min: unknown`

    Minimum results for each metric (object mapping metric names to values). Currently always an empty object.

  - `query: object { dimensions, limit, metrics, 5 more }`

    - `dimensions: array of string`

      Array of dimension names.

    - `limit: number`

      Limit number of returned metrics.

    - `metrics: array of string`

      Array of metric names.

    - `since: string`

      Start date and time of requesting data period in ISO 8601 format.

    - `time_delta: "all" or "auto" or "year" or 7 more`

      Unit of time to group data by.

      - `"all"`

      - `"auto"`

      - `"year"`

      - `"quarter"`

      - `"month"`

      - `"week"`

      - `"day"`

      - `"hour"`

      - `"dekaminute"`

      - `"minute"`

    - `until: string`

      End date and time of requesting data period in ISO 8601 format.

    - `filters: optional string`

      Segmentation filter in 'attribute operator value' format.

    - `sort: optional array of string`

      Array of dimensions to sort by, where each dimension may be prefixed by - (descending) or + (ascending).

  - `rows: number`

    Total number of rows in the result.

  - `time_intervals: array of array of string`

    Array of time intervals in the response data. Each interval is represented as an array containing two values: the start time, and the end time.

  - `totals: unknown`

    Total results for metrics across all data (object mapping metric names to values).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID/dns_analytics/report/bytime \
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
    "data": [
      {
        "dimensions": [
          "NODATA"
        ],
        "metrics": [
          [
            0
          ]
        ]
      }
    ],
    "data_lag": 60,
    "max": {},
    "min": {},
    "query": {
      "dimensions": [
        "responseCode",
        "queryName"
      ],
      "limit": 100,
      "metrics": [
        "queryCount",
        "responseTimeAvg"
      ],
      "since": "2023-11-11T12:00:00Z",
      "time_delta": "hour",
      "until": "2023-11-11T13:00:00Z",
      "filters": "responseCode==NOERROR,queryType==A",
      "sort": [
        "+responseCode",
        "-queryName"
      ]
    },
    "rows": 100,
    "time_intervals": [
      [
        "2023-11-11T12:00:00Z"
      ]
    ],
    "totals": {}
  }
}
```
