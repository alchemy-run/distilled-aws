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
