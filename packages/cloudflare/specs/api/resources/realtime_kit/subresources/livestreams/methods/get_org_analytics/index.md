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
