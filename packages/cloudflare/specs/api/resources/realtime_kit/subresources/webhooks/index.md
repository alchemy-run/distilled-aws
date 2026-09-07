# Webhooks

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

## Add a webhook

**post** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks`

Adds a new webhook to an App.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

### Body Parameters

- `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

  Events that this webhook will get triggered by

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

- `url: string`

  URL this webhook will send events to

- `enabled: optional boolean`

  Set whether or not the webhook should be active when created

### Returns

- `data: object { id, created_at, enabled, 4 more }`

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
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
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
          "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
        }'
```

#### Response

```json
{
  "data": {
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
  },
  "success": true
}
```

## Fetch details of a webhook

**get** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Returns webhook details for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Returns

- `data: object { id, created_at, enabled, 4 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
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
  },
  "success": true
}
```

## Replace a webhook

**put** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Replace all details for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Body Parameters

- `events: array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

  Events that this webhook will get triggered by

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

- `url: string`

  URL this webhook will send events to

- `enabled: optional boolean`

  Set whether or not the webhook should be active when created

### Returns

- `data: object { id, created_at, enabled, 4 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
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
          "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
        }'
```

#### Response

```json
{
  "data": {
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
  },
  "success": true
}
```

## Edit a webhook

**patch** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Edits the webhook details for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Body Parameters

- `enabled: optional boolean`

- `events: optional array of "meeting.started" or "meeting.ended" or "meeting.participantJoined" or 6 more`

  Events that the webhook will get triggered by

  - `"meeting.started"`

  - `"meeting.ended"`

  - `"meeting.participantJoined"`

  - `"meeting.participantLeft"`

  - `"recording.statusUpdate"`

  - `"livestreaming.statusUpdate"`

  - `"meeting.chatSynced"`

  - `"meeting.transcript"`

  - `"meeting.summary"`

- `name: optional string`

  Name of the webhook

- `url: optional string`

  URL the webhook will send events to

### Returns

- `data: object { id, created_at, enabled, 4 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://webhook.site/b23a5bbd-c7b0-4ced-a9e2-78ae7889897e"
        }'
```

#### Response

```json
{
  "data": {
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
  },
  "success": true
}
```

## Delete a webhook

**delete** `/accounts/{account_id}/realtime/kit/{app_id}/webhooks/{webhook_id}`

Removes a webhook for the given webhook ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `webhook_id: string`

### Returns

- `data: object { id, created_at, enabled, 4 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/webhooks/$WEBHOOK_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
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
  },
  "success": true
}
```

## Domain Types

### Webhook Get Webhooks Response

- `WebhookGetWebhooksResponse object { data, success }`

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

### Webhook Create Webhook Response

- `WebhookCreateWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

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

### Webhook Get Webhook By ID Response

- `WebhookGetWebhookByIDResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

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

### Webhook Replace Webhook Response

- `WebhookReplaceWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

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

### Webhook Edit Webhook Response

- `WebhookEditWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

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

### Webhook Delete Webhook Response

- `WebhookDeleteWebhookResponse object { data, success }`

  - `data: object { id, created_at, enabled, 4 more }`

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
