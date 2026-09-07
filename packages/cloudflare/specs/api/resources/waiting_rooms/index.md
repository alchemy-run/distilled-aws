# Waiting Rooms

## List waiting rooms for account or zone

**get** `/{accounts_or_zones}/{account_or_zone_id}/waiting_rooms`

Lists waiting rooms for account or zone.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional array of WaitingRoom`

  - `id: optional string`

  - `additional_routes: optional array of AdditionalRoutes`

    Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

    - `host: optional string`

      The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

    - `path: optional string`

      Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `cookie_attributes: optional CookieAttributes`

    Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

    - `samesite: optional "auto" or "lax" or "none" or "strict"`

      Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

      - `"auto"`

      - `"lax"`

      - `"none"`

      - `"strict"`

    - `secure: optional "auto" or "always" or "never"`

      Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

      - `"auto"`

      - `"always"`

      - `"never"`

  - `cookie_suffix: optional string`

    Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

  - `created_on: optional string`

  - `custom_page_html: optional string`

    Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

    1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
    1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
    1. {{`waitTime`}} Number of minutes of estimated wait for a user.
    1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
    1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
    1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

    To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

  - `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

    The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

    - `"en-US"`

    - `"es-ES"`

    - `"de-DE"`

    - `"fr-FR"`

    - `"it-IT"`

    - `"ja-JP"`

    - `"ko-KR"`

    - `"pt-BR"`

    - `"zh-CN"`

    - `"zh-TW"`

    - `"nl-NL"`

    - `"pl-PL"`

    - `"id-ID"`

    - `"tr-TR"`

    - `"ar-EG"`

    - `"ru-RU"`

    - `"fa-IR"`

    - `"bg-BG"`

    - `"hr-HR"`

    - `"cs-CZ"`

    - `"da-DK"`

    - `"fi-FI"`

    - `"lt-LT"`

    - `"ms-MY"`

    - `"nb-NO"`

    - `"ro-RO"`

    - `"el-GR"`

    - `"he-IL"`

    - `"hi-IN"`

    - `"hu-HU"`

    - `"sr-BA"`

    - `"sk-SK"`

    - `"sl-SI"`

    - `"sv-SE"`

    - `"tl-PH"`

    - `"th-TH"`

    - `"uk-UA"`

    - `"vi-VN"`

  - `description: optional string`

    A note that you can use to add more details about the waiting room.

  - `disable_session_renewal: optional boolean`

    Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

  - `enabled_origin_commands: optional array of "revoke"`

    A list of enabled origin commands.

    - `"revoke"`

  - `host: optional string`

    The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

  - `json_response_enabled: optional boolean`

    Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

    1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
    1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
    1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
    1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
    1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
    1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
    1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
    1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
    1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
    1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
    1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
    1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
    1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
    1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
    1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
    1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
    1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
    1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
    1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
    1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
    1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
    1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
    1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
    1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
    1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

    An example cURL to a waiting room could be:

    curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 0,
    "waitTime50Percentile": 0,
    "waitTime75Percentile": 0,
    "waitTimeFormatted": "10 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "fifo",
    "isFIFOQueue": true,
    "isRandomQueue": false,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": false,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 0,
    "timeUntilEventEndFormatted": "unavailable",
    "shuffleAtEventStart": false
    }
    }

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 5,
    "waitTime50Percentile": 10,
    "waitTime75Percentile": 15,
    "waitTimeFormatted": "5 minutes to 15 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "random",
    "isFIFOQueue": false,
    "isRandomQueue": true,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": true,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 15,
    "timeUntilEventEndFormatted": "15 minutes",
    "shuffleAtEventStart": true
    }
    }

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

  - `next_event_prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will begin queueing.

  - `next_event_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will start.

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `queue_all: optional boolean`

    If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

  - `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

    Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

    1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
    1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
    1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
    1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

    - `"fifo"`

    - `"random"`

    - `"passthrough"`

    - `"reject"`

  - `queueing_status_code: optional 200 or 202 or 429`

    HTTP status code returned to a user while in the queue.

    - `200`

    - `202`

    - `429`

  - `session_duration: optional number`

    Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

  - `suspended: optional boolean`

    Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

  - `total_active_users: optional number`

    Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

  - `turnstile_action: optional "log" or "infinite_queue"`

    Which action to take when a bot is detected using Turnstile. `log` will
    have no impact on queueing behavior, simply keeping track of how many
    bots are detected in Waiting Room Analytics. `infinite_queue` will send
    bots to a false queueing state, where they will never reach your
    origin. `infinite_queue` requires Advanced Waiting Room.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    Which Turnstile widget type to use for detecting bot traffic. See
    [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
    for the definitions of these widget types. Set to `off` to disable the
    Turnstile integration entirely. Setting this to anything other than
    `off` or `invisible` requires Advanced Waiting Room.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/waiting_rooms \
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
      "id": "699d98642c564d2e855e9661899b7252",
      "additional_routes": [
        {
          "host": "shop2.example.com",
          "path": "/shop2/checkout"
        }
      ],
      "cookie_attributes": {
        "samesite": "auto",
        "secure": "auto"
      },
      "cookie_suffix": "abcd",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
      "default_template_language": "es-ES",
      "description": "Production - DO NOT MODIFY",
      "disable_session_renewal": false,
      "enabled_origin_commands": [
        "revoke"
      ],
      "host": "shop.example.com",
      "json_response_enabled": false,
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "name": "production_webinar",
      "new_users_per_minute": 200,
      "next_event_prequeue_start_time": "2021-09-28T15:00:00.000Z",
      "next_event_start_time": "2021-09-28T15:00:00.000Z",
      "path": "/shop/checkout",
      "queue_all": true,
      "queueing_method": "fifo",
      "queueing_status_code": 202,
      "session_duration": 1,
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

## Waiting room details

**get** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}`

Fetches a single configured waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Returns

