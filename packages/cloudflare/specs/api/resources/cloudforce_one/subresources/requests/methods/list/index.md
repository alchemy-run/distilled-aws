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
