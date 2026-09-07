## Get a Page Shield cookie

**get** `/zones/{zone_id}/page_shield/cookies/{cookie_id}`

Fetches a cookie collected by Page Shield by cookie ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `cookie_id: string`

  Identifier

### Returns

- `result: object { id, first_seen_at, host, 11 more }`

  - `id: string`

    Identifier

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `name: string`

  - `type: "first_party" or "unknown"`

    - `"first_party"`

    - `"unknown"`

  - `domain_attribute: optional string`

  - `expires_attribute: optional string`

  - `http_only_attribute: optional boolean`

  - `max_age_attribute: optional number`

  - `page_urls: optional array of string`

  - `path_attribute: optional string`

  - `same_site_attribute: optional "lax" or "strict" or "none"`

    - `"lax"`

    - `"strict"`

    - `"none"`

  - `secure_attribute: optional boolean`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/cookies/$COOKIE_ID \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "first_seen_at": "2021-08-18T10:51:08Z",
    "host": "blog.cloudflare.com",
    "last_seen_at": "2021-09-02T09:57:54Z",
    "name": "session_id",
    "type": "first_party",
    "domain_attribute": "cloudflare.com",
    "expires_attribute": "2021-10-02T09:57:54Z",
    "http_only_attribute": true,
    "max_age_attribute": 3600,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "path_attribute": "/",
    "same_site_attribute": "strict",
    "secure_attribute": true
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
