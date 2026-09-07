## Kick all participants

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick-all`

Kicks all participants from an active session for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { action, kicked_participants_count }`

  - `action: optional string`

  - `kicked_participants_count: optional number`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick-all \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "action": "action",
    "kicked_participants_count": 0
  },
  "success": true
}
```