- `result: WaitingRoom`

  - `id: optional string`

  - `additional_routes: optional array of AdditionalRoutes`

    Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

    - `host: optional string`

      The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

    - `path: optional string`

      Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `cookie_attributes: optional CookieAttributes`

    Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

    - `samesite: optional "auto" or "lax" or "none" or "strict"`

      Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

      - `"auto"`

      - `"lax"`

      - `"none"`

      - `"strict"`

    - `secure: optional "auto" or "always" or "never"`

      Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

      - `"auto"`

      - `"always"`

      - `"never"`

  - `cookie_suffix: optional string`

    Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

  - `created_on: optional string`

  - `custom_page_html: optional string`

    Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

    1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
    1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
    1. {{`waitTime`}} Number of minutes of estimated wait for a user.
    1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
    1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
    1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

    To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

  - `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

    The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

    - `"en-US"`

    - `"es-ES"`

    - `"de-DE"`

    - `"fr-FR"`

    - `"it-IT"`

    - `"ja-JP"`

    - `"ko-KR"`

    - `"pt-BR"`

    - `"zh-CN"`

    - `"zh-TW"`

    - `"nl-NL"`

    - `"pl-PL"`

    - `"id-ID"`

    - `"tr-TR"`

    - `"ar-EG"`

    - `"ru-RU"`

    - `"fa-IR"`

    - `"bg-BG"`

    - `"hr-HR"`

    - `"cs-CZ"`

    - `"da-DK"`

    - `"fi-FI"`

    - `"lt-LT"`

    - `"ms-MY"`

    - `"nb-NO"`

    - `"ro-RO"`

    - `"el-GR"`

    - `"he-IL"`

    - `"hi-IN"`

    - `"hu-HU"`

    - `"sr-BA"`

    - `"sk-SK"`

    - `"sl-SI"`

    - `"sv-SE"`

    - `"tl-PH"`

    - `"th-TH"`

    - `"uk-UA"`

    - `"vi-VN"`

  - `description: optional string`

    A note that you can use to add more details about the waiting room.

  - `disable_session_renewal: optional boolean`

    Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

  - `enabled_origin_commands: optional array of "revoke"`

    A list of enabled origin commands.

    - `"revoke"`

  - `host: optional string`

    The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

  - `json_response_enabled: optional boolean`

    Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

    1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
    1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
    1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
    1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
    1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
    1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
    1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
    1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
    1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
    1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
    1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
    1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
    1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
    1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
    1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
    1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
    1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
    1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
    1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
    1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
    1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
    1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
    1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
    1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
    1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

    An example cURL to a waiting room could be:

    curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 0,
    "waitTime50Percentile": 0,
    "waitTime75Percentile": 0,
    "waitTimeFormatted": "10 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "fifo",
    "isFIFOQueue": true,
    "isRandomQueue": false,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": false,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 0,
    "timeUntilEventEndFormatted": "unavailable",
    "shuffleAtEventStart": false
    }
    }

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 5,
    "waitTime50Percentile": 10,
    "waitTime75Percentile": 15,
    "waitTimeFormatted": "5 minutes to 15 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "random",
    "isFIFOQueue": false,
    "isRandomQueue": true,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": true,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 15,
    "timeUntilEventEndFormatted": "15 minutes",
    "shuffleAtEventStart": true
    }
    }

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

  - `next_event_prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will begin queueing.

  - `next_event_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will start.

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `queue_all: optional boolean`

    If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

  - `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

    Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

    1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
    1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
    1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
    1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

    - `"fifo"`

    - `"random"`

    - `"passthrough"`

    - `"reject"`

  - `queueing_status_code: optional 200 or 202 or 429`

    HTTP status code returned to a user while in the queue.

    - `200`

    - `202`

    - `429`

  - `session_duration: optional number`

    Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

  - `suspended: optional boolean`

    Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

  - `total_active_users: optional number`

    Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

  - `turnstile_action: optional "log" or "infinite_queue"`

    Which action to take when a bot is detected using Turnstile. `log` will
    have no impact on queueing behavior, simply keeping track of how many
    bots are detected in Waiting Room Analytics. `infinite_queue` will send
    bots to a false queueing state, where they will never reach your
    origin. `infinite_queue` requires Advanced Waiting Room.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    Which Turnstile widget type to use for detecting bot traffic. See
    [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
    for the definitions of these widget types. Set to `off` to disable the
    Turnstile integration entirely. Setting this to anything other than
    `off` or `invisible` requires Advanced Waiting Room.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "additional_routes": [
      {
        "host": "shop2.example.com",
        "path": "/shop2/checkout"
      }
    ],
    "cookie_attributes": {
      "samesite": "auto",
      "secure": "auto"
    },
    "cookie_suffix": "abcd",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
    "default_template_language": "es-ES",
    "description": "Production - DO NOT MODIFY",
    "disable_session_renewal": false,
    "enabled_origin_commands": [
      "revoke"
    ],
    "host": "shop.example.com",
    "json_response_enabled": false,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar",
    "new_users_per_minute": 200,
    "next_event_prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "next_event_start_time": "2021-09-28T15:00:00.000Z",
    "path": "/shop/checkout",
    "queue_all": true,
    "queueing_method": "fifo",
    "queueing_status_code": 202,
    "session_duration": 1,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Create waiting room

**post** `/zones/{zone_id}/waiting_rooms`

Creates a new waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `host: string`

  The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

- `name: string`

  A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

- `new_users_per_minute: number`

  Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

- `total_active_users: number`

  Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

- `additional_routes: optional array of AdditionalRoutes`

  Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

  - `host: optional string`

    The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

- `cookie_attributes: optional CookieAttributes`

  Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

  - `samesite: optional "auto" or "lax" or "none" or "strict"`

    Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

    - `"auto"`

    - `"lax"`

    - `"none"`

    - `"strict"`

  - `secure: optional "auto" or "always" or "never"`

    Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

    - `"auto"`

    - `"always"`

    - `"never"`

- `cookie_suffix: optional string`

  Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

- `custom_page_html: optional string`

  Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

  1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
  1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
  1. {{`waitTime`}} Number of minutes of estimated wait for a user.
  1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
  1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
  1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

  To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

- `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

  The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

  - `"en-US"`

  - `"es-ES"`

  - `"de-DE"`

  - `"fr-FR"`

  - `"it-IT"`

  - `"ja-JP"`

  - `"ko-KR"`

  - `"pt-BR"`

  - `"zh-CN"`

  - `"zh-TW"`

  - `"nl-NL"`

  - `"pl-PL"`

  - `"id-ID"`

  - `"tr-TR"`

  - `"ar-EG"`

  - `"ru-RU"`

  - `"fa-IR"`

  - `"bg-BG"`

  - `"hr-HR"`

  - `"cs-CZ"`

  - `"da-DK"`

  - `"fi-FI"`

  - `"lt-LT"`

  - `"ms-MY"`

  - `"nb-NO"`

  - `"ro-RO"`

  - `"el-GR"`

  - `"he-IL"`

  - `"hi-IN"`

  - `"hu-HU"`

  - `"sr-BA"`

  - `"sk-SK"`

  - `"sl-SI"`

  - `"sv-SE"`

  - `"tl-PH"`

  - `"th-TH"`

  - `"uk-UA"`

  - `"vi-VN"`

- `description: optional string`

  A note that you can use to add more details about the waiting room.

- `disable_session_renewal: optional boolean`

  Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

- `enabled_origin_commands: optional array of "revoke"`

  A list of enabled origin commands.

  - `"revoke"`

- `json_response_enabled: optional boolean`

  Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

  1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
  1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
  1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
  1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
  1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
  1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
  1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
  1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
  1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
  1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
  1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
  1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
  1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
  1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
  1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
  1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
  1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
  1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
  1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
  1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
  1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
  1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
  1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
  1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
  1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

  An example cURL to a waiting room could be:

  curl -X GET "https://example.com/waitingroom" \
  -H "Accept: application/json"

  If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

  {
  "cfWaitingRoom": {
  "inWaitingRoom": true,
  "waitTimeKnown": true,
  "waitTime": 10,
  "waitTime25Percentile": 0,
  "waitTime50Percentile": 0,
  "waitTime75Percentile": 0,
  "waitTimeFormatted": "10 minutes",
  "queueIsFull": false,
  "queueAll": false,
  "lastUpdated": "2020-08-03T23:46:00.000Z",
  "refreshIntervalSeconds": 20,
  "queueingMethod": "fifo",
  "isFIFOQueue": true,
  "isRandomQueue": false,
  "isPassthroughQueue": false,
  "isRejectQueue": false,
  "isEventActive": false,
  "isEventPrequeueing": false,
  "timeUntilEventStart": 0,
  "timeUntilEventStartFormatted": "unavailable",
  "timeUntilEventEnd": 0,
  "timeUntilEventEndFormatted": "unavailable",
  "shuffleAtEventStart": false
  }
  }

  If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

  {
  "cfWaitingRoom": {
  "inWaitingRoom": true,
  "waitTimeKnown": true,
  "waitTime": 10,
  "waitTime25Percentile": 5,
  "waitTime50Percentile": 10,
  "waitTime75Percentile": 15,
  "waitTimeFormatted": "5 minutes to 15 minutes",
  "queueIsFull": false,
  "queueAll": false,
  "lastUpdated": "2020-08-03T23:46:00.000Z",
  "refreshIntervalSeconds": 20,
  "queueingMethod": "random",
  "isFIFOQueue": false,
  "isRandomQueue": true,
  "isPassthroughQueue": false,
  "isRejectQueue": false,
  "isEventActive": true,
  "isEventPrequeueing": false,
  "timeUntilEventStart": 0,
  "timeUntilEventStartFormatted": "unavailable",
  "timeUntilEventEnd": 15,
  "timeUntilEventEndFormatted": "15 minutes",
  "shuffleAtEventStart": true
  }
  }

- `path: optional string`

  Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

- `queue_all: optional boolean`

  If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

- `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

  Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

  1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
  1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
  1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
  1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

  - `"fifo"`

  - `"random"`

  - `"passthrough"`

  - `"reject"`

- `queueing_status_code: optional 200 or 202 or 429`

  HTTP status code returned to a user while in the queue.

  - `200`

  - `202`

  - `429`

- `session_duration: optional number`

  Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

- `suspended: optional boolean`

  Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

- `turnstile_action: optional "log" or "infinite_queue"`

  Which action to take when a bot is detected using Turnstile. `log` will
  have no impact on queueing behavior, simply keeping track of how many
  bots are detected in Waiting Room Analytics. `infinite_queue` will send
  bots to a false queueing state, where they will never reach your
  origin. `infinite_queue` requires Advanced Waiting Room.

  - `"log"`

  - `"infinite_queue"`

- `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

  Which Turnstile widget type to use for detecting bot traffic. See
  [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
  for the definitions of these widget types. Set to `off` to disable the
  Turnstile integration entirely. Setting this to anything other than
  `off` or `invisible` requires Advanced Waiting Room.

  - `"off"`

  - `"invisible"`

  - `"visible_non_interactive"`

  - `"visible_managed"`

### Returns

- `result: WaitingRoom`

  - `id: optional string`

  - `additional_routes: optional array of AdditionalRoutes`

    Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

    - `host: optional string`

      The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

    - `path: optional string`

      Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `cookie_attributes: optional CookieAttributes`

    Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

    - `samesite: optional "auto" or "lax" or "none" or "strict"`

      Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

      - `"auto"`

      - `"lax"`

      - `"none"`

      - `"strict"`

    - `secure: optional "auto" or "always" or "never"`

      Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

      - `"auto"`

      - `"always"`

      - `"never"`

  - `cookie_suffix: optional string`

    Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

  - `created_on: optional string`

  - `custom_page_html: optional string`

    Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

    1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
    1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
    1. {{`waitTime`}} Number of minutes of estimated wait for a user.
    1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
    1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
    1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

    To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

  - `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

    The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

    - `"en-US"`

    - `"es-ES"`

    - `"de-DE"`

    - `"fr-FR"`

    - `"it-IT"`

    - `"ja-JP"`

    - `"ko-KR"`

    - `"pt-BR"`

    - `"zh-CN"`

    - `"zh-TW"`

    - `"nl-NL"`

    - `"pl-PL"`

    - `"id-ID"`

    - `"tr-TR"`

    - `"ar-EG"`

    - `"ru-RU"`

    - `"fa-IR"`

    - `"bg-BG"`

    - `"hr-HR"`

    - `"cs-CZ"`

    - `"da-DK"`

    - `"fi-FI"`

    - `"lt-LT"`

    - `"ms-MY"`

    - `"nb-NO"`

    - `"ro-RO"`

    - `"el-GR"`

    - `"he-IL"`

    - `"hi-IN"`

    - `"hu-HU"`

    - `"sr-BA"`

    - `"sk-SK"`

    - `"sl-SI"`

    - `"sv-SE"`

    - `"tl-PH"`

    - `"th-TH"`

    - `"uk-UA"`

    - `"vi-VN"`

  - `description: optional string`

    A note that you can use to add more details about the waiting room.

  - `disable_session_renewal: optional boolean`

    Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

  - `enabled_origin_commands: optional array of "revoke"`

    A list of enabled origin commands.

    - `"revoke"`

  - `host: optional string`

    The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

  - `json_response_enabled: optional boolean`

    Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

    1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
    1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
    1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
    1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
    1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
    1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
    1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
    1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
    1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
    1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
    1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
    1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
    1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
    1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
    1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
    1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
    1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
    1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
    1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
    1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
    1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
    1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
    1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
    1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
    1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

    An example cURL to a waiting room could be:

    curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 0,
    "waitTime50Percentile": 0,
    "waitTime75Percentile": 0,
    "waitTimeFormatted": "10 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "fifo",
    "isFIFOQueue": true,
    "isRandomQueue": false,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": false,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 0,
    "timeUntilEventEndFormatted": "unavailable",
    "shuffleAtEventStart": false
    }
    }

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 5,
    "waitTime50Percentile": 10,
    "waitTime75Percentile": 15,
    "waitTimeFormatted": "5 minutes to 15 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "random",
    "isFIFOQueue": false,
    "isRandomQueue": true,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": true,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 15,
    "timeUntilEventEndFormatted": "15 minutes",
    "shuffleAtEventStart": true
    }
    }

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

  - `next_event_prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will begin queueing.

  - `next_event_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will start.

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `queue_all: optional boolean`

    If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

  - `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

    Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

    1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
    1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
    1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
    1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

    - `"fifo"`

    - `"random"`

    - `"passthrough"`

    - `"reject"`

  - `queueing_status_code: optional 200 or 202 or 429`

    HTTP status code returned to a user while in the queue.

    - `200`

    - `202`

    - `429`

  - `session_duration: optional number`

    Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

  - `suspended: optional boolean`

    Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

  - `total_active_users: optional number`

    Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

  - `turnstile_action: optional "log" or "infinite_queue"`

    Which action to take when a bot is detected using Turnstile. `log` will
    have no impact on queueing behavior, simply keeping track of how many
    bots are detected in Waiting Room Analytics. `infinite_queue` will send
    bots to a false queueing state, where they will never reach your
    origin. `infinite_queue` requires Advanced Waiting Room.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    Which Turnstile widget type to use for detecting bot traffic. See
    [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
    for the definitions of these widget types. Set to `off` to disable the
    Turnstile integration entirely. Setting this to anything other than
    `off` or `invisible` requires Advanced Waiting Room.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "shop.example.com",
          "name": "production_webinar",
          "new_users_per_minute": 200,
          "total_active_users": 200,
          "cookie_suffix": "abcd",
          "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
          "default_template_language": "es-ES",
          "description": "Production - DO NOT MODIFY",
          "path": "/shop/checkout",
          "queue_all": true,
          "queueing_method": "fifo",
          "queueing_status_code": 202
        }'
```

