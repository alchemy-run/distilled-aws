## Get invoice preview

**get** `/accounts/{account_id}/ai-gateway/billing/invoice-preview`

Retrieve a preview of the upcoming invoice including line items and tax.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, amount_due, amount_paid, 6 more }`

  - `id: string`

  - `amount_due: number`

  - `amount_paid: number`

  - `amount_remaining: number`

  - `currency: string`

  - `invoice_lines: array of object { amount, currency, description, 4 more }`

    - `amount: number`

    - `currency: string`

    - `description: string`

    - `period: object { end, start }`

      - `end: number`

      - `start: number`

    - `pricing: object { unit_amount_decimal }`

      - `unit_amount_decimal: string`

    - `quantity: number`

    - `pretax_credit_amounts: optional array of object { amount, type, credit_balance_transaction, discount }`

      - `amount: number`

      - `type: string`

      - `credit_balance_transaction: optional string`

      - `discount: optional string`

  - `period_end: number`

  - `period_start: number`

  - `status: "draft" or "open" or "paid" or 2 more`

    - `"draft"`

    - `"open"`

    - `"paid"`

    - `"uncollectible"`

    - `"void"`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/invoice-preview \
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
    "id": "id",
    "amount_due": 0,
    "amount_paid": 0,
    "amount_remaining": 0,
    "currency": "currency",
    "invoice_lines": [
      {
        "amount": 0,
        "currency": "currency",
        "description": "description",
        "period": {
          "end": 0,
          "start": 0
        },
        "pricing": {
          "unit_amount_decimal": "unit_amount_decimal"
        },
        "quantity": 0,
        "pretax_credit_amounts": [
          {
            "amount": 0,
            "type": "type",
            "credit_balance_transaction": "credit_balance_transaction",
            "discount": "discount"
          }
        ]
      }
    ],
    "period_end": 0,
    "period_start": 0,
    "status": "draft"
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
