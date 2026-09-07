# AutoRAG

## AI Search

**post** `/accounts/{account_id}/autorag/rags/{id}/ai-search`

AI Search

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

### Body Parameters

- `query: string`

- `filters: optional object { key, type, value }  or object { filters, type }`

  - `object { key, type, value }`

    - `key: string`

    - `type: "eq" or "ne" or "gt" or 3 more`

      - `"eq"`

      - `"ne"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

    - `value: string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `object { filters, type }`

    - `filters: array of object { key, type, value }`

      - `key: string`

      - `type: "eq" or "ne" or "gt" or 3 more`

        - `"eq"`

        - `"ne"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `type: "and" or "or"`

      - `"and"`

      - `"or"`

- `max_num_results: optional number`

- `model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/meta/llama-3.1-8b-instruct-fast" or "@cf/meta/llama-3.1-8b-instruct-fp8" or 23 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"anthropic/claude-3-7-sonnet"`

  - `"anthropic/claude-sonnet-4"`

  - `"anthropic/claude-opus-4"`

  - `"anthropic/claude-3-5-haiku"`

  - `"cerebras/qwen-3-235b-a22b-instruct"`

  - `"cerebras/qwen-3-235b-a22b-thinking"`

  - `"cerebras/llama-3.3-70b"`

  - `"cerebras/llama-4-maverick-17b-128e-instruct"`

  - `"cerebras/llama-4-scout-17b-16e-instruct"`

  - `"cerebras/gpt-oss-120b"`

  - `"google-ai-studio/gemini-2.5-flash"`

  - `"google-ai-studio/gemini-2.5-pro"`

  - `"grok/grok-4"`

  - `"groq/llama-3.3-70b-versatile"`

  - `"groq/llama-3.1-8b-instant"`

  - `"openai/gpt-5"`

  - `"openai/gpt-5-mini"`

  - `"openai/gpt-5-nano"`

  - `""`

- `ranking_options: optional object { ranker, score_threshold }`

  - `ranker: optional string`

  - `score_threshold: optional number`

- `reranking: optional object { enabled, model }`

  - `enabled: optional boolean`

  - `model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

- `rewrite_query: optional boolean`

- `stream: optional boolean`

- `system_prompt: optional string`

### Returns

- `result: object { response, search_query, data, 3 more }`

  - `response: string`

  - `search_query: string`

  - `data: optional array of object { score, attributes, content, 2 more }`

    - `score: number`

    - `attributes: optional unknown`

    - `content: optional array of object { text, type }`

      - `text: optional string`

      - `type: optional string`

    - `file_id: optional string`

    - `filename: optional string`

  - `has_more: optional boolean`

  - `next_page: optional string`

  - `object: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/ai-search \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "query": "query"
        }'
```

#### Response

```json
{
  "result": {
    "response": "response",
    "search_query": "search_query",
    "data": [
      {
        "score": 0,
        "attributes": {},
        "content": [
          {
            "text": "text",
            "type": "type"
          }
        ],
        "file_id": "file_id",
        "filename": "filename"
      }
    ],
    "has_more": true,
    "next_page": "next_page",
    "object": "object"
  },
  "success": true
}
```

## Search

**post** `/accounts/{account_id}/autorag/rags/{id}/search`

Search

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

### Body Parameters

- `query: string`

- `filters: optional object { key, type, value }  or object { filters, type }`

  - `object { key, type, value }`

    - `key: string`

    - `type: "eq" or "ne" or "gt" or 3 more`

      - `"eq"`

      - `"ne"`

      - `"gt"`

      - `"gte"`

      - `"lt"`

      - `"lte"`

    - `value: string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `object { filters, type }`

    - `filters: array of object { key, type, value }`

      - `key: string`

      - `type: "eq" or "ne" or "gt" or 3 more`

        - `"eq"`

        - `"ne"`

        - `"gt"`

        - `"gte"`

        - `"lt"`

        - `"lte"`

      - `value: string or number or boolean`

        - `string`

        - `number`

        - `boolean`

    - `type: "and" or "or"`

      - `"and"`

      - `"or"`

- `max_num_results: optional number`

- `ranking_options: optional object { ranker, score_threshold }`

  - `ranker: optional string`

  - `score_threshold: optional number`

- `reranking: optional object { enabled, model }`

  - `enabled: optional boolean`

  - `model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

- `rewrite_query: optional boolean`

### Returns

- `result: object { search_query, data, has_more, 2 more }`

  - `search_query: string`

  - `data: optional array of object { score, attributes, content, 2 more }`

    - `score: number`

    - `attributes: optional unknown`

    - `content: optional array of object { text, type }`

      - `text: optional string`

      - `type: optional string`

    - `file_id: optional string`

    - `filename: optional string`

  - `has_more: optional boolean`

  - `next_page: optional string`

  - `object: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/search \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "query": "query"
        }'
```

#### Response

```json
{
  "result": {
    "search_query": "search_query",
    "data": [
      {
        "score": 0,
        "attributes": {},
        "content": [
          {
            "text": "text",
            "type": "type"
          }
        ],
        "file_id": "file_id",
        "filename": "filename"
      }
    ],
    "has_more": true,
    "next_page": "next_page",
    "object": "object"
  },
  "success": true
}
```

## Sync

**patch** `/accounts/{account_id}/autorag/rags/{id}/sync`

Sync

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

### Returns

- `result: object { job_id }`

  - `job_id: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/sync \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "job_id": "job_id"
  },
  "success": true
}
```

## Files

**get** `/accounts/{account_id}/autorag/rags/{id}/files`

Files

### Path Parameters

- `account_id: string`

- `id: string`

  rag id

### Query Parameters

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

- `status: optional "completed" or "queued" or "running" or "error"`

  - `"completed"`

  - `"queued"`

  - `"running"`

  - `"error"`

### Returns

- `result: array of object { error, key }`

  - `error: string`

  - `key: string`

- `result_info: object { count, page, total_count, per_page }`

  - `count: number`

  - `page: number`

  - `total_count: number`

  - `per_page: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/autorag/rags/$ID/files \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "error": "error",
      "key": "key"
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

## Domain Types

### AutoRAG AI Search Response

- `AutoRAGAISearchResponse object { response, search_query, data, 3 more }`

  - `response: string`

  - `search_query: string`

  - `data: optional array of object { score, attributes, content, 2 more }`

    - `score: number`

    - `attributes: optional unknown`

    - `content: optional array of object { text, type }`

      - `text: optional string`

      - `type: optional string`

    - `file_id: optional string`

    - `filename: optional string`

  - `has_more: optional boolean`

  - `next_page: optional string`

  - `object: optional string`

### AutoRAG Search Response

- `AutoRAGSearchResponse object { search_query, data, has_more, 2 more }`

  - `search_query: string`

  - `data: optional array of object { score, attributes, content, 2 more }`

    - `score: number`

    - `attributes: optional unknown`

    - `content: optional array of object { text, type }`

      - `text: optional string`

      - `type: optional string`

    - `file_id: optional string`

    - `filename: optional string`

  - `has_more: optional boolean`

  - `next_page: optional string`

  - `object: optional string`

### AutoRAG Sync Response

- `AutoRAGSyncResponse object { job_id }`

  - `job_id: string`

### AutoRAG Files Response

- `AutoRAGFilesResponse = array of object { error, key }`

  - `error: string`

  - `key: string`

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
