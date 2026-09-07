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
