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
