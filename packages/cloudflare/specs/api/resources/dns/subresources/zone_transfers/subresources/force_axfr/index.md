# Force AXFR

## Force AXFR

**post** `/zones/{zone_id}/secondary_dns/force_axfr`

Sends AXFR zone transfer request to primary nameserver(s).

### Path Parameters

- `zone_id: string`

### Body Parameters

- `body: unknown`

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

- `result: optional ForceAXFR`

  When force_axfr query parameter is set to true, the response is a simple string.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/secondary_dns/force_axfr \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": "OK"
}
```

## Domain Types

### Force AXFR

- `ForceAXFR = string`

  When force_axfr query parameter is set to true, the response is a simple string.