#### Response

```json
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "additional_routes": [
      {
        "host": "shop2.example.com",
        "path": "/shop2/checkout"
      }
    ],
    "cookie_attributes": {
      "samesite": "auto",
      "secure": "auto"
    },
    "cookie_suffix": "abcd",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
    "default_template_language": "es-ES",
    "description": "Production - DO NOT MODIFY",
    "disable_session_renewal": false,
    "enabled_origin_commands": [
      "revoke"
    ],
    "host": "shop.example.com",
    "json_response_enabled": false,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar",
    "new_users_per_minute": 200,
    "next_event_prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "next_event_start_time": "2021-09-28T15:00:00.000Z",
    "path": "/shop/checkout",
    "queue_all": true,
    "queueing_method": "fifo",
    "queueing_status_code": 202,
    "session_duration": 1,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Update waiting room

**put** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}`

Updates a configured waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Body Parameters

- `host: string`

  The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

- `name: string`

  A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

- `new_users_per_minute: number`

  Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

- `total_active_users: number`

  Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

- `additional_routes: optional array of AdditionalRoutes`

  Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

  - `host: optional string`

    The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

- `cookie_attributes: optional CookieAttributes`

  Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

  - `samesite: optional "auto" or "lax" or "none" or "strict"`

    Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

    - `"auto"`

    - `"lax"`

    - `"none"`

    - `"strict"`

  - `secure: optional "auto" or "always" or "never"`

    Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

    - `"auto"`

    - `"always"`

    - `"never"`

- `cookie_suffix: optional string`

  Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

- `custom_page_html: optional string`

  Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

  1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
  1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
  1. {{`waitTime`}} Number of minutes of estimated wait for a user.
  1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
  1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
  1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

  To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

- `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

  The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

  - `"en-US"`

  - `"es-ES"`

  - `"de-DE"`

  - `"fr-FR"`

  - `"it-IT"`

  - `"ja-JP"`

  - `"ko-KR"`

  - `"pt-BR"`

  - `"zh-CN"`

  - `"zh-TW"`

  - `"nl-NL"`

  - `"pl-PL"`

  - `"id-ID"`

  - `"tr-TR"`

  - `"ar-EG"`

  - `"ru-RU"`

  - `"fa-IR"`

  - `"bg-BG"`

  - `"hr-HR"`

  - `"cs-CZ"`

  - `"da-DK"`

  - `"fi-FI"`

  - `"lt-LT"`

  - `"ms-MY"`

  - `"nb-NO"`

  - `"ro-RO"`

  - `"el-GR"`

  - `"he-IL"`

  - `"hi-IN"`

  - `"hu-HU"`

  - `"sr-BA"`

  - `"sk-SK"`

  - `"sl-SI"`

  - `"sv-SE"`

  - `"tl-PH"`

  - `"th-TH"`

  - `"uk-UA"`

  - `"vi-VN"`

- `description: optional string`

  A note that you can use to add more details about the waiting room.

- `disable_session_renewal: optional boolean`

  Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

- `enabled_origin_commands: optional array of "revoke"`

  A list of enabled origin commands.

  - `"revoke"`

- `json_response_enabled: optional boolean`

  Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

  1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
  1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
  1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
  1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
  1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
  1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
  1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
  1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
  1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
  1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
  1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
  1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
  1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
  1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
  1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
  1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
  1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
  1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
  1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
  1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
  1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
  1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
  1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
  1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
  1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

  An example cURL to a waiting room could be:

  curl -X GET "https://example.com/waitingroom" \
  -H "Accept: application/json"

  If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

  {
  "cfWaitingRoom": {
  "inWaitingRoom": true,
  "waitTimeKnown": true,
  "waitTime": 10,
  "waitTime25Percentile": 0,
  "waitTime50Percentile": 0,
  "waitTime75Percentile": 0,
  "waitTimeFormatted": "10 minutes",
  "queueIsFull": false,
  "queueAll": false,
  "lastUpdated": "2020-08-03T23:46:00.000Z",
  "refreshIntervalSeconds": 20,
  "queueingMethod": "fifo",
  "isFIFOQueue": true,
  "isRandomQueue": false,
  "isPassthroughQueue": false,
  "isRejectQueue": false,
  "isEventActive": false,
  "isEventPrequeueing": false,
  "timeUntilEventStart": 0,
  "timeUntilEventStartFormatted": "unavailable",
  "timeUntilEventEnd": 0,
  "timeUntilEventEndFormatted": "unavailable",
  "shuffleAtEventStart": false
  }
  }

  If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

  {
  "cfWaitingRoom": {
  "inWaitingRoom": true,
  "waitTimeKnown": true,
  "waitTime": 10,
  "waitTime25Percentile": 5,
  "waitTime50Percentile": 10,
  "waitTime75Percentile": 15,
  "waitTimeFormatted": "5 minutes to 15 minutes",
  "queueIsFull": false,
  "queueAll": false,
  "lastUpdated": "2020-08-03T23:46:00.000Z",
  "refreshIntervalSeconds": 20,
  "queueingMethod": "random",
  "isFIFOQueue": false,
  "isRandomQueue": true,
  "isPassthroughQueue": false,
  "isRejectQueue": false,
  "isEventActive": true,
  "isEventPrequeueing": false,
  "timeUntilEventStart": 0,
  "timeUntilEventStartFormatted": "unavailable",
  "timeUntilEventEnd": 15,
  "timeUntilEventEndFormatted": "15 minutes",
  "shuffleAtEventStart": true
  }
  }

- `path: optional string`

  Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

- `queue_all: optional boolean`

  If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

- `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

  Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

  1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
  1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
  1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
  1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

  - `"fifo"`

  - `"random"`

  - `"passthrough"`

  - `"reject"`

- `queueing_status_code: optional 200 or 202 or 429`

  HTTP status code returned to a user while in the queue.

  - `200`

  - `202`

  - `429`

- `session_duration: optional number`

  Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

- `suspended: optional boolean`

  Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

- `turnstile_action: optional "log" or "infinite_queue"`

  Which action to take when a bot is detected using Turnstile. `log` will
  have no impact on queueing behavior, simply keeping track of how many
  bots are detected in Waiting Room Analytics. `infinite_queue` will send
  bots to a false queueing state, where they will never reach your
  origin. `infinite_queue` requires Advanced Waiting Room.

  - `"log"`

  - `"infinite_queue"`

