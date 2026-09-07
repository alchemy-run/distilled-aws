# Cloudforce One

# Scans

# Results

## Get the Latest Scan Result

**get** `/accounts/{account_id}/cloudforce-one/scans/results/{config_id}`

Get the Latest Scan Result

### Path Parameters

- `account_id: string`

  Defines the Account ID.

- `config_id: string`

  Defines the Config ID.

### Returns

- `errors: array of string`

- `messages: array of string`

- `result: object { "1.1.1.1" }`

  - `"1.1.1.1": array of ScanResult`

    - `number: optional number`

    - `proto: optional string`

    - `status: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/results/$CONFIG_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    "string"
  ],
  "messages": [
    "string"
  ],
  "result": {
    "1.1.1.1": [
      {
        "number": 8080,
        "proto": "tcp",
        "status": "open"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Scan Result

- `ScanResult object { number, proto, status }`

  - `number: optional number`

  - `proto: optional string`

  - `status: optional string`

### Result Get Response

- `ResultGetResponse object { "1.1.1.1" }`

  - `"1.1.1.1": array of ScanResult`

    - `number: optional number`

    - `proto: optional string`

    - `status: optional string`

# Config

## List Scan Configs

**get** `/accounts/{account_id}/cloudforce-one/scans/config`

List Scan Configs

### Path Parameters

- `account_id: string`

  Defines the Account ID.

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

- `result: optional array of object { id, account_id, frequency, 2 more }`

  - `id: string`

    Defines the Config ID.

  - `account_id: string`

  - `frequency: number`

    Defines the number of days between each scan (0 = One-off scan).

  - `ips: array of string`

    Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

  - `ports: array of string`

    Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/config \
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
      "id": "uuid",
      "account_id": "abcd1234abcd1234abcd1234abcd1234",
      "frequency": 7,
      "ips": [
        "1.1.1.1",
        "2606:4700:4700::1111"
      ],
      "ports": [
        "default"
      ]
    }
  ]
}
```

## Create a new Scan Config

**post** `/accounts/{account_id}/cloudforce-one/scans/config`

Create a new Scan Config

### Path Parameters

- `account_id: string`

  Defines the Account ID.

### Body Parameters

- `ips: array of string`

  Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

- `frequency: optional number`

  Defines the number of days between each scan (0 = One-off scan).

- `ports: optional array of string`

  Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

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

- `result: optional object { id, account_id, frequency, 2 more }`

  - `id: string`

    Defines the Config ID.

  - `account_id: string`

  - `frequency: number`

    Defines the number of days between each scan (0 = One-off scan).

  - `ips: array of string`

    Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

  - `ports: array of string`

    Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/config \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ips": [
            "1.1.1.1",
            "2606:4700:4700::1111"
          ],
          "frequency": 7,
          "ports": [
            "default"
          ]
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
  "success": true,
  "result": {
    "id": "uuid",
    "account_id": "abcd1234abcd1234abcd1234abcd1234",
    "frequency": 7,
    "ips": [
      "1.1.1.1",
      "2606:4700:4700::1111"
    ],
    "ports": [
      "default"
    ]
  }
}
```

## Update an existing Scan Config

**patch** `/accounts/{account_id}/cloudforce-one/scans/config/{config_id}`

Update an existing Scan Config

### Path Parameters

- `account_id: string`

  Defines the Account ID.

- `config_id: string`

  Defines the Config ID.

### Body Parameters

- `frequency: optional number`

  Defines the number of days between each scan (0 = One-off scan).

- `ips: optional array of string`

  Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

- `ports: optional array of string`

  Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

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

- `result: optional object { id, account_id, frequency, 2 more }`

  - `id: string`

    Defines the Config ID.

  - `account_id: string`

  - `frequency: number`

    Defines the number of days between each scan (0 = One-off scan).

  - `ips: array of string`

    Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

  - `ports: array of string`

    Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/config/$CONFIG_ID \
    -X PATCH \
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
    "id": "uuid",
    "account_id": "abcd1234abcd1234abcd1234abcd1234",
    "frequency": 7,
    "ips": [
      "1.1.1.1",
      "2606:4700:4700::1111"
    ],
    "ports": [
      "default"
    ]
  }
}
```

## Delete a Scan Config

**delete** `/accounts/{account_id}/cloudforce-one/scans/config/{config_id}`

Delete a Scan Config

### Path Parameters

- `account_id: string`

  Defines the Account ID.

- `config_id: string`

  Defines the Config ID.

### Returns

- `errors: array of string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/config/$CONFIG_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    "string"
  ],
  "messages": [
    "string"
  ],
  "result": {},
  "success": true
}
```

## Domain Types

### Config List Response

- `ConfigListResponse object { id, account_id, frequency, 2 more }`

  - `id: string`

    Defines the Config ID.

  - `account_id: string`

  - `frequency: number`

    Defines the number of days between each scan (0 = One-off scan).

  - `ips: array of string`

    Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

  - `ports: array of string`

    Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

### Config Create Response

- `ConfigCreateResponse object { id, account_id, frequency, 2 more }`

  - `id: string`

    Defines the Config ID.

  - `account_id: string`

  - `frequency: number`

    Defines the number of days between each scan (0 = One-off scan).

  - `ips: array of string`

    Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

  - `ports: array of string`

    Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

### Config Edit Response

- `ConfigEditResponse object { id, account_id, frequency, 2 more }`

  - `id: string`

    Defines the Config ID.

  - `account_id: string`

  - `frequency: number`

    Defines the number of days between each scan (0 = One-off scan).

  - `ips: array of string`

    Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

  - `ports: array of string`

    Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

### Config Delete Response

- `ConfigDeleteResponse = unknown`

# Binary Storage

## Retrieves a file from Binary Storage

**get** `/accounts/{account_id}/cloudforce-one/binary/{hash}`

Retrieves a binary file from the Cloudforce One binary storage for analysis.

### Path Parameters

- `account_id: string`

  Account ID.

- `hash: string`

  hash of the binary

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/binary/$HASH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Posts a file to Binary Storage

**post** `/accounts/{account_id}/cloudforce-one/binary`

Uploads a binary file to Cloudforce One's binary database for malware analysis and threat intelligence correlation.

### Path Parameters

- `account_id: string`

  Account ID.

### Returns

- `content_type: string`

- `md5: string`

- `sha1: string`

- `sha256: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/binary \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file'
```

#### Response

```json
{
  "content_type": "text/plain",
  "md5": "5d84ade76d2a8387c81175bb0cbe6492",
  "sha1": "9aff6879626d957eafadda044e4f879aae1e7278",
  "sha256": "0000a7f2692ef479e2e3d02661568882cadec451cc8a64d4e7faca29810cd626"
}
```

## Domain Types

### Binary Storage Create Response

- `BinaryStorageCreateResponse object { content_type, md5, sha1, sha256 }`

  - `content_type: string`

  - `md5: string`

  - `sha1: string`

  - `sha256: string`

# Requests

## List Requests

**post** `/accounts/{account_id}/cloudforce-one/requests`

Lists Cloudforce One intelligence requests with filtering and pagination.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `page: number`

  Page number of results.

- `per_page: number`

  Number of results per page.

- `completed_after: optional string`

  Retrieve requests completed after this time.

- `completed_before: optional string`

  Retrieve requests completed before this time.

- `created_after: optional string`

  Retrieve requests created after this time.

- `created_before: optional string`

  Retrieve requests created before this time.

- `request_type: optional string`

  Requested information from request.

- `sort_by: optional string`

  Field to sort results by.

- `sort_order: optional "asc" or "desc"`

  Sort order (asc or desc).

  - `"asc"`

  - `"desc"`

- `status: optional "open" or "accepted" or "reported" or 3 more`

  Request Status.

  - `"open"`

  - `"accepted"`

  - `"reported"`

  - `"approved"`

  - `"completed"`

  - `"declined"`

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

