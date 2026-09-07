# Namespaces

## List namespaces.

**get** `/accounts/{account_id}/ai-search/namespaces`

List namespaces.

### Path Parameters

- `account_id: string`

### Query Parameters

- `page: optional number`

  Page number (1-indexed).

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Filter namespaces whose name or description contains this string (case-insensitive).

### Returns

- `result: array of object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "created_at": "2019-12-27T18:11:19.117Z",
      "name": "production",
      "description": "Production environment"
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

## Create namespace.

**post** `/accounts/{account_id}/ai-search/namespaces`

Create a new namespace.

### Path Parameters

- `account_id: string`

### Body Parameters

- `name: string`

- `description: optional string`

  Optional description for the namespace. Max 256 characters.

### Returns

- `result: object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "name",
          "description": "Production environment"
        }'
```

#### Response

```json
{
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "production",
    "description": "Production environment"
  },
  "success": true
}
```

## Read namespace.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}`

Read namespace.

### Path Parameters

- `account_id: string`

- `name: string`

### Returns

- `result: object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "production",
    "description": "Production environment"
  },
  "success": true
}
```

## Update namespace.

**put** `/accounts/{account_id}/ai-search/namespaces/{name}`

Update namespace.

### Path Parameters

- `account_id: string`

- `name: string`

### Body Parameters

- `description: optional string`

  Optional description for the namespace. Max 256 characters.

### Returns

- `result: object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "created_at": "2019-12-27T18:11:19.117Z",
    "name": "production",
    "description": "Production environment"
  },
  "success": true
}
```

## Delete namespace.

**delete** `/accounts/{account_id}/ai-search/namespaces/{name}`

Delete namespace.

### Path Parameters

- `account_id: string`

- `name: string`

### Returns

- `result: unknown`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```

## Multi-Instance Search

**post** `/accounts/{account_id}/ai-search/namespaces/{name}/search`

Performs a semantic search query against multiple AI Search instances in parallel, merging the retrieved results into a single ranked response.

### Path Parameters

- `account_id: string`

- `name: string`

### Body Parameters

- `ai_search_options: object { instance_ids, cache, query_rewrite, 2 more }`

  - `instance_ids: array of string`

  - `cache: optional object { cache_threshold, enabled }`

    - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

      - `"super_strict_match"`

      - `"close_enough"`

      - `"flexible_friend"`

      - `"anything_goes"`

    - `enabled: optional boolean`

  - `query_rewrite: optional object { enabled, model, rewrite_prompt }`

    - `enabled: optional boolean`

    - `model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

      - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

      - `"@cf/zai-org/glm-4.7-flash"`

      - `"@cf/meta/llama-3.1-8b-instruct-fast"`

      - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

      - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

      - `"@cf/qwen/qwen3-30b-a3b-fp8"`

      - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

      - `"@cf/moonshotai/kimi-k2-instruct"`

      - `"@cf/google/gemma-3-12b-it"`

      - `"@cf/google/gemma-4-26b-a4b-it"`

      - `"@cf/moonshotai/kimi-k2.5"`

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

    - `rewrite_prompt: optional string`

  - `reranking: optional object { enabled, match_threshold, model }`

    - `enabled: optional boolean`

    - `match_threshold: optional number`

    - `model: optional "@cf/baai/bge-reranker-base" or ""`

      - `"@cf/baai/bge-reranker-base"`

      - `""`

  - `retrieval: optional object { boost_by, context_expansion, filters, 6 more }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `context_expansion: optional number`

    - `filters: optional map[unknown]`

    - `fusion_method: optional "max" or "rrf"`

      - `"max"`

      - `"rrf"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. When omitted, falls back to the instance-level retrieval_options.keyword_match_mode, then to 'and'.

      - `"and"`

      - `"or"`

    - `match_threshold: optional number`

    - `max_num_results: optional number`

    - `retrieval_type: optional "vector" or "keyword" or "hybrid"`

      - `"vector"`

      - `"keyword"`

      - `"hybrid"`

    - `return_on_failure: optional boolean`

- `messages: optional array of object { content, role }`

  OpenAI-compatible message array. For multimodal queries, set the last user message's `content` to an array of typed parts: `[{type:'text', text:'…'}, {type:'image_url', image_url:{url:'…'}}]`. Image inputs require the RAG's embedding_model to declare 'image' in supported_modalities.

  - `content: string or array of object { text, type }  or object { image_url, type }`

    - `string`

    - `array of object { text, type }  or object { image_url, type }`

      - `object { text, type }`

        - `text: string`

        - `type: "text"`

          - `"text"`

      - `object { image_url, type }`

        - `image_url: object { url }`

          - `url: string`

        - `type: "image_url"`

          - `"image_url"`

  - `role: "system" or "developer" or "user" or 2 more`

    - `"system"`

    - `"developer"`

    - `"user"`

    - `"assistant"`

    - `"tool"`

- `query: optional string`

  A simple text query string. Alternative to 'messages' — provide either this or 'messages', not both.

### Returns

- `result: object { chunks, query_kind, errors, search_query }`

  - `chunks: array of object { id, instance_id, score, 4 more }`

    - `id: string`

    - `instance_id: string`

    - `score: number`

    - `text: string`

    - `type: string`

    - `item: optional object { key, metadata, timestamp }`

      - `key: string`

      - `metadata: optional map[unknown]`

      - `timestamp: optional number`

    - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

      - `fusion_method: optional "rrf" or "max"`

        - `"rrf"`

        - `"max"`

      - `keyword_rank: optional number`

      - `keyword_score: optional number`

      - `reranking_score: optional number`

      - `vector_rank: optional number`

      - `vector_score: optional number`

  - `query_kind: "text" or "image" or "multimodal"`

    - `"text"`

    - `"image"`

    - `"multimodal"`

  - `errors: optional array of object { instance_id, message }`

    - `instance_id: string`

    - `message: string`

  - `search_query: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/search \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ai_search_options": {
            "instance_ids": [
              "my-ai-search"
            ]
          }
        }'
```

#### Response

```json
{
  "result": {
    "chunks": [
      {
        "id": "id",
        "instance_id": "instance_id",
        "score": 0,
        "text": "text",
        "type": "type",
        "item": {
          "key": "key",
          "metadata": {
            "foo": "bar"
          },
          "timestamp": 0
        },
        "scoring_details": {
          "fusion_method": "rrf",
          "keyword_rank": 0,
          "keyword_score": 0,
          "reranking_score": 0,
          "vector_rank": 0,
          "vector_score": 0
        }
      }
    ],
    "query_kind": "text",
    "errors": [
      {
        "instance_id": "instance_id",
        "message": "message"
      }
    ],
    "search_query": "search_query"
  },
  "success": true
}
```

## Multi-Instance Chat Completions

**post** `/accounts/{account_id}/ai-search/namespaces/{name}/chat/completions`

Performs a chat completion request against multiple AI Search instances in parallel, merging retrieved content as context for generating a response.

### Path Parameters

- `account_id: string`

- `name: string`

### Body Parameters

