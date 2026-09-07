# Analytics

# Aggregates

# Currents

## Get current aggregated analytics

**get** `/zones/{zone_id}/spectrum/analytics/aggregate/current`

Retrieves analytics aggregated from the last minute of usage on Spectrum applications underneath a given zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `appID: optional string`

  Comma-delimited list of Spectrum Application Id(s). If provided, the response will be limited to Spectrum Application Id(s) that match.

- `colo_name: optional string`

  Co-location identifier.

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

- `result: optional array of object { appID, bytesEgress, bytesIngress, 2 more }`

  - `appID: string`

    Application identifier.

  - `bytesEgress: number`

    Number of bytes sent.

  - `bytesIngress: number`

    Number of bytes received.

  - `connections: number`

    Number of connections.

  - `durationAvg: number`

    Average duration of connections.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/analytics/aggregate/current \
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
  "result": [
    {
      "appID": "023e105f4ecef8ad9ca31a8372d0c353",
      "bytesEgress": 0,
      "bytesIngress": 0,
      "connections": 0,
      "durationAvg": 0
    }
  ]
}
```

## Domain Types

### Current Get Response

- `CurrentGetResponse = array of object { appID, bytesEgress, bytesIngress, 2 more }`

  - `appID: string`

    Application identifier.

  - `bytesEgress: number`

    Number of bytes sent.

  - `bytesIngress: number`

    Number of bytes received.

  - `connections: number`

    Number of connections.

  - `durationAvg: number`

    Average duration of connections.

# Events

## Domain Types

### Dimension

- `Dimension = "event" or "appID" or "coloName" or "ipVersion"`

  - `"event"`

  - `"appID"`

  - `"coloName"`

  - `"ipVersion"`

# Bytimes

## Get analytics by time

**get** `/zones/{zone_id}/spectrum/analytics/events/bytime`

Retrieves a list of aggregate metrics grouped by time interval.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `time_delta: "year" or "quarter" or "month" or 5 more`

  Used to select time series resolution.

  - `"year"`

  - `"quarter"`

  - `"month"`

  - `"week"`

  - `"day"`

  - `"hour"`

  - `"dekaminute"`

  - `"minute"`

- `dimensions: optional array of Dimension`

  Can be used to break down the data by given attributes. Options are:

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6.                                                      |

  - `"event"`

  - `"appID"`

  - `"coloName"`

  - `"ipVersion"`

- `filters: optional string`

  Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| ==       | Equals                   | %3D%3D      |
| !=       | Does not equals          | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

  Use the above to construct filters.

- `metrics: optional array of "count" or "bytesIngress" or "bytesEgress" or 4 more`

  One or more metrics to compute. Options are:

| Metric         | Name                                | Example | Unit                  |
| -------------- | ----------------------------------- | ------- | --------------------- |
| count          | Count of total events               | 1000    | Count                 |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                   |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                   |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds  |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds  |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds  |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds. |

  - `"count"`

  - `"bytesIngress"`

  - `"bytesEgress"`

  - `"durationAvg"`

  - `"durationMedian"`

  - `"duration90th"`

  - `"duration99th"`

- `since: optional string`

  Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

- `sort: optional array of string`

  The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.

- `until: optional string`

  End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

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

- `result: optional object { data, data_lag, max, 5 more }`

  - `data: array of object { dimensions, metrics }`

    List of columns returned by the analytics query.

    - `dimensions: optional array of string`

    - `metrics: optional array of number or array of array of number`

      - `array of number`

      - `array of array of number`

  - `data_lag: number`

    Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

  - `max: map[number]`

    Maximum result for each selected metrics across all data.

  - `min: map[number]`

    Minimum result for each selected metrics across all data.

  - `query: object { dimensions, filters, limit, 4 more }`

    - `dimensions: optional array of Dimension`

      Can be used to break down the data by given attributes. Options are:

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6.                                                      |

      - `"event"`

      - `"appID"`

      - `"coloName"`

      - `"ipVersion"`

    - `filters: optional string`

      Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| ==       | Equals                   | %3D%3D      |
| !=       | Does not equals          | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

      Use the above to construct filters.

    - `limit: optional number`

      Limit number of returned metrics.

    - `metrics: optional array of "count" or "bytesIngress" or "bytesEgress" or 4 more`

      One or more metrics to compute. Options are:

| Metric         | Name                                | Example | Unit                  |
| -------------- | ----------------------------------- | ------- | --------------------- |
| count          | Count of total events               | 1000    | Count                 |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                   |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                   |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds  |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds  |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds  |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds. |

      - `"count"`

      - `"bytesIngress"`

      - `"bytesEgress"`

      - `"durationAvg"`

      - `"durationMedian"`

      - `"duration90th"`

      - `"duration99th"`

    - `since: optional string`

      Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

    - `sort: optional array of string`

      The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.

    - `until: optional string`

      End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

  - `rows: number`

    Total number of rows in the result.

  - `totals: map[number]`

    Total result for each selected metrics across all data.

  - `time_intervals: optional array of array of string`

    List of time interval buckets: [start, end].

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/analytics/events/bytime \
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
          "string"
        ],
        "metrics": [
          0
        ]
      }
    ],
    "data_lag": 3,
    "max": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "min": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "query": {
      "dimensions": [
        "event",
        "appID"
      ],
      "filters": "event==disconnect%20AND%20coloName!=SFO",
      "limit": 0,
      "metrics": [
        "count",
        "bytesIngress"
      ],
      "since": "2014-01-01T05:20:00.12345Z",
      "sort": [
        "+count",
        "-bytesIngress"
      ],
      "until": "2014-01-01T05:20:00.12345Z"
    },
    "rows": 5,
    "totals": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "time_intervals": [
      [
        "2014-01-01T05:20:00.12345Z"
      ]
    ]
  }
}
```

