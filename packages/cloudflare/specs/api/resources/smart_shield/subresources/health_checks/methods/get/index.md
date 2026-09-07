## Health Check Details

**get** `/zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}`

Fetch a single configured health check.

### Path Parameters

- `zone_id: string`

  Identifier.

- `healthcheck_id: string`

  Identifier.

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

- `result: object { id, address, check_regions, 15 more }`

  - `id: optional string`

    Identifier.

  - `address: optional string`

    The hostname or IP address of the origin server to run health checks on.

  - `check_regions: optional array of "WNAM" or "ENAM" or "WEU" or 11 more`

    A list of regions from which to run health checks. Null means Cloudflare will pick a default region.

    - `"WNAM"`

    - `"ENAM"`

    - `"WEU"`

    - `"EEU"`

    - `"NSAM"`

    - `"SSAM"`

    - `"OC"`

    - `"ME"`

    - `"NAF"`

    - `"SAF"`

    - `"IN"`

    - `"SEAS"`

    - `"NEAS"`

    - `"ALL_REGIONS"`

  - `consecutive_fails: optional number`

    The number of consecutive fails required from a health check before changing the health to unhealthy.

  - `consecutive_successes: optional number`

    The number of consecutive successes required from a health check before changing the health to healthy.

  - `created_on: optional string`

  - `description: optional string`

    A human-readable description of the health check.

  - `failure_reason: optional string`

    The current failure reason if status is unhealthy.

  - `http_config: optional object { allow_insecure, expected_body, expected_codes, 5 more }`

    Parameters specific to an HTTP or HTTPS health check.

    - `allow_insecure: optional boolean`

      Do not validate the certificate when the health check uses HTTPS.

    - `expected_body: optional string`

      A case-insensitive sub-string to look for in the response body. If this string is not found, the origin will be marked as unhealthy.

    - `expected_codes: optional array of string`

      The expected HTTP response codes (e.g. "200") or code ranges (e.g. "2xx" for all codes starting with 2) of the health check.

    - `follow_redirects: optional boolean`

      Follow redirects if the origin returns a 3xx status code.

    - `header: optional map[array of string]`

      The HTTP request headers to send in the health check. It is recommended you set a Host header by default. The User-Agent header cannot be overridden.

    - `method: optional "GET" or "HEAD"`

      The HTTP method to use for the health check.

      - `"GET"`

      - `"HEAD"`

    - `path: optional string`

      The endpoint path to health check against.

    - `port: optional number`

      Port number to connect to for the health check. Defaults to 80 if type is HTTP or 443 if type is HTTPS.

  - `interval: optional number`

    The interval between each health check. Shorter intervals may give quicker notifications if the origin status changes, but will increase load on the origin as we check from multiple locations.

  - `modified_on: optional string`

  - `name: optional string`

    A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.

  - `retries: optional number`

    The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

  - `status: optional "unknown" or "healthy" or "unhealthy" or "suspended"`

    The current status of the origin server according to the health check.

    - `"unknown"`

    - `"healthy"`

    - `"unhealthy"`

    - `"suspended"`

  - `suspended: optional boolean`

    If suspended, no health checks are sent to the origin.

  - `tcp_config: optional object { method, port }`

    Parameters specific to TCP health check.

    - `method: optional "connection_established"`

      The TCP connection method to use for the health check.

      - `"connection_established"`

    - `port: optional number`

      Port number to connect to for the health check. Defaults to 80.

  - `timeout: optional number`

    The timeout (in seconds) before marking the health check as failed.

  - `type: optional string`

    The protocol to use for the health check. Currently supported protocols are 'HTTP', 'HTTPS' and 'TCP'.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield/healthchecks/$HEALTHCHECK_ID \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "address": "www.example.com",
    "check_regions": [
      "WEU",
      "ENAM"
    ],
    "consecutive_fails": 0,
    "consecutive_successes": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
    "description": "Health check for www.example.com",
    "failure_reason": "",
    "http_config": {
      "allow_insecure": true,
      "expected_body": "success",
      "expected_codes": [
        "2xx",
        "302"
      ],
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
      "port": 0
    },
    "interval": 0,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "server-1",
    "retries": 0,
    "status": "healthy",
    "suspended": true,
    "tcp_config": {
      "method": "connection_established",
      "port": 0
    },
    "timeout": 0,
    "type": "HTTPS"
  },
  "success": true
}
```
