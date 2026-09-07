# Investigate

## Search email messages

**get** `/accounts/{account_id}/email-security/investigate`

Returns information for each email that matches the search parameter(s).

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `alert_id: optional string`

- `cursor: optional string`

- `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

  Delivery status to filter by.

  - `"delivered"`

  - `"moved"`

  - `"quarantined"`

  - `"rejected"`

  - `"deferred"`

  - `"bounced"`

  - `"queued"`

- `detections_only: optional boolean`

  Whether to include only detections in search results.

- `domain: optional string`

  Sender domains to filter by.

- `end: optional string`

  The end of the search date range. Defaults to `now`.

- `final_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

  Dispositions to filter by.

  - `"MALICIOUS"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"NONE"`

- `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

  Message actions to filter by.

  - `"PREVIEW"`

  - `"QUARANTINE_RELEASED"`

  - `"MOVED"`

- `message_id: optional string`

- `metric: optional string`

- `page: optional number`

  Deprecated: Use cursor pagination instead. End of life: November 1, 2026.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `query: optional string`

  Space-delimited search term. Case-insensitive.

- `recipient: optional string`

- `sender: optional string`

- `start: optional string`

  The beginning of the search date range. Defaults to `now - 30 days`.

- `subject: optional string`

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

- `result: array of object { id, action_log, client_recipients, 32 more }`

  - `id: string`

    Unique identifier for a message retrieved from investigation

  - `action_log: array of object { completed_at, operation, completed_timestamp, 2 more }`

    Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `completed_at: string`

      Timestamp when action completed

    - `operation: "MOVE" or "RELEASE" or "RECLASSIFY" or 3 more`

      Type of action performed

      - `"MOVE"`

      - `"RELEASE"`

      - `"RECLASSIFY"`

      - `"SUBMISSION"`

      - `"QUARANTINE_RELEASE"`

      - `"PREVIEW"`

    - `completed_timestamp: optional string`

      Deprecated, use `completed_at` instead. End of life: November 1, 2026.

    - `properties: optional object { folder, requested_by }`

      Additional properties for the action

      - `folder: optional string`

        Target folder for move operations

      - `requested_by: optional string`

        User who requested the action

    - `status: optional string`

      Status of the action

  - `client_recipients: array of string`

  - `detection_reasons: array of string`

  - `is_phish_submission: boolean`

  - `is_quarantined: boolean`

  - `postfix_id: string`

    The identifier of the message

  - `properties: object { allowlisted_pattern, allowlisted_pattern_type, blocklisted_message, 2 more }`

    Message processing properties

    - `allowlisted_pattern: optional string`

      Pattern that allowlisted this message

    - `allowlisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Type of allowlist pattern

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

    - `blocklisted_message: optional boolean`

      Whether message was blocklisted

    - `blocklisted_pattern: optional string`

      Pattern that blocklisted this message

    - `whitelisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Legacy field for allowlist pattern type

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

  - `ts: string`

    Deprecated, use `scanned_at` instead. End of life: November 1, 2026.

  - `alert_id: optional string`

  - `delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 8 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"REVIEW_SUBMISSION"`

    - `"DMARC_UNVERIFIED"`

    - `"DMARC_FAILURE_REPORT"`

    - `"DMARC_AGGREGATE_REPORT"`

    - `"THREAT_INTEL_SUBMISSION"`

    - `"SIMULATION_SUBMISSION"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `delivery_status: optional array of "delivered" or "moved" or "quarantined" or 4 more`

    - `"delivered"`

    - `"moved"`

    - `"quarantined"`

    - `"rejected"`

    - `"deferred"`

    - `"bounced"`

    - `"queued"`

  - `edf_hash: optional string`

  - `envelope_from: optional string`

  - `envelope_to: optional array of string`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

  - `findings: optional array of object { attachment, detail, detection, 6 more }`

    Deprecated, use the `findings` field from `GET /investigate/{investigate_id}/detections` instead. End of life: November 1, 2026. Detection findings for this message.

    - `attachment: optional string`

    - `detail: optional string`

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `field: optional string`

    - `name: optional string`

    - `portion: optional string`

    - `reason: optional string`

    - `score: optional number`

    - `value: optional string`

  - `from: optional string`

  - `from_name: optional string`

  - `htmltext_structure_hash: optional string`

  - `message_id: optional string`

  - `post_delivery_operations: optional array of "PREVIEW" or "QUARANTINE_RELEASE" or "SUBMISSION" or "MOVE"`

    Post-delivery operations performed on this message

    - `"PREVIEW"`

    - `"QUARANTINE_RELEASE"`

    - `"SUBMISSION"`

    - `"MOVE"`

  - `postfix_id_outbound: optional string`

  - `replyto: optional string`

  - `scanned_at: optional string`

    When the message was scanned (UTC)

  - `sent_at: optional string`

    When the message was sent (UTC)

  - `sent_date: optional string`

  - `smtp_helo_server_ip: optional string`

  - `smtp_previous_hop_ip: optional string`

  - `subject: optional string`

  - `threat_categories: optional array of string`

  - `to: optional array of string`

  - `to_name: optional array of string`

  - `validation: optional object { comment, dkim, dmarc, spf }`

    - `comment: optional string`

    - `dkim: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `dmarc: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `spf: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

  - `x_originating_ip: optional string`

- `result_info: object { count, per_page, total_count, 3 more }`

  - `count: number`

    Number of items in current page

  - `per_page: number`

    Number of items per page

  - `total_count: number`

    Deprecated: Always returns 0. End of life: November 1, 2026.

  - `next: optional string`

    Cursor for next page

  - `page: optional number`

    Deprecated: Always returns 0. End of life: November 1, 2026.

  - `previous: optional string`

    Cursor for previous page

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate \
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
  "result": [
    {
      "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
      "action_log": [
        {
          "completed_at": "2019-12-27T18:11:19.117Z",
          "operation": "MOVE",
          "completed_timestamp": "completed_timestamp",
          "properties": {
            "folder": "folder",
            "requested_by": "requested_by"
          },
          "status": "status"
        }
      ],
      "client_recipients": [
        "string"
      ],
      "detection_reasons": [
        "string"
      ],
      "is_phish_submission": true,
      "is_quarantined": true,
      "postfix_id": "4Njp3P0STMz2c02Q",
      "properties": {
        "allowlisted_pattern": "allowlisted_pattern",
        "allowlisted_pattern_type": "quarantine_release",
        "blocklisted_message": true,
        "blocklisted_pattern": "blocklisted_pattern",
        "whitelisted_pattern_type": "quarantine_release"
      },
      "ts": "ts",
      "alert_id": "alert_id",
      "delivery_mode": "DIRECT",
      "delivery_status": [
        "delivered"
      ],
      "edf_hash": "edf_hash",
      "envelope_from": "envelope_from",
      "envelope_to": [
        "string"
      ],
      "final_disposition": "MALICIOUS",
      "findings": [
        {
          "attachment": "attachment",
          "detail": "detail",
          "detection": "MALICIOUS",
          "field": "field",
          "name": "name",
          "portion": "portion",
          "reason": "reason",
          "score": 0,
          "value": "value"
        }
      ],
      "from": "from",
      "from_name": "from_name",
      "htmltext_structure_hash": "htmltext_structure_hash",
      "message_id": "message_id",
      "post_delivery_operations": [
        "PREVIEW"
      ],
      "postfix_id_outbound": "postfix_id_outbound",
      "replyto": "replyto",
      "scanned_at": "2019-12-27T18:11:19.117Z",
      "sent_at": "2019-12-27T18:11:19.117Z",
      "sent_date": "sent_date",
      "smtp_helo_server_ip": "smtp_helo_server_ip",
      "smtp_previous_hop_ip": "smtp_previous_hop_ip",
      "subject": "subject",
      "threat_categories": [
        "string"
      ],
      "to": [
        "string"
      ],
      "to_name": [
        "string"
      ],
      "validation": {
        "comment": "comment",
        "dkim": "pass",
        "dmarc": "pass",
        "spf": "pass"
      },
      "x_originating_ip": "x_originating_ip"
    }
  ],
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "next": "next",
    "page": 0,
    "previous": "previous"
  },
  "success": true
}
```

