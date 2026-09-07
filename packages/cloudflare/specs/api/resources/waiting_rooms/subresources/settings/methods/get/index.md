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
