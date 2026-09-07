# Users

## Get users

**get** `/accounts/{account_id}/access/users`

Gets a list of users for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `email: optional string`

  The email of the user.

- `name: optional string`

  The name of the user.

- `page: optional number`

  Page number of results.

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Search for users by other listed query parameters.

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

- `result: optional array of object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "access_seat": false,
      "active_device_count": 2,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "email": "jdoe@example.com",
      "gateway_seat": false,
      "last_successful_login": "2020-07-01T05:20:00Z",
      "name": "Jane Doe",
      "seat_uid": "seat_uid",
      "uid": "uid",
      "updated_at": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 100,
    "total_count": 1,
    "total_pages": 100
  }
}
```

## Get a user

**get** `/accounts/{account_id}/access/users/{user_id}`

Gets a specific user for an account.

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

- `result: optional object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID \
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
    "access_seat": false,
    "active_device_count": 2,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "email": "jdoe@example.com",
    "gateway_seat": false,
    "last_successful_login": "2020-07-01T05:20:00Z",
    "name": "Jane Doe",
    "seat_uid": "seat_uid",
    "uid": "uid",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create a user

**post** `/accounts/{account_id}/access/users`

Creates a new user.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `email: string`

  The email of the user.

- `name: optional string`

  The name of the user.

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

- `result: optional object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "jdoe@example.com",
          "name": "Jane Doe"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "access_seat": false,
    "active_device_count": 2,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "email": "jdoe@example.com",
    "gateway_seat": false,
    "last_successful_login": "2020-07-01T05:20:00Z",
    "name": "Jane Doe",
    "seat_uid": "seat_uid",
    "uid": "uid",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update a user

**put** `/accounts/{account_id}/access/users/{user_id}`

Updates a specific user's name for an account. Requires the user's current email as confirmation (email cannot be changed).

### Path Parameters

- `account_id: string`

  Identifier.

- `user_id: string`

  UUID.

### Body Parameters

- `email: string`

  The email of the user.

- `name: string`

  The name of the user.

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

- `result: optional object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "jdoe@example.com",
          "name": "Jane Doe"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "access_seat": false,
    "active_device_count": 2,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "email": "jdoe@example.com",
    "gateway_seat": false,
    "last_successful_login": "2020-07-01T05:20:00Z",
    "name": "Jane Doe",
    "seat_uid": "seat_uid",
    "uid": "uid",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete a user

**delete** `/accounts/{account_id}/access/users/{user_id}`

Deletes a specific user for an account. This will also revoke any active seats and tokens for the user.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID \
    -X DELETE \
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
  "result": {}
}
```

## Domain Types

### Access User

- `AccessUser object { id, active, displayName, 4 more }`

  - `id: optional string`

    The unique Cloudflare-generated Id of the SCIM resource.

  - `active: optional boolean`

    Determines the status of the SCIM User resource.

  - `displayName: optional string`

    The name of the SCIM User resource.

  - `emails: optional array of object { primary, type, value }`

    - `primary: optional boolean`

      Indicates if the email address is the primary email belonging to the SCIM User resource.

    - `type: optional string`

      Indicates the type of the email address.

    - `value: optional string`

      The email address of the SCIM User resource.

  - `externalId: optional string`

    The IdP-generated Id of the SCIM resource.

  - `meta: optional object { created, lastModified }`

    The metadata of the SCIM resource.

    - `created: optional string`

      The timestamp of when the SCIM resource was created.

    - `lastModified: optional string`

      The timestamp of when the SCIM resource was last modified.

  - `schemas: optional array of string`

    The list of URIs which indicate the attributes contained within a SCIM resource.

### User List Response

- `UserListResponse object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

### User Get Response

- `UserGetResponse object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

### User Create Response

- `UserCreateResponse object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

### User Update Response

- `UserUpdateResponse object { id, access_seat, active_device_count, 8 more }`

  - `id: optional string`

    UUID.

  - `access_seat: optional boolean`

    True if the user has authenticated with Cloudflare Access.

  - `active_device_count: optional number`

    The number of active devices registered to the user.

  - `created_at: optional string`

  - `email: optional string`

    The email of the user.

  - `gateway_seat: optional boolean`

    True if the user has logged into the WARP client.

  - `last_successful_login: optional string`

    The time at which the user last successfully logged in.

  - `name: optional string`

    The name of the user.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `uid: optional string`

    The unique API identifier for the user.

  - `updated_at: optional string`

### User Delete Response

- `UserDeleteResponse = unknown`

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

# Last Seen Identity

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

## Domain Types

### Identity

- `Identity object { account_id, auth_status, common_name, 15 more }`

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

# Failed Logins

## Get failed logins

**get** `/accounts/{account_id}/access/users/{user_id}/failed_logins`

Get all failed login attempts for a single user.

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

- `result: optional array of object { expiration, metadata }`

  - `expiration: optional number`

  - `metadata: optional unknown`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/users/$USER_ID/failed_logins \
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
      "expiration": 0,
      "metadata": {
        "app_name": "Test App",
        "aud": "39691c1480a2352a18ece567debc2b32552686cbd38eec0887aa18d5d3f00c04",
        "datetime": "2022-02-02T21:54:34.914Z",
        "ray_id": "6d76a8a42ead4133",
        "user_email": "test@cloudflare.com",
        "user_uuid": "57171132-e453-4ee8-b2a5-8cbaad333207"
      }
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

## Domain Types

### Failed Login List Response

- `FailedLoginListResponse object { expiration, metadata }`

  - `expiration: optional number`

  - `metadata: optional unknown`
