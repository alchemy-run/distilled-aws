# Cache Reserve

## Get Cache Reserve setting

**get** `/zones/{zone_id}/cache/cache_reserve`

Increase cache lifetimes by automatically storing all cacheable files into Cloudflare's persistent object storage buckets. Requires Cache Reserve subscription. Note: using Tiered Cache with Cache Reserve is highly recommended to reduce Reserve operations costs. See the [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve) for more information.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, value, modified_on }`

  - `id: CacheReserve`

    The identifier of the caching setting.

    - `"cache_reserve"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Cache Reserve zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "cache_reserve",
    "value": "off"
  },
  "success": true
}
```

## Change Cache Reserve setting

**patch** `/zones/{zone_id}/cache/cache_reserve`

Increase cache lifetimes by automatically storing all cacheable files into Cloudflare's persistent object storage buckets. Requires Cache Reserve subscription. Note: using Tiered Cache with Cache Reserve is highly recommended to reduce Reserve operations costs. See the [developer docs](https://developers.cloudflare.com/cache/about/cache-reserve) for more information.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: "on" or "off"`

  Value of the Cache Reserve zone setting.

  - `"on"`

  - `"off"`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, value, modified_on }`

  - `id: CacheReserve`

    The identifier of the caching setting.

    - `"cache_reserve"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Cache Reserve zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "on"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "cache_reserve",
    "value": "on"
  },
  "success": true
}
```

## Get Cache Reserve Clear

**get** `/zones/{zone_id}/cache/cache_reserve_clear`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: State`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve_clear \
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

## Start Cache Reserve Clear

**post** `/zones/{zone_id}/cache/cache_reserve_clear`

You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: unknown`

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: State`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/cache_reserve_clear \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "id": "cache_reserve_clear",
    "start_ts": "2023-10-02T10:00:00.12345Z",
    "state": "In-progress"
  },
  "success": true
}
```

## Domain Types

### Cache Reserve

- `CacheReserve = "cache_reserve"`

  The identifier of the caching setting.

  - `"cache_reserve"`

### Cache Reserve Clear

- `CacheReserveClear = "cache_reserve_clear"`

  ID of the zone setting.

  - `"cache_reserve_clear"`

### State

- `State = "In-progress" or "Completed"`

  The current state of the Cache Reserve Clear operation.

  - `"In-progress"`

  - `"Completed"`

### Cache Reserve Get Response

- `CacheReserveGetResponse object { id, editable, value, modified_on }`

  - `id: CacheReserve`

    The identifier of the caching setting.

    - `"cache_reserve"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Cache Reserve zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Cache Reserve Edit Response

- `CacheReserveEditResponse object { id, editable, value, modified_on }`

  - `id: CacheReserve`

    The identifier of the caching setting.

    - `"cache_reserve"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Cache Reserve zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Cache Reserve Status Response

- `CacheReserveStatusResponse object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: State`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.

### Cache Reserve Clear Response

- `CacheReserveClearResponse object { id, start_ts, state, 2 more }`

  You can use Cache Reserve Clear to clear your Cache Reserve, but you must first disable Cache Reserve. In most cases, this will be accomplished within 24 hours. You cannot re-enable Cache Reserve while this process is ongoing. Keep in mind that you cannot undo or cancel this operation.

  - `id: CacheReserveClear`

    ID of the zone setting.

    - `"cache_reserve_clear"`

  - `start_ts: string`

    The time that the latest Cache Reserve Clear operation started.

  - `state: State`

    The current state of the Cache Reserve Clear operation.

    - `"In-progress"`

    - `"Completed"`

  - `end_ts: optional string`

    The time that the latest Cache Reserve Clear operation completed.

  - `modified_on: optional string`

    Last time this setting was modified.
