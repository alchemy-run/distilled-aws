# Events

## List events

**get** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events`

Lists events for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page. Must be a multiple of 5.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of Event`

  - `id: optional string`

  - `created_on: optional string`

  - `custom_page_html: optional string`

    If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

    If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

  - `event_end_time: optional string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: optional string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

    If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

  - `session_duration: optional number`

    If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

    If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

  - `turnstile_action: optional "log" or "infinite_queue"`

    If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": [
    {
      "id": "25756b2dfe6e378a06b033b670413757",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
      "description": "Production event - DO NOT MODIFY",
      "disable_session_renewal": true,
      "event_end_time": "2021-09-28T17:00:00.000Z",
      "event_start_time": "2021-09-28T15:30:00.000Z",
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "production_webinar_event",
      "new_users_per_minute": 200,
      "prequeue_start_time": "2021-09-28T15:00:00.000Z",
      "queueing_method": "random",
      "session_duration": 1,
      "shuffle_at_event_start": true,
      "suspended": true,
      "total_active_users": 200,
      "turnstile_action": "log",
      "turnstile_mode": "off"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Event details

**get** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}`

Fetches a single configured event for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `event_id: string`

### Returns

- `result: Event`

  - `id: optional string`

  - `created_on: optional string`

  - `custom_page_html: optional string`

    If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

    If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

  - `event_end_time: optional string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: optional string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

    If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

  - `session_duration: optional number`

    If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

    If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

  - `turnstile_action: optional "log" or "infinite_queue"`

    If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events/$EVENT_ID \
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
    "disable_session_renewal": true,
    "event_end_time": "2021-09-28T17:00:00.000Z",
    "event_start_time": "2021-09-28T15:30:00.000Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar_event",
    "new_users_per_minute": 200,
    "prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "queueing_method": "random",
    "session_duration": 1,
    "shuffle_at_event_start": true,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Create event

**post** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events`

Only available for the Waiting Room Advanced subscription. Creates an event for a waiting room. An event takes place during a specified period of time, temporarily changing the behavior of a waiting room. While the event is active, some of the properties in the event's configuration may either override or inherit from the waiting room's configuration. Note that events cannot overlap with each other, so only one event can be active at a time.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Body Parameters

- `event_end_time: string`

  An ISO 8601 timestamp that marks the end of the event.

- `event_start_time: string`

  An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

- `name: string`

  A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

- `custom_page_html: optional string`

  If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

- `description: optional string`

  A note that you can use to add more details about the event.

- `disable_session_renewal: optional boolean`

  If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

- `new_users_per_minute: optional number`

  If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

- `prequeue_start_time: optional string`

  An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

- `queueing_method: optional string`

  If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

- `session_duration: optional number`

  If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

- `shuffle_at_event_start: optional boolean`

  If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

- `suspended: optional boolean`

  Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

- `total_active_users: optional number`

  If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

- `turnstile_action: optional "log" or "infinite_queue"`

  If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

  - `"log"`

  - `"infinite_queue"`

- `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

  If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

  - `"off"`

  - `"invisible"`

  - `"visible_non_interactive"`

  - `"visible_managed"`

### Returns

- `result: Event`

  - `id: optional string`

  - `created_on: optional string`

  - `custom_page_html: optional string`

    If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

    If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

  - `event_end_time: optional string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: optional string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

    If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

  - `session_duration: optional number`

    If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

    If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

  - `turnstile_action: optional "log" or "infinite_queue"`

    If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "event_end_time": "2021-09-28T17:00:00.000Z",
          "event_start_time": "2021-09-28T15:30:00.000Z",
          "name": "production_webinar_event",
          "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
          "description": "Production event - DO NOT MODIFY",
          "prequeue_start_time": "2021-09-28T15:00:00.000Z",
          "queueing_method": "random"
        }'
