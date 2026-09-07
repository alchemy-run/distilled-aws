## Upload Object

**put** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}`

Uploads an object to an R2 bucket. The object body is provided as the request body. Returns metadata about the uploaded object.

The maximum upload size for this endpoint is 300 MB. For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `object_key: string`

  The key (name) to assign to the object. May contain slashes for path-like keys.
  Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded
  (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

- `"cf-r2-storage-class": optional "Standard" or "InfrequentAccess"`

  Storage class for newly uploaded objects, unless specified otherwise.

  - `"Standard"`

  - `"InfrequentAccess"`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of string`

- `result: object { etag, key, size, 3 more }`

  Result of a successful object upload.

  - `etag: optional string`

    The entity tag for the uploaded object.

  - `key: optional string`

    The key (name) of the uploaded object.

  - `size: optional string`

    The size of the uploaded object in bytes (as a string).

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

  - `uploaded: optional string`

    The date and time the object was uploaded.

  - `version: optional string`

    The version UUID of the uploaded object.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
    -X PUT \
    -H 'Content-Type: application/octet-stream' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -F 'body=@/path/to/body'
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
    "etag": "d41d8cd98f00b204e9800998ecf8427e",
    "key": "path/to/my-object.txt",
    "size": "1048576",
    "storage_class": "Standard",
    "uploaded": "2024-01-15T10:30:00Z",
    "version": "3fd5b4a8-1234-5678-abcd-ef0123456789"
  },
  "success": true
}
```