## Get message details

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}`

Retrieves comprehensive details for a specific email message including headers, recipients, sender information, and current quarantine status. Use the investigate_id from search results to fetch detailed information.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

### Query Parameters

- `submission: optional boolean`

  When true, search the submissions datastore only. When false or omitted, search the
  regular datastore only.

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

- `result: object { id, action_log, client_recipients, 32 more }`

  - `id: string`

    Unique identifier for a message retrieved from investigation

  - `action_log: array of object { completed_at, operation, completed_timestamp, 2 more }`

    Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `completed_at: string`

      Timestamp when action completed

    - `operation: "MOVE" or "RELEASE" or "RECLASSIFY" or 3 more`

      Type of action performed

      - `"MOVE"`

      - `"RELEASE"`

      - `"RECLASSIFY"`

      - `"SUBMISSION"`

      - `"QUARANTINE_RELEASE"`

      - `"PREVIEW"`

    - `completed_timestamp: optional string`

      Deprecated, use `completed_at` instead. End of life: November 1, 2026.

    - `properties: optional object { folder, requested_by }`

      Additional properties for the action

      - `folder: optional string`

        Target folder for move operations

      - `requested_by: optional string`

        User who requested the action

    - `status: optional string`

      Status of the action

  - `client_recipients: array of string`

  - `detection_reasons: array of string`

  - `is_phish_submission: boolean`

  - `is_quarantined: boolean`

  - `postfix_id: string`

    The identifier of the message

  - `properties: object { allowlisted_pattern, allowlisted_pattern_type, blocklisted_message, 2 more }`

    Message processing properties

    - `allowlisted_pattern: optional string`

      Pattern that allowlisted this message

    - `allowlisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Type of allowlist pattern

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

    - `blocklisted_message: optional boolean`

      Whether message was blocklisted

    - `blocklisted_pattern: optional string`

      Pattern that blocklisted this message

    - `whitelisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Legacy field for allowlist pattern type

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

  - `ts: string`

    Deprecated, use `scanned_at` instead. End of life: November 1, 2026.

  - `alert_id: optional string`

  - `delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 8 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"REVIEW_SUBMISSION"`

    - `"DMARC_UNVERIFIED"`

    - `"DMARC_FAILURE_REPORT"`

    - `"DMARC_AGGREGATE_REPORT"`

    - `"THREAT_INTEL_SUBMISSION"`

    - `"SIMULATION_SUBMISSION"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `delivery_status: optional array of "delivered" or "moved" or "quarantined" or 4 more`

    - `"delivered"`

    - `"moved"`

    - `"quarantined"`

    - `"rejected"`

    - `"deferred"`

    - `"bounced"`

    - `"queued"`

  - `edf_hash: optional string`

  - `envelope_from: optional string`

  - `envelope_to: optional array of string`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

  - `findings: optional array of object { attachment, detail, detection, 6 more }`

    Deprecated, use the `findings` field from `GET /investigate/{investigate_id}/detections` instead. End of life: November 1, 2026. Detection findings for this message.

    - `attachment: optional string`

    - `detail: optional string`

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `field: optional string`

    - `name: optional string`

    - `portion: optional string`

    - `reason: optional string`

    - `score: optional number`

    - `value: optional string`

  - `from: optional string`

  - `from_name: optional string`

  - `htmltext_structure_hash: optional string`

  - `message_id: optional string`

  - `post_delivery_operations: optional array of "PREVIEW" or "QUARANTINE_RELEASE" or "SUBMISSION" or "MOVE"`

    Post-delivery operations performed on this message

    - `"PREVIEW"`

    - `"QUARANTINE_RELEASE"`

    - `"SUBMISSION"`

    - `"MOVE"`

  - `postfix_id_outbound: optional string`

  - `replyto: optional string`

  - `scanned_at: optional string`

    When the message was scanned (UTC)

  - `sent_at: optional string`

    When the message was sent (UTC)

  - `sent_date: optional string`

  - `smtp_helo_server_ip: optional string`

  - `smtp_previous_hop_ip: optional string`

  - `subject: optional string`

  - `threat_categories: optional array of string`

  - `to: optional array of string`

  - `to_name: optional array of string`

  - `validation: optional object { comment, dkim, dmarc, spf }`

    - `comment: optional string`

    - `dkim: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `dmarc: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `spf: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

  - `x_originating_ip: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID \
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
  "result": {
    "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
    "action_log": [
      {
        "completed_at": "2019-12-27T18:11:19.117Z",
        "operation": "MOVE",
        "completed_timestamp": "completed_timestamp",
        "properties": {
          "folder": "folder",
          "requested_by": "requested_by"
        },
        "status": "status"
      }
    ],
    "client_recipients": [
      "string"
    ],
    "detection_reasons": [
      "string"
    ],
    "is_phish_submission": true,
    "is_quarantined": true,
    "postfix_id": "4Njp3P0STMz2c02Q",
    "properties": {
      "allowlisted_pattern": "allowlisted_pattern",
      "allowlisted_pattern_type": "quarantine_release",
      "blocklisted_message": true,
      "blocklisted_pattern": "blocklisted_pattern",
      "whitelisted_pattern_type": "quarantine_release"
    },
    "ts": "ts",
    "alert_id": "alert_id",
    "delivery_mode": "DIRECT",
    "delivery_status": [
      "delivered"
    ],
    "edf_hash": "edf_hash",
    "envelope_from": "envelope_from",
    "envelope_to": [
      "string"
    ],
    "final_disposition": "MALICIOUS",
    "findings": [
      {
        "attachment": "attachment",
        "detail": "detail",
        "detection": "MALICIOUS",
        "field": "field",
        "name": "name",
        "portion": "portion",
        "reason": "reason",
        "score": 0,
        "value": "value"
      }
    ],
    "from": "from",
    "from_name": "from_name",
    "htmltext_structure_hash": "htmltext_structure_hash",
    "message_id": "message_id",
    "post_delivery_operations": [
      "PREVIEW"
    ],
    "postfix_id_outbound": "postfix_id_outbound",
    "replyto": "replyto",
    "scanned_at": "2019-12-27T18:11:19.117Z",
    "sent_at": "2019-12-27T18:11:19.117Z",
    "sent_date": "sent_date",
    "smtp_helo_server_ip": "smtp_helo_server_ip",
    "smtp_previous_hop_ip": "smtp_previous_hop_ip",
    "subject": "subject",
    "threat_categories": [
      "string"
    ],
    "to": [
      "string"
    ],
    "to_name": [
      "string"
    ],
    "validation": {
      "comment": "comment",
      "dkim": "pass",
      "dmarc": "pass",
      "spf": "pass"
    },
    "x_originating_ip": "x_originating_ip"
  },
  "success": true
}
```

## Domain Types

### Investigate List Response

- `InvestigateListResponse object { id, action_log, client_recipients, 32 more }`

  - `id: string`

    Unique identifier for a message retrieved from investigation

  - `action_log: array of object { completed_at, operation, completed_timestamp, 2 more }`

    Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `completed_at: string`

      Timestamp when action completed

    - `operation: "MOVE" or "RELEASE" or "RECLASSIFY" or 3 more`

      Type of action performed

      - `"MOVE"`

      - `"RELEASE"`

      - `"RECLASSIFY"`

      - `"SUBMISSION"`

      - `"QUARANTINE_RELEASE"`

      - `"PREVIEW"`

    - `completed_timestamp: optional string`

      Deprecated, use `completed_at` instead. End of life: November 1, 2026.

    - `properties: optional object { folder, requested_by }`

      Additional properties for the action

      - `folder: optional string`

        Target folder for move operations

      - `requested_by: optional string`

        User who requested the action

    - `status: optional string`

      Status of the action

  - `client_recipients: array of string`

  - `detection_reasons: array of string`

  - `is_phish_submission: boolean`

  - `is_quarantined: boolean`

  - `postfix_id: string`

    The identifier of the message

  - `properties: object { allowlisted_pattern, allowlisted_pattern_type, blocklisted_message, 2 more }`

    Message processing properties

    - `allowlisted_pattern: optional string`

      Pattern that allowlisted this message

    - `allowlisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Type of allowlist pattern

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

    - `blocklisted_message: optional boolean`

      Whether message was blocklisted

    - `blocklisted_pattern: optional string`

      Pattern that blocklisted this message

    - `whitelisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Legacy field for allowlist pattern type

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

  - `ts: string`

    Deprecated, use `scanned_at` instead. End of life: November 1, 2026.

  - `alert_id: optional string`

  - `delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 8 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"REVIEW_SUBMISSION"`

    - `"DMARC_UNVERIFIED"`

    - `"DMARC_FAILURE_REPORT"`

    - `"DMARC_AGGREGATE_REPORT"`

    - `"THREAT_INTEL_SUBMISSION"`

    - `"SIMULATION_SUBMISSION"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `delivery_status: optional array of "delivered" or "moved" or "quarantined" or 4 more`

    - `"delivered"`

    - `"moved"`

    - `"quarantined"`

    - `"rejected"`

    - `"deferred"`

    - `"bounced"`

    - `"queued"`

  - `edf_hash: optional string`

  - `envelope_from: optional string`

  - `envelope_to: optional array of string`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

  - `findings: optional array of object { attachment, detail, detection, 6 more }`

    Deprecated, use the `findings` field from `GET /investigate/{investigate_id}/detections` instead. End of life: November 1, 2026. Detection findings for this message.

    - `attachment: optional string`

    - `detail: optional string`

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `field: optional string`

    - `name: optional string`

    - `portion: optional string`

    - `reason: optional string`

    - `score: optional number`

    - `value: optional string`

  - `from: optional string`

  - `from_name: optional string`

  - `htmltext_structure_hash: optional string`

  - `message_id: optional string`

  - `post_delivery_operations: optional array of "PREVIEW" or "QUARANTINE_RELEASE" or "SUBMISSION" or "MOVE"`

    Post-delivery operations performed on this message

    - `"PREVIEW"`

    - `"QUARANTINE_RELEASE"`

    - `"SUBMISSION"`

    - `"MOVE"`

  - `postfix_id_outbound: optional string`

  - `replyto: optional string`

  - `scanned_at: optional string`

    When the message was scanned (UTC)

  - `sent_at: optional string`

    When the message was sent (UTC)

  - `sent_date: optional string`

  - `smtp_helo_server_ip: optional string`

  - `smtp_previous_hop_ip: optional string`

  - `subject: optional string`

  - `threat_categories: optional array of string`

  - `to: optional array of string`

  - `to_name: optional array of string`

  - `validation: optional object { comment, dkim, dmarc, spf }`

    - `comment: optional string`

    - `dkim: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `dmarc: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `spf: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

  - `x_originating_ip: optional string`

### Investigate Get Response

- `InvestigateGetResponse object { id, action_log, client_recipients, 32 more }`

  - `id: string`

    Unique identifier for a message retrieved from investigation

  - `action_log: array of object { completed_at, operation, completed_timestamp, 2 more }`

    Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `completed_at: string`

      Timestamp when action completed

    - `operation: "MOVE" or "RELEASE" or "RECLASSIFY" or 3 more`

      Type of action performed

      - `"MOVE"`

      - `"RELEASE"`

      - `"RECLASSIFY"`

      - `"SUBMISSION"`

      - `"QUARANTINE_RELEASE"`

      - `"PREVIEW"`

    - `completed_timestamp: optional string`

      Deprecated, use `completed_at` instead. End of life: November 1, 2026.

    - `properties: optional object { folder, requested_by }`

      Additional properties for the action

      - `folder: optional string`

        Target folder for move operations

      - `requested_by: optional string`

        User who requested the action

    - `status: optional string`

      Status of the action

  - `client_recipients: array of string`

  - `detection_reasons: array of string`

  - `is_phish_submission: boolean`

  - `is_quarantined: boolean`

  - `postfix_id: string`

    The identifier of the message

  - `properties: object { allowlisted_pattern, allowlisted_pattern_type, blocklisted_message, 2 more }`

    Message processing properties

    - `allowlisted_pattern: optional string`

      Pattern that allowlisted this message

    - `allowlisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Type of allowlist pattern

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

    - `blocklisted_message: optional boolean`

      Whether message was blocklisted

    - `blocklisted_pattern: optional string`

      Pattern that blocklisted this message

    - `whitelisted_pattern_type: optional "quarantine_release" or "acceptable_sender" or "allowed_sender" or 5 more`

      Legacy field for allowlist pattern type

      - `"quarantine_release"`

      - `"acceptable_sender"`

      - `"allowed_sender"`

      - `"allowed_recipient"`

      - `"domain_similarity"`

      - `"domain_recency"`

      - `"managed_acceptable_sender"`

      - `"outbound_ndr"`

  - `ts: string`

    Deprecated, use `scanned_at` instead. End of life: November 1, 2026.

  - `alert_id: optional string`

  - `delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 8 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"REVIEW_SUBMISSION"`

    - `"DMARC_UNVERIFIED"`

    - `"DMARC_FAILURE_REPORT"`

    - `"DMARC_AGGREGATE_REPORT"`

    - `"THREAT_INTEL_SUBMISSION"`

    - `"SIMULATION_SUBMISSION"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `delivery_status: optional array of "delivered" or "moved" or "quarantined" or 4 more`

    - `"delivered"`

    - `"moved"`

    - `"quarantined"`

    - `"rejected"`

    - `"deferred"`

    - `"bounced"`

    - `"queued"`

  - `edf_hash: optional string`

  - `envelope_from: optional string`

  - `envelope_to: optional array of string`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

  - `findings: optional array of object { attachment, detail, detection, 6 more }`

    Deprecated, use the `findings` field from `GET /investigate/{investigate_id}/detections` instead. End of life: November 1, 2026. Detection findings for this message.

    - `attachment: optional string`

    - `detail: optional string`

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `field: optional string`

    - `name: optional string`

    - `portion: optional string`

    - `reason: optional string`

    - `score: optional number`

    - `value: optional string`

  - `from: optional string`

  - `from_name: optional string`

  - `htmltext_structure_hash: optional string`

  - `message_id: optional string`

  - `post_delivery_operations: optional array of "PREVIEW" or "QUARANTINE_RELEASE" or "SUBMISSION" or "MOVE"`

    Post-delivery operations performed on this message

    - `"PREVIEW"`

    - `"QUARANTINE_RELEASE"`

    - `"SUBMISSION"`

    - `"MOVE"`

  - `postfix_id_outbound: optional string`

  - `replyto: optional string`

  - `scanned_at: optional string`

    When the message was scanned (UTC)

  - `sent_at: optional string`

    When the message was sent (UTC)

  - `sent_date: optional string`

  - `smtp_helo_server_ip: optional string`

  - `smtp_previous_hop_ip: optional string`

  - `subject: optional string`

  - `threat_categories: optional array of string`

  - `to: optional array of string`

  - `to_name: optional array of string`

  - `validation: optional object { comment, dkim, dmarc, spf }`

    - `comment: optional string`

    - `dkim: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `dmarc: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `spf: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

  - `x_originating_ip: optional string`

