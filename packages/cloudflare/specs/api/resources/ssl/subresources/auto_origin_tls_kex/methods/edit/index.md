## Patch Auto-Origin TLS KEX enrollment status for the given zone

**patch** `/zones/{zone_id}/settings/auto_origin_tls_kex`

Enable or disable Auto-Origin TLS KEX selection for the zone by sending `{"enabled": true}` or `{"enabled": false}`. When enabled, Cloudflare runs a periodic scan of the zone's origins to determine the preferred key-exchange algorithm and writes that preference to the edge so it is sent first in the TLS ClientHello to the origin.

### Path Parameters

- `zone_id: string`

### Body Parameters

- `enabled: boolean`

  Controls enablement of Auto-Origin TLS KEX selection for the zone.

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

- `result: object { id, enabled, modified_on }`

  - `id: string`

  - `enabled: boolean`

    Whether Auto-Origin TLS KEX selection is enabled for the zone.

  - `modified_on: string`

    Last time this setting was modified.

- `success: boolean`

  Indicates the API call's success or failure.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/auto_origin_tls_kex \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "enabled": false,
    "id": "auto_origin_tls_kex",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```
