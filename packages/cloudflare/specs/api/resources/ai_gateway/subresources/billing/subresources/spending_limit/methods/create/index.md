## Set spending limit (deprecated)

**post** `/accounts/{account_id}/ai-gateway/billing/spending-limit`

Deprecated: spending limits can no longer be created, enabled, or modified and this endpoint always responds 403. Use the new AI Gateway spend limits instead: https://developers.cloudflare.com/ai-gateway/features/spend-limits/. Existing limits can be removed via DELETE /spending-limit.

### Path Parameters

- `account_id: string`

### Body Parameters

- `amount: number`

  Spending limit amount in cents (min 100).

- `duration: "daily" or "weekly" or "monthly"`

  Spending limit duration.

  - `"daily"`

  - `"weekly"`

  - `"monthly"`

- `strategy: "fixed" or "sliding"`

  Spending limit strategy.

  - `"fixed"`

  - `"sliding"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: unknown`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/spending-limit \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 10000,
          "duration": "monthly",
          "strategy": "fixed"
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
  "result": {},
  "success": true,
  "result_info": {
    "has_more": true,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  }
}
```
