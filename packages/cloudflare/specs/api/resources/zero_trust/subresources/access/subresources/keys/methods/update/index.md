## Update the Access key configuration

**put** `/accounts/{account_id}/access/keys`

Updates the Access key rotation settings for an account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `key_rotation_interval_days: number`

  The number of days between key rotations.

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

- `result: optional object { days_until_next_rotation, key_rotation_interval_days, last_key_rotation_at }`

  - `days_until_next_rotation: optional number`

    The number of days until the next key rotation.

  - `key_rotation_interval_days: optional number`

    The number of days between key rotations.

  - `last_key_rotation_at: optional string`

    The timestamp of the previous key rotation.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/keys \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "key_rotation_interval_days": 30
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
    "days_until_next_rotation": 1,
    "key_rotation_interval_days": 30,
    "last_key_rotation_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
