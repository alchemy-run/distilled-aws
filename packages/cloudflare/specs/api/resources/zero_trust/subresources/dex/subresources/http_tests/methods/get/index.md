## Get details and aggregate metrics for an http test

**get** `/accounts/{account_id}/dex/http-tests/{test_id}`

Get test details and aggregate performance metrics for an http test for a given time period between 1 hour and 7 days.

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

- `result: optional HTTPDetails`

  - `host: optional string`

    The url of the HTTP synthetic application test.

  - `httpStats: optional object { availabilityPct, dnsResponseTimeMs, httpStatusCode, 3 more }`

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

    - `dnsResponseTimeMs: TestStatOverTime`

      - `slots: array of object { timestamp, value }`

        - `timestamp: string`

        - `value: number`

      - `avg: optional number`

        average observed in the time period.

      - `max: optional number`

        highest observed in the time period.

      - `min: optional number`

        lowest observed in the time period.

    - `httpStatusCode: array of object { status200, status300, status400, 2 more }`

      - `status200: number`

      - `status300: number`

      - `status400: number`

      - `status500: number`

      - `timestamp: string`

    - `resourceFetchTimeMs: TestStatOverTime`

    - `serverResponseTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `httpStatsByColo: optional array of object { availabilityPct, colo, dnsResponseTimeMs, 4 more }`

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

    - `dnsResponseTimeMs: TestStatOverTime`

    - `httpStatusCode: array of object { status200, status300, status400, 2 more }`

      - `status200: number`

      - `status300: number`

      - `status400: number`

      - `status500: number`

      - `timestamp: string`

    - `resourceFetchTimeMs: TestStatOverTime`

    - `serverResponseTimeMs: TestStatOverTime`

    - `uniqueDevicesTotal: number`

      Count of unique devices that have run this test in the given time period.

  - `interval: optional string`

    The interval at which the HTTP synthetic application test is set to run.

  - `kind: optional "http"`

    - `"http"`

  - `method: optional string`

    The HTTP method to use when running the test.

  - `name: optional string`

    The name of the HTTP synthetic application test.

  - `target_policies: optional array of DigitalExperienceMonitor`

    - `id: string`

      API Resource UUID tag.

    - `default: boolean`

      Whether the policy is the default for the account.

    - `name: string`

  - `targeted: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/http-tests/$TEST_ID \
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
    "host": "http://example.com",
    "httpStats": {
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
      "dnsResponseTimeMs": {
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
      "httpStatusCode": [
        {
          "status200": 0,
          "status300": 0,
          "status400": 0,
          "status500": 0,
          "timestamp": "2023-07-16 15:00:00+00"
        }
      ],
      "resourceFetchTimeMs": {
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
      "serverResponseTimeMs": {
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
    "httpStatsByColo": [
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
        "dnsResponseTimeMs": {
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
        "httpStatusCode": [
          {
            "status200": 0,
            "status300": 0,
            "status400": 0,
            "status500": 0,
            "timestamp": "2023-07-16 15:00:00+00"
          }
        ],
        "resourceFetchTimeMs": {
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
        "serverResponseTimeMs": {
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
    ],
    "interval": "0h5m0s",
    "kind": "http",
    "method": "GET",
    "name": "Atlassian Sign In Page",
    "target_policies": [
      {
        "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "default": true,
        "name": "name"
      }
    ],
    "targeted": true
  }
}
```
