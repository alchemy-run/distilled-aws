## Get last seen identity

**get** `/accounts/{account_id}/access/users/{user_id}/last_seen_identity`

Get last seen identity for a single user.

### Path Parameters

- `account_id: string`

  Identifier.

- `user_id: string`

  UUID.

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

- `result: optional Identity`

  - `account_id: optional string`

  - `auth_status: optional string`

  - `common_name: optional string`

  - `device_id: optional string`

  - `device_sessions: optional map[object { last_authenticated } ]`

    - `last_authenticated: optional number`

  - `devicePosture: optional map[object { id, check, data, 6 more } ]`

    - `id: optional string`

    - `check: optional object { exists, path }`

      - `exists: optional boolean`

      - `path: optional string`

    - `data: optional unknown`

    - `description: optional string`

    - `error: optional string`

    - `rule_name: optional string`

    - `success: optional boolean`

    - `timestamp: optional string`

    - `type: optional string`

  - `email: optional string`

  - `geo: optional object { country }`

    - `country: optional string`

  - `iat: optional number`

  - `idp: optional object { id, type }`

    - `id: optional string`

    - `type: optional string`

  - `ip: optional string`

  - `is_gateway: optional boolean`

  - `is_warp: optional boolean`

  - `mtls_auth: optional object { auth_status, cert_issuer_dn, cert_issuer_ski, 2 more }`

    - `auth_status: optional string`

    - `cert_issuer_dn: optional string`

    - `cert_issuer_ski: optional string`

    - `cert_presented: optional boolean`

    - `cert_serial: optional string`

  - `service_token_id: optional string`

  - `service_token_status: optional boolean`

  - `user_uuid: optional string`

  - `version: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID/last_seen_identity \
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
    "account_id": "1234567890",
    "auth_status": "NONE",
    "common_name": "",
    "device_id": "",
    "device_sessions": {
      "foo": {
        "last_authenticated": 1638832687
      }
    },
    "devicePosture": {
      "foo": {
        "id": "id",
        "check": {
          "exists": true,
          "path": "path"
        },
        "data": {},
        "description": "description",
        "error": "error",
        "rule_name": "rule_name",
        "success": true,
        "timestamp": "timestamp",
        "type": "type"
      }
    },
    "email": "test@cloudflare.com",
    "geo": {
      "country": "US"
    },
    "iat": 1694791905,
    "idp": {
      "id": "id",
      "type": "type"
    },
    "ip": "127.0.0.0",
    "is_gateway": false,
    "is_warp": false,
    "mtls_auth": {
      "auth_status": "auth_status",
      "cert_issuer_dn": "cert_issuer_dn",
      "cert_issuer_ski": "cert_issuer_ski",
      "cert_presented": true,
      "cert_serial": "cert_serial"
    },
    "service_token_id": "",
    "service_token_status": false,
    "user_uuid": "57cf8cf2-f55a-4588-9ac9-f5e41e9f09b4",
    "version": 2
  }
}
```
