## Get a Namespace

**get** `/accounts/{account_id}/storage/kv/namespaces/{namespace_id}`

Get the namespace corresponding to the given ID.

### Path Parameters

- `account_id: string`

  Identifier.

- `namespace_id: string`

  Namespace identifier tag.

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

- `result: optional Namespace`

  - `id: string`

    Namespace identifier tag.

  - `title: string`

    A human-readable string name for a Namespace.

  - `supports_url_encoding: optional boolean`

    True if keys written on the URL will be URL-decoded before storing. For example, if set to "true", a key written on the URL as "%3F" will be stored as "?".

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/storage/kv/namespaces/$NAMESPACE_ID \
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
  "result": {
    "id": "0f2ac74b498b48028cb68387c421e279",
    "title": "My Own Namespace",
    "supports_url_encoding": true
  }
}
```
