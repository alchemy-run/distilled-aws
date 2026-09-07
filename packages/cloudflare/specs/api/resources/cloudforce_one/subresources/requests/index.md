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
