## Items List.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items`

Lists indexed items in an AI Search instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

### Query Parameters

- `item_id: optional string`

  Filter items by their unique ID. Returns at most one item.

- `metadata_filter: optional string`

  JSON-encoded metadata filter using Vectorize filter syntax. Examples: {"folder":"reports/"}, {"timestamp":{"$gte":1700000000000}}, {"folder":{"$in":["docs/","reports/"]}}

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

- `sort_by: optional "status" or "modified_at"`

  Sort order for items. "status" (default) sorts by status priority then last_seen_at. "modified_at" sorts by file modification time (most recent first), falling back to created_at.

  - `"status"`

  - `"modified_at"`

- `source: optional string`

  Filter items by source_id. Use "builtin" for uploaded files, or a source identifier like "web-crawler:https://example.com".

- `status: optional "queued" or "running" or "completed" or 3 more`

  - `"queued"`

  - `"running"`

  - `"completed"`

  - `"error"`

  - `"skipped"`

  - `"outdated"`

### Returns

- `result: array of object { id, checksum, chunks_count, 9 more }`

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

- `result_info: object { count, page, total_count, per_page }`

  - `count: number`

  - `page: number`

  - `total_count: number`

  - `per_page: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
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
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "total_count": 0,
    "per_page": 5
  },
  "success": true
}
```
