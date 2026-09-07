## List datasets

**get** `/radar/datasets`

Retrieves a list of datasets.

### Query Parameters

- `datasetType: optional "RANKING_BUCKET" or "REPORT"`

  Filters results by dataset type.

  - `"RANKING_BUCKET"`

  - `"REPORT"`

- `date: optional string`

  Filters results by the specified date.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { datasets }`

  - `datasets: array of object { id, description, meta, 3 more }`

    - `id: number`

    - `description: string`

    - `meta: unknown`

    - `tags: array of string`

    - `title: string`

    - `type: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/datasets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "datasets": [
      {
        "id": 3,
        "description": "This dataset contains a list of the op 20000 domains globally",
        "meta": {},
        "tags": [
          "global"
        ],
        "title": "Top bucket 20000 domains",
        "type": "RANKING_BUCKET"
      }
    ]
  },
  "success": true
}
```