# Detections

## Get message detection details

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}/detections`

Returns detection details such as threat categories and sender information for non-benign messages.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

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

- `result: object { action, attachments, findings, 6 more }`

  - `action: string`

  - `attachments: array of object { size, content_type, detection, 6 more }`

    - `size: number`

      Size of the attachment in bytes

    - `content_type: optional string`

      MIME type of the attachment

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

      Detection result for this attachment

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

    - `encrypted: optional boolean`

      Whether the attachment is encrypted

    - `filename: optional string`

      Name of the attached file

    - `md5: optional string`

      MD5 hash of the attachment

    - `name: optional string`

      Attachment name (alternative to filename)

    - `sha1: optional string`

      SHA1 hash of the attachment

    - `sha256: optional string`

      SHA256 hash of the attachment

  - `findings: array of object { attachment, detail, detection, 6 more }`

    - `attachment: optional string`

    - `detail: optional string`

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `field: optional string`

    - `name: optional string`

    - `portion: optional string`

    - `reason: optional string`

    - `score: optional number`

    - `value: optional string`

  - `headers: array of object { name, value }`

    - `name: string`

    - `value: string`

  - `links: array of object { href, text }`

    - `href: string`

    - `text: optional string`

  - `sender_info: object { as_name, as_number, geo, 2 more }`

    - `as_name: optional string`

      The name of the autonomous system.

    - `as_number: optional number`

      The number of the autonomous system.

    - `geo: optional string`

    - `ip: optional string`

    - `pld: optional string`

  - `threat_categories: array of object { id, description, name }`

    - `id: optional number`

    - `description: optional string`

    - `name: optional string`

  - `validation: object { comment, dkim, dmarc, spf }`

    - `comment: optional string`

    - `dkim: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `dmarc: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `spf: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/detections \
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
  "result": {
    "action": "action",
    "attachments": [
      {
        "size": 0,
        "content_type": "content_type",
        "detection": "MALICIOUS",
        "encrypted": true,
        "filename": "filename",
        "md5": "md5",
        "name": "name",
        "sha1": "sha1",
        "sha256": "sha256"
      }
    ],
    "findings": [
      {
        "attachment": "attachment",
        "detail": "detail",
        "detection": "MALICIOUS",
        "field": "field",
        "name": "name",
        "portion": "portion",
        "reason": "reason",
        "score": 0,
        "value": "value"
      }
    ],
    "headers": [
      {
        "name": "name",
        "value": "value"
      }
    ],
    "links": [
      {
        "href": "href",
        "text": "text"
      }
    ],
    "sender_info": {
      "as_name": "as_name",
      "as_number": 0,
      "geo": "geo",
      "ip": "ip",
      "pld": "pld"
    },
    "threat_categories": [
      {
        "id": 0,
        "description": "description",
        "name": "name"
      }
    ],
    "validation": {
      "comment": "comment",
      "dkim": "pass",
      "dmarc": "pass",
      "spf": "pass"
    },
    "final_disposition": "MALICIOUS"
  },
  "success": true
}
```

## Domain Types

### Detection Get Response

- `DetectionGetResponse object { action, attachments, findings, 6 more }`

  - `action: string`

  - `attachments: array of object { size, content_type, detection, 6 more }`

    - `size: number`

      Size of the attachment in bytes

    - `content_type: optional string`

      MIME type of the attachment

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

      Detection result for this attachment

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

    - `encrypted: optional boolean`

      Whether the attachment is encrypted

    - `filename: optional string`

      Name of the attached file

    - `md5: optional string`

      MD5 hash of the attachment

    - `name: optional string`

      Attachment name (alternative to filename)

    - `sha1: optional string`

      SHA1 hash of the attachment

    - `sha256: optional string`

      SHA256 hash of the attachment

  - `findings: array of object { attachment, detail, detection, 6 more }`

    - `attachment: optional string`

    - `detail: optional string`

    - `detection: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `field: optional string`

    - `name: optional string`

    - `portion: optional string`

    - `reason: optional string`

    - `score: optional number`

    - `value: optional string`

  - `headers: array of object { name, value }`

    - `name: string`

    - `value: string`

  - `links: array of object { href, text }`

    - `href: string`

    - `text: optional string`

  - `sender_info: object { as_name, as_number, geo, 2 more }`

    - `as_name: optional string`

      The name of the autonomous system.

    - `as_number: optional number`

      The number of the autonomous system.

    - `geo: optional string`

    - `ip: optional string`

    - `pld: optional string`

  - `threat_categories: array of object { id, description, name }`

    - `id: optional number`

    - `description: optional string`

    - `name: optional string`

  - `validation: object { comment, dkim, dmarc, spf }`

    - `comment: optional string`

    - `dkim: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `dmarc: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

    - `spf: optional "pass" or "neutral" or "fail" or 2 more`

      - `"pass"`

      - `"neutral"`

      - `"fail"`

      - `"error"`

      - `"none"`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

