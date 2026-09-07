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
