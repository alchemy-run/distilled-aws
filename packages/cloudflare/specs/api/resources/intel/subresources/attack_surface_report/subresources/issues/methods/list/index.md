## Retrieves Security Center Issues

**get** `/accounts/{account_id}/intel/attack-surface-report/issues`

Lists all Security Center issues for the account, showing active security problems requiring attention.

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

- `page: optional number`

  Specifies the current page within paginated list of results.

- `per_page: optional number`

  Sets the number of results per page of results.

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

- `result: optional object { count, issues, page, per_page }`

  - `count: optional number`

    Indicates the total number of results.

  - `issues: optional array of object { id, dismissed, has_extended_context, 11 more }`

    - `id: optional string`

    - `dismissed: optional boolean`

    - `has_extended_context: optional boolean`

      Indicates whether the insight has a large payload that requires fetching via the context endpoint.

    - `issue_class: optional string`

    - `issue_type: optional IssueType`

      - `"compliance_violation"`

      - `"email_security"`

      - `"exposed_infrastructure"`

      - `"insecure_configuration"`

      - `"weak_authentication"`

      - `"configuration_suggestion"`

    - `payload: optional object { detection_method, zone_tag }`

      - `detection_method: optional string`

        Describes the method used to detect insight.

      - `zone_tag: optional string`

    - `resolve_link: optional string`

    - `resolve_text: optional string`

    - `severity: optional "Low" or "Moderate" or "Critical"`

      - `"Low"`

      - `"Moderate"`

      - `"Critical"`

    - `since: optional string`

    - `status: optional "active" or "resolved"`

      The current status of the insight.

      - `"active"`

      - `"resolved"`

    - `subject: optional string`

    - `timestamp: optional string`

    - `user_classification: optional "false_positive" or "accept_risk" or "other"`

      User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.

      - `"false_positive"`

      - `"accept_risk"`

      - `"other"`

  - `page: optional number`

    Specifies the current page within paginated list of results.

  - `per_page: optional number`

    Sets the number of results per page of results.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues \
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
    "count": 1,
    "issues": [
      {
        "id": "id",
        "dismissed": false,
        "has_extended_context": false,
        "issue_class": "always_use_https_not_enabled",
        "issue_type": "compliance_violation",
        "payload": {
          "detection_method": "We detected security rules referencing multiple IP addresses directly in the rules.",
          "zone_tag": "zone_tag"
        },
        "resolve_link": "resolve_link",
        "resolve_text": "resolve_text",
        "severity": "Low",
        "since": "2019-12-27T18:11:19.117Z",
        "status": "active",
        "subject": "example.com",
        "timestamp": "2019-12-27T18:11:19.117Z",
        "user_classification": "false_positive"
      }
    ],
    "page": 1,
    "per_page": 25
  }
}
```
