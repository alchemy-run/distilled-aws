# Cookies

## List Page Shield Cookies

**get** `/zones/{zone_id}/page_shield/cookies`

Lists all cookies collected by Page Shield.

### Path Parameters

- `zone_id: string`

  Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  The direction used to sort returned cookies.'

  - `"asc"`

  - `"desc"`

- `domain: optional string`

  Filters the returned cookies that match the specified domain attribute

- `export: optional "csv"`

  Export the list of cookies as a file, limited to 50000 entries.

  - `"csv"`

- `hosts: optional string`

  Includes cookies that match one or more URL-encoded hostnames separated by commas.

  Wildcards are supported at the start and end of each hostname to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `http_only: optional boolean`

  Filters the returned cookies that are set with HttpOnly

- `name: optional string`

  Filters the returned cookies that match the specified name.
  Wildcards are supported at the start and end to support starts with, ends with
  and contains. e.g. session*

- `order_by: optional "first_seen_at" or "last_seen_at"`

  The field used to sort returned cookies.

  - `"first_seen_at"`

  - `"last_seen_at"`

- `page: optional string`

  The current page number of the paginated results.

  We additionally support a special value "all". When "all" is used, the API will return all the cookies
  with the applied filters in a single page. This feature is best-effort and it may only work for zones with
  a low number of cookies

- `page_url: optional string`

  Includes connections that match one or more page URLs (separated by commas) where they were last seen

  Wildcards are supported at the start and end of each page URL to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `path: optional string`

  Filters the returned cookies that match the specified path attribute

- `per_page: optional number`

  The number of results per page.

- `same_site: optional "lax" or "strict" or "none"`

  Filters the returned cookies that match the specified same_site attribute

  - `"lax"`

  - `"strict"`

  - `"none"`

- `secure: optional boolean`

  Filters the returned cookies that are set with Secure

- `type: optional "first_party" or "unknown"`

  Filters the returned cookies that match the specified type attribute

  - `"first_party"`

  - `"unknown"`

### Returns

- `result: array of object { id, first_seen_at, host, 11 more }`

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

- `result_info: object { count, page, per_page, 2 more }`

  - `count: number`

    Total number of results for the requested service

  - `page: number`

    Current page within paginated list of results

  - `per_page: number`

    Number of results per page of results

  - `total_count: number`

    Total results available without any search parameters

  - `total_pages: number`

    Total number of pages

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/cookies \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": [
    {
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
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
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

## Domain Types

### Cookie List Response

- `CookieListResponse object { id, first_seen_at, host, 11 more }`

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

### Cookie Get Response

- `CookieGetResponse object { id, first_seen_at, host, 11 more }`

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
