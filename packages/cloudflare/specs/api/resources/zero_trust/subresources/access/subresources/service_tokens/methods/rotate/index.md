## Rotate a service token

**post** `/accounts/{account_id}/access/service_tokens/{service_token_id}/rotate`

Generates a new Client Secret for a service token and revokes the old one.

### Path Parameters

- `account_id: string`

  Identifier.

- `service_token_id: string`

  UUID.

### Body Parameters

- `previous_client_secret_expires_at: optional string`

  The expiration of the previous `client_secret`. If not provided, it defaults to the current timestamp in order to immediately expire the previous secret.

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

- `result: optional object { id, client_id, client_secret, 2 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `client_secret: optional string`

    The Client Secret for the service token. Access will check for this value in the `CF-Access-Client-Secret` request header.

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `name: optional string`

    The name of the service token.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/service_tokens/$SERVICE_TOKEN_ID/rotate \
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
    "id": "id",
    "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
    "client_secret": "bdd31cbc4dec990953e39163fbbb194c93313ca9f0a6e420346af9d326b1d2a5",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "duration": "60m",
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
