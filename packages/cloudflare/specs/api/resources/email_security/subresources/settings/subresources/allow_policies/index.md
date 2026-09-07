# Allow Policies

## List email allow policies

**get** `/accounts/{account_id}/email-security/settings/allow_policies`

Returns a paginated list of email allow policies. These policies exempt matching emails from security detection, allowing them to bypass disposition actions. Supports filtering by pattern type and policy attributes.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `is_acceptable_sender: optional boolean`

  Filter to show only policies where messages from the sender are exempted from Spam, Spoof, and Bulk dispositions (not Malicious or Suspicious).

- `is_exempt_recipient: optional boolean`

  Filter to show only policies where messages to the recipient bypass all detections.

- `is_trusted_sender: optional boolean`

  Filter to show only policies where messages from the sender bypass all detections and link following.

- `order: optional "pattern" or "created_at"`

  Field to sort by.

  - `"pattern"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `pattern: optional string`

- `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Type of pattern matching.
  Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `search: optional string`

  Search term for filtering records. Behavior may change.

- `verify_sender: optional boolean`

  Filter to show only policies that enforce DMARC, SPF, or DKIM authentication.

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

- `result: optional array of object { id, created_at, last_modified, 12 more }`

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/allow_policies \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "comments": "Trust all messages send from test@example.com",
      "is_acceptable_sender": false,
      "is_exempt_recipient": false,
      "is_recipient": false,
      "is_regex": false,
      "is_sender": true,
      "is_spoof": false,
      "is_trusted_sender": true,
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "test@example.com",
      "pattern_type": "EMAIL",
      "verify_sender": true
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

## Get an email allow policy

**get** `/accounts/{account_id}/email-security/settings/allow_policies/{policy_id}`

Retrieves details for a specific allow policy including its pattern, dispositions that are exempted, and whether it applies to all detections.

### Path Parameters

- `account_id: string`

  Identifier.

- `policy_id: string`

  Allow policy identifier

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

- `result: optional object { id, created_at, last_modified, 12 more }`

  An email allow policy

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/allow_policies/$POLICY_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "comments": "Trust all messages send from test@example.com",
    "is_acceptable_sender": false,
    "is_exempt_recipient": false,
    "is_recipient": false,
    "is_regex": false,
    "is_sender": true,
    "is_spoof": false,
    "is_trusted_sender": true,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "test@example.com",
    "pattern_type": "EMAIL",
    "verify_sender": true
  }
}
```

## Create email allow policy

**post** `/accounts/{account_id}/email-security/settings/allow_policies`

Creates a new allow policy that exempts matching emails from security detections. Use with caution as this bypasses email security scanning. Policies can match on sender patterns and apply to specific detections or all detections.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `is_acceptable_sender: boolean`

  Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

- `is_exempt_recipient: boolean`

  Messages to this recipient will bypass all detections

- `is_regex: boolean`

- `is_trusted_sender: boolean`

  Messages from this sender will bypass all detections and link following

- `pattern: string`

- `pattern_type: "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Type of pattern matching.
  Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

- `verify_sender: boolean`

  Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

- `comments: optional string`

- `is_recipient: optional boolean`

  Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

- `is_sender: optional boolean`

  Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

- `is_spoof: optional boolean`

  Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

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

