## Delete Signing Key

**delete** `/accounts/{account_id}/images/v1/keys/{signing_key_name}`

Delete a CF Images signing key with specified name. Returns all keys available.
When the last key is removed, a new default signing key will be generated.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `signing_key_name: string`

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

- `result: object { keys }`

  - `keys: optional array of Key`

    - `name: optional string`

      Key name.

    - `value: optional string`

      Key value.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/images/v1/keys/$SIGNING_KEY_NAME \
    -X DELETE \
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
    "keys": [
      {
        "name": "default",
        "value": "Oix0bbNaT8Rge9PuyxUBrjI6zrgnsyJ5="
      }
    ]
  },
  "success": true
}
```
