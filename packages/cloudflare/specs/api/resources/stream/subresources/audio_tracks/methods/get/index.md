## List additional audio tracks on a video

**get** `/accounts/{account_id}/stream/{identifier}/audio`

Lists additional audio tracks on a video. Note this API will not return information for audio attached to the video upload.

### Path Parameters

- `account_id: string`

  The account identifier tag.

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

- `result: optional object { audio }`

  - `audio: optional array of Audio`

    Array of audio tracks for the video.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/audio \
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
    "audio": [
      {
        "default": true,
        "label": "director commentary",
        "status": "queued",
        "uid": "ea95132c15732412d22c1476fa83f27a"
      }
    ]
  }
}
```
