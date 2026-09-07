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
