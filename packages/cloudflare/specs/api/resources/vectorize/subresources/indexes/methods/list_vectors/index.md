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
