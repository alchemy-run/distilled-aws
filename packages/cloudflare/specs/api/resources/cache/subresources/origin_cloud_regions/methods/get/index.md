## Get an origin cloud region mapping

**get** `/zones/{zone_id}/origin/cloud_regions/{origin_ip}`

Returns the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup (RFC 5952 for IPv6). Returns 404 if the zone has no mappings or if the specified IP has no mapping.

### Path Parameters

- `zone_id: string`

  Identifier.

- `origin_ip: string`

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
