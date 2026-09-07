# To Markdown

## Convert Files into Markdown

**post** `/accounts/{account_id}/ai/tomarkdown`

Converts uploaded files into Markdown format using Workers AI.

### Path Parameters

- `account_id: string`

### Returns

- `result: array of object { data, format, mimeType, 2 more }`

  - `data: string`

  - `format: string`

  - `mimeType: string`

  - `name: string`

  - `tokens: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/tomarkdown \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F files='["Example data"]'
```

#### Response

```json
{
  "result": [
    {
      "data": "data",
      "format": "format",
      "mimeType": "mimeType",
      "name": "name",
      "tokens": "tokens"
    }
  ],
  "success": true
}
```

## Domain Types

### To Markdown Create Response

- `ToMarkdownCreateResponse object { data, format, mimeType, 2 more }`

  - `data: string`

  - `format: string`

  - `mimeType: string`

  - `name: string`

  - `tokens: string`
