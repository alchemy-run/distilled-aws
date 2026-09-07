# Security Center

# Insights

## Retrieves Security Center Insights

**get** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights`

Lists all Security Center insights for the account or zone, showing security findings and recommendations.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights \
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

## Archives Security Center Insight

**put** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights/{issue_id}/dismiss`

Archives a Security Center insight for an account or zone, removing it from the active insights list while preserving historical data.

### Path Parameters

- `issue_id: string`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/$ISSUE_ID/dismiss \
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

### Insight List Response

- `InsightListResponse object { count, issues, page, per_page }`

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

### Insight Dismiss Response

- `InsightDismissResponse object { errors, messages, success }`

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

# Class

## Retrieves Security Center Insight Counts by Class

**get** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights/class`

Retrieves Security Center insight counts aggregated by classification class.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/class \
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

## Domain Types

### Class Get Response

- `ClassGetResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

# Severity

## Retrieves Security Center Insight Counts by Severity

**get** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights/severity`

Retrieves Security Center insight counts aggregated by severity level (critical, high, medium, low).

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/severity \
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

## Domain Types

### Severity Get Response

- `SeverityGetResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

# Type

## Retrieves Security Center Insight Counts by Type

**get** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights/type`

Retrieves Security Center insight counts aggregated by insight type.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/type \
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

## Domain Types

### Type Get Response

- `TypeGetResponse = array of object { count, value }`

  - `count: optional number`

  - `value: optional string`

# Audit Logs

## Retrieves account or zone Audit Log

**get** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights/audit-log`

Lists audit log entries for all Security Center insights in the account or zone, showing changes to insight status and classification.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `before: optional string`

  Filter entries changed before this timestamp (RFC 3339).

- `changed_by: optional string`

  Filter by the actor that made the change.

- `cursor: optional string`

  Opaque cursor for pagination. Use the cursor value from result_info of the previous response.

- `field_changed: optional "status" or "user_classification"`

  Filter by the field that was changed.

  - `"status"`

  - `"user_classification"`

- `order: optional "asc" or "desc"`

  Sort order for results. Use 'asc' for oldest first or 'desc' for newest first.

  - `"asc"`

  - `"desc"`

- `per_page: optional number`

  Number of results per page.

- `since: optional string`

  Filter entries changed at or after this timestamp (RFC 3339).

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

- `result: optional array of object { id, changed_at, changed_by, 6 more }`

  - `id: optional string`

    UUIDv7 identifier for the audit log entry, time-ordered.

  - `changed_at: optional string`

    The timestamp when the change occurred.

  - `changed_by: optional string`

    The actor that made the change. 'system' for automated changes, or a user identifier.

  - `current_value: optional string`

    The value of the field after the change. Null if the field was cleared.

  - `field_changed: optional "status" or "user_classification"`

    The field that was changed.

    - `"status"`

    - `"user_classification"`

  - `issue_id: optional string`

    The ID of the insight this audit log entry relates to.

  - `previous_value: optional string`

    The value of the field before the change. Null if the field was not previously set.

  - `rationale: optional string`

    Optional rationale provided for the change.

  - `zone_id: optional number`

    The zone ID associated with the insight. Only present for zone-level insights.

- `result_info: optional object { count, cursor, per_page }`

  - `count: optional number`

    The number of items in the current result set.

  - `cursor: optional string`

    Opaque cursor for the next page of results. Absent when there are no more results.

  - `per_page: optional number`

    The requested number of items per page.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/audit-log \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "changed_at": "2019-12-27T18:11:19.117Z",
      "changed_by": "system",
      "current_value": "current_value",
      "field_changed": "status",
      "issue_id": "issue_id",
      "previous_value": "previous_value",
      "rationale": "rationale",
      "zone_id": 0
    }
  ],
  "result_info": {
    "count": 25,
    "cursor": "cursor",
    "per_page": 25
  }
}
```

## Retrieves Issue Audit Log

**get** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights/{issue_id}/audit-log`

Lists audit log entries for a specific Security Center insight, showing changes to its status and classification over time.

### Path Parameters

- `issue_id: string`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `before: optional string`

  Filter entries changed before this timestamp (RFC 3339).

- `changed_by: optional string`

  Filter by the actor that made the change.

- `cursor: optional string`

  Opaque cursor for pagination. Use the cursor value from result_info of the previous response.

- `field_changed: optional "status" or "user_classification"`

  Filter by the field that was changed.

  - `"status"`

  - `"user_classification"`

- `order: optional "asc" or "desc"`

  Sort order for results. Use 'asc' for oldest first or 'desc' for newest first.

  - `"asc"`

  - `"desc"`

- `per_page: optional number`

  Number of results per page.

- `since: optional string`

  Filter entries changed at or after this timestamp (RFC 3339).

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

