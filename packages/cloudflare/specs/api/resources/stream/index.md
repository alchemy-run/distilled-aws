# Stream

## List videos

**get** `/accounts/{account_id}/stream`

Lists up to 1000 videos from a single request. For a specific range, refer to the optional parameters.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Query Parameters

- `id: optional string`

  Filter by video ID(s). Can be a single ID or a comma-separated list of IDs.

- `after: optional string`

  Alias for 'start'. Returns videos created after this date/time (RFC 3339 format).

- `asc: optional boolean`

  Lists videos in ascending order of creation.

- `before: optional string`

  Alias for 'end'. Returns videos created before this date/time (RFC 3339 format).

- `creator: optional string`

  A user-defined identifier for the media creator.

- `end: optional string`

  Lists videos created before the specified date.

- `include_counts: optional boolean`

  Includes the total number of videos associated with the submitted query parameters.

- `limit: optional number`

  Maximum number of videos to return (default 1000, max 1000).

- `live_input_id: optional string`

  Filter by live input ID to find videos associated with a specific live stream.

- `name: optional string`

  Filter by video name/UID(s). Can be a single name or a comma-separated list.

- `search: optional string`

  Provides a partial word match of the `name` key in the `meta` field. Slow for medium to large video libraries. May be unavailable for very large libraries.

- `start: optional string`

  Lists videos created after the specified date.

- `status: optional "pendingupload" or "downloading" or "queued" or 4 more`

  Specifies the processing status for all quality levels for a video.

  - `"pendingupload"`

  - `"downloading"`

  - `"queued"`

  - `"inprogress"`

  - `"ready"`

  - `"error"`

  - `"live-inprogress"`

- `type: optional string`

  Specifies whether the video is `vod` or `live`.

- `video_name: optional string`

  Provides a fast, exact string match on the `name` key in the `meta` field.

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

- `range: optional number`

  The total number of remaining videos based on cursor position.

- `result: optional array of Video`

  - `allowedOrigins: optional array of AllowedOrigins`

    Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

  - `clippedFrom: optional string`

    The unique identifier of the source video this video was clipped from.

  - `created: optional string`

    The date and time the media item was created.

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `duration: optional number`

    The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready.

  - `input: optional object { height, width }`

    - `height: optional number`

      The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video is ready.

    - `width: optional number`

      The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is ready.

  - `liveInput: optional string`

    The live input ID used to upload a video with Stream Live.

  - `maxDurationSeconds: optional number`

    The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

  - `maxSizeBytes: optional number`

    The maximum size in bytes for the video upload.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing videos.

  - `modified: optional string`

    The date and time the media item was last modified.

  - `playback: optional object { dash, hls }`

    - `dash: optional string`

      DASH Media Presentation Description for the video.

    - `hls: optional string`

      The HLS manifest for the video.

  - `preview: optional string`

    The video's preview page URI. This field is omitted until encoding is complete.

  - `publicDetails: optional object { channel_link, logo, media_id, 2 more }`

    Public details for the video including title, share link, channel link, and logo.

    - `channel_link: optional string`

    - `logo: optional string`

    - `media_id: optional number`

    - `share_link: optional string`

    - `title: optional string`

  - `readyToStream: optional boolean`

    Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `readyToStreamAt: optional string`

    Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `requireSignedURLs: optional boolean`

    Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `size: optional number`

    The size of the media item in bytes.

  - `status: optional object { errorReasonCode, errorReasonText, pctComplete, state }`

    Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number between 0 and 100 to indicate the approximate percent of completion. If the `state` is `error`, `errorReasonCode` and `errorReasonText` provide additional details.

    - `errorReasonCode: optional string`

      Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.

    - `errorReasonText: optional string`

      Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `error` state.

    - `pctComplete: optional string`

      Indicates the progress as a percentage between 0 and 100.

    - `state: optional "pendingupload" or "downloading" or "queued" or 4 more`

      Specifies the processing status for all quality levels for a video.

      - `"pendingupload"`

      - `"downloading"`

      - `"queued"`

      - `"inprogress"`

      - `"ready"`

      - `"error"`

      - `"live-inprogress"`

  - `thumbnail: optional string`

    The media item's thumbnail URI. This field is omitted until encoding is complete.

  - `thumbnailTimestampPct: optional number`

    The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploaded: optional string`

    The date and time the media item was uploaded.

  - `uploadExpiry: optional string`

    The date and time when the video upload URL is no longer valid for direct user uploads.

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

- `total: optional number`

  The total number of videos that match the provided filters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream \
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
  "range": 1000,
  "result": [
    {
      "allowedOrigins": [
        "example.com"
      ],
      "clippedFrom": "ea95132c15732412d22c1476fa83f27a",
      "created": "2014-01-02T02:20:00Z",
      "creator": "creator-id_abcde12345",
      "duration": 0,
      "input": {
        "height": 0,
        "width": 0
      },
      "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
      "maxDurationSeconds": 1,
      "maxSizeBytes": 0,
      "meta": {
        "name": "video12345.mp4"
      },
      "modified": "2014-01-02T02:20:00Z",
      "playback": {
        "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd",
        "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8"
      },
      "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
      "publicDetails": {
        "channel_link": "channel_link",
        "logo": "logo",
        "media_id": 0,
        "share_link": "share_link",
        "title": "title"
      },
      "readyToStream": true,
      "readyToStreamAt": "2014-01-02T02:20:00Z",
      "requireSignedURLs": true,
      "scheduledDeletion": "2014-01-02T02:20:00Z",
      "size": 4190963,
      "status": {
        "errorReasonCode": "ERR_NON_VIDEO",
        "errorReasonText": "The file was not recognized as a valid video file.",
        "pctComplete": "45",
        "state": "inprogress"
      },
      "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
      "thumbnailTimestampPct": 0.529241,
      "uid": "ea95132c15732412d22c1476fa83f27a",
      "uploaded": "2014-01-02T02:20:00Z",
      "uploadExpiry": "2014-01-02T02:20:00Z",
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
  ],
  "total": 35586
}
```

## Retrieve video details

**get** `/accounts/{account_id}/stream/{identifier}`

Fetches details for a single video.

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

