## Delete Gateway Logs

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs`

Delete Gateway Logs

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `filters: optional array of object { key, operator, value }`

  - `key: "id" or "created_at" or "request_content_type" or 21 more`

    - `"id"`

    - `"created_at"`

    - `"request_content_type"`

    - `"response_content_type"`

    - `"request_type"`

    - `"success"`

    - `"cached"`

    - `"provider"`

    - `"model"`

    - `"model_type"`

    - `"cost"`

    - `"tokens"`

    - `"tokens_in"`

    - `"tokens_out"`

    - `"duration"`

    - `"feedback"`

    - `"event_id"`

    - `"metadata.key"`

    - `"metadata.value"`

    - `"authentication"`

    - `"wholesale"`

    - `"compatibilityMode"`

    - `"dlp_action"`

    - `"user_agent"`

  - `operator: "eq" or "neq" or "contains" or 2 more`

    - `"eq"`

    - `"neq"`

    - `"contains"`

    - `"lt"`

    - `"gt"`

  - `value: array of string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `limit: optional number`

- `order_by: optional "created_at" or "provider" or "model" or 8 more`

  - `"created_at"`

  - `"provider"`

  - `"model"`

  - `"model_type"`

  - `"success"`

  - `"cached"`

  - `"cost"`

  - `"tokens_in"`

  - `"tokens_out"`

  - `"duration"`

  - `"feedback"`

- `order_by_direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

### Returns

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "success": true
}
```
