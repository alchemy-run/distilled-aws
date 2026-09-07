# Binary Storage

## Retrieves a file from Binary Storage

**get** `/accounts/{account_id}/cloudforce-one/binary/{hash}`

Retrieves a binary file from the Cloudforce One binary storage for analysis.

### Path Parameters

- `account_id: string`

  Account ID.

- `hash: string`

  hash of the binary

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/binary/$HASH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Posts a file to Binary Storage

**post** `/accounts/{account_id}/cloudforce-one/binary`

Uploads a binary file to Cloudforce One's binary database for malware analysis and threat intelligence correlation.

### Path Parameters

- `account_id: string`

  Account ID.

### Returns

- `content_type: string`

- `md5: string`

- `sha1: string`

- `sha256: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/binary \
    -H 'Content-Type: multipart/form-data' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'file=@/path/to/file'
```

#### Response

```json
{
  "content_type": "text/plain",
  "md5": "5d84ade76d2a8387c81175bb0cbe6492",
  "sha1": "9aff6879626d957eafadda044e4f879aae1e7278",
  "sha256": "0000a7f2692ef479e2e3d02661568882cadec451cc8a64d4e7faca29810cd626"
}
```

## Domain Types

### Binary Storage Create Response

- `BinaryStorageCreateResponse object { content_type, md5, sha1, sha256 }`

  - `content_type: string`

  - `md5: string`

  - `sha1: string`

  - `sha256: string`
