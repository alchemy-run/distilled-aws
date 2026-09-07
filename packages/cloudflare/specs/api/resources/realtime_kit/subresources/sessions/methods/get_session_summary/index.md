## Fetch summary of transcripts for a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary`

Returns a Summary URL to download the Summary of Transcripts for the session ID as plain text.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Returns

- `data: optional object { sessionId, summaryDownloadUrl, summaryDownloadUrlExpiry }`

  - `sessionId: string`

  - `summaryDownloadUrl: string`

    URL where the summary of transcripts can be downloaded

  - `summaryDownloadUrlExpiry: string`

    Time of Expiry before when you need to download the csv file.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/summary \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "sessionId": "sessionId",
    "summaryDownloadUrl": "summaryDownloadUrl",
    "summaryDownloadUrlExpiry": "summaryDownloadUrlExpiry"
  },
  "success": true
}
```
