## Get Certificate Pack Quotas

**get** `/zones/{zone_id}/ssl/certificate_packs/quota`

For a given zone, list certificate pack quotas.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { advanced }`

  - `advanced: optional object { allocated, used }`

    - `allocated: optional number`

      Quantity Allocated.

    - `used: optional number`

      Quantity Used.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ssl/certificate_packs/quota \
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
    "advanced": {
      "allocated": 0,
      "used": 0
    }
  }
}
```
