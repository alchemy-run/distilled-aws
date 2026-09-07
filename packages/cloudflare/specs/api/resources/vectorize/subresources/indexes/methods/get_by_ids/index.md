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
