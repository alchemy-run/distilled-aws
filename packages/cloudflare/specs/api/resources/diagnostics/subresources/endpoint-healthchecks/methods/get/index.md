## Get Endpoint Health Check

**get** `/accounts/{account_id}/diagnostics/endpoint-healthchecks/{id}`

Get a single Endpoint Health Check.

### Path Parameters

- `account_id: string`

  Identifier

- `id: string`

  UUID.

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

- `result: optional object { check_type, endpoint, id, name }`

  - `check_type: "icmp"`

    type of check to perform

    - `"icmp"`

  - `endpoint: string`

    the IP address of the host to perform checks against

  - `id: optional string`

    UUID.

  - `name: optional string`

    Optional name associated with this check

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/diagnostics/endpoint-healthchecks/$ID \
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
    "check_type": "icmp",
    "endpoint": "203.0.113.1",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "name": "My Endpoint"
  }
}
```