```

#### Response

```json
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
    "description": "Production event - DO NOT MODIFY",
    "disable_session_renewal": true,
    "event_end_time": "2021-09-28T17:00:00.000Z",
    "event_start_time": "2021-09-28T15:30:00.000Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar_event",
    "new_users_per_minute": 200,
    "prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "queueing_method": "random",
    "session_duration": 1,
    "shuffle_at_event_start": true,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Update event

**put** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}`

Updates a configured event for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `event_id: string`

### Body Parameters

- `event_end_time: string`

  An ISO 8601 timestamp that marks the end of the event.

- `event_start_time: string`

  An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

- `name: string`

  A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

- `custom_page_html: optional string`

  If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

- `description: optional string`

  A note that you can use to add more details about the event.

- `disable_session_renewal: optional boolean`

  If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

- `new_users_per_minute: optional number`

  If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

- `prequeue_start_time: optional string`

  An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

- `queueing_method: optional string`

  If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

- `session_duration: optional number`

  If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

- `shuffle_at_event_start: optional boolean`

  If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

- `suspended: optional boolean`

  Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

- `total_active_users: optional number`

  If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

- `turnstile_action: optional "log" or "infinite_queue"`

  If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

  - `"log"`

  - `"infinite_queue"`

- `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

  If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

  - `"off"`

  - `"invisible"`

  - `"visible_non_interactive"`

  - `"visible_managed"`

### Returns

- `result: Event`

  - `id: optional string`

  - `created_on: optional string`

  - `custom_page_html: optional string`

    If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

    If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

  - `event_end_time: optional string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: optional string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

    If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

  - `session_duration: optional number`

    If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

    If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

  - `turnstile_action: optional "log" or "infinite_queue"`

    If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events/$EVENT_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "event_end_time": "2021-09-28T17:00:00.000Z",
          "event_start_time": "2021-09-28T15:30:00.000Z",
          "name": "production_webinar_event",
          "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
          "description": "Production event - DO NOT MODIFY",
          "prequeue_start_time": "2021-09-28T15:00:00.000Z",
          "queueing_method": "random"
        }'
```

#### Response

```json
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
    "description": "Production event - DO NOT MODIFY",
    "disable_session_renewal": true,
    "event_end_time": "2021-09-28T17:00:00.000Z",
    "event_start_time": "2021-09-28T15:30:00.000Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar_event",
    "new_users_per_minute": 200,
    "prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "queueing_method": "random",
    "session_duration": 1,
    "shuffle_at_event_start": true,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Patch event

**patch** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}`

Patches a configured event for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `event_id: string`

### Body Parameters

- `event_end_time: string`

  An ISO 8601 timestamp that marks the end of the event.

- `event_start_time: string`

  An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

- `name: string`

  A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

- `custom_page_html: optional string`

  If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

- `description: optional string`

  A note that you can use to add more details about the event.

- `disable_session_renewal: optional boolean`

  If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

- `new_users_per_minute: optional number`

  If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

- `prequeue_start_time: optional string`

  An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

- `queueing_method: optional string`

  If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

- `session_duration: optional number`

  If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

- `shuffle_at_event_start: optional boolean`

  If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

- `suspended: optional boolean`

  Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

- `total_active_users: optional number`

  If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

- `turnstile_action: optional "log" or "infinite_queue"`

  If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

  - `"log"`

  - `"infinite_queue"`

- `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

  If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

  - `"off"`

  - `"invisible"`

  - `"visible_non_interactive"`

  - `"visible_managed"`

### Returns

- `result: Event`

  - `id: optional string`

  - `created_on: optional string`

  - `custom_page_html: optional string`

    If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

    If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

  - `event_end_time: optional string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: optional string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

    If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

  - `session_duration: optional number`

    If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

    If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

  - `turnstile_action: optional "log" or "infinite_queue"`

    If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events/$EVENT_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "event_end_time": "2021-09-28T17:00:00.000Z",
          "event_start_time": "2021-09-28T15:30:00.000Z",
          "name": "production_webinar_event",
          "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
          "description": "Production event - DO NOT MODIFY",
          "prequeue_start_time": "2021-09-28T15:00:00.000Z",
          "queueing_method": "random"
        }'
