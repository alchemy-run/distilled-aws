## Fetch all livestreams

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams`

Returns details of livestreams associated with the given App ID. It includes livestreams created by your App and RealtimeKit meetings that are livestreamed by your App. If you only want details of livestreams created by your App and not RealtimeKit meetings, you can use the `exclude_meetings` query parameter.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional string`

  Specify the end time range in ISO format to access the live stream.

- `exclude_meetings: optional boolean`

  Exclude the RealtimeKit meetings that are livestreamed.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page.

- `sort_order: optional "ASC" or "DSC"`

  Specifies the sorting order for the results.

  - `"ASC"`

  - `"DSC"`

- `start_time: optional string`

  Specify the start time range in ISO format to access the live stream.

- `status: optional "LIVE" or "IDLE" or "ERRORED" or "INVOKED"`

  Specifies the status of the operation.

  - `"LIVE"`

  - `"IDLE"`

  - `"ERRORED"`

  - `"INVOKED"`

### Returns

- `data: optional object { id, created_at, disabled, 8 more }`

  - `id: optional string`

    The ID of the livestream.

  - `created_at: optional string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `disabled: optional string`

    Specifies if the livestream was disabled.

  - `ingest_server: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `meeting_id: optional string`

    ID of the meeting.

  - `name: optional string`

    Name of the livestream.

  - `paging: optional object { end_offset, start_offset, total_count }`

    - `end_offset: optional number`

    - `start_offset: optional number`

    - `total_count: optional number`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "3fd739f4-3c41-456e-bfba-6ebd51e16d2d",
    "created_at": "2023-07-15T11:48:34.753Z",
    "disabled": "disabled",
    "ingest_server": "rtmps://live.cloudflare.com:443/live/",
    "meeting_id": "meeting_id",
    "name": "test",
    "paging": {
      "end_offset": 1,
      "start_offset": 1,
      "total_count": 1
    },
    "playback_url": "https://customer-s8oj0c1n5ek8ah1e.cloudflarestream.com/7de6a3fec0f9c05bf1df140950d3a237/manifest/video.m3u8",
    "status": "LIVE",
    "stream_key": "f26566285faca6fbe2e79a73a66rsrrsrrsr3cde23a2bb7dbc6c2c1761b98f4e4",
    "updated_at": "2023-07-15T11:48:34.753Z"
  },
  "success": true
}
```
