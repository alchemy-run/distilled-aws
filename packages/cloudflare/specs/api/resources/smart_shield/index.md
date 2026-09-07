# Smart Shield

## Get Smart Shield Settings

**get** `/zones/{zone_id}/smart_shield`

Retrieve Smart Shield Settings.

### Path Parameters

- `zone_id: string`

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

- `result: object { cache_reserve, healthchecks_count, regional_tiered_cache, 2 more }`

  A consolidated object containing settings from multiple APIs for partial updates.

  - `cache_reserve: object { id, editable, value }`

    - `id: optional string`

      The id of the Cache Reserve setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Cache Reserve.

      - `"on"`

      - `"off"`

  - `healthchecks_count: number`

    The total number of health checks associated with the zone.

  - `regional_tiered_cache: object { id, editable, value }`

    - `id: optional string`

      The id of the Regional Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Cache Reserve.

      - `"on"`

      - `"off"`

  - `smart_routing: object { id, editable, value }`

    - `id: optional string`

      The id of the Smart Routing setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Argo Smart Routing.

      - `"on"`

      - `"off"`

  - `smart_tiered_cache: object { id, editable, modified_on, value }`

    - `id: optional string`

      The id of the Smart Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `modified_on: optional string`

      The last time the setting was modified.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Tiered Cache.

      - `"on"`

      - `"off"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield \
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
    "cache_reserve": {
      "id": "cache_reserve",
      "editable": true,
      "value": "off"
    },
    "healthchecks_count": 5,
    "regional_tiered_cache": {
      "id": "regional_tiered_cache",
      "editable": true,
      "value": "off"
    },
    "smart_routing": {
      "id": "smart_routing",
      "editable": true,
      "value": "off"
    },
    "smart_tiered_cache": {
      "id": "smart_tiered_cache",
      "editable": true,
      "modified_on": "2025-09-10T22:53:22.946098Z",
      "value": "on"
    }
  },
  "success": true
}
```

## Patch Smart Shield Settings

**patch** `/zones/{zone_id}/smart_shield`

Set Smart Shield Settings.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `cache_reserve: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Cache Reserve.

    - `"on"`

    - `"off"`

- `regional_tiered_cache: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Regional Tiered Cache.

    - `"on"`

    - `"off"`

- `smart_routing: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Smart Routing.

    - `"on"`

    - `"off"`

- `smart_tiered_cache: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Smart Tiered Cache.

    - `"on"`

    - `"off"`

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

- `result: object { smart_tiered_cache }`

  A consolidated object containing settings from multiple APIs for partial updates.

  - `smart_tiered_cache: object { id, editable, modified_on, value }`

    - `id: optional string`

      The id of the Smart Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `modified_on: optional string`

      The last time the setting was modified.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Tiered Cache.

      - `"on"`

      - `"off"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "smart_tiered_cache": {
      "id": "smart_tiered_cache",
      "editable": true,
      "modified_on": "2025-09-10T22:53:22.946098Z",
      "value": "on"
    }
  },
  "success": true
}
```

## Domain Types

### Smart Shield Get Response

- `SmartShieldGetResponse object { cache_reserve, healthchecks_count, regional_tiered_cache, 2 more }`

  A consolidated object containing settings from multiple APIs for partial updates.

  - `cache_reserve: object { id, editable, value }`

    - `id: optional string`

      The id of the Cache Reserve setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Cache Reserve.

      - `"on"`

      - `"off"`

  - `healthchecks_count: number`

    The total number of health checks associated with the zone.

  - `regional_tiered_cache: object { id, editable, value }`

    - `id: optional string`

      The id of the Regional Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Cache Reserve.

      - `"on"`

      - `"off"`

  - `smart_routing: object { id, editable, value }`

    - `id: optional string`

      The id of the Smart Routing setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Argo Smart Routing.

      - `"on"`

      - `"off"`

  - `smart_tiered_cache: object { id, editable, modified_on, value }`

    - `id: optional string`

      The id of the Smart Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `modified_on: optional string`

      The last time the setting was modified.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Tiered Cache.

      - `"on"`

      - `"off"`

### Smart Shield Update Response

