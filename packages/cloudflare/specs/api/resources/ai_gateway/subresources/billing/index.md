# Billing

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

## Domain Types

### Billing Credit Balance Response

- `BillingCreditBalanceResponse object { balance, has_default_payment_method, payment_method, 2 more }`

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

### Billing Usage History Response

- `BillingUsageHistoryResponse object { history }`

  - `history: array of object { id, aggregated_value, end_time, start_time }`

    - `id: string`

    - `aggregated_value: number`

    - `end_time: number`

    - `start_time: number`

### Billing Invoice History Response

- `BillingInvoiceHistoryResponse object { invoices, pagination }`

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

### Billing Invoice Preview Response

- `BillingInvoicePreviewResponse object { id, amount_due, amount_paid, 6 more }`

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

# Topup

## Create a top-up

**post** `/accounts/{account_id}/ai-gateway/billing/topup`

Create a credit top-up via Stripe PaymentIntent for the given account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `amount: number`

  Top-up amount in cents (min 1000).

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { client_secret, onboarding, payment_intent_id, 2 more }`

  - `client_secret: string`

    Stripe PaymentIntent client secret.

  - `onboarding: boolean`

    Whether the user was already onboarded.

  - `payment_intent_id: string`

    Stripe invoice ID.

  - `brand: optional string`

    Card brand (visa, mastercard, etc.).

  - `last4: optional string`

    Last 4 digits of card.

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 5000
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
    "client_secret": "client_secret",
    "onboarding": true,
    "payment_intent_id": "payment_intent_id",
    "brand": "brand",
    "last4": "last4"
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

## Domain Types

### Topup Create Response

- `TopupCreateResponse object { client_secret, onboarding, payment_intent_id, 2 more }`

  - `client_secret: string`

    Stripe PaymentIntent client secret.

  - `onboarding: boolean`

    Whether the user was already onboarded.

  - `payment_intent_id: string`

    Stripe invoice ID.

  - `brand: optional string`

    Card brand (visa, mastercard, etc.).

  - `last4: optional string`

    Last 4 digits of card.

### Topup Status Response

- `TopupStatusResponse object { payment_intent_id, status }`

  - `payment_intent_id: string`

  - `status: "completed" or "pending"`

    - `"completed"`

    - `"pending"`

# Config

## Get auto top-up configuration

**get** `/accounts/{account_id}/ai-gateway/billing/topup/config`

Retrieve the current auto top-up threshold, amount, and any error state.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { amount, disabledReason, error, 2 more }`

  - `amount: number`

  - `disabledReason: string`

  - `error: string`

  - `lastFailedAt: number`

  - `threshold: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/config \
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
    "amount": 0,
    "disabledReason": "disabledReason",
    "error": "error",
    "lastFailedAt": 0,
    "threshold": 0
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

## Set auto top-up configuration

**post** `/accounts/{account_id}/ai-gateway/billing/topup/config`

Configure auto top-up with a balance threshold and top-up amount.

### Path Parameters

- `account_id: string`

### Body Parameters

- `amount: number`

  Auto top-up amount in cents (min 1000).

- `threshold: number`

  Balance threshold in cents that triggers auto top-up (min 500).

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { amount, threshold }`

  - `amount: number`

  - `threshold: number`

- `success: true`

  - `true`

- `result_info: optional object { has_more, page, per_page, total_count }`

  - `has_more: boolean`

  - `page: number`

  - `per_page: number`

  - `total_count: number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/config \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "amount": 5000,
          "threshold": 500
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
    "amount": 0,
    "threshold": 0
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

## Delete auto top-up configuration

**delete** `/accounts/{account_id}/ai-gateway/billing/topup/config`

Remove the auto top-up configuration for the account.

### Path Parameters

- `account_id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/billing/topup/config \
    -X DELETE \
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

## Domain Types

### Config Get Response

- `ConfigGetResponse object { amount, disabledReason, error, 2 more }`

  - `amount: number`

  - `disabledReason: string`

  - `error: string`

  - `lastFailedAt: number`

  - `threshold: number`

### Config Create Response

- `ConfigCreateResponse object { amount, threshold }`

  - `amount: number`

  - `threshold: number`

### Config Delete Response

- `ConfigDeleteResponse = unknown`

# Spending Limit

## Get spending limit

**get** `/accounts/{account_id}/ai-gateway/billing/spending-limit`

Retrieve the current spending limit configuration for the account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { config, enabled }`

  - `config: object { amount, duration, strategy }`

    - `amount: number`

    - `duration: string`

    - `strategy: string`

  - `enabled: boolean`

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
    "config": {
      "amount": 0,
      "duration": "duration",
      "strategy": "strategy"
    },
    "enabled": true
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

## Delete spending limit

**delete** `/accounts/{account_id}/ai-gateway/billing/spending-limit`

Remove the spending limit for the account.

### Path Parameters

- `account_id: string`

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
    -X DELETE \
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

## Domain Types

### Spending Limit Get Response

- `SpendingLimitGetResponse object { config, enabled }`

  - `config: object { amount, duration, strategy }`

    - `amount: number`

    - `duration: string`

    - `strategy: string`

  - `enabled: boolean`

### Spending Limit Create Response

- `SpendingLimitCreateResponse = unknown`

### Spending Limit Delete Response

- `SpendingLimitDeleteResponse = unknown`
