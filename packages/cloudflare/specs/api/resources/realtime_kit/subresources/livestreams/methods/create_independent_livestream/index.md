## Create an independent livestream

**post** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams`

Creates a livestream for the given App ID and returns ingest server, stream key, and playback URL. You can pass custom input to the ingest server and stream key, and freely distribute the content using the playback URL on any player that supports HLS/LHLS.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `name: optional string`

  Name of the livestream

### Returns

- `data: optional object { id, disabled, ingest_server, 5 more }`

  - `id: optional string`

    The livestream ID.

  - `disabled: optional boolean`

    Specifies if the livestream was disabled.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder should send the video and audio data.

  - `meeting_id: optional string`

  - `name: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "data": {
    "disabled": false,
    "id": "78dd0b50-4147-4bb8-88d3-2ccc2e98bff0",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "meeting_id": null,
    "name": "Livestreaming-Demo",
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "INVOKED",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4"
  },
  "success": true
}
```
