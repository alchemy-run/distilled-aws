# Jobs

## List Jobs

**get** `/accounts/{account_id}/autorag/rags/{id}/jobs`

List Jobs

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

### Query Parameters

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, source, end_reason, 3 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/jobs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "source": "user",
      "end_reason": "end_reason",
      "ended_at": "ended_at",
      "last_seen_at": "last_seen_at",
      "started_at": "started_at"
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

## Get a Job Details

**get** `/accounts/{account_id}/autorag/rags/{id}/jobs/{job_id}`

Get a Job Details

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

- `job_id: string`

### Returns

- `result: object { id, source, end_reason, 3 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/jobs/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "source": "user",
    "end_reason": "end_reason",
    "ended_at": "ended_at",
    "last_seen_at": "last_seen_at",
    "started_at": "started_at"
  },
  "success": true
}
```

## List Job Logs

**get** `/accounts/{account_id}/autorag/rags/{id}/jobs/{job_id}/logs`

List Job Logs

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/jobs/$JOB_ID/logs \
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

## Domain Types

### Job List Response

- `JobListResponse object { id, source, end_reason, 3 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

### Job Get Response

- `JobGetResponse object { id, source, end_reason, 3 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

### Job Logs Response

- `JobLogsResponse = array of object { id, created_at, message, message_type }`

  - `id: number`

  - `created_at: number`

  - `message: string`

  - `message_type: number`
