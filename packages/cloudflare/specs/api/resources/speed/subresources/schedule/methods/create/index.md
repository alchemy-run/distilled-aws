## Create scheduled page test

**post** `/zones/{zone_id}/speed_api/schedule/{url}`

Creates a scheduled test for a page.

### Path Parameters

- `zone_id: string`

  Identifier.

- `url: string`

  A URL.

### Query Parameters

- `frequency: optional "DAILY" or "WEEKLY"`

  The frequency of the scheduled test. Defaults to WEEKLY for free plans, DAILY for paid plans.

  - `"DAILY"`

  - `"WEEKLY"`

- `region: optional "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

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

- `result: optional object { schedule, test }`

  - `schedule: optional Schedule`

    The test schedule.

    - `frequency: optional "DAILY" or "WEEKLY"`

      The frequency of the test.

      - `"DAILY"`

      - `"WEEKLY"`

    - `region: optional "asia-east1" or "asia-northeast1" or "asia-northeast2" or 18 more`

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

    - `url: optional string`

      A URL.

  - `test: optional Test`

    - `id: optional string`

      UUID.

    - `date: optional string`

    - `desktopReport: optional LighthouseReport`

      The Lighthouse report.

      - `cls: optional number`

        Cumulative Layout Shift.

      - `deviceType: optional "DESKTOP" or "MOBILE"`

        The type of device.

        - `"DESKTOP"`

        - `"MOBILE"`

      - `error: optional object { code, detail, finalDisplayedUrl }`

        - `code: optional "NOT_REACHABLE" or "DNS_FAILURE" or "NOT_HTML" or 2 more`

          The error code of the Lighthouse result.

          - `"NOT_REACHABLE"`

          - `"DNS_FAILURE"`

          - `"NOT_HTML"`

          - `"LIGHTHOUSE_TIMEOUT"`

          - `"UNKNOWN"`

        - `detail: optional string`

          Detailed error message.

        - `finalDisplayedUrl: optional string`

          The final URL displayed to the user.

      - `fcp: optional number`

        First Contentful Paint.

      - `jsonReportUrl: optional string`

        The URL to the full Lighthouse JSON report.

      - `lcp: optional number`

        Largest Contentful Paint.

      - `performanceScore: optional number`

        The Lighthouse performance score.

      - `si: optional number`

        Speed Index.

      - `state: optional "RUNNING" or "COMPLETE" or "FAILED"`

        The state of the Lighthouse report.

        - `"RUNNING"`

        - `"COMPLETE"`

        - `"FAILED"`

      - `tbt: optional number`

        Total Blocking Time.

      - `ttfb: optional number`

        Time To First Byte.

      - `tti: optional number`

        Time To Interactive.

    - `mobileReport: optional LighthouseReport`

      The Lighthouse report.

    - `region: optional LabeledRegion`

      A test region with a label.

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

    - `scheduleFrequency: optional "DAILY" or "WEEKLY"`

      The frequency of the test.

      - `"DAILY"`

      - `"WEEKLY"`

    - `url: optional string`

      A URL.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/speed_api/schedule/$URL \
    -X POST \
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
    "schedule": {
      "frequency": "DAILY",
      "region": "us-central1",
      "url": "example.com"
    },
    "test": {
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "date": "2014-01-01T05:20:00.12345Z",
      "desktopReport": {
        "cls": 100,
        "deviceType": "DESKTOP",
        "error": {
          "code": "NOT_REACHABLE",
          "detail": "Details: net::ERR_CONNECTION_CLOSED",
          "finalDisplayedUrl": "example.com"
        },
        "fcp": 100,
        "jsonReportUrl": "jsonReportUrl",
        "lcp": 100,
        "performanceScore": 90,
        "si": 100,
        "state": "COMPLETE",
        "tbt": 100,
        "ttfb": 100,
        "tti": 100
      },
      "mobileReport": {
        "cls": 100,
        "deviceType": "DESKTOP",
        "error": {
          "code": "NOT_REACHABLE",
          "detail": "Details: net::ERR_CONNECTION_CLOSED",
          "finalDisplayedUrl": "example.com"
        },
        "fcp": 100,
        "jsonReportUrl": "jsonReportUrl",
        "lcp": 100,
        "performanceScore": 90,
        "si": 100,
        "state": "COMPLETE",
        "tbt": 100,
        "ttfb": 100,
        "tti": 100
      },
      "region": {
        "label": "Iowa, USA",
        "value": "us-central1"
      },
      "scheduleFrequency": "DAILY",
      "url": "example.com"
    }
  }
}
```
