# Connections

## List Page Shield connections

**get** `/zones/{zone_id}/page_shield/connections`

Lists all connections detected by Page Shield.

### Path Parameters

- `zone_id: string`

  Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  The direction used to sort returned connections.

  - `"asc"`

  - `"desc"`

- `exclude_cdn_cgi: optional boolean`

  When true, excludes connections seen in a `/cdn-cgi` path from the returned connections. The default value is true.

- `exclude_urls: optional string`

  Excludes connections whose URL contains one of the URL-encoded URLs separated by commas.

- `export: optional "csv"`

  Export the list of connections as a file, limited to 50000 entries.

  - `"csv"`

- `hosts: optional string`

  Includes connections that match one or more URL-encoded hostnames separated by commas.

  Wildcards are supported at the start and end of each hostname to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `order_by: optional "first_seen_at" or "last_seen_at"`

  The field used to sort returned connections.

  - `"first_seen_at"`

  - `"last_seen_at"`

- `page: optional string`

  The current page number of the paginated results.

  We additionally support a special value "all". When "all" is used, the API will return all the connections
  with the applied filters in a single page. This feature is best-effort and it may only work for zones with
  a low number of connections

- `page_url: optional string`

  Includes connections that match one or more page URLs (separated by commas) where they were last seen

  Wildcards are supported at the start and end of each page URL to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `per_page: optional number`

  The number of results per page.

- `prioritize_malicious: optional boolean`

  When true, malicious connections appear first in the returned connections.

- `status: optional string`

  Filters the returned connections using a comma-separated list of connection statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`.

- `urls: optional string`

  Includes connections whose URL contain one or more URL-encoded URLs separated by commas.

### Returns

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

- `result: optional array of Connection`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/connections \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
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
  ],
  "result": [
    {
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
    }
  ]
}
```

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

## Domain Types

### Connection

- `Connection object { id, added_at, first_seen_at, 10 more }`

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
