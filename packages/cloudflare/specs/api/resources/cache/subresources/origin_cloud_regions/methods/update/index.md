## Create or replace an origin cloud region mapping

**put** `/zones/{zone_id}/origin/cloud_regions/{origin_ip}`

Creates a new IP-to-cloud-region mapping or replaces the existing mapping for the specified IP. PUT is idempotent — calling it repeatedly with the same body produces the same result. The IP path parameter is normalized to canonical form (RFC 5952 for IPv6) before storage. The vendor and region are validated against the list from `GET /zones/{zone_id}/origin/cloud_regions/supported_regions`. Returns 400 if the `origin_ip` in the body does not match the URL path parameter. Returns 403 (code 1164) when the zone has reached the limit of 3,500 IP mappings.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

### Body Parameters

- `origin_ip: string`

  Origin IP address (IPv4 or IPv6). For the single PUT endpoint (`PUT /origin/cloud_regions/{origin_ip}`), this field must match the path parameter or the request will be rejected with a 400 error. For the batch PUT endpoint, this field identifies which mapping to upsert.

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

- `result: optional OriginCloudRegion`

  A single origin IP-to-cloud-region mapping.

  - `origin_ip: string`

    The origin IP address (IPv4 or IPv6). Normalized to canonical form (RFC 5952 for IPv6).

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/$ORIGIN_IP \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "origin_ip": "192.0.2.1",
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
    "modified_on": "2026-03-01T12:00:00Z",
    "origin_ip": "192.0.2.1",
    "region": "us-east-1",
    "vendor": "aws"
  },
  "success": true
}
```
