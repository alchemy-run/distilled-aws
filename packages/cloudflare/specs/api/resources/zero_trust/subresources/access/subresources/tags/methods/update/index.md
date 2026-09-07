## Update a tag

**put** `/accounts/{account_id}/access/tags/{tag_name}`

Update a tag

### Path Parameters

- `account_id: string`

  Identifier.

- `tag_name: string`

  The name of the tag

### Body Parameters

- `name: string`

  The name of the tag

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

- `result: optional Tag`

  A tag

  - `name: string`

    The name of the tag

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/tags/$TAG_NAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "engineers"
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
    "name": "engineers",
    "app_count": 1,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
