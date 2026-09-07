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