- `ai_search_options: object { instance_ids, cache, query_rewrite, 2 more }`

  - `instance_ids: array of string`

  - `cache: optional object { cache_threshold, enabled }`

    - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

      - `"super_strict_match"`

      - `"close_enough"`

      - `"flexible_friend"`

      - `"anything_goes"`

    - `enabled: optional boolean`

  - `query_rewrite: optional object { enabled, model, rewrite_prompt }`

    - `enabled: optional boolean`

    - `model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

      - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

      - `"@cf/zai-org/glm-4.7-flash"`

      - `"@cf/meta/llama-3.1-8b-instruct-fast"`

      - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

      - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

      - `"@cf/qwen/qwen3-30b-a3b-fp8"`

      - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

      - `"@cf/moonshotai/kimi-k2-instruct"`

      - `"@cf/google/gemma-3-12b-it"`

      - `"@cf/google/gemma-4-26b-a4b-it"`

      - `"@cf/moonshotai/kimi-k2.5"`

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

    - `rewrite_prompt: optional string`

  - `reranking: optional object { enabled, match_threshold, model }`

    - `enabled: optional boolean`

    - `match_threshold: optional number`

    - `model: optional "@cf/baai/bge-reranker-base" or ""`

      - `"@cf/baai/bge-reranker-base"`

      - `""`

  - `retrieval: optional object { boost_by, context_expansion, filters, 6 more }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `context_expansion: optional number`

    - `filters: optional map[unknown]`

    - `fusion_method: optional "max" or "rrf"`

      - `"max"`

      - `"rrf"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. When omitted, falls back to the instance-level retrieval_options.keyword_match_mode, then to 'and'.

      - `"and"`

      - `"or"`

    - `match_threshold: optional number`

    - `max_num_results: optional number`

    - `retrieval_type: optional "vector" or "keyword" or "hybrid"`

      - `"vector"`

      - `"keyword"`

      - `"hybrid"`

    - `return_on_failure: optional boolean`

- `messages: array of object { content, role }`

  - `content: string or array of object { text, type }  or object { image_url, type }`

    - `string`

    - `array of object { text, type }  or object { image_url, type }`

      - `object { text, type }`

        - `text: string`

        - `type: "text"`

          - `"text"`

      - `object { image_url, type }`

        - `image_url: object { url }`

          - `url: string`

        - `type: "image_url"`

          - `"image_url"`

  - `role: "system" or "developer" or "user" or 2 more`

    - `"system"`

    - `"developer"`

    - `"user"`

    - `"assistant"`

    - `"tool"`

- `model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/zai-org/glm-4.7-flash"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"@cf/google/gemma-3-12b-it"`

  - `"@cf/google/gemma-4-26b-a4b-it"`

  - `"@cf/moonshotai/kimi-k2.5"`

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

- `stream: optional boolean`

### Returns

- `choices: array of object { message, index }`

  - `message: object { content, role }`

    - `content: string or array of object { text, type }  or object { image_url, type }`

      - `string`

      - `array of object { text, type }  or object { image_url, type }`

        - `object { text, type }`

          - `text: string`

          - `type: "text"`

            - `"text"`

        - `object { image_url, type }`

          - `image_url: object { url }`

            - `url: string`

          - `type: "image_url"`

            - `"image_url"`

    - `role: "system" or "developer" or "user" or 2 more`

      - `"system"`

      - `"developer"`

      - `"user"`

      - `"assistant"`

      - `"tool"`

  - `index: optional number`

- `chunks: array of object { id, instance_id, score, 4 more }`

  - `id: string`

  - `instance_id: string`

  - `score: number`

  - `text: string`

  - `type: string`

  - `item: optional object { key, metadata, timestamp }`

    - `key: string`

    - `metadata: optional map[unknown]`

    - `timestamp: optional number`

  - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

    - `fusion_method: optional "rrf" or "max"`

      - `"rrf"`

      - `"max"`

    - `keyword_rank: optional number`

    - `keyword_score: optional number`

    - `reranking_score: optional number`

    - `vector_rank: optional number`

    - `vector_score: optional number`

- `id: optional string`

- `errors: optional array of object { instance_id, message }`

  - `instance_id: string`

  - `message: string`

- `model: optional string`

- `object: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/chat/completions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ai_search_options": {
            "instance_ids": [
              "my-ai-search"
            ]
          },
          "messages": [
            {
              "content": "string",
              "role": "system"
            }
          ]
        }'
```

#### Response

```json
{
  "choices": [
    {
      "message": {
        "content": "string",
        "role": "system"
      },
      "index": 0
    }
  ],
  "chunks": [
    {
      "id": "id",
      "instance_id": "instance_id",
      "score": 0,
      "text": "text",
      "type": "type",
      "item": {
        "key": "key",
        "metadata": {
          "foo": "bar"
        },
        "timestamp": 0
      },
      "scoring_details": {
        "fusion_method": "rrf",
        "keyword_rank": 0,
        "keyword_score": 0,
        "reranking_score": 0,
        "vector_rank": 0,
        "vector_score": 0
      }
    }
  ],
  "id": "id",
  "errors": [
    {
      "instance_id": "instance_id",
      "message": "message"
    }
  ],
  "model": "model",
  "object": "object"
}
```

## Domain Types

### Namespace List Response

- `NamespaceListResponse object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

### Namespace Create Response

- `NamespaceCreateResponse object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

### Namespace Read Response

- `NamespaceReadResponse object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

### Namespace Update Response

- `NamespaceUpdateResponse object { created_at, name, description }`

  - `created_at: string`

  - `name: string`

  - `description: optional string`

    Optional description for the namespace. Max 256 characters.

### Namespace Delete Response

- `NamespaceDeleteResponse = unknown`

### Namespace Search Response

- `NamespaceSearchResponse object { chunks, query_kind, errors, search_query }`

  - `chunks: array of object { id, instance_id, score, 4 more }`

    - `id: string`

    - `instance_id: string`

    - `score: number`

    - `text: string`

    - `type: string`

    - `item: optional object { key, metadata, timestamp }`

      - `key: string`

      - `metadata: optional map[unknown]`

      - `timestamp: optional number`

    - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

      - `fusion_method: optional "rrf" or "max"`

        - `"rrf"`

        - `"max"`

      - `keyword_rank: optional number`

      - `keyword_score: optional number`

      - `reranking_score: optional number`

      - `vector_rank: optional number`

      - `vector_score: optional number`

  - `query_kind: "text" or "image" or "multimodal"`

    - `"text"`

    - `"image"`

    - `"multimodal"`

  - `errors: optional array of object { instance_id, message }`

    - `instance_id: string`

    - `message: string`

  - `search_query: optional string`

### Namespace Chat Completions Response

- `NamespaceChatCompletionsResponse object { choices, chunks, id, 3 more }`

  - `choices: array of object { message, index }`

    - `message: object { content, role }`

      - `content: string or array of object { text, type }  or object { image_url, type }`

        - `string`

        - `array of object { text, type }  or object { image_url, type }`

          - `object { text, type }`

            - `text: string`

            - `type: "text"`

              - `"text"`

          - `object { image_url, type }`

            - `image_url: object { url }`

              - `url: string`

            - `type: "image_url"`

              - `"image_url"`

      - `role: "system" or "developer" or "user" or 2 more`

        - `"system"`

        - `"developer"`

        - `"user"`

        - `"assistant"`

        - `"tool"`

    - `index: optional number`

  - `chunks: array of object { id, instance_id, score, 4 more }`

    - `id: string`

    - `instance_id: string`

    - `score: number`

    - `text: string`

    - `type: string`

    - `item: optional object { key, metadata, timestamp }`

      - `key: string`

      - `metadata: optional map[unknown]`

      - `timestamp: optional number`

    - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

      - `fusion_method: optional "rrf" or "max"`

        - `"rrf"`

        - `"max"`

      - `keyword_rank: optional number`

      - `keyword_score: optional number`

      - `reranking_score: optional number`

      - `vector_rank: optional number`

      - `vector_score: optional number`

  - `id: optional string`

  - `errors: optional array of object { instance_id, message }`

    - `instance_id: string`

    - `message: string`

  - `model: optional string`

  - `object: optional string`

# Instances

## List instances.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances`

List instances.

### Path Parameters

- `account_id: string`

- `name: string`

### Query Parameters

- `namespace: optional string`

  Filter by namespace.

- `order_by: optional "created_at"`

  Field to order results by.

  - `"created_at"`

- `order_by_direction: optional "asc" or "desc"`

  Order direction.

  - `"asc"`

  - `"desc"`

- `page: optional number`

  Page number (1-indexed).

- `per_page: optional number`

  Number of results per page.

- `search: optional string`

  Filter instances whose id contains this string (case-insensitive).

### Returns

