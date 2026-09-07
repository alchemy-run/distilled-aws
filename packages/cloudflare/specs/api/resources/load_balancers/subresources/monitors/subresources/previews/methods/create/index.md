## Preview Monitor

**post** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}/preview`

Preview pools using the specified monitor with provided monitor details. The returned preview_id can be used in the preview endpoint to retrieve the results.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

### Body Parameters

- `allow_insecure: optional boolean`

  Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

- `consecutive_down: optional number`

  To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

- `consecutive_up: optional number`

  To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

- `description: optional string`

  Object description.

- `expected_body: optional string`

  A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy. This parameter is only valid for HTTP and HTTPS monitors.

- `expected_codes: optional string`

  The expected HTTP response code or code range of the health check. This parameter is only valid for HTTP and HTTPS monitors.

- `follow_redirects: optional boolean`

  Follow redirects if returned by the origin. This parameter is only valid for HTTP and HTTPS monitors.

- `header: optional map[array of string]`

  The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden. This parameter is only valid for HTTP and HTTPS monitors.

- `interval: optional number`

  The interval between each health check. Shorter intervals may improve failover time, but will increase load on the origins as we check from multiple locations.

- `method: optional string`

  The method to use for the health check. This defaults to 'GET' for HTTP/HTTPS based checks and 'connection_established' for TCP based health checks.

- `path: optional string`

  The endpoint path you want to conduct a health check against. This parameter is only valid for HTTP and HTTPS monitors.

- `port: optional number`

  The port number to connect to for the health check. Required for TCP, UDP, and SMTP checks. HTTP and HTTPS checks should only define the port when using a non-standard port (HTTP: default 80, HTTPS: default 443).

- `probe_zone: optional string`

  Assign this monitor to emulate the specified zone while probing. This parameter is only valid for HTTP and HTTPS monitors.

- `retries: optional number`

  The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

- `timeout: optional number`

  The timeout (in seconds) before marking the health check as failed.

- `type: optional "http" or "https" or "tcp" or 3 more`

  The protocol to use for the health check. Currently supported protocols are 'HTTP','HTTPS', 'TCP', 'ICMP-PING', 'UDP-ICMP', and 'SMTP'.

  - `"http"`

  - `"https"`

  - `"tcp"`

  - `"udp_icmp"`

  - `"icmp_ping"`

  - `"smtp"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { pools, preview_id }`

  - `pools: optional map[string]`

    Monitored pool IDs mapped to their respective names.

  - `preview_id: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allow_insecure": true,
          "description": "Login page monitor",
          "expected_body": "alive",
          "expected_codes": "2xx",
          "follow_redirects": true,
          "header": {
            "Host": [
              "example.com"
            ],
            "X-App-ID": [
              "abc123"
            ]
          },
          "method": "GET",
          "path": "/health",
          "probe_zone": "example.com",
          "type": "https"
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
  "result": {
    "pools": {
      "abwlnp5jbqn45ecgxd03erbgtxtqai0d": "WNAM Datacenter",
      "ve8h9lrcip5n5bbga9yqmdws28ay5d0l": "EEU Datacenter"
    },
    "preview_id": "f1aba936b94213e5b8dca0c0dbf1f9cc"
  },
  "success": true
}
```
