## List core web vital metrics trend

**get** `/zones/{zone_id}/speed_api/pages/{url}/trend`

Lists the core web vital metrics trend over time for a specific page.

### Path Parameters

- `zone_id: string`

  Identifier.

- `url: string`

  A URL.

### Query Parameters

- `deviceType: "DESKTOP" or "MOBILE"`

  The type of device.

  - `"DESKTOP"`

  - `"MOBILE"`

- `metrics: string`

  A comma-separated list of metrics to include in the results.

- `region: "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

  A test region.

  - `"asia-east1"`

  - `"asia-northeast1"`

  - `"asia-northeast2"`

  - `"asia-south1"`

  - `"asia-southeast1"`

  - `"australia-southeast1"`

  - `"europe-north1"`

  - `"europe-southwest1"`

  - `"europe-west1"`

  - `"europe-west2"`

  - `"europe-west3"`

  - `"europe-west4"`

  - `"europe-west8"`

  - `"europe-west9"`

  - `"me-west1"`

  - `"southamerica-east1"`

  - `"us-central1"`

  - `"us-east1"`

  - `"us-east4"`

  - `"us-south1"`

  - `"us-west1"`

- `start: string`

- `tz: string`

  The timezone of the start and end timestamps.

- `end: optional string`

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional Trend`

  - `cls: optional array of number`

    Cumulative Layout Shift trend.

  - `fcp: optional array of number`

    First Contentful Paint trend.

  - `lcp: optional array of number`

    Largest Contentful Paint trend.

  - `performanceScore: optional array of number`

    The Lighthouse score trend.

  - `si: optional array of number`

    Speed Index trend.

  - `tbt: optional array of number`

    Total Blocking Time trend.

  - `ttfb: optional array of number`

    Time To First Byte trend.

  - `tti: optional array of number`

    Time To Interactive trend.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/speed_api/pages/$URL/trend \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "cls": [
      0
    ],
    "fcp": [
      0
    ],
    "lcp": [
      0
    ],
    "performanceScore": [
      0
    ],
    "si": [
      0
    ],
    "tbt": [
      0
    ],
    "ttfb": [
      0
    ],
    "tti": [
      0
    ]
  }
}
```
