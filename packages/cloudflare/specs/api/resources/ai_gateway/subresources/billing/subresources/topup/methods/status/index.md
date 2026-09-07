## Check top-up status

**post** `/accounts/{account_id}/ai-gateway/billing/topup/status`

Get the payment processing status of a top-up by its invoice ID.

### Path Parameters

- `account_id: string`

### Body Parameters

- `payment_intent_id: string`

  Stripe invoice ID to check status for.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { payment_intent_id, status }`

  - `payment_intent_id: string`

  - `status: "completed" or "pending"`

    - `"completed"`

    - `"pending"`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/status \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "payment_intent_id": "in_1abc"
        }'
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
    "payment_intent_id": "payment_intent_id",
    "status": "completed"
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