- `result: array of object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

- `result_info: object { count, page, per_page, total_count }`

  - `count: number`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "my-ai-search",
      "created_at": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "ai_gateway_id": "ai_gateway_id",
      "ai_search_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "cache": true,
      "cache_threshold": "super_strict_match",
      "cache_ttl": 600,
      "chunk_overlap": 0,
      "chunk_size": 64,
      "created_by": "created_by",
      "custom_metadata": [
        {
          "data_type": "text",
          "field_name": "x"
        }
      ],
      "embedding_model": "@cf/qwen/qwen3-embedding-0.6b",
      "enable": true,
      "engine_version": 0,
      "fusion_method": "max",
      "hybrid_search_enabled": true,
      "index_method": {
        "keyword": true,
        "vector": true
      },
      "indexing_options": {
        "keyword_tokenizer": "porter"
      },
      "last_activity": "2019-12-27T18:11:19.117Z",
      "max_num_results": 1,
      "metadata": {
        "created_from_aisearch_wizard": true,
        "worker_domain": "worker_domain"
      },
      "modified_by": "modified_by",
      "namespace": "namespace",
      "paused": true,
      "public_endpoint_id": "public_endpoint_id",
      "public_endpoint_params": {
        "authorized_hosts": [
          "string"
        ],
        "chat_completions_endpoint": {
          "disabled": true
        },
        "custom_domains": [
          "search.example.com"
        ],
        "enabled": true,
        "mcp": {
          "description": "description",
          "disabled": true
        },
        "rate_limit": {
          "period_ms": 60000,
          "requests": 1,
          "technique": "fixed"
        },
        "search_endpoint": {
          "disabled": true
        }
      },
      "reranking": true,
      "reranking_model": "@cf/baai/bge-reranker-base",
      "retrieval_options": {
        "boost_by": [
          {
            "field": "timestamp",
            "direction": "desc"
          }
        ],
        "keyword_match_mode": "and"
      },
      "rewrite_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
      "rewrite_query": true,
      "score_threshold": 0,
      "source": "source",
      "source_params": {
        "exclude_items": [
          "/admin/**",
          "/private/**",
          "**\\temp\\**"
        ],
        "include_items": [
          "/blog/**",
          "/docs/**/*.html",
          "**\\blog\\**.html"
        ],
        "prefix": "prefix",
        "r2_jurisdiction": "r2_jurisdiction",
        "web_crawler": {
          "parse_options": {
            "content_selector": [
              {
                "path": "**/blog/**",
                "selector": "article div.post-body"
              },
              {
                "path": "**/docs/**",
                "selector": "main"
              }
            ],
            "include_headers": {
              "cache-control": "no-cache, no-store"
            },
            "include_images": true,
            "specific_sitemaps": [
              "https://example.com/sitemap.xml",
              "https://example.com/blog-sitemap.xml"
            ],
            "use_browser_rendering": true
          },
          "parse_type": "sitemap"
        }
      },
      "status": "status",
      "sync_interval": 900,
      "token_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "type": "r2"
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

## Create new instance.

**post** `/accounts/{account_id}/ai-search/namespaces/{name}/instances`

Create a new instance.

### Path Parameters

- `account_id: string`

- `name: string`

### Body Parameters

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `ai_gateway_id: optional string`

- `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/zai-org/glm-4.7-flash"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"@cf/google/gemma-3-12b-it"`

  - `"@cf/google/gemma-4-26b-a4b-it"`

  - `"@cf/moonshotai/kimi-k2.5"`

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

- `cache: optional boolean`

- `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

  - `"super_strict_match"`

  - `"close_enough"`

  - `"flexible_friend"`

  - `"anything_goes"`

- `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

  Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

  - `600`

  - `1800`

  - `3600`

  - `7200`

  - `21600`

  - `43200`

  - `86400`

  - `172800`

  - `259200`

  - `518400`

- `chunk: optional boolean`

- `chunk_overlap: optional number`

- `chunk_size: optional number`

- `custom_metadata: optional array of object { data_type, field_name }`

  - `data_type: "text" or "number" or "boolean" or "datetime"`

    - `"text"`

    - `"number"`

    - `"boolean"`

    - `"datetime"`

  - `field_name: string`

- `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

  - `"@cf/qwen/qwen3-embedding-0.6b"`

  - `"@cf/qwen/qwen3-vl-embedding-2b"`

  - `"@cf/baai/bge-m3"`

  - `"@cf/baai/bge-large-en-v1.5"`

  - `"@cf/google/embeddinggemma-300m"`

  - `"google-ai-studio/gemini-embedding-001"`

  - `"google-ai-studio/gemini-embedding-2-preview"`

  - `"google-ai-studio/gemini-embedding-2"`

  - `"openai/text-embedding-3-small"`

  - `"openai/text-embedding-3-large"`

  - `""`

- `fusion_method: optional "max" or "rrf"`

  - `"max"`

  - `"rrf"`

- `hybrid_search_enabled: optional boolean`

  Deprecated — use index_method instead.

- `index_method: optional object { keyword, vector }`

  Controls which storage backends are used during indexing. Defaults to vector-only.

  - `keyword: boolean`

    Enable keyword (BM25) storage backend.

  - `vector: boolean`

    Enable vector (embedding) storage backend.

- `indexing_options: optional object { keyword_tokenizer }`

  - `keyword_tokenizer: optional "porter" or "trigram"`

    Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

    - `"porter"`

    - `"trigram"`

- `max_num_results: optional number`

- `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

  - `created_from_aisearch_wizard: optional boolean`

  - `worker_domain: optional string`

- `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

  - `authorized_hosts: optional array of string`

  - `chat_completions_endpoint: optional object { disabled }`

    - `disabled: optional boolean`

      Disable chat completions endpoint for this public endpoint

  - `custom_domains: optional array of string`

    Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

  - `enabled: optional boolean`

  - `mcp: optional object { description, disabled }`

    - `description: optional string`

    - `disabled: optional boolean`

      Disable MCP endpoint for this public endpoint

  - `rate_limit: optional object { period_ms, requests, technique }`

    - `period_ms: optional number`

    - `requests: optional number`

    - `technique: optional "fixed" or "sliding"`

      - `"fixed"`

      - `"sliding"`

  - `search_endpoint: optional object { disabled }`

    - `disabled: optional boolean`

      Disable search endpoint for this public endpoint

- `reranking: optional boolean`

- `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

  - `"@cf/baai/bge-reranker-base"`

  - `""`

- `retrieval_options: optional object { boost_by, keyword_match_mode }`

  - `boost_by: optional array of object { field, direction }`

    Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

    - `field: string`

      Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

    - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

      Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

      - `"asc"`

      - `"desc"`

      - `"exists"`

      - `"not_exists"`

  - `keyword_match_mode: optional "and" or "or"`

    Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

    - `"and"`

    - `"or"`

- `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/zai-org/glm-4.7-flash"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"@cf/google/gemma-3-12b-it"`

  - `"@cf/google/gemma-4-26b-a4b-it"`

  - `"@cf/moonshotai/kimi-k2.5"`

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

- `rewrite_query: optional boolean`

- `score_threshold: optional number`

- `source: optional string`

- `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

  - `exclude_items: optional array of string`

    List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

  - `include_items: optional array of string`

    List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

  - `prefix: optional string`

  - `r2_jurisdiction: optional string`

  - `web_crawler: optional object { parse_options, parse_type }`

    - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

      - `content_selector: optional array of object { path, selector }`

        List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

        - `path: string`

          Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

        - `selector: string`

          CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

      - `include_headers: optional map[string]`

        Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

      - `include_images: optional boolean`

      - `specific_sitemaps: optional array of string`

        List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

      - `use_browser_rendering: optional boolean`

    - `parse_type: optional "sitemap" or "crawl"`

      - `"sitemap"`

      - `"crawl"`

- `sync_interval: optional 900 or 1800 or 3600 or 5 more`

  Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

  - `900`

  - `1800`

  - `3600`

  - `7200`

  - `14400`

  - `21600`

  - `43200`

  - `86400`

- `token_id: optional string`

- `type: optional "r2" or "web-crawler"`

  - `"r2"`

  - `"web-crawler"`

### Returns

- `result: object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "my-ai-search"
        }'
