# Monitors

## List Monitors

**get** `/accounts/{account_id}/load_balancers/monitors`

List configured monitors for an account.

### Path Parameters

- `account_id: string`

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

- `result: array of Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results on the current page.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    Total number of pages available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors \
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
  "result": [
    {
      "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
      "allow_insecure": true,
      "consecutive_down": 0,
      "consecutive_up": 0,
      "created_on": "2014-01-01T05:20:00.12345Z",
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
      "interval": 0,
      "method": "GET",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "path": "/health",
      "port": 0,
      "probe_zone": "example.com",
      "retries": 0,
      "timeout": 0,
      "type": "https"
    }
  ],
  "success": true,
  "result_info": {
    "count": 20,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Monitor Details

**get** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

List a single configured monitor for an account.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Create Monitor

**post** `/accounts/{account_id}/load_balancers/monitors`

Create a configured monitor.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Update Monitor

**put** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

Modify a configured monitor.

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
    -X PUT \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Patch Monitor

**patch** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

Apply changes to an existing monitor, overwriting the supplied properties.

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

- `result: Monitor`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
    -X PATCH \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc",
    "allow_insecure": true,
    "consecutive_down": 0,
    "consecutive_up": 0,
    "created_on": "2014-01-01T05:20:00.12345Z",
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
    "interval": 0,
    "method": "GET",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "path": "/health",
    "port": 0,
    "probe_zone": "example.com",
    "retries": 0,
    "timeout": 0,
    "type": "https"
  },
  "success": true
}
```

## Delete Monitor

**delete** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}`

Delete a configured monitor.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

- `result: object { id }`

  - `id: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID \
    -X DELETE \
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
    "id": "f1aba936b94213e5b8dca0c0dbf1f9cc"
  },
  "success": true
}
```

## Domain Types

### Monitor

- `Monitor object { id, allow_insecure, consecutive_down, 16 more }`

  - `id: optional string`

  - `allow_insecure: optional boolean`

    Do not validate the certificate when monitor use HTTPS. This parameter is currently only valid for HTTP and HTTPS monitors.

  - `consecutive_down: optional number`

    To be marked unhealthy the monitored origin must fail this healthcheck N consecutive times.

  - `consecutive_up: optional number`

    To be marked healthy the monitored origin must pass this healthcheck N consecutive times.

  - `created_on: optional string`

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

  - `modified_on: optional string`

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

### Monitor Delete Response

- `MonitorDeleteResponse object { id }`

  - `id: optional string`

# Previews

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

## Domain Types

### Preview Create Response

- `PreviewCreateResponse object { pools, preview_id }`

  - `pools: optional map[string]`

    Monitored pool IDs mapped to their respective names.

  - `preview_id: optional string`

# References

## List Monitor References

**get** `/accounts/{account_id}/load_balancers/monitors/{monitor_id}/references`

Get the list of resources that reference the provided monitor.

### Path Parameters

- `account_id: string`

  Identifier.

- `monitor_id: string`

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

- `result: array of object { reference_type, resource_id, resource_name, resource_type }`

  List of resources that reference a given monitor.

  - `reference_type: optional "*" or "referral" or "referrer"`

    - `"*"`

    - `"referral"`

    - `"referrer"`

  - `resource_id: optional string`

  - `resource_name: optional string`

  - `resource_type: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/load_balancers/monitors/$MONITOR_ID/references \
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
  "result": [
    {
      "reference_type": "referrer",
      "resource_id": "17b5962d775c646f3f9725cbc7a53df4",
      "resource_name": "primary-dc-1",
      "resource_type": "pool"
    }
  ],
  "success": true
}
```

## Domain Types

### Reference Get Response

- `ReferenceGetResponse object { reference_type, resource_id, resource_name, resource_type }`

  - `reference_type: optional "*" or "referral" or "referrer"`

    - `"*"`

    - `"referral"`

    - `"referrer"`

  - `resource_id: optional string`

  - `resource_name: optional string`

  - `resource_type: optional string`
