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
