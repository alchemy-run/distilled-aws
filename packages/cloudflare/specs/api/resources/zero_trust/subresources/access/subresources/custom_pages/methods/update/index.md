## Update a custom page

**put** `/accounts/{account_id}/access/custom_pages/{custom_page_id}`

Update a custom page

### Path Parameters

- `account_id: string`

  Identifier.

- `custom_page_id: string`

  UUID.

### Body Parameters

- `custom_html: string`

  Custom page HTML.

- `name: string`

  Custom page name.

- `type: "identity_denied" or "forbidden"`

  Custom page type.

  - `"identity_denied"`

  - `"forbidden"`

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

- `result: optional CustomPageWithoutHTML`

  - `name: string`

    Custom page name.

  - `type: "identity_denied" or "forbidden"`

    Custom page type.

    - `"identity_denied"`

    - `"forbidden"`

  - `uid: optional string`

    UUID.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/custom_pages/$CUSTOM_PAGE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_html": "<html><body><h1>Access Denied</h1></body></html>",
          "name": "name",
          "type": "identity_denied"
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
    "name": "name",
    "type": "identity_denied",
    "app_count": 0,
    "created_at": "2014-01-01T05:20:00.12345Z",
    "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2014-01-01T05:20:00.12345Z"
  }
}
```