# Preview

## Get email preview

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}/preview`

Returns a preview of the message body as a base64 encoded PNG image for non-benign messages.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

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

- `result: object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/preview \
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
  "result": {
    "screenshot": "screenshot"
  },
  "success": true
}
```

## Preview for non-detection messages

**post** `/accounts/{account_id}/email-security/investigate/preview`

Generates a preview image for a message that was not flagged as a detection. Useful for investigating benign messages. Returns a base64-encoded PNG screenshot of the email body.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `postfix_id: string`

  The identifier of the message

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

- `result: object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/preview \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "postfix_id": "4Njp3P0STMz2c02Q"
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
  "result": {
    "screenshot": "screenshot"
  },
  "success": true
}
```

## Domain Types

### Preview Get Response

- `PreviewGetResponse object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

### Preview Create Response

- `PreviewCreateResponse object { screenshot }`

  - `screenshot: string`

    A base64 encoded PNG image of the email.

# Raw

## Get raw email content

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}/raw`

Returns the raw eml of any non-benign message.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

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

- `result: object { raw }`

  - `raw: string`

    A UTF-8 encoded eml file of the email.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/raw \
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
  "result": {
    "raw": "raw"
  },
  "success": true
}
```

## Domain Types

### Raw Get Response

- `RawGetResponse object { raw }`

  - `raw: string`

    A UTF-8 encoded eml file of the email.

