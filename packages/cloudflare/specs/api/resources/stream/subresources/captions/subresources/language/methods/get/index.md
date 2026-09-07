## List captions or subtitles for a provided language

**get** `/accounts/{account_id}/stream/{identifier}/captions/{language}`

Lists the captions or subtitles for provided language.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

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

- `result: optional Caption`

  - `generated: optional boolean`

    Whether the caption was generated via AI.

  - `label: optional string`

    The language label displayed in the native language to users.

  - `language: optional string`

    The language tag in BCP 47 format.

  - `status: optional "ready" or "inprogress" or "error"`

    The status of a generated caption.

    - `"ready"`

    - `"inprogress"`

    - `"error"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE \
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
    "generated": true,
    "label": "Türkçe",
    "language": "tr",
    "status": "ready"
  }
}
```
