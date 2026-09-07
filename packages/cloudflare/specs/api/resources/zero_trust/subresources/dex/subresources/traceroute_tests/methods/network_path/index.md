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
