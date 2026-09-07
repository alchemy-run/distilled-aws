# Objects

## List Objects

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects`

Lists objects in an R2 bucket. Returns object metadata including key, size, etag, last modified date, HTTP metadata, and custom metadata.

For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Query Parameters

- `cursor: optional string`

  Pagination cursor received from a previous List Objects call. Used to retrieve the next page of results.

- `delimiter: optional string`

  A single character used to group keys. All keys that contain the delimiter between the prefix and the first occurrence of the delimiter after the prefix are grouped under a single result element.

- `per_page: optional number`

  Maximum number of objects to return per page.

- `prefix: optional string`

  Restricts results to only those objects whose keys begin with the specified prefix.

- `start_after: optional string`

  Returns objects with keys that come after the specified key in lexicographic order.

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

- `result: array of object { custom_metadata, etag, http_metadata, 5 more }`

  - `custom_metadata: optional map[string]`

    Custom metadata key-value pairs associated with the object.

  - `etag: optional string`

    The entity tag for the object. In JSON list/get responses this is the raw
    hex digest (without surrounding quotes). The HTTP `ETag` response header on
    Get Object follows RFC 7232 and IS wrapped in surrounding double-quotes.

  - `http_metadata: optional object { cacheControl, cacheExpiry, contentDisposition, 3 more }`

    HTTP metadata associated with an R2 object.

    - `cacheControl: optional string`

      Specifies caching behavior for the object.

    - `cacheExpiry: optional string`

      The date and time at which the object's cache entry expires.

    - `contentDisposition: optional string`

      Specifies presentational information for the object.

    - `contentEncoding: optional string`

      Specifies the content encoding applied to the object.

    - `contentLanguage: optional string`

      The language of the object content.

    - `contentType: optional string`

      The MIME type of the object.

  - `key: optional string`

    The object key (name).

  - `last_modified: optional string`

    The date and time the object was last modified.

  - `size: optional number`

    The size of the object in bytes.

  - `ssec: optional boolean`

    Whether the object is encrypted with a customer-supplied encryption key.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { cursor, delimited, is_truncated, per_page }`

  Pagination information for list objects responses.

  - `cursor: optional string`

    Pagination cursor to use in the next List Objects call to retrieve the next page of results.

  - `delimited: optional array of string`

    Common prefixes found when a delimiter is specified. Each entry represents a group
    of keys sharing a common prefix up to the delimiter. Equivalent to S3's `CommonPrefixes`
    in `ListObjectsV2`; the field name differs because of the existing R2 API wire format.

  - `is_truncated: optional boolean`

    Whether the result was truncated. If true, use the cursor to retrieve the next page.

  - `per_page: optional number`

    The maximum number of objects returned per page.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects \
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
  "result": [
    {
      "custom_metadata": {},
      "etag": "d41d8cd98f00b204e9800998ecf8427e",
      "http_metadata": {
        "cacheControl": "max-age=3600",
        "cacheExpiry": "2024-12-31T23:59:59Z",
        "contentDisposition": "attachment; filename=\"example.jpg\"",
        "contentEncoding": "gzip",
        "contentLanguage": "en-US",
        "contentType": "image/jpeg"
      },
      "key": "path/to/my-object.txt",
      "last_modified": "2024-01-15T10:30:00Z",
      "size": 1048576,
      "ssec": false,
      "storage_class": "Standard"
    }
  ],
  "success": true,
  "result_info": {
    "cursor": "eyJrZXkiOiJwYXRoL3RvL215LW9iamVjdC50eHQifQ==",
    "delimited": [
      "path/to/",
      "another/path/"
    ],
    "is_truncated": true,
    "per_page": 20
  }
}
```

## Get Object

**get** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}`

Retrieves an object from an R2 bucket. Returns the object body along with metadata headers.

For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `object_key: string`

  The key (name) of the object to retrieve. May contain slashes for path-like keys.
  Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded
  (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

### Header Parameters

- `"cf-r2-jurisdiction": optional "default" or "eu" or "fedramp"`

  Jurisdiction where objects in this bucket are guaranteed to be stored.

  - `"default"`

  - `"eu"`

  - `"fedramp"`

- `"If-Modified-Since": optional string`

  Returns the object only if it has been modified since the specified time.
  Must be formatted as an HTTP-date (RFC 7231), e.g. `Tue, 15 Jan 2024 10:30:00 GMT`.

- `"If-None-Match": optional string`

  Returns the object only if its ETag does not match the given value.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

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

## Delete Object

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}/objects/{object_key}`

Deletes an object from an R2 bucket.

For most workloads, we recommend using R2's [S3-compatible API](https://developers.cloudflare.com/r2/api/s3/api/) or a [Worker with an R2 binding](https://developers.cloudflare.com/r2/api/workers/workers-api-reference/) instead.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `object_key: string`

  The key (name) of the object to delete. May contain slashes for path-like keys.
  Slashes (`/`) within the key MUST be sent literally and MUST NOT be percent-encoded
  (i.e. `%2F`); other reserved characters should be percent-encoded as usual.

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

- `result: object { key }`

  Result of a successful object deletion.

  - `key: optional string`

    The key (name) of the deleted object.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/objects/$OBJECT_KEY \
    -X DELETE \
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
    "key": "path/to/my-object.txt"
  },
  "success": true
}
```

## Domain Types

### Object List Response

- `ObjectListResponse object { custom_metadata, etag, http_metadata, 5 more }`

  Metadata for an R2 object.

  - `custom_metadata: optional map[string]`

    Custom metadata key-value pairs associated with the object.

  - `etag: optional string`

    The entity tag for the object. In JSON list/get responses this is the raw
    hex digest (without surrounding quotes). The HTTP `ETag` response header on
    Get Object follows RFC 7232 and IS wrapped in surrounding double-quotes.

  - `http_metadata: optional object { cacheControl, cacheExpiry, contentDisposition, 3 more }`

    HTTP metadata associated with an R2 object.

    - `cacheControl: optional string`

      Specifies caching behavior for the object.

    - `cacheExpiry: optional string`

      The date and time at which the object's cache entry expires.

    - `contentDisposition: optional string`

      Specifies presentational information for the object.

    - `contentEncoding: optional string`

      Specifies the content encoding applied to the object.

    - `contentLanguage: optional string`

      The language of the object content.

    - `contentType: optional string`

      The MIME type of the object.

  - `key: optional string`

    The object key (name).

  - `last_modified: optional string`

    The date and time the object was last modified.

  - `size: optional number`

    The size of the object in bytes.

  - `ssec: optional boolean`

    Whether the object is encrypted with a customer-supplied encryption key.

  - `storage_class: optional "Standard" or "InfrequentAccess"`

    Storage class for newly uploaded objects, unless specified otherwise.

    - `"Standard"`

    - `"InfrequentAccess"`

### Object Upload Response

- `ObjectUploadResponse object { etag, key, size, 3 more }`

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

### Object Delete Response

- `ObjectDeleteResponse object { key }`

  Result of a successful object deletion.

  - `key: optional string`

    The key (name) of the deleted object.
