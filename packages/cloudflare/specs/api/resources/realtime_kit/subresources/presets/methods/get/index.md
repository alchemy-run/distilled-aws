## Fetch all presets

**get** `/accounts/{account_id}/realtime/kit/{app_id}/presets`

Fetches all the presets belonging to an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  Search presets by name.

### Returns

- `data: array of object { id, created_at, name, updated_at }`

  - `id: optional string`

    ID of the preset

  - `created_at: optional string`

    Timestamp this preset was created at

  - `name: optional string`

    Name of the preset

  - `updated_at: optional string`

    Timestamp this preset was last updated

- `paging: object { end_offset, start_offset, total_count }`

  - `end_offset: number`

  - `start_offset: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/presets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ],
  "paging": {
    "end_offset": 30,
    "start_offset": 1,
    "total_count": 30
  },
  "success": true
}
```
