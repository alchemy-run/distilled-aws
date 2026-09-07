## Create a new Provider Configs

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Body Parameters

- `alias: string`

- `default_config: boolean`

- `provider_slug: string`

- `rate_limit: optional number`

- `rate_limit_period: optional number`

- `secret: optional string`

- `secret_id: optional string`

### Returns

- `result: object { id, alias, default_config, 7 more }`

  - `id: string`

  - `alias: string`

  - `default_config: boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `provider_slug: string`

  - `secret_id: string`

  - `secret_preview: string`

  - `rate_limit: optional number`

  - `rate_limit_period: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/provider_configs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "alias": "alias",
          "default_config": true,
          "provider_slug": "provider_slug"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "alias": "alias",
    "default_config": true,
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "provider_slug": "provider_slug",
    "secret_id": "secret_id",
    "secret_preview": "secret_preview",
    "rate_limit": 0,
    "rate_limit_period": 0
  },
  "success": true
}
```
