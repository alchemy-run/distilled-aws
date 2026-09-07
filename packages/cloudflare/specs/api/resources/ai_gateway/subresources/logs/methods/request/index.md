## Get Gateway Log Request

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/request`

Retrieves the original request payload for an AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID/request \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```
