## Update indicator feed data

**put** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}/snapshot`

Revises the raw data entries in a custom threat indicator feed.

Accepts both plain and gzipped STIX2/CRDF bodies. Gzip is
detected by RFC 1952 magic bytes (`0x1f 0x8b`) and/or a `.gz`
filename suffix (case-insensitive) — either signal alone is
sufficient to trigger the gzip path; if the body is not valid
gzip, the upload fails fast. Customers are encouraged to gzip
larger uploads — the api-gateway 500 MB body cap applies to
the on-the-wire (compressed) size, so gzip lets a single
upload carry several GiB of decompressed STIX.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { file_id, filename, status }`

  - `file_id: optional number`

    Feed id

  - `filename: optional string`

    Name of the file unified in our system

  - `status: optional string`

    Current status of upload, should be unified

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/snapshot \
    -X PUT \
    -H 'Content-Type: multipart/form-data' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -F source=@/Users/me/test.stix2.gz
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "success": true,
  "result": {
    "file_id": 1,
    "filename": "snapshot_file.unified",
    "status": "unified"
  }
}
```
