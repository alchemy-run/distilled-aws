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
