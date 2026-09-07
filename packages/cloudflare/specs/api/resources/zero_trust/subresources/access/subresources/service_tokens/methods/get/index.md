## Get a service token

**get** `/{accounts_or_zones}/{account_or_zone_id}/access/service_tokens/{service_token_id}`

Fetches a single service token.

### Path Parameters

- `service_token_id: string`

  UUID.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional ServiceToken`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/service_tokens/$SERVICE_TOKEN_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "client_id": "88bf3b6d86161464f6509f7219099e57.access.example.com",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "duration": "60m",
    "expires_at": "2014-01-01T05:20:00.12345Z",
    "last_seen_at": "2014-01-01T05:20:00.12345Z",
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
