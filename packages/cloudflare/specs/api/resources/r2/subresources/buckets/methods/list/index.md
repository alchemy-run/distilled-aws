## List Buckets

**get** `/accounts/{account_id}/r2/buckets`

Lists all R2 buckets on your account.

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `cursor: optional string`

  Pagination cursor received during the last List Buckets call. R2 buckets are paginated using cursors instead of page numbers.

- `direction: optional "asc" or "desc"`

  Direction to order buckets.

  - `"asc"`

  - `"desc"`

- `name_contains: optional string`

  Bucket names to filter by. Only buckets with this phrase in their name will be returned.

- `order: optional "name"`

  Field to order buckets by.

  - `"name"`

- `per_page: optional number`

  Maximum number of buckets to return in a single call.

- `start_after: optional string`

  Bucket name to start searching after. Buckets are ordered lexicographically.

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

- `result: object { buckets }`

  - `buckets: optional array of Bucket`

    - `creation_date: optional string`

      Creation timestamp.

    - `jurisdiction: optional "default" or "eu" or "fedramp"`

      Jurisdiction where objects in this bucket are guaranteed to be stored.

      - `"default"`

      - `"eu"`

      - `"fedramp"`

    - `location: optional "apac" or "eeur" or "enam" or 3 more`

      Location of the bucket.

      - `"apac"`

      - `"eeur"`

      - `"enam"`

      - `"weur"`

      - `"wnam"`

      - `"oc"`

    - `name: optional string`

      Name of the bucket.

    - `storage_class: optional "Standard" or "InfrequentAccess"`

      Storage class for newly uploaded objects, unless specified otherwise.

      - `"Standard"`

      - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { cursor, per_page }`

  - `cursor: optional string`

    A continuation token that should be used to fetch the next page of results.

  - `per_page: optional number`

    Maximum number of results on this page.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets \
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
    "buckets": [
      {
        "creation_date": "creation_date",
        "jurisdiction": "default",
        "location": "apac",
        "name": "example-bucket",
        "storage_class": "Standard"
      }
    ]
  },
  "success": true,
  "result_info": {
    "cursor": "1-JTdCJTIydiUyMiUzQTElMkMlMjJzdGFydEFmdGVyJTIyJTNBJTIyZGF2aWRwdWJsaWMlMjIlN0Q=",
    "per_page": 20
  }
}
```
