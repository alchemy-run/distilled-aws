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
