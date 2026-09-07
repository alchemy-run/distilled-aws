# Registrations

## List registrations

**get** `/accounts/{account_id}/devices/registrations`

Lists WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional array of string`

  Filter by registration ID.

- `cursor: optional string`

  Opaque token indicating the starting position when requesting the next set of records. A cursor value can be obtained from the result_info.cursor field in the response.

- `device: optional object { id }`

  - `id: optional string`

    Filter by WARP device ID.

- `include: optional string`

  Comma-separated list of additional information that should be included in the registration response. Supported values are: "policy".

- `per_page: optional number`

  The maximum number of devices to return in a single response.

- `search: optional string`

  Filter by registration details.

- `seen_after: optional string`

  Filter by the last_seen timestamp - returns only registrations last seen after this timestamp.

- `seen_before: optional string`

  Filter by the last_seen timestamp - returns only registrations last seen before this timestamp.

- `sort_by: optional "id" or "user.name" or "user.email" or 2 more`

  The registration field to order results by.

  - `"id"`

  - `"user.name"`

  - `"user.email"`

  - `"last_seen_at"`

  - `"created_at"`

- `sort_order: optional "asc" or "desc"`

  Sort direction.

  - `"asc"`

  - `"desc"`

- `status: optional "active" or "all" or "revoked"`

  Filter by registration status. Defaults to 'active'.

  - `"active"`

  - `"all"`

  - `"revoked"`

- `user: optional object { id }`

  - `id: optional array of string`

    Filter by user ID.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of object { id, created_at, device, 11 more }`

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [
    {
      "created_at": "2025-02-14T13:17:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.0",
        "id": "32aa0404-78f1-49a4-99e0-97f575081356",
        "name": "My Device"
      },
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-14T13:17:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-14T13:17:00Z",
      "user": {
        "email": "alice@example.org",
        "id": "30323c1f-318d-4ec9-92c7-5a8c4d25c4fc",
        "name": "Alice"
      }
    },
    {
      "created_at": "2025-02-15T10:20:00Z",
      "deleted_at": null,
      "device": {
        "client_version": "1.0.1",
        "id": "43bb1515-8902-50b5-aa01-a88686192467",
        "name": "Bob's Laptop"
      },
      "id": "22eedc7a-4a1d-5417-c5b3-f73a983c277b",
      "key": "V/RSP61StXgfmLHJG5umHEonHfvxtz57LDIs6PziXr11Stegm56nhrRBvFK7DP1ZsLzUm0GVg6jC1cxZS4h5FFGFJiju7kGbrgNsCNCT77juw0IRYlS0QpjgLR==",
      "key_type": "secp256r1",
      "last_seen_at": "2025-02-15T10:25:00Z",
      "revoked_at": null,
      "tunnel_type": "masque",
      "updated_at": "2025-02-15T10:25:00Z",
      "user": {
        "email": "bob@example.com",
        "id": "41434d2a-429e-5fd0-a3d8-6b9d5e36d5ad",
        "name": "Bob"
      }
    }
  ],
  "result_info": {
    "count": 2,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  },
  "success": true
}
```

## Get registration

**get** `/accounts/{account_id}/devices/registrations/{registration_id}`

Fetches a single WARP registration.

### Path Parameters

- `account_id: string`

- `registration_id: string`

### Query Parameters

- `include: optional string`

  Comma-separated list of additional information that should be included in the registration response. Supported values are: "policy".

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, created_at, device, 11 more }`

  A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
    "created_at": "2025-02-14T13:17:00Z",
    "device": {
      "id": "32aa0404-78f1-49a4-99e0-97f575081356",
      "name": "My Device",
      "client_version": "1.0.0"
    },
    "key": "U+QTP50RsWfeLGHF4tlGDnmGeuwtsz46KCHr5OyhWq00Rsdfl45mgnQAuEJ6CO0YrkyTl9FUf5iB0bwYR3g4EEFEHhtu6jFaqfMrBMBSz6itv9HQXkaR9OieKQ==",
    "last_seen_at": "2025-02-14T13:17:00Z",
    "updated_at": "2025-02-14T13:17:00Z",
    "deleted_at": "2025-02-14T13:17:00Z",
    "key_type": "secp256r1",
    "policy": {
      "id": "11ffb86f-3f0c-4306-b4a2-e62f872b166a",
      "default": true,
      "deleted": true,
      "name": "name",
      "updated_at": "2025-02-14T13:17:00Z"
    },
    "revoked_at": "2025-02-14T13:17:00Z",
    "tunnel_type": "masque",
    "user": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "email": "user@example.com",
      "name": "John Appleseed"
    },
    "virtual_ipv4": "100.96.0.1",
    "virtual_ipv6": "2606:4700:0cf1:1000::1"
  },
  "success": true
}
```

## Delete registration

**delete** `/accounts/{account_id}/devices/registrations/{registration_id}`

Deletes a WARP registration.

### Path Parameters

- `account_id: string`

- `registration_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {}
}
```

## Delete registrations

**delete** `/accounts/{account_id}/devices/registrations`

Deletes a list of WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: array of string`

  A list of registration IDs to delete.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

