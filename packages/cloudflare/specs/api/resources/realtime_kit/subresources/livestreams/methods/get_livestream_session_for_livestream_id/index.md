## Fetch livestream details using livestream ID

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}`

Returns details of a livestream with sessions for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `livestream_id: string`

### Query Parameters

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page.

### Returns

- `data: optional object { livestream, paging, session }`

  - `livestream: optional object { id, created_at, disabled, 7 more }`

    - `id: optional string`

      ID of the livestream.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `disabled: optional string`

      Specifies if the livestream was disabled.

    - `ingest_server: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `meeting_id: optional string`

      The ID of the meeting.

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

  - `paging: optional object { end_offset, start_offset, total_count }`

    - `end_offset: optional number`

    - `start_offset: optional number`

    - `total_count: optional number`

  - `session: optional object { id, created_at, err_message, 7 more }`

    - `id: optional string`

      ID of the session.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `err_message: optional string`

    - `ingest_seconds: optional number`

      The time duration for which the input was given or the meeting was streamed.

    - `invoked_time: optional string`

      Timestamp the object was invoked. The time is returned in ISO format.

    - `livestream_id: optional string`

    - `started_time: optional string`

      Timestamp the object was started. The time is returned in ISO format.

    - `stopped_time: optional string`

      Timestamp the object was stopped. The time is returned in ISO format.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `viewer_seconds: optional number`

      The total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/$LIVESTREAM_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "livestream": {
      "id": "id",
      "created_at": "created_at",
      "disabled": "disabled",
      "ingest_server": "ingest_server",
      "meeting_id": "meeting_id",
      "name": "name",
      "playback_url": "playback_url",
      "status": "LIVE",
      "stream_key": "stream_key",
      "updated_at": "updated_at"
    },
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "session": {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "err_message": "err_message",
      "ingest_seconds": 0,
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "livestream_id": "livestream_id",
      "started_time": "2019-12-27T18:11:19.117Z",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "viewer_seconds": 0
    }
  },
  "success": true
}
```
