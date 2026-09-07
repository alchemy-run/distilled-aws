# Sinkholes

## List sinkholes owned by this account

**get** `/accounts/{account_id}/intel/sinkholes`

Lists sinkholes owned by the account for redirecting malicious traffic.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional array of Sinkhole`

  - `id: optional string`

    The unique identifier for the sinkhole.

  - `account_tag: optional string`

    The account tag that owns this sinkhole.

  - `created_on: optional string`

    The date and time when the sinkhole was created.

  - `modified_on: optional string`

    The date and time when the sinkhole was last modified.

  - `name: optional string`

    The name of the sinkhole.

  - `r2_bucket: optional string`

    The name of the R2 bucket to store results.

  - `r2_id: optional string`

    The id of the R2 instance.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/sinkholes \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "result": [
    {
      "id": "93defa6e909e464e8c89a85859f36d3c",
      "account_tag": "233f45e61fd1f7e21e1e154ede4q2859",
      "created_on": "2023-05-12T12:21:56.777653Z",
      "modified_on": "2023-06-18T03:13:34.123321Z",
      "name": "my_sinkhole",
      "r2_bucket": "my_bucket",
      "r2_id": "example_r2_id"
    }
  ]
}
```

## Domain Types

### Sinkhole

- `Sinkhole object { id, account_tag, created_on, 4 more }`

  - `id: optional string`

    The unique identifier for the sinkhole.

  - `account_tag: optional string`

    The account tag that owns this sinkhole.

  - `created_on: optional string`

    The date and time when the sinkhole was created.

  - `modified_on: optional string`

    The date and time when the sinkhole was last modified.

  - `name: optional string`

    The name of the sinkhole.

  - `r2_bucket: optional string`

    The name of the R2 bucket to store results.

  - `r2_id: optional string`

    The id of the R2 instance.
