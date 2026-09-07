## Query Vectors

**post** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/query`

Finds vectors closest to a given vector in an index.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Body Parameters

- `vector: array of number`

  The search vector that will be used to find the nearest neighbors.

- `filter: optional unknown`

  A metadata filter expression used to limit nearest neighbor results.

- `returnMetadata: optional "none" or "indexed" or "all"`

  Whether to return no metadata, indexed metadata or all metadata associated with the closest vectors.

  - `"none"`

  - `"indexed"`

  - `"all"`

- `returnValues: optional boolean`

  Whether to return the values associated with the closest vectors.

- `topK: optional number`

  The number of nearest neighbors to find.

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

- `result: object { count, matches }`

  - `count: optional number`

    Specifies the count of vectors returned by the search

  - `matches: optional array of object { id, metadata, namespace, 2 more }`

    Array of vectors matched by the search

    - `id: optional string`

      Identifier for a Vector

    - `metadata: optional unknown`

    - `namespace: optional string`

    - `score: optional number`

      The score of the vector according to the index's distance metric

    - `values: optional array of number`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/query \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "vector": [
            0.5,
            0.5,
            0.5
          ],
          "filter": {
            "has_viewed": {
              "$ne": true
            },
            "streaming_platform": "netflix"
          },
          "topK": 5
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
    "count": 0,
    "matches": [
      {
        "id": "some-vector-id-023e105f4ecef8ad9ca31a8372d0c353",
        "metadata": {},
        "namespace": "namespace",
        "score": 0,
        "values": [
          0
        ]
      }
    ]
  },
  "success": true
}
```
