## Permission Group Details

**get** `/accounts/{account_id}/iam/permission_groups/{permission_group_id}`

Get information about a specific permission group in an account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `permission_group_id: string`

  Permission Group identifier tag.

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

- `result: optional object { id, meta, name }`

  A named group of permissions that map to a group of operations against resources.

  - `id: string`

    Identifier of the permission group.

  - `meta: optional object { key, value }`

    Attributes associated to the permission group.

    - `key: optional string`

    - `value: optional string`

  - `name: optional string`

    Name of the permission group.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/iam/permission_groups/$PERMISSION_GROUP_ID \
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
    "id": "6d7f2f5f5b1d4a0e9081fdc98d432fd1",
    "meta": {
      "key": "key",
      "value": "value"
    },
    "name": "Load Balancer"
  }
}
```