# Trace

## Get email trace

**get** `/accounts/{account_id}/email-security/investigate/{investigate_id}/trace`

Retrieves delivery and processing trace information for an email message. Shows the delivery path, retraction history, and move operations performed on the message. Useful for debugging delivery issues.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

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

- `result: object { inbound, outbound }`

  - `inbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`

  - `outbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/trace \
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
  "result": {
    "inbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    },
    "outbound": {
      "lines": [
        {
          "lineno": 0,
          "logged_at": "2019-12-27T18:11:19.117Z",
          "message": "message",
          "ts": "ts"
        }
      ],
      "pending": true
    }
  },
  "success": true
}
```

## Domain Types

### Trace Get Response

- `TraceGetResponse object { inbound, outbound }`

  - `inbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`

  - `outbound: object { lines, pending }`

    - `lines: optional array of object { lineno, logged_at, message, ts }`

      - `lineno: optional number`

        Line number in the trace log

      - `logged_at: optional string`

      - `message: optional string`

      - `ts: optional string`

        Deprecated, use `logged_at` instead. End of life: November 1, 2026.

    - `pending: optional boolean`

# Move

## Move a message

**post** `/accounts/{account_id}/email-security/investigate/{investigate_id}/move`

Moves a single message to a specified mailbox folder (Inbox, JunkEmail, DeletedItems, RecoverableItemsDeletions, or RecoverableItemsPurges). Requires active integration.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

### Body Parameters

- `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

  - `"Inbox"`

  - `"JunkEmail"`

  - `"DeletedItems"`

  - `"RecoverableItemsDeletions"`

  - `"RecoverableItemsPurges"`

- `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

- `result: array of object { success, completed_at, completed_timestamp, 6 more }`

  - `success: boolean`

    Whether the operation succeeded

  - `completed_at: optional string`

    When the move operation completed (UTC)

  - `completed_timestamp: optional string`

    Deprecated, use `completed_at` instead. End of life: November 1, 2026.

  - `destination: optional string`

    Destination folder for the message

  - `item_count: optional number`

    Number of items moved. End of life: November 1, 2026.

  - `message_id: optional string`

    Message identifier

  - `operation: optional string`

    Type of operation performed

  - `recipient: optional string`

    Recipient email address

  - `status: optional string`

    Operation status

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/move \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination": "Inbox"
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
  "result": [
    {
      "success": true,
      "completed_at": "2019-12-27T18:11:19.117Z",
      "completed_timestamp": "2019-12-27T18:11:19.117Z",
      "destination": "destination",
      "item_count": 0,
      "message_id": "message_id",
      "operation": "operation",
      "recipient": "recipient",
      "status": "status"
    }
  ],
  "success": true
}
```

## Move multiple messages

**post** `/accounts/{account_id}/email-security/investigate/move`

Moves multiple messages to a specified mailbox folder (Inbox, JunkEmail, DeletedItems, RecoverableItemsDeletions, or RecoverableItemsPurges). Requires active integration.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

  - `"Inbox"`

  - `"JunkEmail"`

  - `"DeletedItems"`

  - `"RecoverableItemsDeletions"`

  - `"RecoverableItemsPurges"`

- `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

