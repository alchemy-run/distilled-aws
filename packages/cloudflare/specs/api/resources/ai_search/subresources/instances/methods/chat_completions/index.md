## Chat Completions

**post** `/accounts/{account_id}/ai-search/instances/{id}/chat/completions`

Performs a chat completion request against an AI Search instance, using indexed content as context for generating responses.

### Path Parameters

- `account_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/instances/$ID/chat/completions \
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
