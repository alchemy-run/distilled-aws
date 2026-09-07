## Get all SSO connectors

**get** `/accounts/{account_id}/sso_connectors`

Lists all SSO connectors configured for the account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: optional array of object { id, created_on, email_domain, 4 more }`

  - `id: optional string`

    SSO Connector identifier tag.

  - `created_on: optional string`

    Timestamp for the creation of the SSO connector

  - `email_domain: optional string`

  - `enabled: optional boolean`

  - `updated_on: optional string`

    Timestamp for the last update of the SSO connector

  - `use_fedramp_language: optional boolean`

    Controls the display of FedRAMP language to the user during SSO login

  - `verification: optional object { code, status }`

    - `code: optional string`

      DNS verification code. Add this entire string to the DNS TXT record of the email domain to validate ownership.

    - `status: optional "awaiting" or "pending" or "failed" or "verified"`

      The status of the verification code from the verification process.

      - `"awaiting"`

      - `"pending"`

      - `"failed"`

      - `"verified"`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/sso_connectors \
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2025-01-01T12:21:02.0000Z",
      "email_domain": "example.com",
      "enabled": false,
      "updated_on": "2025-01-01T12:21:02.0000Z",
      "use_fedramp_language": false,
      "verification": {
        "code": "cloudflare_dashboard_sso=023e105f4ecef8ad9ca31a8372d0c353",
        "status": "pending"
      }
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```
