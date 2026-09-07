## Get multiple key-value pairs

**post** `/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/bulk/get`

Retrieve up to 100 KV pairs from the namespace. Keys must contain text-based values. JSON values can optionally be parsed instead of being returned as a string value. Metadata can be included if `withMetadata` is true.

### Path Parameters

- `account_id: string`

  Identifier.

- `namespace_id: string`

  Namespace identifier tag.

### Body Parameters

- `keys: array of string`

  Array of keys to retrieve (maximum of 100).

- `type: optional "text" or "json"`

  Whether to parse JSON values in the response.

  - `"text"`

  - `"json"`

- `withMetadata: optional boolean`

  Whether to include metadata in the response.

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

- `result: optional object { values }  or object { values }`

  - `WorkersKVBulkGetResult object { values }`

    - `values: optional map[string or number or boolean or map[unknown]]`

      Requested keys are paired with their values in an object.

      - `string`

      - `number`

      - `boolean`

      - `map[unknown]`

  - `WorkersKVBulkGetResultWithMetadata object { values }`

    - `values: optional map[object { metadata, value, expiration } ]`

      Requested keys are paired with their values and metadata in an object.

      - `metadata: unknown`

        The metadata associated with the key.

      - `value: unknown`

        The value associated with the key.

      - `expiration: optional number`

        Expires the key at a certain time, measured in number of seconds since the UNIX epoch.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/bulk/get \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "keys": [
            "My-Key"
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
  "success": true,
  "result": {
    "values": {
      "key1": "value1",
      "key2": "value2"
    }
  }
}
```
