## Fetch the complete transcript for a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/transcript`

Returns a URL to download the transcript for the session ID in CSV format.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Query Parameters

- `format: optional "SRT" or "VTT" or "JSON" or "CSV"`

  Transcript file format to fetch.

  - `"SRT"`

  - `"VTT"`

  - `"JSON"`

  - `"CSV"`

### Returns

- `data: optional object { sessionId, transcript_download_url, transcript_download_url_expiry }`

  - `sessionId: string`

  - `transcript_download_url: string`

    URL where the transcript can be downloaded

  - `transcript_download_url_expiry: string`

    Time when the download URL will expire

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/transcript \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "sessionId": "sessionId",
    "transcript_download_url": "transcript_download_url",
    "transcript_download_url_expiry": "transcript_download_url_expiry"
  },
  "success": true
}
```