- `ids: optional array of string`

  List of message IDs to move

- `postfix_ids: optional array of string`

  Deprecated, use `ids` instead. End of life: November 1, 2026. List of message IDs to move.

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

- `result: array of object { success, completed_at, completed_timestamp, 6 more }`

  - `success: boolean`

    Whether the operation succeeded

  - `completed_at: optional string`

    When the move operation completed (UTC)

  - `completed_timestamp: optional string`

    Deprecated, use `completed_at` instead. End of life: November 1, 2026.

  - `destination: optional string`

    Destination folder for the message

  - `item_count: optional number`

    Number of items moved. End of life: November 1, 2026.

  - `message_id: optional string`

    Message identifier

  - `operation: optional string`

    Type of operation performed

  - `recipient: optional string`

    Recipient email address

  - `status: optional string`

    Operation status

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/move \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination": "Inbox"
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
  "result": [
    {
      "success": true,
      "completed_at": "2019-12-27T18:11:19.117Z",
      "completed_timestamp": "2019-12-27T18:11:19.117Z",
      "destination": "destination",
      "item_count": 0,
      "message_id": "message_id",
      "operation": "operation",
      "recipient": "recipient",
      "status": "status"
    }
  ],
  "success": true
}
```

## Domain Types

### Move Create Response

- `MoveCreateResponse object { success, completed_at, completed_timestamp, 6 more }`

  - `success: boolean`

    Whether the operation succeeded

  - `completed_at: optional string`

    When the move operation completed (UTC)

  - `completed_timestamp: optional string`

    Deprecated, use `completed_at` instead. End of life: November 1, 2026.

  - `destination: optional string`

    Destination folder for the message

  - `item_count: optional number`

    Number of items moved. End of life: November 1, 2026.

  - `message_id: optional string`

    Message identifier

  - `operation: optional string`

    Type of operation performed

  - `recipient: optional string`

    Recipient email address

  - `status: optional string`

    Operation status

### Move Bulk Response

- `MoveBulkResponse object { success, completed_at, completed_timestamp, 6 more }`

  - `success: boolean`

    Whether the operation succeeded

  - `completed_at: optional string`

    When the move operation completed (UTC)

  - `completed_timestamp: optional string`

    Deprecated, use `completed_at` instead. End of life: November 1, 2026.

  - `destination: optional string`

    Destination folder for the message

  - `item_count: optional number`

    Number of items moved. End of life: November 1, 2026.

  - `message_id: optional string`

    Message identifier

  - `operation: optional string`

    Type of operation performed

  - `recipient: optional string`

    Recipient email address

  - `status: optional string`

    Operation status

# Reclassify

## Change email classification

**post** `/accounts/{account_id}/email-security/investigate/{investigate_id}/reclassify`

Submits a request to reclassify an email's disposition. Use for reporting false positives or false negatives. Optionally provide the raw EML content for reanalysis. The reclassification is processed asynchronously.

### Path Parameters

- `account_id: string`

  Identifier.

- `investigate_id: string`

  Unique identifier for a message retrieved from investigation

### Body Parameters

- `expected_disposition: "NONE" or "BULK" or "MALICIOUS" or 3 more`

  - `"NONE"`

  - `"BULK"`

  - `"MALICIOUS"`

  - `"SPAM"`

  - `"SPOOF"`

  - `"SUSPICIOUS"`

- `eml_content: optional string`

  Base64 encoded content of the EML file.

- `escalated_submission_id: optional string`

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

- `result: unknown`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/$INVESTIGATE_ID/reclassify \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "expected_disposition": "NONE"
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
  "result": {},
  "success": true
}
```

## Domain Types

### Reclassify Create Response

- `ReclassifyCreateResponse = unknown`

# Release

## Release messages from quarantine

**post** `/accounts/{account_id}/email-security/investigate/release`

Releases one or more quarantined messages, delivering them to the intended recipients. Use when a message was incorrectly quarantined. Returns delivery status for each recipient.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: array of string`

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

- `result: array of object { id, delivered, failed, 2 more }`

  - `id: string`

    Unique identifier for a message retrieved from investigation

  - `delivered: optional array of string`

  - `failed: optional array of string`

  - `postfix_id: optional string`

    Deprecated, use `id` instead. End of life: November 1, 2026.

  - `undelivered: optional array of string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/release \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678"
        ]'
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
  "result": [
    {
      "id": "4Njp3P0STMz2c02Q-2024-01-05T10:00:00-12345678",
      "delivered": [
        "string"
      ],
      "failed": [
        "string"
      ],
      "postfix_id": "4Njp3P0STMz2c02Q",
      "undelivered": [
        "string"
      ]
    }
  ],
  "success": true
}
```

## Domain Types

### Release Bulk Response

- `ReleaseBulkResponse object { id, delivered, failed, 2 more }`

  - `id: string`

    Unique identifier for a message retrieved from investigation

  - `delivered: optional array of string`

  - `failed: optional array of string`

  - `postfix_id: optional string`

    Deprecated, use `id` instead. End of life: November 1, 2026.

  - `undelivered: optional array of string`

# Bulk

## List bulk action jobs

**get** `/accounts/{account_id}/email-security/investigate/bulk`

List bulk action jobs

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `action_type: optional "MOVE" or "RELEASE"`

  - `"MOVE"`

  - `"RELEASE"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `status: optional "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

  - `"PENDING"`

  - `"DISCOVERING"`

  - `"PROCESSING"`

  - `"COMPLETED"`

  - `"FAILED"`

  - `"CANCELLED"`

  - `"SKIPPED"`

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

- `result: array of object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

