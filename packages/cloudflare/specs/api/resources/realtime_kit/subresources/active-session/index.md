# Active Session

## Fetch details of an active session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session`

Returns details of an ongoing active session for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { id, associated_id, created_at, 11 more }`

  - `id: string`

    ID of the session

  - `associated_id: string`

    ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

  - `created_at: string`

    timestamp when session created

  - `live_participants: number`

    number of participants currently in the session

  - `max_concurrent_participants: number`

    number of maximum participants that were in the session

  - `meeting_display_name: string`

    Title of the meeting this session belongs to

  - `minutes_consumed: number`

    number of minutes consumed since the session started

  - `organization_id: string`

    App id that hosted this session

  - `started_at: string`

    timestamp when session started

  - `status: "LIVE" or "ENDED"`

    current status of session

    - `"LIVE"`

    - `"ENDED"`

  - `type: "meeting" or "livestream" or "participant"`

    type of session

    - `"meeting"`

    - `"livestream"`

    - `"participant"`

  - `updated_at: string`

    timestamp when session was last updated

  - `breakout_rooms: optional array of unknown`

  - `ended_at: optional string`

    timestamp when session ended

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "id": "id",
    "associated_id": "associated_id",
    "created_at": "created_at",
    "live_participants": 0,
    "max_concurrent_participants": 0,
    "meeting_display_name": "meeting_display_name",
    "minutes_consumed": 0,
    "organization_id": "organization_id",
    "started_at": "started_at",
    "status": "LIVE",
    "type": "meeting",
    "updated_at": "updated_at",
    "breakout_rooms": [
      {}
    ],
    "ended_at": "ended_at"
  },
  "success": true
}
```

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

## Create a poll

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-session/poll`

Creates a new poll in an active session for the given meeting ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Body Parameters

- `options: array of string`

  Different options for the question

- `question: string`

  Question of the poll

- `anonymous: optional boolean`

  if voters on a poll are anonymous

- `hide_votes: optional boolean`

  if votes on an option are visible before a person votes

### Returns

- `data: optional object { action, poll }`

  - `action: optional string`

  - `poll: optional object { id, options, question, 4 more }`

    - `id: string`

      ID of the poll

    - `options: array of object { count, text, votes }`

      Answer options

      - `count: number`

      - `text: string`

        Text of the answer option

      - `votes: array of object { id, name }`

        - `id: string`

        - `name: string`

    - `question: string`

      Question asked by the poll

    - `anonymous: optional boolean`

    - `created_by: optional string`

    - `hide_votes: optional boolean`

    - `voted: optional array of string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-session/poll \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "options": [
            "string"
          ],
          "question": "question"
        }'
```

#### Response

```json
{
  "data": {
    "action": "action",
    "poll": {
      "id": "id",
      "options": [
        {
          "count": 0,
          "text": "text",
          "votes": [
            {
              "id": "id",
              "name": "name"
            }
          ]
        }
      ],
      "question": "question",
      "anonymous": true,
      "created_by": "created_by",
      "hide_votes": true,
      "voted": [
        "string"
      ]
    }
  },
  "success": true
}
```

## Domain Types

### Active Session Get Active Session Response

- `ActiveSessionGetActiveSessionResponse object { data, success }`

  - `data: optional object { id, associated_id, created_at, 11 more }`

    - `id: string`

      ID of the session

    - `associated_id: string`

      ID of the meeting this session is associated with. In the case of V2 meetings, it is always a UUID. In V1 meetings, it is a room name of the form `abcdef-ghijkl`

    - `created_at: string`

      timestamp when session created

    - `live_participants: number`

      number of participants currently in the session

    - `max_concurrent_participants: number`

      number of maximum participants that were in the session

    - `meeting_display_name: string`

      Title of the meeting this session belongs to

    - `minutes_consumed: number`

      number of minutes consumed since the session started

    - `organization_id: string`

      App id that hosted this session

    - `started_at: string`

      timestamp when session started

    - `status: "LIVE" or "ENDED"`

      current status of session

      - `"LIVE"`

      - `"ENDED"`

    - `type: "meeting" or "livestream" or "participant"`

      type of session

      - `"meeting"`

      - `"livestream"`

      - `"participant"`

    - `updated_at: string`

      timestamp when session was last updated

    - `breakout_rooms: optional array of unknown`

    - `ended_at: optional string`

      timestamp when session ended

  - `success: optional boolean`

### Active Session Kick Participants Response

- `ActiveSessionKickParticipantsResponse object { data, success }`

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

### Active Session Kick All Participants Response

- `ActiveSessionKickAllParticipantsResponse object { data, success }`

  - `data: optional object { action, kicked_participants_count }`

    - `action: optional string`

    - `kicked_participants_count: optional number`

  - `success: optional boolean`

### Active Session Create Poll Response

- `ActiveSessionCreatePollResponse object { data, success }`

  - `data: optional object { action, poll }`

    - `action: optional string`

    - `poll: optional object { id, options, question, 4 more }`

      - `id: string`

        ID of the poll

      - `options: array of object { count, text, votes }`

        Answer options

        - `count: number`

        - `text: string`

          Text of the answer option

        - `votes: array of object { id, name }`

          - `id: string`

          - `name: string`

      - `question: string`

        Question asked by the poll

      - `anonymous: optional boolean`

      - `created_by: optional string`

      - `hide_votes: optional boolean`

      - `voted: optional array of string`

  - `success: optional boolean`