- `result: optional array of ListItem`

  - `id: string`

    UUID.

  - `created: string`

    Request creation time.

  - `priority: "routine" or "high" or "urgent"`

    - `"routine"`

    - `"high"`

    - `"urgent"`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

    Request last updated time.

  - `completed: optional string`

    Request completion time.

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10,
          "completed_after": "2022-01-01T00:00:00Z",
          "completed_before": "2024-01-01T00:00:00Z",
          "created_after": "2022-01-01T00:00:00Z",
          "created_before": "2024-01-01T00:00:00Z",
          "request_type": "Victomology",
          "sort_by": "created"
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
  "success": true,
  "result": [
    {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created": "2022-04-01T00:00:00Z",
      "priority": "routine",
      "request": "Victomology",
      "summary": "DoS attack",
      "tlp": "clear",
      "updated": "2022-04-01T00:00:00Z",
      "completed": "2024-01-01T00:00:00Z",
      "message_tokens": 16,
      "readable_id": "RFI-2022-000001",
      "status": "open",
      "tokens": 0
    }
  ]
}
```

## Get a Request

**get** `/accounts/{account_id}/cloudforce-one/requests/{request_id}`

Retrieves details for a specific Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

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

- `result: optional Item`

  - `id: string`

    UUID.

  - `content: string`

    Request content.

  - `created: string`

  - `priority: string`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

  - `completed: optional string`

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "content": "What regions were most effected by the recent DoS?",
    "created": "2022-04-01T05:20:00Z",
    "priority": "2022-04-01T05:20:00Z",
    "request": "Victomology",
    "summary": "DoS attack",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z",
    "completed": "2022-04-01T05:20:00Z",
    "message_tokens": 1,
    "readable_id": "RFI-2022-000001",
    "status": "open",
    "tokens": 16
  }
}
```

## Create a New Request.

**post** `/accounts/{account_id}/cloudforce-one/requests/new`

Creating a request adds the request into the Cloudforce One queue for analysis. In addition to the content, a short title, type, priority, and releasability should be provided. If one is not provided, a default will be assigned.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `content: optional string`

  Request content.

- `priority: optional string`

  Priority for analyzing the request.

- `request_type: optional string`

  Requested information from request.

- `summary: optional string`

  Brief description of the request.

- `tlp: optional "clear" or "amber" or "amber-strict" or 2 more`

  The CISA defined Traffic Light Protocol (TLP).

  - `"clear"`

  - `"amber"`

  - `"amber-strict"`

  - `"green"`

  - `"red"`

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

- `result: optional Item`

  - `id: string`

    UUID.

  - `content: string`

    Request content.

  - `created: string`

  - `priority: string`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

  - `completed: optional string`

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/new \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "content": "What regions were most effected by the recent DoS?",
          "priority": "routine",
          "request_type": "Victomology",
          "summary": "DoS attack"
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "content": "What regions were most effected by the recent DoS?",
    "created": "2022-04-01T05:20:00Z",
    "priority": "2022-04-01T05:20:00Z",
    "request": "Victomology",
    "summary": "DoS attack",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z",
    "completed": "2022-04-01T05:20:00Z",
    "message_tokens": 1,
    "readable_id": "RFI-2022-000001",
    "status": "open",
    "tokens": 16
  }
}
```

## Update a Request

**put** `/accounts/{account_id}/cloudforce-one/requests/{request_id}`

Updating a request alters the request in the Cloudforce One queue. This API may be used to update any attributes of the request after the initial submission. Only fields that you choose to update need to be add to the request body.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

### Body Parameters

- `content: optional string`

  Request content.

- `priority: optional string`

  Priority for analyzing the request.

- `request_type: optional string`

  Requested information from request.

- `summary: optional string`

  Brief description of the request.

- `tlp: optional "clear" or "amber" or "amber-strict" or 2 more`

  The CISA defined Traffic Light Protocol (TLP).

  - `"clear"`

  - `"amber"`

  - `"amber-strict"`

  - `"green"`

  - `"red"`

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

- `result: optional Item`

  - `id: string`

    UUID.

  - `content: string`

    Request content.

  - `created: string`

  - `priority: string`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

  - `completed: optional string`

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "content": "What regions were most effected by the recent DoS?",
          "priority": "routine",
          "request_type": "Victomology",
          "summary": "DoS attack"
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "content": "What regions were most effected by the recent DoS?",
    "created": "2022-04-01T05:20:00Z",
    "priority": "2022-04-01T05:20:00Z",
    "request": "Victomology",
    "summary": "DoS attack",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z",
    "completed": "2022-04-01T05:20:00Z",
    "message_tokens": 1,
    "readable_id": "RFI-2022-000001",
    "status": "open",
    "tokens": 16
  }
}
```

## Delete a Request

**delete** `/accounts/{account_id}/cloudforce-one/requests/{request_id}`

Deletes a Cloudforce One intelligence request and all associated data.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true
}
```

## Get Request Quota

**get** `/accounts/{account_id}/cloudforce-one/requests/quota`

Retrieves quota usage for Cloudforce One standard requests.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional Quota`

  - `anniversary_date: optional string`

    Anniversary date is when annual quota limit is refreshed.

  - `quarter_anniversary_date: optional string`

    Quarter anniversary date is when quota limit is refreshed each quarter.

  - `quota: optional number`

    Tokens for the quarter.

  - `remaining: optional number`

    Tokens remaining for the quarter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/quota \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "anniversary_date": "2022-04-01T00:00:00Z",
    "quarter_anniversary_date": "2022-04-01T00:00:00Z",
    "quota": 120,
    "remaining": 64
  }
}
```

## Get Request Types

**get** `/accounts/{account_id}/cloudforce-one/requests/types`

Lists available request types for Cloudforce One intelligence requests.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional RequestTypes`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/types \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "Indicators of Compromise",
    "Victomology"
  ]
}
```

## Get Request Priority, Status, and TLP constants

**get** `/accounts/{account_id}/cloudforce-one/requests/constants`

Retrieves constant values used in Cloudforce One requests, including valid statuses and types.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional RequestConstants`

  - `priority: optional array of "routine" or "high" or "urgent"`

    - `"routine"`

    - `"high"`

    - `"urgent"`

  - `status: optional array of "open" or "accepted" or "reported" or 3 more`

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tlp: optional array of "clear" or "amber" or "amber-strict" or 2 more`

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/constants \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "priority": [
      "routine",
      "high",
      "urgent"
    ],
    "status": [
      "open",
      "accepted",
      "reported",
      "approved",
      "completed",
      "declined"
    ],
    "tlp": [
      "clear",
      "green",
      "amber",
      "amber-strict",
      "red"
    ]
  }
}
```

## Domain Types

### Item

- `Item object { id, content, created, 10 more }`

  - `id: string`

    UUID.

  - `content: string`

    Request content.

  - `created: string`

  - `priority: string`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

  - `completed: optional string`

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### List Item

- `ListItem object { id, created, priority, 9 more }`

  - `id: string`

    UUID.

  - `created: string`

    Request creation time.

  - `priority: "routine" or "high" or "urgent"`

    - `"routine"`

    - `"high"`

    - `"urgent"`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

    Request last updated time.

  - `completed: optional string`

    Request completion time.

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### Quota

- `Quota object { anniversary_date, quarter_anniversary_date, quota, remaining }`

  - `anniversary_date: optional string`

    Anniversary date is when annual quota limit is refreshed.

  - `quarter_anniversary_date: optional string`

    Quarter anniversary date is when quota limit is refreshed each quarter.

  - `quota: optional number`

    Tokens for the quarter.

  - `remaining: optional number`

    Tokens remaining for the quarter.

### Request Constants

- `RequestConstants object { priority, status, tlp }`

  - `priority: optional array of "routine" or "high" or "urgent"`

    - `"routine"`

    - `"high"`

    - `"urgent"`

  - `status: optional array of "open" or "accepted" or "reported" or 3 more`

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tlp: optional array of "clear" or "amber" or "amber-strict" or 2 more`

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

### Request Types

- `RequestTypes = array of string`

### Request Delete Response

- `RequestDeleteResponse object { errors, messages, success }`

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

### Request Types Response

- `RequestTypesResponse = string`

  Request Types.

# Message

## List Request Messages

**post** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/message`

Lists messages in a Cloudforce One intelligence request conversation.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

### Body Parameters

- `page: number`

  Page number of results.

- `per_page: number`

  Number of results per page.

- `after: optional string`

  Retrieve mes  ges created after this time.

- `before: optional string`

  Retrieve messages created before this time.

- `sort_by: optional string`

  Field to sort results by.

- `sort_order: optional "asc" or "desc"`

  Sort order (asc or desc).

  - `"asc"`

  - `"desc"`

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

- `result: optional array of Message`

  - `id: number`

    Message ID.

  - `author: string`

    Author of message.

  - `content: string`

    Content of message.

  - `is_follow_on_request: boolean`

    Whether the message is a follow-on request.

  - `updated: string`

    Defines the message last updated time.

  - `created: optional string`

    Defines the message creation time.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/message \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10,
          "before": "2024-01-01T00:00:00Z",
          "sort_by": "created"
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
  "success": true,
  "result": [
    {
      "id": 0,
      "author": "user@domain.com",
      "content": "Can you elaborate on the type of DoS that occurred?",
      "is_follow_on_request": true,
      "updated": "2022-01-01T00:00:00Z",
      "created": "2022-01-01T00:00:00Z"
    }
  ]
}
```

## Create a New Request Message

**post** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/message/new`

