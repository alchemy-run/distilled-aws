## Kick participants from an active session

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/kick`

Kicks one or more participants from an active session using user ID or custom participant ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `custom_participant_ids: array of string`

- `participant_ids: array of string`

### Returns

- `data: optional object { action, participants }`

  - `action: optional string`

  - `participants: optional array of object { id, created_at, updated_at, 3 more }`

    - `id: string`

      ID of the session participant

    - `created_at: string`

    - `updated_at: string`

    - `email: optional string`

      Email of the session participant.

    - `name: optional string`

      Name of the session participant.

    - `picture: optional string`

      A URL pointing to a picture of the participant.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/kick \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_participant_ids": [
            "string"
          ],
          "participant_ids": [
            "string"
          ]
        }'
```

#### Response

```json
{
  "data": {
    "action": "action",
    "participants": [
      {
        "id": "id",
        "created_at": "created_at",
        "updated_at": "updated_at",
        "email": "email",
        "name": "name",
        "picture": "picture"
      }
    ]
  },
  "success": true
}
```
