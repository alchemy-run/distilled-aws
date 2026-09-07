## Verify Token

**get** `/accounts/{account_id}/tokens/verify`

Test whether a token works.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: optional object { id, status, expires_on, not_before }`

  - `id: string`

    Token identifier tag.

  - `status: "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/verify \
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
    "id": "ed17574386854bf78a67040be0a770b0",
    "status": "active",
    "expires_on": "2020-01-01T00:00:00Z",
    "not_before": "2018-07-01T05:20:00Z"
  }
}
```
