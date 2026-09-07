# Logs

## List Gateway Logs

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs`

List Gateway Logs

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `cached: optional boolean`

- `direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `end_date: optional string`

- `feedback: optional 0 or 1`

  - `0`

  - `1`

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

- `max_cost: optional number`

- `max_duration: optional number`

- `max_tokens_in: optional number`

- `max_tokens_out: optional number`

- `max_total_tokens: optional number`

- `meta_info: optional boolean`

- `min_cost: optional number`

- `min_duration: optional number`

- `min_tokens_in: optional number`

- `min_tokens_out: optional number`

- `min_total_tokens: optional number`

- `model: optional string`

- `model_type: optional string`

- `order_by: optional "created_at" or "provider" or "model" or 3 more`

  - `"created_at"`

  - `"provider"`

  - `"model"`

  - `"model_type"`

  - `"success"`

  - `"cached"`

- `order_by_direction: optional "asc" or "desc"`

  - `"asc"`

  - `"desc"`

- `page: optional number`

- `per_page: optional number`

- `provider: optional string`

- `request_content_type: optional string`

- `response_content_type: optional string`

- `search: optional string`

- `start_date: optional string`

- `success: optional boolean`

### Returns

- `result: array of object { id, cached, created_at, 16 more }`

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

  - `request_type: optional string`

  - `response_content_type: optional string`

  - `status_code: optional number`

  - `step: optional number`

- `result_info: object { count, max_cost, max_duration, 11 more }`

  - `count: optional number`

  - `max_cost: optional number`

  - `max_duration: optional number`

  - `max_tokens_in: optional number`

  - `max_tokens_out: optional number`

  - `max_total_tokens: optional number`

  - `min_cost: optional number`

  - `min_duration: optional number`

  - `min_tokens_in: optional number`

  - `min_tokens_out: optional number`

  - `min_total_tokens: optional number`

  - `page: optional number`

  - `per_page: optional number`

  - `total_count: optional number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
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
      "request_type": "request_type",
      "response_content_type": "response_content_type",
      "status_code": 0,
      "step": 0
    }
  ],
  "result_info": {
    "count": 0,
    "max_cost": 0,
    "max_duration": 0,
    "max_tokens_in": 0,
    "max_tokens_out": 0,
    "max_total_tokens": 0,
    "min_cost": 0,
    "min_duration": 0,
    "min_tokens_in": 0,
    "min_tokens_out": 0,
    "min_total_tokens": 0,
    "page": 0,
    "per_page": 0,
    "total_count": 0
  },
  "success": true
}
```

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

## Get Gateway Log Response

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/logs/{id}/response`

Retrieves the response payload for an AI Gateway log entry.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/logs/$ID/response \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{}
```

## Domain Types

### Log List Response

- `LogListResponse object { id, cached, created_at, 16 more }`

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

  - `request_type: optional string`

  - `response_content_type: optional string`

  - `status_code: optional number`

  - `step: optional number`

### Log Get Response

- `LogGetResponse object { id, cached, created_at, 22 more }`

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

### Log Edit Response

- `LogEditResponse = unknown`

### Log Delete Response

- `LogDeleteResponse object { success }`

  - `success: boolean`

### Log Request Response

- `LogRequestResponse = unknown`

### Log Response Response

- `LogResponseResponse = unknown`
