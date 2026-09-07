# URLs

## Get Gateway URL

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/url/{provider}`

Retrieves the endpoint URL for an AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `provider: string`

### Returns

- `result: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/url/$PROVIDER \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": "result",
  "success": true
}
```

## Domain Types

### URL Get Response

- `URLGetResponse = string`
