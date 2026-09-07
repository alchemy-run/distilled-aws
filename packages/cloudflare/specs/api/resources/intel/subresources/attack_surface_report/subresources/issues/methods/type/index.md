## Retrieves Security Center Issue Counts by Type

**get** `/accounts/{account_id}/intel/attack-surface-report/issues/type`

Retrieves Security Center issue counts aggregated by issue type.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `dismissed: optional boolean`

- `issue_class: optional array of string`

- `"issue_class~neq": optional array of string`

- `issue_type: optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `"issue_type~neq": optional array of IssueType`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

- `product: optional array of string`

- `"product~neq": optional array of string`

- `severity: optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `"severity~neq": optional array of SeverityQueryParam`

  - `"low"`

  - `"moderate"`

  - `"critical"`

- `subject: optional array of string`

- `"subject~neq": optional array of string`

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

- `result: optional array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues/type \
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
      "count": 1,
      "value": "value"
    }
  ]
}
```
