# Statuses

## Get waiting room status

**get** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/status`

Fetches the status of a configured waiting room. Response fields include:

1. `status`: String indicating the status of the waiting room. The possible status are:
   - **not\_queueing** indicates that the configured thresholds have not been met and all users are going through to the origin.
   - **queueing** indicates that the thresholds have been met and some users are held in the waiting room.
   - **event\_prequeueing** indicates that an event is active and is currently prequeueing users before it starts.
   - **suspended** indicates that the room is suspended.
1. `event_id`: String of the current event's `id` if an event is active, otherwise an empty string.
1. `estimated_queued_users`: Integer of the estimated number of users currently waiting in the queue.
1. `estimated_total_active_users`: Integer of the estimated number of users currently active on the origin.
1. `max_estimated_time_minutes`: Integer of the maximum estimated time currently presented to the users.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Returns

- `result: object { estimated_queued_users, estimated_total_active_users, event_id, 2 more }`

  - `estimated_queued_users: optional number`

  - `estimated_total_active_users: optional number`

  - `event_id: optional string`

  - `max_estimated_time_minutes: optional number`

  - `status: optional "event_prequeueing" or "not_queueing" or "queueing" or "suspended"`

    - `"event_prequeueing"`

    - `"not_queueing"`

    - `"queueing"`

    - `"suspended"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/status \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "estimated_queued_users": 0,
    "estimated_total_active_users": 0,
    "event_id": "25756b2dfe6e378a06b033b670413757",
    "max_estimated_time_minutes": 0,
    "status": "queueing"
  }
}
```

## Domain Types

### Status Get Response

- `StatusGetResponse object { estimated_queued_users, estimated_total_active_users, event_id, 2 more }`

  - `estimated_queued_users: optional number`

  - `estimated_total_active_users: optional number`

  - `event_id: optional string`

  - `max_estimated_time_minutes: optional number`

  - `status: optional "event_prequeueing" or "not_queueing" or "queueing" or "suspended"`

    - `"event_prequeueing"`

    - `"not_queueing"`

    - `"queueing"`

    - `"suspended"`
