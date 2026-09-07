## Get usage history

**get** `/accounts/{account_id}/ai-gateway/billing/usage-history`

Retrieve aggregated usage meter event summaries for the given time range.

### Path Parameters

- `account_id: string`

### Query Parameters

- `value_grouping_window: "day" or "hour"`

  Grouping window for usage data.

  - `"day"`

  - `"hour"`

- `end_time: optional number`

  End time as Unix timestamp in milliseconds.

- `start_time: optional number`

  Start time as Unix timestamp in milliseconds.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { history }`

  - `history: array of object { id, aggregated_value, end_time, start_time }`

    - `id: string`

    - `aggregated_value: number`

    - `end_time: number`

    - `start_time: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/usage-history \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "history": [
      {
        "id": "id",
        "aggregated_value": 0,
        "end_time": 0,
        "start_time": 0
      }
    ]
  },
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```
