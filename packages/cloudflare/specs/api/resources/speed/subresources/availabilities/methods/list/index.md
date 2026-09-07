## Get quota and availability

**get** `/zones/{zone_id}/speed_api/availabilities`

Retrieves quota for all plans, as well as the current zone quota.

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

- `success: boolean`

  Whether the API call was successful.

- `result: optional Availability`

  - `quota: optional object { plan, quotasPerPlan, remainingSchedules, 2 more }`

    - `plan: optional string`

      Cloudflare plan.

    - `quotasPerPlan: optional object { value }`

      The number of tests available per plan.

      - `value: optional object { business, enterprise, free, pro }`

        Counts per account plan.

        - `business: optional number`

        - `enterprise: optional number`

        - `free: optional number`

        - `pro: optional number`

    - `remainingSchedules: optional number`

      The number of remaining schedules available.

    - `remainingTests: optional number`

      The number of remaining tests available.

    - `scheduleQuotasPerPlan: optional object { value }`

      The number of schedules available per plan.

      - `value: optional object { business, enterprise, free, pro }`

        Counts per account plan.

        - `business: optional number`

        - `enterprise: optional number`

        - `free: optional number`

        - `pro: optional number`

  - `regions: optional array of LabeledRegion`

    - `label: optional string`

    - `value: optional "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

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

  - `regionsPerPlan: optional object { business, enterprise, free, pro }`

    Available regions.

    - `business: optional array of LabeledRegion`

      - `label: optional string`

      - `value: optional "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

        A test region.

    - `enterprise: optional array of LabeledRegion`

      - `label: optional string`

      - `value: optional "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

        A test region.

    - `free: optional array of LabeledRegion`

      - `label: optional string`

      - `value: optional "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

        A test region.

    - `pro: optional array of LabeledRegion`

      - `label: optional string`

      - `value: optional "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

        A test region.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/speed_api/availabilities \
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
    "quota": {
      "plan": "free",
      "quotasPerPlan": {
        "value": {
          "business": 1,
          "enterprise": 1,
          "free": 1,
          "pro": 1
        }
      },
      "remainingSchedules": 1,
      "remainingTests": 30,
      "scheduleQuotasPerPlan": {
        "value": {
          "business": 1,
          "enterprise": 1,
          "free": 1,
          "pro": 1
        }
      }
    },
    "regions": [
      {
        "label": "Iowa, USA",
        "value": "us-central1"
      }
    ],
    "regionsPerPlan": {
      "business": [
        {
          "label": "Iowa, USA",
          "value": "us-central1"
        }
      ],
      "enterprise": [
        {
          "label": "Iowa, USA",
          "value": "us-central1"
        }
      ],
      "free": [
        {
          "label": "Iowa, USA",
          "value": "us-central1"
        }
      ],
      "pro": [
        {
          "label": "Iowa, USA",
          "value": "us-central1"
        }
      ]
    }
  }
}
```