- `result: optional Video`

  - `allowedOrigins: optional array of AllowedOrigins`

    Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

  - `clippedFrom: optional string`

    The unique identifier of the source video this video was clipped from.

  - `created: optional string`

    The date and time the media item was created.

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `duration: optional number`

    The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready.

  - `input: optional object { height, width }`

    - `height: optional number`

      The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video is ready.

    - `width: optional number`

      The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is ready.

  - `liveInput: optional string`

    The live input ID used to upload a video with Stream Live.

  - `maxDurationSeconds: optional number`

    The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

  - `maxSizeBytes: optional number`

    The maximum size in bytes for the video upload.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing videos.

  - `modified: optional string`

    The date and time the media item was last modified.

  - `playback: optional object { dash, hls }`

    - `dash: optional string`

      DASH Media Presentation Description for the video.

    - `hls: optional string`

      The HLS manifest for the video.

  - `preview: optional string`

    The video's preview page URI. This field is omitted until encoding is complete.

  - `publicDetails: optional object { channel_link, logo, media_id, 2 more }`

    Public details for the video including title, share link, channel link, and logo.

    - `channel_link: optional string`

    - `logo: optional string`

    - `media_id: optional number`

    - `share_link: optional string`

    - `title: optional string`

  - `readyToStream: optional boolean`

    Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `readyToStreamAt: optional string`

    Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `requireSignedURLs: optional boolean`

    Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `size: optional number`

    The size of the media item in bytes.

  - `status: optional object { errorReasonCode, errorReasonText, pctComplete, state }`

    Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number between 0 and 100 to indicate the approximate percent of completion. If the `state` is `error`, `errorReasonCode` and `errorReasonText` provide additional details.

    - `errorReasonCode: optional string`

      Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.

    - `errorReasonText: optional string`

      Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `error` state.

    - `pctComplete: optional string`

      Indicates the progress as a percentage between 0 and 100.

    - `state: optional "pendingupload" or "downloading" or "queued" or 4 more`

      Specifies the processing status for all quality levels for a video.

      - `"pendingupload"`

      - `"downloading"`

      - `"queued"`

      - `"inprogress"`

      - `"ready"`

      - `"error"`

      - `"live-inprogress"`

  - `thumbnail: optional string`

    The media item's thumbnail URI. This field is omitted until encoding is complete.

  - `thumbnailTimestampPct: optional number`

    The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploaded: optional string`

    The date and time the media item was uploaded.

  - `uploadExpiry: optional string`

    The date and time when the video upload URL is no longer valid for direct user uploads.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER \
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
    "allowedOrigins": [
      "example.com"
    ],
    "clippedFrom": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "creator": "creator-id_abcde12345",
    "duration": 0,
    "input": {
      "height": 0,
      "width": 0
    },
    "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
    "maxDurationSeconds": 1,
    "maxSizeBytes": 0,
    "meta": {
      "name": "video12345.mp4"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8"
    },
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
    "publicDetails": {
      "channel_link": "channel_link",
      "logo": "logo",
      "media_id": 0,
      "share_link": "share_link",
      "title": "title"
    },
    "readyToStream": true,
    "readyToStreamAt": "2014-01-02T02:20:00Z",
    "requireSignedURLs": true,
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "size": 4190963,
    "status": {
      "errorReasonCode": "ERR_NON_VIDEO",
      "errorReasonText": "The file was not recognized as a valid video file.",
      "pctComplete": "45",
      "state": "inprogress"
    },
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0.529241,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploaded": "2014-01-02T02:20:00Z",
    "uploadExpiry": "2014-01-02T02:20:00Z",
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

## Initiate video uploads using TUS

**post** `/accounts/{account_id}/stream`

Initiates a video upload using the TUS protocol. On success, the server responds with a status code 201 (created) and includes a `location` header to indicate where the content should be uploaded. Refer to https://tus.io for protocol details.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Query Parameters

- `direct_user: optional boolean`

  Provisions a URL to let your end users upload videos directly to Cloudflare Stream without exposing your API token to clients.

### Header Parameters

- `"Tus-Resumable": "1.0.0"`

  Specifies the TUS protocol version. This value must be included in every upload request.
  Notes: The only supported version of TUS protocol is 1.0.0.

  - `"1.0.0"`

- `"Upload-Length": number`

  Indicates the size of the entire upload in bytes. The value must be a non-negative integer.

- `"Upload-Creator": optional string`

  A user-defined identifier for the media creator.

- `"Upload-Metadata": optional string`

  Comma-separated key-value pairs following the TUS protocol specification. Values are Base-64 encoded.
  Supported keys: `name`, `requiresignedurls`, `allowedorigins`, `thumbnailtimestamppct`, `watermark`, `scheduleddeletion`, `maxdurationseconds`.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Edit video details

**post** `/accounts/{account_id}/stream/{identifier}`

Edit details for a single video.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

### Body Parameters

- `allowedOrigins: optional array of AllowedOrigins`

  Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

- `creator: optional string`

  A user-defined identifier for the media creator.

- `maxDurationSeconds: optional number`

  The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing videos.

- `publicDetails: optional object { channel_link, logo, share_link, title }`

  Public details for the video including title, share link, channel link, and logo.

  - `channel_link: optional string`

  - `logo: optional string`

  - `share_link: optional string`

  - `title: optional string`

- `requireSignedURLs: optional boolean`

  Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

- `scheduledDeletion: optional string`

  Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

- `thumbnailTimestampPct: optional number`

  The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

- `uid: optional string`

  The unique identifier for the video. Can be used to verify the video being updated.

- `uploadExpiry: optional string`

  The date and time when the video upload URL is no longer valid for direct user uploads.

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

- `result: optional Video`

  - `allowedOrigins: optional array of AllowedOrigins`

    Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

  - `clippedFrom: optional string`

    The unique identifier of the source video this video was clipped from.

  - `created: optional string`

    The date and time the media item was created.

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `duration: optional number`

    The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready.

  - `input: optional object { height, width }`

    - `height: optional number`

      The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video is ready.

    - `width: optional number`

      The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is ready.

  - `liveInput: optional string`

    The live input ID used to upload a video with Stream Live.

  - `maxDurationSeconds: optional number`

    The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

  - `maxSizeBytes: optional number`

    The maximum size in bytes for the video upload.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing videos.

  - `modified: optional string`

    The date and time the media item was last modified.

  - `playback: optional object { dash, hls }`

    - `dash: optional string`

      DASH Media Presentation Description for the video.

    - `hls: optional string`

      The HLS manifest for the video.

  - `preview: optional string`

    The video's preview page URI. This field is omitted until encoding is complete.

  - `publicDetails: optional object { channel_link, logo, media_id, 2 more }`

    Public details for the video including title, share link, channel link, and logo.

    - `channel_link: optional string`

    - `logo: optional string`

    - `media_id: optional number`

    - `share_link: optional string`

    - `title: optional string`

  - `readyToStream: optional boolean`

    Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `readyToStreamAt: optional string`

    Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `requireSignedURLs: optional boolean`

    Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `size: optional number`

    The size of the media item in bytes.

  - `status: optional object { errorReasonCode, errorReasonText, pctComplete, state }`

    Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number between 0 and 100 to indicate the approximate percent of completion. If the `state` is `error`, `errorReasonCode` and `errorReasonText` provide additional details.

    - `errorReasonCode: optional string`

      Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.

    - `errorReasonText: optional string`

      Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `error` state.

    - `pctComplete: optional string`

      Indicates the progress as a percentage between 0 and 100.

    - `state: optional "pendingupload" or "downloading" or "queued" or 4 more`

      Specifies the processing status for all quality levels for a video.

      - `"pendingupload"`

      - `"downloading"`

      - `"queued"`

      - `"inprogress"`

      - `"ready"`

      - `"error"`

      - `"live-inprogress"`

  - `thumbnail: optional string`

    The media item's thumbnail URI. This field is omitted until encoding is complete.

  - `thumbnailTimestampPct: optional number`

    The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploaded: optional string`

    The date and time the media item was uploaded.

  - `uploadExpiry: optional string`

    The date and time when the video upload URL is no longer valid for direct user uploads.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allowedOrigins": [
            "example.com"
          ],
          "creator": "creator-id_abcde12345",
          "meta": {
            "name": "video12345.mp4"
          },
          "requireSignedURLs": true,
          "scheduledDeletion": "2014-01-02T02:20:00Z",
          "thumbnailTimestampPct": 0.529241,
          "uid": "ea95132c15732412d22c1476fa83f27a",
          "uploadExpiry": "2014-01-02T02:20:00Z"
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
    "allowedOrigins": [
      "example.com"
    ],
    "clippedFrom": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "creator": "creator-id_abcde12345",
    "duration": 0,
    "input": {
      "height": 0,
      "width": 0
    },
    "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
    "maxDurationSeconds": 1,
    "maxSizeBytes": 0,
    "meta": {
      "name": "video12345.mp4"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8"
    },
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
    "publicDetails": {
      "channel_link": "channel_link",
      "logo": "logo",
      "media_id": 0,
      "share_link": "share_link",
      "title": "title"
    },
    "readyToStream": true,
    "readyToStreamAt": "2014-01-02T02:20:00Z",
    "requireSignedURLs": true,
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "size": 4190963,
    "status": {
      "errorReasonCode": "ERR_NON_VIDEO",
      "errorReasonText": "The file was not recognized as a valid video file.",
      "pctComplete": "45",
      "state": "inprogress"
    },
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0.529241,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploaded": "2014-01-02T02:20:00Z",
    "uploadExpiry": "2014-01-02T02:20:00Z",
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

## Delete video

**delete** `/accounts/{account_id}/stream/{identifier}`

Deletes a video and its copies from Cloudflare Stream.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Allowed Origins

- `AllowedOrigins = string`

### Video

- `Video object { allowedOrigins, clippedFrom, created, 23 more }`

  - `allowedOrigins: optional array of AllowedOrigins`

    Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

  - `clippedFrom: optional string`

    The unique identifier of the source video this video was clipped from.

  - `created: optional string`

    The date and time the media item was created.

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `duration: optional number`

    The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready.

  - `input: optional object { height, width }`

    - `height: optional number`

      The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video is ready.

    - `width: optional number`

      The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is ready.

  - `liveInput: optional string`

    The live input ID used to upload a video with Stream Live.

  - `maxDurationSeconds: optional number`

    The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

  - `maxSizeBytes: optional number`

    The maximum size in bytes for the video upload.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing videos.

  - `modified: optional string`

    The date and time the media item was last modified.

  - `playback: optional object { dash, hls }`

    - `dash: optional string`

      DASH Media Presentation Description for the video.

    - `hls: optional string`

      The HLS manifest for the video.

  - `preview: optional string`

    The video's preview page URI. This field is omitted until encoding is complete.

  - `publicDetails: optional object { channel_link, logo, media_id, 2 more }`

    Public details for the video including title, share link, channel link, and logo.

    - `channel_link: optional string`

    - `logo: optional string`

    - `media_id: optional number`

    - `share_link: optional string`

    - `title: optional string`

  - `readyToStream: optional boolean`

    Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `readyToStreamAt: optional string`

    Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `requireSignedURLs: optional boolean`

    Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `size: optional number`

    The size of the media item in bytes.

  - `status: optional object { errorReasonCode, errorReasonText, pctComplete, state }`

    Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number between 0 and 100 to indicate the approximate percent of completion. If the `state` is `error`, `errorReasonCode` and `errorReasonText` provide additional details.

    - `errorReasonCode: optional string`

      Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.

    - `errorReasonText: optional string`

      Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `error` state.

    - `pctComplete: optional string`

      Indicates the progress as a percentage between 0 and 100.

    - `state: optional "pendingupload" or "downloading" or "queued" or 4 more`

      Specifies the processing status for all quality levels for a video.

      - `"pendingupload"`

      - `"downloading"`

      - `"queued"`

      - `"inprogress"`

      - `"ready"`

      - `"error"`

      - `"live-inprogress"`

  - `thumbnail: optional string`

    The media item's thumbnail URI. This field is omitted until encoding is complete.

  - `thumbnailTimestampPct: optional number`

    The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploaded: optional string`

    The date and time the media item was uploaded.

  - `uploadExpiry: optional string`

    The date and time when the video upload URL is no longer valid for direct user uploads.

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

# Audio Tracks

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

## Edit additional audio tracks on a video

**patch** `/accounts/{account_id}/stream/{identifier}/audio/{audio_identifier}`

Edits additional audio tracks on a video. Editing the default status of an audio track to `true` will mark all other audio tracks on the video default status to `false`.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `audio_identifier: string`

  The unique identifier for an additional audio track.

### Body Parameters

- `default: optional boolean`

  Denotes whether the audio track will be played by default in a player.

- `label: optional string`

  A string to uniquely identify the track amongst other audio track labels for the specified video.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/audio/$AUDIO_IDENTIFIER \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "label": "director commentary"
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

## Delete additional audio tracks on a video

**delete** `/accounts/{account_id}/stream/{identifier}/audio/{audio_identifier}`

Deletes additional audio tracks on a video. Deleting a default audio track is not allowed. You must assign another audio track as default prior to deletion.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `audio_identifier: string`

  The unique identifier for an additional audio track.

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

- `result: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/audio/$AUDIO_IDENTIFIER \
    -X DELETE \
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
  "result": "ok"
}
```

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

## Domain Types

### Audio

- `Audio object { default, label, status, uid }`

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

### Audio Track Get Response

- `AudioTrackGetResponse object { audio }`

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

### Audio Track Delete Response

- `AudioTrackDeleteResponse = string`

# Videos

## Storage use

**get** `/accounts/{account_id}/stream/storage-usage`

Returns information about an account's storage use.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Query Parameters

- `creator: optional string`

  A user-defined identifier for the media creator.

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

- `result: optional object { creator, totalStorageMinutes, totalStorageMinutesLimit, videoCount }`

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `totalStorageMinutes: optional number`

    The total minutes of video content stored in the account. May contain decimal values.

  - `totalStorageMinutesLimit: optional number`

    The storage capacity alloted for the account.

  - `videoCount: optional number`

    The total count of videos associated with the account.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/storage-usage \
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
    "creator": "creator-id_abcde12345",
    "totalStorageMinutes": 0,
    "totalStorageMinutesLimit": 0,
    "videoCount": 0
  }
}
```