- `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

  Which Turnstile widget type to use for detecting bot traffic. See
  [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
  for the definitions of these widget types. Set to `off` to disable the
  Turnstile integration entirely. Setting this to anything other than
  `off` or `invisible` requires Advanced Waiting Room.

  - `"off"`

  - `"invisible"`

  - `"visible_non_interactive"`

  - `"visible_managed"`

### Returns

- `result: WaitingRoom`

  - `id: optional string`

  - `additional_routes: optional array of AdditionalRoutes`

    Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

    - `host: optional string`

      The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

    - `path: optional string`

      Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `cookie_attributes: optional CookieAttributes`

    Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

    - `samesite: optional "auto" or "lax" or "none" or "strict"`

      Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

      - `"auto"`

      - `"lax"`

      - `"none"`

      - `"strict"`

    - `secure: optional "auto" or "always" or "never"`

      Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

      - `"auto"`

      - `"always"`

      - `"never"`

  - `cookie_suffix: optional string`

    Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

  - `created_on: optional string`

  - `custom_page_html: optional string`

    Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

    1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
    1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
    1. {{`waitTime`}} Number of minutes of estimated wait for a user.
    1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
    1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
    1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

    To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

  - `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

    The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

    - `"en-US"`

    - `"es-ES"`

    - `"de-DE"`

    - `"fr-FR"`

    - `"it-IT"`

    - `"ja-JP"`

    - `"ko-KR"`

    - `"pt-BR"`

    - `"zh-CN"`

    - `"zh-TW"`

    - `"nl-NL"`

    - `"pl-PL"`

    - `"id-ID"`

    - `"tr-TR"`

    - `"ar-EG"`

    - `"ru-RU"`

    - `"fa-IR"`

    - `"bg-BG"`

    - `"hr-HR"`

    - `"cs-CZ"`

    - `"da-DK"`

    - `"fi-FI"`

    - `"lt-LT"`

    - `"ms-MY"`

    - `"nb-NO"`

    - `"ro-RO"`

    - `"el-GR"`

    - `"he-IL"`

    - `"hi-IN"`

    - `"hu-HU"`

    - `"sr-BA"`

    - `"sk-SK"`

    - `"sl-SI"`

    - `"sv-SE"`

    - `"tl-PH"`

    - `"th-TH"`

    - `"uk-UA"`

    - `"vi-VN"`

  - `description: optional string`

    A note that you can use to add more details about the waiting room.

  - `disable_session_renewal: optional boolean`

    Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

  - `enabled_origin_commands: optional array of "revoke"`

    A list of enabled origin commands.

    - `"revoke"`

  - `host: optional string`

    The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

  - `json_response_enabled: optional boolean`

    Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

    1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
    1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
    1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
    1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
    1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
    1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
    1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
    1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
    1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
    1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
    1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
    1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
    1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
    1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
    1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
    1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
    1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
    1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
    1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
    1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
    1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
    1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
    1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
    1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
    1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

    An example cURL to a waiting room could be:

    curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 0,
    "waitTime50Percentile": 0,
    "waitTime75Percentile": 0,
    "waitTimeFormatted": "10 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "fifo",
    "isFIFOQueue": true,
    "isRandomQueue": false,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": false,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 0,
    "timeUntilEventEndFormatted": "unavailable",
    "shuffleAtEventStart": false
    }
    }

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 5,
    "waitTime50Percentile": 10,
    "waitTime75Percentile": 15,
    "waitTimeFormatted": "5 minutes to 15 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "random",
    "isFIFOQueue": false,
    "isRandomQueue": true,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": true,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 15,
    "timeUntilEventEndFormatted": "15 minutes",
    "shuffleAtEventStart": true
    }
    }

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

  - `next_event_prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will begin queueing.

  - `next_event_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will start.

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `queue_all: optional boolean`

    If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

  - `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

    Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

    1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
    1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
    1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
    1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

    - `"fifo"`

    - `"random"`

    - `"passthrough"`

    - `"reject"`

  - `queueing_status_code: optional 200 or 202 or 429`

    HTTP status code returned to a user while in the queue.

    - `200`

    - `202`

    - `429`

  - `session_duration: optional number`

    Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

  - `suspended: optional boolean`

    Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

  - `total_active_users: optional number`

    Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

  - `turnstile_action: optional "log" or "infinite_queue"`

    Which action to take when a bot is detected using Turnstile. `log` will
    have no impact on queueing behavior, simply keeping track of how many
    bots are detected in Waiting Room Analytics. `infinite_queue` will send
    bots to a false queueing state, where they will never reach your
    origin. `infinite_queue` requires Advanced Waiting Room.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    Which Turnstile widget type to use for detecting bot traffic. See
    [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
    for the definitions of these widget types. Set to `off` to disable the
    Turnstile integration entirely. Setting this to anything other than
    `off` or `invisible` requires Advanced Waiting Room.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "shop.example.com",
          "name": "production_webinar",
          "new_users_per_minute": 200,
          "total_active_users": 200,
          "cookie_suffix": "abcd",
          "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
          "default_template_language": "es-ES",
          "description": "Production - DO NOT MODIFY",
          "path": "/shop/checkout",
          "queue_all": true,
          "queueing_method": "fifo",
          "queueing_status_code": 202
        }'
```

#### Response

```json
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "additional_routes": [
      {
        "host": "shop2.example.com",
        "path": "/shop2/checkout"
      }
    ],
    "cookie_attributes": {
      "samesite": "auto",
      "secure": "auto"
    },
    "cookie_suffix": "abcd",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
    "default_template_language": "es-ES",
    "description": "Production - DO NOT MODIFY",
    "disable_session_renewal": false,
    "enabled_origin_commands": [
      "revoke"
    ],
    "host": "shop.example.com",
    "json_response_enabled": false,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar",
    "new_users_per_minute": 200,
    "next_event_prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "next_event_start_time": "2021-09-28T15:00:00.000Z",
    "path": "/shop/checkout",
    "queue_all": true,
    "queueing_method": "fifo",
    "queueing_status_code": 202,
    "session_duration": 1,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Patch waiting room

**patch** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}`

Patches a configured waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Body Parameters

- `host: string`

  The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

- `name: string`

  A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

- `new_users_per_minute: number`

  Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

- `total_active_users: number`

  Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

- `additional_routes: optional array of AdditionalRoutes`

  Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

  - `host: optional string`

    The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

- `cookie_attributes: optional CookieAttributes`

  Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

  - `samesite: optional "auto" or "lax" or "none" or "strict"`

    Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

    - `"auto"`

    - `"lax"`

    - `"none"`

    - `"strict"`

  - `secure: optional "auto" or "always" or "never"`

    Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

    - `"auto"`

    - `"always"`

    - `"never"`

- `cookie_suffix: optional string`

  Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

- `custom_page_html: optional string`

  Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

  1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
  1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
  1. {{`waitTime`}} Number of minutes of estimated wait for a user.
  1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
  1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
  1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

  To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

- `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

  The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

  - `"en-US"`

  - `"es-ES"`

  - `"de-DE"`

  - `"fr-FR"`

  - `"it-IT"`

  - `"ja-JP"`

  - `"ko-KR"`

  - `"pt-BR"`

  - `"zh-CN"`

  - `"zh-TW"`

  - `"nl-NL"`

  - `"pl-PL"`

  - `"id-ID"`

  - `"tr-TR"`

  - `"ar-EG"`

  - `"ru-RU"`

  - `"fa-IR"`

  - `"bg-BG"`

  - `"hr-HR"`

  - `"cs-CZ"`

  - `"da-DK"`

  - `"fi-FI"`

  - `"lt-LT"`

  - `"ms-MY"`

  - `"nb-NO"`

  - `"ro-RO"`

  - `"el-GR"`

  - `"he-IL"`

  - `"hi-IN"`

  - `"hu-HU"`

  - `"sr-BA"`

  - `"sk-SK"`

  - `"sl-SI"`

  - `"sv-SE"`

  - `"tl-PH"`

  - `"th-TH"`

  - `"uk-UA"`

  - `"vi-VN"`

- `description: optional string`

  A note that you can use to add more details about the waiting room.

- `disable_session_renewal: optional boolean`

  Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

- `enabled_origin_commands: optional array of "revoke"`

  A list of enabled origin commands.

  - `"revoke"`

- `json_response_enabled: optional boolean`

  Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

  1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
  1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
  1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
  1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
  1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
  1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
  1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
  1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
  1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
  1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
  1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
  1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
  1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
  1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
  1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
  1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
  1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
  1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
  1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
  1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
  1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
  1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
  1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
  1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
  1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

  An example cURL to a waiting room could be:

  curl -X GET "https://example.com/waitingroom" \
  -H "Accept: application/json"

  If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

  {
  "cfWaitingRoom": {
  "inWaitingRoom": true,
  "waitTimeKnown": true,
  "waitTime": 10,
  "waitTime25Percentile": 0,
  "waitTime50Percentile": 0,
  "waitTime75Percentile": 0,
  "waitTimeFormatted": "10 minutes",
  "queueIsFull": false,
  "queueAll": false,
  "lastUpdated": "2020-08-03T23:46:00.000Z",
  "refreshIntervalSeconds": 20,
  "queueingMethod": "fifo",
  "isFIFOQueue": true,
  "isRandomQueue": false,
  "isPassthroughQueue": false,
  "isRejectQueue": false,
  "isEventActive": false,
  "isEventPrequeueing": false,
  "timeUntilEventStart": 0,
  "timeUntilEventStartFormatted": "unavailable",
  "timeUntilEventEnd": 0,
  "timeUntilEventEndFormatted": "unavailable",
  "shuffleAtEventStart": false
  }
  }

  If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

  {
  "cfWaitingRoom": {
  "inWaitingRoom": true,
  "waitTimeKnown": true,
  "waitTime": 10,
  "waitTime25Percentile": 5,
  "waitTime50Percentile": 10,
  "waitTime75Percentile": 15,
  "waitTimeFormatted": "5 minutes to 15 minutes",
  "queueIsFull": false,
  "queueAll": false,
  "lastUpdated": "2020-08-03T23:46:00.000Z",
  "refreshIntervalSeconds": 20,
  "queueingMethod": "random",
  "isFIFOQueue": false,
  "isRandomQueue": true,
  "isPassthroughQueue": false,
  "isRejectQueue": false,
  "isEventActive": true,
  "isEventPrequeueing": false,
  "timeUntilEventStart": 0,
  "timeUntilEventStartFormatted": "unavailable",
  "timeUntilEventEnd": 15,
  "timeUntilEventEndFormatted": "15 minutes",
  "shuffleAtEventStart": true
  }
  }

- `path: optional string`

  Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

- `queue_all: optional boolean`

  If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

- `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

  Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

  1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
  1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
  1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
  1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

  - `"fifo"`

  - `"random"`

  - `"passthrough"`

  - `"reject"`

