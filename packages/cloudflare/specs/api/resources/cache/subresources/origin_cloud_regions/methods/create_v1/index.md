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
