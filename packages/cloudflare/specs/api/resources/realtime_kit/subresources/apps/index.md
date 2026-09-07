# Apps

## Fetch all apps

**get** `/accounts/{account_id}/realtime/kit/apps`

Fetch all apps for your account

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Query Parameters

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Search string that matches apps by name.

- `sort_order: optional "ASC" or "DESC"`

  Sort order for apps by creation time.

  - `"ASC"`

  - `"DESC"`

### Returns

- `data: optional array of object { id, created_at, name }`

  - `id: optional string`

  - `created_at: optional string`

  - `name: optional string`

- `paging: optional object { end_offset, start_offset, total_count }`

  - `end_offset: optional number`

  - `start_offset: optional number`

  - `total_count: optional number`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/apps \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-first-app"
    }
  ],
  "paging": {
    "end_offset": 1,
    "start_offset": 1,
    "total_count": 1
  },
  "success": true
}
```

## Create App

**post** `/accounts/{account_id}/realtime/kit/apps`

Create new app for your account

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

- `name: string`

### Returns

- `data: optional object { app }`

  - `app: optional object { id, created_at, name }`

    - `id: optional string`

    - `created_at: optional string`

    - `name: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "x"
        }'
```

#### Response

```json
{
  "data": {
    "app": {
      "created_at": "2025-01-01T08:16:40.644Z",
      "id": "14a396e7-ca44-4937-bf1f-050a69118543",
      "name": "my-new-app"
    }
  },
  "success": true
}
```

## Domain Types

### App Get Response

- `AppGetResponse object { data, paging, success }`

  - `data: optional array of object { id, created_at, name }`

    - `id: optional string`

    - `created_at: optional string`

    - `name: optional string`

  - `paging: optional object { end_offset, start_offset, total_count }`

    - `end_offset: optional number`

    - `start_offset: optional number`

    - `total_count: optional number`

  - `success: optional boolean`

### App Post Response

- `AppPostResponse object { data, success }`

  - `data: optional object { app }`

    - `app: optional object { id, created_at, name }`

      - `id: optional string`

      - `created_at: optional string`

      - `name: optional string`

  - `success: optional boolean`
