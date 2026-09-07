## Create Regional Hostname

**post** `/zones/{zone_id}/addressing/regional_hostnames`

Create a new Regional Hostname entry. Cloudflare will only use data centers that are physically located within the chosen region to decrypt and service HTTPS traffic. Learn more about [Regional Services](https://developers.cloudflare.com/data-localization/regional-services/get-started/).

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `hostname: string`

  DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

- `region_key: string`

  Identifying key for the region

- `routing: optional string`

  Configure which routing method to use for the regional hostname

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

- `result: optional object { created_on, hostname, region_key, routing }`

  - `created_on: string`

    When the regional hostname was created

  - `hostname: string`

    DNS hostname to be regionalized, must be a subdomain of the zone. Wildcards are supported for one level, e.g `*.example.com`

  - `region_key: string`

    Identifying key for the region

  - `routing: string`

    Configure which routing method to use for the regional hostname

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/addressing/regional_hostnames \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "hostname": "foo.example.com",
          "region_key": "ca",
          "routing": "dns"
        }'
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
    "created_on": "2014-01-01T05:20:00.12345Z",
    "hostname": "foo.example.com",
    "region_key": "ca",
    "routing": "dns"
  }
}
```