- `queueing_status_code: optional 200 or 202 or 429`

  HTTP status code returned to a user while in the queue.

  - `200`

  - `202`

  - `429`

- `session_duration: optional number`

  Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

- `suspended: optional boolean`

  Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

- `turnstile_action: optional "log" or "infinite_queue"`

  Which action to take when a bot is detected using Turnstile. `log` will
  have no impact on queueing behavior, simply keeping track of how many
  bots are detected in Waiting Room Analytics. `infinite_queue` will send
  bots to a false queueing state, where they will never reach your
  origin. `infinite_queue` requires Advanced Waiting Room.

  - `"log"`

  - `"infinite_queue"`

- `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

  Which Turnstile widget type to use for detecting bot traffic. See
  [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
  for the definitions of these widget types. Set to `off` to disable the
  Turnstile integration entirely. Setting this to anything other than
  `off` or `invisible` requires Advanced Waiting Room.

  - `"off"`

  - `"invisible"`

  - `"visible_non_interactive"`

  - `"visible_managed"`

### Returns

- `result: WaitingRoom`

  - `id: optional string`

  - `additional_routes: optional array of AdditionalRoutes`

    Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

    - `host: optional string`

      The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

    - `path: optional string`

      Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `cookie_attributes: optional CookieAttributes`

    Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

    - `samesite: optional "auto" or "lax" or "none" or "strict"`

      Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

      - `"auto"`

      - `"lax"`

      - `"none"`

      - `"strict"`

    - `secure: optional "auto" or "always" or "never"`

      Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

      - `"auto"`

      - `"always"`

      - `"never"`

  - `cookie_suffix: optional string`

    Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

  - `created_on: optional string`

  - `custom_page_html: optional string`

    Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

    1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
    1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
    1. {{`waitTime`}} Number of minutes of estimated wait for a user.
    1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
    1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
    1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

    To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

  - `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

    The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

    - `"en-US"`

    - `"es-ES"`

    - `"de-DE"`

    - `"fr-FR"`

    - `"it-IT"`

    - `"ja-JP"`

    - `"ko-KR"`

    - `"pt-BR"`

    - `"zh-CN"`

    - `"zh-TW"`

    - `"nl-NL"`

    - `"pl-PL"`

    - `"id-ID"`

    - `"tr-TR"`

    - `"ar-EG"`

    - `"ru-RU"`

    - `"fa-IR"`

    - `"bg-BG"`

    - `"hr-HR"`

    - `"cs-CZ"`

    - `"da-DK"`

    - `"fi-FI"`

    - `"lt-LT"`

    - `"ms-MY"`

    - `"nb-NO"`

    - `"ro-RO"`

    - `"el-GR"`

    - `"he-IL"`

    - `"hi-IN"`

    - `"hu-HU"`

    - `"sr-BA"`

    - `"sk-SK"`

    - `"sl-SI"`

    - `"sv-SE"`

    - `"tl-PH"`

    - `"th-TH"`

    - `"uk-UA"`

    - `"vi-VN"`

  - `description: optional string`

    A note that you can use to add more details about the waiting room.

  - `disable_session_renewal: optional boolean`

    Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

  - `enabled_origin_commands: optional array of "revoke"`

    A list of enabled origin commands.

    - `"revoke"`

  - `host: optional string`

    The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

  - `json_response_enabled: optional boolean`

    Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

    1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
    1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
    1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
    1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
    1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
    1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
    1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
    1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
    1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
    1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
    1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
    1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
    1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
    1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
    1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
    1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
    1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
    1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
    1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
    1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
    1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
    1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
    1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
    1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
    1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

    An example cURL to a waiting room could be:

    curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 0,
    "waitTime50Percentile": 0,
    "waitTime75Percentile": 0,
    "waitTimeFormatted": "10 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "fifo",
    "isFIFOQueue": true,
    "isRandomQueue": false,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": false,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 0,
    "timeUntilEventEndFormatted": "unavailable",
    "shuffleAtEventStart": false
    }
    }

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 5,
    "waitTime50Percentile": 10,
    "waitTime75Percentile": 15,
    "waitTimeFormatted": "5 minutes to 15 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "random",
    "isFIFOQueue": false,
    "isRandomQueue": true,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": true,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 15,
    "timeUntilEventEndFormatted": "15 minutes",
    "shuffleAtEventStart": true
    }
    }

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

  - `next_event_prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will begin queueing.

  - `next_event_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will start.

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `queue_all: optional boolean`

    If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

  - `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

    Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

    1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
    1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
    1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
    1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

    - `"fifo"`

    - `"random"`

    - `"passthrough"`

    - `"reject"`

  - `queueing_status_code: optional 200 or 202 or 429`

    HTTP status code returned to a user while in the queue.

    - `200`

    - `202`

    - `429`

  - `session_duration: optional number`

    Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

  - `suspended: optional boolean`

    Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

  - `total_active_users: optional number`

    Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

  - `turnstile_action: optional "log" or "infinite_queue"`

    Which action to take when a bot is detected using Turnstile. `log` will
    have no impact on queueing behavior, simply keeping track of how many
    bots are detected in Waiting Room Analytics. `infinite_queue` will send
    bots to a false queueing state, where they will never reach your
    origin. `infinite_queue` requires Advanced Waiting Room.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    Which Turnstile widget type to use for detecting bot traffic. See
    [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
    for the definitions of these widget types. Set to `off` to disable the
    Turnstile integration entirely. Setting this to anything other than
    `off` or `invisible` requires Advanced Waiting Room.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": "shop.example.com",
          "name": "production_webinar",
          "new_users_per_minute": 200,
          "total_active_users": 200,
          "cookie_suffix": "abcd",
          "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
          "default_template_language": "es-ES",
          "description": "Production - DO NOT MODIFY",
          "path": "/shop/checkout",
          "queue_all": true,
          "queueing_method": "fifo",
          "queueing_status_code": 202
        }'
```

#### Response

```json
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252",
    "additional_routes": [
      {
        "host": "shop2.example.com",
        "path": "/shop2/checkout"
      }
    ],
    "cookie_attributes": {
      "samesite": "auto",
      "secure": "auto"
    },
    "cookie_suffix": "abcd",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "custom_page_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}",
    "default_template_language": "es-ES",
    "description": "Production - DO NOT MODIFY",
    "disable_session_renewal": false,
    "enabled_origin_commands": [
      "revoke"
    ],
    "host": "shop.example.com",
    "json_response_enabled": false,
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "name": "production_webinar",
    "new_users_per_minute": 200,
    "next_event_prequeue_start_time": "2021-09-28T15:00:00.000Z",
    "next_event_start_time": "2021-09-28T15:00:00.000Z",
    "path": "/shop/checkout",
    "queue_all": true,
    "queueing_method": "fifo",
    "queueing_status_code": 202,
    "session_duration": 1,
    "suspended": true,
    "total_active_users": 200,
    "turnstile_action": "log",
    "turnstile_mode": "off"
  }
}
```

## Delete waiting room

