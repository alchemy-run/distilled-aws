## Add buckets for full packet captures

**post** `/accounts/{account_id}/pcaps/ownership`

Adds an AWS or GCP bucket to use with full packet captures.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `destination_conf: string`

  The full URI for the bucket. This field only applies to `full` packet captures.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: Ownership`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://pcaps-bucket?region=us-east-1"
        }'
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
  "result": {
    "id": "9883874ecac311ec8475433579a6bf5f",
    "destination_conf": "s3://pcaps-bucket?region=us-east-1",
    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "validated": "2020-01-01T08:00:00Z"
  },
  "success": true
}
```
