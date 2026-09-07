# Settings

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

# Block Senders

## List blocked email senders

**get** `/accounts/{account_id}/email-security/settings/block_senders`

Returns a paginated list of blocked email sender patterns. These patterns prevent emails from matching senders from being delivered. Supports filtering by pattern type and searching across patterns.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `order: optional "pattern" or "created_at"`

  Field to sort by.

  - `"pattern"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `pattern: optional string`

  Filter by pattern value.

- `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Filter by pattern type.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `search: optional string`

  Search term for filtering records. Behavior may change.

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

- `result: optional array of object { id, comments, created_at, 5 more }`

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders \
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
      "comments": "Block sender with email test@example.com",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "is_regex": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "test@example.com",
      "pattern_type": "EMAIL"
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

## Get a blocked email sender

**get** `/accounts/{account_id}/email-security/settings/block_senders/{pattern_id}`

Retrieves details for a specific blocked sender pattern including its pattern type, value, and metadata.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  Blocked sender pattern identifier

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

- `result: optional object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders/$PATTERN_ID \
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
    "comments": "Block sender with email test@example.com",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "test@example.com",
    "pattern_type": "EMAIL"
  }
}
```

## Create blocked email sender

**post** `/accounts/{account_id}/email-security/settings/block_senders`

Creates a new blocked sender pattern. Emails matching this pattern will be blocked from delivery. Patterns can be email addresses, domains, or IP addresses, and support regular expressions.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `is_regex: boolean`

- `pattern: string`

- `pattern_type: "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Type of pattern matching.
  Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

- `comments: optional string`

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

- `result: optional object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "is_regex": false,
          "pattern": "test@example.com",
          "pattern_type": "EMAIL",
          "comments": "Block sender with email test@example.com"
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
    "comments": "Block sender with email test@example.com",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "test@example.com",
    "pattern_type": "EMAIL"
  }
}
```

## Update a blocked email sender

**patch** `/accounts/{account_id}/email-security/settings/block_senders/{pattern_id}`

Updates an existing blocked sender pattern. Only provided fields will be modified. The pattern will continue blocking emails until deleted.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  Blocked sender pattern identifier

### Body Parameters

- `comments: optional string`

- `is_regex: optional boolean`

- `pattern: optional string`

- `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

  Type of pattern matching.
  Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

  - `"EMAIL"`

  - `"DOMAIN"`

  - `"IP"`

  - `"UNKNOWN"`

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

- `result: optional object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders/$PATTERN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Block sender with email test@example.com",
          "pattern": "test@example.com",
          "pattern_type": "EMAIL"
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
    "comments": "Block sender with email test@example.com",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "test@example.com",
    "pattern_type": "EMAIL"
  }
}
```

## Delete a blocked email sender

**delete** `/accounts/{account_id}/email-security/settings/block_senders/{pattern_id}`

Removes a blocked sender pattern. After deletion, emails from this sender will no longer be automatically blocked based on this rule.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  Blocked sender pattern identifier

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

    Blocked sender pattern identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/block_senders/$PATTERN_ID \
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

### Block Sender List Response

- `BlockSenderListResponse object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Block Sender Get Response

- `BlockSenderGetResponse object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Block Sender Create Response

