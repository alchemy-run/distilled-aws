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
