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