- `BlockSenderCreateResponse object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Block Sender Edit Response

- `BlockSenderEditResponse object { id, comments, created_at, 5 more }`

  A blocked sender pattern

  - `id: optional string`

    Blocked sender pattern identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

  - `pattern_type: optional "EMAIL" or "DOMAIN" or "IP" or "UNKNOWN"`

    Type of pattern matching.
    Note: UNKNOWN is deprecated and cannot be used when creating or updating policies, but may be returned for existing entries.

    - `"EMAIL"`

    - `"DOMAIN"`

    - `"IP"`

    - `"UNKNOWN"`

### Block Sender Delete Response

- `BlockSenderDeleteResponse object { id }`

  - `id: string`

    Blocked sender pattern identifier

# Domains

## List protected email domains

**get** `/accounts/{account_id}/email-security/settings/domains`

Returns a paginated list of email domains protected by Email Security. Includes domain configuration, delivery modes, and authorization status. Supports filtering by delivery mode and integration ID.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `active_delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 2 more`

  Currently active delivery mode to filter by.

  - `"DIRECT"`

  - `"BCC"`

  - `"JOURNAL"`

  - `"API"`

  - `"RETRO_SCAN"`

- `allowed_delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 2 more`

  Delivery mode to filter by.

  - `"DIRECT"`

  - `"BCC"`

  - `"JOURNAL"`

  - `"API"`

  - `"RETRO_SCAN"`

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `domain: optional array of string`

  Domain names to filter by.

- `integration_id: optional string`

  Integration ID to filter by.

- `order: optional "domain" or "created_at"`

  Field to sort by.

  - `"domain"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `search: optional string`

  Search term for filtering records. Behavior may change.

- `status: optional "pending" or "active" or "failed" or "timeout"`

  Filters response to domains with the provided status.

  - `"pending"`

  - `"active"`

  - `"failed"`

  - `"timeout"`

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

- `result: optional array of object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains \
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
      "allowed_delivery_modes": [
        "DIRECT"
      ],
      "authorization": {
        "authorized": true,
        "timestamp": "2019-12-27T18:11:19.117Z",
        "status_message": "status_message"
      },
      "created_at": "2014-01-01T05:20:00.12345Z",
      "dmarc_status": "none",
      "domain": "example.com",
      "drop_dispositions": [
        "MALICIOUS"
      ],
      "emails_processed": {
        "timestamp": "2019-12-27T18:11:19.117Z",
        "total_emails_processed": 0,
        "total_emails_processed_previous": 0
      },
      "folder": "AllItems",
      "inbox_provider": "Microsoft",
      "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "ip_restrictions": [
        "192.0.2.0/24",
        "2001:db8::/32"
      ],
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "lookback_hops": 0,
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "o365_tenant_id": "o365_tenant_id",
      "regions": [
        "GLOBAL"
      ],
      "require_tls_inbound": true,
      "require_tls_outbound": true,
      "spf_status": "none",
      "status": "pending",
      "transport": "transport"
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

## Get an email domain

**get** `/accounts/{account_id}/email-security/settings/domains/{domain_id}`

Retrieves detailed information for a specific protected email domain including its delivery configuration, SPF/DMARC status, and authorization state.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  Domain identifier

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

- `result: optional object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains/$DOMAIN_ID \
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
    "allowed_delivery_modes": [
      "DIRECT"
    ],
    "authorization": {
      "authorized": true,
      "timestamp": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dmarc_status": "none",
    "domain": "example.com",
    "drop_dispositions": [
      "MALICIOUS"
    ],
    "emails_processed": {
      "timestamp": "2019-12-27T18:11:19.117Z",
      "total_emails_processed": 0,
      "total_emails_processed_previous": 0
    },
    "folder": "AllItems",
    "inbox_provider": "Microsoft",
    "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "ip_restrictions": [
      "192.0.2.0/24",
      "2001:db8::/32"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "lookback_hops": 0,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "o365_tenant_id": "o365_tenant_id",
    "regions": [
      "GLOBAL"
    ],
    "require_tls_inbound": true,
    "require_tls_outbound": true,
    "spf_status": "none",
    "status": "pending",
    "transport": "transport"
  }
}
```

## Update an email domain

**patch** `/accounts/{account_id}/email-security/settings/domains/{domain_id}`

Updates configuration for a protected email domain. Only provided fields will be modified. Changes affect delivery mode, security settings, and regional processing.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  Domain identifier

### Body Parameters

- `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

  - `"DIRECT"`

  - `"BCC"`

  - `"JOURNAL"`

  - `"API"`

  - `"RETRO_SCAN"`

- `domain: optional string`

