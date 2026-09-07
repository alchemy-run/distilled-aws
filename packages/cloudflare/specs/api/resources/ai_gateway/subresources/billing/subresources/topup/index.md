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
