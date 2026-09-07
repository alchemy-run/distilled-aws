# Direct Upload

## Upload videos via direct upload URLs

**post** `/accounts/{account_id}/stream/direct_upload`

Creates a direct upload that allows video uploads without an API key.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Header Parameters

- `"Upload-Creator": optional string`

  A user-defined identifier for the media creator.

### Body Parameters

- `maxDurationSeconds: number`

  The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

- `allowedOrigins: optional array of AllowedOrigins`

  Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

- `creator: optional string`

  A user-defined identifier for the media creator.

- `expiry: optional string`

  The date and time after upload when videos will not be accepted.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing videos.

- `requireSignedURLs: optional boolean`

  Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

- `scheduledDeletion: optional string`

  Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

- `thumbnailTimestampPct: optional number`

  The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

- `watermark: optional object { uid }`

  - `uid: optional string`

    The unique identifier for the watermark profile.

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

- `result: optional object { scheduledDeletion, uid, uploadURL, watermark }`

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploadURL: optional string`

    The URL an unauthenticated upload can use for a single `HTTP POST multipart/form-data` request.

  - `watermark: optional Watermark`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/direct_upload \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "maxDurationSeconds": 1,
          "allowedOrigins": [
            "example.com"
          ],
          "creator": "creator-id_abcde12345",
          "expiry": "2021-01-02T02:20:00Z",
          "meta": {
            "name": "video12345.mp4"
          },
          "requireSignedURLs": true,
          "scheduledDeletion": "2014-01-02T02:20:00Z",
          "thumbnailTimestampPct": 0.529241
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
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploadURL": "www.example.com/samplepath",
    "watermark": {
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
  }
}
```

## Domain Types

### Direct Upload Create Response

- `DirectUploadCreateResponse object { scheduledDeletion, uid, uploadURL, watermark }`

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploadURL: optional string`

    The URL an unauthenticated upload can use for a single `HTTP POST multipart/form-data` request.

  - `watermark: optional Watermark`

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
