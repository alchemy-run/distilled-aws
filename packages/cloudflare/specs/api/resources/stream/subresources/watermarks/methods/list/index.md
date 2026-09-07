## List watermark profiles

**get** `/accounts/{account_id}/stream/watermarks`

Lists all watermark profiles for an account.

### Path Parameters

- `account_id: string`

  The account identifier tag.

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

- `result: optional array of Watermark`

  - `created: optional string`

    The date and a time a watermark profile was created.

  - `downloadedFrom: optional string`

    The source URL for a downloaded image. If the watermark profile was created via direct upload, this field is null.

  - `height: optional number`

    The height of the image in pixels.

  - `name: optional string`

    A short description of the watermark profile.

  - `opacity: optional number`

    The translucency of the image. A value of `0.0` makes the image completely transparent, and `1.0` makes the image completely opaque. Note that if the image is already semi-transparent, setting this to `1.0` will not make the image completely opaque.

  - `padding: optional number`

    The whitespace between the adjacent edges (determined by position) of the video and the image. `0.0` indicates no padding, and `1.0` indicates a fully padded video width or length, as determined by the algorithm.

  - `position: optional string`

    The location of the image. Valid positions are: `upperRight`, `upperLeft`, `lowerLeft`, `lowerRight`, and `center`. Note that `center` ignores the `padding` parameter.

  - `scale: optional number`

    The size of the image relative to the overall size of the video. This parameter will adapt to horizontal and vertical videos automatically. `0.0` indicates no scaling (use the size of the image as-is), and `1.0`fills the entire video.

  - `size: optional number`

    The size of the image in bytes.

  - `uid: optional string`

    The unique identifier for a watermark profile.

  - `width: optional number`

    The width of the image in pixels.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/watermarks \
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
  "result": [
    {
      "created": "2014-01-02T02:20:00Z",
      "downloadedFrom": "https://company.com/logo.png",
      "height": 0,
      "name": "Marketing Videos",
      "opacity": 0.75,
      "padding": 0.1,
      "position": "center",
      "scale": 0.1,
      "size": 29472,
      "uid": "ea95132c15732412d22c1476fa83f27a",
      "width": 0
    }
  ]
}
```
