# DCV Delegation

## Retrieve the DCV Delegation unique identifier.

**get** `/zones/{zone_id}/dcv_delegation/uuid`

Retrieve the account and zone specific unique identifier used as part of the CNAME target for DCV Delegation.

### Path Parameters

- `zone_id: string`

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

- `result: optional DCVDelegationUUID`

  - `uuid: optional string`

    The DCV Delegation unique identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dcv_delegation/uuid \
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
  "success": true,
  "result": {
    "uuid": "abc123def456ghi7"
  }
}
```

## Domain Types

### DCV Delegation UUID

- `DCVDelegationUUID object { uuid }`

  - `uuid: optional string`

    The DCV Delegation unique identifier.
