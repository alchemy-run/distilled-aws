## Remove Custom Domain From Bucket

**delete** `/accounts/{account_id}/r2/buckets/{bucket_name}/domains/custom/{domain}`

Remove custom domain registration from an existing R2 bucket.

### Path Parameters

- `account_id: string`

  Account ID.

- `bucket_name: string`

  Name of the bucket.

- `domain: string`

  Name of the custom domain.

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

- `result: object { domain }`

  - `domain: string`

    Name of the removed custom domain.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/r2/buckets/$BUCKET_NAME/domains/custom/$DOMAIN \
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
    "domain": "example-domain/custom-domain.com"
  },
  "success": true
}
```
