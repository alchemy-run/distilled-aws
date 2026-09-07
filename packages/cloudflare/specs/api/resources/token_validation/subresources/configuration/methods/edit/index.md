## Edit an existing Token Configuration

**patch** `/zones/{zone_id}/token_validation/config/{config_id}`

Edit fields of an existing Token Configuration

### Path Parameters

- `zone_id: string`

  Identifier.

- `config_id: string`

  UUID.

### Body Parameters

- `description: optional string`

- `title: optional string`

- `token_sources: optional array of string`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { id, description, title, token_sources }`

  - `id: optional string`

    UUID.

  - `description: optional string`

  - `title: optional string`

  - `token_sources: optional array of string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config/$CONFIG_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Long description for Token Validation Configuration",
          "title": "Example Token Validation Configuration",
          "token_sources": [
            "http.request.headers[\\"x-auth\\"][0]",
            "http.request.cookies[\\"Authorization\\"][0]"
          ]
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
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "Long description for Token Validation Configuration",
    "title": "Example Token Validation Configuration",
    "token_sources": [
      "http.request.headers[\"x-auth\"][0]",
      "http.request.cookies[\"Authorization\"][0]"
    ]
  },
  "success": true
}
```
