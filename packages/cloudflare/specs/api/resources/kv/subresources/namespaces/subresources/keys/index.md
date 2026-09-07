# Keys

## List a Namespace's Keys

**get** `/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/keys`

Lists a namespace's keys.

### Path Parameters

- `account_id: string`

  Identifier.

- `namespace_id: string`

  Namespace identifier tag.

### Query Parameters

- `cursor: optional string`

  Opaque token indicating the position from which to continue when requesting the next set of records if the amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from the `cursors` object in the `result_info` structure.

- `limit: optional number`

  Limits the number of keys returned in the response. The cursor attribute may be used to iterate over the next batch of keys if there are more than the limit.

- `prefix: optional string`

  Filters returned keys by a name prefix. Exact matches and any key names that begin with the prefix will be returned.

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

- `result: optional array of Key`

  - `name: string`

    A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.

  - `expiration: optional number`

    The time, measured in number of seconds since the UNIX epoch, at which the key will expire. This property is omitted for keys that will not expire.

  - `metadata: optional unknown`

    Arbitrary JSON that is associated with a key.

- `result_info: optional object { count, cursor }`

  - `count: optional number`

    Total results returned based on your list parameters.

  - `cursor: optional string`

    Opaque token indicating the position from which to continue when requesting the next set of records if the amount of list results was limited by the limit parameter. A valid value for the cursor can be obtained from the cursors object in the result_info structure.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/keys \
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
  "success": true,
  "result": [
    {
      "name": "My-Key",
      "expiration": 1577836800,
      "metadata": {}
    }
  ],
  "result_info": {
    "count": 1,
    "cursor": "6Ck1la0VxJ0djhidm1MdX2FyDGxLKVeeHZZmORS_8XeSuhz9SjIJRaSa2lnsF01tQOHrfTGAP3R5X1Kv5iVUuMbNKhWNAXHOl6ePB0TUL8nw"
  }
}
```

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

## Domain Types

### Key

- `Key object { name, expiration, metadata }`

  A name for a value. A value stored under a given key may be retrieved via the same key.

  - `name: string`

    A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.

  - `expiration: optional number`

    The time, measured in number of seconds since the UNIX epoch, at which the key will expire. This property is omitted for keys that will not expire.

  - `metadata: optional unknown`

    Arbitrary JSON that is associated with a key.

### Key Bulk Update Response

- `KeyBulkUpdateResponse object { successful_key_count, unsuccessful_keys }`

  - `successful_key_count: optional number`

    Number of keys successfully updated.

  - `unsuccessful_keys: optional array of string`

    Name of the keys that failed to be fully updated. They should be retried.

### Key Bulk Delete Response

- `KeyBulkDeleteResponse object { successful_key_count, unsuccessful_keys }`

  - `successful_key_count: optional number`

    Number of keys successfully updated.

  - `unsuccessful_keys: optional array of string`

    Name of the keys that failed to be fully updated. They should be retried.

### Key Bulk Get Response

- `KeyBulkGetResponse = object { values }  or object { values }`

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