## Domain Types

### Video Storage Usage Response

- `VideoStorageUsageResponse object { creator, totalStorageMinutes, totalStorageMinutesLimit, videoCount }`

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `totalStorageMinutes: optional number`

    The total minutes of video content stored in the account. May contain decimal values.

  - `totalStorageMinutesLimit: optional number`

    The storage capacity alloted for the account.

  - `videoCount: optional number`

    The total count of videos associated with the account.

# Clip

## Clip videos given a start and end time

**post** `/accounts/{account_id}/stream/clip`

Clips a video based on the specified start and end times provided in seconds.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

- `clippedFromVideoUID: string`

  The unique video identifier (UID).

- `endTimeSeconds: number`

  Specifies the end time for the video clip in seconds.

- `startTimeSeconds: number`

  Specifies the start time for the video clip in seconds.

- `allowedOrigins: optional array of AllowedOrigins`

  Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

- `creator: optional string`

  A user-defined identifier for the media creator.

- `input: optional string`

  A video's URL. Preferred over 'url'.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing videos.

- `name: optional string`

  A name for the video.

- `requireSignedURLs: optional boolean`

  Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

- `scheduledDeletion: optional string`

  Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

- `thumbnailTimestampPct: optional number`

  The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

- `url: optional string`

  A video's URL (legacy field, use 'input' instead).

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

- `result: optional Video`

  - `allowedOrigins: optional array of AllowedOrigins`

    Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

  - `clippedFrom: optional string`

    The unique identifier of the source video this video was clipped from.

  - `created: optional string`

    The date and time the media item was created.

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `duration: optional number`

    The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready.

  - `input: optional object { height, width }`

    - `height: optional number`

      The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video is ready.

    - `width: optional number`

      The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is ready.

  - `liveInput: optional string`

    The live input ID used to upload a video with Stream Live.

  - `maxDurationSeconds: optional number`

    The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

  - `maxSizeBytes: optional number`

    The maximum size in bytes for the video upload.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing videos.

  - `modified: optional string`

    The date and time the media item was last modified.

  - `playback: optional object { dash, hls }`

    - `dash: optional string`

      DASH Media Presentation Description for the video.

    - `hls: optional string`

      The HLS manifest for the video.

  - `preview: optional string`

    The video's preview page URI. This field is omitted until encoding is complete.

  - `publicDetails: optional object { channel_link, logo, media_id, 2 more }`

    Public details for the video including title, share link, channel link, and logo.

    - `channel_link: optional string`

    - `logo: optional string`

    - `media_id: optional number`

    - `share_link: optional string`

    - `title: optional string`

  - `readyToStream: optional boolean`

    Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `readyToStreamAt: optional string`

    Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `requireSignedURLs: optional boolean`

    Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `size: optional number`

    The size of the media item in bytes.

  - `status: optional object { errorReasonCode, errorReasonText, pctComplete, state }`

    Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number between 0 and 100 to indicate the approximate percent of completion. If the `state` is `error`, `errorReasonCode` and `errorReasonText` provide additional details.

    - `errorReasonCode: optional string`

      Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.

    - `errorReasonText: optional string`

      Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `error` state.

    - `pctComplete: optional string`

      Indicates the progress as a percentage between 0 and 100.

    - `state: optional "pendingupload" or "downloading" or "queued" or 4 more`

      Specifies the processing status for all quality levels for a video.

      - `"pendingupload"`

      - `"downloading"`

      - `"queued"`

      - `"inprogress"`

      - `"ready"`

      - `"error"`

      - `"live-inprogress"`

  - `thumbnail: optional string`

    The media item's thumbnail URI. This field is omitted until encoding is complete.

  - `thumbnailTimestampPct: optional number`

    The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploaded: optional string`

    The date and time the media item was uploaded.

  - `uploadExpiry: optional string`

    The date and time when the video upload URL is no longer valid for direct user uploads.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/clip \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "clippedFromVideoUID": "023e105f4ecef8ad9ca31a8372d0c353",
          "endTimeSeconds": 0,
          "startTimeSeconds": 0,
          "allowedOrigins": [
            "example.com"
          ],
          "creator": "creator-id_abcde12345",
          "input": "https://example.com/myvideo.mp4",
          "meta": {
            "name": "video12345.mp4"
          },
          "name": "myvideo.mp4",
          "requireSignedURLs": true,
          "scheduledDeletion": "2014-01-02T02:20:00Z",
          "thumbnailTimestampPct": 0.529241,
          "url": "https://example.com/myvideo.mp4"
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
    "allowedOrigins": [
      "example.com"
    ],
    "clippedFrom": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "creator": "creator-id_abcde12345",
    "duration": 0,
    "input": {
      "height": 0,
      "width": 0
    },
    "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
    "maxDurationSeconds": 1,
    "maxSizeBytes": 0,
    "meta": {
      "name": "video12345.mp4"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8"
    },
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
    "publicDetails": {
      "channel_link": "channel_link",
      "logo": "logo",
      "media_id": 0,
      "share_link": "share_link",
      "title": "title"
    },
    "readyToStream": true,
    "readyToStreamAt": "2014-01-02T02:20:00Z",
    "requireSignedURLs": true,
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "size": 4190963,
    "status": {
      "errorReasonCode": "ERR_NON_VIDEO",
      "errorReasonText": "The file was not recognized as a valid video file.",
      "pctComplete": "45",
      "state": "inprogress"
    },
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0.529241,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploaded": "2014-01-02T02:20:00Z",
    "uploadExpiry": "2014-01-02T02:20:00Z",
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

### Clip

- `Clip object { allowedOrigins, clippedFromVideoUID, created, 12 more }`

  - `allowedOrigins: optional array of AllowedOrigins`

    Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

  - `clippedFromVideoUID: optional string`

    The unique video identifier (UID).

  - `created: optional string`

    The date and time the clip was created.

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `endTimeSeconds: optional number`

    Specifies the end time for the video clip in seconds.

  - `maxDurationSeconds: optional number`

    The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing videos.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `playback: optional object { dash, hls }`

    - `dash: optional string`

      DASH Media Presentation Description for the video.

    - `hls: optional string`

      The HLS manifest for the video.

  - `preview: optional string`

    The video's preview page URI. This field is omitted until encoding is complete.

  - `requireSignedURLs: optional boolean`

    Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

  - `startTimeSeconds: optional number`

    Specifies the start time for the video clip in seconds.

  - `status: optional "pendingupload" or "downloading" or "queued" or 4 more`

    Specifies the processing status for all quality levels for a video.

    - `"pendingupload"`

    - `"downloading"`

    - `"queued"`

    - `"inprogress"`

    - `"ready"`

    - `"error"`

    - `"live-inprogress"`

  - `thumbnailTimestampPct: optional number`

    The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

  - `watermark: optional object { uid }`

    - `uid: optional string`

      The unique identifier for the watermark profile.

# Copy

## Upload videos from a URL

**post** `/accounts/{account_id}/stream/copy`

Uploads a video to Stream from a provided URL.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Header Parameters

- `"Upload-Creator": optional string`

  A user-defined identifier for the media creator.

### Body Parameters

- `allowedOrigins: optional array of AllowedOrigins`

  Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

- `creator: optional string`

  A user-defined identifier for the media creator.

- `input: optional string`

  A video's URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-range` header that includes the size of the file. This is the preferred field over `url`.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing videos.

- `name: optional string`

  A video's name. Used for legacy compatibility.

- `requireSignedURLs: optional boolean`

  Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

- `scheduledDeletion: optional string`

  Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

- `thumbnailTimestampPct: optional number`

  The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

- `url: optional string`

  A video's URL. The server must be publicly routable and support `HTTP HEAD` requests and `HTTP GET` range requests. The server should respond to `HTTP HEAD` requests with a `content-range` header that includes the size of the file. This field is deprecated in favor of `input`.

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

