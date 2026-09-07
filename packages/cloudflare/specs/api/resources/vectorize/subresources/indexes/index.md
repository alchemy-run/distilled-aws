# Indexes

## List Vectorize Indexes

**get** `/accounts/{account_id}/vectorize/v2/indexes`

Returns a list of Vectorize Indexes

### Path Parameters

- `account_id: string`

  Identifier

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

- `result: array of CreateIndex`

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": [
    {
      "config": {
        "dimensions": 768,
        "metric": "cosine"
      },
      "created_on": "2022-11-15T18:25:44.442097Z",
      "description": "This is my example index.",
      "modified_on": "2022-11-15T18:25:44.442097Z",
      "name": "example-index"
    }
  ],
  "success": true
}
```

## Get Vectorize Index

**get** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}`

Returns the specified Vectorize Index.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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

## Delete Vectorize Index

**delete** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}`

Deletes the specified Vectorize Index.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
  "result": {},
  "success": true
}
```

## Insert Vectors

**post** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/insert`

Inserts vectors into the specified index and returns a mutation id corresponding to the vectors enqueued for insertion.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Query Parameters

- `"unparsable-behavior": optional "error" or "discard"`

  Behavior for ndjson parse failures.

  - `"error"`

  - `"discard"`

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

- `result: object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/insert \
    -H 'Content-Type: application/x-ndjson' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
    "mutationId": "0000aaaa-11bb-22cc-33dd-444444eeeeee"
  },
  "success": true
}
```

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

## Upsert Vectors

**post** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/upsert`

Upserts vectors into the specified index, creating them if they do not exist and returns a mutation id corresponding to the vectors enqueued for upsertion.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Query Parameters

- `"unparsable-behavior": optional "error" or "discard"`

  Behavior for ndjson parse failures.

  - `"error"`

  - `"discard"`

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

- `result: object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/upsert \
    -H 'Content-Type: application/x-ndjson' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
    "mutationId": "0000aaaa-11bb-22cc-33dd-444444eeeeee"
  },
  "success": true
}
```

## Delete Vectors By Identifier

**post** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/delete_by_ids`

Delete a set of vectors from an index by their vector identifiers.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Body Parameters

- `ids: optional array of string`

  A list of vector identifiers to delete from the index indicated by the path.

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

- `result: object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/delete_by_ids \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ids": [
            "5121db81354a40c6aedc3fe1ace51c59",
            "f90eb49c2107486abdfd78c67e853430"
          ]
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
    "mutationId": "0000aaaa-11bb-22cc-33dd-444444eeeeee"
  },
  "success": true
}
```

## Get Vectors By Identifier

**post** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/get_by_ids`

Get a set of vectors from an index by their vector identifiers.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Body Parameters

- `ids: optional array of string`

  A list of vector identifiers to retrieve from the index indicated by the path.

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

- `result: unknown`

  Array of vectors with matching ids.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/get_by_ids \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ids": [
            "5121db81354a40c6aedc3fe1ace51c59",
            "f90eb49c2107486abdfd78c67e853430"
          ]
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
  "result": [
    {
      "id": "some-vector-id",
      "metadata": {
        "another-key": "another-value",
        "customer-id": 442
      },
      "values": [
        0.812,
        0.621,
        0.261
      ]
    },
    {
      "id": "other-vector-id",
      "metadata": {
        "another-key": "with-a-value",
        "customer-id": 2151
      },
      "namespace": "namespaced",
      "values": [
        0.961,
        0.751,
        0.661
      ]
    }
  ],
  "success": true
}
```

## Get Vectorize Index Info

**get** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/info`

Get information about a vectorize index.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

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

- `result: object { dimensions, processedUpToDatetime, processedUpToMutation, vectorCount }`

  - `dimensions: optional number`

    Specifies the number of dimensions for the index

  - `processedUpToDatetime: optional string`

    Specifies the timestamp the last mutation batch was processed as an ISO8601 string.

  - `processedUpToMutation: optional string`

    The unique identifier for the async mutation operation containing the changeset.

  - `vectorCount: optional number`

    Specifies the number of vectors present in the index

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/info \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "dimensions": 768,
    "processedUpToDatetime": "2024-07-22T18:25:44.442097Z",
    "processedUpToMutation": "0000aaaa-11bb-22cc-33dd-444444eeeeee",
    "vectorCount": 300000
  },
  "success": true
}
```

## List Vectors

**get** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/list`

Returns a paginated list of vector identifiers from the specified index.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Query Parameters

- `count: optional number`

  Maximum number of vectors to return

- `cursor: optional string`

  Cursor for pagination to get the next page of results

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