**delete** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}`

Deletes a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Returns

- `result: object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252"
  }
}
```

## Domain Types

### Additional Routes

- `AdditionalRoutes object { host, path }`

  - `host: optional string`

    The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

### Cookie Attributes

- `CookieAttributes object { samesite, secure }`

  Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

  - `samesite: optional "auto" or "lax" or "none" or "strict"`

    Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

    - `"auto"`

    - `"lax"`

    - `"none"`

    - `"strict"`

  - `secure: optional "auto" or "always" or "never"`

    Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

    - `"auto"`

    - `"always"`

    - `"never"`

### Query

- `Query object { host, name, new_users_per_minute, 18 more }`

  - `host: string`

    The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

  - `name: string`

    A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: number`

    Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

  - `total_active_users: number`

    Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

  - `additional_routes: optional array of AdditionalRoutes`

    Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

    - `host: optional string`

      The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

    - `path: optional string`

      Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `cookie_attributes: optional CookieAttributes`

    Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

    - `samesite: optional "auto" or "lax" or "none" or "strict"`

      Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

      - `"auto"`

      - `"lax"`

      - `"none"`

      - `"strict"`

    - `secure: optional "auto" or "always" or "never"`

      Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

      - `"auto"`

      - `"always"`

      - `"never"`

  - `cookie_suffix: optional string`

    Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

  - `custom_page_html: optional string`

    Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

    1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
    1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
    1. {{`waitTime`}} Number of minutes of estimated wait for a user.
    1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
    1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
    1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

    To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

  - `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

    The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

    - `"en-US"`

    - `"es-ES"`

    - `"de-DE"`

    - `"fr-FR"`

    - `"it-IT"`

    - `"ja-JP"`

    - `"ko-KR"`

    - `"pt-BR"`

    - `"zh-CN"`

    - `"zh-TW"`

    - `"nl-NL"`

    - `"pl-PL"`

    - `"id-ID"`

    - `"tr-TR"`

    - `"ar-EG"`

    - `"ru-RU"`

    - `"fa-IR"`

    - `"bg-BG"`

    - `"hr-HR"`

    - `"cs-CZ"`

    - `"da-DK"`

    - `"fi-FI"`

    - `"lt-LT"`

    - `"ms-MY"`

    - `"nb-NO"`

    - `"ro-RO"`

    - `"el-GR"`

    - `"he-IL"`

    - `"hi-IN"`

    - `"hu-HU"`

    - `"sr-BA"`

    - `"sk-SK"`

    - `"sl-SI"`

    - `"sv-SE"`

    - `"tl-PH"`

    - `"th-TH"`

    - `"uk-UA"`

    - `"vi-VN"`

  - `description: optional string`

    A note that you can use to add more details about the waiting room.

  - `disable_session_renewal: optional boolean`

    Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

  - `enabled_origin_commands: optional array of "revoke"`

    A list of enabled origin commands.

    - `"revoke"`

  - `json_response_enabled: optional boolean`

    Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

    1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
    1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
    1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
    1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
    1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
    1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
    1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
    1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
    1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
    1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
    1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
    1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
    1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
    1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
    1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
    1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
    1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
    1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
    1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
    1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
    1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
    1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
    1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
    1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
    1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

    An example cURL to a waiting room could be:

    curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 0,
    "waitTime50Percentile": 0,
    "waitTime75Percentile": 0,
    "waitTimeFormatted": "10 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "fifo",
    "isFIFOQueue": true,
    "isRandomQueue": false,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": false,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 0,
    "timeUntilEventEndFormatted": "unavailable",
    "shuffleAtEventStart": false
    }
    }

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 5,
    "waitTime50Percentile": 10,
    "waitTime75Percentile": 15,
    "waitTimeFormatted": "5 minutes to 15 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "random",
    "isFIFOQueue": false,
    "isRandomQueue": true,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": true,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 15,
    "timeUntilEventEndFormatted": "15 minutes",
    "shuffleAtEventStart": true
    }
    }

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `queue_all: optional boolean`

    If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

  - `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

    Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

    1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
    1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
    1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
    1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

    - `"fifo"`

    - `"random"`

    - `"passthrough"`

    - `"reject"`

  - `queueing_status_code: optional 200 or 202 or 429`

    HTTP status code returned to a user while in the queue.

    - `200`

    - `202`

    - `429`

  - `session_duration: optional number`

    Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

  - `suspended: optional boolean`

    Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

  - `turnstile_action: optional "log" or "infinite_queue"`

    Which action to take when a bot is detected using Turnstile. `log` will
    have no impact on queueing behavior, simply keeping track of how many
    bots are detected in Waiting Room Analytics. `infinite_queue` will send
    bots to a false queueing state, where they will never reach your
    origin. `infinite_queue` requires Advanced Waiting Room.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    Which Turnstile widget type to use for detecting bot traffic. See
    [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
    for the definitions of these widget types. Set to `off` to disable the
    Turnstile integration entirely. Setting this to anything other than
    `off` or `invisible` requires Advanced Waiting Room.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Waiting Room

- `WaitingRoom object { id, additional_routes, cookie_attributes, 23 more }`

  - `id: optional string`

  - `additional_routes: optional array of AdditionalRoutes`

    Only available for the Waiting Room Advanced subscription. Additional hostname and path combinations to which this waiting room will be applied. There is an implied wildcard at the end of the path. The hostname and path combination must be unique to this and all other waiting rooms.

    - `host: optional string`

      The hostname to which this waiting room will be applied (no wildcards). The hostname must be the primary domain, subdomain, or custom hostname (if using SSL for SaaS) of this zone. Please do not include the scheme (http:// or https://).

    - `path: optional string`

      Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `cookie_attributes: optional CookieAttributes`

    Configures cookie attributes for the waiting room cookie. This encrypted cookie stores a user's status in the waiting room, such as queue position.

    - `samesite: optional "auto" or "lax" or "none" or "strict"`

      Configures the SameSite attribute on the waiting room cookie. Value `auto` will be translated to `lax` or `none` depending if **Always Use HTTPS** is enabled. Note that when using value `none`, the secure attribute cannot be set to `never`.

      - `"auto"`

      - `"lax"`

      - `"none"`

      - `"strict"`

    - `secure: optional "auto" or "always" or "never"`

      Configures the Secure attribute on the waiting room cookie. Value `always` indicates that the Secure attribute will be set in the Set-Cookie header, `never` indicates that the Secure attribute will not be set, and `auto` will set the Secure attribute depending if **Always Use HTTPS** is enabled.

      - `"auto"`

      - `"always"`

      - `"never"`

  - `cookie_suffix: optional string`

    Appends a '_' + a custom suffix to the end of Cloudflare Waiting Room's cookie name(__cf_waitingroom). If `cookie_suffix` is "abcd", the cookie name will be `__cf_waitingroom_abcd`. This field is required if using `additional_routes`.

  - `created_on: optional string`

  - `custom_page_html: optional string`

    Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

    1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
    1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
    1. {{`waitTime`}} Number of minutes of estimated wait for a user.
    1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
    1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
    1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

    To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

  - `default_template_language: optional "en-US" or "es-ES" or "de-DE" or 35 more`

    The language of the default page template. If no default_template_language is provided, then `en-US` (English) will be used.

    - `"en-US"`

    - `"es-ES"`

    - `"de-DE"`

    - `"fr-FR"`

    - `"it-IT"`

    - `"ja-JP"`

    - `"ko-KR"`

    - `"pt-BR"`

    - `"zh-CN"`

    - `"zh-TW"`

    - `"nl-NL"`

    - `"pl-PL"`

    - `"id-ID"`

    - `"tr-TR"`

    - `"ar-EG"`

    - `"ru-RU"`

    - `"fa-IR"`

    - `"bg-BG"`

    - `"hr-HR"`

    - `"cs-CZ"`

    - `"da-DK"`

    - `"fi-FI"`

    - `"lt-LT"`

    - `"ms-MY"`

    - `"nb-NO"`

    - `"ro-RO"`

    - `"el-GR"`

    - `"he-IL"`

    - `"hi-IN"`

    - `"hu-HU"`

    - `"sr-BA"`

    - `"sk-SK"`

    - `"sl-SI"`

    - `"sv-SE"`

    - `"tl-PH"`

    - `"th-TH"`

    - `"uk-UA"`

    - `"vi-VN"`

  - `description: optional string`

    A note that you can use to add more details about the waiting room.

  - `disable_session_renewal: optional boolean`

    Only available for the Waiting Room Advanced subscription. Disables automatic renewal of session cookies. If `true`, an accepted user will have session_duration minutes to browse the site. After that, they will have to go through the waiting room again. If `false`, a user's session cookie will be automatically renewed on every request.

  - `enabled_origin_commands: optional array of "revoke"`

    A list of enabled origin commands.

    - `"revoke"`

  - `host: optional string`

    The host name to which the waiting room will be applied (no wildcards). Please do not include the scheme (http:// or https://). The host and path combination must be unique.

  - `json_response_enabled: optional boolean`

    Only available for the Waiting Room Advanced subscription. If `true`, requests to the waiting room with the header `Accept: application/json` will receive a JSON response object with information on the user's status in the waiting room as opposed to the configured static HTML page. This JSON response object has one property `cfWaitingRoom` which is an object containing the following fields:

    1. `inWaitingRoom`: Boolean indicating if the user is in the waiting room (always **true**).
    1. `waitTimeKnown`: Boolean indicating if the current estimated wait times are accurate. If **false**, they are not available.
    1. `waitTime`: Valid only when `waitTimeKnown` is **true**. Integer indicating the current estimated time in minutes the user will wait in the waiting room. When `queueingMethod` is **random**, this is set to `waitTime50Percentile`.
    1. `waitTime25Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 25% of users that gain entry the fastest (25th percentile).
    1. `waitTime50Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 50% of users that gain entry the fastest (50th percentile). In other words, half of the queued users are expected to let into the origin website before `waitTime50Percentile` and half are expected to be let in after it.
    1. `waitTime75Percentile`: Valid only when `queueingMethod` is **random** and `waitTimeKnown` is **true**. Integer indicating the current estimated maximum wait time for the 75% of users that gain entry the fastest (75th percentile).
    1. `waitTimeFormatted`: String displaying the `waitTime` formatted in English for users. If `waitTimeKnown` is **false**, `waitTimeFormatted` will display **unavailable**.
    1. `queueIsFull`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
    1. `queueAll`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website.
    1. `lastUpdated`: String displaying the timestamp as an ISO 8601 string of the user's last attempt to leave the waiting room and be let into the origin website. The user is able to make another attempt after `refreshIntervalSeconds` past this time. If the user makes a request too soon, it will be ignored and `lastUpdated` will not change.
    1. `refreshIntervalSeconds`: Integer indicating the number of seconds after `lastUpdated` until the user is able to make another attempt to leave the waiting room and be let into the origin website. When the `queueingMethod` is `reject`, there is no specified refresh time —_it will always be **zero**.
    1. `queueingMethod`: The queueing method currently used by the waiting room. It is either **fifo**, **random**, **passthrough**, or **reject**.
    1. `isFIFOQueue`: Boolean indicating if the waiting room uses a FIFO (First-In-First-Out) queue.
    1. `isRandomQueue`: Boolean indicating if the waiting room uses a Random queue where users gain access randomly.
    1. `isPassthroughQueue`: Boolean indicating if the waiting room uses a passthrough queue. Keep in mind that when passthrough is enabled, this JSON response will only exist when `queueAll` is **true** or `isEventPrequeueing` is **true** because in all other cases requests will go directly to the origin.
    1. `isRejectQueue`: Boolean indicating if the waiting room uses a reject queue.
    1. `isEventActive`: Boolean indicating if an event is currently occurring. Events are able to change a waiting room's behavior during a specified period of time. For additional information, look at the event properties `prequeue_start_time`, `event_start_time`, and `event_end_time` in the documentation for creating waiting room events. Events are considered active between these start and end times, as well as during the prequeueing period if it exists.
    1. `isEventPrequeueing`: Valid only when `isEventActive` is **true**. Boolean indicating if an event is currently prequeueing users before it starts.
    1. `timeUntilEventStart`: Valid only when `isEventPrequeueing` is **true**. Integer indicating the number of minutes until the event starts.
    1. `timeUntilEventStartFormatted`: String displaying the `timeUntilEventStart` formatted in English for users. If `isEventPrequeueing` is **false**, `timeUntilEventStartFormatted` will display **unavailable**.
    1. `timeUntilEventEnd`: Valid only when `isEventActive` is **true**. Integer indicating the number of minutes until the event ends.
    1. `timeUntilEventEndFormatted`: String displaying the `timeUntilEventEnd` formatted in English for users. If `isEventActive` is **false**, `timeUntilEventEndFormatted` will display **unavailable**.
    1. `shuffleAtEventStart`: Valid only when `isEventActive` is **true**. Boolean indicating if the users in the prequeue are shuffled randomly when the event starts.
    1. `turnstile`: Empty when turnstile isn't enabled. String displaying an html tag to display the Turnstile widget. Please add the `{{{turnstile}}}` tag to the `custom_html` template to ensure the Turnstile widget appears.
    1. `infiniteQueue`: Boolean indicating whether the response is for a user in the infinite queue.

    An example cURL to a waiting room could be:

    curl -X GET "https://example.com/waitingroom" \
    -H "Accept: application/json"

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **fifo** and no event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 0,
    "waitTime50Percentile": 0,
    "waitTime75Percentile": 0,
    "waitTimeFormatted": "10 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "fifo",
    "isFIFOQueue": true,
    "isRandomQueue": false,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": false,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 0,
    "timeUntilEventEndFormatted": "unavailable",
    "shuffleAtEventStart": false
    }
    }

    If `json_response_enabled` is **true** and the request hits the waiting room, an example JSON response when `queueingMethod` is **random** and an event is active could be:

    {
    "cfWaitingRoom": {
    "inWaitingRoom": true,
    "waitTimeKnown": true,
    "waitTime": 10,
    "waitTime25Percentile": 5,
    "waitTime50Percentile": 10,
    "waitTime75Percentile": 15,
    "waitTimeFormatted": "5 minutes to 15 minutes",
    "queueIsFull": false,
    "queueAll": false,
    "lastUpdated": "2020-08-03T23:46:00.000Z",
    "refreshIntervalSeconds": 20,
    "queueingMethod": "random",
    "isFIFOQueue": false,
    "isRandomQueue": true,
    "isPassthroughQueue": false,
    "isRejectQueue": false,
    "isEventActive": true,
    "isEventPrequeueing": false,
    "timeUntilEventStart": 0,
    "timeUntilEventStartFormatted": "unavailable",
    "timeUntilEventEnd": 15,
    "timeUntilEventEndFormatted": "15 minutes",
    "shuffleAtEventStart": true
    }
    }

  - `modified_on: optional string`

  - `name: optional string`

    A unique name to identify the waiting room. Only alphanumeric characters, hyphens and underscores are allowed.

  - `new_users_per_minute: optional number`

    Sets the number of new users that will be let into the route every minute. This value is used as baseline for the number of users that are let in per minute. So it is possible that there is a little more or little less traffic coming to the route based on the traffic patterns at that time around the world.

  - `next_event_prequeue_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will begin queueing.

  - `next_event_start_time: optional string`

    An ISO 8601 timestamp that marks when the next event will start.

  - `path: optional string`

    Sets the path within the host to enable the waiting room on. The waiting room will be enabled for all subpaths as well. If there are two waiting rooms on the same subpath, the waiting room for the most specific path will be chosen. Wildcards and query parameters are not supported.

  - `queue_all: optional boolean`

    If queue_all is `true`, all the traffic that is coming to a route will be sent to the waiting room. No new traffic can get to the route once this field is set and estimated time will become unavailable.

  - `queueing_method: optional "fifo" or "random" or "passthrough" or "reject"`

    Sets the queueing method used by the waiting room. Changing this parameter from the **default** queueing method is only available for the Waiting Room Advanced subscription. Regardless of the queueing method, if `queue_all` is enabled or an event is prequeueing, users in the waiting room will not be accepted to the origin. These users will always see a waiting room page that refreshes automatically. The valid queueing methods are:

    1. `fifo` **(default)**: First-In-First-Out queue where customers gain access in the order they arrived.
    1. `random`: Random queue where customers gain access randomly, regardless of arrival time.
    1. `passthrough`: Users will pass directly through the waiting room and into the origin website. As a result, any configured limits will not be respected while this is enabled. This method can be used as an alternative to disabling a waiting room (with `suspended`) so that analytics are still reported. This can be used if you wish to allow all traffic normally, but want to restrict traffic during a waiting room event, or vice versa.
    1. `reject`: Users will be immediately rejected from the waiting room. As a result, no users will reach the origin website while this is enabled. This can be used if you wish to reject all traffic while performing maintenance, block traffic during a specified period of time (an event), or block traffic while events are not occurring. Consider a waiting room used for vaccine distribution that only allows traffic during sign-up events, and otherwise blocks all traffic. For this case, the waiting room uses `reject`, and its events override this with `fifo`, `random`, or `passthrough`. When this queueing method is enabled and neither `queueAll` is enabled nor an event is prequeueing, the waiting room page **will not refresh automatically**.

    - `"fifo"`

    - `"random"`

    - `"passthrough"`

    - `"reject"`

  - `queueing_status_code: optional 200 or 202 or 429`

    HTTP status code returned to a user while in the queue.

    - `200`

    - `202`

    - `429`

  - `session_duration: optional number`

    Lifetime of a cookie (in minutes) set by Cloudflare for users who get access to the route. If a user is not seen by Cloudflare again in that time period, they will be treated as a new user that visits the route.

  - `suspended: optional boolean`

    Suspends or allows traffic going to the waiting room. If set to `true`, the traffic will not go to the waiting room.

  - `total_active_users: optional number`

    Sets the total number of active user sessions on the route at a point in time. A route is a combination of host and path on which a waiting room is available. This value is used as a baseline for the total number of active user sessions on the route. It is possible to have a situation where there are more or less active users sessions on the route based on the traffic patterns at that time around the world.

  - `turnstile_action: optional "log" or "infinite_queue"`

    Which action to take when a bot is detected using Turnstile. `log` will
    have no impact on queueing behavior, simply keeping track of how many
    bots are detected in Waiting Room Analytics. `infinite_queue` will send
    bots to a false queueing state, where they will never reach your
    origin. `infinite_queue` requires Advanced Waiting Room.

    - `"log"`

    - `"infinite_queue"`

  - `turnstile_mode: optional "off" or "invisible" or "visible_non_interactive" or "visible_managed"`

    Which Turnstile widget type to use for detecting bot traffic. See
    [the Turnstile documentation](https://developers.cloudflare.com/turnstile/concepts/widget/#widget-types)
    for the definitions of these widget types. Set to `off` to disable the
    Turnstile integration entirely. Setting this to anything other than
    `off` or `invisible` requires Advanced Waiting Room.

    - `"off"`

    - `"invisible"`

    - `"visible_non_interactive"`

    - `"visible_managed"`

### Waiting Room Delete Response

- `WaitingRoomDeleteResponse object { id }`

  - `id: optional string`

# Page

## Create a custom waiting room page preview

**post** `/zones/{zone_id}/waiting_rooms/preview`

Creates a waiting room page preview. Upload a custom waiting room page for preview. You will receive a preview URL in the form `http://waitingrooms.dev/preview/<uuid>`. You can use the following query parameters to change the state of the preview:

1. `force_queue`: Boolean indicating if all users will be queued in the waiting room and no one will be let into the origin website (also known as queueAll).
1. `queue_is_full`: Boolean indicating if the waiting room's queue is currently full and not accepting new users at the moment.
1. `queueing_method`: The queueing method currently used by the waiting room.
   - **fifo** indicates a FIFO queue.
   - **random** indicates a Random queue.
   - **passthrough** indicates a Passthrough queue. Keep in mind that the waiting room page will only be displayed if `force_queue=true` or `event=prequeueing` — for other cases the request will pass through to the origin. For our preview, this will be a fake origin website returning "Welcome".
   - **reject** indicates a Reject queue.
1. `event`: Used to preview a waiting room event.
   - **none** indicates no event is occurring.
   - **prequeueing** indicates that an event is prequeueing (between `prequeue_start_time` and `event_start_time`).
   - **started** indicates that an event has started (between `event_start_time` and `event_end_time`).
1. `shuffle_at_event_start`: Boolean indicating if the event will shuffle users in the prequeue when it starts. This can only be set to **true** if an event is active (`event` is not **none**).

For example, you can make a request to `http://waitingrooms.dev/preview/<uuid>?force_queue=false&queue_is_full=false&queueing_method=random&event=started&shuffle_at_event_start=true`
6. `waitTime`: Non-zero, positive integer indicating the estimated wait time in minutes. The default value is 10 minutes.

For example, you can make a request to `http://waitingrooms.dev/preview/<uuid>?waitTime=50` to configure the estimated wait time as 50 minutes.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `custom_html: string`

  Only available for the Waiting Room Advanced subscription. This is a template html file that will be rendered at the edge. If no custom_page_html is provided, the default waiting room will be used. The template is based on mustache ( https://mustache.github.io/ ). There are several variables that are evaluated by the Cloudflare edge:

  1. {{`waitTimeKnown`}} Acts like a boolean value that indicates the behavior to take when wait time is not available, for instance when queue_all is **true**.
  1. {{`waitTimeFormatted`}} Estimated wait time for the user. For example, five minutes. Alternatively, you can use:
  1. {{`waitTime`}} Number of minutes of estimated wait for a user.
  1. {{`waitTimeHours`}} Number of hours of estimated wait for a user (`Math.floor(waitTime/60)`).
  1. {{`waitTimeHourMinutes`}} Number of minutes above the `waitTimeHours` value (`waitTime%60`).
  1. {{`queueIsFull`}} Changes to **true** when no more people can be added to the queue.

  To view the full list of variables, look at the `cfWaitingRoom` object described under the `json_response_enabled` property in other Waiting Room API calls.

### Returns

- `result: object { preview_url }`

  - `preview_url: optional string`

    URL where the custom waiting room page can temporarily be previewed.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "custom_html": "{{#waitTimeKnown}} {{waitTime}} mins {{/waitTimeKnown}} {{^waitTimeKnown}} Queue all enabled {{/waitTimeKnown}}"
        }'
```

#### Response

```json
{
  "result": {
    "preview_url": "http://waitingrooms.dev/preview/35af8c12-6d68-4608-babb-b53435a5ddfb"
  }
}
```

## Domain Types

### Page Preview Response

- `PagePreviewResponse object { preview_url }`

  - `preview_url: optional string`

    URL where the custom waiting room page can temporarily be previewed.

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

# Rules

## List Waiting Room Rules

**get** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules`

Lists rules for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

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

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules \
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
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
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

## Create Waiting Room Rule

**post** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules`

Only available for the Waiting Room Advanced subscription. Creates a rule for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Body Parameters

- `rules: object { action, expression, description, enabled }`

  - `action: "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `expression: string`

    Criteria defining when there is a match for the current rule.

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

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

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "bypass_waiting_room",
          "expression": "ip.src in {10.20.30.40}",
          "description": "allow all traffic from 10.20.30.40",
          "enabled": true
        }'
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
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
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

