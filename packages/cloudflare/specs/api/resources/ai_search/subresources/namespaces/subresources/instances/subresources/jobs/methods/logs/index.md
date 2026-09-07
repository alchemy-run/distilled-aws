## List Job Logs

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs/{job_id}/logs`

Lists log entries for an AI Search indexing job.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `job_id: string`

### Query Parameters

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, created_at, message, message_type }`

  - `id: number`

  - `created_at: number`

  - `message: string`

  - `message_type: number`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/jobs/$JOB_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": 0,
      "created_at": 0,
      "message": "message",
      "message_type": 0
    }
  ],
  "result_info": {
    "count": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```
