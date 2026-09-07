## List origin cloud region mappings

**get** `/zones/{zone_id}/cache/origin_cloud_regions`

Returns all IP-to-cloud-region mappings configured for the zone. Each mapping tells Cloudflare which cloud vendor and region hosts the origin at that IP, enabling the edge to route via the nearest Tiered Cache upper-tier co-located with that cloud provider. Returns an empty array when no mappings exist.

### Path Parameters

- `zone_id: string`

  Identifier.

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "origin_public_cloud_region",
    "modified_on": null,
    "value": []
  },
  "success": true
}
```
