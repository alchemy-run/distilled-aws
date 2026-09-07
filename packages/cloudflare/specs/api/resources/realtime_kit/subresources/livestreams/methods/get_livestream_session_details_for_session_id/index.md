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
