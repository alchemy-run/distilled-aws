# Livestreams

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

## Stop livestreaming a meeting

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream/stop`

Stops the active livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { message }`

  - `message: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-livestream/stop \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "message": "Stopped live stream successfully"
  },
  "success": true
}
```

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

## Fetch complete analytics data for your livestreams

**get** `/accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/overall`

Returns livestream analytics for the specified time range.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional number`

  Specify the end time as a Unix timestamp in seconds to access the livestream analytics.

- `filters: optional string`

  Optional filters for livestream analytics.

- `start_time: optional number`

  Specify the start time as a Unix timestamp in seconds to access the livestream analytics.

### Returns

- `data: optional object { count, total_ingest_seconds, total_viewer_seconds }`

  - `count: optional number`

    Count of total livestreams.

  - `total_ingest_seconds: optional number`

    Total time duration for which the input was given or the meeting was streamed.

  - `total_viewer_seconds: optional number`

    Total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/livestreams/overall \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "count": 4,
    "total_ingest_seconds": 531,
    "total_viewer_seconds": 116
  },
  "success": true
}
```

## Fetch day-wise analytics data for your livestreams

**get** `/accounts/{account_id}/realtime/kit/{app_id}/analytics/livestreams/daywise`

Returns day-wise livestream analytics for the specified time range.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_time: optional number`

  Specify the end time as a Unix timestamp in seconds to access the livestream analytics.

- `filters: optional string`

  Optional filters for livestream analytics.

- `start_time: optional number`

  Specify the start time as a Unix timestamp in seconds to access the livestream analytics.

### Returns

- `data: optional array of object { count, date, total_ingest_seconds, total_viewer_seconds }`

  - `count: optional number`

    Count of total livestream sessions.

  - `date: optional string`

    Analytics date.

  - `total_ingest_seconds: optional number`

    Total time duration for which the input was given or the meeting was streamed.

  - `total_viewer_seconds: optional number`

    Total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/livestreams/daywise \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "count": 4,
      "date": "2023-07-15",
      "total_ingest_seconds": 531,
      "total_viewer_seconds": 116
    }
  ],
  "success": true
}
```

## Fetch day-wise session and recording analytics data for an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/analytics/daywise`

Returns day-wise session and recording analytics data of an App for the specified time range start_date to end_date. If start_date and end_date are not provided, the default time range is set from 30 days ago to the current date.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `end_date: optional string`

  end date in YYYY-MM-DD format

- `start_date: optional string`

  start date in YYYY-MM-DD format

### Returns

- `data: optional object { recording_stats, session_stats }`

  - `recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }`

    Recording statistics of an App during the range specified

    - `day_stats: optional array of object { day, total_recording_minutes, total_recordings }`

      Day wise recording stats

      - `day: optional string`

      - `total_recording_minutes: optional number`

        Total recording minutes for a specific day

      - `total_recordings: optional number`

        Total number of recordings for a specific day

    - `recording_count: optional number`

      Total number of recordings during the range specified

    - `recording_minutes_consumed: optional number`

      Total recording minutes during the range specified

  - `session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }`

    Session statistics of an App during the range specified

    - `day_stats: optional array of object { day, total_session_minutes, total_sessions }`

      Day wise session stats

      - `day: optional string`

      - `total_session_minutes: optional number`

        Total session minutes for a specific day

      - `total_sessions: optional number`

        Total number of sessions for a specific day

    - `sessions_count: optional number`

      Total number of sessions during the range specified

    - `sessions_minutes_consumed: optional number`

      Total session minutes during the range specified

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/analytics/daywise \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "recording_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_recording_minutes": 0,
          "total_recordings": 0
        }
      ],
      "recording_count": 0,
      "recording_minutes_consumed": 0
    },
    "session_stats": {
      "day_stats": [
        {
          "day": "day",
          "total_session_minutes": 0,
          "total_sessions": 0
        }
      ],
      "sessions_count": 0,
      "sessions_minutes_consumed": 0
    }
  },
  "success": true
}
```

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

## Fetch livestream session details using livestream session ID

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams/sessions/{livestream-session-id}`

Returns livestream session details for the given livestream session ID. Retrieve the `livestream_session_id`using the `Fetch livestream session details using a session ID` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `"livestream-session-id": string`

### Returns

- `data: optional object { id, created_at, err_message, 6 more }`

  - `id: optional string`

    The livestream ID.

  - `created_at: optional string`

    Timestamp the object was created at. The time is returned in ISO format.

  - `err_message: optional string`

    The server URL to which the RTMP encoder sends the video and audio data.

  - `ingest_seconds: optional number`

    Name of the livestream.

  - `livestream_id: optional string`

  - `started_time: optional string`

    Unique key for accessing each livestream.

  - `stopped_time: optional string`

    The web address that viewers can use to watch the livestream.

  - `updated_at: optional string`

    Timestamp the object was updated at. The time is returned in ISO format.

  - `viewer_seconds: optional number`

    Specifies if the livestream was disabled.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/sessions/$LIVESTREAM_SESSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "err_message": "err_message",
    "ingest_seconds": 0,
    "livestream_id": "livestream_id",
    "started_time": "started_time",
    "stopped_time": "stopped_time",
    "updated_at": "updated_at",
    "viewer_seconds": 0
  },
  "success": true
}
```

## Fetch active livestream session details

**get** `/accounts/{account_id}/realtime/kit/{app_id}/livestreams/{livestream_id}/active-livestream-session`

Returns details of all active livestreams for the given livestream ID. Retreive the livestream ID using the `Start livestreaming a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `livestream_id: string`

### Returns

