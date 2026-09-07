## Fetch details of a participant

**get** `/accounts/{account_id}/realtime/kit/{app_id}/sessions/{session_id}/participants/{participant_id}`

Returns details of the given participant ID along with call statistics for the given session ID.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `session_id: string`

- `participant_id: string`

### Query Parameters

- `include_peer_events: optional boolean`

  if true, response includes all the peer events of participant.

### Returns

- `data: optional object { participant }`

  - `participant: optional object { id, created_at, custom_participant_id, 8 more }`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/sessions/$SESSION_ID/participants/$PARTICIPANT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "participant": {
      "id": "id",
      "created_at": "created_at",
      "custom_participant_id": "custom_participant_id",
      "display_name": "display_name",
      "duration": 0,
      "joined_at": "joined_at",
      "left_at": "left_at",
      "peer_events": [
        {
          "id": "id",
          "created_at": "created_at",
          "event_name": "PEER_CREATED",
          "minutes_consumed": 0,
          "participant_id": "participant_id",
          "peer_id": "peer_id",
          "preset_view_type": "GROUP_CALL",
          "session_id": "session_id",
          "socket_session_id": "socket_session_id",
          "updated_at": "updated_at"
        }
      ],
      "preset_name": "preset_name",
      "updated_at": "updated_at",
      "user_id": "user_id"
    }
  },
  "success": true
}
```
