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
