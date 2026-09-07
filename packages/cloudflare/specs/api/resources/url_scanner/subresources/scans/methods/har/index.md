## Get URL scan's HAR

**get** `/accounts/{account_id}/urlscanner/v2/har/{scan_id}`

Get a URL scan's HAR file. See HAR spec at http://www.softwareishard.com/blog/har-12-spec/.

### Path Parameters

- `account_id: string`

  Account ID.

- `scan_id: string`

  Scan UUID.

### Returns

- `log: object { creator, entries, pages, version }`

  - `creator: object { comment, name, version }`

    - `comment: string`

    - `name: string`

    - `version: string`

  - `entries: array of object { _initialPriority, _initiator_type, _priority, 11 more }`

    - `_initialPriority: string`

    - `_initiator_type: string`

    - `_priority: string`

    - `_requestId: string`

    - `_requestTime: number`

    - `_resourceType: string`

    - `cache: unknown`

    - `connection: string`

    - `pageref: string`

    - `request: object { bodySize, headers, headersSize, 3 more }`

      - `bodySize: number`

      - `headers: array of object { name, value }`

        - `name: string`

        - `value: string`

      - `headersSize: number`

      - `httpVersion: string`

      - `method: string`

      - `url: string`

    - `response: object { _transferSize, bodySize, content, 6 more }`

      - `_transferSize: number`

      - `bodySize: number`

      - `content: object { mimeType, size, compression }`

        - `mimeType: string`

        - `size: number`

        - `compression: optional number`

      - `headers: array of object { name, value }`

        - `name: string`

        - `value: string`

      - `headersSize: number`

      - `httpVersion: string`

      - `redirectURL: string`

      - `status: number`

      - `statusText: string`

    - `serverIPAddress: string`

    - `startedDateTime: string`

    - `time: number`

  - `pages: array of object { id, pageTimings, startedDateTime, title }`

    - `id: string`

    - `pageTimings: object { onContentLoad, onLoad }`

      - `onContentLoad: number`

      - `onLoad: number`

    - `startedDateTime: string`

    - `title: string`

  - `version: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/har/$SCAN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "log": {
    "creator": {
      "comment": "https://github.com/sitespeedio/chrome-har",
      "name": "chrome-har",
      "version": "0.13.1"
    },
    "entries": [
      {
        "_initialPriority": "VeryHigh",
        "_initiator_type": "other",
        "_priority": "VeryHigh",
        "_requestId": "DDC779F0CB3746BAF283EC1A51B0F2F8",
        "_requestTime": 114135.331081,
        "_resourceType": "document",
        "cache": {},
        "connection": "33",
        "pageref": "page_1",
        "request": {
          "bodySize": 0,
          "headers": [
            {
              "name": "Upgrade-Insecure-Requests",
              "value": "1"
            }
          ],
          "headersSize": 197,
          "httpVersion": "http/1.1",
          "method": "GET",
          "url": "http://example.com/"
        },
        "response": {
          "_transferSize": 1071,
          "bodySize": 648,
          "content": {
            "mimeType": "text/html",
            "size": 1256,
            "compression": 608
          },
          "headers": [
            {
              "name": "Content-Encoding",
              "value": "gzip"
            }
          ],
          "headersSize": 423,
          "httpVersion": "http/1.1",
          "redirectURL": "redirectURL",
          "status": 200,
          "statusText": "OK"
        },
        "serverIPAddress": "2606:2800:220:1:248:1893:25c8:1946",
        "startedDateTime": "2023-05-03T17:05:13.196Z",
        "time": 268.64
      }
    ],
    "pages": [
      {
        "id": "page_1",
        "pageTimings": {
          "onContentLoad": 305.408,
          "onLoad": 305.169
        },
        "startedDateTime": "2023-05-03T17:05:13.195Z",
        "title": "http://example.com/"
      }
    ],
    "version": "1.2"
  }
}
```
