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
