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
