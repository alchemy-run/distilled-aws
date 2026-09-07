# Ownership

## List PCAPs Bucket Ownership

**get** `/accounts/{account_id}/pcaps/ownership`

List all buckets configured for use with PCAPs API.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: array of Ownership`

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

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership \
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
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "9883874ecac311ec8475433579a6bf5f",
      "destination_conf": "s3://pcaps-bucket?region=us-east-1",
      "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
      "status": "success",
      "submitted": "2020-01-01T08:00:00Z",
      "validated": "2020-01-01T08:00:00Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

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

## Delete buckets for full packet captures

**delete** `/accounts/{account_id}/pcaps/ownership/{ownership_id}`

Deletes buckets added to the packet captures API.

### Path Parameters

- `account_id: string`

  Identifier.

- `ownership_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership/$OWNERSHIP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Validate buckets for full packet captures

**post** `/accounts/{account_id}/pcaps/ownership/validate`

Validates buckets added to the packet captures API.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `destination_conf: string`

  The full URI for the bucket. This field only applies to `full` packet captures.

- `ownership_challenge: string`

  The ownership challenge filename stored in the bucket.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership/validate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://pcaps-bucket?region=us-east-1",
          "ownership_challenge": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt"
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

## Domain Types

### Ownership

- `Ownership object { id, destination_conf, filename, 3 more }`

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
