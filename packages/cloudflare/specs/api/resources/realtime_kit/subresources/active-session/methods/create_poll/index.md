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
