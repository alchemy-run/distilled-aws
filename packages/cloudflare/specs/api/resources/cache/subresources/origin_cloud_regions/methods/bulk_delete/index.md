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
