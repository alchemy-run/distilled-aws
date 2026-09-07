## List Item Chunks.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}/chunks`

Lists chunks for a specific item in an AI Search instance, including their text content.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Query Parameters

- `limit: optional number`

- `offset: optional number`

### Returns

- `result: array of object { id, item, text, 2 more }`

  - `id: string`

  - `item: object { key, metadata, timestamp }`

    - `key: string`

    - `metadata: optional map[unknown]`

    - `timestamp: optional number`

  - `text: string`

  - `end_byte: optional number`

  - `start_byte: optional number`

- `result_info: object { count, limit, offset, total }`

  - `count: number`

  - `limit: number`

  - `offset: number`

  - `total: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID/chunks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "item": {
        "key": "key",
        "metadata": {
          "foo": "bar"
        },
        "timestamp": 0
      },
      "text": "text",
      "end_byte": 0,
      "start_byte": 0
    }
  ],
  "result_info": {
    "count": 0,
    "limit": 0,
    "offset": 0,
    "total": 0
  },
  "success": true
}
```
