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
    -F file='{"files":["Example data"]}'
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

## Get all converted formats supported

**get** `/accounts/{account_id}/ai/tomarkdown/supported`

Lists all file formats supported for conversion to Markdown.

### Path Parameters

- `account_id: string`

### Returns

- `result: array of object { extension, mimeType }`

  - `extension: string`

  - `mimeType: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai/tomarkdown/supported \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "extension": "extension",
      "mimeType": "mimeType"
    }
  ],
  "success": true
}
```

## Domain Types

### To Markdown Transform Response

- `ToMarkdownTransformResponse object { data, format, mimeType, 2 more }`

  - `data: string`

  - `format: string`

  - `mimeType: string`

  - `name: string`

  - `tokens: string`

### To Markdown Supported Response

- `ToMarkdownSupportedResponse object { extension, mimeType }`

  - `extension: string`

  - `mimeType: string`
