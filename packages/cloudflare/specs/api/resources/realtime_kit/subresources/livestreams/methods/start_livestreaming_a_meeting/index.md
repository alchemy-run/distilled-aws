## Start livestreaming a meeting

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/livestreams`

Starts livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `name: optional string`

- `video_config: optional object { height, width }`

  - `height: optional number`

    Height of the livestreaming video in pixels

  - `width: optional number`

    Width of the livestreaming video in pixels

### Returns

- `data: optional object { id, ingest_server, playback_url, 2 more }`

  - `id: optional string`

    The livestream ID.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `playback_url: optional string`

    The web address that viewers can use to watch the livestream.

  - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

    - `"LIVE"`

    - `"IDLE"`

    - `"ERRORED"`

    - `"INVOKED"`

  - `stream_key: optional string`

    Unique key for accessing each livestream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/livestreams \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "data": {
    "id": "7088bba8-f522-49a8-b59b-3cd0e946bbb0",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "INVOKED",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4"
  },
  "success": true
}
```
