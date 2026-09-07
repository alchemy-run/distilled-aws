## Fetch all sessions of an App

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions`

Returns details of all sessions of an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Query Parameters

- `associated_id: optional string`

  ID of the meeting that sessions should be associated with

- `end_time: optional string`

  The end time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `participants: optional string`

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  Search string that matches sessions based on meeting title, meeting ID, and session ID

- `sort_by: optional "minutesConsumed" or "createdAt"`

  - `"minutesConsumed"`

  - `"createdAt"`

- `sort_order: optional "ASC" or "DESC"`

  - `"ASC"`

  - `"DESC"`

- `start_time: optional string`

  The start time range for which you want to retrieve the meetings. The time must be specified in ISO format.

- `status: optional "LIVE" or "ENDED"`

  - `"LIVE"`

  - `"ENDED"`

### Returns

- `data: optional object { sessions }`

  - `sessions: optional array of object { id, associated_id, created_at, 11 more }`

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

- `paging: optional object { end_offset, start_offset, total_count }`

  - `end_offset: optional number`

  - `start_offset: optional number`

  - `total_count: optional number`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "sessions": [
      {
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
      }
    ]
  },
  "paging": {
    "end_offset": 0,
    "start_offset": 0,
    "total_count": 0
  },
  "success": true
}
```