- `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

  - `"MALICIOUS"`

  - `"MALICIOUS-BEC"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"ENCRYPTED"`

  - `"EXTERNAL"`

  - `"UNKNOWN"`

  - `"NONE"`

- `folder: optional "AllItems" or "Inbox"`

  - `"AllItems"`

  - `"Inbox"`

- `integration_id: optional string`

- `ip_restrictions: optional array of string`

- `lookback_hops: optional number`

- `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

  - `"GLOBAL"`

  - `"AU"`

  - `"DE"`

  - `"IN"`

  - `"US"`

- `require_tls_inbound: optional boolean`

- `require_tls_outbound: optional boolean`

- `transport: optional string`

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

- `result: optional object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains/$DOMAIN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ip_restrictions": [
            "192.0.2.0/24",
            "2001:db8::/32"
          ]
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
    "allowed_delivery_modes": [
      "DIRECT"
    ],
    "authorization": {
      "authorized": true,
      "timestamp": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dmarc_status": "none",
    "domain": "example.com",
    "drop_dispositions": [
      "MALICIOUS"
    ],
    "emails_processed": {
      "timestamp": "2019-12-27T18:11:19.117Z",
      "total_emails_processed": 0,
      "total_emails_processed_previous": 0
    },
    "folder": "AllItems",
    "inbox_provider": "Microsoft",
    "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "ip_restrictions": [
      "192.0.2.0/24",
      "2001:db8::/32"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "lookback_hops": 0,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "o365_tenant_id": "o365_tenant_id",
    "regions": [
      "GLOBAL"
    ],
    "require_tls_inbound": true,
    "require_tls_outbound": true,
    "spf_status": "none",
    "status": "pending",
    "transport": "transport"
  }
}
```

## Unprotect an email domain

**delete** `/accounts/{account_id}/email-security/settings/domains/{domain_id}`

Removes email security protection from a domain. After deletion, emails for this domain will no longer be processed by Email Security. This action cannot be undone.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  Domain identifier

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

    Domain identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains/$DOMAIN_ID \
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

### Domain List Response

- `DomainListResponse object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Domain Get Response

- `DomainGetResponse object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Domain Edit Response

- `DomainEditResponse object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Domain Delete Response

- `DomainDeleteResponse object { id }`

  - `id: string`

    Domain identifier

# Impersonation Registry

## List entries in impersonation registry

**get** `/accounts/{account_id}/email-security/settings/impersonation_registry`

Returns a paginated list of protected identities in the impersonation registry. These entries define identities and email addresses to protect from impersonation attacks. Can be manually added or automatically synced from directory integrations.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `order: optional "name" or "email" or "created_at"`

  Field to sort by.

  - `"name"`

  - `"email"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

  - `"A1S_INTERNAL"`

  - `"SNOOPY-CASB_OFFICE_365"`

  - `"SNOOPY-OFFICE_365"`

  - `"SNOOPY-GOOGLE_DIRECTORY"`

- `search: optional string`

  Search term for filtering records. Behavior may change.

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

- `result: optional array of object { id, comments, created_at, 9 more }`

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry \
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
      "comments": "comments",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "directory_id": 0,
      "directory_node_id": 0,
      "email": "john.doe@example.com",
      "external_directory_node_id": "external_directory_node_id",
      "is_email_regex": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "name": "John Doe",
      "provenance": "A1S_INTERNAL"
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

## Get an impersonation registry entry

**get** `/accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}`

Retrieves details for a specific impersonation registry entry including the protected identity, email pattern, and synchronization source if directory-synced.

### Path Parameters

- `account_id: string`

  Identifier.

- `impersonation_registry_id: string`

  Impersonation registry entry identifier

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

- `result: optional object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry/$IMPERSONATION_REGISTRY_ID \
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
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
}
```

## Create impersonation registry entry

**post** `/accounts/{account_id}/email-security/settings/impersonation_registry`

Creates a new entry in the impersonation registry to protect against impersonation. Emails attempting to impersonate this identity will be flagged. Supports regex patterns for flexible email matching.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `email: string`

