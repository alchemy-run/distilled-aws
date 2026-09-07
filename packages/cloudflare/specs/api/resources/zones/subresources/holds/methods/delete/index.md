## Remove Zone Hold

**delete** `/zones/{zone_id}/hold`

Stop enforcement of a zone hold on the zone, permanently or temporarily, allowing the
creation and activation of zones with this zone's hostname.
Existing zone holds can be removed from CDN-only zones when `hold_after` is not provided.
Active holds are automatically disabled when a zone transitions to CDN-only mode.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `hold_after: optional string`

  If `hold_after` is provided, the hold will be temporarily disabled,
  then automatically re-enabled by the system at the time specified
  in this RFC3339-formatted timestamp. Otherwise, the hold will be
  disabled indefinitely. `hold_after` cannot be provided for CDN-only zones.

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
  "result": {
    "hold": true,
    "hold_after": "2023-01-31T15:56:36+00:00",
    "include_subdomains": "include_subdomains"
  },
  "success": true
}
```
