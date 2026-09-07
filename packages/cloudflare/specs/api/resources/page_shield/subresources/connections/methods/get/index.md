## Get a Page Shield connection

**get** `/zones/{zone_id}/page_shield/connections/{connection_id}`

Fetches a connection detected by Page Shield by connection ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `connection_id: string`

  Identifier

### Returns

- `result: Connection`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `domain_reported_malicious: optional boolean`

  - `first_page_url: optional string`

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

- `success: true`

  Whether the API call was successful

  - `true`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/connections/$CONNECTION_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "added_at": "2021-08-18T10:51:10.09615Z",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
    "url_contains_cdn_cgi_path": false,
    "domain_reported_malicious": false,
    "first_page_url": "blog.cloudflare.com/page",
    "malicious_domain_categories": [
      "Malware"
    ],
    "malicious_url_categories": [
      "Malware"
    ],
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "url_reported_malicious": false
  },
  "success": true,
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
  ]
}
```