- `result: optional Video`

  - `allowedOrigins: optional array of AllowedOrigins`

    Lists the origins allowed to display the video. Enter allowed origin domains in an array and use `*` for wildcard subdomains. Empty arrays allow the video to be viewed on any origin.

  - `clippedFrom: optional string`

    The unique identifier of the source video this video was clipped from.

  - `created: optional string`

    The date and time the media item was created.

  - `creator: optional string`

    A user-defined identifier for the media creator.

  - `duration: optional number`

    The duration of the video in seconds. A value of `-1` means the duration is unknown. The duration becomes available after the upload and before the video is ready.

  - `input: optional object { height, width }`

    - `height: optional number`

      The video height in pixels. A value of `-1` means the height is unknown. The value becomes available after the upload and before the video is ready.

    - `width: optional number`

      The video width in pixels. A value of `-1` means the width is unknown. The value becomes available after the upload and before the video is ready.

  - `liveInput: optional string`

    The live input ID used to upload a video with Stream Live.

  - `maxDurationSeconds: optional number`

    The maximum duration in seconds for a video upload. Can be set for a video that is not yet uploaded to limit its duration. Uploads that exceed the specified duration will fail during processing. A value of `-1` means the value is unknown.

  - `maxSizeBytes: optional number`

    The maximum size in bytes for the video upload.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing videos.

  - `modified: optional string`

    The date and time the media item was last modified.

  - `playback: optional object { dash, hls }`

    - `dash: optional string`

      DASH Media Presentation Description for the video.

    - `hls: optional string`

      The HLS manifest for the video.

  - `preview: optional string`

    The video's preview page URI. This field is omitted until encoding is complete.

  - `publicDetails: optional object { channel_link, logo, media_id, 2 more }`

    Public details for the video including title, share link, channel link, and logo.

    - `channel_link: optional string`

    - `logo: optional string`

    - `media_id: optional number`

    - `share_link: optional string`

    - `title: optional string`

  - `readyToStream: optional boolean`

    Indicates whether the video is playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `readyToStreamAt: optional string`

    Indicates the time at which the video became playable. The field is empty if the video is not ready for viewing or the live stream is still in progress.

  - `requireSignedURLs: optional boolean`

    Indicates whether the video can be a accessed using the UID. When set to `true`, a signed token must be generated with a signing key to view the video.

  - `scheduledDeletion: optional string`

    Indicates the date and time at which the video will be deleted. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion. If specified, must be at least 30 days from upload time.

  - `size: optional number`

    The size of the media item in bytes.

  - `status: optional object { errorReasonCode, errorReasonText, pctComplete, state }`

    Specifies a detailed status for a video. If the `state` is `inprogress` or `error`, the `step` field returns `encoding` or `manifest`. If the `state` is `inprogress`, `pctComplete` returns a number between 0 and 100 to indicate the approximate percent of completion. If the `state` is `error`, `errorReasonCode` and `errorReasonText` provide additional details.

    - `errorReasonCode: optional string`

      Specifies why the video failed to encode. This field is empty if the video is not in an `error` state. Preferred for programmatic use.

    - `errorReasonText: optional string`

      Specifies why the video failed to encode using a human readable error message in English. This field is empty if the video is not in an `error` state.

    - `pctComplete: optional string`

      Indicates the progress as a percentage between 0 and 100.

    - `state: optional "pendingupload" or "downloading" or "queued" or 4 more`

      Specifies the processing status for all quality levels for a video.

      - `"pendingupload"`

      - `"downloading"`

      - `"queued"`

      - `"inprogress"`

      - `"ready"`

      - `"error"`

      - `"live-inprogress"`

  - `thumbnail: optional string`

    The media item's thumbnail URI. This field is omitted until encoding is complete.

  - `thumbnailTimestampPct: optional number`

    The timestamp for a thumbnail image calculated as a percentage value of the video's duration. To convert from a second-wise timestamp to a percentage, divide the desired timestamp by the total duration of the video.  If this value is not set, the default thumbnail image is taken from 0s of the video.

  - `uid: optional string`

    A Cloudflare-generated unique identifier for a media item.

  - `uploaded: optional string`

    The date and time the media item was uploaded.

  - `uploadExpiry: optional string`

    The date and time when the video upload URL is no longer valid for direct user uploads.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/copy \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "allowedOrigins": [
            "example.com"
          ],
          "creator": "creator-id_abcde12345",
          "input": "https://example.com/myvideo.mp4",
          "meta": {
            "name": "video12345.mp4"
          },
          "name": "myvideo.mp4",
          "requireSignedURLs": true,
          "scheduledDeletion": "2014-01-02T02:20:00Z",
          "thumbnailTimestampPct": 0.529241,
          "url": "https://example.com/myvideo.mp4"
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
    "allowedOrigins": [
      "example.com"
    ],
    "clippedFrom": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "creator": "creator-id_abcde12345",
    "duration": 0,
    "input": {
      "height": 0,
      "width": 0
    },
    "liveInput": "fc0a8dc887b16759bfd9ad922230a014",
    "maxDurationSeconds": 1,
    "maxSizeBytes": 0,
    "meta": {
      "name": "video12345.mp4"
    },
    "modified": "2014-01-02T02:20:00Z",
    "playback": {
      "dash": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.mpd",
      "hls": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/manifest/video.m3u8"
    },
    "preview": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/watch",
    "publicDetails": {
      "channel_link": "channel_link",
      "logo": "logo",
      "media_id": 0,
      "share_link": "share_link",
      "title": "title"
    },
    "readyToStream": true,
    "readyToStreamAt": "2014-01-02T02:20:00Z",
    "requireSignedURLs": true,
    "scheduledDeletion": "2014-01-02T02:20:00Z",
    "size": 4190963,
    "status": {
      "errorReasonCode": "ERR_NON_VIDEO",
      "errorReasonText": "The file was not recognized as a valid video file.",
      "pctComplete": "45",
      "state": "inprogress"
    },
    "thumbnail": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/ea95132c15732412d22c1476fa83f27a/thumbnails/thumbnail.jpg",
    "thumbnailTimestampPct": 0.529241,
    "uid": "ea95132c15732412d22c1476fa83f27a",
    "uploaded": "2014-01-02T02:20:00Z",
    "uploadExpiry": "2014-01-02T02:20:00Z",
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

# Keys

## List signing keys

**get** `/accounts/{account_id}/stream/keys`

Lists the video ID and creation date and time when a signing key was created.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional array of object { id, created, key_id }`

  - `id: optional string`

    Identifier.

  - `created: optional string`

    The date and time a signing key was created.

  - `key_id: optional string`

    The unique identifier for the signing key.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/keys \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created": "2014-01-02T02:20:00Z",
      "key_id": "e9db990a82666dd571c77f944a5c5c8d"
    }
  ]
}
```

## Create signing keys

**post** `/accounts/{account_id}/stream/keys`

