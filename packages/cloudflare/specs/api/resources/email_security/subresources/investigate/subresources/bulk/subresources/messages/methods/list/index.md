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
