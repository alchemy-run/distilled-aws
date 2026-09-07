## Refresh participant's authentication token

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/participants/{participant_id}/token`

Regenerates participant's authentication token for the given meeting and participant ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

- `participant_id: string`

### Returns

- `data: object { token }`

  Data returned by the operation

  - `token: string`

    Regenerated participant's authentication token.

- `success: boolean`

  Success status of the operation

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/participants/$PARTICIPANT_ID/token \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "token": "token"
  },
  "success": true
}
```