```

#### Response

```json
{
  "result": {
    "id": "my-ai-search",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "ai_gateway_id": "ai_gateway_id",
    "ai_search_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "cache": true,
    "cache_threshold": "super_strict_match",
    "cache_ttl": 600,
    "chunk_overlap": 0,
    "chunk_size": 64,
    "created_by": "created_by",
    "custom_metadata": [
      {
        "data_type": "text",
        "field_name": "x"
      }
    ],
    "embedding_model": "@cf/qwen/qwen3-embedding-0.6b",
    "enable": true,
    "engine_version": 0,
    "fusion_method": "max",
    "hybrid_search_enabled": true,
    "index_method": {
      "keyword": true,
      "vector": true
    },
    "indexing_options": {
      "keyword_tokenizer": "porter"
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "max_num_results": 1,
    "metadata": {
      "created_from_aisearch_wizard": true,
      "worker_domain": "worker_domain"
    },
    "modified_by": "modified_by",
    "namespace": "namespace",
    "paused": true,
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "enabled": true,
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    },
    "reranking": true,
    "reranking_model": "@cf/baai/bge-reranker-base",
    "retrieval_options": {
      "boost_by": [
        {
          "field": "timestamp",
          "direction": "desc"
        }
      ],
      "keyword_match_mode": "and"
    },
    "rewrite_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "rewrite_query": true,
    "score_threshold": 0,
    "source": "source",
    "source_params": {
      "exclude_items": [
        "/admin/**",
        "/private/**",
        "**\\temp\\**"
      ],
      "include_items": [
        "/blog/**",
        "/docs/**/*.html",
        "**\\blog\\**.html"
      ],
      "prefix": "prefix",
      "r2_jurisdiction": "r2_jurisdiction",
      "web_crawler": {
        "parse_options": {
          "content_selector": [
            {
              "path": "**/blog/**",
              "selector": "article div.post-body"
            },
            {
              "path": "**/docs/**",
              "selector": "main"
            }
          ],
          "include_headers": {
            "cache-control": "no-cache, no-store"
          },
          "include_images": true,
          "specific_sitemaps": [
            "https://example.com/sitemap.xml",
            "https://example.com/blog-sitemap.xml"
          ],
          "use_browser_rendering": true
        },
        "parse_type": "sitemap"
      }
    },
    "status": "status",
    "sync_interval": 900,
    "token_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "type": "r2"
  },
  "success": true
}
```

## Read instance.

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}`

Read instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

### Returns

- `result: object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "my-ai-search",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "ai_gateway_id": "ai_gateway_id",
    "ai_search_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "cache": true,
    "cache_threshold": "super_strict_match",
    "cache_ttl": 600,
    "chunk_overlap": 0,
    "chunk_size": 64,
    "created_by": "created_by",
    "custom_metadata": [
      {
        "data_type": "text",
        "field_name": "x"
      }
    ],
    "embedding_model": "@cf/qwen/qwen3-embedding-0.6b",
    "enable": true,
    "engine_version": 0,
    "fusion_method": "max",
    "hybrid_search_enabled": true,
    "index_method": {
      "keyword": true,
      "vector": true
    },
    "indexing_options": {
      "keyword_tokenizer": "porter"
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "max_num_results": 1,
    "metadata": {
      "created_from_aisearch_wizard": true,
      "worker_domain": "worker_domain"
    },
    "modified_by": "modified_by",
    "namespace": "namespace",
    "paused": true,
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "enabled": true,
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    },
    "reranking": true,
    "reranking_model": "@cf/baai/bge-reranker-base",
    "retrieval_options": {
      "boost_by": [
        {
          "field": "timestamp",
          "direction": "desc"
        }
      ],
      "keyword_match_mode": "and"
    },
    "rewrite_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "rewrite_query": true,
    "score_threshold": 0,
    "source": "source",
    "source_params": {
      "exclude_items": [
        "/admin/**",
        "/private/**",
        "**\\temp\\**"
      ],
      "include_items": [
        "/blog/**",
        "/docs/**/*.html",
        "**\\blog\\**.html"
      ],
      "prefix": "prefix",
      "r2_jurisdiction": "r2_jurisdiction",
      "web_crawler": {
        "parse_options": {
          "content_selector": [
            {
              "path": "**/blog/**",
              "selector": "article div.post-body"
            },
            {
              "path": "**/docs/**",
              "selector": "main"
            }
          ],
          "include_headers": {
            "cache-control": "no-cache, no-store"
          },
          "include_images": true,
          "specific_sitemaps": [
            "https://example.com/sitemap.xml",
            "https://example.com/blog-sitemap.xml"
          ],
          "use_browser_rendering": true
        },
        "parse_type": "sitemap"
      }
    },
    "status": "status",
    "sync_interval": 900,
    "token_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "type": "r2"
  },
  "success": true
}
```

## Update instance.

**put** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}`

Update instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

### Body Parameters

- `ai_gateway_id: optional string`

- `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/zai-org/glm-4.7-flash"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"@cf/google/gemma-3-12b-it"`

  - `"@cf/google/gemma-4-26b-a4b-it"`

  - `"@cf/moonshotai/kimi-k2.5"`

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

- `cache: optional boolean`

- `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

  - `"super_strict_match"`

  - `"close_enough"`

  - `"flexible_friend"`

  - `"anything_goes"`

- `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

  Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

  - `600`

  - `1800`

  - `3600`

  - `7200`

  - `21600`

  - `43200`

  - `86400`

  - `172800`

  - `259200`

  - `518400`

- `chunk: optional boolean`

- `chunk_overlap: optional number`

- `chunk_size: optional number`

- `custom_metadata: optional array of object { data_type, field_name }`

  - `data_type: "text" or "number" or "boolean" or "datetime"`

    - `"text"`

    - `"number"`

    - `"boolean"`

    - `"datetime"`

  - `field_name: string`

- `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

  - `"@cf/qwen/qwen3-embedding-0.6b"`

  - `"@cf/qwen/qwen3-vl-embedding-2b"`

  - `"@cf/baai/bge-m3"`

  - `"@cf/baai/bge-large-en-v1.5"`

  - `"@cf/google/embeddinggemma-300m"`

  - `"google-ai-studio/gemini-embedding-001"`

  - `"google-ai-studio/gemini-embedding-2-preview"`

  - `"google-ai-studio/gemini-embedding-2"`

  - `"openai/text-embedding-3-small"`

  - `"openai/text-embedding-3-large"`

  - `""`

- `fusion_method: optional "max" or "rrf"`

  - `"max"`

  - `"rrf"`

- `index_method: optional object { keyword, vector }`

  Controls which storage backends are used during indexing. Defaults to vector-only.

  - `keyword: boolean`

    Enable keyword (BM25) storage backend.

  - `vector: boolean`

    Enable vector (embedding) storage backend.

- `indexing_options: optional object { keyword_tokenizer }`

  - `keyword_tokenizer: optional "porter" or "trigram"`

    Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

    - `"porter"`

    - `"trigram"`

- `max_num_results: optional number`

- `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

  - `created_from_aisearch_wizard: optional boolean`

  - `worker_domain: optional string`

- `paused: optional boolean`

- `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

  - `authorized_hosts: optional array of string`

  - `chat_completions_endpoint: optional object { disabled }`

    - `disabled: optional boolean`

      Disable chat completions endpoint for this public endpoint

  - `custom_domains: optional array of string`

    Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

  - `enabled: optional boolean`

  - `mcp: optional object { description, disabled }`

    - `description: optional string`

    - `disabled: optional boolean`

      Disable MCP endpoint for this public endpoint

  - `rate_limit: optional object { period_ms, requests, technique }`

    - `period_ms: optional number`

    - `requests: optional number`

    - `technique: optional "fixed" or "sliding"`

      - `"fixed"`

      - `"sliding"`

  - `search_endpoint: optional object { disabled }`

    - `disabled: optional boolean`

      Disable search endpoint for this public endpoint

- `reranking: optional boolean`

- `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

  - `"@cf/baai/bge-reranker-base"`

  - `""`

