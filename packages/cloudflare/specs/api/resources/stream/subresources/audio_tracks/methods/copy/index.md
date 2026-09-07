## Add audio tracks to a video

**post** `/accounts/{account_id}/stream/{identifier}/audio/copy`

Adds an additional audio track to a video using the provided audio track URL.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

### Body Parameters

- `label: string`

  A string to uniquely identify the track amongst other audio track labels for the specified video.

- `url: optional string`

  An audio track URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-range` header that includes the size of the file.

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

- `result: optional Audio`

  - `default: optional boolean`

    Denotes whether the audio track will be played by default in a player.

  - `label: optional string`

    A string to uniquely identify the track amongst other audio track labels for the specified video.

  - `status: optional "queued" or "ready" or "error"`

    Specifies the processing status of the video.

    - `"queued"`

    - `"ready"`

    - `"error"`

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/audio/copy \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "label": "director commentary",
          "url": "https://www.examplestorage.com/audio_file.mp3"
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
    "default": true,
    "label": "director commentary",
    "status": "queued",
    "uid": "ea95132c15732412d22c1476fa83f27a"
  }
}
```
