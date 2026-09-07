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
