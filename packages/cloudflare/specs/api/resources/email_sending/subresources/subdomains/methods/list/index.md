## List sending subdomains

**get** `/zones/{zone_id}/email/sending/subdomains`

Lists all sending-enabled subdomains for the zone.

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

- `result: optional array of object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "enabled": true,
      "name": "sub.example.com",
      "tag": "aabbccdd11223344aabbccdd11223344",
      "created": "2014-01-02T02:20:00Z",
      "dkim_selector": "cf-bounce",
      "modified": "2014-01-02T02:20:00Z",
      "preview_enabled": true,
      "return_path_domain": "cf-bounce.sub.example.com"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
