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
