## Create Vectorize Index

**post** `/accounts/{account_id}/vectorize/v2/indexes`

Creates and returns a new Vectorize Index.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `config: IndexDimensionConfiguration or object { preset }`

  Specifies the type of configuration to use for the index.

  - `IndexDimensionConfiguration object { dimensions, metric }`

    - `dimensions: number`

      Specifies the number of dimensions for the index

    - `metric: "cosine" or "euclidean" or "dot-product"`

      Specifies the type of metric to use calculating distance.

      - `"cosine"`

      - `"euclidean"`

      - `"dot-product"`

  - `VectorizeIndexPresetConfiguration object { preset }`

    - `preset: "@cf/baai/bge-small-en-v1.5" or "@cf/baai/bge-base-en-v1.5" or "@cf/baai/bge-large-en-v1.5" or 2 more`

      Specifies the preset to use for the index.

      - `"@cf/baai/bge-small-en-v1.5"`

      - `"@cf/baai/bge-base-en-v1.5"`

      - `"@cf/baai/bge-large-en-v1.5"`

      - `"openai/text-embedding-ada-002"`

      - `"cohere/embed-multilingual-v2.0"`

- `name: string`

- `description: optional string`

  Specifies the description of the index.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: CreateIndex`

  - `config: optional IndexDimensionConfiguration`

    - `dimensions: number`

      Specifies the number of dimensions for the index

    - `metric: "cosine" or "euclidean" or "dot-product"`

      Specifies the type of metric to use calculating distance.

      - `"cosine"`

      - `"euclidean"`

      - `"dot-product"`

  - `created_on: optional string`

    Specifies the timestamp the resource was created as an ISO8601 string.

  - `description: optional string`

    Specifies the description of the index.

  - `modified_on: optional string`

    Specifies the timestamp the resource was modified as an ISO8601 string.

  - `name: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "dimensions": 768,
            "metric": "cosine"
          },
          "name": "example-index",
          "description": "This is my example index."
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "config": {
      "dimensions": 768,
      "metric": "cosine"
    },
    "created_on": "2022-11-15T18:25:44.442097Z",
    "description": "This is my example index.",
    "modified_on": "2022-11-15T18:25:44.442097Z",
    "name": "example-index"
  },
  "success": true
}
```