- `retrieval_options: optional object { boost_by, keyword_match_mode }`

  - `boost_by: optional array of object { field, direction }`

    Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

    - `field: string`

      Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

    - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

      Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

      - `"asc"`

      - `"desc"`

      - `"exists"`

      - `"not_exists"`

  - `keyword_match_mode: optional "and" or "or"`

    Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

    - `"and"`

    - `"or"`

- `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/zai-org/glm-4.7-flash"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"@cf/google/gemma-3-12b-it"`

  - `"@cf/google/gemma-4-26b-a4b-it"`

  - `"@cf/moonshotai/kimi-k2.5"`

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

- `rewrite_query: optional boolean`

- `score_threshold: optional number`

- `source: optional string`

- `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

  - `exclude_items: optional array of string`

    List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

  - `include_items: optional array of string`

    List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

  - `prefix: optional string`

  - `r2_jurisdiction: optional string`

  - `web_crawler: optional object { parse_options, parse_type }`

    - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

      - `content_selector: optional array of object { path, selector }`

        List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

        - `path: string`

          Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

        - `selector: string`

          CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

      - `include_headers: optional map[string]`

        Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

      - `include_images: optional boolean`

      - `specific_sitemaps: optional array of string`

        List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

      - `use_browser_rendering: optional boolean`

    - `parse_type: optional "sitemap" or "crawl"`

      - `"sitemap"`

      - `"crawl"`

- `summarization: optional boolean`

- `summarization_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/zai-org/glm-4.7-flash"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"@cf/google/gemma-3-12b-it"`

  - `"@cf/google/gemma-4-26b-a4b-it"`

  - `"@cf/moonshotai/kimi-k2.5"`

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

- `sync_interval: optional 900 or 1800 or 3600 or 5 more`

  Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

  - `900`

  - `1800`

  - `3600`

  - `7200`

  - `14400`

  - `21600`

  - `43200`

  - `86400`

- `system_prompt_ai_search: optional string`

- `system_prompt_index_summarization: optional string`

- `system_prompt_rewrite_query: optional string`

- `token_id: optional string`

### Returns

- `result: object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "my-ai-search",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "ai_gateway_id": "ai_gateway_id",
    "ai_search_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "cache": true,
    "cache_threshold": "super_strict_match",
    "cache_ttl": 600,
    "chunk_overlap": 0,
    "chunk_size": 64,
    "created_by": "created_by",
    "custom_metadata": [
      {
        "data_type": "text",
        "field_name": "x"
      }
    ],
    "embedding_model": "@cf/qwen/qwen3-embedding-0.6b",
    "enable": true,
    "engine_version": 0,
    "fusion_method": "max",
    "hybrid_search_enabled": true,
    "index_method": {
      "keyword": true,
      "vector": true
    },
    "indexing_options": {
      "keyword_tokenizer": "porter"
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "max_num_results": 1,
    "metadata": {
      "created_from_aisearch_wizard": true,
      "worker_domain": "worker_domain"
    },
    "modified_by": "modified_by",
    "namespace": "namespace",
    "paused": true,
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "enabled": true,
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    },
    "reranking": true,
    "reranking_model": "@cf/baai/bge-reranker-base",
    "retrieval_options": {
      "boost_by": [
        {
          "field": "timestamp",
          "direction": "desc"
        }
      ],
      "keyword_match_mode": "and"
    },
    "rewrite_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "rewrite_query": true,
    "score_threshold": 0,
    "source": "source",
    "source_params": {
      "exclude_items": [
        "/admin/**",
        "/private/**",
        "**\\temp\\**"
      ],
      "include_items": [
        "/blog/**",
        "/docs/**/*.html",
        "**\\blog\\**.html"
      ],
      "prefix": "prefix",
      "r2_jurisdiction": "r2_jurisdiction",
      "web_crawler": {
        "parse_options": {
          "content_selector": [
            {
              "path": "**/blog/**",
              "selector": "article div.post-body"
            },
            {
              "path": "**/docs/**",
              "selector": "main"
            }
          ],
          "include_headers": {
            "cache-control": "no-cache, no-store"
          },
          "include_images": true,
          "specific_sitemaps": [
            "https://example.com/sitemap.xml",
            "https://example.com/blog-sitemap.xml"
          ],
          "use_browser_rendering": true
        },
        "parse_type": "sitemap"
      }
    },
    "status": "status",
    "sync_interval": 900,
    "token_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "type": "r2"
  },
  "success": true
}
```

## Delete instance.

**delete** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}`

Delete instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

### Returns

- `result: object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "my-ai-search",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "ai_gateway_id": "ai_gateway_id",
    "ai_search_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "cache": true,
    "cache_threshold": "super_strict_match",
    "cache_ttl": 600,
    "chunk_overlap": 0,
    "chunk_size": 64,
    "created_by": "created_by",
    "custom_metadata": [
      {
        "data_type": "text",
        "field_name": "x"
      }
    ],
    "embedding_model": "@cf/qwen/qwen3-embedding-0.6b",
    "enable": true,
    "engine_version": 0,
    "fusion_method": "max",
    "hybrid_search_enabled": true,
    "index_method": {
      "keyword": true,
      "vector": true
    },
    "indexing_options": {
      "keyword_tokenizer": "porter"
    },
    "last_activity": "2019-12-27T18:11:19.117Z",
    "max_num_results": 1,
    "metadata": {
      "created_from_aisearch_wizard": true,
      "worker_domain": "worker_domain"
    },
    "modified_by": "modified_by",
    "namespace": "namespace",
    "paused": true,
    "public_endpoint_id": "public_endpoint_id",
    "public_endpoint_params": {
      "authorized_hosts": [
        "string"
      ],
      "chat_completions_endpoint": {
        "disabled": true
      },
      "custom_domains": [
        "search.example.com"
      ],
      "enabled": true,
      "mcp": {
        "description": "description",
        "disabled": true
      },
      "rate_limit": {
        "period_ms": 60000,
        "requests": 1,
        "technique": "fixed"
      },
      "search_endpoint": {
        "disabled": true
      }
    },
    "reranking": true,
    "reranking_model": "@cf/baai/bge-reranker-base",
    "retrieval_options": {
      "boost_by": [
        {
          "field": "timestamp",
          "direction": "desc"
        }
      ],
      "keyword_match_mode": "and"
    },
    "rewrite_model": "@cf/meta/llama-3.3-70b-instruct-fp8-fast",
    "rewrite_query": true,
    "score_threshold": 0,
    "source": "source",
    "source_params": {
      "exclude_items": [
        "/admin/**",
        "/private/**",
        "**\\temp\\**"
      ],
      "include_items": [
        "/blog/**",
        "/docs/**/*.html",
        "**\\blog\\**.html"
      ],
      "prefix": "prefix",
      "r2_jurisdiction": "r2_jurisdiction",
      "web_crawler": {
        "parse_options": {
          "content_selector": [
            {
              "path": "**/blog/**",
              "selector": "article div.post-body"
            },
            {
              "path": "**/docs/**",
              "selector": "main"
            }
          ],
          "include_headers": {
            "cache-control": "no-cache, no-store"
          },
          "include_images": true,
          "specific_sitemaps": [
            "https://example.com/sitemap.xml",
            "https://example.com/blog-sitemap.xml"
          ],
          "use_browser_rendering": true
        },
        "parse_type": "sitemap"
      }
    },
    "status": "status",
    "sync_interval": 900,
    "token_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "type": "r2"
  },
  "success": true
}
```

## Stats

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/stats`

