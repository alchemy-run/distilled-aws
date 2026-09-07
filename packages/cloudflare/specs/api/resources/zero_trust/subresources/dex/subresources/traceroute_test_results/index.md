# Traceroute Test Results

# Network Path

## Get details for a specific traceroute test run

**get** `/accounts/{account_id}/dex/traceroute-test-results/{test_result_id}/network-path`

Get a breakdown of hops and performance metrics for a specific traceroute test run

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `test_result_id: string`

  API Resource UUID tag.

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

- `result: optional object { hops, resultId, colo, 6 more }`

  - `hops: array of object { ttl, asn, aso, 6 more }`

    An array of the hops taken by the device to reach the end destination.

    - `ttl: number`

    - `asn: optional number`

    - `aso: optional string`

    - `ipAddress: optional string`

    - `location: optional object { city, state, zip }`

      - `city: optional string`

      - `state: optional string`

      - `zip: optional string`

    - `mile: optional "client-to-app" or "client-to-cf-egress" or "client-to-cf-ingress" or "client-to-isp"`

      - `"client-to-app"`

      - `"client-to-cf-egress"`

      - `"client-to-cf-ingress"`

      - `"client-to-isp"`

    - `name: optional string`

    - `packetLossPct: optional number`

    - `rttMs: optional number`

  - `resultId: string`

    API Resource UUID tag.

  - `colo: optional string`

    Cloudflare colo airport code.

  - `deviceName: optional string`

    Name of the device associated with this network path response.

  - `execution_context: optional "EXECUTION_CONTEXT_INVALID" or "OUT_OF_TUNNEL" or "IN_TUNNEL"`

    Whether the test was run inside or outside of the WARP tunnel.

    - `"EXECUTION_CONTEXT_INVALID"`

    - `"OUT_OF_TUNNEL"`

    - `"IN_TUNNEL"`

  - `testId: optional string`

    API Resource UUID tag.

  - `testName: optional string`

    Name of the traceroute test.

  - `time_start: optional string`

    Timestamp indicating when the traceroute test execution began.

  - `tunnel_type: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/traceroute-test-results/$TEST_RESULT_ID/network-path \
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
    "hops": [
      {
        "ttl": 0,
        "asn": 0,
        "aso": "aso",
        "ipAddress": "ipAddress",
        "location": {
          "city": "city",
          "state": "state",
          "zip": "zip"
        },
        "mile": "client-to-app",
        "name": "name",
        "packetLossPct": 0,
        "rttMs": 0
      }
    ],
    "resultId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "colo": "SJC",
    "deviceName": "deviceName",
    "execution_context": "EXECUTION_CONTEXT_INVALID",
    "testId": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "testName": "testName",
    "time_start": "2023-07-16 15:00:00+00",
    "tunnel_type": "tunnel_type"
  }
}
```

## Domain Types

### Network Path Get Response

- `NetworkPathGetResponse object { hops, resultId, colo, 6 more }`

  - `hops: array of object { ttl, asn, aso, 6 more }`

    An array of the hops taken by the device to reach the end destination.

    - `ttl: number`

    - `asn: optional number`

    - `aso: optional string`

    - `ipAddress: optional string`

    - `location: optional object { city, state, zip }`

      - `city: optional string`

      - `state: optional string`

      - `zip: optional string`

    - `mile: optional "client-to-app" or "client-to-cf-egress" or "client-to-cf-ingress" or "client-to-isp"`

      - `"client-to-app"`

      - `"client-to-cf-egress"`

      - `"client-to-cf-ingress"`

      - `"client-to-isp"`

    - `name: optional string`

    - `packetLossPct: optional number`

    - `rttMs: optional number`

  - `resultId: string`

    API Resource UUID tag.

  - `colo: optional string`

    Cloudflare colo airport code.

  - `deviceName: optional string`

    Name of the device associated with this network path response.

  - `execution_context: optional "EXECUTION_CONTEXT_INVALID" or "OUT_OF_TUNNEL" or "IN_TUNNEL"`

    Whether the test was run inside or outside of the WARP tunnel.

    - `"EXECUTION_CONTEXT_INVALID"`

    - `"OUT_OF_TUNNEL"`

    - `"IN_TUNNEL"`

  - `testId: optional string`

    API Resource UUID tag.

  - `testName: optional string`

    Name of the traceroute test.

  - `time_start: optional string`

    Timestamp indicating when the traceroute test execution began.

  - `tunnel_type: optional string`