- `is_email_regex: boolean`

- `name: string`

- `comments: optional string`

- `directory_id: optional number`

- `directory_node_id: optional number`

- `external_directory_node_id: optional string`

- `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

  - `"A1S_INTERNAL"`

  - `"SNOOPY-CASB_OFFICE_365"`

  - `"SNOOPY-OFFICE_365"`

  - `"SNOOPY-GOOGLE_DIRECTORY"`

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

- `result: optional object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "john.doe@example.com",
          "is_email_regex": false,
          "name": "John Doe"
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
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
}
```

## Update an impersonation registry entry

**patch** `/accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}`

Updates an existing impersonation registry entry. Only provided fields will be modified. Directory-synced entries can't be updated.

### Path Parameters

- `account_id: string`

  Identifier.

- `impersonation_registry_id: string`

  Impersonation registry entry identifier

### Body Parameters

- `comments: optional string`

- `directory_id: optional number`

- `directory_node_id: optional number`

- `email: optional string`

- `external_directory_node_id: optional string`

- `is_email_regex: optional boolean`

- `name: optional string`

- `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

  - `"A1S_INTERNAL"`

  - `"SNOOPY-CASB_OFFICE_365"`

  - `"SNOOPY-OFFICE_365"`

  - `"SNOOPY-GOOGLE_DIRECTORY"`

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

- `result: optional object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry/$IMPERSONATION_REGISTRY_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "john.doe@example.com",
          "name": "John Doe"
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
    "comments": "comments",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "directory_id": 0,
    "directory_node_id": 0,
    "email": "john.doe@example.com",
    "external_directory_node_id": "external_directory_node_id",
    "is_email_regex": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "name": "John Doe",
    "provenance": "A1S_INTERNAL"
  }
}
```

## Delete an impersonation registry entry

**delete** `/accounts/{account_id}/email-security/settings/impersonation_registry/{impersonation_registry_id}`

Removes an entry from the impersonation registry. After deletion, this identity will no longer be protected from impersonation.

### Path Parameters

- `account_id: string`

  Identifier.

- `impersonation_registry_id: string`

  Impersonation registry entry identifier

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

    Impersonation registry entry identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/impersonation_registry/$IMPERSONATION_REGISTRY_ID \
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

### Impersonation Registry List Response

- `ImpersonationRegistryListResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Get Response

- `ImpersonationRegistryGetResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Create Response

- `ImpersonationRegistryCreateResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Edit Response

- `ImpersonationRegistryEditResponse object { id, comments, created_at, 9 more }`

  An impersonation registry entry

  - `id: optional string`

    Impersonation registry entry identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `directory_id: optional number`

  - `directory_node_id: optional number`

  - `email: optional string`

  - `external_directory_node_id: optional string`

  - `is_email_regex: optional boolean`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `name: optional string`

  - `provenance: optional "A1S_INTERNAL" or "SNOOPY-CASB_OFFICE_365" or "SNOOPY-OFFICE_365" or "SNOOPY-GOOGLE_DIRECTORY"`

    - `"A1S_INTERNAL"`

    - `"SNOOPY-CASB_OFFICE_365"`

    - `"SNOOPY-OFFICE_365"`

    - `"SNOOPY-GOOGLE_DIRECTORY"`

### Impersonation Registry Delete Response

- `ImpersonationRegistryDeleteResponse object { id }`

  - `id: string`

    Impersonation registry entry identifier

# Sending Domain Restrictions

## List sending domain restrictions

**get** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions`

Returns a paginated list of sending domain restrictions. These restrictions enforce TLS requirements for emails from specific domains. Mail without TLS from restricted domains will be dropped unless the subdomain is in the exclude list. Supports sorting and searching.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `order: optional "domain" or "created_at"`

  Field to sort by.

  - `"domain"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `search: optional string`

  Search term for filtering records. Behavior may change.

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

- `result: optional array of object { id, comments, created_at, 4 more }`

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions \
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
      "comments": "Enforce TLS for all mail from this domain",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "domain": "example.com",
      "exclude": [
        "subdomain.example.com"
      ],
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z"
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

## Get a sending domain restriction

**get** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}`

