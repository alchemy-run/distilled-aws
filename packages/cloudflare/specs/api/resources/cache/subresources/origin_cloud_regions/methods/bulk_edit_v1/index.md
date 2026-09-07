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
