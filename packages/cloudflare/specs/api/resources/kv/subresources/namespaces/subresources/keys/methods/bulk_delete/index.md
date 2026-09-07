## Delete multiple key-value pairs

**post** `/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/delete`

Remove multiple KV pairs from the namespace. Body should be an array of up to 10,000 keys to be removed.

### Path Parameters

- `account_id: string`

  Identifier.

- `namespace_id: string`

  Namespace identifier tag.

### Body Parameters

- `body: array of string`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { successful_key_count, unsuccessful_keys }`

  - `successful_key_count: optional number`

    Number of keys successfully updated.

  - `unsuccessful_keys: optional array of string`

    Name of the keys that failed to be fully updated. They should be retried.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/bulk/delete \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          "My-Key"
        ]'
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
  "success": true,
  "result": {
    "successful_key_count": 100,
    "unsuccessful_keys": [
      "string"
    ]
  }
}
```