## Replace Waiting Room Rules

**put** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules`

Only available for the Waiting Room Advanced subscription. Replaces all rules for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Body Parameters

- `rules: array of object { action, expression, description, enabled }`

  - `action: "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `expression: string`

    Criteria defining when there is a match for the current rule.

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

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

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "action": "bypass_waiting_room",
            "expression": "ip.src in {10.20.30.40}",
            "description": "allow all traffic from 10.20.30.40",
            "enabled": true
          }
        ]'
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
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
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

## Patch Waiting Room Rule

**patch** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}`

Patches a rule for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `rule_id: string`

  The ID of the rule.

### Body Parameters

- `action: "bypass_waiting_room"`

  The action to take when the expression matches.

  - `"bypass_waiting_room"`

- `expression: string`

  Criteria defining when there is a match for the current rule.

- `description: optional string`

  The description of the rule.

- `enabled: optional boolean`

  When set to true, the rule is enabled.

- `position: optional object { index }  or object { before }  or object { after }`

  Reorder the position of a rule

  - `Index object { index }`

    - `index: optional number`

      Places the rule in the exact position specified by the integer number <POSITION_NUMBER>. Position numbers start with 1. Existing rules in the ruleset from the specified position number onward are shifted one position (no rule is overwritten).

  - `Before object { before }`

    - `before: optional string`

      Places the rule before rule <RULE_ID>. Use this argument with an empty rule ID value ("") to set the rule as the first rule in the ruleset.

  - `After object { after }`

    - `after: optional string`

      Places the rule after rule <RULE_ID>. Use this argument with an empty rule ID value ("") to set the rule as the last rule in the ruleset.

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

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "bypass_waiting_room",
          "expression": "ip.src in {10.20.30.40}",
          "description": "allow all traffic from 10.20.30.40",
          "enabled": true
        }'
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
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
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

## Delete Waiting Room Rule

**delete** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/rules/{rule_id}`

