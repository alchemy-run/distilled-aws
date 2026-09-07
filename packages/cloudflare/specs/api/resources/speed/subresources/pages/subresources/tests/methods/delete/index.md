## Delete all page tests

**delete** `/zones/{zone_id}/speed_api/pages/{url}/tests`

Deletes all tests for a specific webpage from a specific region. Deleted tests are still counted as part of the quota.

### Path Parameters

- `zone_id: string`

  Identifier.

- `url: string`

  A URL.

### Query Parameters

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

- `result: optional object { count }`

  - `count: optional number`

    Number of items affected.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/speed_api/pages/$URL/tests \
    -X DELETE \
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
    "count": 1
  }
}
```
