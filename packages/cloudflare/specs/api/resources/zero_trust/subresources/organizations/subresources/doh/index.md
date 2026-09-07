# DOH

## Get your Zero Trust organization DoH settings

**get** `/accounts/{account_id}/access/organizations/doh`

Returns the DoH settings for your Zero Trust organization.

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

- `result: optional object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account.

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/organizations/doh \
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
    "doh_jwt_duration": "800h",
    "duration": "60m",
    "expires_at": "2014-01-01T05:20:00.12345Z",
    "last_seen_at": "2014-01-01T05:20:00.12345Z",
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update your Zero Trust organization DoH settings

**put** `/accounts/{account_id}/access/organizations/doh`

Updates the DoH settings for your Zero Trust organization.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `doh_jwt_duration: optional string`

  The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h

- `service_token_id: optional string`

  The uuid of the service token you want to use for DoH authentication

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

- `result: optional object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/organizations/doh \
    -X PUT \
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
    "doh_jwt_duration": "800h",
    "duration": "60m",
    "expires_at": "2014-01-01T05:20:00.12345Z",
    "last_seen_at": "2014-01-01T05:20:00.12345Z",
    "name": "CI/CD token",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### DOH Get Response

- `DOHGetResponse object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account.

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.

### DOH Update Response

- `DOHUpdateResponse object { id, client_id, doh_jwt_duration, 3 more }`

  - `id: optional string`

    The ID of the service token.

  - `client_id: optional string`

    The Client ID for the service token. Access will check for this value in the `CF-Access-Client-ID` request header.

  - `doh_jwt_duration: optional string`

    The duration the DoH JWT is valid for. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h.  Note that the maximum duration for this setting is the same as the key rotation period on the account. Default expiration is 24h

  - `duration: optional string`

    The duration for how long the service token will be valid. Must be in the format `300ms` or `2h45m`. Valid time units are: ns, us (or µs), ms, s, m, h. The default is 1 year in hours (8760h).

  - `expires_at: optional string`

  - `name: optional string`

    The name of the service token.
