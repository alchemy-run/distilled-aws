## Create integration entry

**post** `/accounts/{account_id}/dlp/entries/integration`

Integration entries can't be created, this will update an existing integration entry.
This is needed for our generated terraform API.

### Path Parameters

- `account_id: string`

### Body Parameters

- `enabled: boolean`

- `entry_id: string`

- `profile_id: optional string`

  This field is not used as the owning profile.
  For predefined entries it is already set to a predefined profile.

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

- `result: optional object { id, created_at, enabled, 3 more }`

  - `id: string`

  - `created_at: string`

  - `enabled: boolean`

  - `name: string`

  - `updated_at: string`

  - `profile_id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/entries/integration \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "entry_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enabled": true,
    "name": "name",
    "updated_at": "2019-12-27T18:11:19.117Z",
    "profile_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```
