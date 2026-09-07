# Scripts

## List Page Shield scripts

**get** `/zones/{zone_id}/page_shield/scripts`

Lists all scripts detected by Page Shield.

### Path Parameters

- `zone_id: string`

  Identifier

### Query Parameters

- `direction: optional "asc" or "desc"`

  The direction used to sort returned scripts.

  - `"asc"`

  - `"desc"`

- `exclude_cdn_cgi: optional boolean`

  When true, excludes scripts seen in a `/cdn-cgi` path from the returned scripts. The default value is true.

- `exclude_duplicates: optional boolean`

  When true, excludes duplicate scripts. We consider a script duplicate of another if their javascript
  content matches and they share the same url host and zone hostname. In such case, we return the most
  recent script for the URL host and zone hostname combination.

- `exclude_urls: optional string`

  Excludes scripts whose URL contains one of the URL-encoded URLs separated by commas.

- `export: optional "csv"`

  Export the list of scripts as a file, limited to 50000 entries.

  - `"csv"`

- `hosts: optional string`

  Includes scripts that match one or more URL-encoded hostnames separated by commas.

  Wildcards are supported at the start and end of each hostname to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `order_by: optional "first_seen_at" or "last_seen_at"`

  The field used to sort returned scripts.

  - `"first_seen_at"`

  - `"last_seen_at"`

- `page: optional string`

  The current page number of the paginated results.

  We additionally support a special value "all". When "all" is used, the API will return all the scripts
  with the applied filters in a single page. This feature is best-effort and it may only work for zones with
  a low number of scripts

- `page_url: optional string`

  Includes scripts that match one or more page URLs (separated by commas) where they were last seen

  Wildcards are supported at the start and end of each page URL to support starts with, ends with
  and contains. If no wildcards are used, results will be filtered by exact match

- `per_page: optional number`

  The number of results per page.

- `prioritize_malicious: optional boolean`

  When true, malicious scripts appear first in the returned scripts.

- `status: optional string`

  Filters the returned scripts using a comma-separated list of scripts statuses. Accepted values: `active`, `infrequent`, and `inactive`. The default value is `active`.

- `urls: optional string`

  Includes scripts whose URL contain one or more URL-encoded URLs separated by commas.

### Returns

- `result: array of Script`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/scripts \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "added_at": "2021-08-18T10:51:10.09615Z",
      "first_seen_at": "2021-08-18T10:51:08Z",
      "host": "blog.cloudflare.com",
      "last_seen_at": "2021-09-02T09:57:54Z",
      "url": "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/js/bootstrap.min.js",
      "url_contains_cdn_cgi_path": false,
      "cryptomining_score": 1,
      "dataflow_score": 1,
      "domain_reported_malicious": false,
      "fetched_at": "fetched_at",
      "first_page_url": "blog.cloudflare.com/page",
      "hash": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
      "js_integrity_score": 1,
      "magecart_score": 1,
      "malicious_domain_categories": [
        "Malware"
      ],
      "malicious_url_categories": [
        "Malware"
      ],
      "malware_score": 1,
      "obfuscation_score": 1,
      "page_urls": [
        "blog.cloudflare.com/page1",
        "blog.cloudflare.com/page2"
      ],
      "url_reported_malicious": false
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

## Get a Page Shield script

**get** `/zones/{zone_id}/page_shield/scripts/{script_id}`

Fetches a script detected by Page Shield by script ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `script_id: string`

  Identifier

### Returns

- `result: object { id, added_at, first_seen_at, 19 more }`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

  - `versions: optional array of object { cryptomining_score, dataflow_score, fetched_at, 5 more }`

    - `cryptomining_score: optional number`

      The cryptomining score of the JavaScript content.

    - `dataflow_score: optional number`

      The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

    - `fetched_at: optional string`

      The timestamp of when the script was last fetched.

    - `hash: optional string`

      The computed hash of the analyzed script.

    - `js_integrity_score: optional number`

      The integrity score of the JavaScript content.

    - `magecart_score: optional number`

      The magecart score of the JavaScript content.

    - `malware_score: optional number`

      The malware score of the JavaScript content.

    - `obfuscation_score: optional number`

      The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/scripts/$SCRIPT_ID \
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
    "cryptomining_score": 1,
    "dataflow_score": 1,
    "domain_reported_malicious": false,
    "fetched_at": "fetched_at",
    "first_page_url": "blog.cloudflare.com/page",
    "hash": "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
    "js_integrity_score": 1,
    "magecart_score": 1,
    "malicious_domain_categories": [
      "Malware"
    ],
    "malicious_url_categories": [
      "Malware"
    ],
    "malware_score": 1,
    "obfuscation_score": 1,
    "page_urls": [
      "blog.cloudflare.com/page1",
      "blog.cloudflare.com/page2"
    ],
    "url_reported_malicious": false,
    "versions": [
      {
        "cryptomining_score": 20,
        "dataflow_score": 1,
        "fetched_at": "2021-08-18T10:51:08Z",
        "hash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b423",
        "js_integrity_score": 2,
        "magecart_score": 10,
        "malware_score": 5,
        "obfuscation_score": 1
      }
    ]
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

### Script

- `Script object { id, added_at, first_seen_at, 18 more }`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

### Script Get Response

- `ScriptGetResponse object { id, added_at, first_seen_at, 19 more }`

  - `id: string`

    Identifier

  - `added_at: string`

  - `first_seen_at: string`

  - `host: string`

  - `last_seen_at: string`

  - `url: string`

  - `url_contains_cdn_cgi_path: boolean`

  - `cryptomining_score: optional number`

    The cryptomining score of the JavaScript content.

  - `dataflow_score: optional number`

    The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `domain_reported_malicious: optional boolean`

  - `fetched_at: optional string`

    The timestamp of when the script was last fetched.

  - `first_page_url: optional string`

  - `hash: optional string`

    The computed hash of the analyzed script.

  - `js_integrity_score: optional number`

    The integrity score of the JavaScript content.

  - `magecart_score: optional number`

    The magecart score of the JavaScript content.

  - `malicious_domain_categories: optional array of string`

  - `malicious_url_categories: optional array of string`

  - `malware_score: optional number`

    The malware score of the JavaScript content.

  - `obfuscation_score: optional number`

    The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

  - `page_urls: optional array of string`

  - `url_reported_malicious: optional boolean`

  - `versions: optional array of object { cryptomining_score, dataflow_score, fetched_at, 5 more }`

    - `cryptomining_score: optional number`

      The cryptomining score of the JavaScript content.

    - `dataflow_score: optional number`

      The dataflow score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.

    - `fetched_at: optional string`

      The timestamp of when the script was last fetched.

    - `hash: optional string`

      The computed hash of the analyzed script.

    - `js_integrity_score: optional number`

      The integrity score of the JavaScript content.

    - `magecart_score: optional number`

      The magecart score of the JavaScript content.

    - `malware_score: optional number`

      The malware score of the JavaScript content.

    - `obfuscation_score: optional number`

      The obfuscation score of the JavaScript content. This field has been deprecated in favour of js_integrity_score.