## Domain Types

### Bytime Get Response

- `BytimeGetResponse object { data, data_lag, max, 5 more }`

  - `data: array of object { dimensions, metrics }`

    List of columns returned by the analytics query.

    - `dimensions: optional array of string`

    - `metrics: optional array of number or array of array of number`

      - `array of number`

      - `array of array of number`

  - `data_lag: number`

    Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

  - `max: map[number]`

    Maximum result for each selected metrics across all data.

  - `min: map[number]`

    Minimum result for each selected metrics across all data.

  - `query: object { dimensions, filters, limit, 4 more }`

    - `dimensions: optional array of Dimension`

      Can be used to break down the data by given attributes. Options are:

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6.                                                      |

      - `"event"`

      - `"appID"`

      - `"coloName"`

      - `"ipVersion"`

    - `filters: optional string`

      Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| ==       | Equals                   | %3D%3D      |
| !=       | Does not equals          | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

      Use the above to construct filters.

    - `limit: optional number`

      Limit number of returned metrics.

    - `metrics: optional array of "count" or "bytesIngress" or "bytesEgress" or 4 more`

      One or more metrics to compute. Options are:

| Metric         | Name                                | Example | Unit                  |
| -------------- | ----------------------------------- | ------- | --------------------- |
| count          | Count of total events               | 1000    | Count                 |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                   |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                   |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds  |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds  |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds  |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds. |

      - `"count"`

      - `"bytesIngress"`

      - `"bytesEgress"`

      - `"durationAvg"`

      - `"durationMedian"`

      - `"duration90th"`

      - `"duration99th"`

    - `since: optional string`

      Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

    - `sort: optional array of string`

      The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.

    - `until: optional string`

      End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

  - `rows: number`

    Total number of rows in the result.

  - `totals: map[number]`

    Total result for each selected metrics across all data.

  - `time_intervals: optional array of array of string`

    List of time interval buckets: [start, end].

# Summaries

## Get analytics summary

**get** `/zones/{zone_id}/spectrum/analytics/events/summary`

Retrieves a list of summarised aggregate metrics over a given time period.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `dimensions: optional array of Dimension`

  Can be used to break down the data by given attributes. Options are:

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6.                                                      |

  - `"event"`

  - `"appID"`

  - `"coloName"`

  - `"ipVersion"`

- `filters: optional string`

  Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| ==       | Equals                   | %3D%3D      |
| !=       | Does not equals          | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

  Use the above to construct filters.

- `metrics: optional array of "count" or "bytesIngress" or "bytesEgress" or 4 more`

  One or more metrics to compute. Options are:

| Metric         | Name                                | Example | Unit                  |
| -------------- | ----------------------------------- | ------- | --------------------- |
| count          | Count of total events               | 1000    | Count                 |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                   |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                   |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds  |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds  |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds  |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds. |

  - `"count"`

  - `"bytesIngress"`

  - `"bytesEgress"`

  - `"durationAvg"`

  - `"durationMedian"`

  - `"duration90th"`

  - `"duration99th"`

- `since: optional string`

  Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

- `sort: optional array of string`

  The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.

- `until: optional string`

  End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

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

- `result: optional object { data, data_lag, max, 5 more }`

  - `data: array of object { dimensions, metrics }`

    List of columns returned by the analytics query.

    - `dimensions: optional array of string`

    - `metrics: optional array of number or array of array of number`

      - `array of number`

      - `array of array of number`

  - `data_lag: number`

    Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

  - `max: map[number]`

    Maximum result for each selected metrics across all data.

  - `min: map[number]`

    Minimum result for each selected metrics across all data.

  - `query: object { dimensions, filters, limit, 4 more }`

    - `dimensions: optional array of Dimension`

      Can be used to break down the data by given attributes. Options are:

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6.                                                      |

      - `"event"`

      - `"appID"`

      - `"coloName"`

      - `"ipVersion"`

    - `filters: optional string`

      Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| ==       | Equals                   | %3D%3D      |
| !=       | Does not equals          | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

      Use the above to construct filters.

    - `limit: optional number`

      Limit number of returned metrics.

    - `metrics: optional array of "count" or "bytesIngress" or "bytesEgress" or 4 more`

      One or more metrics to compute. Options are:

