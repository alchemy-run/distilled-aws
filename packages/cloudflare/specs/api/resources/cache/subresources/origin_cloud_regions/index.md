# Origin Cloud Regions

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

## Delete an origin cloud region mapping

**delete** `/zones/{zone_id}/origin/cloud_regions/{origin_ip}`

Removes the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup. Returns the deleted IP on success. Returns 404 if no mapping exists for the specified IP. When the last mapping for the zone is removed the underlying rule record is also deleted.

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

- `result: optional object { origin_ip }`

  Response result for a delete operation. Identifies the deleted mapping.

  - `origin_ip: string`

    The origin IP address whose mapping was deleted.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/$ORIGIN_IP \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "origin_ip": "192.0.2.1"
  },
  "success": true
}
```

## Batch create or replace origin cloud region mappings

**put** `/zones/{zone_id}/origin/cloud_regions/batch`

Upserts up to 100 IP-to-cloud-region mappings in a single request. Items in the request body are created or replaced; mappings not included in the request body are preserved unchanged (this is a merge operation, not a full collection replacement). Each item is validated independently — valid items are applied and invalid items are returned in the `failed` array. The vendor and region for every item are validated against the list from `GET /zones/{zone_id}/origin/cloud_regions/supported_regions`.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { origin_ip, region, vendor }`

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

- `result: optional object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/batch \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "origin_ip": "192.0.2.1",
            "region": "us-east-1",
            "vendor": "aws"
          },
          {
            "origin_ip": "2001:db8::1",
            "region": "us-central1",
            "vendor": "gcp"
          }
        ]'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "failed": [],
    "succeeded": [
      {
        "origin_ip": "192.0.2.1",
        "region": "us-east-1",
        "vendor": "aws"
      },
      {
        "origin_ip": "2001:db8::1",
        "region": "us-central1",
        "vendor": "gcp"
      }
    ]
  },
  "success": true
}
```

## Batch delete origin cloud region mappings

**delete** `/zones/{zone_id}/origin/cloud_regions/batch`

Removes up to 100 IP-to-cloud-region mappings in a single request. Each IP is validated independently — successfully deleted items are returned in the `succeeded` array and IPs that could not be found or are invalid are returned in the `failed` array.

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

- `result: optional object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/batch \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "failed": [],
    "succeeded": [
      {
        "origin_ip": "192.0.2.1",
        "region": "us-east-1",
        "vendor": "aws"
      },
      {
        "origin_ip": "2001:db8::1",
        "region": "us-central1",
        "vendor": "gcp"
      }
    ]
  },
  "success": true
}
```

## List supported cloud vendors and regions

**get** `/zones/{zone_id}/origin/cloud_regions/supported_regions`

Returns the cloud vendors and regions that are valid values for origin cloud region mappings. Each region includes the Tiered Cache upper-tier colocation codes that will be used for cache routing when a mapping targeting that region is active. Requires the zone to have Tiered Cache enabled.

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

- `result: optional object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin/cloud_regions/supported_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "obtained_codes": true,
    "vendors": {
      "aws": [
        {
          "name": "us-east-1",
          "upper_tier_colos": [
            "IAD",
            "EWR"
          ]
        },
        {
          "name": "us-west-2",
          "upper_tier_colos": [
            "SEA"
          ]
        }
      ],
      "gcp": [
        {
          "name": "us-central1",
          "upper_tier_colos": [
            "ORD"
          ]
        }
      ]
    }
  },
  "success": true
}
```

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

## Get an origin cloud region mapping

**get** `/zones/{zone_id}/cache/origin_cloud_regions/{origin_ip}`

Returns the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup (RFC 5952 for IPv6). Returns 404 (code 1142) if the zone has no mappings or if the specified IP has no mapping.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/$ORIGIN_IP \
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

## Delete an origin cloud region mapping

**delete** `/zones/{zone_id}/cache/origin_cloud_regions/{origin_ip}`

Removes the cloud region mapping for a single origin IP address. The IP path parameter is normalized before lookup. Returns the deleted entry on success. Returns 404 (code 1163) if no mapping exists for the specified IP. When the last mapping for the zone is removed the underlying rule record is also deleted.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/$ORIGIN_IP \
    -X DELETE \
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

## Batch create or update origin cloud region mappings

**patch** `/zones/{zone_id}/cache/origin_cloud_regions/batch`

Adds or updates up to 100 IP-to-cloud-region mappings in a single request. Each item is validated independently — valid items are applied and invalid items are returned in the `failed` array. The vendor and region for every item are validated against the list from `GET /zones/{zone_id}/cache/origin_cloud_regions/supported_regions`.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { ip, region, vendor }`

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

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/batch \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "ip": "192.0.2.1",
            "region": "us-east-1",
            "vendor": "aws"
          },
          {
            "ip": "2001:db8::1",
            "region": "us-central1",
            "vendor": "gcp"
          }
        ]'
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
      "failed": [],
      "succeeded": [
        {
          "origin-ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        },
        {
          "origin-ip": "2001:db8::1",
          "region": "us-central1",
          "vendor": "gcp"
        }
      ]
    }
  },
  "success": true
}
```

## Batch delete origin cloud region mappings

**delete** `/zones/{zone_id}/cache/origin_cloud_regions/batch`