Retrieves details for a specific sending domain restriction including the domain requiring TLS and any excluded subdomains exempt from the TLS requirement.

### Path Parameters

- `account_id: string`

  Identifier.

- `sending_domain_restriction_id: string`

  Sending domain restriction identifier.

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

- `result: optional object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions/$SENDING_DOMAIN_RESTRICTION_ID \
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
    "comments": "Enforce TLS for all mail from this domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "exclude": [
      "subdomain.example.com"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create a sending domain restriction

**post** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions`

Creates a new sending domain restriction to enforce TLS requirements for a domain. Emails without TLS from this domain will be dropped unless the subdomain is in the exclude list.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `domain: string`

  Domain that requires TLS enforcement.

- `exclude: array of string`

  Excluded subdomains that are exempt from TLS requirements.

- `comments: optional string`

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

- `result: optional object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "domain": "example.com",
          "exclude": [
            "subdomain.example.com"
          ],
          "comments": "Enforce TLS for all mail from this domain"
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
    "comments": "Enforce TLS for all mail from this domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "exclude": [
      "subdomain.example.com"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Update a sending domain restriction

**patch** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}`

Updates an existing sending domain restriction. Only provided fields will be modified. Changes affect which domains require TLS and which subdomains are excluded.

### Path Parameters

- `account_id: string`

  Identifier.

- `sending_domain_restriction_id: string`

  Sending domain restriction identifier.

### Body Parameters

- `comments: optional string`

- `domain: optional string`

  Domain that requires TLS enforcement.

- `exclude: optional array of string`

  Excluded subdomains that are exempt from TLS requirements.

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

- `result: optional object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions/$SENDING_DOMAIN_RESTRICTION_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Enforce TLS for all mail from this domain",
          "domain": "example.com",
          "exclude": [
            "subdomain.example.com"
          ]
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
    "comments": "Enforce TLS for all mail from this domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "domain": "example.com",
    "exclude": [
      "subdomain.example.com"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete a sending domain restriction

**delete** `/accounts/{account_id}/email-security/settings/sending_domain_restrictions/{sending_domain_restriction_id}`

Removes a sending domain restriction. After deletion, TLS will no longer be enforced for emails from this domain.

### Path Parameters

- `account_id: string`

  Identifier.

- `sending_domain_restriction_id: string`

  Sending domain restriction identifier.

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

    Sending domain restriction identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/sending_domain_restrictions/$SENDING_DOMAIN_RESTRICTION_ID \
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

### Sending Domain Restriction List Response

- `SendingDomainRestrictionListResponse object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Sending Domain Restriction Get Response

- `SendingDomainRestrictionGetResponse object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Sending Domain Restriction Create Response

- `SendingDomainRestrictionCreateResponse object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Sending Domain Restriction Edit Response

- `SendingDomainRestrictionEditResponse object { id, comments, created_at, 4 more }`

  A sending domain restriction that enforces TLS (Transport Layer Security) requirements for emails from specific domains. If TLS is required, mail without TLS from the specified domain will be dropped.

  - `id: optional string`

    Sending domain restriction identifier.

  - `comments: optional string`

  - `created_at: optional string`

  - `domain: optional string`

    Domain that requires TLS enforcement.

  - `exclude: optional array of string`

    Excluded subdomains that are exempt from TLS requirements.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Sending Domain Restriction Delete Response

- `SendingDomainRestrictionDeleteResponse object { id }`

  - `id: string`

    Sending domain restriction identifier.

# Trusted Domains

## List trusted email domains

**get** `/accounts/{account_id}/email-security/settings/trusted_domains`

Returns a paginated list of trusted domain patterns. Trusted domains prevent false positives for recently registered domains and lookalike domain detections. Patterns can use regular expressions for flexible matching.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `is_recent: optional boolean`

  Filter to show only recently registered domains that are trusted to prevent triggering Suspicious or Malicious dispositions.

