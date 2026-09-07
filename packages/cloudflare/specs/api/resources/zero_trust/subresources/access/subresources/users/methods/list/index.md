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
