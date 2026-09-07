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
