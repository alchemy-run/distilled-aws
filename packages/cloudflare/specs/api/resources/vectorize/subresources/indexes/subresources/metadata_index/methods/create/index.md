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
