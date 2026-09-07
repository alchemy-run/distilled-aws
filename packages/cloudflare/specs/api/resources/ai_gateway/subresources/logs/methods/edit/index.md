## Patch Gateway Log

**patch** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}`

Updates metadata for an AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Body Parameters

- `feedback: optional number`

- `metadata: optional map[string or number or boolean]`

  - `string`

  - `number`

  - `boolean`

- `score: optional number`

### Returns

- `result: unknown`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```
