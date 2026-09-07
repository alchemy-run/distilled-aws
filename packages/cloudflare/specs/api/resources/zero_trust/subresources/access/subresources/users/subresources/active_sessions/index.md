# Active Sessions

## Get active sessions

**get** `/accounts/{account_id}/access/users/{user_id}/active_sessions`

Get active sessions for a single user.

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

- `result: optional array of object { expiration, metadata, name }`

  - `expiration: optional number`

  - `metadata: optional object { apps, expires, iat, 2 more }`

    - `apps: optional map[object { hostname, name, type, uid } ]`

      - `hostname: optional string`

      - `name: optional string`

      - `type: optional string`

      - `uid: optional string`

    - `expires: optional number`

    - `iat: optional number`

    - `nonce: optional string`

    - `ttl: optional number`

  - `name: optional string`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID/active_sessions \
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
  "result": [
    {
      "expiration": 1694813506,
      "metadata": {
        "apps": {
          "foo": {
            "hostname": "test.example.com",
            "name": "app name",
            "type": "self_hosted",
            "uid": "cc2a8145-0128-4429-87f3-872c4d380c4e"
          }
        },
        "expires": 1694813506,
        "iat": 1694791905,
        "nonce": "X1aXj1lFVcqqyoXF",
        "ttl": 21600
      },
      "name": "name"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get single active session

**get** `/accounts/{account_id}/access/users/{user_id}/active_sessions/{nonce}`

Get an active session for a single user.

### Path Parameters

- `account_id: string`

  Identifier.

- `user_id: string`

  UUID.

- `nonce: string`

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

- `result: optional object { account_id, auth_status, common_name, 16 more }`

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

  - `isActive: optional boolean`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID/active_sessions/$NONCE \
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
    "isActive": true,
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

## Domain Types

### Active Session List Response

- `ActiveSessionListResponse object { expiration, metadata, name }`

  - `expiration: optional number`

  - `metadata: optional object { apps, expires, iat, 2 more }`

    - `apps: optional map[object { hostname, name, type, uid } ]`

      - `hostname: optional string`

      - `name: optional string`

      - `type: optional string`

      - `uid: optional string`

    - `expires: optional number`

    - `iat: optional number`

    - `nonce: optional string`

    - `ttl: optional number`

  - `name: optional string`

### Active Session Get Response

- `ActiveSessionGetResponse object { account_id, auth_status, common_name, 16 more }`

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

  - `isActive: optional boolean`

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
