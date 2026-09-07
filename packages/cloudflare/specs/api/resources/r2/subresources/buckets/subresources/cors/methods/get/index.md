## Get Bucket CORS Policy

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/cors`

Get the CORS policy for a bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { rules }`

  - `rules: optional array of object { allowed, id, exposeHeaders, maxAgeSeconds }`

    - `allowed: object { methods, origins, headers }`

      Object specifying allowed origins, methods and headers for this CORS rule.

      - `methods: array of "GET" or "PUT" or "POST" or 2 more`

        Specifies the value for the Access-Control-Allow-Methods header R2 sets when requesting objects in a bucket from a browser.

        - `"GET"`

        - `"PUT"`

        - `"POST"`

        - `"DELETE"`

        - `"HEAD"`

      - `origins: array of string`

        Specifies the value for the Access-Control-Allow-Origin header R2 sets when requesting objects in a bucket from a browser.

      - `headers: optional array of string`

        Specifies the value for the Access-Control-Allow-Headers header R2 sets when requesting objects in this bucket from a browser. Cross-origin requests that include custom headers (e.g. x-user-id) should specify these headers as AllowedHeaders.

    - `id: optional string`

      Identifier for this rule.

    - `exposeHeaders: optional array of string`

      Specifies the headers that can be exposed back, and accessed by, the JavaScript making the cross-origin request. If you need to access headers beyond the safelisted response headers, such as Content-Encoding or cf-cache-status, you must specify it here.

    - `maxAgeSeconds: optional number`

      Specifies the amount of time (in seconds) browsers are allowed to cache CORS preflight responses. Browsers may limit this to 2 hours or less, even if the maximum value (86400) is specified.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/cors \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
    "string"
  ],
  "result": {
    "rules": [
      {
        "allowed": {
          "methods": [
            "GET"
          ],
          "origins": [
            "http://localhost:3000"
          ],
          "headers": [
            "x-requested-by"
          ]
        },
        "id": "Allow Local Development",
        "exposeHeaders": [
          "Content-Encoding"
        ],
        "maxAgeSeconds": 3600
      }
    ]
  },
  "success": true
}
```
