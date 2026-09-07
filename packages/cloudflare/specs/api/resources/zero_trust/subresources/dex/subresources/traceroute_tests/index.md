# Traceroute Tests

## Get details and aggregate metrics for a traceroute test

**get** `/accounts/{account_id}/dex/traceroute-tests/{test_id}`

Get test details and aggregate performance metrics for a traceroute test for a given time period between 1 hour and 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `from: string`

  Start time for aggregate metrics in ISO ms.

- `interval: "minute" or "hour"`

  Time interval for aggregate time slots.

  - `"minute"`

  - `"hour"`

- `to: string`

  End time for aggregate metrics in ISO ms.

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

- `result: optional Traceroute`

  - `host: string`

    The host of the Traceroute synthetic application test.

  - `interval: string`

    The interval at which the Traceroute synthetic application test is set to run.

  - `kind: "traceroute"`

    - `"traceroute"`

  - `name: string`

    The name of the Traceroute synthetic application test.

  - `target_policies: optional array of DigitalExperienceMonitor`

    - `id: string`

      API Resource UUID tag.

    - `default: boolean`

      Whether the policy is the default for the account.

    - `name: string`

  - `targeted: optional boolean`

  - `tracerouteStats: optional object { availabilityPct, hopsCount, packetLossPct, 2 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `hopsCount: TestStatOverTime`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `tracerouteStatsByColo: optional array of object { availabilityPct, colo, hopsCount, 3 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `colo: string`

    - `hopsCount: TestStatOverTime`

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID \
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
    "host": "1.1.1.1",
    "interval": "0h5m0s",
    "kind": "traceroute",
    "name": "Atlassian Sign In Page",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true,
    "tracerouteStats": {
      "availabilityPct": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "hopsCount": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "packetLossPct": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "roundTripTimeMs": {
        "slots": [
          {
            "timestamp": "2023-07-16 15:00:00+00",
            "value": 0
          }
        ],
        "avg": 0,
        "max": 0,
        "min": 0
      },
      "uniqueDevicesTotal": 57
    },
    "tracerouteStatsByColo": [
      {
        "availabilityPct": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "colo": "DFW",
        "hopsCount": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "packetLossPct": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "roundTripTimeMs": {
          "slots": [
            {
              "timestamp": "2023-07-16 15:00:00+00",
              "value": 0
            }
          ],
          "avg": 0,
          "max": 0,
          "min": 0
        },
        "uniqueDevicesTotal": 57
      }
    ]
  }
}
```

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

## Get network path breakdown for a traceroute test

**get** `/accounts/{account_id}/dex/traceroute-tests/{test_id}/network-path`

Get a breakdown of metrics by hop for individual traceroute test runs.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_id: string`

  API Resource UUID tag.

### Query Parameters

- `deviceId: string`

  Device to filter traceroute result runs to.

- `from: string`

  Start time for aggregate metrics in ISO ms.

- `interval: "minute" or "hour"`

  Time interval for aggregate time slots.

  - `"minute"`

  - `"hour"`

- `to: string`

  End time for aggregate metrics in ISO ms.

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

- `result: optional NetworkPathResponse`

  - `id: string`

    API Resource UUID tag.

  - `deviceName: optional string`

    Name of the device that ran the test.

  - `interval: optional string`

    The interval at which the Traceroute synthetic application test is set to run.

  - `kind: optional "traceroute"`

    - `"traceroute"`

  - `name: optional string`

  - `networkPath: optional NetworkPath`

    - `slots: array of object { id, clientToAppRttMs, clientToCfEgressRttMs, 3 more }`

      - `id: string`

        API Resource UUID tag.

      - `clientToAppRttMs: number`

        Round trip time in ms of the client to app mile

      - `clientToCfEgressRttMs: number`

        Round trip time in ms of the client to Cloudflare egress mile

      - `clientToCfIngressRttMs: number`

        Round trip time in ms of the client to Cloudflare ingress mile

      - `timestamp: string`

      - `clientToIspRttMs: optional number`

        Round trip time in ms of the client to ISP mile

    - `sampling: optional object { unit, value }`

      Specifies the sampling applied, if any, to the slots response. When sampled, results shown represent the first test run to the start of each sampling interval.

      - `unit: "hours"`

        - `"hours"`

      - `value: number`

  - `url: optional string`

    The host of the Traceroute synthetic application test.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-tests/$TEST_ID/network-path \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "deviceName": "deviceName",
    "interval": "0h5m0s",
    "kind": "traceroute",
    "name": "name",
    "networkPath": {
      "slots": [
        {
          "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
          "clientToAppRttMs": 0,
          "clientToCfEgressRttMs": 0,
          "clientToCfIngressRttMs": 0,
          "timestamp": "2023-07-16 15:00:00+00",
          "clientToIspRttMs": 0
        }
      ],
      "sampling": {
        "unit": "hours",
        "value": 0
      }
    },
    "url": "1.1.1.1"
  }
}
```

## Domain Types

### Traceroute

- `Traceroute object { host, interval, kind, 5 more }`

  - `host: string`

    The host of the Traceroute synthetic application test.

  - `interval: string`

    The interval at which the Traceroute synthetic application test is set to run.

  - `kind: "traceroute"`

    - `"traceroute"`

  - `name: string`

    The name of the Traceroute synthetic application test.

  - `target_policies: optional array of DigitalExperienceMonitor`

    - `id: string`

      API Resource UUID tag.

    - `default: boolean`

      Whether the policy is the default for the account.

    - `name: string`

  - `targeted: optional boolean`

  - `tracerouteStats: optional object { availabilityPct, hopsCount, packetLossPct, 2 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `hopsCount: TestStatOverTime`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `tracerouteStatsByColo: optional array of object { availabilityPct, colo, hopsCount, 3 more }`

    - `availabilityPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `colo: string`

    - `hopsCount: TestStatOverTime`

    - `packetLossPct: object { slots, avg, max, min }`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `roundTripTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

### Traceroute Test Percentiles Response

- `TracerouteTestPercentilesResponse object { hopsCount, packetLossPct, roundTripTimeMs }`

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