Adds a message to a Cloudforce One intelligence request conversation.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

### Body Parameters

- `content: optional string`

  Content of message.

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

- `result: optional Message`

  - `id: number`

    Message ID.

  - `author: string`

    Author of message.

  - `content: string`

    Content of message.

  - `is_follow_on_request: boolean`

    Whether the message is a follow-on request.

  - `updated: string`

    Defines the message last updated time.

  - `created: optional string`

    Defines the message creation time.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/message/new \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "content": "Can you elaborate on the type of DoS that occurred?"
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
  "success": true,
  "result": {
    "id": 0,
    "author": "user@domain.com",
    "content": "Can you elaborate on the type of DoS that occurred?",
    "is_follow_on_request": true,
    "updated": "2022-01-01T00:00:00Z",
    "created": "2022-01-01T00:00:00Z"
  }
}
```

## Update a Request Message

**put** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/message/{message_id}`

Updates a message in a Cloudforce One intelligence request thread.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `message_id: number`

### Body Parameters

- `content: optional string`

  Content of message.

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

- `result: optional Message`

  - `id: number`

    Message ID.

  - `author: string`

    Author of message.

  - `content: string`

    Content of message.

  - `is_follow_on_request: boolean`

    Whether the message is a follow-on request.

  - `updated: string`

    Defines the message last updated time.

  - `created: optional string`

    Defines the message creation time.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/message/$MESSAGE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "content": "Can you elaborate on the type of DoS that occurred?"
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
  "success": true,
  "result": {
    "id": 0,
    "author": "user@domain.com",
    "content": "Can you elaborate on the type of DoS that occurred?",
    "is_follow_on_request": true,
    "updated": "2022-01-01T00:00:00Z",
    "created": "2022-01-01T00:00:00Z"
  }
}
```

## Delete a Request Message

**delete** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/message/{message_id}`

Removes a message from a Cloudforce One intelligence request thread.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `message_id: number`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/message/$MESSAGE_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true
}
```

## Domain Types

### Message

- `Message object { id, author, content, 3 more }`

  - `id: number`

    Message ID.

  - `author: string`

    Author of message.

  - `content: string`

    Content of message.

  - `is_follow_on_request: boolean`

    Whether the message is a follow-on request.

  - `updated: string`

    Defines the message last updated time.

  - `created: optional string`

    Defines the message creation time.

### Message Delete Response

- `MessageDeleteResponse object { errors, messages, success }`

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

# Priority

## Get a Priority Intelligence Requirement

**get** `/accounts/{account_id}/cloudforce-one/requests/priority/{priority_id}`

Retrieves a specific priority intelligence request from Cloudforce One.

### Path Parameters

- `account_id: string`

  Identifier.

- `priority_id: string`

  UUID.

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

- `result: optional Item`

  - `id: string`

    UUID.

  - `content: string`

    Request content.

  - `created: string`

  - `priority: string`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

  - `completed: optional string`

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/priority/$PRIORITY_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "content": "What regions were most effected by the recent DoS?",
    "created": "2022-04-01T05:20:00Z",
    "priority": "2022-04-01T05:20:00Z",
    "request": "Victomology",
    "summary": "DoS attack",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z",
    "completed": "2022-04-01T05:20:00Z",
    "message_tokens": 1,
    "readable_id": "RFI-2022-000001",
    "status": "open",
    "tokens": 16
  }
}
```

## Create a New Priority Intelligence Requirement

**post** `/accounts/{account_id}/cloudforce-one/requests/priority/new`

Creates a new priority intelligence request in Cloudforce One.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `labels: array of Label`

  List of labels.

- `priority: number`

  Priority.

- `requirement: string`

  Requirement.

- `tlp: "clear" or "amber" or "amber-strict" or 2 more`

  The CISA defined Traffic Light Protocol (TLP).

  - `"clear"`

  - `"amber"`

  - `"amber-strict"`

  - `"green"`

  - `"red"`

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

- `result: optional Priority`

  - `id: string`

    UUID.

  - `created: string`

    Priority creation time.

  - `labels: array of Label`

    List of labels.

  - `priority: number`

    Priority.

  - `requirement: string`

    Requirement.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

    Priority last updated time.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/priority/new \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "labels": [
            "DoS",
            "CVE"
          ],
          "priority": 1,
          "requirement": "DoS attacks carried out by CVEs",
          "tlp": "clear"
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created": "2022-04-01T05:20:00Z",
    "labels": [
      "DoS",
      "CVE"
    ],
    "priority": 1,
    "requirement": "DoS attacks carried out by CVEs",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z"
  }
}
```

## Update a Priority Intelligence Requirement

**put** `/accounts/{account_id}/cloudforce-one/requests/priority/{priority_id}`

Updates a priority intelligence request in Cloudforce One.

### Path Parameters

- `account_id: string`

  Identifier.

- `priority_id: string`

  UUID.

### Body Parameters

- `labels: array of Label`

  List of labels.

- `priority: number`

  Priority.

- `requirement: string`

  Requirement.

- `tlp: "clear" or "amber" or "amber-strict" or 2 more`

  The CISA defined Traffic Light Protocol (TLP).

  - `"clear"`

  - `"amber"`

  - `"amber-strict"`

  - `"green"`

  - `"red"`

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

- `result: optional Item`

  - `id: string`

    UUID.

  - `content: string`

    Request content.

  - `created: string`

  - `priority: string`

  - `request: string`

    Requested information from request.

  - `summary: string`

    Brief description of the request.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

  - `completed: optional string`

  - `message_tokens: optional number`

    Tokens for the request messages.

  - `readable_id: optional string`

    Readable Request ID.

  - `status: optional "open" or "accepted" or "reported" or 3 more`

    Request Status.

    - `"open"`

    - `"accepted"`

    - `"reported"`

    - `"approved"`

    - `"completed"`

    - `"declined"`

  - `tokens: optional number`

    Tokens for the request.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/priority/$PRIORITY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "labels": [
            "DoS",
            "CVE"
          ],
          "priority": 1,
          "requirement": "DoS attacks carried out by CVEs",
          "tlp": "clear"
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "content": "What regions were most effected by the recent DoS?",
    "created": "2022-04-01T05:20:00Z",
    "priority": "2022-04-01T05:20:00Z",
    "request": "Victomology",
    "summary": "DoS attack",
    "tlp": "clear",
    "updated": "2022-04-01T05:20:00Z",
    "completed": "2022-04-01T05:20:00Z",
    "message_tokens": 1,
    "readable_id": "RFI-2022-000001",
    "status": "open",
    "tokens": 16
  }
}
```

## Delete a Priority Intelligence Requirement

**delete** `/accounts/{account_id}/cloudforce-one/requests/priority/{priority_id}`

Deletes a priority intelligence request from Cloudforce One.

### Path Parameters

- `account_id: string`

  Identifier.

- `priority_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/priority/$PRIORITY_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true
}
```

## Get Priority Intelligence Requirement Quota

**get** `/accounts/{account_id}/cloudforce-one/requests/priority/quota`

Retrieves quota usage for Cloudforce One priority requests.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional Quota`

  - `anniversary_date: optional string`

    Anniversary date is when annual quota limit is refreshed.

  - `quarter_anniversary_date: optional string`

    Quarter anniversary date is when quota limit is refreshed each quarter.

  - `quota: optional number`

    Tokens for the quarter.

  - `remaining: optional number`

    Tokens remaining for the quarter.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/priority/quota \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "anniversary_date": "2022-04-01T00:00:00Z",
    "quarter_anniversary_date": "2022-04-01T00:00:00Z",
    "quota": 120,
    "remaining": 64
  }
}
```

## Domain Types

### Label

- `Label = string`

### Priority

- `Priority object { id, created, labels, 4 more }`

  - `id: string`

    UUID.

  - `created: string`

    Priority creation time.

  - `labels: array of Label`

    List of labels.

  - `priority: number`

    Priority.

  - `requirement: string`

    Requirement.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

  - `updated: string`

    Priority last updated time.

### Priority Edit

- `PriorityEdit object { labels, priority, requirement, tlp }`

  - `labels: array of Label`

    List of labels.

  - `priority: number`

    Priority.

  - `requirement: string`

    Requirement.

  - `tlp: "clear" or "amber" or "amber-strict" or 2 more`

    The CISA defined Traffic Light Protocol (TLP).

    - `"clear"`

    - `"amber"`

    - `"amber-strict"`

    - `"green"`

    - `"red"`

