## Get Gateway Log Detail

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}`

Retrieves detailed information for a specific AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, cached, created_at, 22 more }`

  - `id: string`

  - `cached: boolean`

  - `created_at: string`

  - `duration: number`

  - `model: string`

  - `path: string`

  - `provider: string`

  - `success: boolean`

  - `tokens_in: number`

  - `tokens_out: number`

  - `cost: optional number`

  - `custom_cost: optional boolean`

  - `metadata: optional string`

  - `model_type: optional string`

  - `request_content_type: optional string`

  - `request_head: optional string`

  - `request_head_complete: optional boolean`

  - `request_size: optional number`

  - `request_type: optional string`

  - `response_content_type: optional string`

  - `response_head: optional string`

  - `response_head_complete: optional boolean`

  - `response_size: optional number`

  - `status_code: optional number`

  - `step: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "cached": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "duration": 0,
    "model": "model",
    "path": "path",
    "provider": "provider",
    "success": true,
    "tokens_in": 0,
    "tokens_out": 0,
    "cost": 0,
    "custom_cost": true,
    "metadata": "metadata",
    "model_type": "model_type",
    "request_content_type": "request_content_type",
    "request_head": "request_head",
    "request_head_complete": true,
    "request_size": 0,
    "request_type": "request_type",
    "response_content_type": "response_content_type",
    "response_head": "response_head",
    "response_head_complete": true,
    "response_size": 0,
    "status_code": 0,
    "step": 0
  },
  "success": true
}
```
