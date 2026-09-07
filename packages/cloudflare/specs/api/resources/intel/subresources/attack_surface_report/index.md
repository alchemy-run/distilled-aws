# Attack Surface Report

# Issue Types

## Retrieves Security Center Issues Types

**get** `/accounts/{account_id}/intel/attack-surface-report/issue-types`

Lists all available issue types in Security Center, describing categories of security issues.

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

- `result: optional array of string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issue-types \
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
    "string"
  ]
}
```

## Domain Types

### Issue Type Get Response

- `IssueTypeGetResponse = string`

# Issues

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

## Retrieves Security Center Issue Counts by Class

**get** `/accounts/{account_id}/intel/attack-surface-report/issues/class`

Retrieves Security Center issue counts aggregated by classification class.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues/class \
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

## Retrieves Security Center Issue Counts by Severity

**get** `/accounts/{account_id}/intel/attack-surface-report/issues/severity`

Retrieves Security Center issue counts aggregated by severity level.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/issues/severity \
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

## Archives Security Center Insight

**put** `/accounts/{account_id}/intel/attack-surface-report/{issue_id}/dismiss`

Deprecated endpoint for archiving Security Center insights. Use the newer archive-security-center-insight endpoint instead.

### Path Parameters

- `account_id: string`

  Identifier.

- `issue_id: string`

### Body Parameters

- `dismiss: optional boolean`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/attack-surface-report/$ISSUE_ID/dismiss \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "success": true
}
```

## Domain Types

### Issue Type

- `IssueType = "compliance_violation" or "email_security" or "exposed_infrastructure" or 3 more`

  - `"compliance_violation"`

  - `"email_security"`

  - `"exposed_infrastructure"`

  - `"insecure_configuration"`

  - `"weak_authentication"`

  - `"configuration_suggestion"`

### Severity Query Param

- `SeverityQueryParam = "low" or "moderate" or "critical"`

  - `"low"`

  - `"moderate"`

  - `"critical"`

### Issue List Response

- `IssueListResponse object { count, issues, page, per_page }`

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

### Issue Class Response

- `IssueClassResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Issue Severity Response

- `IssueSeverityResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Issue Type Response

- `IssueTypeResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

### Issue Dismiss Response

- `IssueDismissResponse object { errors, messages, success }`

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