- `result_info: object { count, per_page, total_count, 3 more }`

  - `count: number`

    Number of items in current page

  - `per_page: number`

    Number of items per page

  - `total_count: number`

    Deprecated: Always returns 0. End of life: November 1, 2026.

  - `next: optional string`

    Cursor for next page

  - `page: optional number`

    Deprecated: Always returns 0. End of life: November 1, 2026.

  - `previous: optional string`

    Cursor for previous page

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk \
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
  "result": [
    {
      "action_params": {
        "destination": "Inbox",
        "type": "MOVE",
        "expected_disposition": "MALICIOUS"
      },
      "action_type": "MOVE",
      "created_at": "2019-12-27T18:11:19.117Z",
      "job_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "messages_failed": 0,
      "messages_pending": 0,
      "messages_successful": 0,
      "search_params": {
        "action_log": true,
        "alert_id": "alert_id",
        "delivery_status": "delivered",
        "detections_only": true,
        "domain": "domain",
        "end": "2022-07-25T14:30:00Z",
        "exact_subject": "exact_subject",
        "final_disposition": "MALICIOUS",
        "message_action": "PREVIEW",
        "message_id": "message_id",
        "metric": "metric",
        "query": "query",
        "recipient": "recipient",
        "sender": "sender",
        "start": "2022-06-25T14:30:00Z",
        "subject": "subject",
        "submissions": true
      },
      "status": "PENDING",
      "total_messages_discovered": 0,
      "comment": "comment",
      "completed_at": "2019-12-27T18:11:19.117Z",
      "started_at": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    }
  ],
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "next": "next",
    "page": 0,
    "previous": "previous"
  },
  "success": true
}
```

## Create a bulk action job

**post** `/accounts/{account_id}/email-security/investigate/bulk`

Create a bulk action job

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `action: "MOVE" or "RELEASE"`

  - `"MOVE"`

  - `"RELEASE"`

- `search_params: object { action_log, alert_id, delivery_status, 14 more }`

  - `action_log: optional boolean`

    Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

  - `alert_id: optional string`

  - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

    Delivery status of the message.

    - `"delivered"`

    - `"moved"`

    - `"quarantined"`

    - `"rejected"`

    - `"deferred"`

    - `"bounced"`

    - `"queued"`

  - `detections_only: optional boolean`

  - `domain: optional string`

  - `end: optional string`

    End of search date range

  - `exact_subject: optional string`

  - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

  - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

    - `"PREVIEW"`

    - `"QUARANTINE_RELEASED"`

    - `"MOVED"`

  - `message_id: optional string`

  - `metric: optional string`

  - `query: optional string`

  - `recipient: optional string`

  - `sender: optional string`

  - `start: optional string`

    Beginning of search date range

  - `subject: optional string`

  - `submissions: optional boolean`

- `comment: optional string`

- `destination: optional "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

  - `"Inbox"`

  - `"JunkEmail"`

  - `"DeletedItems"`

  - `"RecoverableItemsDeletions"`

  - `"RecoverableItemsPurges"`

- `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

- `result: object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "MOVE",
          "search_params": {}
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
  "result": {
    "action_params": {
      "destination": "Inbox",
      "type": "MOVE",
      "expected_disposition": "MALICIOUS"
    },
    "action_type": "MOVE",
    "created_at": "2019-12-27T18:11:19.117Z",
    "job_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "messages_failed": 0,
    "messages_pending": 0,
    "messages_successful": 0,
    "search_params": {
      "action_log": true,
      "alert_id": "alert_id",
      "delivery_status": "delivered",
      "detections_only": true,
      "domain": "domain",
      "end": "2022-07-25T14:30:00Z",
      "exact_subject": "exact_subject",
      "final_disposition": "MALICIOUS",
      "message_action": "PREVIEW",
      "message_id": "message_id",
      "metric": "metric",
      "query": "query",
      "recipient": "recipient",
      "sender": "sender",
      "start": "2022-06-25T14:30:00Z",
      "subject": "subject",
      "submissions": true
    },
    "status": "PENDING",
    "total_messages_discovered": 0,
    "comment": "comment",
    "completed_at": "2019-12-27T18:11:19.117Z",
    "started_at": "2019-12-27T18:11:19.117Z",
    "status_message": "status_message"
  },
  "success": true
}
```

## Get bulk action job details

**get** `/accounts/{account_id}/email-security/investigate/bulk/{job_id}`

Get bulk action job details

### Path Parameters

- `account_id: string`

  Identifier.

- `job_id: string`

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

- `result: object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk/$JOB_ID \
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
  "result": {
    "action_params": {
      "destination": "Inbox",
      "type": "MOVE",
      "expected_disposition": "MALICIOUS"
    },
    "action_type": "MOVE",
    "created_at": "2019-12-27T18:11:19.117Z",
    "job_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "messages_failed": 0,
    "messages_pending": 0,
    "messages_successful": 0,
    "search_params": {
      "action_log": true,
      "alert_id": "alert_id",
      "delivery_status": "delivered",
      "detections_only": true,
      "domain": "domain",
      "end": "2022-07-25T14:30:00Z",
      "exact_subject": "exact_subject",
      "final_disposition": "MALICIOUS",
      "message_action": "PREVIEW",
      "message_id": "message_id",
      "metric": "metric",
      "query": "query",
      "recipient": "recipient",
      "sender": "sender",
      "start": "2022-06-25T14:30:00Z",
      "subject": "subject",
      "submissions": true
    },
    "status": "PENDING",
    "total_messages_discovered": 0,
    "comment": "comment",
    "completed_at": "2019-12-27T18:11:19.117Z",
    "started_at": "2019-12-27T18:11:19.117Z",
    "status_message": "status_message"
  },
  "success": true
}
```

## Delete a bulk action job

**delete** `/accounts/{account_id}/email-security/investigate/bulk/{job_id}`

Deletes the job, removing it from all list and detail endpoints. Only jobs in a terminal state (`COMPLETED`, `CANCELLED`, `FAILED`, or `SKIPPED`) can be deleted. To stop an in-progress job without removing it, use the cancel endpoint instead.

### Path Parameters

- `account_id: string`

  Identifier.

- `job_id: string`

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

- `result: object { id }`

  - `id: string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk/$JOB_ID \
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
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  },
  "success": true
}
```

## Domain Types

### Bulk List Response

- `BulkListResponse object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

### Bulk Create Response

- `BulkCreateResponse object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

### Bulk Get Response

- `BulkGetResponse object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

### Bulk Delete Response

- `BulkDeleteResponse object { id }`

  - `id: string`

# Cancel

## Cancel a bulk action job

**post** `/accounts/{account_id}/email-security/investigate/bulk/{job_id}/cancel`

Marks the job as cancelled and stops any pending message processing. The job record remains visible in list and detail endpoints.

### Path Parameters

- `account_id: string`

  Identifier.

- `job_id: string`

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