- `result: optional object { id, created_at, last_modified, 12 more }`

  An email allow policy

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/allow_policies \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "is_acceptable_sender": false,
          "is_exempt_recipient": false,
          "is_regex": false,
          "is_trusted_sender": true,
          "pattern": "test@example.com",
          "pattern_type": "EMAIL",
          "verify_sender": true,
          "comments": "Trust all messages send from test@example.com",
          "is_sender": true
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "comments": "Trust all messages send from test@example.com",
    "is_acceptable_sender": false,
    "is_exempt_recipient": false,
    "is_recipient": false,
    "is_regex": false,
    "is_sender": true,
    "is_spoof": false,
    "is_trusted_sender": true,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "test@example.com",
    "pattern_type": "EMAIL",
    "verify_sender": true
  }
}
```

## Update an email allow policy

**patch** `/accounts/{account_id}/email-security/settings/allow_policies/{policy_id}`

Updates an existing allow policy. Only provided fields will be modified. Changes take effect for new emails matching the pattern.

### Path Parameters

- `account_id: string`

  Identifier.

- `policy_id: string`

  Allow policy identifier

### Body Parameters

- `comments: optional string`

- `is_acceptable_sender: optional boolean`

  Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

- `is_exempt_recipient: optional boolean`

  Messages to this recipient will bypass all detections

- `is_recipient: optional boolean`

  Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

- `is_regex: optional boolean`

- `is_sender: optional boolean`

  Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

- `is_spoof: optional boolean`

  Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

- `is_trusted_sender: optional boolean`

  Messages from this sender will bypass all detections and link following

- `pattern: optional string`

- `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Type of pattern matching.
  Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

- `verify_sender: optional boolean`

  Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

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

- `result: optional object { id, created_at, last_modified, 12 more }`

  An email allow policy

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/allow_policies/$POLICY_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Trust all messages send from test@example.com",
          "is_sender": true,
          "is_trusted_sender": true,
          "pattern": "test@example.com",
          "pattern_type": "EMAIL",
          "verify_sender": true
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "comments": "Trust all messages send from test@example.com",
    "is_acceptable_sender": false,
    "is_exempt_recipient": false,
    "is_recipient": false,
    "is_regex": false,
    "is_sender": true,
    "is_spoof": false,
    "is_trusted_sender": true,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "test@example.com",
    "pattern_type": "EMAIL",
    "verify_sender": true
  }
}
```

## Delete an email allow policy

**delete** `/accounts/{account_id}/email-security/settings/allow_policies/{policy_id}`

Removes an allow policy. After deletion, emails matching this pattern will be subject to normal security scanning and disposition actions.

### Path Parameters

- `account_id: string`

  Identifier.

- `policy_id: string`

  Allow policy identifier

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

- `result: optional object { id }`

  - `id: string`

    Allow policy identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/allow_policies/$POLICY_ID \
    -X DELETE \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  }
}
```

## Domain Types

### Allow Policy List Response

- `AllowPolicyListResponse object { id, created_at, last_modified, 12 more }`

  An email allow policy

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

### Allow Policy Get Response

- `AllowPolicyGetResponse object { id, created_at, last_modified, 12 more }`

  An email allow policy

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

### Allow Policy Create Response

- `AllowPolicyCreateResponse object { id, created_at, last_modified, 12 more }`

  An email allow policy

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

### Allow Policy Edit Response

- `AllowPolicyEditResponse object { id, created_at, last_modified, 12 more }`

  An email allow policy

  - `id: string`

    Allow policy identifier

  - `created_at: string`

  - `last_modified: string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `comments: optional string`

  - `is_acceptable_sender: optional boolean`

    Messages from this sender will be exempted from Spam, Spoof and Bulk dispositions. Note - This will not exempt messages with Malicious or Suspicious dispositions.

  - `is_exempt_recipient: optional boolean`

    Messages to this recipient will bypass all detections

  - `is_recipient: optional boolean`

    Deprecated as of July 1, 2025. Use `is_exempt_recipient` instead. End of life: July 1, 2026.

  - `is_regex: optional boolean`

  - `is_sender: optional boolean`

    Deprecated as of July 1, 2025. Use `is_trusted_sender` instead. End of life: July 1, 2026.

  - `is_spoof: optional boolean`

    Deprecated as of July 1, 2025. Use `is_acceptable_sender` instead. End of life: July 1, 2026.

  - `is_trusted_sender: optional boolean`

    Messages from this sender will bypass all detections and link following

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

  - `verify_sender: optional boolean`

    Enforce DMARC, SPF or DKIM authentication. When on, Email Security only honors policies that pass authentication.

### Allow Policy Delete Response

- `AllowPolicyDeleteResponse object { id }`

  - `id: string`

    Allow policy identifier