### Priority Delete Response

- `PriorityDeleteResponse object { errors, messages, success }`

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

# Assets

## Get a Request Asset

**get** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}`

Retrieves an asset attached to a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `asset_id: string`

  UUID.

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

- `result: optional array of object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset/$ASSET_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
      "id": 0,
      "name": "example.docx",
      "created": "2022-01-01T00:00:00Z",
      "description": "example description",
      "file_type": "docx"
    }
  ]
}
```

## List Request Assets

**post** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset`

Lists assets attached to a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

### Body Parameters

- `page: number`

  Page number of results.

- `per_page: number`

  Number of results per page.

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

- `result: optional array of object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "page": 0,
          "per_page": 10
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
  "success": true,
  "result": [
    {
      "id": 0,
      "name": "example.docx",
      "created": "2022-01-01T00:00:00Z",
      "description": "example description",
      "file_type": "docx"
    }
  ]
}
```

## Update a Request Asset

**put** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}`

Updates an asset in a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `asset_id: string`

  UUID.

### Body Parameters

- `source: optional string`

  Asset file to upload.

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

- `result: optional object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset/$ASSET_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "source": "@/Users/me/example.docx"
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
  "success": true,
  "result": {
    "id": 0,
    "name": "example.docx",
    "created": "2022-01-01T00:00:00Z",
    "description": "example description",
    "file_type": "docx"
  }
}
```

## Delete a Request Asset

**delete** `/accounts/{account_id}/cloudforce-one/requests/{request_id}/asset/{asset_id}`

Removes an asset from a Cloudforce One intelligence request.

### Path Parameters

- `account_id: string`

  Identifier.

- `request_id: string`

  UUID.

- `asset_id: string`

  UUID.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/requests/$REQUEST_ID/asset/$ASSET_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true
}
```

## Domain Types

### Asset Get Response

- `AssetGetResponse object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Asset Create Response

- `AssetCreateResponse object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Asset Update Response

- `AssetUpdateResponse object { id, name, created, 2 more }`

  - `id: number`

    Asset ID.

  - `name: string`

    Asset name.

  - `created: optional string`

    Defines the asset creation time.

  - `description: optional string`

    Asset description.

  - `file_type: optional string`

    Asset file type.

### Asset Delete Response

- `AssetDeleteResponse object { errors, messages, success }`

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

# Threat Events

## Filter and list events

**get** `/accounts/{account_id}/cloudforce-one/events`

Use `datasetId=all` or `datasetId=*` to query all event datasets for the account (limited to 10). When `datasetId` is unspecified, events are listed from the default Cloudforce One Threat Events dataset. To list existing datasets, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cursor: optional string`

  Cursor for pagination. When provided, filters are embedded in the cursor so you only need to pass cursor and pageSize. Returned in the previous response's result_info.cursor field. Use cursor-based pagination for deep pagination (beyond 100,000 records) or for optimal performance.

- `datasetId: optional array of string`

  Dataset IDs to query events from (array of UUIDs), or special value 'all' or '*' to query all event datasets for the account. If not provided, uses the default dataset.

- `forceRefresh: optional boolean`

- `format: optional "json" or "stix2" or "taxii"`

  - `"json"`

  - `"stix2"`

  - `"taxii"`

- `order: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `orderBy: optional string`

- `page: optional number`

  Page number (1-indexed) for offset-based pagination. Limited to offset of 100,000 records. For deep pagination, use cursor-based pagination instead.

- `pageSize: optional number`

  Number of results per page. Maximum 25,000.

- `search: optional array of object { field, op, value }`

  - `field: optional string`

    Event field to search on. Allowed: attacker, attackerCountry, category, createdAt, date, event, indicator, indicatorType, killChain, mitreAttack, tags, targetCountry, targetIndustry, tlp, uuid.

  - `op: optional "equals" or "not" or "gt" or 9 more`

    Search operator. Use 'in' for bulk lookup of up to 100 values at once, e.g. {field:'tags', op:'in', value:['malware','apt']}.

    - `"equals"`

    - `"not"`

    - `"gt"`

    - `"gte"`

    - `"lt"`

    - `"lte"`

    - `"like"`

    - `"contains"`

    - `"startsWith"`

    - `"endsWith"`

    - `"in"`

    - `"find"`

  - `value: optional string or number or array of string or number`

    Search value. String or number for most operators. Array for 'in' operator (max 100 items).

    - `string`

    - `number`

    - `array of string or number`

      - `string`

      - `number`

- `source: optional "do" or "r2catalog"`

  Read backend. 'do' (default) reads Durable Object storage. 'r2catalog' reads R2 Data Catalog (admin-only, experimental; supports a subset of search fields — no 'tags').

  - `"do"`

  - `"r2catalog"`

### Returns

- `attacker: string`

- `attackerCountry: string`

- `attackerCountryAlpha3: string`

- `category: string`

- `datasetId: string`

- `date: string`

- `event: string`

- `hasChildren: boolean`

- `indicator: string`

- `indicatorType: string`

- `indicatorTypeId: number`

- `killChain: number`

- `mitreAttack: array of string`

- `mitreCapec: array of string`

- `numReferenced: number`

- `numReferences: number`

- `rawId: string`

- `referenced: array of string`

- `referencedIds: array of number`

- `references: array of string`

- `referencesIds: array of number`

- `tags: array of string`

- `targetCountry: string`

- `targetCountryAlpha3: string`

- `targetIndustry: string`

- `tlp: string`

- `uuid: string`

- `insight: optional string`

- `releasabilityId: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "attacker": "Flying Yeti",
    "attackerCountry": "CN",
    "attackerCountryAlpha3": "CHN",
    "category": "Domain Resolution",
    "datasetId": "dataset-example-id",
    "date": "2022-04-01T00:00:00Z",
    "event": "An attacker registered the domain domain.com",
    "hasChildren": true,
    "indicator": "domain.com",
    "indicatorType": "domain",
    "indicatorTypeId": 5,
    "killChain": 0,
    "mitreAttack": [
      " "
    ],
    "mitreCapec": [
      " "
    ],
    "numReferenced": 0,
    "numReferences": 0,
    "rawId": "453gw34w3",
    "referenced": [
      " "
    ],
    "referencedIds": [
      0
    ],
    "references": [
      " "
    ],
    "referencesIds": [
      0
    ],
    "tags": [
      "malware"
    ],
    "targetCountry": "US",
    "targetCountryAlpha3": "USA",
    "targetIndustry": "Agriculture",
    "tlp": "amber",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "insight": "insight",
    "releasabilityId": "releasabilityId"
  }
]
```

## Reads an event

**get** `/accounts/{account_id}/cloudforce-one/events/{event_id}`

This Method is deprecated. Please use /events/dataset/:dataset_id/events/:event_id instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Returns

- `attacker: string`

- `attackerCountry: string`

- `attackerCountryAlpha3: string`

- `category: string`

- `datasetId: string`

- `date: string`

- `event: string`

- `hasChildren: boolean`

- `indicator: string`

- `indicatorType: string`

- `indicatorTypeId: number`

- `killChain: number`

- `mitreAttack: array of string`

- `mitreCapec: array of string`

- `numReferenced: number`

- `numReferences: number`

- `rawId: string`

- `referenced: array of string`

- `referencedIds: array of number`

- `references: array of string`

- `referencesIds: array of number`

- `tags: array of string`

- `targetCountry: string`

- `targetCountryAlpha3: string`

- `targetIndustry: string`

- `tlp: string`

- `uuid: string`

- `insight: optional string`

- `releasabilityId: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "attacker": "Flying Yeti",
  "attackerCountry": "CN",
  "attackerCountryAlpha3": "CHN",
  "category": "Domain Resolution",
  "datasetId": "dataset-example-id",
  "date": "2022-04-01T00:00:00Z",
  "event": "An attacker registered the domain domain.com",
  "hasChildren": true,
  "indicator": "domain.com",
  "indicatorType": "domain",
  "indicatorTypeId": 5,
  "killChain": 0,
  "mitreAttack": [
    " "
  ],
  "mitreCapec": [
    " "
  ],
  "numReferenced": 0,
  "numReferences": 0,
  "rawId": "453gw34w3",
  "referenced": [
    " "
  ],
  "referencedIds": [
    0
  ],
  "references": [
    " "
  ],
  "referencesIds": [
    0
  ],
  "tags": [
    "malware"
  ],
  "targetCountry": "US",
  "targetCountryAlpha3": "USA",
  "targetIndustry": "Agriculture",
  "tlp": "amber",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "insight": "insight",
  "releasabilityId": "releasabilityId"
}
```

## Creates a new event

