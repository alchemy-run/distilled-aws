## Delete a store

**delete** `/accounts/{account_id}/secrets_store/stores/{store_id}`

Deletes a single store. By default, a store that still contains secrets
cannot be deleted and returns HTTP 409 (Conflict) with the "store_not_empty"
error. Pass `force=true` to cascade-delete all secrets in the store.
Empty stores are always deleted regardless of the force parameter.

### Path Parameters

- `account_id: string`

  Account Identifier

- `store_id: string`

  Store Identifier

### Query Parameters

- `force: optional boolean`

  When true, cascade-deletes all secrets in the store before deleting
  the store itself. Required when deleting a non-empty store. Without
  this parameter, attempting to delete a non-empty store returns 409.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional unknown`

  Result is null for delete operations.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secrets_store/stores/$STORE_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
