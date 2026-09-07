# Cache

## Purge Cached Content

**post** `/zones/{zone_id}/purge_cache`

### Purge All Cached Content

Removes ALL files from Cloudflare's cache. All tiers can purge everything.

```
{"purge_everything": true}
```

### Purge Cached Content by URL

Granularly removes one or more files from Cloudflare's cache by specifying URLs. All tiers can purge by URL.

To purge files with custom cache keys, include the headers used to compute the cache key as in the example. If you have a device type or geo in your cache key, you will need to include the CF-Device-Type or CF-IPCountry headers. If you have lang in your cache key, you will need to include the Accept-Language header.

**NB:** When including the Origin header, be sure to include the **scheme** and **hostname**. The port number can be omitted if it is the default port (80 for http, 443 for https), but must be included otherwise.

Single file purge example with files:

```
{"files": ["http://www.example.com/css/styles.css", "http://www.example.com/js/index.js"]}
```

Single file purge example with url and header pairs:

```
{"files": [{"url": "http://www.example.com/cat_picture.jpg", "headers": {"CF-IPCountry": "US", "CF-Device-Type": "desktop", "Accept-Language": "zh-CN"}}, {"url": "http://www.example.com/dog_picture.jpg", "headers": {"CF-IPCountry": "EU", "CF-Device-Type": "mobile", "Accept-Language": "en-US"}}]}
```

### Purge Cached Content by Tag, Host or Prefix

Granularly removes one or more files from Cloudflare's cache either by specifying the host, the associated Cache-Tag, or a Prefix.

Flex purge with tags:

```
{"tags": ["a-cache-tag", "another-cache-tag"]}
```

Flex purge with hosts:

```
{"hosts": ["www.example.com", "images.example.com"]}
```

Flex purge with prefixes:

```
{"prefixes": ["www.example.com/foo", "images.example.com/bar/baz"]}
```

### Availability and limits

Please refer to [purge cache availability and limits documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).

### Path Parameters

- `zone_id: string`

### Body Parameters

- `body: object { tags }  or object { hosts }  or object { prefixes }  or 3 more`

  - `CachePurgeFlexPurgeByTags object { tags }`

    - `tags: optional array of string`

      For more information on cache tags and purging by tags, please refer to [purge by cache-tags documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/).

  - `CachePurgeFlexPurgeByHostnames object { hosts }`

    - `hosts: optional array of string`

      For more information purging by hostnames, please refer to [purge by hostname documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/).

  - `CachePurgeFlexPurgeByPrefixes object { prefixes }`

    - `prefixes: optional array of string`

      For more information on purging by prefixes, please refer to [purge by prefix documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/).

  - `CachePurgeEverything object { purge_everything }`

    - `purge_everything: optional boolean`

      For more information, please refer to [purge everything documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/).

  - `CachePurgeSingleFile object { files }`

    - `files: optional array of string`

      For more information on purging files, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).

  - `CachePurgeSingleFileWithURLAndHeaders object { files }`

    - `files: optional array of object { headers, url }`

      For more information on purging files with URL and headers, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).

      - `headers: optional map[string]`

      - `url: optional string`

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

- `success: boolean`

  Indicates the API call's success or failure.

- `result: optional object { id }`

  - `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/purge_cache \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tags": [
            "a-cache-tag",
            "another-cache-tag"
          ]
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Purge Cached Content by Environment

**post** `/zones/{zone_id}/environments/{environment_id}/purge_cache`

Purge cached content scoped to a specific environment. Supports the same purge types as the zone-level endpoint (purge everything, by URL, by tag, host, or prefix).

### Availability and limits

Please refer to [purge cache availability and limits documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/#availability-and-limits).

### Path Parameters

- `zone_id: string`

- `environment_id: string`

### Body Parameters

- `body: object { tags }  or object { hosts }  or object { prefixes }  or 3 more`

  - `CachePurgeFlexPurgeByTags object { tags }`

    - `tags: optional array of string`

      For more information on cache tags and purging by tags, please refer to [purge by cache-tags documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-tags/).

  - `CachePurgeFlexPurgeByHostnames object { hosts }`

    - `hosts: optional array of string`

      For more information purging by hostnames, please refer to [purge by hostname documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-hostname/).

  - `CachePurgeFlexPurgeByPrefixes object { prefixes }`

    - `prefixes: optional array of string`

      For more information on purging by prefixes, please refer to [purge by prefix documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge_by_prefix/).

  - `CachePurgeEverything object { purge_everything }`

    - `purge_everything: optional boolean`

      For more information, please refer to [purge everything documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-everything/).

  - `CachePurgeSingleFile object { files }`

    - `files: optional array of string`

      For more information on purging files, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).

  - `CachePurgeSingleFileWithURLAndHeaders object { files }`

    - `files: optional array of object { headers, url }`

      For more information on purging files with URL and headers, please refer to [purge by single-file documentation page](https://developers.cloudflare.com/cache/how-to/purge-cache/purge-by-single-file/).

      - `headers: optional map[string]`

      - `url: optional string`

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

- `success: boolean`

  Indicates the API call's success or failure.

- `result: optional object { id }`

  - `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/environments/$ENVIRONMENT_ID/purge_cache \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tags": [
            "a-cache-tag",
            "another-cache-tag"
          ]
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Cache Purge Response