**post** `/accounts/{account_id}/cloudforce-one/events/create`

To create a dataset, see the [`Create Dataset`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/create/) endpoint. When `datasetId` parameter is unspecified, it will be created in a default dataset named `Cloudforce One Threat Events`.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `category: string`

- `date: string`

- `event: string`

- `raw: object { data, source, tlp }`

  - `data: map[unknown]`

  - `source: optional string`

  - `tlp: optional string`

- `tlp: string`

- `accountId: optional number`

- `attacker: optional string`

- `attackerCountry: optional string`

- `datasetId: optional string`

- `indicator: optional string`

- `indicators: optional array of object { indicatorType, value }`

  Array of indicators for this event. Supports multiple indicators per event for complex scenarios.

  - `indicatorType: string`

    The type of indicator (e.g., DOMAIN, IP, JA3, HASH)

  - `value: string`

    The indicator value (e.g., domain name, IP address, hash)

- `indicatorType: optional string`

- `insight: optional string`

- `tags: optional array of string`

- `targetCountry: optional string`

- `targetIndustry: optional string`

### Returns

- `attacker: string`

- `attackerCountry: string`

- `attackerCountryAlpha3: string`

- `category: string`

- `datasetId: string`

- `date: string`

- `event: string`

- `hasChildren: boolean`

- `indicator: string`

- `indicatorType: string`

- `indicatorTypeId: number`

- `killChain: number`

- `mitreAttack: array of string`

- `mitreCapec: array of string`

- `numReferenced: number`

- `numReferences: number`

- `rawId: string`

- `referenced: array of string`

- `referencedIds: array of number`

- `references: array of string`

- `referencesIds: array of number`

- `tags: array of string`

- `targetCountry: string`

- `targetCountryAlpha3: string`

- `targetIndustry: string`

- `tlp: string`

- `uuid: string`

- `insight: optional string`

- `releasabilityId: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "category": "Domain Resolution",
          "date": "2022-04-01T00:00:00Z",
          "event": "An attacker registered the domain domain.com",
          "raw": {
            "data": {
              "foo": "bar"
            }
          },
          "tlp": "amber",
          "accountId": 123456,
          "attacker": "Flying Yeti",
          "attackerCountry": "CN",
          "datasetId": "durableObjectName",
          "indicator": "domain.com",
          "indicatorType": "domain",
          "insight": "This domain was likely registered for phishing purposes",
          "targetCountry": "US",
          "targetIndustry": "Agriculture"
        }'
```

#### Response

```json
{
  "attacker": "Flying Yeti",
  "attackerCountry": "CN",
  "attackerCountryAlpha3": "CHN",
  "category": "Domain Resolution",
  "datasetId": "dataset-example-id",
  "date": "2022-04-01T00:00:00Z",
  "event": "An attacker registered the domain domain.com",
  "hasChildren": true,
  "indicator": "domain.com",
  "indicatorType": "domain",
  "indicatorTypeId": 5,
  "killChain": 0,
  "mitreAttack": [
    " "
  ],
  "mitreCapec": [
    " "
  ],
  "numReferenced": 0,
  "numReferences": 0,
  "rawId": "453gw34w3",
  "referenced": [
    " "
  ],
  "referencedIds": [
    0
  ],
  "references": [
    " "
  ],
  "referencesIds": [
    0
  ],
  "tags": [
    "malware"
  ],
  "targetCountry": "US",
  "targetCountryAlpha3": "USA",
  "targetIndustry": "Agriculture",
  "tlp": "amber",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "insight": "insight",
  "releasabilityId": "releasabilityId"
}
```

## Updates an event

**patch** `/accounts/{account_id}/cloudforce-one/events/{event_id}`

Updates an event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Body Parameters

- `datasetId: string`

  Dataset ID containing the event to update.

- `attacker: optional string`

- `attackerCountry: optional string`

- `category: optional string`

- `createdAt: optional string`

- `date: optional string`

- `event: optional string`

- `indicator: optional string`

- `indicatorType: optional string`

- `insight: optional string`

- `raw: optional object { data, source, tlp }`

  - `data: optional map[unknown]`

  - `source: optional string`

  - `tlp: optional string`

- `targetCountry: optional string`

- `targetIndustry: optional string`

- `tlp: optional string`

### Returns

- `attacker: string`

- `attackerCountry: string`

- `attackerCountryAlpha3: string`

- `category: string`

- `datasetId: string`

- `date: string`

- `event: string`

- `hasChildren: boolean`

- `indicator: string`

- `indicatorType: string`

- `indicatorTypeId: number`

- `killChain: number`

- `mitreAttack: array of string`

- `mitreCapec: array of string`

- `numReferenced: number`

- `numReferences: number`

- `rawId: string`

- `referenced: array of string`

- `referencedIds: array of number`

- `references: array of string`

- `referencesIds: array of number`

- `tags: array of string`

- `targetCountry: string`

- `targetCountryAlpha3: string`

- `targetIndustry: string`

- `tlp: string`

- `uuid: string`

- `insight: optional string`

- `releasabilityId: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "datasetId": "9b769969-a211-466c-8ac3-cb91266a066a",
          "attacker": "Flying Yeti",
          "attackerCountry": "CN",
          "category": "Domain Resolution",
          "createdAt": "2025-12-19T00:00:00Z",
          "date": "2022-04-01T00:00:00Z",
          "event": "An attacker registered the domain domain.com",
          "indicator": "domain2.com",
          "indicatorType": "domain",
          "insight": "new insight",
          "targetCountry": "US",
          "targetIndustry": "Insurance",
          "tlp": "amber"
        }'
```

#### Response

```json
{
  "attacker": "Flying Yeti",
  "attackerCountry": "CN",
  "attackerCountryAlpha3": "CHN",
  "category": "Domain Resolution",
  "datasetId": "dataset-example-id",
  "date": "2022-04-01T00:00:00Z",
  "event": "An attacker registered the domain domain.com",
  "hasChildren": true,
  "indicator": "domain.com",
  "indicatorType": "domain",
  "indicatorTypeId": 5,
  "killChain": 0,
  "mitreAttack": [
    " "
  ],
  "mitreCapec": [
    " "
  ],
  "numReferenced": 0,
  "numReferences": 0,
  "rawId": "453gw34w3",
  "referenced": [
    " "
  ],
  "referencedIds": [
    0
  ],
  "references": [
    " "
  ],
  "referencesIds": [
    0
  ],
  "tags": [
    "malware"
  ],
  "targetCountry": "US",
  "targetCountryAlpha3": "USA",
  "targetIndustry": "Agriculture",
  "tlp": "amber",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "insight": "insight",
  "releasabilityId": "releasabilityId"
}
```

## Creates bulk events

**post** `/accounts/{account_id}/cloudforce-one/events/create/bulk`

The `datasetId` parameter must be defined. To list existing datasets (and their IDs) in your account, use the [`List Datasets`](https://developers.cloudflare.com/api/resources/cloudforce_one/subresources/threat_events/subresources/datasets/methods/list/) endpoint.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `data: array of object { category, date, event, 13 more }`

  - `category: string`

  - `date: string`

  - `event: string`

  - `raw: object { data, source, tlp }`

    - `data: map[unknown]`

    - `source: optional string`

    - `tlp: optional string`

  - `tlp: string`

  - `accountId: optional number`

  - `attacker: optional string`

  - `attackerCountry: optional string`

  - `datasetId: optional string`

  - `indicator: optional string`

  - `indicators: optional array of object { indicatorType, value }`

    Array of indicators for this event. Supports multiple indicators per event for complex scenarios.

    - `indicatorType: string`

      The type of indicator (e.g., DOMAIN, IP, JA3, HASH)

    - `value: string`

      The indicator value (e.g., domain name, IP address, hash)

  - `indicatorType: optional string`

  - `insight: optional string`

  - `tags: optional array of string`

  - `targetCountry: optional string`

  - `targetIndustry: optional string`

- `datasetId: string`

- `includeCreatedEvents: optional boolean`

  When true, response includes array of created event UUIDs and shard IDs. Useful for tracking which events were created and where.

### Returns

- `createdEventsCount: number`

  Number of events created

- `createdTagsCount: number`

  Number of new tags created in SoT

- `errorCount: number`

  Number of errors encountered

- `queuedIndicatorsCount: number`

  Number of indicators queued for async processing

- `createBulkEventsRequestId: optional string`

  Correlation ID for async indicator processing

- `createdEvents: optional array of object { eventIndex, shardId, uuid }`

  Array of created events with UUIDs and shard locations. Only present when includeCreatedEvents=true

  - `eventIndex: number`

    Original index in the input data array

  - `shardId: string`

    Dataset ID of the shard where the event was created

  - `uuid: string`

    UUID of the created event

- `errors: optional array of object { error, eventIndex }`

  Array of error details

  - `error: string`

    Error message

  - `eventIndex: number`

    Index of the event that caused the error

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/create/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "data": [
            {
              "category": "Domain Resolution",
              "date": "2022-04-01T00:00:00Z",
              "event": "An attacker registered the domain domain.com",
              "raw": {
                "data": {
                  "foo": "bar"
                }
              },
              "tlp": "amber"
            }
          ],
          "datasetId": "durableObjectName"
        }'
