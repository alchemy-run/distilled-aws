# Datasets

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

## Get dataset CSV stream

**get** `/radar/datasets/{alias}`

Retrieves the CSV content of a given dataset by alias or ID. When getting the content by alias the latest dataset is returned, optionally filtered by the latest available at a given date.

### Path Parameters

- `alias: string`

  Dataset alias or ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/datasets/$ALIAS \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Get dataset download URL

**post** `/radar/datasets/download`

Retrieves an URL to download a single dataset.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Body Parameters

- `datasetId: number`

### Returns

- `result: object { dataset }`

  - `dataset: object { url }`

    - `url: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/datasets/download \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "datasetId": 3
        }'
```

#### Response

```json
{
  "result": {
    "dataset": {
      "url": "https://example.com/download"
    }
  }
}
```

## Domain Types

### Dataset List Response

- `DatasetListResponse object { datasets }`

  - `datasets: array of object { id, description, meta, 3 more }`

    - `id: number`

    - `description: string`

    - `meta: unknown`

    - `tags: array of string`

    - `title: string`

    - `type: string`

### Dataset Get Response

- `DatasetGetResponse = string`

### Dataset Download Response

- `DatasetDownloadResponse object { dataset }`

  - `dataset: object { url }`

    - `url: string`
