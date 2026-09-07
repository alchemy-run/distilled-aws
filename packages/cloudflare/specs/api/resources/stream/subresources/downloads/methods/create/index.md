## Create downloads

**post** `/accounts/{account_id}/stream/{identifier}/downloads`

Creates a download for a video when a video is ready to view. Use `/downloads/{download_type}` instead for type-specific downloads. Available types are `default` and `audio`.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

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

- `result: optional object { audio, default }`

  An object with download type keys. Each key is optional and only present if that download type has been created.

  - `audio: optional object { percentComplete, status, url }`

    The audio-only download. Only present if this download type has been created.

    - `percentComplete: number`

      Indicates the progress as a percentage between 0 and 100.

    - `status: "ready" or "inprogress" or "error"`

      The status of a generated download.

      - `"ready"`

      - `"inprogress"`

      - `"error"`

    - `url: optional string`

      The URL to access the generated download.

  - `default: optional object { percentComplete, status, url }`

    The default video download. Only present if this download type has been created.

    - `percentComplete: number`

      Indicates the progress as a percentage between 0 and 100.

    - `status: "ready" or "inprogress" or "error"`

      The status of a generated download.

      - `"ready"`

      - `"inprogress"`

      - `"error"`

    - `url: optional string`

      The URL to access the generated download.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/downloads \
    -X POST \
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
    "audio": {
      "percentComplete": 0,
      "status": "ready",
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/downloads/default.mp4"
    },
    "default": {
      "percentComplete": 0,
      "status": "ready",
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/downloads/default.mp4"
    }
  }
}
```
