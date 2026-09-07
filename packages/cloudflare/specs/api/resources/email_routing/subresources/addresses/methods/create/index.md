## Create a destination address

**post** `/accounts/{account_id}/email/routing/addresses`

Create a destination address to forward your emails to. Destination addresses need to be verified before they can be used.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `email: string`

  The contact email address of the user.

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

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "email": "user@example.com"
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
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```
