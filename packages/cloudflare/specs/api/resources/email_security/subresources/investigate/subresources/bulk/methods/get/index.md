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