Retrieves usage statistics for AI Search instances.

### Path Parameters

- `account_id: string`

- `name: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/stats \
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

## Search

**post** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/search`

Executes a semantic search query against an AI Search instance to find relevant indexed content.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

### Body Parameters

- `ai_search_options: optional object { cache, query_rewrite, reranking, retrieval }`

  - `cache: optional object { cache_threshold, enabled }`

    - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

      - `"super_strict_match"`

      - `"close_enough"`

      - `"flexible_friend"`

      - `"anything_goes"`

    - `enabled: optional boolean`

  - `query_rewrite: optional object { enabled, model, rewrite_prompt }`

    - `enabled: optional boolean`

    - `model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

      - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

      - `"@cf/zai-org/glm-4.7-flash"`

      - `"@cf/meta/llama-3.1-8b-instruct-fast"`

      - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

      - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

      - `"@cf/qwen/qwen3-30b-a3b-fp8"`

      - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

      - `"@cf/moonshotai/kimi-k2-instruct"`

      - `"@cf/google/gemma-3-12b-it"`

      - `"@cf/google/gemma-4-26b-a4b-it"`

      - `"@cf/moonshotai/kimi-k2.5"`

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

    - `rewrite_prompt: optional string`

  - `reranking: optional object { enabled, match_threshold, model }`

    - `enabled: optional boolean`

    - `match_threshold: optional number`

    - `model: optional "@cf/baai/bge-reranker-base" or ""`

      - `"@cf/baai/bge-reranker-base"`

      - `""`

  - `retrieval: optional object { boost_by, context_expansion, filters, 6 more }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `context_expansion: optional number`

    - `filters: optional map[unknown]`

    - `fusion_method: optional "max" or "rrf"`

      - `"max"`

      - `"rrf"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. When omitted, falls back to the instance-level retrieval_options.keyword_match_mode, then to 'and'.

      - `"and"`

      - `"or"`

    - `match_threshold: optional number`

    - `max_num_results: optional number`

    - `retrieval_type: optional "vector" or "keyword" or "hybrid"`

      - `"vector"`

      - `"keyword"`

      - `"hybrid"`

    - `return_on_failure: optional boolean`

- `messages: optional array of object { content, role }`

  OpenAI-compatible message array. For multimodal queries, set the last user message's `content` to an array of typed parts: `[{type:'text', text:'…'}, {type:'image_url', image_url:{url:'…'}}]`. Image inputs require the RAG's embedding_model to declare 'image' in supported_modalities.

  - `content: string or array of object { text, type }  or object { image_url, type }`

    - `string`

    - `array of object { text, type }  or object { image_url, type }`

      - `object { text, type }`

        - `text: string`

        - `type: "text"`

          - `"text"`

      - `object { image_url, type }`

        - `image_url: object { url }`

          - `url: string`

        - `type: "image_url"`

          - `"image_url"`

  - `role: "system" or "developer" or "user" or 2 more`

    - `"system"`

    - `"developer"`

    - `"user"`

    - `"assistant"`

    - `"tool"`

- `query: optional string`

  A simple text query string. Alternative to 'messages' — provide either this or 'messages', not both.

### Returns

- `result: object { chunks, query_kind, search_query }`

  - `chunks: array of object { id, score, text, 3 more }`

    - `id: string`

    - `score: number`

    - `text: string`

    - `type: string`

    - `item: optional object { key, metadata, timestamp }`

      - `key: string`

      - `metadata: optional map[unknown]`

      - `timestamp: optional number`

    - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

      - `fusion_method: optional "rrf" or "max"`

        - `"rrf"`

        - `"max"`

      - `keyword_rank: optional number`

      - `keyword_score: optional number`

      - `reranking_score: optional number`

      - `vector_rank: optional number`

      - `vector_score: optional number`

  - `query_kind: "text" or "image" or "multimodal"`

    - `"text"`

    - `"image"`

    - `"multimodal"`

  - `search_query: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/search \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "chunks": [
      {
        "id": "id",
        "score": 0,
        "text": "text",
        "type": "type",
        "item": {
          "key": "key",
          "metadata": {
            "foo": "bar"
          },
          "timestamp": 0
        },
        "scoring_details": {
          "fusion_method": "rrf",
          "keyword_rank": 0,
          "keyword_score": 0,
          "reranking_score": 0,
          "vector_rank": 0,
          "vector_score": 0
        }
      }
    ],
    "query_kind": "text",
    "search_query": "search_query"
  },
  "success": true
}
```

## Chat Completions

**post** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/chat/completions`

Performs a chat completion request against an AI Search instance, using indexed content as context for generating responses.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

### Body Parameters

- `messages: array of object { content, role }`

  - `content: string or array of object { text, type }  or object { image_url, type }`

    - `string`

    - `array of object { text, type }  or object { image_url, type }`

      - `object { text, type }`

        - `text: string`

        - `type: "text"`

          - `"text"`

      - `object { image_url, type }`

        - `image_url: object { url }`

          - `url: string`

        - `type: "image_url"`

          - `"image_url"`

  - `role: "system" or "developer" or "user" or 2 more`

    - `"system"`

    - `"developer"`

    - `"user"`

    - `"assistant"`

    - `"tool"`

- `ai_search_options: optional object { cache, query_rewrite, reranking, retrieval }`

  - `cache: optional object { cache_threshold, enabled }`

    - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

      - `"super_strict_match"`

      - `"close_enough"`

      - `"flexible_friend"`

      - `"anything_goes"`

    - `enabled: optional boolean`

  - `query_rewrite: optional object { enabled, model, rewrite_prompt }`

    - `enabled: optional boolean`

    - `model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

      - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

      - `"@cf/zai-org/glm-4.7-flash"`

      - `"@cf/meta/llama-3.1-8b-instruct-fast"`

      - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

      - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

      - `"@cf/qwen/qwen3-30b-a3b-fp8"`

      - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

      - `"@cf/moonshotai/kimi-k2-instruct"`

      - `"@cf/google/gemma-3-12b-it"`

      - `"@cf/google/gemma-4-26b-a4b-it"`

      - `"@cf/moonshotai/kimi-k2.5"`

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

    - `rewrite_prompt: optional string`

  - `reranking: optional object { enabled, match_threshold, model }`

    - `enabled: optional boolean`

    - `match_threshold: optional number`

    - `model: optional "@cf/baai/bge-reranker-base" or ""`

      - `"@cf/baai/bge-reranker-base"`

      - `""`

  - `retrieval: optional object { boost_by, context_expansion, filters, 6 more }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Overrides the instance-level boost_by config. Direction defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `context_expansion: optional number`

    - `filters: optional map[unknown]`

    - `fusion_method: optional "max" or "rrf"`

      - `"max"`

      - `"rrf"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. When omitted, falls back to the instance-level retrieval_options.keyword_match_mode, then to 'and'.

      - `"and"`

      - `"or"`

    - `match_threshold: optional number`

    - `max_num_results: optional number`

    - `retrieval_type: optional "vector" or "keyword" or "hybrid"`

      - `"vector"`

      - `"keyword"`

      - `"hybrid"`

    - `return_on_failure: optional boolean`

- `model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

  - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

  - `"@cf/zai-org/glm-4.7-flash"`

  - `"@cf/meta/llama-3.1-8b-instruct-fast"`

  - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

  - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

  - `"@cf/qwen/qwen3-30b-a3b-fp8"`

  - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

  - `"@cf/moonshotai/kimi-k2-instruct"`

  - `"@cf/google/gemma-3-12b-it"`

  - `"@cf/google/gemma-4-26b-a4b-it"`

  - `"@cf/moonshotai/kimi-k2.5"`

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

- `stream: optional boolean`

### Returns

