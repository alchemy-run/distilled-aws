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