Deletes a rule for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `rule_id: string`

  The ID of the rule.

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

- `result: optional array of WaitingRoomRule`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/rules/$RULE_ID \
    -X DELETE \
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
      "action": "bypass_waiting_room",
      "description": "allow all traffic from 10.20.30.40",
      "enabled": true,
      "expression": "ip.src in {10.20.30.40}",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "version": "1"
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

## Domain Types

### Waiting Room Rule

- `WaitingRoomRule object { id, action, description, 4 more }`

  - `id: optional string`

    The ID of the rule.

  - `action: optional "bypass_waiting_room"`

    The action to take when the expression matches.

    - `"bypass_waiting_room"`

  - `description: optional string`

    The description of the rule.

  - `enabled: optional boolean`

    When set to true, the rule is enabled.

  - `expression: optional string`

    Criteria defining when there is a match for the current rule.

  - `last_updated: optional string`

  - `version: optional string`

    The version of the rule.

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

# Settings

## Get zone-level Waiting Room settings

**get** `/zones/{zone_id}/waiting_rooms/settings`

Gets the zone-level Waiting Room settings that apply as defaults to all waiting rooms on the zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `result: object { search_engine_crawler_bypass }`

  - `search_engine_crawler_bypass: boolean`

    Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
    Verified search engine crawlers will not be tracked or counted by the waiting room system,
    and will not appear in waiting room analytics.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/settings \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "search_engine_crawler_bypass": true
  }
}
```

## Update zone-level Waiting Room settings

**put** `/zones/{zone_id}/waiting_rooms/settings`

Fully updates zone-level Waiting Room settings, replacing the existing configuration.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `search_engine_crawler_bypass: optional boolean`

  Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
  Verified search engine crawlers will not be tracked or counted by the waiting room system,
  and will not appear in waiting room analytics.

### Returns

- `result: object { search_engine_crawler_bypass }`

  - `search_engine_crawler_bypass: boolean`

    Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
    Verified search engine crawlers will not be tracked or counted by the waiting room system,
    and will not appear in waiting room analytics.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "search_engine_crawler_bypass": true
        }'
```

#### Response

```json
{
  "result": {
    "search_engine_crawler_bypass": true
  }
}
```

## Patch zone-level Waiting Room settings

**patch** `/zones/{zone_id}/waiting_rooms/settings`

Partially updates zone-level Waiting Room settings using PATCH semantics.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `search_engine_crawler_bypass: optional boolean`

  Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
  Verified search engine crawlers will not be tracked or counted by the waiting room system,
  and will not appear in waiting room analytics.

### Returns

- `result: object { search_engine_crawler_bypass }`

  - `search_engine_crawler_bypass: boolean`

    Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
    Verified search engine crawlers will not be tracked or counted by the waiting room system,
    and will not appear in waiting room analytics.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/settings \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "search_engine_crawler_bypass": true
        }'
```

#### Response

```json
{
  "result": {
    "search_engine_crawler_bypass": true
  }
}
```

## Domain Types

### Setting

- `Setting object { search_engine_crawler_bypass }`

  - `search_engine_crawler_bypass: boolean`

    Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
    Verified search engine crawlers will not be tracked or counted by the waiting room system,
    and will not appear in waiting room analytics.

### Setting Get Response

- `SettingGetResponse object { search_engine_crawler_bypass }`

  - `search_engine_crawler_bypass: boolean`

    Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
    Verified search engine crawlers will not be tracked or counted by the waiting room system,
    and will not appear in waiting room analytics.

### Setting Update Response

- `SettingUpdateResponse object { search_engine_crawler_bypass }`

  - `search_engine_crawler_bypass: boolean`

    Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
    Verified search engine crawlers will not be tracked or counted by the waiting room system,
    and will not appear in waiting room analytics.

### Setting Edit Response

- `SettingEditResponse object { search_engine_crawler_bypass }`

  - `search_engine_crawler_bypass: boolean`

    Whether to allow verified search engine crawlers to bypass all waiting rooms on this zone.
    Verified search engine crawlers will not be tracked or counted by the waiting room system,
    and will not appear in waiting room analytics.
