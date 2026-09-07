## Get invoice history

**get** `/accounts/{account_id}/ai-gateway/billing/invoice-history`

Retrieve a list of past invoices with pagination, optionally filtered by type.

### Path Parameters

- `account_id: string`

### Query Parameters

- `type: optional "auto" or "all" or "manual"`

  Filter invoice type: auto, manual, or all.

  - `"auto"`

  - `"all"`

  - `"manual"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { invoices, pagination }`

  - `invoices: array of object { amount_due, amount_paid, amount_remaining, 11 more }`

    - `amount_due: number`

    - `amount_paid: number`

    - `amount_remaining: number`

    - `currency: string`

    - `id: optional string`

    - `attempt_count: optional number`

    - `attempted: optional boolean`

    - `auto_advance: optional boolean`

    - `created: optional number`

    - `created_by: optional string`

    - `description: optional string`

    - `invoice_origin: optional string`

    - `invoice_pdf: optional string`

    - `status: optional string`

  - `pagination: object { has_more, page, per_page, total_count }`

    - `has_more: boolean`

    - `page: number`

    - `per_page: number`

    - `total_count: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/invoice-history \
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
    "invoices": [
      {
        "amount_due": 0,
        "amount_paid": 0,
        "amount_remaining": 0,
        "currency": "currency",
        "id": "id",
        "attempt_count": 0,
        "attempted": true,
        "auto_advance": true,
        "created": 0,
        "created_by": "created_by",
        "description": "description",
        "invoice_origin": "invoice_origin",
        "invoice_pdf": "invoice_pdf",
        "status": "status"
      }
    ],
    "pagination": {
      "has_more": true,
      "page": 0,
      "per_page": 0,
      "total_count": 0
    }
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
