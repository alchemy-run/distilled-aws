## Fetch details of an active session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session`

Returns details of an ongoing active session for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { id, associated_id, created_at, 11 more }`

  - `id: string`

    ID of the session

  - `associated_id: string`

    ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

  - `created_at: string`

    timestamp when session created

  - `live_participants: number`

    number of participants currently in the session

  - `max_concurrent_participants: number`

    number of maximum participants that were in the session

  - `meeting_display_name: string`

    Title of the meeting this session belongs to

  - `minutes_consumed: number`

    number of minutes consumed since the session started

  - `organization_id: string`

    App id that hosted this session

  - `started_at: string`

    timestamp when session started

  - `status: "LIVE" or "ENDED"`

    current status of session

    - `"LIVE"`

    - `"ENDED"`

  - `type: "meeting" or "livestream" or "participant"`

    type of session

    - `"meeting"`

    - `"livestream"`

    - `"participant"`

  - `updated_at: string`

    timestamp when session was last updated

  - `breakout_rooms: optional array of unknown`

  - `ended_at: optional string`

    timestamp when session ended

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "associated_id": "associated_id",
    "created_at": "created_at",
    "live_participants": 0,
    "max_concurrent_participants": 0,
    "meeting_display_name": "meeting_display_name",
    "minutes_consumed": 0,
    "organization_id": "organization_id",
    "started_at": "started_at",
    "status": "LIVE",
    "type": "meeting",
    "updated_at": "updated_at",
    "breakout_rooms": [
      {}
    ],
    "ended_at": "ended_at"
  },
  "success": true
}
```
