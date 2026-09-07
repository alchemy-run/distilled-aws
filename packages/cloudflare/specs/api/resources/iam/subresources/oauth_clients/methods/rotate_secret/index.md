## Rotate OAuth Client Secret

**post** `/accounts/{account_id}/oauth_clients/{oauth_client_id}/rotate_secret`

Creates a second client secret so you can update your client configuration before deleting the old one. The `has_rotated_secret` field on the client will be set to `true`.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `oauth_client_id: string`

  The unique identifier for an OAuth client.

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

- `result: optional object { client_secret }`

  - `client_secret: optional string`

    The new client secret.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/oauth_clients/$OAUTH_CLIENT_ID/rotate_secret \
    -X POST \
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
    "client_secret": "cf-oauth-secret-new-example"
  }
}
```
