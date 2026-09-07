# Items

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

## Upload Item.

**post** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items`

Uploads a file to a managed AI Search instance via multipart/form-data (max 4MB).

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F file='{"file":"Example data"}'
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

## Create or Update Item.

**put** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items`

Creates or updates an indexed item in an AI Search instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

### Body Parameters

- `key: string`

  Item key / filename. Must not exceed 128 characters.

- `next_action: "INDEX"`

  - `"INDEX"`

- `wait_for_completion: optional boolean`

  Wait for indexing to fully complete before responding. On RAGs with vector indexing enabled, this additionally waits for Vectorize ingestion confirmation (up to 40s) so the returned item reflects a queryable state. On timeout the item is returned in `running` state and the background alarm continues polling. Defaults to false.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "key": "key",
          "next_action": "INDEX"
        }'
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

## Sync Item.

**patch** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}`

Syncs an item to an AI Search instance index.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Body Parameters

- `next_action: "INDEX"`

  - `"INDEX"`

- `wait_for_completion: optional boolean`

  Wait for indexing to fully complete before responding. On RAGs with vector indexing enabled, this additionally waits for Vectorize ingestion confirmation (up to 40s) so the returned item reflects a queryable state. On timeout the item is returned in `running` state and the background alarm continues polling. Defaults to false.

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
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "next_action": "INDEX"
        }'
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

## Delete Item.

**delete** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}`

Deletes a file from a managed AI Search instance and triggers a reindex.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Returns

- `result: object { key }`

  - `key: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "key": "key"
  },
  "success": true
}
```

## Download Item Content.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}/download`

Downloads the raw file content for a specific item from the managed AI Search instance storage.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Item Logs.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/items/{item_id}/logs`

Lists processing logs for a specific item in an AI Search instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `item_id: string`

### Query Parameters

- `cursor: optional string`

- `limit: optional number`

### Returns

- `result: array of object { action, chunkCount, errorType, 4 more }`

  - `action: string`

  - `chunkCount: number`

  - `errorType: string`

  - `fileKey: string`

  - `message: string`

  - `processingTimeMs: number`

  - `timestamp: string`

- `result_info: object { count, cursor, per_page, truncated }`

  - `count: number`

  - `cursor: string`

  - `per_page: number`

  - `truncated: boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/items/$ITEM_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "action": "action",
      "chunkCount": 0,
      "errorType": "errorType",
      "fileKey": "fileKey",
      "message": "message",
      "processingTimeMs": 0,
      "timestamp": "2019-12-27T18:11:19.117Z"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0,
    "truncated": true
  },
  "success": true
}
```

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

## Domain Types

### Item List Response

- `ItemListResponse object { id, checksum, chunks_count, 9 more }`

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

### Item Upload Response

- `ItemUploadResponse object { id, checksum, chunks_count, 9 more }`

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

### Item Create Or Update Response

- `ItemCreateOrUpdateResponse object { id, checksum, chunks_count, 9 more }`

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

### Item Get Response

- `ItemGetResponse object { id, checksum, chunks_count, 9 more }`

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

### Item Sync Response

- `ItemSyncResponse object { id, checksum, chunks_count, 9 more }`

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

### Item Delete Response

- `ItemDeleteResponse object { key }`

  - `key: string`

### Item Logs Response

- `ItemLogsResponse = array of object { action, chunkCount, errorType, 4 more }`

  - `action: string`

  - `chunkCount: number`

  - `errorType: string`

  - `fileKey: string`

  - `message: string`

  - `processingTimeMs: number`

  - `timestamp: string`

### Item Chunks Response

- `ItemChunksResponse = array of object { id, item, text, 2 more }`

  - `id: string`

  - `item: object { key, metadata, timestamp }`

    - `key: string`

    - `metadata: optional map[unknown]`

    - `timestamp: optional number`

  - `text: string`

  - `end_byte: optional number`

  - `start_byte: optional number`