Creates an RSA private key in PEM and JWK formats. Key files are only displayed once after creation. Keys are created, used, and deleted independently of videos, and every key can sign any video.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: unknown`

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

- `result: optional Keys`

  - `id: optional string`

    Identifier.

  - `created: optional string`

    The date and time a signing key was created.

  - `jwk: optional string`

    The signing key in JWK format.

  - `pem: optional string`

    The signing key in PEM format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/keys \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created": "2014-01-02T02:20:00Z",
    "jwk": "eyJ1c2UiOiJzaWciLCJrdHkiOiJSU0EiLCJraWQiOiI1MjEzY2ZhMTIxZjcwYjhjMTM4MDY4NmZmYzM3MWJhMyIsImFsZyI6IlJTMjU2IiwibiI6IjBUandqT2laV21KNDN2ZjNUbzREb1htWFd0SkdOR3lYZmh5dHRMYUJnRjEtRVFXUURLaG9LYm9hS21xakNBc21za3V0YkxVN1BVOGRrUU5ER1p3S3VWczA4elNaNGt4aTR0RWdQUFp5dDdkWEMtbFlSWW95ckFHRjRBWGh5MzI5YkhDUDFJbHJCQl9Ba0dnbmRMQWd1bnhZMHJSZ2N2T3ppYXc2S0p4Rm5jMlVLMFdVOGIwcDRLS0hHcDFLTDlkazBXVDhkVllxYmVSaUpqQ2xVRW1oOHl2OUNsT1ZhUzRLeGlYNnhUUTREWnc2RGFKZklWM1F0Tmd2cG1ieWxOSmFQSG5zc3JodDJHS1A5NjJlS2poUVJsaWd2SFhKTE9uSm9KZkxlSUVIWi1peFdmY1RETUg5MnNHdm93MURPanhMaUNOMXpISy1oN2JMb1hUaUxnYzRrdyIsImUiOiJBUUFCIiwiZCI6IndpQWEwaU5mWnNYSGNOcVMxSWhnUmdzVHJHay1TcFlYV2lReDZHTU9kWlJKekhGazN0bkRERFJvNHNKZTBxX0dEOWkzNlEyZkVadS15elpEcEJkc3U5OHNtaHhNU19Ta0s5X3VFYUo1Zm96V2IyN3JRRnFoLVliUU9MUThkUnNPRHZmQl9Hb2txWWJzblJDR3kzWkFaOGZJZ25ocXBUNEpiOHdsaWxpMUgxeFpzM3RnTWtkTEluTm1yMFAtcTYxZEtNd3JYZVRoSWNEc0kyb2Z1LTFtRm1MWndQb2ZGbmxaTW9QN1pfRU5pUGNfWGtWNzFhaHBOZE9pcW5ablZtMHBCNE5QS1UweDRWTjQyYlAzWEhMUmpkV2hJOGt3SC1BdXhqb3BLaHJ0R2tvcG1jZFRkM1ZRdElaOGRpZHByMXpBaEpvQi16ZVlIaTFUel9ZSFFld0FRUSIsInAiOiIyVTZFVUJka3U3TndDYXoyNzZuWGMxRXgwVHpNZjU4U0UtU2M2eUNaYWk2TkwzVURpWi1mNHlIdkRLYnFGUXdLWDNwZ0l2aVE3Y05QYUpkbE9NeS1mU21GTXU3V3hlbVZYamFlTjJCMkRDazhQY0NEOVgxU2hhR3E1ZUdSSHNObVUtSDNxTG1FRGpjLWliazRHZ0RNb2lVYjQ2OGxFZHAwU2pIOXdsOUdsYTgiLCJxIjoiOW5ucXg5ZnNNY2dIZ29DemhfVjJmaDhoRUxUSUM5aFlIOVBCTG9aQjZIaE1TWG1ja1BSazVnUlpPWlFEN002TzlMaWZjNmFDVXdEbjBlQzU2YkFDNUNrcWxjODJsVDhzTWlMeWJyTjh3bWotcjNjSTBGQTlfSGQySEY1ZkgycnJmenVqd0NWM3czb09Ud3p4d1g3c2xKbklRanphel91SzEyWEtucVZZcUYwIiwiZHAiOiJxQklTUTlfVUNWaV9Ucng0UU9VYnZoVU9jc2FUWkNHajJiNzNudU9YeElnOHFuZldSSnN4RG5zd2FKaXdjNWJjYnZ3M1h0VGhRd1BNWnhpeE1UMHFGNlFGWVY5WXZibnJ6UEp4YkdNdTZqajZYc2lIUjFlbWU3U09lVDM4Xzg0aFZyOXV6UkN2RWstb0R0MHlodW9YVzFGWVFNRTE2cGtMV0ZkUjdRUERsQUUiLCJkcSI6Im5zQUp3eXZFbW8tdW5wU01qYjVBMHB6MExCRjBZNFMxeGRJYXNfLVBSYzd0dThsVFdWMl8teExEOFR6dmhqX0lmY0RJR3JJZGNKNjlzVVZnR1M3ZnZkcng3Y21uNjFyai1XcmU0UVJFRC1lV1dxZDlpc2FVRmg5UGVKZ2tCbFZVVnYtdnladVlWdFF2a1NUU05ZR3RtVXl2V2xKZDBPWEFHRm9jdGlfak9aVSIsInFpIjoib0dYaWxLQ2NKRXNFdEE1eG54WUdGQW5UUjNwdkZLUXR5S0F0UGhHaHkybm5ya2VzN1RRaEFxMGhLRWZtU1RzaE1hNFhfd05aMEstX1F0dkdoNDhpeHdTTDVLTEwxZnFsY0k2TF9XUnF0cFQxS21LRERlUHR2bDVCUzFGbjgwSGFwR215cmZRWUU4S09QR2UwUl82S1BOZE1vc3dYQ3Nfd0RYMF92ZzNoNUxRIn0=",
    "pem": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcGdJQkFBS0NBUUVBMFRqd2pPaVpXbUo0M3ZmM1RvNERvWG1YV3RKR05HeVhmaHl0dExhQmdGMStFUVdRCkRLaG9LYm9hS21xakNBc21za3V0YkxVN1BVOGRrUU5ER1p3S3VWczA4elNaNGt4aTR0RWdQUFp5dDdkWEMrbFkKUllveXJBR0Y0QVhoeTMyOWJIQ1AxSWxyQkIvQWtHZ25kTEFndW54WTByUmdjdk96aWF3NktKeEZuYzJVSzBXVQo4YjBwNEtLSEdwMUtMOWRrMFdUOGRWWXFiZVJpSmpDbFVFbWg4eXY5Q2xPVmFTNEt4aVg2eFRRNERadzZEYUpmCklWM1F0Tmd2cG1ieWxOSmFQSG5zc3JodDJHS1A5NjJlS2poUVJsaWd2SFhKTE9uSm9KZkxlSUVIWitpeFdmY1QKRE1IOTJzR3ZvdzFET2p4TGlDTjF6SEsraDdiTG9YVGlMZ2M0a3dJREFRQUJBb0lCQVFEQ0lCclNJMTlteGNkdwoycExVaUdCR0N4T3NhVDVLbGhkYUpESG9ZdzUxbEVuTWNXVGUyY01NTkdqaXdsN1NyOFlQMkxmcERaOFJtNzdMCk5rT2tGMnk3M3l5YUhFeEw5S1FyMys0Um9ubCtqTlp2YnV0QVdxSDVodEE0dER4MUd3NE85OEg4YWlTcGh1eWQKRUliTGRrQm54OGlDZUdxbFBnbHZ6Q1dLV0xVZlhGbXplMkF5UjBzaWMyYXZRLzZyclYwb3pDdGQ1T0Vod093agphaCs3N1dZV1l0bkEraDhXZVZreWcvdG44UTJJOXo5ZVJYdlZxR2sxMDZLcWRtZFdiU2tIZzA4cFRUSGhVM2paCnMvZGNjdEdOMWFFanlUQWY0QzdHT2lrcUd1MGFTaW1aeDFOM2RWQzBobngySjJtdlhNQ0VtZ0g3TjVnZUxWUFAKOWdkQjdBQkJBb0dCQU5sT2hGQVhaTHV6Y0Ftczl1K3AxM05STWRFOHpIK2ZFaFBrbk9zZ21Xb3VqUzkxQTRtZgpuK01oN3d5bTZoVU1DbDk2WUNMNGtPM0RUMmlYWlRqTXZuMHBoVEx1MXNYcGxWNDJuamRnZGd3cFBEM0FnL1Y5ClVvV2hxdVhoa1I3RFpsUGg5Nmk1aEE0M1BvbTVPQm9BektJbEcrT3ZKUkhhZEVveC9jSmZScFd2QW9HQkFQWjUKNnNmWDdESElCNEtBczRmMWRuNGZJUkMweUF2WVdCL1R3UzZHUWVoNFRFbDVuSkQwWk9ZRVdUbVVBK3pPanZTNApuM09tZ2xNQTU5SGd1ZW13QXVRcEtwWFBOcFUvTERJaThtNnpmTUpvL3E5M0NOQlFQZngzZGh4ZVh4OXE2Mzg3Cm84QWxkOE42RGs4TThjRis3SlNaeUVJODJzLzdpdGRseXA2bFdLaGRBb0dCQUtnU0VrUGYxQWxZdjA2OGVFRGwKRzc0VkRuTEdrMlFobzltKzk1N2psOFNJUEtwMzFrU2JNUTU3TUdpWXNIT1czRzc4TjE3VTRVTUR6R2NZc1RFOQpLaGVrQldGZldMMjU2OHp5Y1d4akx1bzQrbDdJaDBkWHBudTBqbms5L1AvT0lWYS9iczBRcnhKUHFBN2RNb2JxCkYxdFJXRURCTmVxWkMxaFhVZTBEdzVRQkFvR0JBSjdBQ2NNcnhKcVBycDZVakkyK1FOS2M5Q3dSZEdPRXRjWFMKR3JQL2owWE83YnZKVTFsZHYvc1N3L0U4NzRZL3lIM0F5QnF5SFhDZXZiRkZZQmt1MzczYThlM0pwK3RhNC9scQozdUVFUkEvbmxscW5mWXJHbEJZZlQzaVlKQVpWVkZiL3I4bWJtRmJVTDVFazBqV0JyWmxNcjFwU1hkRGx3QmhhCkhMWXY0em1WQW9HQkFLQmw0cFNnbkNSTEJMUU9jWjhXQmhRSjAwZDZieFNrTGNpZ0xUNFJvY3RwNTY1SHJPMDAKSVFLdElTaEg1a2s3SVRHdUYvOERXZEN2djBMYnhvZVBJc2NFaStTaXk5WDZwWENPaS8xa2FyYVU5U3BpZ3czago3YjVlUVV0UlovTkIycVJwc3EzMEdCUENqanhudEVmK2lqelhUS0xNRndyUDhBMTlQNzRONGVTMAotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="
  }
}
```

## Delete signing keys

**delete** `/accounts/{account_id}/stream/keys/{identifier}`

Deletes signing keys and revokes all signed URLs generated with the key.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  Identifier.

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

- `result: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/keys/$IDENTIFIER \
    -X DELETE \
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
  "result": "ok"
}
```

## Domain Types

### Keys

- `Keys object { id, created, jwk, pem }`

  - `id: optional string`

    Identifier.

  - `created: optional string`

    The date and time a signing key was created.

  - `jwk: optional string`

    The signing key in JWK format.

  - `pem: optional string`

    The signing key in PEM format.

### Key Get Response

- `KeyGetResponse object { id, created, key_id }`

  - `id: optional string`

    Identifier.

  - `created: optional string`

    The date and time a signing key was created.

  - `key_id: optional string`

    The unique identifier for the signing key.

### Key Delete Response

- `KeyDeleteResponse = string`

# Live Inputs

## List live inputs

**get** `/accounts/{account_id}/stream/live_inputs`

Lists the live inputs created for an account. To get the credentials needed to stream to a specific live input, request a single live input.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `include_counts: optional boolean`

  Includes the total number of videos associated with the submitted query parameters.

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

