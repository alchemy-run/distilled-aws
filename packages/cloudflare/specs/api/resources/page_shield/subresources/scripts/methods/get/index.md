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
