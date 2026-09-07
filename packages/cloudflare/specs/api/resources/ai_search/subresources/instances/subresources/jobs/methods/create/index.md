## Create new job

**post** `/accounts/{account_id}/ai-search/instances/{id}/jobs`

Creates a new indexing job for an AI Search instance.

### Path Parameters

- `account_id: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

### Body Parameters

- `description: optional string`

### Returns

- `result: object { id, source, description, 4 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `description: optional string`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/instances/$ID/jobs \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "source": "user",
    "description": "description",
    "end_reason": "end_reason",
    "ended_at": "ended_at",
    "last_seen_at": "last_seen_at",
    "started_at": "started_at"
  },
  "success": true
}
```