- `result: optional object { liveInputs, range, total }`

  - `liveInputs: optional array of object { created, deleteRecordingAfterDays, enabled, 3 more }`

    - `created: optional string`

      The date and time the live input was created.

    - `deleteRecordingAfterDays: optional number`

      Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

    - `enabled: optional boolean`

      Indicates whether the live input is enabled and can accept streams.

    - `meta: optional unknown`

      A user modifiable key-value store used to reference other systems of record for managing live inputs.

    - `modified: optional string`

      The date and time the live input was last modified.

    - `uid: optional string`

      A unique identifier for a live input.

  - `range: optional number`

    The total number of remaining live inputs based on cursor position.

  - `total: optional number`

    The total number of live inputs that match the provided filters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs \
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
    "liveInputs": [
      {
        "created": "2014-01-02T02:20:00Z",
        "deleteRecordingAfterDays": 45,
        "enabled": true,
        "meta": {
          "name": "test stream 1"
        },
        "modified": "2014-01-02T02:20:00Z",
        "uid": "66be4bf738797e01e1fca35a7bdecdcd"
      }
    ],
    "range": 1000,
    "total": 35586
  }
}
```

## Retrieve a live input

**get** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}`

Retrieves details of an existing live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

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

- `result: optional LiveInput`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER \
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
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```

## Create a live input

**post** `/accounts/{account_id}/stream/live_inputs`

Creates a live input, and returns credentials that you or your users can use to stream live video to Cloudflare Stream.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `defaultCreator: optional string`

  Sets the creator ID asssociated with this live input.

- `deleteRecordingAfterDays: optional number`

  Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

- `enabled: optional boolean`

  Indicates whether the live input is enabled and can accept streams.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing live inputs.

- `preferLowLatency: optional boolean`

  When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

- `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

  Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

  - `allowedOrigins: optional array of string`

    Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

  - `hideLiveViewerCount: optional boolean`

    Disables reporting the number of live viewers when this property is set to `true`.

  - `mode: optional "off" or "automatic"`

    Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

    - `"off"`

    - `"automatic"`

  - `requireSignedURLs: optional boolean`

    Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

  - `timeoutSeconds: optional number`

    Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

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

- `result: optional LiveInput`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "deleteRecordingAfterDays": 45,
          "enabled": true,
          "meta": {
            "name": "test stream 1"
          },
          "preferLowLatency": true,
          "recording": {
            "hideLiveViewerCount": false,
            "mode": "off",
            "requireSignedURLs": false,
            "timeoutSeconds": 0
          }
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
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```

## Update a live input

**put** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}`

Updates a specified live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

### Body Parameters

- `defaultCreator: optional string`

  Sets the creator ID asssociated with this live input.

- `deleteRecordingAfterDays: optional number`

  Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

- `enabled: optional boolean`

  Indicates whether the live input is enabled and can accept streams.

- `meta: optional unknown`

  A user modifiable key-value store used to reference other systems of record for managing live inputs.

- `preferLowLatency: optional boolean`

  When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

- `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

  Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

  - `allowedOrigins: optional array of string`

    Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

  - `hideLiveViewerCount: optional boolean`

    Disables reporting the number of live viewers when this property is set to `true`.

  - `mode: optional "off" or "automatic"`

    Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

    - `"off"`

    - `"automatic"`

  - `requireSignedURLs: optional boolean`

    Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

  - `timeoutSeconds: optional number`

    Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

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

- `result: optional LiveInput`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "deleteRecordingAfterDays": 45,
          "enabled": true,
          "meta": {
            "name": "test stream 1"
          },
          "preferLowLatency": true,
          "recording": {
            "hideLiveViewerCount": false,
            "mode": "off",
            "requireSignedURLs": false,
            "timeoutSeconds": 0
          }
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
    "created": "2014-01-02T02:20:00Z",
    "deleteRecordingAfterDays": 45,
    "enabled": true,
    "keysRotatedAt": "2014-01-02T02:20:00Z",
    "meta": {
      "name": "test stream 1"
    },
    "modified": "2014-01-02T02:20:00Z",
    "preferLowLatency": true,
    "recording": {
      "allowedOrigins": [
        "example.com"
      ],
      "hideLiveViewerCount": false,
      "mode": "off",
      "requireSignedURLs": false,
      "timeoutSeconds": 0
    },
    "rtmps": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "rtmpsPlayback": {
      "streamKey": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "srt": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "srt://live.cloudflare.com:778"
    },
    "srtPlayback": {
      "passphrase": "2fb3cb9f17e68a2568d6ebed8d5505eak3ceaf8c9b1f395e1b76b79332497cada",
      "streamId": "f256e6ea9341d51eea64c9454659e576",
      "url": "rtmps://live.cloudflare.com:443/live/"
    },
    "status": "connected",
    "uid": "66be4bf738797e01e1fca35a7bdecdcd",
    "webRTC": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/publish"
    },
    "webRTCPlayback": {
      "url": "https://customer-m033z5x00ks6nunl.cloudflarestream.com/b236bde30eb07b9d01318940e5fc3edake34a3efb3896e18f2dc277ce6cc993ad/webRTC/play"
    }
  }
}
```

## Delete a live input

**delete** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}`

Prevents a live input from being streamed to and makes the live input inaccessible to any future API calls.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```

## Domain Types

### Live Input

- `LiveInput object { created, deleteRecordingAfterDays, enabled, 13 more }`

  Details about a live input.

  - `created: optional string`

    The date and time the live input was created.

  - `deleteRecordingAfterDays: optional number`

    Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

  - `enabled: optional boolean`

    Indicates whether the live input is enabled and can accept streams.

  - `keysRotatedAt: optional string`

    The date and time the live input keys were last rotated. Omitted for live inputs that have never had their keys rotated.

  - `meta: optional unknown`

    A user modifiable key-value store used to reference other systems of record for managing live inputs.

  - `modified: optional string`

    The date and time the live input was last modified.

  - `preferLowLatency: optional boolean`

    When enabled, the live stream is delivered using Low-Latency HLS (LL-HLS), reducing glass-to-glass latency for viewers at the cost of reduced player compatibility.

  - `recording: optional object { allowedOrigins, hideLiveViewerCount, mode, 2 more }`

    Records the input to a Cloudflare Stream video. Behavior depends on the mode. In most cases, the video will initially be viewable as a live video and transition to on-demand after a condition is satisfied.

    - `allowedOrigins: optional array of string`

      Lists the origins allowed to display videos created with this input. Enter allowed origin domains in an array and use `*` for wildcard subdomains. An empty array allows videos to be viewed on any origin.

    - `hideLiveViewerCount: optional boolean`

      Disables reporting the number of live viewers when this property is set to `true`.

    - `mode: optional "off" or "automatic"`

      Specifies the recording behavior for the live input. Set this value to `off` to prevent a recording. Set the value to `automatic` to begin a recording and transition to on-demand after Stream Live stops receiving input.

      - `"off"`

      - `"automatic"`

    - `requireSignedURLs: optional boolean`

      Indicates if a video using the live input has the `requireSignedURLs` property set. Also enforces access controls on any video recording of the livestream with the live input.

    - `timeoutSeconds: optional number`

      Determines the amount of time a live input configured in `automatic` mode should wait before a recording transitions from live to on-demand. `0` is recommended for most use cases and indicates the platform default should be used.

  - `rtmps: optional object { streamKey, url }`

    Details for streaming to an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use when streaming via RTMPS to a live input.

    - `url: optional string`

      The RTMPS URL you provide to the broadcaster, which they stream live video to.

  - `rtmpsPlayback: optional object { streamKey, url }`

    Details for playback from an live input using RTMPS.

    - `streamKey: optional string`

      The secret key to use for playback via RTMPS.

    - `url: optional string`

      The URL used to play live video over RTMPS.

  - `srt: optional object { passphrase, streamId, url }`

    Details for streaming to a live input using SRT.

    - `passphrase: optional string`

      The secret key to use when streaming via SRT to a live input.

    - `streamId: optional string`

      The identifier of the live input to use when streaming via SRT.

    - `url: optional string`

      The SRT URL you provide to the broadcaster, which they stream live video to.

  - `srtPlayback: optional object { passphrase, streamId, url }`

    Details for playback from an live input using SRT.

    - `passphrase: optional string`

      The secret key to use for playback via SRT.

    - `streamId: optional string`

      The identifier of the live input to use for playback via SRT.

    - `url: optional string`

      The URL used to play live video over SRT.

  - `status: optional "connected" or "reconnected" or "reconnecting" or 5 more`

    The connection status of a live input.

    - `"connected"`

    - `"reconnected"`

    - `"reconnecting"`

    - `"client_disconnect"`

    - `"ttl_exceeded"`

    - `"failed_to_connect"`

    - `"failed_to_reconnect"`

    - `"new_configuration_accepted"`

  - `uid: optional string`

    A unique identifier for a live input.

  - `webRTC: optional object { url }`

    Details for streaming to a live input using WebRTC.

    - `url: optional string`

      The WebRTC URL you provide to the broadcaster, which they stream live video to.

  - `webRTCPlayback: optional object { url }`

    Details for playback from a live input using WebRTC.

    - `url: optional string`

      The URL used to play live video over WebRTC.

### Live Input List Response

- `LiveInputListResponse object { liveInputs, range, total }`

  - `liveInputs: optional array of object { created, deleteRecordingAfterDays, enabled, 3 more }`

    - `created: optional string`

      The date and time the live input was created.

    - `deleteRecordingAfterDays: optional number`

      Indicates the number of days after which the live inputs recordings will be deleted. When a stream completes and the recording is ready, the value is used to calculate a scheduled deletion date for that recording. Omit the field to indicate no change, or include with a `null` value to remove an existing scheduled deletion.

    - `enabled: optional boolean`

      Indicates whether the live input is enabled and can accept streams.

    - `meta: optional unknown`

      A user modifiable key-value store used to reference other systems of record for managing live inputs.

    - `modified: optional string`

      The date and time the live input was last modified.

    - `uid: optional string`

      A unique identifier for a live input.

  - `range: optional number`

    The total number of remaining live inputs based on cursor position.

  - `total: optional number`

    The total number of live inputs that match the provided filters.

