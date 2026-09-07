## Stats

**get** `/accounts/{account_id}/ai-search/instances/{id}/stats`

Retrieves usage statistics for AI Search instances.

### Path Parameters

- `account_id: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

### Returns

- `result: object { completed, degraded, engine, 8 more }`

  - `completed: optional number`

  - `degraded: optional boolean`

    True when status counts are unavailable (e.g. legacy stats query exceeded D1 statement-size limit). Counts are omitted in this case.

  - `engine: optional object { r2, vectorize }`

    Engine-specific metadata. Present only for managed (v3) instances.

    - `r2: optional object { metadataSizeBytes, objectCount, payloadSizeBytes }`

      R2 bucket storage usage in bytes.

      - `metadataSizeBytes: number`

      - `objectCount: number`

      - `payloadSizeBytes: number`

    - `vectorize: optional object { dimensions, vectorsCount }`

      Vectorize index metadata (dimensions, vector count).

      - `dimensions: number`

      - `vectorsCount: number`

  - `error: optional number`

  - `file_embed_errors: optional map[unknown]`

  - `index_source_errors: optional map[unknown]`

  - `last_activity: optional string`

  - `outdated: optional number`

  - `queued: optional number`

  - `running: optional number`

  - `skipped: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/instances/$ID/stats \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "completed": 0,
    "degraded": true,
    "engine": {
      "r2": {
        "metadataSizeBytes": 0,
        "objectCount": 0,
        "payloadSizeBytes": 0
      },
      "vectorize": {
        "dimensions": 0,
        "vectorsCount": 0
      }
    },
    "error": 0,
    "file_embed_errors": {
      "foo": "bar"
    },
    "index_source_errors": {
      "foo": "bar"
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "outdated": 0,
    "queued": 0,
    "running": 0,
    "skipped": 0
  },
  "success": true
}
```
