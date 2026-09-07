# LOA Documents

## Download LOA Document

**get** `/accounts/{account_id}/addressing/loa_documents/{loa_document_id}/download`

Download specified LOA document under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `loa_document_id: string`

  Identifier for the uploaded LOA document.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/loa_documents/$LOA_DOCUMENT_ID/download \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

## Upload LOA Document

**post** `/accounts/{account_id}/addressing/loa_documents`

Submit LOA document (pdf format) under the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

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

- `result: optional object { id, account_id, auto_generated, 5 more }`

  - `id: optional string`

    Identifier for the uploaded LOA document.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `auto_generated: optional boolean`

    Whether the LOA has been auto-generated for the prefix owner by Cloudflare.

  - `created: optional string`

  - `filename: optional string`

    Name of LOA document. Max file size 10MB, and supported filetype is pdf.

  - `size_bytes: optional number`

    File size of the uploaded LOA document.

  - `verified: optional boolean`

    Whether the LOA has been verified by Cloudflare staff.

  - `verified_at: optional string`

    Timestamp of the moment the LOA was marked as validated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/loa_documents \
    -H 'Content-Type: multipart/form-data' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -F loa_document=@document.pdf
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
    "id": "d933b1530bc56c9953cf8ce166da8004",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "auto_generated": true,
    "created": "2014-01-01T05:20:00.12345Z",
    "filename": "site_loa_doc.pdf",
    "size_bytes": 444,
    "verified": true,
    "verified_at": "2019-12-27T18:11:19.117Z"
  }
}
```

## Domain Types

### LOA Document Create Response

- `LOADocumentCreateResponse object { id, account_id, auto_generated, 5 more }`

  - `id: optional string`

    Identifier for the uploaded LOA document.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `auto_generated: optional boolean`

    Whether the LOA has been auto-generated for the prefix owner by Cloudflare.

  - `created: optional string`

  - `filename: optional string`

    Name of LOA document. Max file size 10MB, and supported filetype is pdf.

  - `size_bytes: optional number`

    File size of the uploaded LOA document.

  - `verified: optional boolean`

    Whether the LOA has been verified by Cloudflare staff.

  - `verified_at: optional string`

    Timestamp of the moment the LOA was marked as validated.