```

#### Response

```json
{
  "createdEventsCount": 0,
  "createdTagsCount": 0,
  "errorCount": 0,
  "queuedIndicatorsCount": 0,
  "createBulkEventsRequestId": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "createdEvents": [
    {
      "eventIndex": 0,
      "shardId": "shardId",
      "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ],
  "errors": [
    {
      "error": "error",
      "eventIndex": 0
    }
  ]
}
```

## Domain Types

### Threat Event List Response

- `ThreatEventListResponse = array of object { attacker, attackerCountry, attackerCountryAlpha3, 26 more }`

  - `attacker: string`

  - `attackerCountry: string`

  - `attackerCountryAlpha3: string`

  - `category: string`

  - `datasetId: string`

  - `date: string`

  - `event: string`

  - `hasChildren: boolean`

  - `indicator: string`

  - `indicatorType: string`

  - `indicatorTypeId: number`

  - `killChain: number`

  - `mitreAttack: array of string`

  - `mitreCapec: array of string`

  - `numReferenced: number`

  - `numReferences: number`

  - `rawId: string`

  - `referenced: array of string`

  - `referencedIds: array of number`

  - `references: array of string`

  - `referencesIds: array of number`

  - `tags: array of string`

  - `targetCountry: string`

  - `targetCountryAlpha3: string`

  - `targetIndustry: string`

  - `tlp: string`

  - `uuid: string`

  - `insight: optional string`

  - `releasabilityId: optional string`

### Threat Event Get Response

- `ThreatEventGetResponse object { attacker, attackerCountry, attackerCountryAlpha3, 26 more }`

  - `attacker: string`

  - `attackerCountry: string`

  - `attackerCountryAlpha3: string`

  - `category: string`

  - `datasetId: string`

  - `date: string`

  - `event: string`

  - `hasChildren: boolean`

  - `indicator: string`

  - `indicatorType: string`

  - `indicatorTypeId: number`

  - `killChain: number`

  - `mitreAttack: array of string`

  - `mitreCapec: array of string`

  - `numReferenced: number`

  - `numReferences: number`

  - `rawId: string`

  - `referenced: array of string`

  - `referencedIds: array of number`

  - `references: array of string`

  - `referencesIds: array of number`

  - `tags: array of string`

  - `targetCountry: string`

  - `targetCountryAlpha3: string`

  - `targetIndustry: string`

  - `tlp: string`

  - `uuid: string`

  - `insight: optional string`

  - `releasabilityId: optional string`

### Threat Event Create Response

- `ThreatEventCreateResponse object { attacker, attackerCountry, attackerCountryAlpha3, 26 more }`

  - `attacker: string`

  - `attackerCountry: string`

  - `attackerCountryAlpha3: string`

  - `category: string`

  - `datasetId: string`

  - `date: string`

  - `event: string`

  - `hasChildren: boolean`

  - `indicator: string`

  - `indicatorType: string`

  - `indicatorTypeId: number`

  - `killChain: number`

  - `mitreAttack: array of string`

  - `mitreCapec: array of string`

  - `numReferenced: number`

  - `numReferences: number`

  - `rawId: string`

  - `referenced: array of string`

  - `referencedIds: array of number`

  - `references: array of string`

  - `referencesIds: array of number`

  - `tags: array of string`

  - `targetCountry: string`

  - `targetCountryAlpha3: string`

  - `targetIndustry: string`

  - `tlp: string`

  - `uuid: string`

  - `insight: optional string`

  - `releasabilityId: optional string`

### Threat Event Edit Response

- `ThreatEventEditResponse object { attacker, attackerCountry, attackerCountryAlpha3, 26 more }`

  - `attacker: string`

  - `attackerCountry: string`

  - `attackerCountryAlpha3: string`

  - `category: string`

  - `datasetId: string`

  - `date: string`

  - `event: string`

  - `hasChildren: boolean`

  - `indicator: string`

  - `indicatorType: string`

  - `indicatorTypeId: number`

  - `killChain: number`

  - `mitreAttack: array of string`

  - `mitreCapec: array of string`

  - `numReferenced: number`

  - `numReferences: number`

  - `rawId: string`

  - `referenced: array of string`

  - `referencedIds: array of number`

  - `references: array of string`

  - `referencesIds: array of number`

  - `tags: array of string`

  - `targetCountry: string`

  - `targetCountryAlpha3: string`

  - `targetIndustry: string`

  - `tlp: string`

  - `uuid: string`

  - `insight: optional string`

  - `releasabilityId: optional string`

### Threat Event Bulk Create Response

- `ThreatEventBulkCreateResponse object { createdEventsCount, createdTagsCount, errorCount, 4 more }`

  Detailed result of bulk event creation with auto-tag management

  - `createdEventsCount: number`

    Number of events created

  - `createdTagsCount: number`

    Number of new tags created in SoT

  - `errorCount: number`

    Number of errors encountered

  - `queuedIndicatorsCount: number`

    Number of indicators queued for async processing

  - `createBulkEventsRequestId: optional string`

    Correlation ID for async indicator processing

  - `createdEvents: optional array of object { eventIndex, shardId, uuid }`

    Array of created events with UUIDs and shard locations. Only present when includeCreatedEvents=true

    - `eventIndex: number`

      Original index in the input data array

    - `shardId: string`

      Dataset ID of the shard where the event was created

    - `uuid: string`

      UUID of the created event

  - `errors: optional array of object { error, eventIndex }`

    Array of error details

    - `error: string`

      Error message

    - `eventIndex: number`

      Index of the event that caused the error

# Attackers

## Lists attackers across multiple datasets

**get** `/accounts/{account_id}/cloudforce-one/events/attackers`

Lists attackers across multiple datasets

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `datasetIds: optional array of string`

  Array of dataset IDs to query attackers from. If not provided, uses the default dataset.

### Returns

- `items: object { type }`

  - `type: string`

- `type: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/attackers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```

## Domain Types

### Attacker List Response

- `AttackerListResponse object { items, type }`

  - `items: object { type }`

    - `type: string`

  - `type: string`

# Categories

## Lists categories across multiple datasets

**get** `/accounts/{account_id}/cloudforce-one/events/categories`

Lists categories across multiple datasets

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `datasetIds: optional array of string`

  Array of dataset IDs to query categories from. If not provided, uses the default dataset.

### Returns

- `killChain: number`

- `name: string`

- `uuid: string`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `shortname: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "killChain": 0,
    "name": "name",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "mitreAttack": [
      "T1234"
    ],
    "mitreCapec": [
      "123"
    ],
    "shortname": "shortname"
  }
]
```

## Reads a category

**get** `/accounts/{account_id}/cloudforce-one/events/categories/{category_id}`

Reads a category

### Path Parameters

- `account_id: string`

  Account ID.

- `category_id: string`

  Category UUID.

### Returns

- `killChain: number`

- `name: string`

- `uuid: string`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `shortname: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/$CATEGORY_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "killChain": 0,
  "name": "name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "mitreAttack": [
    "T1234"
  ],
  "mitreCapec": [
    "123"
  ],
  "shortname": "shortname"
}
```

## Creates a new category

**post** `/accounts/{account_id}/cloudforce-one/events/categories/create`

Creates a new category

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `killChain: number`

- `name: string`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `shortname: optional string`

### Returns

- `killChain: number`

- `name: string`

- `uuid: string`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `shortname: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "killChain": 0,
          "name": "name",
          "shortname": "shortname"
        }'
