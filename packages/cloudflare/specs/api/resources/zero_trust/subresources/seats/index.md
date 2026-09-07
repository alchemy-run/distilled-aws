# Seats

## Update a user seat

**patch** `/accounts/{account_id}/access/seats`

Removes a user from a Zero Trust seat when both `access_seat` and `gateway_seat` are set to false.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: array of object { access_seat, gateway_seat, seat_uid }`

  - `access_seat: boolean`

    True if the seat is part of Access.

  - `gateway_seat: boolean`

    True if the seat is part of Gateway.

  - `seat_uid: string`

    The unique API identifier for the Zero Trust seat.

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

- `result: optional array of Seat`

  - `access_seat: optional boolean`

    True if the seat is part of Access.

  - `created_at: optional string`

  - `gateway_seat: optional boolean`

    True if the seat is part of Gateway.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/seats \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "access_seat": false,
            "gateway_seat": false,
            "seat_uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
          }
        ]'
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
      "access_seat": false,
      "created_at": "2014-01-01T05:20:00.12345Z",
      "gateway_seat": false,
      "seat_uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "updated_at": "2014-01-01T05:20:00.12345Z"
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

### Seat

- `Seat object { access_seat, created_at, gateway_seat, 2 more }`

  - `access_seat: optional boolean`

    True if the seat is part of Access.

  - `created_at: optional string`

  - `gateway_seat: optional boolean`

    True if the seat is part of Gateway.

  - `seat_uid: optional string`

    The unique API identifier for the Zero Trust seat.

  - `updated_at: optional string`
