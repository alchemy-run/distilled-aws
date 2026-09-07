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