# Outputs

## List all outputs associated with a specified live input

**get** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs`

Retrieves all outputs associated with a specified live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

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

- `result: optional array of Output`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs \
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
      "enabled": true,
      "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
      "uid": "baea4d9c515887b80289d5c33cf01145",
      "url": "rtmp://a.rtmp.youtube.com/live2"
    }
  ]
}
```

## Create a new output, connected to a live input

**post** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs`

Creates a new output that can be used to simulcast or restream live video to other RTMP or SRT destinations. Outputs are always linked to a specific live input —&nbsp;one live input can have many outputs.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

### Body Parameters

- `streamKey: string`

  The streamKey used to authenticate against an output's target.

- `url: string`

  The URL an output uses to restream.

- `enabled: optional boolean`

  When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

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

- `result: optional Output`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
          "url": "rtmp://a.rtmp.youtube.com/live2",
          "enabled": true
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
    "enabled": true,
    "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
    "uid": "baea4d9c515887b80289d5c33cf01145",
    "url": "rtmp://a.rtmp.youtube.com/live2"
  }
}
```

## Update an output

**put** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}`

Updates the state of an output.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

- `output_identifier: string`

  A unique identifier for the output.

### Body Parameters

- `enabled: boolean`

  When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

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

- `result: optional Output`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs/$OUTPUT_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "enabled": true,
    "streamKey": "uzya-f19y-g2g9-a2ee-51j2",
    "uid": "baea4d9c515887b80289d5c33cf01145",
    "url": "rtmp://a.rtmp.youtube.com/live2"
  }
}
```

## Delete an output

**delete** `/accounts/{account_id}/stream/live_inputs/{live_input_identifier}/outputs/{output_identifier}`

Deletes an output and removes it from the associated live input.

### Path Parameters

- `account_id: string`

  Identifier.

- `live_input_identifier: string`

  A unique identifier for a live input.

- `output_identifier: string`

  A unique identifier for the output.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/live_inputs/$LIVE_INPUT_IDENTIFIER/outputs/$OUTPUT_IDENTIFIER \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```

## Domain Types

### Output

- `Output object { enabled, streamKey, uid, url }`

  - `enabled: optional boolean`

    When enabled, live video streamed to the associated live input will be sent to the output URL. When disabled, live video will not be sent to the output URL, even when streaming to the associated live input. Use this to control precisely when you start and stop simulcasting to specific destinations like YouTube and Twitch.

  - `streamKey: optional string`

    The streamKey used to authenticate against an output's target.

  - `uid: optional string`

    A unique identifier for the output.

  - `url: optional string`

    The URL an output uses to restream.

# Watermarks

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

## Watermark profile details

**get** `/accounts/{account_id}/stream/watermarks/{identifier}`

Retrieves details for a single watermark profile.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  The unique identifier for a watermark profile.

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

- `result: optional Watermark`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/watermarks/$IDENTIFIER \
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
```

## Create watermark profiles via basic upload

**post** `/accounts/{account_id}/stream/watermarks`

Creates watermark profiles using a single `HTTP POST multipart/form-data` request.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

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

- `url: optional string`

  URL of the watermark image to copy.

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

- `result: optional Watermark`

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
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Marketing Videos",
          "opacity": 0.75,
          "padding": 0.1,
          "position": "center",
          "scale": 0.1
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
```

## Delete watermark profiles

**delete** `/accounts/{account_id}/stream/watermarks/{identifier}`

Deletes a watermark profile.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  The unique identifier for a watermark profile.

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

- `result: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/watermarks/$IDENTIFIER \
    -X DELETE \
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
  "result": ""
}
```

## Domain Types

### Watermark

- `Watermark object { created, downloadedFrom, height, 8 more }`

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

### Watermark Delete Response

- `WatermarkDeleteResponse = string`

# Webhooks

## View webhooks

**get** `/accounts/{account_id}/stream/webhook`

Retrieves a list of webhooks.

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

- `result: optional object { modified, notification_url, notificationUrl, secret }`

  - `modified: optional string`

    The date and time the webhook was last modified.

  - `notification_url: optional string`

    The URL where webhooks will be sent.

  - `notificationUrl: optional string`

    The URL where webhooks will be sent.

  - `secret: optional string`

    The secret used to verify webhook signatures.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/webhook \
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
    "modified": "2014-01-02T02:20:00Z",
    "notification_url": "https://example.com",
    "notificationUrl": "https://example.com",
    "secret": "secret"
  }
}
```

## Create webhooks

**put** `/accounts/{account_id}/stream/webhook`

Creates a webhook notification.

### Path Parameters

- `account_id: string`

  The account identifier tag.

### Body Parameters

- `notification_url: optional string`

  The URL where webhooks will be sent.

- `notificationUrl: optional string`

  The URL where webhooks will be sent.

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

- `result: optional object { modified, notification_url, notificationUrl, secret }`

  - `modified: optional string`

    The date and time the webhook was last modified.

  - `notification_url: optional string`

    The URL where webhooks will be sent.

  - `notificationUrl: optional string`

    The URL where webhooks will be sent.

  - `secret: optional string`

    The secret used to verify webhook signatures.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/webhook \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "notification_url": "https://example.com",
          "notificationUrl": "https://example.com"
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
    "modified": "2014-01-02T02:20:00Z",
    "notification_url": "https://example.com",
    "notificationUrl": "https://example.com",
    "secret": "secret"
  }
}
```

## Delete webhooks

**delete** `/accounts/{account_id}/stream/webhook`

Deletes a webhook.

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

- `result: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/webhook \
    -X DELETE \
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
  "result": "ok"
}
```

## Domain Types

### Webhook Get Response

- `WebhookGetResponse object { modified, notification_url, notificationUrl, secret }`

  - `modified: optional string`

    The date and time the webhook was last modified.

  - `notification_url: optional string`

    The URL where webhooks will be sent.

  - `notificationUrl: optional string`

    The URL where webhooks will be sent.

  - `secret: optional string`

    The secret used to verify webhook signatures.

### Webhook Update Response

- `WebhookUpdateResponse object { modified, notification_url, notificationUrl, secret }`

  - `modified: optional string`

    The date and time the webhook was last modified.

  - `notification_url: optional string`

    The URL where webhooks will be sent.

  - `notificationUrl: optional string`

    The URL where webhooks will be sent.

  - `secret: optional string`

    The secret used to verify webhook signatures.

### Webhook Delete Response

- `WebhookDeleteResponse = string`

# Captions

## List captions or subtitles

**get** `/accounts/{account_id}/stream/{identifier}/captions`

Lists the available captions or subtitles for a specific video.

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

- `result: optional array of Caption`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions \
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
      "generated": true,
      "label": "Türkçe",
      "language": "tr",
      "status": "ready"
    }
  ]
}
```

## Domain Types

### Caption

- `Caption object { generated, label, language, status }`

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

# Language

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

## Generate captions or subtitles for a provided language via AI

**post** `/accounts/{account_id}/stream/{identifier}/captions/{language}/generate`

