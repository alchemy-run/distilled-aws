## Get Item.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}`

Retrieves a specific indexed item from an AI Search instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Returns

- `result: object { id, checksum, chunks_count, 9 more }`

  - `id: string`

  - `checksum: string`

  - `chunks_count: number`

  - `created_at: string`

  - `file_size: number`

  - `key: string`

  - `last_seen_at: string`

  - `namespace: string`

  - `next_action: "INDEX" or "DELETE"`

    - `"INDEX"`

    - `"DELETE"`

  - `source_id: string`

    Identifies which data source this item belongs to. "builtin" for uploaded files, "{type}:{source}" for external sources, null for legacy items.

  - `status: "queued" or "running" or "completed" or 3 more`

    - `"queued"`

    - `"running"`

    - `"completed"`

    - `"error"`

    - `"skipped"`

    - `"outdated"`

  - `error: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "checksum": "checksum",
    "chunks_count": 0,
    "created_at": "2019-12-27T18:11:19.117Z",
    "file_size": 0,
    "key": "key",
    "last_seen_at": "2019-12-27T18:11:19.117Z",
    "namespace": "namespace",
    "next_action": "INDEX",
    "source_id": "source_id",
    "status": "queued",
    "error": "error"
  },
  "success": true
}
```
