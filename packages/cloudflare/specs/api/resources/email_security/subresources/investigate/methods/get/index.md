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
