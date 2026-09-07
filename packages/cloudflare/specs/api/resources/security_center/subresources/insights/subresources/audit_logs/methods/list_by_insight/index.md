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