Removes up to 100 IP-to-cloud-region mappings in a single request. Each IP is validated independently — successfully deleted items are returned in the `succeeded` array and IPs that could not be found or are invalid are returned in the `failed` array.

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

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/batch \
    -X DELETE \
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
    "modified_on": "2026-03-01T12:00:00Z",
    "value": {
      "failed": [],
      "succeeded": [
        {
          "origin-ip": "192.0.2.1",
          "region": "us-east-1",
          "vendor": "aws"
        },
        {
          "origin-ip": "2001:db8::1",
          "region": "us-central1",
          "vendor": "gcp"
        }
      ]
    }
  },
  "success": true
}
```

## List supported cloud vendors and regions

**get** `/zones/{zone_id}/cache/origin_cloud_regions/supported_regions`

Returns the cloud vendors and regions that are valid values for origin cloud region mappings. Each region includes the Tiered Cache upper-tier colocation codes that will be used for cache routing when a mapping targeting that region is active. Requires the zone to have Tiered Cache enabled.

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

- `result: optional object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_cloud_regions/supported_regions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "obtained_codes": true,
    "vendors": {
      "aws": [
        {
          "name": "us-east-1",
          "upper_tier_colos": [
            "IAD",
            "EWR"
          ]
        },
        {
          "name": "us-west-2",
          "upper_tier_colos": [
            "SEA"
          ]
        }
      ],
      "gcp": [
        {
          "name": "us-central1",
          "upper_tier_colos": [
            "ORD"
          ]
        }
      ]
    }
  },
  "success": true
}
```

## Domain Types

### Origin Cloud Region

- `OriginCloudRegion object { origin_ip, region, vendor, modified_on }`

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

### Origin Cloud Region Delete Response

- `OriginCloudRegionDeleteResponse object { origin_ip }`

  Response result for a delete operation. Identifies the deleted mapping.

  - `origin_ip: string`

    The origin IP address whose mapping was deleted.

### Origin Cloud Region Bulk Update Response

- `OriginCloudRegionBulkUpdateResponse object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Origin Cloud Region Bulk Delete Response

- `OriginCloudRegionBulkDeleteResponse object { failed, succeeded }`

  Response result for a batch origin cloud region operation.

  - `failed: array of object { origin_ip, error, region, vendor }`

    Items that could not be applied, with error details.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

  - `succeeded: array of object { origin_ip, error, region, vendor }`

    Items that were successfully applied.

    - `origin_ip: string`

      The origin IP address for this item.

    - `error: optional string`

      Error message explaining why the item failed. Present only on failed items.

    - `region: optional string`

      Cloud vendor region identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

    - `vendor: optional string`

      Cloud vendor identifier. Present on succeeded items (the new value for upsert, the deleted value for delete).

### Origin Cloud Region Supported Regions Response

- `OriginCloudRegionSupportedRegionsResponse object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.

### Origin Cloud Region List V1 Response

- `OriginCloudRegionListV1Response object { id, editable, value, modified_on }`

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

### Origin Cloud Region Create V1 Response

- `OriginCloudRegionCreateV1Response object { id, editable, value, modified_on }`

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

### Origin Cloud Region Edit V1 Response

- `OriginCloudRegionEditV1Response object { id, editable, value, modified_on }`

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

### Origin Cloud Region Get V1 Response

- `OriginCloudRegionGetV1Response object { id, editable, value, modified_on }`

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

### Origin Cloud Region Delete V1 Response

- `OriginCloudRegionDeleteV1Response object { id, editable, value, modified_on }`

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

### Origin Cloud Region Bulk Edit V1 Response

- `OriginCloudRegionBulkEditV1Response object { id, editable, value, modified_on }`

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Origin Cloud Region Bulk Delete V1 Response

- `OriginCloudRegionBulkDeleteV1Response object { id, editable, value, modified_on }`

  Response result for a batch origin cloud region operation.

  - `id: "origin_public_cloud_region"`

    - `"origin_public_cloud_region"`

  - `editable: boolean`

    Whether the setting can be modified by the current user.

  - `value: object { failed, succeeded }`

    - `failed: array of object { "origin-ip", error, region, vendor }`

      Items that could not be applied, with error details.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

    - `succeeded: array of object { "origin-ip", error, region, vendor }`

      Items that were successfully applied.

      - `"origin-ip": string`

        The origin IP address for this item.

      - `error: optional string`

        Error message explaining why the item failed. Present only on failed items.

      - `region: optional string`

        Cloud vendor region identifier. Present on succeeded items for patch operations.

      - `vendor: optional string`

        Cloud vendor identifier. Present on succeeded items for patch operations.

  - `modified_on: optional string`

    Time the mapping set was last modified. Null when no items were successfully applied.

### Origin Cloud Region Supported Regions V1 Response

- `OriginCloudRegionSupportedRegionsV1Response object { obtained_codes, vendors }`

  Cloud vendors and their supported regions for origin cloud region mappings.

  - `obtained_codes: boolean`

    Whether Cloudflare airport codes (IATA colo identifiers) were successfully resolved for the `upper_tier_colos` field on each region. When `false`, the `upper_tier_colos` arrays may be empty or incomplete.

  - `vendors: map[array of object { name, upper_tier_colos } ]`

    Map of vendor name to list of supported regions.

    - `name: string`

      Cloud vendor region identifier.

    - `upper_tier_colos: array of string`

      Cloudflare Tiered Cache upper-tier colocation codes co-located with this cloud region. Requests from zones with a matching origin mapping will be routed through these colos.
