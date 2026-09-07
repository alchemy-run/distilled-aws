# History

## List History

**get** `/accounts/{account_id}/alerting/v3/history`

Gets a list of history records for notifications sent to an account. The records are displayed for last `x` number of days based on the zone plan (free = 30, pro = 30, biz = 30, ent = 90).

### Path Parameters

- `account_id: string`

  The account id

### Query Parameters

- `before: optional string`

  Limit the returned results to history records older than the specified date. This must be a timestamp that conforms to RFC3339.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

- `since: optional string`

  Limit the returned results to history records newer than the specified date. This must be a timestamp that conforms to RFC3339.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of History`

  - `id: optional string`

    UUID

  - `alert_body: optional string`

    Message body included in the notification sent.

  - `alert_type: optional string`

    Type of notification that has been dispatched.

  - `description: optional string`

    Description of the notification policy (if present).

  - `mechanism: optional string`

    The mechanism to which the notification has been dispatched.

  - `mechanism_type: optional "email" or "pagerduty" or "webhook"`

    The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`

  - `name: optional string`

    Name of the policy.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `sent: optional string`

    Timestamp of when the notification was dispatched in ISO 8601 format.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/history \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f174e90afafe4643bbbc4a0ed4fc8415",
      "alert_body": "SSL certificate has expired",
      "alert_type": "universal_ssl_event_type",
      "description": "Universal Certificate validation status, issuance, renewal, and expiration notices",
      "mechanism": "test@example.com",
      "mechanism_type": "email",
      "name": "SSL Notification Event Policy",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "sent": "2021-10-08T17:52:17.571336Z"
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

### History

- `History object { id, alert_body, alert_type, 6 more }`

  - `id: optional string`

    UUID

  - `alert_body: optional string`

    Message body included in the notification sent.

  - `alert_type: optional string`

    Type of notification that has been dispatched.

  - `description: optional string`

    Description of the notification policy (if present).

  - `mechanism: optional string`

    The mechanism to which the notification has been dispatched.

  - `mechanism_type: optional "email" or "pagerduty" or "webhook"`

    The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`

  - `name: optional string`

    Name of the policy.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `sent: optional string`

    Timestamp of when the notification was dispatched in ISO 8601 format.