- `result: object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk/$JOB_ID/cancel \
    -X POST \
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
  "result": {
    "action_params": {
      "destination": "Inbox",
      "type": "MOVE",
      "expected_disposition": "MALICIOUS"
    },
    "action_type": "MOVE",
    "created_at": "2019-12-27T18:11:19.117Z",
    "job_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "messages_failed": 0,
    "messages_pending": 0,
    "messages_successful": 0,
    "search_params": {
      "action_log": true,
      "alert_id": "alert_id",
      "delivery_status": "delivered",
      "detections_only": true,
      "domain": "domain",
      "end": "2022-07-25T14:30:00Z",
      "exact_subject": "exact_subject",
      "final_disposition": "MALICIOUS",
      "message_action": "PREVIEW",
      "message_id": "message_id",
      "metric": "metric",
      "query": "query",
      "recipient": "recipient",
      "sender": "sender",
      "start": "2022-06-25T14:30:00Z",
      "subject": "subject",
      "submissions": true
    },
    "status": "PENDING",
    "total_messages_discovered": 0,
    "comment": "comment",
    "completed_at": "2019-12-27T18:11:19.117Z",
    "started_at": "2019-12-27T18:11:19.117Z",
    "status_message": "status_message"
  },
  "success": true
}
```

## Domain Types

### Cancel Create Response

- `CancelCreateResponse object { action_params, action_type, created_at, 11 more }`

  - `action_params: object { destination, type, expected_disposition }  or object { type }`

    - `Move object { destination, type, expected_disposition }`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { type }`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `job_id: string`

  - `messages_failed: number`

  - `messages_pending: number`

  - `messages_successful: number`

  - `search_params: object { action_log, alert_id, delivery_status, 14 more }`

    - `action_log: optional boolean`

      Deprecated, use `GET /investigate/{investigate_id}/action_log` instead. End of life: November 1, 2026.

    - `alert_id: optional string`

    - `delivery_status: optional "delivered" or "moved" or "quarantined" or 4 more`

      Delivery status of the message.

      - `"delivered"`

      - `"moved"`

      - `"quarantined"`

      - `"rejected"`

      - `"deferred"`

      - `"bounced"`

      - `"queued"`

    - `detections_only: optional boolean`

    - `domain: optional string`

    - `end: optional string`

      End of search date range

    - `exact_subject: optional string`

    - `final_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `message_action: optional "PREVIEW" or "QUARANTINE_RELEASED" or "MOVED"`

      - `"PREVIEW"`

      - `"QUARANTINE_RELEASED"`

      - `"MOVED"`

    - `message_id: optional string`

    - `metric: optional string`

    - `query: optional string`

    - `recipient: optional string`

    - `sender: optional string`

    - `start: optional string`

      Beginning of search date range

    - `subject: optional string`

    - `submissions: optional boolean`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `total_messages_discovered: number`

  - `comment: optional string`

  - `completed_at: optional string`

  - `started_at: optional string`

  - `status_message: optional string`

# Messages

## List messages for a bulk action job

**get** `/accounts/{account_id}/email-security/investigate/bulk/{job_id}/messages`

List messages for a bulk action job

### Path Parameters

- `account_id: string`

  Identifier.

- `job_id: string`

### Query Parameters

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `status: optional "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

  - `"PENDING"`

  - `"DISCOVERING"`

  - `"PROCESSING"`

  - `"COMPLETED"`

  - `"FAILED"`

  - `"CANCELLED"`

  - `"SKIPPED"`

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

- `result: array of object { action_params, action_type, created_at, 9 more }`

  - `action_params: object { client_recipient, destination, type, expected_disposition }  or object { client_recipient, type }`

    - `Move object { client_recipient, destination, type, expected_disposition }`

      - `client_recipient: string`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { client_recipient, type }`

      - `client_recipient: string`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `message_id: string`

  - `postfix_id: string`

  - `retry_count: number`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `alert_id: optional string`

  - `email_message_id: optional string`

  - `processed_at: optional string`

  - `retry_after: optional string`

    When to retry the action if it failed

  - `status_message: optional string`

- `result_info: object { count, per_page, total_count, 3 more }`

  - `count: number`

    Number of items in current page

  - `per_page: number`

    Number of items per page

  - `total_count: number`

    Deprecated: Always returns 0. End of life: November 1, 2026.

  - `next: optional string`

    Cursor for next page

  - `page: optional number`

    Deprecated: Always returns 0. End of life: November 1, 2026.

  - `previous: optional string`

    Cursor for previous page

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/investigate/bulk/$JOB_ID/messages \
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
  "result": [
    {
      "action_params": {
        "client_recipient": "client_recipient",
        "destination": "Inbox",
        "type": "MOVE",
        "expected_disposition": "MALICIOUS"
      },
      "action_type": "MOVE",
      "created_at": "2019-12-27T18:11:19.117Z",
      "message_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "postfix_id": "postfix_id",
      "retry_count": 0,
      "status": "PENDING",
      "alert_id": "alert_id",
      "email_message_id": "email_message_id",
      "processed_at": "2019-12-27T18:11:19.117Z",
      "retry_after": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    }
  ],
  "result_info": {
    "count": 0,
    "per_page": 0,
    "total_count": 0,
    "next": "next",
    "page": 0,
    "previous": "previous"
  },
  "success": true
}
```

## Domain Types

### Message List Response

- `MessageListResponse object { action_params, action_type, created_at, 9 more }`

  - `action_params: object { client_recipient, destination, type, expected_disposition }  or object { client_recipient, type }`

    - `Move object { client_recipient, destination, type, expected_disposition }`

      - `client_recipient: string`

      - `destination: "Inbox" or "JunkEmail" or "DeletedItems" or 2 more`

        - `"Inbox"`

        - `"JunkEmail"`

        - `"DeletedItems"`

        - `"RecoverableItemsDeletions"`

        - `"RecoverableItemsPurges"`

      - `type: "MOVE"`

        - `"MOVE"`

      - `expected_disposition: optional "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

    - `Release object { client_recipient, type }`

      - `client_recipient: string`

      - `type: "RELEASE"`

        - `"RELEASE"`

  - `action_type: "MOVE" or "RELEASE"`

    - `"MOVE"`

    - `"RELEASE"`

  - `created_at: string`

  - `message_id: string`

  - `postfix_id: string`

  - `retry_count: number`

  - `status: "PENDING" or "DISCOVERING" or "PROCESSING" or 4 more`

    - `"PENDING"`

    - `"DISCOVERING"`

    - `"PROCESSING"`

    - `"COMPLETED"`

    - `"FAILED"`

    - `"CANCELLED"`

    - `"SKIPPED"`

  - `alert_id: optional string`

  - `email_message_id: optional string`

  - `processed_at: optional string`

  - `retry_after: optional string`

    When to retry the action if it failed

  - `status_message: optional string`
