# Metadata

## Read the metadata for a key

**get** `/accounts/{account_id}/storage/kv/namespaces/{namespace_id}/metadata/{key_name}`

Returns the metadata associated with the given key in the given namespace. Use URL-encoding to use special characters (for example, `:`, `!`, `%`) in the key name.

### Path Parameters

- `account_id: string`

  Identifier.

- `namespace_id: string`

  Namespace identifier tag.

- `key_name: string`

  A key's name. The name may be at most 512 bytes. All printable, non-whitespace characters are valid. Use percent-encoding to define key names as part of a URL.

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

- `result: optional unknown`

  Arbitrary JSON that is associated with a key.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID/metadata/$KEY_NAME \
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
  "result": {}
}
```

## Domain Types

### Metadata Get Response

- `MetadataGetResponse = unknown`

  Arbitrary JSON that is associated with a key.
