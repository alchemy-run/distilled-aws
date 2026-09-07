## Fetch participants list of a session

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants`

Returns a list of participants for the given session ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

### Query Parameters

- `include_peer_events: optional boolean`

  if true, response includes all the peer events of participants.

- `page_no: optional number`

  The page number from which you want your page search results to be displayed.

- `per_page: optional number`

  Number of results per page

- `search: optional string`

  The search query string. You can search using participant ID, custom participant ID, or display name.

- `sort_by: optional "joinedAt" or "duration"`

  - `"joinedAt"`

  - `"duration"`

- `sort_order: optional "ASC" or "DESC"`

  - `"ASC"`

  - `"DESC"`

- `view: optional "raw" or "consolidated"`

  In breakout room sessions, the view parameter can be set to `raw` for session specific duration for participants or `consolidated` to accumulate breakout room durations.

  - `"raw"`

  - `"consolidated"`

### Returns

- `data: optional object { participants }`

  - `participants: optional array of object { id, created_at, custom_participant_id, 8 more }`

    - `id: optional string`

      Participant ID. This maps to the corresponding peerId.

    - `created_at: optional string`

      timestamp when this participant was created.

    - `custom_participant_id: optional string`

      ID passed by client to create this participant.

    - `display_name: optional string`

      Display name of participant when joining the session.

    - `duration: optional number`

      number of minutes for which the participant was in the session.

    - `joined_at: optional string`

      timestamp at which participant joined the session.

    - `left_at: optional string`

      timestamp at which participant left the session.

    - `peer_events: optional array of object { id, created_at, event_name, 7 more }`

      Connection lifecycle events for the participant's peer. Only included when `include_peer_events` is true.

      - `id: optional string`

        ID of the peer event.

      - `created_at: optional string`

        Timestamp when this peer event was created.

      - `event_name: optional "PEER_CREATED" or "PEER_JOINING" or "PEER_LEAVING"`

        Name of the peer event.

        - `"PEER_CREATED"`

        - `"PEER_JOINING"`

        - `"PEER_LEAVING"`

      - `minutes_consumed: optional number`

        Minutes consumed attributed to this event.

      - `participant_id: optional string`

        ID of the participant this event belongs to.

      - `peer_id: optional string`

        Peer ID this event belongs to.

      - `preset_view_type: optional "GROUP_CALL" or "WEBINAR" or "AUDIO_ROOM" or 2 more`

        View type of the preset associated with the peer.

        - `"GROUP_CALL"`

        - `"WEBINAR"`

        - `"AUDIO_ROOM"`

        - `"LIVESTREAM"`

        - `"CHAT"`

      - `session_id: optional string`

        ID of the session this event belongs to.

      - `socket_session_id: optional string`

        ID of the socket session associated with this event.

      - `updated_at: optional string`

        Timestamp when this peer event was last updated.

    - `preset_name: optional string`

      Name of the preset associated with the participant.

    - `updated_at: optional string`

      timestamp when this participant's data was last updated.

    - `user_id: optional string`

      User id for this participant.

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/participants \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "paging": {
      "end_offset": 2,
      "start_offset": 1,
      "total_count": 123
    },
    "participants": [
      {
        "created_at": "2023-02-01T10:51:08.039Z",
        "custom_participant_id": "83qi0i",
        "display_name": "Mark",
        "duration": 5.8097,
        "id": "005f4e0c-4d08-4d4e-a391-a76be75cd296",
        "joined_at": "2023-02-01T10:51:08.030Z",
        "left_at": "2023-02-01T10:56:56.612Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:56:56.618Z",
        "user_id": "0a08343d-a9dc-45f0-9feb-6a64afcc4f81"
      },
      {
        "created_at": "2023-02-01T10:50:36.853Z",
        "custom_participant_id": "3uggr",
        "display_name": "Henry",
        "duration": 6.9263,
        "id": "51fdf95f-d893-471a-922b-7db7adb14453",
        "joined_at": "2023-02-01T10:50:36.846Z\"",
        "left_at": "2023-02-01T10:57:32.424Z",
        "preset_name": "webinar_participant",
        "updated_at": "2023-02-01T10:57:32.431Z",
        "user_id": "85e7f0fd-7c16-45e9-9d68-f17ef007c4eb"
      }
    ]
  },
  "success": true
}
```
