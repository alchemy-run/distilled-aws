## Fetch active livestreams for a meeting

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream`

Returns details of all active livestreams for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { id, created_at, disabled, 7 more }`

  - `id: optional string`

    The livestream ID.

  - `created_at: optional string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `disabled: optional string`

    Specifies if the livestream was disabled.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `meeting_id: optional string`

  - `name: optional string`

    Name of the livestream.

  - `playback_url: optional string`

    The web address that viewers can use to watch the livestream.

  - `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

    - `"LIVE"`

    - `"IDLE"`

    - `"ERRORED"`

    - `"INVOKED"`

  - `stream_key: optional string`

    Unique key for accessing each livestream.

  - `updated_at: optional string`

    Timestamp the object was updated at. The time is returned in ISO format.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-livestream \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "disabled": "disabled",
    "ingest_server": "ingest_server",
    "meeting_id": "meeting_id",
    "name": "name",
    "playback_url": "playback_url",
    "status": "LIVE",
    "stream_key": "stream_key",
    "updated_at": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```
