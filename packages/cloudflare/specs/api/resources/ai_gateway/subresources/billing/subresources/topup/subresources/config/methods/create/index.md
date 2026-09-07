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
