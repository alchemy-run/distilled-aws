# Agent Readiness

## Get agent readiness summary

**get** `/radar/agent_readiness/summary/{dimension}`

Returns a summary of AI agent readiness scores across scanned domains, grouped by the specified dimension. Data is sourced from weekly bulk scans. All values are raw domain counts.

### Path Parameters

- `dimension: "CHECK"`

  Specifies the agent readiness data dimension by which to group the results.

  - `"CHECK"`

### Query Parameters

- `date: optional string`

  Filters results by the specified date.

- `domainCategory: optional array of string`

  Filters results by domain category.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `name: optional array of string`

  Array of names used to label the series in the response.

### Returns

- `result: object { meta, summary_0 }`

  - `meta: object { date, domainCategories, lastUpdated, 4 more }`

    - `date: string`

      Date of the returned scan (YYYY-MM-DD). May differ from the requested date if no scan exists for that exact date.

    - `domainCategories: array of object { name, value }`

      Available domain sub-categories with their scan counts. Use as filter options for the domainCategory parameter.

      - `name: string`

        Sub-category name.

      - `value: number`

        Number of successfully scanned domains in this sub-category.

    - `lastUpdated: string`

      Timestamp of the last dataset update.

    - `normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more`

      Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

      - `"PERCENTAGE"`

      - `"MIN0_MAX"`

      - `"MIN_MAX"`

      - `"RAW_VALUES"`

      - `"PERCENTAGE_CHANGE"`

      - `"ROLLING_AVERAGE"`

      - `"OVERLAPPED_PERCENTAGE"`

      - `"RATIO"`

    - `successfulDomains: number`

      Domains successfully scanned (excludes errors).

    - `totalDomains: number`

      Total domains attempted in the scan.

    - `units: array of object { name, value }`

      Measurement units for the results.

      - `name: string`

      - `value: string`

  - `summary_0: map[string]`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/agent_readiness/summary/$DIMENSION \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "meta": {
      "date": "2026-03-24",
      "domainCategories": [
        {
          "name": "News & Media",
          "value": 0
        }
      ],
      "lastUpdated": "2019-12-27T18:11:19.117Z",
      "normalization": "PERCENTAGE",
      "successfulDomains": 0,
      "totalDomains": 0,
      "units": [
        {
          "name": "*",
          "value": "requests"
        }
      ]
    },
    "summary_0": {
      "markdownNegotiation": "45000",
      "robotsTxt": "280000"
    }
  },
  "success": true
}
```

## Domain Types

### Agent Readiness Summary Response

- `AgentReadinessSummaryResponse object { meta, summary_0 }`

  - `meta: object { date, domainCategories, lastUpdated, 4 more }`

    - `date: string`

      Date of the returned scan (YYYY-MM-DD). May differ from the requested date if no scan exists for that exact date.

    - `domainCategories: array of object { name, value }`

      Available domain sub-categories with their scan counts. Use as filter options for the domainCategory parameter.

      - `name: string`

        Sub-category name.

      - `value: number`

        Number of successfully scanned domains in this sub-category.

    - `lastUpdated: string`

      Timestamp of the last dataset update.

    - `normalization: "PERCENTAGE" or "MIN0_MAX" or "MIN_MAX" or 5 more`

      Normalization method applied to the results. Refer to [Normalization methods](https://developers.cloudflare.com/radar/concepts/normalization/).

      - `"PERCENTAGE"`

      - `"MIN0_MAX"`

      - `"MIN_MAX"`

      - `"RAW_VALUES"`

      - `"PERCENTAGE_CHANGE"`

      - `"ROLLING_AVERAGE"`

      - `"OVERLAPPED_PERCENTAGE"`

      - `"RATIO"`

    - `successfulDomains: number`

      Domains successfully scanned (excludes errors).

    - `totalDomains: number`

      Total domains attempted in the scan.

    - `units: array of object { name, value }`

      Measurement units for the results.

      - `name: string`

      - `value: string`

  - `summary_0: map[string]`