```

#### Response

```json
{
  "killChain": 0,
  "name": "name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "mitreAttack": [
    "T1234"
  ],
  "mitreCapec": [
    "123"
  ],
  "shortname": "shortname"
}
```

## Updates a category

**patch** `/accounts/{account_id}/cloudforce-one/events/categories/{category_id}`

Updates a category

### Path Parameters

- `account_id: string`

  Account ID.

- `category_id: string`

  Category UUID.

### Body Parameters

- `killChain: optional number`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `name: optional string`

- `shortname: optional string`

### Returns

- `killChain: number`

- `name: string`

- `uuid: string`

- `mitreAttack: optional array of string`

- `mitreCapec: optional array of string`

- `shortname: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/$CATEGORY_ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "killChain": 0,
  "name": "name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "mitreAttack": [
    "T1234"
  ],
  "mitreCapec": [
    "123"
  ],
  "shortname": "shortname"
}
```

## Deletes a category

**delete** `/accounts/{account_id}/cloudforce-one/events/categories/{category_id}`

Deletes a category

### Path Parameters

- `account_id: string`

  Account ID.

- `category_id: string`

  Category UUID.

### Returns

- `uuid: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/categories/$CATEGORY_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "uuid": "12345678-1234-1234-1234-1234567890ab"
}
```

## Domain Types

### Category List Response

- `CategoryListResponse = array of object { killChain, name, uuid, 3 more }`

  - `killChain: number`

  - `name: string`

  - `uuid: string`

  - `mitreAttack: optional array of string`

  - `mitreCapec: optional array of string`

  - `shortname: optional string`

### Category Get Response

- `CategoryGetResponse object { killChain, name, uuid, 3 more }`

  - `killChain: number`

  - `name: string`

  - `uuid: string`

  - `mitreAttack: optional array of string`

  - `mitreCapec: optional array of string`

  - `shortname: optional string`

### Category Create Response

- `CategoryCreateResponse object { killChain, name, uuid, 3 more }`

  - `killChain: number`

  - `name: string`

  - `uuid: string`

  - `mitreAttack: optional array of string`

  - `mitreCapec: optional array of string`

  - `shortname: optional string`

### Category Edit Response

- `CategoryEditResponse object { killChain, name, uuid, 3 more }`

  - `killChain: number`

  - `name: string`

  - `uuid: string`

  - `mitreAttack: optional array of string`

  - `mitreCapec: optional array of string`

  - `shortname: optional string`

### Category Delete Response

- `CategoryDeleteResponse object { uuid }`

  - `uuid: string`

# Countries

## Retrieves countries information for all countries

**get** `/accounts/{account_id}/cloudforce-one/events/countries`

Retrieves countries information for all countries

### Path Parameters

- `account_id: string`

  Account ID.

### Returns

- `result: array of object { alpha2, alpha3, name }`

  - `alpha2: string`

  - `alpha3: string`

  - `name: string`

- `success: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/countries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "result": [
      {
        "alpha2": "AF",
        "alpha3": "AF",
        "name": "Afghanistan"
      }
    ],
    "success": "true"
  }
]
```

## Domain Types

### Country List Response

- `CountryListResponse = array of object { result, success }`

  - `result: array of object { alpha2, alpha3, name }`

    - `alpha2: string`

    - `alpha3: string`

    - `name: string`

  - `success: string`

# Crons

# Datasets

## Lists all datasets in an account

**get** `/accounts/{account_id}/cloudforce-one/events/dataset`

Lists all datasets in an account

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `includeDeleted: optional boolean`

  When true, include soft-deleted datasets in the response. Each item includes a `deletedAt` field (ISO 8601 or null). Default: false.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "isPublic": true,
    "name": "friendly dataset name",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "deletedAt": "deletedAt"
  }
]
```

## Reads a dataset

**get** `/accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}`

Reads a dataset

### Path Parameters

- `account_id: string`

  Account ID.

- `dataset_id: string`

  Dataset ID.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "deletedAt": "deletedAt"
}
```

## Creates a dataset

**post** `/accounts/{account_id}/cloudforce-one/events/dataset/create`

Creates a dataset

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `isPublic: boolean`

  If true, then anyone can search the dataset. If false, then its limited to the account.

- `name: string`

  Used to describe the dataset within the account context.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "isPublic": true,
          "name": "x"
        }'
```

#### Response

```json
{
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "deletedAt": "deletedAt"
}
```

## Updates an existing dataset

**patch** `/accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}`

Updates an existing dataset

### Path Parameters

- `account_id: string`

  Account ID.

- `dataset_id: string`

  Dataset ID.

### Body Parameters

- `isPublic: boolean`

  If true, then anyone can search the dataset. If false, then its limited to the account.

- `name: string`

  Used to describe the dataset within the account context.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "isPublic": true,
          "name": "x"
        }'
```

#### Response

```json
{
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "deletedAt": "deletedAt"
}
```

## Reads raw data for an event by UUID

**get** `/accounts/{account_id}/cloudforce-one/events/raw/{dataset_id}/{event_id}`

Retrieves the raw data associated with an event. Searches across all shards in the dataset.

### Path Parameters

- `account_id: string`

  Account ID.

- `dataset_id: string`

  Dataset ID.

- `event_id: string`

  Event ID.

### Returns

- `id: number`

- `accountId: number`

- `created: string`

- `data: string`

- `source: string`

- `tlp: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/raw/$DATASET_ID/$EVENT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": 1,
  "accountId": 1234,
  "created": "1970-01-01T00:00:00.000Z",
  "data": "{\"foo\": \"bar\"}",
  "source": "https://example.com",
  "tlp": "amber"
}
```

## Domain Types

### Dataset List Response

- `DatasetListResponse = array of object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Get Response

- `DatasetGetResponse object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Create Response

- `DatasetCreateResponse object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Edit Response

- `DatasetEditResponse object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Raw Response

- `DatasetRawResponse object { id, accountId, created, 3 more }`

  - `id: number`

  - `accountId: number`

  - `created: string`

  - `data: string`

  - `source: string`

  - `tlp: string`

# Health

# Indicator Types

## Lists all indicator types

**get** `/accounts/{account_id}/cloudforce-one/events/indicatorTypes`

This Method is deprecated. Please use /events/dataset/:dataset_id/indicatorTypes instead.

### Path Parameters

- `account_id: string`

  Account ID.

### Returns

- `items: object { type }`

  - `type: string`

- `type: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/indicatorTypes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```

## Domain Types

### Indicator Type List Response

- `IndicatorTypeListResponse object { items, type }`

  - `items: object { type }`

    - `type: string`

  - `type: string`

# Raw

## Reads data for a raw event

**get** `/accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}`

Reads data for a raw event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

- `raw_id: string`

  Raw Event UUID.

### Returns

- `id: string`

- `accountId: number`

- `created: string`

- `data: unknown`

- `source: string`

- `tlp: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID/raw/$RAW_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "1234",
  "accountId": 1234,
  "created": "1970-01-01",
  "data": {},
  "source": "https://example.com",
  "tlp": "amber"
}
```

## Updates a raw event

**patch** `/accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}`

Updates a raw event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

- `raw_id: string`

  Raw Event UUID.

### Body Parameters

- `data: optional unknown`

- `source: optional string`

- `tlp: optional string`

### Returns

- `id: string`

- `data: unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID/raw/$RAW_ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "1234",
  "data": {}
}
```

## Domain Types

### Raw Get Response

- `RawGetResponse object { id, accountId, created, 3 more }`

  - `id: string`

  - `accountId: number`

  - `created: string`

  - `data: unknown`

  - `source: string`

  - `tlp: string`

### Raw Edit Response

- `RawEditResponse object { id, data }`

  - `id: string`

  - `data: unknown`

# Relate

## Removes an event reference

**delete** `/accounts/{account_id}/cloudforce-one/events/relate/{event_id}`

Removes an event reference

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Returns

- `result: object { success }`

  - `success: boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/relate/$EVENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "success": true
  },
  "success": true
}
```

## Domain Types

### Relate Delete Response

- `RelateDeleteResponse object { success }`

  - `success: boolean`

# Tags

## Creates a new tag

**post** `/accounts/{account_id}/cloudforce-one/events/tags/create`

Creates a new tag to be used accross threat events.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `value: string`

- `activeDuration: optional string`

- `actorCategory: optional string`

  Actor variety. Allowed values: Activist, Competitor, Customer, Crime Syndicate, Former Employee, Nation State, Organized Crime, Nation State Affiliated, Terrorist, Unaffiliated.

- `actorCategoryConfidence: optional number`

  Confidence (1-10) in the actor variety (actorCategory). CFONE-only: stripped from responses to non-CFONE accounts.

- `aliases: optional array of object { value, confidence, tlp }`

  Structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: stripped from responses to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `aliasGroupNames: optional array of string`

- `aliasGroupNamesInternal: optional array of string`

- `analyticPriority: optional number`

- `attributionConfidence: optional string`

- `attributionConfidenceScore: optional number`

- `attributionOrganization: optional string`

- `categoryUuid: optional string`

- `dateOfDiscovery: optional string`

  Date the actor was discovered (ISO YYYY-MM-DD).

- `externalReferenceLinks: optional array of string`

- `externalReferences: optional array of object { url, description }`

  Structured external references ({ url, description }). Public: returned to all accounts.

  - `url: string`

  - `description: optional string`

- `internalAliases: optional array of object { value, confidence, tlp }`

  Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `internalDescription: optional string`

- `motive: optional string`

  Actor motive. Allowed values: Convenience, Fear, Fun, Financial, Grudge, Ideology, Espionage.

- `motiveConfidence: optional number`

  Confidence (1-10) in the actor motive. CFONE-only: stripped from responses to non-CFONE accounts.

- `opsecLevel: optional string`

- `originCountryConfidence: optional number`

  Confidence (1-10) in the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

- `originCountryISO: optional string`

- `originCountryTlp: optional "red" or "amber" or "green" or "white"`

  TLP marking for the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

  - `"red"`

  - `"amber"`

  - `"green"`

  - `"white"`

- `priority: optional number`

- `sophisticationLevel: optional string`

### Returns

- `uuid: string`

- `value: string`

- `activeDuration: optional string`

- `actorCategory: optional string`

- `actorCategoryConfidence: optional number`

  Confidence (1-10) in the actor variety (actorCategory). CFONE-only: stripped from responses to non-CFONE accounts.

- `aliases: optional array of object { value, confidence, tlp }`

  Structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: stripped from responses to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `aliasGroupNames: optional array of string`

- `aliasGroupNamesInternal: optional array of string`

- `analyticPriority: optional number`

- `attributionConfidence: optional string`

- `attributionConfidenceScore: optional number`

- `attributionOrganization: optional string`

- `categoryName: optional string`

- `categoryUuid: optional string`

- `dateOfDiscovery: optional string`

- `externalReferenceLinks: optional array of string`

- `externalReferences: optional array of object { url, description }`

  Structured external references ({ url, description }). Public: returned to all accounts.

  - `url: string`

  - `description: optional string`

- `internalAliases: optional array of object { value, confidence, tlp }`

  Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

  - `value: string`

  - `confidence: optional number`

  - `tlp: optional "red" or "amber" or "green" or "white"`

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

- `internalDescription: optional string`

- `motive: optional string`

- `motiveConfidence: optional number`

  Confidence (1-10) in the actor motive. CFONE-only: stripped from responses to non-CFONE accounts.

- `opsecLevel: optional string`

- `originCountryConfidence: optional number`

  Confidence (1-10) in the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

- `originCountryISO: optional string`

- `originCountryISOAlpha3: optional string`

- `originCountryTlp: optional "red" or "amber" or "green" or "white"`

  TLP marking for the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

  - `"red"`

  - `"amber"`

  - `"green"`

  - `"white"`

- `priority: optional number`

- `sophisticationLevel: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/tags/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "APT28",
          "actorCategory": "Nation State",
          "actorCategoryConfidence": 7,
          "attributionConfidenceScore": 7,
          "categoryUuid": "12345678-1234-1234-1234-1234567890ab",
          "dateOfDiscovery": "2024-01-15",
          "motive": "Espionage",
          "motiveConfidence": 7,
          "originCountryConfidence": 7,
          "originCountryTlp": "amber"
        }'
