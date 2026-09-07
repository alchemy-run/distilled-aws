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
