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
