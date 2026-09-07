# Tests

## List DEX test analytics

**get** `/accounts/{account_id}/dex/tests/overview`

List DEX tests with overview metrics.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `colo: optional string`

  Optionally filter result stats to a Cloudflare colo. Cannot be used in combination with deviceId param.

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

- `kind: optional "http" or "traceroute"`

  Filter by test type.

  - `"http"`

  - `"traceroute"`

- `page: optional number`

  Page number of paginated results

- `per_page: optional number`

  Number of items per page

- `registration_id: optional string`

  Optionally filter results to a specific device registration. Must be used in combination with a single deviceId.

- `testName: optional string`

  Optionally filter results by test name.

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

- `result: optional Tests`

  - `overviewMetrics: object { testsTotal, avgHttpAvailabilityPct, avgTracerouteAvailabilityPct }`

    - `testsTotal: number`

      number of tests.

    - `avgHttpAvailabilityPct: optional number`

      percentage availability for all HTTP test results in response.

    - `avgTracerouteAvailabilityPct: optional number`

      percentage availability for all traceroutes results in response.

  - `tests: array of object { id, created, description, 13 more }`

    array of test results objects.

    - `id: string`

      API Resource UUID tag.

    - `created: string`

      date the test was created.

    - `description: string`

      the test description defined during configuration

    - `enabled: boolean`

      if true, then the test will run on targeted devices. Else, the test will not run.

    - `host: string`

    - `interval: string`

      The interval at which the synthetic application test is set to run.

    - `kind: "http" or "traceroute"`

      test type, http or traceroute

      - `"http"`

      - `"traceroute"`

    - `name: string`

      name given to this test

    - `updated: string`

    - `httpResults: optional object { resourceFetchTime }`

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

            - `units: "hours" or "days" or "testRuns"`

              - `"hours"`

              - `"days"`

              - `"testRuns"`

            - `value: number`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `httpResultsByColo: optional array of object { colo, resourceFetchTime }`

      - `colo: string`

        Cloudflare colo

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `method: optional string`

      for HTTP, the method to use when running the test

    - `target_policies: optional array of DigitalExperienceMonitor`

      - `id: string`

        API Resource UUID tag.

      - `default: boolean`

        Whether the policy is the default for the account.

      - `name: string`

    - `targeted: optional boolean`

    - `tracerouteResults: optional object { roundTripTime }`

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `tracerouteResultsByColo: optional array of object { colo, roundTripTime }`

      - `colo: string`

        Cloudflare colo

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/tests/overview \
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
    "overviewMetrics": {
      "testsTotal": 0,
      "avgHttpAvailabilityPct": 0,
      "avgTracerouteAvailabilityPct": 0
    },
    "tests": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "created": "created",
        "description": "description",
        "enabled": true,
        "host": "host",
        "interval": "interval",
        "kind": "http",
        "name": "name",
        "updated": "updated",
        "httpResults": {
          "resourceFetchTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "httpResultsByColo": [
          {
            "colo": "SJC",
            "resourceFetchTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ],
        "method": "method",
        "target_policies": [
          {
            "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
            "default": true,
            "name": "name"
          }
        ],
        "targeted": true,
        "tracerouteResults": {
          "roundTripTime": {
            "history": [
              {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "avgMs": 0,
                "deltaPct": 0
              }
            ],
            "avgMs": 0,
            "overTime": {
              "timePeriod": {
                "units": "hours",
                "value": 0
              },
              "values": [
                {
                  "avgMs": 0,
                  "timestamp": "timestamp"
                }
              ]
            }
          }
        },
        "tracerouteResultsByColo": [
          {
            "colo": "SJC",
            "roundTripTime": {
              "history": [
                {
                  "timePeriod": {
                    "units": "hours",
                    "value": 0
                  },
                  "avgMs": 0,
                  "deltaPct": 0
                }
              ],
              "avgMs": 0,
              "overTime": {
                "timePeriod": {
                  "units": "hours",
                  "value": 0
                },
                "values": [
                  {
                    "avgMs": 0,
                    "timestamp": "timestamp"
                  }
                ]
              }
            }
          }
        ]
      }
    ]
  }
}
```

## Domain Types

### Aggregate Time Period

- `AggregateTimePeriod object { units, value }`

  - `units: "hours" or "days" or "testRuns"`

    - `"hours"`

    - `"days"`

    - `"testRuns"`

  - `value: number`

### Tests

- `Tests object { overviewMetrics, tests }`

  - `overviewMetrics: object { testsTotal, avgHttpAvailabilityPct, avgTracerouteAvailabilityPct }`

    - `testsTotal: number`

      number of tests.

    - `avgHttpAvailabilityPct: optional number`

      percentage availability for all HTTP test results in response.

    - `avgTracerouteAvailabilityPct: optional number`

      percentage availability for all traceroutes results in response.

  - `tests: array of object { id, created, description, 13 more }`

    array of test results objects.

    - `id: string`

      API Resource UUID tag.

    - `created: string`

      date the test was created.

    - `description: string`

      the test description defined during configuration

    - `enabled: boolean`

      if true, then the test will run on targeted devices. Else, the test will not run.

    - `host: string`

    - `interval: string`

      The interval at which the synthetic application test is set to run.

    - `kind: "http" or "traceroute"`

      test type, http or traceroute

      - `"http"`

      - `"traceroute"`

    - `name: string`

      name given to this test

    - `updated: string`

    - `httpResults: optional object { resourceFetchTime }`

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

            - `units: "hours" or "days" or "testRuns"`

              - `"hours"`

              - `"days"`

              - `"testRuns"`

            - `value: number`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `httpResultsByColo: optional array of object { colo, resourceFetchTime }`

      - `colo: string`

        Cloudflare colo

      - `resourceFetchTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `method: optional string`

      for HTTP, the method to use when running the test

    - `target_policies: optional array of DigitalExperienceMonitor`

      - `id: string`

        API Resource UUID tag.

      - `default: boolean`

        Whether the policy is the default for the account.

      - `name: string`

    - `targeted: optional boolean`

    - `tracerouteResults: optional object { roundTripTime }`

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

    - `tracerouteResultsByColo: optional array of object { colo, roundTripTime }`

      - `colo: string`

        Cloudflare colo

      - `roundTripTime: object { history, avgMs, overTime }`

        - `history: array of object { timePeriod, avgMs, deltaPct }`

          - `timePeriod: AggregateTimePeriod`

          - `avgMs: optional number`

          - `deltaPct: optional number`

        - `avgMs: optional number`

        - `overTime: optional object { timePeriod, values }`

          - `timePeriod: AggregateTimePeriod`

          - `values: array of object { avgMs, timestamp }`

            - `avgMs: number`

            - `timestamp: string`

# Unique Devices

## Get count of devices targeted

**get** `/accounts/{account_id}/dex/tests/unique-devices`

Returns unique count of devices that have run synthetic application monitoring tests in the past 7 days.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `deviceId: optional array of string`

  Optionally filter result stats to a specific device(s). Cannot be used in combination with colo param.

- `testName: optional string`

  Optionally filter results by test name.

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

- `result: optional UniqueDevices`

  - `uniqueDevicesTotal: number`

    total number of unique devices

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/tests/unique-devices \
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
    "uniqueDevicesTotal": 0
  }
}
```

## Domain Types

### Unique Devices

- `UniqueDevices object { uniqueDevicesTotal }`

  - `uniqueDevicesTotal: number`

    total number of unique devices
