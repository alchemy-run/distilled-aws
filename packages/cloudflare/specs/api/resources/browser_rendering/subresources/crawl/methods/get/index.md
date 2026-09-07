## Get crawl result.

**get** `/accounts/{account_id}/browser-rendering/crawl/{job_id}`

Returns the result of a crawl job.

### Path Parameters

- `account_id: string`

  Account ID.

- `job_id: string`

  Crawl job ID.

### Query Parameters

- `cacheTTL: optional number`

  Cache TTL default is 5s. Set to 0 to disable.

- `cursor: optional number`

  Cursor for pagination.

- `limit: optional number`

  Limit for pagination.

- `status: optional "queued" or "errored" or "completed" or 3 more`

  Filter by URL status.

  - `"queued"`

  - `"errored"`

  - `"completed"`

  - `"disallowed"`

  - `"skipped"`

  - `"cancelled"`

### Returns

- `result: object { id, browserSecondsUsed, finished, 5 more }`

  - `id: string`

    Crawl job ID.

  - `browserSecondsUsed: number`

    Total seconds spent in browser so far.

  - `finished: number`

    Total number of URLs that have been crawled so far.

  - `records: array of object { metadata, status, url, 3 more }`

    List of crawl job records.

    - `metadata: object { status, url, title }`

      - `status: number`

        HTTP status code of the crawled page.

      - `url: string`

        Final URL of the crawled page.

      - `title: optional string`

        Title of the crawled page.

    - `status: "queued" or "errored" or "completed" or 3 more`

      Current status of the crawled URL.

      - `"queued"`

      - `"errored"`

      - `"completed"`

      - `"disallowed"`

      - `"skipped"`

      - `"cancelled"`

    - `url: string`

      Crawled URL.

    - `html: optional string`

      HTML content of the crawled URL.

    - `json: optional map[unknown]`

      JSON of the content of the crawled URL.

    - `markdown: optional string`

      Markdown of the content of the crawled URL.

  - `skipped: number`

    Total number of URLs that were skipped due to include/exclude/subdomain filters. Skipped URLs are included in records but are not counted toward total/finished.

  - `status: string`

    Current crawl job status.

  - `total: number`

    Total current number of URLs in the crawl job.

  - `cursor: optional string`

    Cursor for pagination.

- `success: boolean`

  Response status.

- `errors: optional array of object { code, message }`

  - `code: number`

    Error code.

  - `message: string`

    Error message.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/crawl/$JOB_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "browserSecondsUsed": 0,
    "finished": 0,
    "records": [
      {
        "metadata": {
          "status": 0,
          "url": "url",
          "title": "title"
        },
        "status": "queued",
        "url": "url",
        "html": "html",
        "json": {
          "foo": {}
        },
        "markdown": "markdown"
      }
    ],
    "skipped": 0,
    "status": "status",
    "total": 0,
    "cursor": "cursor"
  },
  "success": true,
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ]
}
```