## Revoke registrations

**post** `/accounts/{account_id}/devices/registrations/revoke`

Revokes a list of WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: array of string`

  A list of registration IDs to revoke.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/revoke \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

## Unrevoke registrations

**post** `/accounts/{account_id}/devices/registrations/unrevoke`

Unrevokes a list of WARP registrations.

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: array of string`

  A list of registration IDs to unrevoke.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: boolean`

  Whether the API call was successful.

- `result_info: optional object { count, cursor, per_page, total_count }`

  V4 public API Pagination/Cursor info.

  - `count: number`

    Number of records in the response.

  - `cursor: string`

    Opaque token to request the next set of records.

  - `per_page: number`

    The limit for the number of records in the response.

  - `total_count: optional number`

    Total number of records available.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/unrevoke \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {},
  "success": true,
  "result_info": {
    "count": 1,
    "cursor": "ais86dftf.asdf7ba8",
    "per_page": 10,
    "total_count": null
  }
}
```

## Domain Types

### Registration List Response

- `RegistrationListResponse object { id, created_at, device, 11 more }`

  A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

### Registration Get Response

- `RegistrationGetResponse object { id, created_at, device, 11 more }`

  A WARP configuration tied to a single user. Multiple registrations can be created from a single WARP device.

  - `id: string`

    The ID of the registration.

  - `created_at: string`

    The RFC3339 timestamp when the registration was created.

  - `device: object { id, name, client_version }`

    Device details embedded inside of a registration.

    - `id: string`

      The ID of the device.

    - `name: string`

      The name of the device.

    - `client_version: optional string`

      Version of the WARP client.

  - `key: string`

    The public key used to connect to the Cloudflare network.

  - `last_seen_at: string`

    The RFC3339 timestamp when the registration was last seen.

  - `updated_at: string`

    The RFC3339 timestamp when the registration was last updated.

  - `deleted_at: optional string`

    The RFC3339 timestamp when the registration was deleted.

  - `key_type: optional string`

    The type of encryption key used by the WARP client for the active key. Currently 'curve25519' for WireGuard and 'secp256r1' for MASQUE.

  - `policy: optional object { id, default, deleted, 2 more }`

    The device settings profile assigned to this registration.

    - `id: string`

      The ID of the device settings profile.

    - `default: boolean`

      Whether the device settings profile is the default profile for the account.

    - `deleted: boolean`

      Whether the device settings profile was deleted.

    - `name: string`

      The name of the device settings profile.

    - `updated_at: string`

      The RFC3339 timestamp of when the device settings profile last changed for the registration.

  - `revoked_at: optional string`

    The RFC3339 timestamp when the registration was revoked.

  - `tunnel_type: optional string`

    Type of the tunnel - wireguard or masque.

  - `user: optional object { id, email, name }`

    - `id: optional string`

      UUID.

    - `email: optional string`

      The contact email address of the user.

    - `name: optional string`

      The enrolled device user's name.

  - `virtual_ipv4: optional string`

    The virtual IPv4 address assigned to the network interface of the tunnel for this registration.

  - `virtual_ipv6: optional string`

    The virtual IPv6 address assigned to the network interface of the tunnel for this registration.

### Registration Delete Response

- `RegistrationDeleteResponse = unknown`

### Registration Bulk Delete Response

- `RegistrationBulkDeleteResponse = unknown`

### Registration Revoke Response

- `RegistrationRevokeResponse = unknown`

### Registration Unrevoke Response

- `RegistrationUnrevokeResponse = unknown`
