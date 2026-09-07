## Create Zone Hold

**post** `/zones/{zone_id}/hold`

Enforce a zone hold on the zone, blocking the creation and activation of zones with this zone's hostname.
Zone holds cannot be enabled on CDN-only zones.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `include_subdomains: optional boolean`

  If provided, the zone hold will extend to block any subdomain of the given zone, as well
  as SSL4SaaS Custom Hostnames. For example, a zone hold on a zone with the hostname
  'example.com' and include_subdomains=true will block 'example.com',
  'staging.example.com', 'api.staging.example.com', etc.

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

- `result: ZoneHold`

  - `hold: optional boolean`

  - `hold_after: optional string`

  - `include_subdomains: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hold \
    -X POST \
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
  "result": {
    "hold": true,
    "hold_after": "2023-01-31T15:56:36+00:00",
    "include_subdomains": "include_subdomains"
  },
  "success": true
}
```