- `choices: array of object { message, index }`

  - `message: object { content, role }`

    - `content: string or array of object { text, type }  or object { image_url, type }`

      - `string`

      - `array of object { text, type }  or object { image_url, type }`

        - `object { text, type }`

          - `text: string`

          - `type: "text"`

            - `"text"`

        - `object { image_url, type }`

          - `image_url: object { url }`

            - `url: string`

          - `type: "image_url"`

            - `"image_url"`

    - `role: "system" or "developer" or "user" or 2 more`

      - `"system"`

      - `"developer"`

      - `"user"`

      - `"assistant"`

      - `"tool"`

  - `index: optional number`

- `chunks: array of object { id, score, text, 3 more }`

  - `id: string`

  - `score: number`

  - `text: string`

  - `type: string`

  - `item: optional object { key, metadata, timestamp }`

    - `key: string`

    - `metadata: optional map[unknown]`

    - `timestamp: optional number`

  - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

    - `fusion_method: optional "rrf" or "max"`

      - `"rrf"`

      - `"max"`

    - `keyword_rank: optional number`

    - `keyword_score: optional number`

    - `reranking_score: optional number`

    - `vector_rank: optional number`

    - `vector_score: optional number`

- `id: optional string`

- `model: optional string`

- `object: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/chat/completions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "messages": [
            {
              "content": "string",
              "role": "system"
            }
          ]
        }'
```

#### Response

```json
{
  "choices": [
    {
      "message": {
        "content": "string",
        "role": "system"
      },
      "index": 0
    }
  ],
  "chunks": [
    {
      "id": "id",
      "score": 0,
      "text": "text",
      "type": "type",
      "item": {
        "key": "key",
        "metadata": {
          "foo": "bar"
        },
        "timestamp": 0
      },
      "scoring_details": {
        "fusion_method": "rrf",
        "keyword_rank": 0,
        "keyword_score": 0,
        "reranking_score": 0,
        "vector_rank": 0,
        "vector_score": 0
      }
    }
  ],
  "id": "id",
  "model": "model",
  "object": "object"
}
```

## Domain Types

### Instance List Response

- `InstanceListResponse object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

### Instance Create Response

- `InstanceCreateResponse object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

### Instance Read Response

- `InstanceReadResponse object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

### Instance Update Response

- `InstanceUpdateResponse object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

### Instance Delete Response

