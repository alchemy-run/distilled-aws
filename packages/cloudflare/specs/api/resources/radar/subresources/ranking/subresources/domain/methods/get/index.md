## Get domain rank details

**get** `/radar/ranking/domain/{domain}`

Retrieves domain rank details. Cloudflare provides an ordered rank for the top 100 domains, but for the remainder it only provides ranking buckets like top 200 thousand, top one million, etc.. These are available through Radar datasets endpoints.

### Path Parameters

- `domain: string`

  Domain name.

### Query Parameters

- `date: optional array of string`

  Filters results by the specified array of dates.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `includeTopLocations: optional boolean`

  Includes top locations in the response.

- `limit: optional number`

  Limits the number of objects returned in the response.

- `name: optional array of string`

  Array of names used to label the series in the response.

- `rankingType: optional "POPULAR" or "TRENDING_RISE" or "TRENDING_STEADY"`

  The ranking type.

  - `"POPULAR"`

  - `"TRENDING_RISE"`

  - `"TRENDING_STEADY"`

### Returns

- `result: object { details_0, meta }`

  - `details_0: object { categories, bucket, rank, top_locations }`

    - `categories: array of object { id, name, superCategoryId }`

      - `id: number`

      - `name: string`

      - `superCategoryId: number`

    - `bucket: optional string`

      Only available in POPULAR ranking for the most recent ranking.

    - `rank: optional number`

    - `top_locations: optional array of object { locationCode, locationName, rank }`

      - `locationCode: string`

      - `locationName: string`

      - `rank: number`

  - `meta: object { dateRange }`

    - `dateRange: array of object { endTime, startTime }`

      - `endTime: string`

        Adjusted end of date range.

      - `startTime: string`

        Adjusted start of date range.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/ranking/domain/$DOMAIN \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "details_0": {
      "categories": [
        {
          "id": 81,
          "name": "Content Servers",
          "superCategoryId": 26
        }
      ],
      "bucket": "2000",
      "rank": 3,
      "top_locations": [
        {
          "locationCode": "US",
          "locationName": "United States",
          "rank": 1
        }
      ]
    },
    "meta": {
      "dateRange": [
        {
          "endTime": "2022-09-17T10:22:57.555Z",
          "startTime": "2022-09-16T10:22:57.555Z"
        }
      ]
    }
  },
  "success": true
}
```