- `data: optional object { livestream, session }`

  - `livestream: optional object { id, created_at, disabled, 7 more }`

    - `id: optional string`

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

  - `session: optional object { id, created_at, err_message, 7 more }`

    - `id: optional string`

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `err_message: optional string`

    - `ingest_seconds: optional string`

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

    - `viewer_seconds: optional string`

      The total view time for which the viewers watched the stream.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/livestreams/$LIVESTREAM_ID/active-livestream-session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "livestream": {
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
    "session": {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "err_message": "err_message",
      "ingest_seconds": "ingest_seconds",
      "invoked_time": "2019-12-27T18:11:19.117Z",
      "livestream_id": "livestream_id",
      "started_time": "2019-12-27T18:11:19.117Z",
      "stopped_time": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z",
      "viewer_seconds": "viewer_seconds"
    }
  },
  "success": true
}
```

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

## Domain Types

### Livestream Create Independent Livestream Response

- `LivestreamCreateIndependentLivestreamResponse object { data, success }`

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

### Livestream Get All Livestreams Response

- `LivestreamGetAllLivestreamsResponse object { data, success }`

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

### Livestream Stop Livestreaming A Meeting Response

- `LivestreamStopLivestreamingAMeetingResponse object { data, success }`

  - `data: optional object { message }`

    - `message: optional string`

  - `success: optional boolean`

### Livestream Start Livestreaming A Meeting Response

- `LivestreamStartLivestreamingAMeetingResponse object { data, success }`

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

### Livestream Get Livestream Analytics Complete Response

- `LivestreamGetLivestreamAnalyticsCompleteResponse object { data, success }`

  - `data: optional object { count, total_ingest_seconds, total_viewer_seconds }`

    - `count: optional number`

      Count of total livestreams.

    - `total_ingest_seconds: optional number`

      Total time duration for which the input was given or the meeting was streamed.

    - `total_viewer_seconds: optional number`

      Total view time for which the viewers watched the stream.

  - `success: optional boolean`

### Livestream Get Livestream Analytics Daywise Response

- `LivestreamGetLivestreamAnalyticsDaywiseResponse object { data, success }`

  - `data: optional array of object { count, date, total_ingest_seconds, total_viewer_seconds }`

    - `count: optional number`

      Count of total livestream sessions.

    - `date: optional string`

      Analytics date.

    - `total_ingest_seconds: optional number`

      Total time duration for which the input was given or the meeting was streamed.

    - `total_viewer_seconds: optional number`

      Total view time for which the viewers watched the stream.

  - `success: optional boolean`

### Livestream Get Org Analytics Response

- `LivestreamGetOrgAnalyticsResponse object { data, success }`

  - `data: optional object { recording_stats, session_stats }`

    - `recording_stats: optional object { day_stats, recording_count, recording_minutes_consumed }`

      Recording statistics of an App during the range specified

      - `day_stats: optional array of object { day, total_recording_minutes, total_recordings }`

        Day wise recording stats

        - `day: optional string`

        - `total_recording_minutes: optional number`

          Total recording minutes for a specific day

        - `total_recordings: optional number`

          Total number of recordings for a specific day

      - `recording_count: optional number`

        Total number of recordings during the range specified

      - `recording_minutes_consumed: optional number`

        Total recording minutes during the range specified

    - `session_stats: optional object { day_stats, sessions_count, sessions_minutes_consumed }`

      Session statistics of an App during the range specified

      - `day_stats: optional array of object { day, total_session_minutes, total_sessions }`

        Day wise session stats

        - `day: optional string`

        - `total_session_minutes: optional number`

          Total session minutes for a specific day

        - `total_sessions: optional number`

          Total number of sessions for a specific day

      - `sessions_count: optional number`

        Total number of sessions during the range specified

      - `sessions_minutes_consumed: optional number`

        Total session minutes during the range specified

  - `success: optional boolean`

### Livestream Get Meeting Active Livestreams Response

- `LivestreamGetMeetingActiveLivestreamsResponse object { data, success }`

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

### Livestream Get Livestream Session Details For Session ID Response

- `LivestreamGetLivestreamSessionDetailsForSessionIDResponse object { data, success }`

  - `data: optional object { id, created_at, err_message, 6 more }`

    - `id: optional string`

      The livestream ID.

    - `created_at: optional string`

      Timestamp the object was created at. The time is returned in ISO format.

    - `err_message: optional string`

      The server URL to which the RTMP encoder sends the video and audio data.

    - `ingest_seconds: optional number`

      Name of the livestream.

    - `livestream_id: optional string`

    - `started_time: optional string`

      Unique key for accessing each livestream.

    - `stopped_time: optional string`

      The web address that viewers can use to watch the livestream.

    - `updated_at: optional string`

      Timestamp the object was updated at. The time is returned in ISO format.

    - `viewer_seconds: optional number`

      Specifies if the livestream was disabled.

  - `success: optional boolean`

### Livestream Get Active Livestreams For Livestream ID Response

- `LivestreamGetActiveLivestreamsForLivestreamIDResponse object { data, success }`

  - `data: optional object { livestream, session }`

    - `livestream: optional object { id, created_at, disabled, 7 more }`

      - `id: optional string`

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

    - `session: optional object { id, created_at, err_message, 7 more }`

      - `id: optional string`

      - `created_at: optional string`

        Timestamp the object was created at. The time is returned in ISO format.

      - `err_message: optional string`

      - `ingest_seconds: optional string`

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

      - `viewer_seconds: optional string`

        The total view time for which the viewers watched the stream.

  - `success: optional boolean`

### Livestream Get Livestream Session For Livestream ID Response

- `LivestreamGetLivestreamSessionForLivestreamIDResponse object { data, success }`

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