- `InstanceDeleteResponse object { id, created_at, modified_at, 36 more }`

  - `id: string`

    AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

  - `created_at: string`

  - `modified_at: string`

  - `ai_gateway_id: optional string`

  - `ai_search_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `cache: optional boolean`

  - `cache_threshold: optional "super_strict_match" or "close_enough" or "flexible_friend" or "anything_goes"`

    - `"super_strict_match"`

    - `"close_enough"`

    - `"flexible_friend"`

    - `"anything_goes"`

  - `cache_ttl: optional 600 or 1800 or 3600 or 7 more`

    Cache entry TTL in seconds. Allowed values: 600 (10min), 1800 (30min), 3600 (1h), 7200 (2h), 21600 (6h), 43200 (12h), 86400 (24h), 172800 (48h), 259200 (72h), 518400 (6d).

    - `600`

    - `1800`

    - `3600`

    - `7200`

    - `21600`

    - `43200`

    - `86400`

    - `172800`

    - `259200`

    - `518400`

  - `chunk_overlap: optional number`

  - `chunk_size: optional number`

  - `created_by: optional string`

  - `custom_metadata: optional array of object { data_type, field_name }`

    - `data_type: "text" or "number" or "boolean" or "datetime"`

      - `"text"`

      - `"number"`

      - `"boolean"`

      - `"datetime"`

    - `field_name: string`

  - `embedding_model: optional "@cf/qwen/qwen3-embedding-0.6b" or "@cf/qwen/qwen3-vl-embedding-2b" or "@cf/baai/bge-m3" or 8 more`

    - `"@cf/qwen/qwen3-embedding-0.6b"`

    - `"@cf/qwen/qwen3-vl-embedding-2b"`

    - `"@cf/baai/bge-m3"`

    - `"@cf/baai/bge-large-en-v1.5"`

    - `"@cf/google/embeddinggemma-300m"`

    - `"google-ai-studio/gemini-embedding-001"`

    - `"google-ai-studio/gemini-embedding-2-preview"`

    - `"google-ai-studio/gemini-embedding-2"`

    - `"openai/text-embedding-3-small"`

    - `"openai/text-embedding-3-large"`

    - `""`

  - `enable: optional boolean`

  - `engine_version: optional number`

  - `fusion_method: optional "max" or "rrf"`

    - `"max"`

    - `"rrf"`

  - `hybrid_search_enabled: optional boolean`

    Deprecated — use index_method instead.

  - `index_method: optional object { keyword, vector }`

    Controls which storage backends are used during indexing. Defaults to vector-only.

    - `keyword: boolean`

      Enable keyword (BM25) storage backend.

    - `vector: boolean`

      Enable vector (embedding) storage backend.

  - `indexing_options: optional object { keyword_tokenizer }`

    - `keyword_tokenizer: optional "porter" or "trigram"`

      Tokenizer used for keyword search indexing. porter provides word-level tokenization with Porter stemming (good for natural language queries). trigram enables character-level substring matching (good for partial matches, code, identifiers). Changing this triggers a full re-index. Defaults to porter.

      - `"porter"`

      - `"trigram"`

  - `last_activity: optional string`

  - `max_num_results: optional number`

  - `metadata: optional object { created_from_aisearch_wizard, worker_domain }`

    - `created_from_aisearch_wizard: optional boolean`

    - `worker_domain: optional string`

  - `modified_by: optional string`

  - `namespace: optional string`

  - `paused: optional boolean`

  - `public_endpoint_id: optional string`

  - `public_endpoint_params: optional object { authorized_hosts, chat_completions_endpoint, custom_domains, 4 more }`

    - `authorized_hosts: optional array of string`

    - `chat_completions_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable chat completions endpoint for this public endpoint

    - `custom_domains: optional array of string`

      Custom domain hostnames that alias this public endpoint. GET and create responses return the current set; on update (PUT) this field is only echoed back when supplied in the request body, otherwise it is null (omit it to leave domains unchanged).

    - `enabled: optional boolean`

    - `mcp: optional object { description, disabled }`

      - `description: optional string`

      - `disabled: optional boolean`

        Disable MCP endpoint for this public endpoint

    - `rate_limit: optional object { period_ms, requests, technique }`

      - `period_ms: optional number`

      - `requests: optional number`

      - `technique: optional "fixed" or "sliding"`

        - `"fixed"`

        - `"sliding"`

    - `search_endpoint: optional object { disabled }`

      - `disabled: optional boolean`

        Disable search endpoint for this public endpoint

  - `reranking: optional boolean`

  - `reranking_model: optional "@cf/baai/bge-reranker-base" or ""`

    - `"@cf/baai/bge-reranker-base"`

    - `""`

  - `retrieval_options: optional object { boost_by, keyword_match_mode }`

    - `boost_by: optional array of object { field, direction }`

      Metadata fields to boost search results by. Each entry specifies a metadata field and an optional direction. Direction defaults to 'asc' for numeric/datetime fields and 'exists' for text/boolean fields. Fields must match 'timestamp' or a defined custom_metadata field.

      - `field: string`

        Metadata field name to boost by. Use 'timestamp' for document freshness, or any custom_metadata field. Numeric and datetime fields support all four directions (asc, desc, exists, not_exists); text/boolean fields only support exists/not_exists.

      - `direction: optional "asc" or "desc" or "exists" or "not_exists"`

        Boost direction. 'desc' = higher values rank higher (e.g. newer timestamps). 'asc' = lower values rank higher. 'exists' = boost chunks that have the field. 'not_exists' = boost chunks that lack the field. Optional — defaults to 'asc' for numeric/datetime fields, 'exists' for text/boolean fields.

        - `"asc"`

        - `"desc"`

        - `"exists"`

        - `"not_exists"`

    - `keyword_match_mode: optional "and" or "or"`

      Controls which documents are candidates for BM25 scoring. 'and' restricts candidates to documents containing all query terms; 'or' includes any document containing at least one term, ranked by BM25 relevance. Defaults to 'and'.

      - `"and"`

      - `"or"`

  - `rewrite_model: optional "@cf/meta/llama-3.3-70b-instruct-fp8-fast" or "@cf/zai-org/glm-4.7-flash" or "@cf/meta/llama-3.1-8b-instruct-fast" or 27 more`

    - `"@cf/meta/llama-3.3-70b-instruct-fp8-fast"`

    - `"@cf/zai-org/glm-4.7-flash"`

    - `"@cf/meta/llama-3.1-8b-instruct-fast"`

    - `"@cf/meta/llama-3.1-8b-instruct-fp8"`

    - `"@cf/meta/llama-4-scout-17b-16e-instruct"`

    - `"@cf/qwen/qwen3-30b-a3b-fp8"`

    - `"@cf/deepseek-ai/deepseek-r1-distill-qwen-32b"`

    - `"@cf/moonshotai/kimi-k2-instruct"`

    - `"@cf/google/gemma-3-12b-it"`

    - `"@cf/google/gemma-4-26b-a4b-it"`

    - `"@cf/moonshotai/kimi-k2.5"`

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

  - `rewrite_query: optional boolean`

  - `score_threshold: optional number`

  - `source: optional string`

  - `source_params: optional object { exclude_items, include_items, prefix, 2 more }`

    - `exclude_items: optional array of string`

      List of path patterns to exclude. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /admin/** matches /admin/users and /admin/settings/advanced)

    - `include_items: optional array of string`

      List of path patterns to include. Uses micromatch glob syntax: * matches within a path segment, ** matches across path segments (e.g., /blog/** matches /blog/post and /blog/2024/post)

    - `prefix: optional string`

    - `r2_jurisdiction: optional string`

    - `web_crawler: optional object { parse_options, parse_type }`

      - `parse_options: optional object { content_selector, include_headers, include_images, 2 more }`

        - `content_selector: optional array of object { path, selector }`

          List of path-to-selector mappings for extracting specific content from crawled pages. Each entry pairs a URL glob pattern with a CSS selector. The first matching path wins. Only the matched HTML fragment is stored and indexed. Omit the field to disable content selection — empty arrays are rejected.

          - `path: string`

            Glob pattern to match against the page URL path. Uses standard glob syntax: * matches within a segment, ** crosses directories.

          - `selector: string`

            CSS selector to extract content from pages matching the path pattern. Must not contain disallowed characters (;, `, $, {, }, ). Must target a single element; if multiple elements match, the selector is ignored and the full page is used.

        - `include_headers: optional map[string]`

          Up to 5 custom HTTP headers sent with each crawl request. Names must be RFC-7230 token characters (no spaces, colons, or control characters); values must be HTAB + printable ASCII (no CR/LF).

        - `include_images: optional boolean`

        - `specific_sitemaps: optional array of string`

          List of specific sitemap URLs to use for crawling. Only valid when parse_type is 'sitemap'.

        - `use_browser_rendering: optional boolean`

      - `parse_type: optional "sitemap" or "crawl"`

        - `"sitemap"`

        - `"crawl"`

  - `status: optional string`

  - `sync_interval: optional 900 or 1800 or 3600 or 5 more`

    Interval between automatic syncs, in seconds. Allowed values: 900 (15min), 1800 (30min), 3600 (1h), 7200 (2h), 14400 (4h), 21600 (6h), 43200 (12h), 86400 (24h).

    - `900`

    - `1800`

    - `3600`

    - `7200`

    - `14400`

    - `21600`

    - `43200`

    - `86400`

  - `token_id: optional string`

  - `type: optional "r2" or "web-crawler"`

    - `"r2"`

    - `"web-crawler"`

### Instance Stats Response

- `InstanceStatsResponse object { completed, degraded, engine, 8 more }`

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

### Instance Search Response

- `InstanceSearchResponse object { chunks, query_kind, search_query }`

  - `chunks: array of object { id, score, text, 3 more }`

    - `id: string`

    - `score: number`

    - `text: string`

    - `type: string`

    - `item: optional object { key, metadata, timestamp }`

      - `key: string`

      - `metadata: optional map[unknown]`

      - `timestamp: optional number`

    - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

      - `fusion_method: optional "rrf" or "max"`

        - `"rrf"`

        - `"max"`

      - `keyword_rank: optional number`

      - `keyword_score: optional number`

      - `reranking_score: optional number`

      - `vector_rank: optional number`

      - `vector_score: optional number`

  - `query_kind: "text" or "image" or "multimodal"`

    - `"text"`

    - `"image"`

    - `"multimodal"`

  - `search_query: optional string`

### Instance Chat Completions Response

- `InstanceChatCompletionsResponse object { choices, chunks, id, 2 more }`

  - `choices: array of object { message, index }`

    - `message: object { content, role }`

      - `content: string or array of object { text, type }  or object { image_url, type }`

        - `string`

        - `array of object { text, type }  or object { image_url, type }`

          - `object { text, type }`

            - `text: string`

            - `type: "text"`

              - `"text"`

          - `object { image_url, type }`

            - `image_url: object { url }`

              - `url: string`

            - `type: "image_url"`

              - `"image_url"`

      - `role: "system" or "developer" or "user" or 2 more`

        - `"system"`

        - `"developer"`

        - `"user"`

        - `"assistant"`

        - `"tool"`

    - `index: optional number`

  - `chunks: array of object { id, score, text, 3 more }`

    - `id: string`

    - `score: number`

    - `text: string`

    - `type: string`

    - `item: optional object { key, metadata, timestamp }`

      - `key: string`

      - `metadata: optional map[unknown]`

      - `timestamp: optional number`

    - `scoring_details: optional object { fusion_method, keyword_rank, keyword_score, 3 more }`

      - `fusion_method: optional "rrf" or "max"`

        - `"rrf"`

        - `"max"`

      - `keyword_rank: optional number`

      - `keyword_score: optional number`

      - `reranking_score: optional number`

      - `vector_rank: optional number`

      - `vector_score: optional number`

  - `id: optional string`

  - `model: optional string`

  - `object: optional string`

# Jobs

## List Jobs

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs`

Lists indexing jobs for an AI Search instance.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

### Query Parameters

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, source, description, 4 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `description: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/jobs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "source": "user",
      "description": "description",
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

## Create new job

**post** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs`

Creates a new indexing job for an AI Search instance.

### Path Parameters

- `account_id: string`

- `name: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/jobs \
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

## Get a Job Details

**get** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs/{job_id}`

Retrieves details for a specific AI Search indexing job.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `job_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/jobs/$JOB_ID \
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

## Change Job Status

**patch** `/accounts/{account_id}/ai-search/namespaces/{name}/instances/{id}/jobs/{job_id}`

Updates the status of an AI Search indexing job.

### Path Parameters

- `account_id: string`

- `name: string`

- `id: string`

  AI Search instance ID. Lowercase alphanumeric, hyphens, and underscores.

- `job_id: string`

### Body Parameters

- `action: "cancel"`

  - `"cancel"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME/instances/$ID/jobs/$JOB_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "cancel"
        }'
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

## Domain Types

### Job List Response

- `JobListResponse object { id, source, description, 4 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `description: optional string`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

### Job Create Response

- `JobCreateResponse object { id, source, description, 4 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `description: optional string`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

### Job Get Response

- `JobGetResponse object { id, source, description, 4 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `description: optional string`

  - `end_reason: optional string`

  - `ended_at: optional string`

  - `last_seen_at: optional string`

  - `started_at: optional string`

### Job Update Response

- `JobUpdateResponse object { id, source, description, 4 more }`

  - `id: string`

  - `source: "user" or "schedule"`

    - `"user"`

    - `"schedule"`

  - `description: optional string`

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
