## Generate summary of Transcripts for the session

**post** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/summary`

Trigger Summary generation of Transcripts for the session ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Returns

- `data: optional object { session_id, status }`

  - `session_id: optional string`

  - `status: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/summary \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "session_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "status": "status"
  },
  "success": true
}
```