- `CachePurgeResponse object { id }`

  - `id: string`

### Cache Purge Environment Response

- `CachePurgeEnvironmentResponse object { id }`

  - `id: string`

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

# Smart Tiered Cache

## Get Smart Tiered Cache setting

**get** `/zones/{zone_id}/cache/tiered_cache_smart_topology_enable`

Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.

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

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Smart Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/tiered_cache_smart_topology_enable \
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
  "result": {
    "id": "tiered_cache_smart_topology_enable",
    "editable": true,
    "value": "on",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create Smart Tiered Cache setting

**post** `/zones/{zone_id}/cache/tiered_cache_smart_topology_enable`

Smart Tiered Cache dynamically selects the single closest upper tier for each of your website's origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: "on" or "off"`

  Enable or disable the Smart Tiered Cache.

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

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Smart Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/tiered_cache_smart_topology_enable \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "on"
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
  "result": {
    "id": "tiered_cache_smart_topology_enable",
    "editable": true,
    "value": "on",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Patch Smart Tiered Cache setting

**patch** `/zones/{zone_id}/cache/tiered_cache_smart_topology_enable`

Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: "on" or "off"`

  Enable or disable the Smart Tiered Cache.

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

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Smart Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/tiered_cache_smart_topology_enable \
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
  "result": {
    "id": "tiered_cache_smart_topology_enable",
    "editable": true,
    "value": "on",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete Smart Tiered Cache setting

**delete** `/zones/{zone_id}/cache/tiered_cache_smart_topology_enable`

Smart Tiered Cache dynamically selects the single closest upper tier for each of your website’s origins with no configuration required, using our in-house performance and routing data. Cloudflare collects latency data for each request to an origin, and uses the latency data to determine how well any upper-tier data center is connected with an origin. As a result, Cloudflare can select the data center with the lowest latency to be the upper-tier for an origin.

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

- `result: optional object { id, editable, modified_on }`

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/tiered_cache_smart_topology_enable \
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
  "result": {
    "id": "tiered_cache_smart_topology_enable",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Smart Tiered Cache Get Response

- `SmartTieredCacheGetResponse object { id, editable, value, modified_on }`

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Smart Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Smart Tiered Cache Create Response

- `SmartTieredCacheCreateResponse object { id, editable, value, modified_on }`

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Smart Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Smart Tiered Cache Edit Response

- `SmartTieredCacheEditResponse object { id, editable, value, modified_on }`

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Smart Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Smart Tiered Cache Delete Response

- `SmartTieredCacheDeleteResponse object { id, editable, modified_on }`

  - `id: "tiered_cache_smart_topology_enable"`

    The identifier of the caching setting.

    - `"tiered_cache_smart_topology_enable"`

  - `editable: boolean`

    Whether the setting is editable.

  - `modified_on: optional string`

    Last time this setting was modified.

# Variants

## Get variants setting

**get** `/zones/{zone_id}/cache/variants`

Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

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

  - `id: "variants"`

    The identifier of the caching setting.

    - `"variants"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: object { avif, bmp, gif, 8 more }`

    Value of the zone setting.

    - `avif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for avif.

    - `bmp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for bmp.

    - `gif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for gif.

    - `jp2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jp2.

    - `jpeg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpeg.

    - `jpg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg.

    - `jpg2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg2.

    - `png: optional array of string`

      List of strings with the MIME types of all the variants that should be served for png.

    - `tif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tif.

    - `tiff: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tiff.

    - `webp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for webp.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants \
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
  "result": {
    "id": "variants",
    "editable": true,
    "value": {
      "avif": [
        "image/webp",
        "image/jpeg"
      ],
      "bmp": [
        "image/webp",
        "image/jpeg"
      ],
      "gif": [
        "image/webp",
        "image/jpeg"
      ],
      "jp2": [
        "image/webp",
        "image/avif"
      ],
      "jpeg": [
        "image/webp",
        "image/avif"
      ],
      "jpg": [
        "image/webp",
        "image/avif"
      ],
      "jpg2": [
        "image/webp",
        "image/avif"
      ],
      "png": [
        "image/webp",
        "image/avif"
      ],
      "tif": [
        "image/webp",
        "image/avif"
      ],
      "tiff": [
        "image/webp",
        "image/avif"
      ],
      "webp": [
        "image/jpeg",
        "image/avif"
      ]
    },
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Change variants setting

**patch** `/zones/{zone_id}/cache/variants`

Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: object { avif, bmp, gif, 8 more }`

  Value of the zone setting.

  - `avif: optional array of string`

    List of strings with the MIME types of all the variants that should be served for avif.

  - `bmp: optional array of string`

    List of strings with the MIME types of all the variants that should be served for bmp.

  - `gif: optional array of string`

    List of strings with the MIME types of all the variants that should be served for gif.

  - `jp2: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jp2.

  - `jpeg: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jpeg.

  - `jpg: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jpg.

  - `jpg2: optional array of string`

    List of strings with the MIME types of all the variants that should be served for jpg2.

  - `png: optional array of string`

    List of strings with the MIME types of all the variants that should be served for png.

  - `tif: optional array of string`

    List of strings with the MIME types of all the variants that should be served for tif.

  - `tiff: optional array of string`

    List of strings with the MIME types of all the variants that should be served for tiff.

  - `webp: optional array of string`

    List of strings with the MIME types of all the variants that should be served for webp.

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

  - `id: "variants"`

    The identifier of the caching setting.

    - `"variants"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: object { avif, bmp, gif, 8 more }`

    Value of the zone setting.

    - `avif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for avif.

    - `bmp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for bmp.

    - `gif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for gif.

    - `jp2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jp2.

    - `jpeg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpeg.

    - `jpg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg.

    - `jpg2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg2.

    - `png: optional array of string`

      List of strings with the MIME types of all the variants that should be served for png.

    - `tif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tif.

    - `tiff: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tiff.

    - `webp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for webp.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": {}
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
  "result": {
    "id": "variants",
    "editable": true,
    "value": {
      "avif": [
        "image/webp",
        "image/jpeg"
      ],
      "bmp": [
        "image/webp",
        "image/jpeg"
      ],
      "gif": [
        "image/webp",
        "image/jpeg"
      ],
      "jp2": [
        "image/webp",
        "image/avif"
      ],
      "jpeg": [
        "image/webp",
        "image/avif"
      ],
      "jpg": [
        "image/webp",
        "image/avif"
      ],
      "jpg2": [
        "image/webp",
        "image/avif"
      ],
      "png": [
        "image/webp",
        "image/avif"
      ],
      "tif": [
        "image/webp",
        "image/avif"
      ],
      "tiff": [
        "image/webp",
        "image/avif"
      ],
      "webp": [
        "image/jpeg",
        "image/avif"
      ]
    },
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete variants setting

**delete** `/zones/{zone_id}/cache/variants`

Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

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

- `result: optional object { id, editable, modified_on }`

  - `id: "variants"`

    The identifier of the caching setting.

    - `"variants"`

  - `editable: boolean`

    Whether the setting is editable.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/variants \
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
  "result": {
    "id": "variants",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Cache Variant

- `CacheVariant object { id, modified_on }`

  Variant support enables caching variants of images with certain file extensions in addition to the original. This only applies when the origin server sends the 'Vary: Accept' response header. If the origin server sends 'Vary: Accept' but does not serve the variant requested, the response will not be cached. This will be indicated with BYPASS cache status in the response headers.

  - `id: "variants"`

    ID of the zone setting.

    - `"variants"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Variant Get Response

- `VariantGetResponse object { id, editable, value, modified_on }`

  - `id: "variants"`

    The identifier of the caching setting.

    - `"variants"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: object { avif, bmp, gif, 8 more }`

    Value of the zone setting.

    - `avif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for avif.

    - `bmp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for bmp.

    - `gif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for gif.

    - `jp2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jp2.

    - `jpeg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpeg.

    - `jpg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg.

    - `jpg2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg2.

    - `png: optional array of string`

      List of strings with the MIME types of all the variants that should be served for png.

    - `tif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tif.

    - `tiff: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tiff.

    - `webp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for webp.

  - `modified_on: optional string`

    Last time this setting was modified.

### Variant Edit Response

- `VariantEditResponse object { id, editable, value, modified_on }`

  - `id: "variants"`

    The identifier of the caching setting.

    - `"variants"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: object { avif, bmp, gif, 8 more }`

    Value of the zone setting.

    - `avif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for avif.

    - `bmp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for bmp.

    - `gif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for gif.

    - `jp2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jp2.

    - `jpeg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpeg.

    - `jpg: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg.

    - `jpg2: optional array of string`

      List of strings with the MIME types of all the variants that should be served for jpg2.

    - `png: optional array of string`

      List of strings with the MIME types of all the variants that should be served for png.

    - `tif: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tif.

    - `tiff: optional array of string`

      List of strings with the MIME types of all the variants that should be served for tiff.

    - `webp: optional array of string`

      List of strings with the MIME types of all the variants that should be served for webp.

  - `modified_on: optional string`

    Last time this setting was modified.

### Variant Delete Response

- `VariantDeleteResponse object { id, editable, modified_on }`

  - `id: "variants"`

    The identifier of the caching setting.

    - `"variants"`

  - `editable: boolean`

    Whether the setting is editable.

  - `modified_on: optional string`

    Last time this setting was modified.

# Regional Tiered Cache

## Get Regional Tiered Cache setting

**get** `/zones/{zone_id}/cache/regional_tiered_cache`

Instructs Cloudflare to check a regional hub data center on the way to your upper tier. This can help improve performance for smart and custom tiered cache topologies.

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

  - `id: RegionalTieredCache`

    The identifier of the caching setting.

    - `"tc_regional"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Regional Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/regional_tiered_cache \
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
  "result": {
    "id": "tc_regional",
    "editable": true,
    "value": "on",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Change Regional Tiered Cache setting

**patch** `/zones/{zone_id}/cache/regional_tiered_cache`

Instructs Cloudflare to check a regional hub data center on the way to your upper tier. This can help improve performance for smart and custom tiered cache topologies.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: "on" or "off"`

  Value of the Regional Tiered Cache zone setting.

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

  - `id: RegionalTieredCache`

    The identifier of the caching setting.

    - `"tc_regional"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Regional Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/regional_tiered_cache \
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
  "result": {
    "id": "tc_regional",
    "editable": true,
    "value": "on",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Regional Tiered Cache

- `RegionalTieredCache = "tc_regional"`

  The identifier of the caching setting.

  - `"tc_regional"`

### Regional Tiered Cache Get Response

- `RegionalTieredCacheGetResponse object { id, editable, value, modified_on }`

  - `id: RegionalTieredCache`

    The identifier of the caching setting.

    - `"tc_regional"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Regional Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Regional Tiered Cache Edit Response

- `RegionalTieredCacheEditResponse object { id, editable, value, modified_on }`

  - `id: RegionalTieredCache`

    The identifier of the caching setting.

    - `"tc_regional"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Regional Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

# Origin Cloud Regions

## List origin cloud region mappings

**get** `/zones/{zone_id}/origin/cloud_regions`

Returns all IP-to-cloud-region mappings configured for the zone with pagination support. Each mapping tells Cloudflare which cloud vendor and region hosts the origin at that IP, enabling the edge to route via the nearest Tiered Cache upper-tier co-located with that cloud provider. Returns an empty array when no mappings exist.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

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

- `result: array of OriginCloudRegion`

  - `origin_ip: string`

    The origin IP address (IPv4 or IPv6). Normalized to canonical form (RFC 5952 for IPv6).

  - `region: string`

    Cloud vendor region identifier.

  - `vendor: "aws" or "azure" or "gcp" or "oci"`

    Cloud vendor hosting the origin.

    - `"aws"`

    - `"azure"`

    - `"gcp"`

    - `"oci"`

  - `modified_on: optional string`

    Time this mapping was last modified.

- `result_info: object { count, page, per_page, 2 more }`

  Pagination metadata for list responses.

  - `count: number`

    Number of items returned in this response.

  - `page: number`

    Current page number.

  - `per_page: number`

    Number of items per page.

  - `total_count: number`

    Total number of mappings configured for the zone.

  - `total_pages: number`

    Total number of pages.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "page": 1,
    "per_page": 20,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```

## Get an origin cloud region mapping

**get** `/zones/{zone_id}/origin/cloud_regions/{origin_ip}`

Returns the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup (RFC 5952 for IPv6). Returns 404 if the zone has no mappings or if the specified IP has no mapping.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

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

- `result: optional OriginCloudRegion`

  A single origin IP-to-cloud-region mapping.

  - `origin_ip: string`

    The origin IP address (IPv4 or IPv6). Normalized to canonical form (RFC 5952 for IPv6).

  - `region: string`

    Cloud vendor region identifier.

  - `vendor: "aws" or "azure" or "gcp" or "oci"`

    Cloud vendor hosting the origin.

    - `"aws"`

    - `"azure"`

    - `"gcp"`

    - `"oci"`

  - `modified_on: optional string`

    Time this mapping was last modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/$ORIGIN_IP \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "modified_on": "2026-03-01T12:00:00Z",
    "origin_ip": "192.0.2.1",
    "region": "us-east-1",
    "vendor": "aws"
  },
  "success": true
}
```

## Create or replace an origin cloud region mapping

**put** `/zones/{zone_id}/origin/cloud_regions/{origin_ip}`

Creates a new IP-to-cloud-region mapping or replaces the existing mapping for the specified IP. PUT is idempotent — calling it repeatedly with the same body produces the same result. The IP path parameter is normalized to canonical form (RFC 5952 for IPv6) before storage. The vendor and region are validated against the list from `GET /zones/{zone_id}/origin/cloud_regions/supported_regions`. Returns 400 if the `origin_ip` in the body does not match the URL path parameter. Returns 403 (code 1164) when the zone has reached the limit of 3,500 IP mappings.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

### Body Parameters

- `origin_ip: string`

  Origin IP address (IPv4 or IPv6). For the single PUT endpoint (`PUT /origin/cloud_regions/{origin_ip}`), this field must match the path parameter or the request will be rejected with a 400 error. For the batch PUT endpoint, this field identifies which mapping to upsert.

- `region: string`

  Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported_regions endpoint.

- `vendor: "aws" or "azure" or "gcp" or "oci"`

  Cloud vendor hosting the origin. Must be one of the supported vendors.

  - `"aws"`

  - `"azure"`

  - `"gcp"`

  - `"oci"`

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

- `result: optional OriginCloudRegion`

  A single origin IP-to-cloud-region mapping.

  - `origin_ip: string`

    The origin IP address (IPv4 or IPv6). Normalized to canonical form (RFC 5952 for IPv6).

  - `region: string`

    Cloud vendor region identifier.

  - `vendor: "aws" or "azure" or "gcp" or "oci"`

    Cloud vendor hosting the origin.

    - `"aws"`

    - `"azure"`

    - `"gcp"`

    - `"oci"`

  - `modified_on: optional string`

    Time this mapping was last modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/$ORIGIN_IP \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "origin_ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "modified_on": "2026-03-01T12:00:00Z",
    "origin_ip": "192.0.2.1",
    "region": "us-east-1",
    "vendor": "aws"
  },
  "success": true
}
```

## Delete an origin cloud region mapping

**delete** `/zones/{zone_id}/origin/cloud_regions/{origin_ip}`

Removes the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup. Returns the deleted IP on success. Returns 404 if no mapping exists for the specified IP. When the last mapping for the zone is removed the underlying rule record is also deleted.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

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

- `result: optional object { origin_ip }`

  Response result for a delete operation. Identifies the deleted mapping.

  - `origin_ip: string`

    The origin IP address whose mapping was deleted.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/$ORIGIN_IP \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "origin_ip": "192.0.2.1"
  },
  "success": true
}
```

## Batch create or replace origin cloud region mappings

**put** `/zones/{zone_id}/origin/cloud_regions/batch`

Upserts up to 100 IP-to-cloud-region mappings in a single request. Items in the request body are created or replaced; mappings not included in the request body are preserved unchanged (this is a merge operation, not a full collection replacement). Each item is validated independently — valid items are applied and invalid items are returned in the `failed` array. The vendor and region for every item are validated against the list from `GET /zones/{zone_id}/origin/cloud_regions/supported_regions`.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { origin_ip, region, vendor }`

  - `origin_ip: string`

    Origin IP address (IPv4 or IPv6). For the single PUT endpoint (`PUT /origin/cloud_regions/{origin_ip}`), this field must match the path parameter or the request will be rejected with a 400 error. For the batch PUT endpoint, this field identifies which mapping to upsert.

  - `region: string`

    Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported_regions endpoint.

  - `vendor: "aws" or "azure" or "gcp" or "oci"`

    Cloud vendor hosting the origin. Must be one of the supported vendors.

    - `"aws"`

    - `"azure"`

    - `"gcp"`

    - `"oci"`

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

- `result: optional object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/batch \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "origin_ip": "192.0.2.1",
            "region": "us-east-1",
            "vendor": "aws"
          },
          {
            "origin_ip": "2001:db8::1",
            "region": "us-central1",
            "vendor": "gcp"
          }
        ]'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "failed": [],
    "succeeded": [
      {
        "origin_ip": "192.0.2.1",
        "region": "us-east-1",
        "vendor": "aws"
      },
      {
        "origin_ip": "2001:db8::1",
        "region": "us-central1",
        "vendor": "gcp"
      }
    ]
  },
  "success": true
}
```

## Batch delete origin cloud region mappings

**delete** `/zones/{zone_id}/origin/cloud_regions/batch`

Removes up to 100 IP-to-cloud-region mappings in a single request. Each IP is validated independently — successfully deleted items are returned in the `succeeded` array and IPs that could not be found or are invalid are returned in the `failed` array.

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

- `result: optional object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/batch \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "failed": [],
    "succeeded": [
      {
        "origin_ip": "192.0.2.1",
        "region": "us-east-1",
        "vendor": "aws"
      },
      {
        "origin_ip": "2001:db8::1",
        "region": "us-central1",
        "vendor": "gcp"
      }
    ]
  },
  "success": true
}
```

## List supported cloud vendors and regions

**get** `/zones/{zone_id}/origin/cloud_regions/supported_regions`

Returns the cloud vendors and regions that are valid values for origin cloud region mappings. Each region includes the Tiered Cache upper-tier colocation codes that will be used for cache routing when a mapping targeting that region is active. Requires the zone to have Tiered Cache enabled.

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

- `result: optional object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/supported_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "obtained_codes": true,
    "vendors": {
      "aws": [
        {
          "name": "us-east-1",
          "upper_tier_colos": [
            "IAD",
            "EWR"
          ]
        },
        {
          "name": "us-west-2",
          "upper_tier_colos": [
            "SEA"
          ]
        }
      ],
      "gcp": [
        {
          "name": "us-central1",
          "upper_tier_colos": [
            "ORD"
          ]
        }
      ]
    }
  },
  "success": true
}
```

## List origin cloud region mappings

**get** `/zones/{zone_id}/cache/origin_cloud_regions`

Returns all IP-to-cloud-region mappings configured for the zone. Each mapping tells Cloudflare which cloud vendor and region hosts the origin at that IP, enabling the edge to route via the nearest Tiered Cache upper-tier co-located with that cloud provider. Returns an empty array when no mappings exist.

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

  Response result for a list of origin cloud region mappings.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: array of object { "origin-ip", region, vendor, modified_on }`

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no mappings exist.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": null,
    "value": []
  },
  "success": true
}
```

## Create an origin cloud region mapping

**post** `/zones/{zone_id}/cache/origin_cloud_regions`

Adds a single IP-to-cloud-region mapping for the zone. The IP must be a valid IPv4 or IPv6 address and is normalized to canonical form before storage (RFC 5952 for IPv6). Returns 400 (code 1145) if a mapping for that IP already exists — use PATCH to update an existing entry. The vendor and region are validated against the list from `GET /zones/{zone_id}/cache/origin_cloud_regions/supported_regions`.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `ip: string`

  Origin IP address (IPv4 or IPv6). Normalized to canonical form before storage (RFC 5952 for IPv6).

- `region: string`

  Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported_regions endpoint.

- `vendor: "aws" or "azure" or "gcp" or "oci"`

  Cloud vendor hosting the origin. Must be one of the supported vendors.

  - `"aws"`

  - `"azure"`

  - `"gcp"`

  - `"oci"`

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

  Response result for a single origin cloud region mapping.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { "origin-ip", region, vendor, modified_on }`

    A single origin IP-to-cloud-region mapping.

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping was last modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "modified_on": "2026-03-01T12:00:00Z",
      "origin-ip": "192.0.2.1",
      "region": "us-east-1",
      "vendor": "aws"
    }
  },
  "success": true
}
```

## Create or update an origin cloud region mapping

**patch** `/zones/{zone_id}/cache/origin_cloud_regions`

Adds or updates a single IP-to-cloud-region mapping for the zone. Unlike POST, this operation is idempotent — if a mapping for the IP already exists it is overwritten. Returns the complete updated list of all mappings for the zone. Returns 403 (code 1164) when the zone has reached the limit of 3,500 IP mappings.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `ip: string`

  Origin IP address (IPv4 or IPv6). Normalized to canonical form before storage (RFC 5952 for IPv6).

- `region: string`

  Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported_regions endpoint.

- `vendor: "aws" or "azure" or "gcp" or "oci"`

  Cloud vendor hosting the origin. Must be one of the supported vendors.

  - `"aws"`

  - `"azure"`

  - `"gcp"`

  - `"oci"`

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

  Response result for a list of origin cloud region mappings.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: array of object { "origin-ip", region, vendor, modified_on }`

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no mappings exist.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ip": "2001:db8::1",
          "region": "us-central1",
          "vendor": "gcp"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": [
      {
        "modified_on": "2026-03-01T12:00:00Z",
        "origin-ip": "192.0.2.1",
        "region": "us-east-1",
        "vendor": "aws"
      },
      {
        "modified_on": "2026-03-01T12:00:00Z",
        "origin-ip": "2001:db8::1",
        "region": "us-central1",
        "vendor": "gcp"
      }
    ]
  },
  "success": true
}
```

## Get an origin cloud region mapping

**get** `/zones/{zone_id}/cache/origin_cloud_regions/{origin_ip}`

Returns the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup (RFC 5952 for IPv6). Returns 404 (code 1142) if the zone has no mappings or if the specified IP has no mapping.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

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

  Response result for a single origin cloud region mapping.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { "origin-ip", region, vendor, modified_on }`

    A single origin IP-to-cloud-region mapping.

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping was last modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/$ORIGIN_IP \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "modified_on": "2026-03-01T12:00:00Z",
      "origin-ip": "192.0.2.1",
      "region": "us-east-1",
      "vendor": "aws"
    }
  },
  "success": true
}
```

## Delete an origin cloud region mapping

**delete** `/zones/{zone_id}/cache/origin_cloud_regions/{origin_ip}`

Removes the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup. Returns the deleted entry on success. Returns 404 (code 1163) if no mapping exists for the specified IP. When the last mapping for the zone is removed the underlying rule record is also deleted.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

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

  Response result for a single origin cloud region mapping.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { "origin-ip", region, vendor, modified_on }`

    A single origin IP-to-cloud-region mapping.

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping was last modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/$ORIGIN_IP \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "modified_on": "2026-03-01T12:00:00Z",
      "origin-ip": "192.0.2.1",
      "region": "us-east-1",
      "vendor": "aws"
    }
  },
  "success": true
}
```

## Batch create or update origin cloud region mappings

**patch** `/zones/{zone_id}/cache/origin_cloud_regions/batch`

Adds or updates up to 100 IP-to-cloud-region mappings in a single request. Each item is validated independently — valid items are applied and invalid items are returned in the `failed` array. The vendor and region for every item are validated against the list from `GET /zones/{zone_id}/cache/origin_cloud_regions/supported_regions`.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { ip, region, vendor }`

  - `ip: string`

    Origin IP address (IPv4 or IPv6). Normalized to canonical form before storage (RFC 5952 for IPv6).

  - `region: string`

    Cloud vendor region identifier. Must be a valid region for the specified vendor as returned by the supported_regions endpoint.

  - `vendor: "aws" or "azure" or "gcp" or "oci"`

    Cloud vendor hosting the origin. Must be one of the supported vendors.

    - `"aws"`

    - `"azure"`

    - `"gcp"`

    - `"oci"`

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

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/batch \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "ip": "192.0.2.1",
            "region": "us-east-1",
            "vendor": "aws"
          },
          {
            "ip": "2001:db8::1",
            "region": "us-central1",
            "vendor": "gcp"
          }
        ]'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "failed": [],
      "succeeded": [
        {
          "origin-ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        },
        {
          "origin-ip": "2001:db8::1",
          "region": "us-central1",
          "vendor": "gcp"
        }
      ]
    }
  },
  "success": true
}
```

## Batch delete origin cloud region mappings

**delete** `/zones/{zone_id}/cache/origin_cloud_regions/batch`

Removes up to 100 IP-to-cloud-region mappings in a single request. Each IP is validated independently — successfully deleted items are returned in the `succeeded` array and IPs that could not be found or are invalid are returned in the `failed` array.

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

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/batch \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "failed": [],
      "succeeded": [
        {
          "origin-ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        },
        {
          "origin-ip": "2001:db8::1",
          "region": "us-central1",
          "vendor": "gcp"
        }
      ]
    }
  },
  "success": true
}
```

