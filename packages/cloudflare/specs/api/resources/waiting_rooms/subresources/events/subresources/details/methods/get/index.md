## Preview active event details

**get** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}/details`

Previews an event's configuration as if it was active. Inherited fields from the waiting room will be displayed with their current values.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `event_id: string`

### Returns

- `result: object { id, created_on, custom_page_html, 13 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `custom_page_html: optional string`

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

  - `event_end_time: optional string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: optional string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

  - `session_duration: optional number`

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events/$EVENT_ID/details \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
    "description": "Production event - DO NOT MODIFY",
    "disable_session_renewal": false,
    "event_end_time": "2021-09-28T17:00:00.000Z",
    "event_start_time": "2021-09-28T15:30:00.000Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar_event",
    "new_users_per_minute": 0,
    "prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "queueing_method": "random",
    "session_duration": 0,
    "shuffle_at_event_start": true,
    "suspended": true,
    "total_active_users": 0
  }
}
```
