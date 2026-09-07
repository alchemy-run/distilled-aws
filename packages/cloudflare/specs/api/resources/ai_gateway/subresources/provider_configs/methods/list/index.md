## List Provider Configs

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/provider_configs`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `page: optional number`

- `per_page: optional number`

### Returns

- `result: array of object { id, alias, default_config, 7 more }`

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
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
    }
  ],
  "success": true
}
```