- `SmartShieldUpdateResponse object { smart_tiered_cache }`

  A consolidated object containing settings from multiple APIs for partial updates.

  - `smart_tiered_cache: object { id, editable, modified_on, value }`

    - `id: optional string`

      The id of the Smart Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `modified_on: optional string`

      The last time the setting was modified.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Tiered Cache.

      - `"on"`

      - `"off"`

# Health Checks

## List Health Checks

**get** `/zones/{zone_id}/smart_shield/healthchecks`

List configured health checks.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page. Must be a multiple of 5.

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

- `result: array of object { id, address, check_regions, 15 more }`

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

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield/healthchecks \
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
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

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

## Create Health Check

**post** `/zones/{zone_id}/smart_shield/healthchecks`

Create a new health check.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `address: string`

  The hostname or IP address of the origin server to run health checks on.

- `name: string`

  A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.

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

- `description: optional string`

  A human-readable description of the health check.

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

- `retries: optional number`

  The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield/healthchecks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "address": "www.example.com",
          "name": "server-1",
          "check_regions": [
            "WEU",
            "ENAM"
          ],
          "description": "Health check for www.example.com",
          "type": "HTTPS"
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

## Update Health Check

**put** `/zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}`

Update a configured health check.

### Path Parameters

- `zone_id: string`

  Identifier.

- `healthcheck_id: string`

  Identifier.

### Body Parameters

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
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "errors": [
            {
              "code": 1000,
              "message": "message"
            }
          ],
          "messages": [
            {
              "code": 1000,
              "message": "message"
            }
          ],
          "result": {},
          "success": true
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

## Patch Health Check

**patch** `/zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}`

Patch a configured health check.

### Path Parameters

- `zone_id: string`

  Identifier.

- `healthcheck_id: string`

  Identifier.

### Body Parameters

- `address: string`

  The hostname or IP address of the origin server to run health checks on.

- `name: string`

  A short name to identify the health check. Only alphanumeric characters, hyphens and underscores are allowed.

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

- `description: optional string`

  A human-readable description of the health check.

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

- `retries: optional number`

  The number of retries to attempt in case of a timeout before marking the origin as unhealthy. Retries are attempted immediately.

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
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "address": "www.example.com",
          "name": "server-1",
          "check_regions": [
            "WEU",
            "ENAM"
          ],
          "description": "Health check for www.example.com",
          "type": "HTTPS"
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

## Delete Health Check

**delete** `/zones/{zone_id}/smart_shield/healthchecks/{healthcheck_id}`

Delete a health check.

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

- `result: object { id }`

  - `id: optional string`

    Identifier.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield/healthchecks/$HEALTHCHECK_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Domain Types

### Health Check List Response

- `HealthCheckListResponse object { id, address, check_regions, 15 more }`

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

### Health Check Get Response

- `HealthCheckGetResponse object { id, address, check_regions, 15 more }`

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

### Health Check Create Response

- `HealthCheckCreateResponse object { id, address, check_regions, 15 more }`

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

### Health Check Update Response

- `HealthCheckUpdateResponse object { id, address, check_regions, 15 more }`

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

### Health Check Edit Response

- `HealthCheckEditResponse object { id, address, check_regions, 15 more }`

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

### Health Check Delete Response

- `HealthCheckDeleteResponse object { id }`

  - `id: optional string`

    Identifier.

# Cache Reserve Clear

## Get Cache Reserve Clear

**get** `/zones/{zone_id}/smart_shield/cache_reserve_clear`

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

### Path Parameters

- `zone_id: string`

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

- `result: object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: "In-progress" or "Completed"`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield/cache_reserve_clear \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "end_ts": "2023-10-02T12:00:00.12345Z",
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "Completed"
  },
  "success": true
}
```

## Start Cache Reserve Clear

**post** `/zones/{zone_id}/smart_shield/cache_reserve_clear`

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: unknown`

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

- `result: object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: "In-progress" or "Completed"`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield/cache_reserve_clear \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "In-progress"
  },
  "success": true
}
```

## Domain Types

### Cache Reserve Clear Status Response

- `CacheReserveClearStatusResponse object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: "In-progress" or "Completed"`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.

### Cache Reserve Clear Clear Response

- `CacheReserveClearClearResponse object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: "In-progress" or "Completed"`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.