```

#### Response

```json
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Event is prequeueing / Queue all enabled {{/waitTimeKnown}}",
    "description": "Production event - DO NOT MODIFY",
    "disable_session_renewal": true,
    "event_end_time": "2021-09-28T17:00:00.000Z",
    "event_start_time": "2021-09-28T15:30:00.000Z",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar_event",
    "new_users_per_minute": 200,
    "prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "queueing_method": "random",
    "session_duration": 1,
    "shuffle_at_event_start": true,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Delete event

**delete** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}`

Deletes an event for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `event_id: string`

### Returns

- `result: object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events/$EVENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757"
  }
}
```

## Domain Types

### Event

- `Event object { id, created_on, custom_page_html, 15 more }`

  - `id: optional string`

  - `created_on: optional string`

  - `custom_page_html: optional string`

    If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

    If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

  - `event_end_time: optional string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: optional string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

    If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

  - `session_duration: optional number`

    If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

    If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

  - `turnstile_action: optional "log" or "infinite_queue"`

    If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Event Delete Response

- `EventDeleteResponse object { id }`

  - `id: optional string`

# Details

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

## Domain Types

### Event Query

- `EventQuery object { event_end_time, event_start_time, name, 12 more }`

  - `event_end_time: string`

    An ISO 8601 timestamp that marks the end of the event.

  - `event_start_time: string`

    An ISO 8601 timestamp that marks the start of the event. At this time, queued users will be processed with the event's configuration. The start time must be at least one minute before `event_end_time`.

  - `name: string`

    A unique name to identify the event. Only alphanumeric characters, hyphens and underscores are allowed.

  - `custom_page_html: optional string`

    If set, the event will override the waiting room's `custom_page_html` property while it is active. If null, the event will inherit it.

  - `description: optional string`

    A note that you can use to add more details about the event.

  - `disable_session_renewal: optional boolean`

    If set, the event will override the waiting room's `disable_session_renewal` property while it is active. If null, the event will inherit it.

  - `new_users_per_minute: optional number`

    If set, the event will override the waiting room's `new_users_per_minute` property while it is active. If null, the event will inherit it. This can only be set if the event's `total_active_users` property is also set.

  - `prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when to begin queueing all users before the event starts. The prequeue must start at least five minutes before `event_start_time`.

  - `queueing_method: optional string`

    If set, the event will override the waiting room's `queueing_method` property while it is active. If null, the event will inherit it.

  - `session_duration: optional number`

    If set, the event will override the waiting room's `session_duration` property while it is active. If null, the event will inherit it.

  - `shuffle_at_event_start: optional boolean`

    If enabled, users in the prequeue will be shuffled randomly at the `event_start_time`. Requires that `prequeue_start_time` is not null. This is useful for situations when many users will join the event prequeue at the same time and you want to shuffle them to ensure fairness. Naturally, it makes the most sense to enable this feature when the `queueing_method` during the event respects ordering such as **fifo**, or else the shuffling may be unnecessary.

  - `suspended: optional boolean`

    Suspends or allows an event. If set to `true`, the event is ignored and traffic will be handled based on the waiting room configuration.

  - `total_active_users: optional number`

    If set, the event will override the waiting room's `total_active_users` property while it is active. If null, the event will inherit it. This can only be set if the event's `new_users_per_minute` property is also set.

  - `turnstile_action: optional "log" or "infinite_queue"`

    If set, the event will override the waiting room's `turnstile_action` property while it is active. If null, the event will inherit it.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    If set, the event will override the waiting room's `turnstile_mode` property while it is active. If null, the event will inherit it.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Detail Get Response

- `DetailGetResponse object { id, created_on, custom_page_html, 13 more }`

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
