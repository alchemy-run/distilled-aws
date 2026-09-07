## Create a service token

**post** `/{accounts_or_zones}/{account_or_zone_id}/access/service_tokens`

Generates a new service token. **Note:** This is the only time you can get the Client Secret. If you lose the Client Secret, you will have to rotate the Client Secret or create a new service token.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `name: string`

  The name of the service token.

- `client_secret_version: optional number`

  A version number identifying the current `client_secret` associated with the service token. Incrementing it triggers a rotation; the previous secret will still be accepted until the time indicated by `previous_client_secret_expires_at`.

- `duration: optional string`

  The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

- `previous_client_secret_expires_at: optional string`

  The expiration of the previous `client_secret`. This can be modified at any point after a rotation. For example, you may extend it further into the future if you need more time to update services with the new secret; or move it into the past to immediately invalidate the previous token in case of compromise.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/service_tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "CI/CD token",
          "duration": "60m",
          "previous_client_secret_expires_at": "2014-01-01T05:20:00.12345Z"
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
