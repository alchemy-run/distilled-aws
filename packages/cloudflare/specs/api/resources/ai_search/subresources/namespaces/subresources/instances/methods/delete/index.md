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
