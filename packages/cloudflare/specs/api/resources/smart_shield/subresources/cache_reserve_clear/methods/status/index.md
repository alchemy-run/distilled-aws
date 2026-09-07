## Get Cache Reserve Clear

**get** `/zones/{zone_id}/smart_shield/cache_reserve_clear`

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: "In-progress" or "Completed"`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield/cache_reserve_clear \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "end_ts": "2023-10-02T12:00:00.12345Z",
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "Completed"
  },
  "success": true
}
```
