## Search URL scans

**get** `/accounts/{account_id}/urlscanner/v2/search`

Use a subset of ElasticSearch Query syntax to filter scans. Some example queries:<br/> <br/>- 'path:"/bundles/jquery.js"': Searches for scans who requested resources with the given path.<br/>- 'page.asn:AS24940 AND hash:xxx': Websites hosted in AS24940 where a resource with the given hash was downloaded.<br/>- 'page.domain:microsoft* AND verdicts.malicious:true AND NOT page.domain:microsoft.com': malicious scans whose hostname starts with "microsoft".<br/>- 'apikey:me AND date:[2025-01 TO 2025-02]': my scans from 2025 January to 2025 February.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `q: optional string`

  Filter scans

- `size: optional number`

  Limit the number of objects in the response.

### Returns

- `results: array of object { _id, page, result, 3 more }`

  - `_id: string`

  - `page: object { asn, country, ip, url }`

    - `asn: string`

    - `country: string`

    - `ip: string`

    - `url: string`

  - `result: string`

  - `stats: object { dataLength, requests, uniqCountries, uniqIPs }`

    - `dataLength: number`

    - `requests: number`

    - `uniqCountries: number`

    - `uniqIPs: number`

  - `task: object { time, url, uuid, visibility }`

    - `time: string`

    - `url: string`

    - `uuid: string`

    - `visibility: string`

  - `verdicts: object { malicious }`

    - `malicious: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/search \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "results": [
    {
      "_id": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "page": {
        "asn": "AS15133",
        "country": "US",
        "ip": "93.184.215.14",
        "url": "https://example.com"
      },
      "result": "https://radar.clouflare.com/scan/9626f773-9ffb-4cfb-89d3-30b120fc8011",
      "stats": {
        "dataLength": 2512,
        "requests": 2,
        "uniqCountries": 1,
        "uniqIPs": 1
      },
      "task": {
        "time": "2024-09-30T23:54:02.881000+00:00",
        "url": "https://example.com",
        "uuid": "9626f773-9ffb-4cfb-89d3-30b120fc8011",
        "visibility": "public"
      },
      "verdicts": {
        "malicious": true
      }
    }
  ]
}
```
