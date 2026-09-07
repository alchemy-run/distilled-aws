## Write multiple key-value pairs

**put** `/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk`

Write multiple keys and values at once. Body should be an array of up to 10,000 key-value pairs to be stored, along with optional expiration information. Existing values and expirations will be overwritten. If neither `expiration` nor `expiration_ttl` is specified, the key-value pair will never expire. If both are set, `expiration_ttl` is used and `expiration` is ignored. The entire request size must be 100 megabytes or less.

### Path Parameters

- `account_id: string`

  Identifier.

- `namespace_id: string`

  Namespace identifier tag.

### Body Parameters

- `body: array of object { key, value, base64, 3 more }`

  - `key: string`

    A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid.

  - `value: string`

    A UTF-8 encoded string to be stored, up to 25 MiB in length.

  - `base64: optional boolean`

    Indicates whether or not the server should base64 decode the value before storing it. Useful for writing values that wouldn't otherwise be valid JSON strings, such as images.

  - `expiration: optional number`

    Expires the key at a certain time, measured in number of seconds since the UNIX epoch.

  - `expiration_ttl: optional number`

    Expires the key after a number of seconds. Must be at least 60.

  - `metadata: optional unknown`

    Arbitrary JSON that is associated with a key.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/bulk \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "key": "My-Key",
            "value": "Some string",
            "base64": true,
            "expiration": 1578435000,
            "expiration_ttl": 300,
            "metadata": {}
          }
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
