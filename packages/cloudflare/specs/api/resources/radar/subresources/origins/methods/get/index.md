## Get Origin details

**get** `/radar/origins/{slug}`

Retrieves the requested origin information with its regions.

### Path Parameters

- `slug: "AMAZON" or "GOOGLE" or "MICROSOFT" or "ORACLE"`

  Origin slug.

  - `"AMAZON"`

  - `"GOOGLE"`

  - `"MICROSOFT"`

  - `"ORACLE"`

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { origin }`

  - `origin: object { regions, slug }`

    - `regions: array of object { region }`

      - `region: string`

        The region code.

    - `slug: string`

      The origin slug.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/origins/$SLUG \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "origin": {
      "regions": [
        {
          "region": "us-east-1"
        }
      ],
      "slug": "amazon"
    }
  },
  "success": true
}
```