| Metric         | Name                                | Example | Unit                  |
| -------------- | ----------------------------------- | ------- | --------------------- |
| count          | Count of total events               | 1000    | Count                 |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                   |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                   |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds  |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds  |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds  |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds. |

      - `"count"`

      - `"bytesIngress"`

      - `"bytesEgress"`

      - `"durationAvg"`

      - `"durationMedian"`

      - `"duration90th"`

      - `"duration99th"`

    - `since: optional string`

      Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

    - `sort: optional array of string`

      The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.

    - `until: optional string`

      End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

  - `rows: number`

    Total number of rows in the result.

  - `totals: map[number]`

    Total result for each selected metrics across all data.

  - `time_intervals: optional array of array of string`

    List of time interval buckets: [start, end].

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/analytics/events/summary \
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
          "string"
        ],
        "metrics": [
          0
        ]
      }
    ],
    "data_lag": 3,
    "max": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "min": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "query": {
      "dimensions": [
        "event",
        "appID"
      ],
      "filters": "event==disconnect%20AND%20coloName!=SFO",
      "limit": 0,
      "metrics": [
        "count",
        "bytesIngress"
      ],
      "since": "2014-01-01T05:20:00.12345Z",
      "sort": [
        "+count",
        "-bytesIngress"
      ],
      "until": "2014-01-01T05:20:00.12345Z"
    },
    "rows": 5,
    "totals": {
      "bytesEgress": 100,
      "bytesIngress": 50
    },
    "time_intervals": [
      [
        "2014-01-01T05:20:00.12345Z"
      ]
    ]
  }
}
```

## Domain Types

### Summary Get Response

- `SummaryGetResponse object { data, data_lag, max, 5 more }`

  - `data: array of object { dimensions, metrics }`

    List of columns returned by the analytics query.

    - `dimensions: optional array of string`

    - `metrics: optional array of number or array of array of number`

      - `array of number`

      - `array of array of number`

  - `data_lag: number`

    Number of seconds between current time and last processed event, i.e. how many seconds of data could be missing.

  - `max: map[number]`

    Maximum result for each selected metrics across all data.

  - `min: map[number]`

    Minimum result for each selected metrics across all data.

  - `query: object { dimensions, filters, limit, 4 more }`

    - `dimensions: optional array of Dimension`

      Can be used to break down the data by given attributes. Options are:

| Dimension | Name                          | Example                                                    |
| --------- | ----------------------------- | ---------------------------------------------------------- |
| event     | Connection Event              | connect, progress, disconnect, originError, clientFiltered |
| appID     | Application ID                | 40d67c87c6cd4b889a4fd57805225e85                           |
| coloName  | Colo Name                     | SFO                                                        |
| ipVersion | IP version used by the client | 4, 6.                                                      |

      - `"event"`

      - `"appID"`

      - `"coloName"`

      - `"ipVersion"`

    - `filters: optional string`

      Used to filter rows by one or more dimensions. Filters can be combined using OR and AND boolean logic. AND takes precedence over OR in all the expressions. The OR operator is defined using a comma (,) or OR keyword surrounded by whitespace. The AND operator is defined using a semicolon (;) or AND keyword surrounded by whitespace. Note that the semicolon is a reserved character in URLs (rfc1738) and needs to be percent-encoded as %3B. Comparison options are:

| Operator | Name                     | URL Encoded |
| -------- | ------------------------ | ----------- |
| ==       | Equals                   | %3D%3D      |
| !=       | Does not equals          | !%3D        |
| \>       | Greater Than             | %3E         |
| <        | Less Than                | %3C         |
| \>=      | Greater than or equal to | %3E%3D      |
| <=       | Less than or equal to    | %3C%3D      |

      Use the above to construct filters.

    - `limit: optional number`

      Limit number of returned metrics.

    - `metrics: optional array of "count" or "bytesIngress" or "bytesEgress" or 4 more`

      One or more metrics to compute. Options are:

| Metric         | Name                                | Example | Unit                  |
| -------------- | ----------------------------------- | ------- | --------------------- |
| count          | Count of total events               | 1000    | Count                 |
| bytesIngress   | Sum of ingress bytes                | 1000    | Sum                   |
| bytesEgress    | Sum of egress bytes                 | 1000    | Sum                   |
| durationAvg    | Average connection duration         | 1.0     | Time in milliseconds  |
| durationMedian | Median connection duration          | 1.0     | Time in milliseconds  |
| duration90th   | 90th percentile connection duration | 1.0     | Time in milliseconds  |
| duration99th   | 99th percentile connection duration | 1.0     | Time in milliseconds. |

      - `"count"`

      - `"bytesIngress"`

      - `"bytesEgress"`

      - `"durationAvg"`

      - `"durationMedian"`

      - `"duration90th"`

      - `"duration99th"`

    - `since: optional string`

      Start of time interval to query, defaults to `until` - 6 hours. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

    - `sort: optional array of string`

      The sort order for the result set; sort fields must be included in `metrics` or `dimensions`.

    - `until: optional string`

      End of time interval to query, defaults to current time. Timestamp must be in RFC3339 format and uses UTC unless otherwise specified.

  - `rows: number`

    Total number of rows in the result.

  - `totals: map[number]`

    Total result for each selected metrics across all data.

  - `time_intervals: optional array of array of string`

    List of time interval buckets: [start, end].
