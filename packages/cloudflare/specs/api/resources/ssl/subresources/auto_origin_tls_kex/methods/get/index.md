## Get Auto-Origin TLS KEX enrollment status for the given zone

**get** `/zones/{zone_id}/settings/auto_origin_tls_kex`

When enabled, Cloudflare automatically selects the preferred TLS key-exchange algorithm to use when establishing the TLS connection to the zone's origin, picking from the algorithms permitted by the zone's `origin_tls_compliance_modes` setting. When disabled, the default key-exchange ordering is used.

### Path Parameters

- `zone_id: string`

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