```

#### Response

```json
{
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "value": "APT28",
  "activeDuration": "activeDuration",
  "actorCategory": "actorCategory",
  "actorCategoryConfidence": 7,
  "aliases": [
    {
      "value": "Fancy Bear",
      "confidence": 8,
      "tlp": "amber"
    }
  ],
  "aliasGroupNames": [
    "string"
  ],
  "aliasGroupNamesInternal": [
    "string"
  ],
  "analyticPriority": 0,
  "attributionConfidence": "attributionConfidence",
  "attributionConfidenceScore": 7,
  "attributionOrganization": "attributionOrganization",
  "categoryName": "Nation State",
  "categoryUuid": "12345678-1234-1234-1234-1234567890ab",
  "dateOfDiscovery": "2024-01-15",
  "externalReferenceLinks": [
    "string"
  ],
  "externalReferences": [
    {
      "url": "https://example.com/report",
      "description": "Vendor threat report"
    }
  ],
  "internalAliases": [
    {
      "value": "Fancy Bear",
      "confidence": 8,
      "tlp": "amber"
    }
  ],
  "internalDescription": "internalDescription",
  "motive": "motive",
  "motiveConfidence": 7,
  "opsecLevel": "opsecLevel",
  "originCountryConfidence": 7,
  "originCountryISO": "originCountryISO",
  "originCountryISOAlpha3": "IRN",
  "originCountryTlp": "amber",
  "priority": 0,
  "sophisticationLevel": "sophisticationLevel"
}
```

## Domain Types

### Tag Create Response

- `TagCreateResponse object { uuid, value, activeDuration, 25 more }`

  - `uuid: string`

  - `value: string`

  - `activeDuration: optional string`

  - `actorCategory: optional string`

  - `actorCategoryConfidence: optional number`

    Confidence (1-10) in the actor variety (actorCategory). CFONE-only: stripped from responses to non-CFONE accounts.

  - `aliases: optional array of object { value, confidence, tlp }`

    Structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: stripped from responses to non-CFONE accounts.

    - `value: string`

    - `confidence: optional number`

    - `tlp: optional "red" or "amber" or "green" or "white"`

      - `"red"`

      - `"amber"`

      - `"green"`

      - `"white"`

  - `aliasGroupNames: optional array of string`

  - `aliasGroupNamesInternal: optional array of string`

  - `analyticPriority: optional number`

  - `attributionConfidence: optional string`

  - `attributionConfidenceScore: optional number`

  - `attributionOrganization: optional string`

  - `categoryName: optional string`

  - `categoryUuid: optional string`

  - `dateOfDiscovery: optional string`

  - `externalReferenceLinks: optional array of string`

  - `externalReferences: optional array of object { url, description }`

    Structured external references ({ url, description }). Public: returned to all accounts.

    - `url: string`

    - `description: optional string`

  - `internalAliases: optional array of object { value, confidence, tlp }`

    Internal structured aliases ({ value, confidence 1-10, tlp }). CFONE-only: never returned to non-CFONE accounts.

    - `value: string`

    - `confidence: optional number`

    - `tlp: optional "red" or "amber" or "green" or "white"`

      - `"red"`

      - `"amber"`

      - `"green"`

      - `"white"`

  - `internalDescription: optional string`

  - `motive: optional string`

  - `motiveConfidence: optional number`

    Confidence (1-10) in the actor motive. CFONE-only: stripped from responses to non-CFONE accounts.

  - `opsecLevel: optional string`

  - `originCountryConfidence: optional number`

    Confidence (1-10) in the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

  - `originCountryISO: optional string`

  - `originCountryISOAlpha3: optional string`

  - `originCountryTlp: optional "red" or "amber" or "green" or "white"`

    TLP marking for the origin-country attribution. CFONE-only: stripped from responses to non-CFONE accounts.

    - `"red"`

    - `"amber"`

    - `"green"`

    - `"white"`

  - `priority: optional number`

  - `sophisticationLevel: optional string`

# Event Tags

## Adds a tag to an event

**post** `/accounts/{account_id}/cloudforce-one/events/event_tag/{event_id}/create`

Adds a tag to an event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Body Parameters

- `tags: array of string`

### Returns

- `result: object { success }`

  - `success: boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/event_tag/$EVENT_ID/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tags": [
            "botnet"
          ]
        }'
```

#### Response

```json
{
  "result": {
    "success": true
  },
  "success": true
}
```

## Removes a tag from an event

**delete** `/accounts/{account_id}/cloudforce-one/events/event_tag/{event_id}`

Removes a tag from an event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Returns

- `result: object { success }`

  - `success: boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/event_tag/$EVENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "success": true
  },
  "success": true
}
```

## Domain Types

### Event Tag Create Response

- `EventTagCreateResponse object { success }`

  - `success: boolean`

### Event Tag Delete Response

- `EventTagDeleteResponse object { success }`

  - `success: boolean`

# Target Industries

## Lists target industries across multiple datasets

**get** `/accounts/{account_id}/cloudforce-one/events/targetIndustries`

Lists target industries across multiple datasets

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `datasetIds: optional array of string`

  Array of dataset IDs to query target industries from. If not provided, uses the default dataset.

### Returns

- `items: object { type }`

  - `type: string`

- `type: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/targetIndustries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```

## Domain Types

### Target Industry List Response

- `TargetIndustryListResponse object { items, type }`

  - `items: object { type }`

    - `type: string`

  - `type: string`

# Insights
