## List Origins

**get** `/radar/origins`

Retrieves a list of origins with their regions.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

### Returns

- `result: object { origins }`

  - `origins: array of object { regions, slug }`

    - `regions: array of object { region }`

      - `region: string`

        The region code.

    - `slug: string`

      The origin slug.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/origins \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "origins": [
      {
        "regions": [
          {
            "region": "us-east-1"
          }
        ],
        "slug": "amazon"
      }
    ]
  },
  "success": true
}
```