- `is_similarity: optional boolean`

  Filter to show only proximity domains (partner or approved domains with similar spelling to connected domains) that prevent Spoof dispositions.

- `order: optional "pattern" or "created_at"`

  Field to sort by.

  - `"pattern"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `pattern: optional string`

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `search: optional string`

  Search term for filtering records. Behavior may change.

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

- `result: optional array of object { id, comments, created_at, 6 more }`

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains \
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
      "comments": "Trusted partner domain",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "is_recent": true,
      "is_regex": false,
      "is_similarity": false,
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "pattern": "example.com"
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

## Get a trusted email domain

**get** `/accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}`

Retrieves details for a specific trusted domain pattern including its pattern value, whether it uses regex matching, and which detection types it affects.

### Path Parameters

- `account_id: string`

  Identifier.

- `trusted_domain_id: string`

  Trusted domain identifier

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

- `result: optional object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains/$TRUSTED_DOMAIN_ID \
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
    "comments": "Trusted partner domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_recent": true,
    "is_regex": false,
    "is_similarity": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "example.com"
  }
}
```

## Create trusted email domain

**post** `/accounts/{account_id}/email-security/settings/trusted_domains`

Creates a new trusted domain pattern. Use for partner domains or approved senders that should bypass recent domain registration and similarity checks. Configure whether it prevents recent domain or spoof dispositions.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `is_recent: boolean`

  Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

- `is_regex: boolean`

- `is_similarity: boolean`

  Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

- `pattern: string`

- `comments: optional string`

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

- `result: optional object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "is_recent": true,
          "is_regex": false,
          "is_similarity": false,
          "pattern": "example.com",
          "comments": "Trusted partner domain"
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
    "comments": "Trusted partner domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_recent": true,
    "is_regex": false,
    "is_similarity": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "example.com"
  }
}
```

## Update a trusted email domain

**patch** `/accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}`

Updates an existing trusted domain pattern. Only provided fields will be modified. Changes take effect for new emails matching the pattern.

### Path Parameters

- `account_id: string`

  Identifier.

- `trusted_domain_id: string`

  Trusted domain identifier

### Body Parameters

- `comments: optional string`

- `is_recent: optional boolean`

  Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

- `is_regex: optional boolean`

- `is_similarity: optional boolean`

  Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

- `pattern: optional string`

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

- `result: optional object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains/$TRUSTED_DOMAIN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Trusted partner domain",
          "is_recent": true,
          "pattern": "example.com"
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
    "comments": "Trusted partner domain",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "is_recent": true,
    "is_regex": false,
    "is_similarity": false,
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "pattern": "example.com"
  }
}
```

## Delete a trusted email domain

**delete** `/accounts/{account_id}/email-security/settings/trusted_domains/{trusted_domain_id}`

Removes a trusted domain pattern. After deletion, emails from this domain will be subject to normal recent domain and similarity checks.

### Path Parameters

- `account_id: string`

  Identifier.

- `trusted_domain_id: string`

  Trusted domain identifier

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

    Trusted domain identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/trusted_domains/$TRUSTED_DOMAIN_ID \
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

### Trusted Domain List Response

- `TrustedDomainListResponse object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Trusted Domain Get Response

- `TrustedDomainGetResponse object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Trusted Domain Create Response

- `TrustedDomainCreateResponse object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Trusted Domain Edit Response

- `TrustedDomainEditResponse object { id, comments, created_at, 6 more }`

  A trusted email domain

  - `id: optional string`

    Trusted domain identifier

  - `comments: optional string`

  - `created_at: optional string`

  - `is_recent: optional boolean`

    Select to prevent recently registered domains from triggering a Suspicious or Malicious disposition.

  - `is_regex: optional boolean`

  - `is_similarity: optional boolean`

    Select for partner or other approved domains that have similar spelling to your connected domains. Prevents listed domains from triggering a Spoof disposition.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

  - `pattern: optional string`