## List supported cloud vendors and regions

**get** `/zones/{zone_id}/cache/origin_cloud_regions/supported_regions`

Returns the cloud vendors and regions that are valid values for origin cloud region mappings. Each region includes the Tiered Cache upper-tier colocation codes that will be used for cache routing when a mapping targeting that region is active. Requires the zone to have Tiered Cache enabled.

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

- `result: optional object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/supported_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "obtained_codes": true,
    "vendors": {
      "aws": [
        {
          "name": "us-east-1",
          "upper_tier_colos": [
            "IAD",
            "EWR"
          ]
        },
        {
          "name": "us-west-2",
          "upper_tier_colos": [
            "SEA"
          ]
        }
      ],
      "gcp": [
        {
          "name": "us-central1",
          "upper_tier_colos": [
            "ORD"
          ]
        }
      ]
    }
  },
  "success": true
}
```

## Domain Types

### Origin Cloud Region

- `OriginCloudRegion object { origin_ip, region, vendor, modified_on }`

  A single origin IP-to-cloud-region mapping.

  - `origin_ip: string`

    The origin IP address (IPv4 or IPv6). Normalized to canonical form (RFC 5952 for IPv6).

  - `region: string`

    Cloud vendor region identifier.

  - `vendor: "aws" or "azure" or "gcp" or "oci"`

    Cloud vendor hosting the origin.

    - `"aws"`

    - `"azure"`

    - `"gcp"`

    - `"oci"`

  - `modified_on: optional string`

    Time this mapping was last modified.

