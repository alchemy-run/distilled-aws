## Fetch all webhooks details

**get** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks`

Returns details of all webhooks for an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Returns

- `data: array of object { id, created_at, enabled, 4 more }`

  - `id: string`

    ID of the webhook

  - `created_at: string`

    Timestamp when this webhook was created

  - `enabled: boolean`

    Set to true if the webhook is active

  - `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

    Events this webhook will send updates for

    - `"meeting.started"`

    - `"meeting.ended"`

    - `"meeting.participantJoined"`

    - `"meeting.participantLeft"`

    - `"meeting.chatSynced"`

    - `"recording.statusUpdate"`

    - `"livestreaming.statusUpdate"`

    - `"meeting.transcript"`

    - `"meeting.summary"`

  - `name: string`

    Name of the webhook

  - `updated_at: string`

    Timestamp when this webhook was updated

  - `url: string`

    URL the webhook will send events to

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": [
    {
      "id": "0d1f069d-43bb-489a-ad8c-7eb95592ba8e",
      "created_at": "2022-05-28T07:01:53.075Z",
      "enabled": true,
      "events": [
        "meeting.started",
        "meeting.ended",
        "meeting.participantJoined",
        "meeting.participantLeft",
        "meeting.chatSynced",
        "recording.statusUpdate",
        "livestreaming.statusUpdate",
        "meeting.transcript",
        "meeting.summary"
      ],
      "name": "All events webhook",
      "updated_at": "2022-05-28T07:01:53.075Z",
      "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
    }
  ],
  "success": true
}
```
