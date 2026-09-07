## Patch Bucket

**patch** `/accounts/{account_id}/r2/buckets/{bucket_name}`

Updates properties of an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

### Header Parameters

- `"cf-r2-storage-class": "Standard" or "InfrequentAccess"`

  Storage class for newly uploaded objects, unless specified otherwise.

  - `"Standard"`

  - `"InfrequentAccess"`

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

- `result: Bucket`

  A single R2 bucket.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME \
    -X PATCH \
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
    "creation_date": "creation_date",
    "jurisdiction": "default",
    "location": "apac",
    "name": "example-bucket",
    "storage_class": "Standard"
  },
  "success": true
}
```