### Origin Cloud Region Delete Response

- `OriginCloudRegionDeleteResponse object { origin_ip }`

  Response result for a delete operation. Identifies the deleted mapping.

  - `origin_ip: string`

    The origin IP address whose mapping was deleted.

### Origin Cloud Region Bulk Update Response

- `OriginCloudRegionBulkUpdateResponse object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Origin Cloud Region Bulk Delete Response

- `OriginCloudRegionBulkDeleteResponse object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Origin Cloud Region Supported Regions Response

- `OriginCloudRegionSupportedRegionsResponse object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

### Origin Cloud Region List V1 Response

- `OriginCloudRegionListV1Response object { id, editable, value, modified_on }`

  Response result for a list of origin cloud region mappings.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: array of object { "origin-ip", region, vendor, modified_on }`

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no mappings exist.

### Origin Cloud Region Create V1 Response

- `OriginCloudRegionCreateV1Response object { id, editable, value, modified_on }`

  Response result for a single origin cloud region mapping.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { "origin-ip", region, vendor, modified_on }`

    A single origin IP-to-cloud-region mapping.

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping was last modified.

### Origin Cloud Region Edit V1 Response

- `OriginCloudRegionEditV1Response object { id, editable, value, modified_on }`

  Response result for a list of origin cloud region mappings.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: array of object { "origin-ip", region, vendor, modified_on }`

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no mappings exist.

