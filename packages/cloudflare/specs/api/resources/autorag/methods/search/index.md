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