- `result: optional array of object { id, changed_at, changed_by, 6 more }`

  - `id: optional string`

    UUIDv7 identifier for the audit log entry, time-ordered.

  - `changed_at: optional string`

    The timestamp when the change occurred.

  - `changed_by: optional string`

    The actor that made the change. 'system' for automated changes, or a user identifier.

  - `current_value: optional string`

    The value of the field after the change. Null if the field was cleared.

  - `field_changed: optional "status" or "user_classification"`

    The field that was changed.

    - `"status"`

    - `"user_classification"`

  - `issue_id: optional string`

    The ID of the insight this audit log entry relates to.

  - `previous_value: optional string`

    The value of the field before the change. Null if the field was not previously set.

  - `rationale: optional string`

    Optional rationale provided for the change.

  - `zone_id: optional number`

    The zone ID associated with the insight. Only present for zone-level insights.

- `result_info: optional object { count, cursor, per_page }`

  - `count: optional number`

    The number of items in the current result set.

  - `cursor: optional string`

    Opaque cursor for the next page of results. Absent when there are no more results.

  - `per_page: optional number`

    The requested number of items per page.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/$ISSUE_ID/audit-log \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "changed_at": "2019-12-27T18:11:19.117Z",
      "changed_by": "system",
      "current_value": "current_value",
      "field_changed": "status",
      "issue_id": "issue_id",
      "previous_value": "previous_value",
      "rationale": "rationale",
      "zone_id": 0
    }
  ],
  "result_info": {
    "count": 25,
    "cursor": "cursor",
    "per_page": 25
  }
}
```

## Domain Types

### Audit Log List Response

- `AuditLogListResponse object { id, changed_at, changed_by, 6 more }`

  - `id: optional string`

    UUIDv7 identifier for the audit log entry, time-ordered.

  - `changed_at: optional string`

    The timestamp when the change occurred.

  - `changed_by: optional string`

    The actor that made the change. 'system' for automated changes, or a user identifier.

  - `current_value: optional string`

    The value of the field after the change. Null if the field was cleared.

  - `field_changed: optional "status" or "user_classification"`

    The field that was changed.

    - `"status"`

    - `"user_classification"`

  - `issue_id: optional string`

    The ID of the insight this audit log entry relates to.

  - `previous_value: optional string`

    The value of the field before the change. Null if the field was not previously set.

  - `rationale: optional string`

    Optional rationale provided for the change.

  - `zone_id: optional number`

    The zone ID associated with the insight. Only present for zone-level insights.

### Audit Log List By Insight Response

- `AuditLogListByInsightResponse object { id, changed_at, changed_by, 6 more }`

  - `id: optional string`

    UUIDv7 identifier for the audit log entry, time-ordered.

  - `changed_at: optional string`

    The timestamp when the change occurred.

  - `changed_by: optional string`

    The actor that made the change. 'system' for automated changes, or a user identifier.

  - `current_value: optional string`

    The value of the field after the change. Null if the field was cleared.

  - `field_changed: optional "status" or "user_classification"`

    The field that was changed.

    - `"status"`

    - `"user_classification"`

  - `issue_id: optional string`

    The ID of the insight this audit log entry relates to.

  - `previous_value: optional string`

    The value of the field before the change. Null if the field was not previously set.

  - `rationale: optional string`

    Optional rationale provided for the change.

  - `zone_id: optional number`

    The zone ID associated with the insight. Only present for zone-level insights.

# Classification

## Updates Security Center Insight Classification

**patch** `/{accounts_or_zones}/{account_or_zone_id}/security-center/insights/{issue_id}/classification`

Updates the user classification for a Security Center insight. Valid values are 'false_positive' or 'accept_risk'. To reset, set classification to null. Cannot change directly between classification values - must reset to null first.

### Path Parameters

- `issue_id: string`

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `classification: optional "false_positive" or "accept_risk" or "other"`

  User-defined classification for the insight. Can be 'false_positive', 'accept_risk', 'other', or null.

  - `"false_positive"`

  - `"accept_risk"`

  - `"other"`

- `rationale: optional string`

  Rationale for the classification change. Required when classification is 'accept_risk' or 'other'.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/security-center/insights/$ISSUE_ID/classification \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "classification": "false_positive"
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
  "success": true
}
```

## Domain Types

### Classification Update Response

- `ClassificationUpdateResponse object { errors, messages, success }`

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

# Context

## Retrieves Security Center Insight Context

**get** `/accounts/{account_id}/security-center/insights/{issue_id}/context`

Returns the full context payload for an insight. This endpoint is used for insights with large payloads that are not included inline in the list response.

### Path Parameters

- `account_id: string`

  Identifier.

- `issue_id: string`

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

- `result: optional map[unknown]`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/security-center/insights/$ISSUE_ID/context \
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
    "foo": "bar"
  }
}
```

## Domain Types

### Context Get Response

- `ContextGetResponse = map[unknown]`
