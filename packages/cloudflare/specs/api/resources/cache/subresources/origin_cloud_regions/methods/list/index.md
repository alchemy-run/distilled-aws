## List origin cloud region mappings

**get** `/zones/{zone_id}/origin/cloud_regions`

Returns all IP-to-cloud-region mappings configured for the zone with pagination support. Each mapping tells Cloudflare which cloud vendor and region hosts the origin at that IP, enabling the edge to route via the nearest Tiered Cache upper-tier co-located with that cloud provider. Returns an empty array when no mappings exist.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

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

- `result: array of OriginCloudRegion`

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

- `result_info: object { count, page, per_page, 2 more }`

  Pagination metadata for list responses.

  - `count: number`

    Number of items returned in this response.

  - `page: number`

    Current page number.

  - `per_page: number`

    Number of items per page.

  - `total_count: number`

    Total number of mappings configured for the zone.

  - `total_pages: number`

    Total number of pages.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": [],
  "result_info": {
    "count": 0,
    "page": 1,
    "per_page": 20,
    "total_count": 0,
    "total_pages": 0
  },
  "success": true
}
```