- `result: object { count, isTruncated, totalCount, 3 more }`

  - `count: number`

    Number of vectors returned in this response

  - `isTruncated: boolean`

    Whether there are more vectors available beyond this response

  - `totalCount: number`

    Total number of vectors in the index

  - `vectors: array of object { id }`

    Array of vector items

    - `id: string`

      Identifier for a Vector

  - `cursorExpirationTimestamp: optional string`

    When the cursor expires as an ISO8601 string

  - `nextCursor: optional string`

    Cursor for the next page of results

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/list \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "count": 100,
    "isTruncated": true,
    "totalCount": 500,
    "vectors": [
      {
        "id": "some-vector-id-023e105f4ecef8ad9ca31a8372d0c353"
      }
    ],
    "cursorExpirationTimestamp": "2025-08-12T20:32:52.469144957+00:00",
    "nextCursor": "suUTaDY5PFUiRweVccnzyt9n75suNPbXHPshvCzue5mHjtj7Letjvzlza9eGj099"
  },
  "success": true
}
```

## Domain Types

### Create Index

- `CreateIndex object { config, created_on, description, 2 more }`

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

### Index Delete Vectors By ID

- `IndexDeleteVectorsByID object { count, ids }`

  - `count: optional number`

    The count of the vectors successfully deleted.

  - `ids: optional array of string`

    Array of vector identifiers of the vectors that were successfully processed for deletion.

### Index Dimension Configuration

- `IndexDimensionConfiguration object { dimensions, metric }`

  - `dimensions: number`

    Specifies the number of dimensions for the index

  - `metric: "cosine" or "euclidean" or "dot-product"`

    Specifies the type of metric to use calculating distance.

    - `"cosine"`

    - `"euclidean"`

    - `"dot-product"`

### Index Insert

- `IndexInsert object { count, ids }`

  - `count: optional number`

    Specifies the count of the vectors successfully inserted.

  - `ids: optional array of string`

    Array of vector identifiers of the vectors successfully inserted.

### Index Query

- `IndexQuery object { count, matches }`

  - `count: optional number`

    Specifies the count of vectors returned by the search

  - `matches: optional array of object { id, metadata, score, values }`

    Array of vectors matched by the search

    - `id: optional string`

      Identifier for a Vector

    - `metadata: optional unknown`

    - `score: optional number`

      The score of the vector according to the index's distance metric

    - `values: optional array of number`

### Index Upsert

- `IndexUpsert object { count, ids }`

  - `count: optional number`

    Specifies the count of the vectors successfully inserted.

  - `ids: optional array of string`

    Array of vector identifiers of the vectors successfully inserted.

### Index Delete Response

- `IndexDeleteResponse = unknown or string`

  - `unknown`

  - `string`

### Index Insert Response

- `IndexInsertResponse object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

### Index Query Response

- `IndexQueryResponse object { count, matches }`

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

### Index Upsert Response

- `IndexUpsertResponse object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

### Index Delete By IDs Response

- `IndexDeleteByIDsResponse object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

### Index Get By IDs Response

- `IndexGetByIDsResponse = unknown`

  Array of vectors with matching ids.

### Index Info Response

- `IndexInfoResponse object { dimensions, processedUpToDatetime, processedUpToMutation, vectorCount }`

  - `dimensions: optional number`

    Specifies the number of dimensions for the index

  - `processedUpToDatetime: optional string`

    Specifies the timestamp the last mutation batch was processed as an ISO8601 string.

  - `processedUpToMutation: optional string`

    The unique identifier for the async mutation operation containing the changeset.

  - `vectorCount: optional number`

    Specifies the number of vectors present in the index

### Index List Vectors Response

- `IndexListVectorsResponse object { count, isTruncated, totalCount, 3 more }`

  - `count: number`

    Number of vectors returned in this response

  - `isTruncated: boolean`

    Whether there are more vectors available beyond this response

  - `totalCount: number`

    Total number of vectors in the index

  - `vectors: array of object { id }`

    Array of vector items

    - `id: string`

      Identifier for a Vector

  - `cursorExpirationTimestamp: optional string`

    When the cursor expires as an ISO8601 string

  - `nextCursor: optional string`

    Cursor for the next page of results

# Metadata Index

## List Metadata Indexes

**get** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/metadata_index/list`

List Metadata Indexes for the specified Vectorize Index.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

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

- `result: object { metadataIndexes }`

  - `metadataIndexes: optional array of object { indexType, propertyName }`

    Array of indexed metadata properties.

    - `indexType: optional "string" or "number" or "boolean"`

      Specifies the type of indexed metadata property.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `propertyName: optional string`

      Specifies the indexed metadata property.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/metadata_index/list \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "metadataIndexes": [
      {
        "indexType": "number",
        "propertyName": "some-num-prop"
      },
      {
        "indexType": "string",
        "propertyName": "some-str-prop"
      },
      {
        "indexType": "boolean",
        "propertyName": "some-bool-prop"
      }
    ]
  },
  "success": true
}
```

## Create Metadata Index

**post** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/metadata_index/create`

Enable metadata filtering based on metadata property. Limited to 10 properties.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Body Parameters

- `indexType: "string" or "number" or "boolean"`

  Specifies the type of metadata property to index.

  - `"string"`

  - `"number"`

  - `"boolean"`

- `propertyName: string`

  Specifies the metadata property to index.

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

- `result: object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/metadata_index/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "indexType": "string",
          "propertyName": "random_metadata_property"
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
    "mutationId": "0000aaaa-11bb-22cc-33dd-444444eeeeee"
  },
  "success": true
}
```

## Delete Metadata Index

**post** `/accounts/{account_id}/vectorize/v2/indexes/{index_name}/metadata_index/delete`

Allow Vectorize to delete the specified metadata index.

### Path Parameters

- `account_id: string`

  Identifier

- `index_name: string`

### Body Parameters

- `propertyName: string`

  Specifies the metadata property for which the index must be deleted.

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

- `result: object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/vectorize/v2/indexes/$INDEX_NAME/metadata_index/delete \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "propertyName": "random_metadata_property"
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
    "mutationId": "0000aaaa-11bb-22cc-33dd-444444eeeeee"
  },
  "success": true
}
```

## Domain Types

### Metadata Index List Response

- `MetadataIndexListResponse object { metadataIndexes }`

  - `metadataIndexes: optional array of object { indexType, propertyName }`

    Array of indexed metadata properties.

    - `indexType: optional "string" or "number" or "boolean"`

      Specifies the type of indexed metadata property.

      - `"string"`

      - `"number"`

      - `"boolean"`

    - `propertyName: optional string`

      Specifies the indexed metadata property.

### Metadata Index Create Response

- `MetadataIndexCreateResponse object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.

### Metadata Index Delete Response

- `MetadataIndexDeleteResponse object { mutationId }`

  - `mutationId: optional string`

    The unique identifier for the async mutation operation containing the changeset.
