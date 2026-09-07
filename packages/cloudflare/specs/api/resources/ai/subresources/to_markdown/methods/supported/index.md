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
