# Email Security

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

# Phishguard

# Reports

## Get PhishGuard reports

**get** `/accounts/{account_id}/email-security/phishguard/reports`

Retrieves PhishGuard security alert reports for a specified date range. Reports include detected threats, dispositions, and contextual information. Use for security monitoring and threat analysis.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `end: optional string`

  End of the time range (RFC3339). Takes precedence over to_date.

- `from_date: optional string`

  Deprecated, use `start` instead. Start date in YYYY-MM-DD format.

- `start: optional string`

  Start of the time range (RFC3339). Takes precedence over from_date.

- `to_date: optional string`

  Deprecated, use `end` instead. End date in YYYY-MM-DD format.

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

- `result: array of object { id, content, disposition, 7 more }`

  - `id: number`

  - `content: string`

  - `disposition: "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

  - `fields: object { to, from, occurred_at, 2 more }`

    - `to: array of string`

    - `from: optional string`

    - `occurred_at: optional string`

    - `postfix_id: optional string`

    - `ts: optional string`

      Deprecated, use `occurred_at` instead

  - `priority: string`

  - `title: string`

  - `created_at: optional string`

  - `tags: optional array of object { category, value }`

    - `category: string`

    - `value: string`

  - `ts: optional string`

    Deprecated, use `created_at` instead

  - `updated_at: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/phishguard/reports \
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
      "id": 0,
      "content": "content",
      "disposition": "MALICIOUS",
      "fields": {
        "to": [
          "string"
        ],
        "from": "from",
        "occurred_at": "2019-12-27T18:11:19.117Z",
        "postfix_id": "postfix_id",
        "ts": "2019-12-27T18:11:19.117Z"
      },
      "priority": "priority",
      "title": "title",
      "created_at": "2019-12-27T18:11:19.117Z",
      "tags": [
        {
          "category": "category",
          "value": "value"
        }
      ],
      "ts": "2019-12-27T18:11:19.117Z",
      "updated_at": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```

## Domain Types

### Report List Response

- `ReportListResponse object { id, content, disposition, 7 more }`

  - `id: number`

  - `content: string`

  - `disposition: "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

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

  - `fields: object { to, from, occurred_at, 2 more }`

    - `to: array of string`

    - `from: optional string`

    - `occurred_at: optional string`

    - `postfix_id: optional string`

    - `ts: optional string`

      Deprecated, use `occurred_at` instead

  - `priority: string`

  - `title: string`

  - `created_at: optional string`

  - `tags: optional array of object { category, value }`

    - `category: string`

    - `value: string`

  - `ts: optional string`

    Deprecated, use `created_at` instead

  - `updated_at: optional string`

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

# Submissions

## Get reclassify submissions

**get** `/accounts/{account_id}/email-security/submissions`

Returns information for submissions made to reclassify emails. Shows the status, outcome, and disposition changes for reclassification requests made by users or the security team. Useful for tracking false positive/negative reports.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `end: optional string`

  The end of the search date range. Defaults to `now`.

- `escalated_from_user: optional boolean`

  When true, return only submissions that were escalated by an end user (vs. by the security team). When false, return only submissions that were not escalated by an end user. When omitted, no filter is applied.

- `original_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

  - `"MALICIOUS"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"NONE"`

- `outcome_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

  - `"MALICIOUS"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"NONE"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `query: optional string`

- `requested_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

  - `"MALICIOUS"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"NONE"`

- `start: optional string`

  The beginning of the search date range. Defaults to `now - 30 days`.

- `status: optional string`

- `submission_id: optional string`

- `type: optional "TEAM" or "USER"`

  - `"TEAM"`

  - `"USER"`

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

- `result: optional array of object { requested_at, submission_id, customer_status, 15 more }`

  - `requested_at: string`

    When the submission was requested (UTC).

  - `submission_id: string`

  - `customer_status: optional "escalated" or "reviewed" or "unreviewed"`

    - `"escalated"`

    - `"reviewed"`

    - `"unreviewed"`

  - `escalated_as: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `escalated_at: optional string`

  - `escalated_by: optional string`

  - `escalated_submission_id: optional string`

  - `original_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `original_edf_hash: optional string`

  - `original_postfix_id: optional string`

    The postfix ID of the original message that was submitted

  - `outcome: optional string`

  - `outcome_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_by: optional string`

  - `requested_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_ts: optional string`

    Deprecated, use `requested_at` instead

  - `status: optional string`

  - `subject: optional string`

  - `type: optional "Team" or "User"`

    Whether the submission was created by a team member or an end user.

    - `"Team"`

    - `"User"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/submissions \
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
      "requested_at": "2019-12-27T18:11:19.117Z",
      "submission_id": "submission_id",
      "customer_status": "escalated",
      "escalated_as": "MALICIOUS",
      "escalated_at": "2019-12-27T18:11:19.117Z",
      "escalated_by": "escalated_by",
      "escalated_submission_id": "escalated_submission_id",
      "original_disposition": "MALICIOUS",
      "original_edf_hash": "original_edf_hash",
      "original_postfix_id": "original_postfix_id",
      "outcome": "outcome",
      "outcome_disposition": "MALICIOUS",
      "requested_by": "requested_by",
      "requested_disposition": "MALICIOUS",
      "requested_ts": "requested_ts",
      "status": "status",
      "subject": "subject",
      "type": "Team"
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

## Domain Types

### Submission List Response

- `SubmissionListResponse object { requested_at, submission_id, customer_status, 15 more }`

  - `requested_at: string`

    When the submission was requested (UTC).

  - `submission_id: string`

  - `customer_status: optional "escalated" or "reviewed" or "unreviewed"`

    - `"escalated"`

    - `"reviewed"`

    - `"unreviewed"`

  - `escalated_as: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `escalated_at: optional string`

  - `escalated_by: optional string`

  - `escalated_submission_id: optional string`

  - `original_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `original_edf_hash: optional string`

  - `original_postfix_id: optional string`

    The postfix ID of the original message that was submitted

  - `outcome: optional string`

  - `outcome_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_by: optional string`

  - `requested_disposition: optional "MALICIOUS" or "SUSPICIOUS" or "SPOOF" or 3 more`

    - `"MALICIOUS"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"NONE"`

  - `requested_ts: optional string`

    Deprecated, use `requested_at` instead

  - `status: optional string`

  - `subject: optional string`

  - `type: optional "Team" or "User"`

    Whether the submission was created by a team member or an end user.

    - `"Team"`

    - `"User"`