### Trusted Domain Delete Response

- `TrustedDomainDeleteResponse object { id }`

  - `id: string`

    Trusted domain identifier

# URL Ignore Patterns

## List URL ignore patterns

**get** `/accounts/{account_id}/email-security/settings/url_ignore_patterns`

Returns a paginated list of URL rewrite ignore patterns for the account. URLs matching these patterns will not be rewritten.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

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

- `result: optional array of object { id, created_at, pattern, 3 more }`

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/url_ignore_patterns \
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
      "created_at": "2019-12-27T18:11:19.117Z",
      "pattern": "https://example\\.com/.*",
      "comments": "Trusted internal redirect service",
      "last_modified": "2019-12-27T18:11:19.117Z",
      "modified_at": "2019-12-27T18:11:19.117Z"
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

## Get a URL ignore pattern

**get** `/accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}`

Returns a single URL rewrite ignore pattern by its identifier.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  URL ignore pattern identifier

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

- `result: optional object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/url_ignore_patterns/$PATTERN_ID \
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "pattern": "https://example\\.com/.*",
    "comments": "Trusted internal redirect service",
    "last_modified": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z"
  }
}
```

## Create a URL ignore pattern

**post** `/accounts/{account_id}/email-security/settings/url_ignore_patterns`

Creates a new URL rewrite ignore pattern. URLs matching this pattern will not be rewritten.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `pattern: string`

  Regular expression matching URLs that should not be rewritten.

- `comments: optional string`

  Optional note describing the reason for the ignore pattern.

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

- `result: optional object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/url_ignore_patterns \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "pattern": "https://example\\\\.com/.*",
          "comments": "Trusted internal redirect service"
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "pattern": "https://example\\.com/.*",
    "comments": "Trusted internal redirect service",
    "last_modified": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z"
  }
}
```

## Update a URL ignore pattern

**patch** `/accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}`

Updates an existing URL rewrite ignore pattern. Only provided fields will be modified.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  URL ignore pattern identifier

### Body Parameters

- `comments: optional string`

  Optional note describing the reason for the ignore pattern.

- `pattern: optional string`

  Regular expression matching URLs that should not be rewritten.

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

- `result: optional object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/url_ignore_patterns/$PATTERN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comments": "Trusted internal redirect service",
          "pattern": "https://example\\\\.com/.*"
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
    "created_at": "2019-12-27T18:11:19.117Z",
    "pattern": "https://example\\.com/.*",
    "comments": "Trusted internal redirect service",
    "last_modified": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z"
  }
}
```

## Delete a URL ignore pattern

**delete** `/accounts/{account_id}/email-security/settings/url_ignore_patterns/{pattern_id}`

Removes a URL rewrite ignore pattern. After deletion, URLs matching this pattern will be rewritten again.

### Path Parameters

- `account_id: string`

  Identifier.

- `pattern_id: string`

  URL ignore pattern identifier

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

    URL ignore pattern identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/url_ignore_patterns/$PATTERN_ID \
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

### URL Ignore Pattern List Response

- `URLIgnorePatternListResponse object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### URL Ignore Pattern Get Response

- `URLIgnorePatternGetResponse object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### URL Ignore Pattern Create Response

- `URLIgnorePatternCreateResponse object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### URL Ignore Pattern Edit Response

- `URLIgnorePatternEditResponse object { id, created_at, pattern, 3 more }`

  A URL ignore pattern that exempts matching URLs from being rewritten by Email Security.

  - `id: string`

    URL ignore pattern identifier

  - `created_at: string`

  - `pattern: string`

    Regular expression matching URLs that should not be rewritten.

  - `comments: optional string`

    Optional note describing the reason for the ignore pattern.

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `modified_at: optional string`

### URL Ignore Pattern Delete Response

- `URLIgnorePatternDeleteResponse object { id }`

  - `id: string`

    URL ignore pattern identifier
