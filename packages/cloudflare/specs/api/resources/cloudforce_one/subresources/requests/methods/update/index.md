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
