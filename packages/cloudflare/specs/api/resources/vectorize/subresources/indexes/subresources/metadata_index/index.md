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