Generate captions or subtitles for provided language via AI.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE/generate \
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
    "generated": true,
    "label": "Türkçe",
    "language": "tr",
    "status": "ready"
  }
}
```

## Upload captions or subtitles

**put** `/accounts/{account_id}/stream/{identifier}/captions/{language}`

Uploads the caption or subtitle file to the endpoint for a specific BCP47 language. One caption or subtitle file per language is allowed.

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
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F file=@/Users/kyle/Desktop/tr.vtt
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

## Delete captions or subtitles

**delete** `/accounts/{account_id}/stream/{identifier}/captions/{language}`

Removes the captions or subtitles from a video.

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

- `result: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE \
    -X DELETE \
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
  "result": ""
}
```

## Domain Types

### Language Delete Response

- `LanguageDeleteResponse = string`

# Vtt

## Return WebVTT captions for a provided language

**get** `/accounts/{account_id}/stream/{identifier}/captions/{language}/vtt`

Return WebVTT captions for a provided language.

### Path Parameters

- `account_id: string`

  Identifier.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

- `language: string`

  The language tag in BCP 47 format.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/captions/$LANGUAGE/vtt \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Vtt Get Response

- `VttGetResponse = string`

# Downloads

## List downloads

**get** `/accounts/{account_id}/stream/{identifier}/downloads`

Lists the downloads created for a video.

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

## Delete downloads

**delete** `/accounts/{account_id}/stream/{identifier}/downloads`

Delete the downloads for a video. Use `/downloads/{download_type}` instead for type-specific downloads. Available types are `default` and `audio`.

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

- `result: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/downloads \
    -X DELETE \
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
  "result": "ok"
}
```

## Domain Types

### Download Get Response

- `DownloadGetResponse object { audio, default }`

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

### Download Create Response

- `DownloadCreateResponse object { audio, default }`

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

### Download Delete Response

- `DownloadDeleteResponse = string`

# Embed

## Retrieve embed Code HTML

**get** `/accounts/{account_id}/stream/{identifier}/embed`

Fetches an HTML code snippet to embed a video in a web page delivered through Cloudflare. On success, returns an HTML fragment for use on web pages to display a video. On failure, returns a JSON response body.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/embed \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### Embed Get Response

- `EmbedGetResponse = string`

# Token

## Create signed URL tokens for videos

**post** `/accounts/{account_id}/stream/{identifier}/token`

Creates a signed URL token for a video. If a body is not provided in the request, a token is created with default values.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `identifier: string`

  A Cloudflare-generated unique identifier for a media item.

### Body Parameters

- `id: optional string`

  The optional ID of a Stream signing key. If present, the `pem` field is also required.

- `accessRules: optional array of object { action, country, ip, type }`

  The optional list of access rule constraints on the token. Access can be blocked or allowed based on an IP, IP range, or by country. Access rules are evaluated from first to last. If a rule matches, the associated action is applied and no further rules are evaluated.

  - `action: optional "allow" or "block"`

    The action to take when a request matches a rule. If the action is `block`, the signed token blocks views for viewers matching the rule.

    - `"allow"`

    - `"block"`

  - `country: optional array of string`

    An array of 2-letter country codes in ISO 3166-1 Alpha-2 format used to match requests.

  - `ip: optional array of string`

    An array of IPv4 or IPV6 addresses or CIDRs used to match requests.

  - `type: optional "any" or "ip.src" or "ip.geoip.country"`

    Lists available rule types to match for requests. An `any` type matches all requests and can be used as a wildcard to apply default actions after other rules.

    - `"any"`

    - `"ip.src"`

    - `"ip.geoip.country"`

- `downloadable: optional boolean`

  The optional boolean value that enables using signed tokens to access MP4 download links for a video.

- `exp: optional number`

  The optional unix epoch timestamp that specficies the time after a token is not accepted. The maximum time specification is 24 hours from issuing time. If this field is not set, the default is one hour after issuing.

- `flags: optional object { original }`

  Optional flags for the signed token.

  - `original: optional boolean`

    Whether to return the original video without transformations.

- `nbf: optional number`

  The optional unix epoch timestamp that specifies the time before a the token is not accepted. If this field is not set, the default is one hour before issuing.

- `pem: optional string`

  The optional base64 encoded private key in PEM format associated with a Stream signing key. If present, the `id` field is also required.

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

- `result: optional object { token }`

  - `token: optional string`

    The signed token used with the signed URLs feature.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/stream/$IDENTIFIER/token \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "id": "ab0d4ef71g4425f8dcba9041231813000",
          "accessRules": [
            {
              "action": "block",
              "country": [
                "US",
                "MX"
              ],
              "type": "ip.geoip.country"
            },
            {
              "action": "allow",
              "ip": [
                "93.184.216.0/24",
                "2400:cb00::/32"
              ],
              "type": "ip.src"
            },
            {
              "action": "block",
              "type": "any"
            }
          ],
          "pem": "LS0tLS1CRUdJTiBSU0EgUFJJVkFURSBLRVktLS0tLQpNSUlFcEFJQkFBS0NBUUVBc284dnBvOFpEWXRkOUgzbWlPaW1qYXAzVXlVM0oyZ3kwTUYvN1R4blJuRnkwRHpDCkxqUk9naFZsQ0hPQmxsd3NVaE9GU0lyYnN4K05tUTdBeS90TFpXSGxuVGF3UWJ5WGZGOStJeDhVSnNlSHBGV1oKNVF5Z1JYd2liSjh1MVVsZ2xlcmZHMkpueldjVXpZTzEySktZN3doSkw1ajROMWgxZFJNUXQ5Q1pkZFlCQWRzOQpCdk02cjRFMDcxQkhQekhWeDMrUTI1VWtubGdUNXIwS3FiM1E1Y0dlTlBXY1JreW1ybkJEWWR0OXR4eFFMb1dPCllzNXdsMnVYWFVYL0VGcDMwajU0Nmp6czllWExLYlNDbjJjTDZFVE96Y2x3aG9DRGx2a2VQT05rUE9LMDVKNUMKTm1TdFdhMG9hV1VGRzM0MFl3cVVrWGt4OU9tNndXd1JldU1uU1FJREFRQUJBb0lCQUFJOHo1ck5kOEdtOGJBMgo1S3pxQjI1R2lOVENwbUNJeW53NXRJWHZTQmNHcEdydUcvdlN2WG9kVlFVSVY0TWdHQkVXUEFrVzdsNWVBcHI4CnA1ZFd5SkRXYTNkdklFSE9vSEpYU3dBYksxZzZEMTNVa2NkZ1EyRGpoNVhuWDhHZCtBY2c2SmRTQWgxOWtYSHEKMk54RUtBVDB6Ri83a1g2MkRkREFBcWxmQkpGSXJodVIvZUdEVWh4L2piTTRhQ2JCcFdiM0pnRE9OYm5tS1ZoMwpxS2ZwZmRZZENZU1lzWUxrNTlxRDF2VFNwUVFUQ0VadW9VKzNzRVNhdkJzaUs1bU0vTzY5ZkRMRXNURG1MeTVQCmhEK3BMQXI0SlhNNjFwRGVBS0l3cUVqWWJybXlDRHRXTUdJNnZzZ0E1eXQzUUJaME9vV2w5QUkwdWxoZ3p4dXQKZ2ZFNTRRRUNnWUVBN0F3a0lhVEEzYmQ4Nk9jSVZnNFlrWGk1cm5aNDdsM1k4V24zcjIzUmVISXhLdkllRUtSbgp5bUlFNDFtRVBBSmlGWFpLK1VPTXdkeS9EcnFJUithT1JiT2NiV01jWUg2QzgvbG1wdVJFaXE3SW1Ub3VWcnA4CnlnUkprMWprVDA4cTIvNmg4eTBEdjJqMitsaHFXNzRNOUt0cmwxcTRlWmZRUFREL01tR1NnTWtDZ1lFQXdhY04KaSttN1p6dnJtL3NuekF2VlZ5SEtwZHVUUjNERk1naC9maC9tZ0ZHZ1RwZWtUOVV5b3FleGNYQXdwMVlhL01iQQoyNTVJVDZRbXZZTm5yNXp6Wmxic2tMV0hsYllvbWhmWnVXTHhXR3hRaEFORWdaMFVVdUVTRGMvbWx2UXZHbEtSCkZoaGhBUWlVSmdDamhPaHk1SlBiNGFldGRKd0UxK09lVWRFaE1vRUNnWUVBNG8yZ25CM1o4ck5xa3NzemlBek4KYmNuMlJVbDJOaW9pejBwS3JMaDFaT29NNE5BekpQdjJsaHRQMzdtS0htS1hLMHczRjFqTEgwSTBxZmxFVmVZbQpSU1huakdHazJjUnpBYUVzOGgrQzNheDE0Z01pZUtGU3BqNUpNOEFNbVVZOXQ1cUVhN2FYc3o0V1ZoOUlMYmVTCkRiNzlhKzVwd21LQVBrcnBsTHhyZFdrQ2dZQlNNSHVBWVdBbmJYZ1BDS2FZWklGVWJNUWNacmY0ZnpWQ2lmYksKYWZHampvRlNPZXdEOGdGK3BWdWJRTGwxbkFieU44ek1xVDRaaHhybUhpcFlqMjJDaHV2NmN3RXJtbGRiSnpwQwpBMnRaVXdkTk1ESFlMUG5lUHlZeGRJWnlsUXFVeW14SGkydElUQUxNcWtLOGV3ZWdXZHpkeGhQSlJScU5JazhrCmZIVHhnUUtCZ1FEUFc2UXIxY3F3QjNUdnVWdWR4WGRqUTdIcDFodXhrNEVWaEFJZllKNFhSTW1NUE5YS28wdHUKdUt6LzE0QW14R0dvSWJxYVc1bDMzeFNteUxhem84clNUN0tSTjVKME9JSHcrZkR5SFgxdHpVSjZCTldDcEFTcwpjbWdNK0htSzVON0w2bkNaZFJQY2IwU1hGaVRQUGhCUG1PVWFDUnpER0ZMK2JYM1VwajJKbWc9PQotLS0tLUVORCBSU0EgUFJJVkFURSBLRVktLS0tLQo="
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
    "token": "eyJhbGciOiJSUzI1NiIsImtpZCI6ImU5ZGI5OTBhODI2NjZkZDU3MWM3N2Y5NDRhNWM1YzhkIn0.eyJzdWIiOiJlYTk1MTMyYzE1NzMyNDEyZDIyYzE0NzZmYTgzZjI3YSIsImtpZCI6ImU5ZGI5OTBhODI2NjZkZDU3MWM3N2Y5NDRhNWM1YzhkIiwiZXhwIjoiMTUzNzQ2MDM2NSIsIm5iZiI6IjE1Mzc0NTMxNjUifQ.OZhqOARADn1iubK6GKcn25hN3nU-hCFF5q9w2C4yup0C4diG7aMIowiRpP-eDod8dbAJubsiFuTKrqPcmyCKWYsiv0TQueukqbQlF7HCO1TV-oF6El5-7ldJ46eD-ZQ0XgcIYEKrQOYFF8iDQbqPm3REWd6BnjKZdeVrLzuRaiSnZ9qqFpGu5dfxIY9-nZKDubJHqCr3Imtb211VIG_b9MdtO92JjvkDS-rxT_pkEfTZSafl1OU-98A7KBGtPSJHz2dHORIrUiTA6on4eIXTj9aFhGiir4rSn-rn0OjPRTtJMWIDMoQyE_fwrSYzB7MPuzL2t82BWaEbHZTfixBm5A"
  }
}
```

## Domain Types

### Token Create Response

- `TokenCreateResponse object { token }`

  - `token: optional string`

    The signed token used with the signed URLs feature.
