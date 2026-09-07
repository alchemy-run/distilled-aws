## Get credit balance

**get** `/accounts/{account_id}/ai-gateway/billing/credit-balance`

Retrieve the current credit balance, payment method info, and top-up configuration.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { balance, has_default_payment_method, payment_method, 2 more }`

  - `balance: number`

  - `has_default_payment_method: boolean`

  - `payment_method: object { brand, last4 }`

    - `brand: optional string`

    - `last4: optional string`

  - `topup_config: object { amount, disabledReason, error, 2 more }`

    - `amount: number`

    - `disabledReason: string`

    - `error: string`

    - `lastFailedAt: number`

    - `threshold: number`

  - `first_topup_success: optional boolean`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/credit-balance \
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
    "balance": 0,
    "has_default_payment_method": true,
    "payment_method": {
      "brand": "brand",
      "last4": "last4"
    },
    "topup_config": {
      "amount": 0,
      "disabledReason": "disabledReason",
      "error": "error",
      "lastFailedAt": 0,
      "threshold": 0
    },
    "first_topup_success": true
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
