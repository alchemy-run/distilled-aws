## Create allowlist prefix.

**post** `/accounts/{account_id}/magic/advanced_tcp_protection/configs/allowlist`

Create an allowlist prefix for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `comment: string`

  An comment describing the allowlist prefix.

- `enabled: boolean`

  Whether to enable the allowlist prefix into effect.

- `prefix: string`

  The allowlist prefix to add in CIDR format.

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

- `result: optional object { id, comment, created_on, 3 more }`

  - `id: string`

    The unique ID of the allowlist prefix.

  - `comment: string`

    An optional comment describing the allowlist prefix.

  - `created_on: string`

    The creation timestamp of the allowlist prefix.

  - `enabled: boolean`

    Whether to enable the allowlist prefix into effect. Defaults to false.

  - `modified_on: string`

    The last modification timestamp of the allowlist prefix.

  - `prefix: string`

    The allowlist prefix in CIDR format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/advanced_tcp_protection/configs/allowlist \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "comment",
          "enabled": true,
          "prefix": "prefix"
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
    "id": "id",
    "comment": "comment",
    "created_on": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "modified_on": "2019-12-27T18:11:19.117Z",
    "prefix": "prefix"
  }
}
```