### Origin Cloud Region Get V1 Response

- `OriginCloudRegionGetV1Response object { id, editable, value, modified_on }`

  Response result for a single origin cloud region mapping.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { "origin-ip", region, vendor, modified_on }`

    A single origin IP-to-cloud-region mapping.

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping was last modified.

### Origin Cloud Region Delete V1 Response

- `OriginCloudRegionDeleteV1Response object { id, editable, value, modified_on }`

  Response result for a single origin cloud region mapping.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { "origin-ip", region, vendor, modified_on }`

    A single origin IP-to-cloud-region mapping.

    - `"origin-ip": string`

      The origin IP address (IPv4 or IPv6, canonicalized).

    - `region: string`

      Cloud vendor region identifier.

    - `vendor: "aws" or "azure" or "gcp" or "oci"`

      Cloud vendor hosting the origin.

      - `"aws"`

      - `"azure"`

      - `"gcp"`

      - `"oci"`

    - `modified_on: optional string`

      Time this mapping was last modified.

  - `modified_on: optional string`

    Time the mapping was last modified.

### Origin Cloud Region Bulk Edit V1 Response

- `OriginCloudRegionBulkEditV1Response object { id, editable, value, modified_on }`

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Origin Cloud Region Bulk Delete V1 Response

- `OriginCloudRegionBulkDeleteV1Response object { id, editable, value, modified_on }`

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Origin Cloud Region Supported Regions V1 Response

- `OriginCloudRegionSupportedRegionsV1Response object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.
