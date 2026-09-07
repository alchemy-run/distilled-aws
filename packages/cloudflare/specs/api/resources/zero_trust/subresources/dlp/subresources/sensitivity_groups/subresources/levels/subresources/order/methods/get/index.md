## Retrieve the ordered list of level IDs for a sensitivity group.

**get** `/accounts/{account_id}/dlp/sensitivity_groups/{sensitivity_group_id}/level_order`

Retrieve the ordered list of level IDs for a sensitivity group.

### Path Parameters

- `account_id: string`

- `sensitivity_group_id: string`

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

- `result: optional object { level_ids }`

  The ordered list of level IDs for a sensitivity group.
  Used to get and set the ordering of levels independently of level attributes.

  - `level_ids: array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/sensitivity_groups/$SENSITIVITY_GROUP_ID/level_order \
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
    "level_ids": [
      "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    ]
  }
}
```
