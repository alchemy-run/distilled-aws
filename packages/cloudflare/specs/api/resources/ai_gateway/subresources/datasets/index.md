# Datasets

## List Datasets

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `enable: optional boolean`

- `name: optional string`

- `page: optional number`

- `per_page: optional number`

- `search: optional string`

  Search by id, name, filters

### Returns

- `result: array of object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "enable": true,
      "filters": [
        {
          "key": "created_at",
          "operator": "eq",
          "value": [
            "string"
          ]
        }
      ],
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name"
    }
  ],
  "success": true
}
```

## Fetch a Dataset

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}`

Retrieves details for a specific AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Create a new Dataset

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Body Parameters

- `enable: boolean`

- `filters: array of object { key, operator, value }`

  - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

    - `"created_at"`

    - `"request_content_type"`

    - `"response_content_type"`

    - `"success"`

    - `"cached"`

    - `"provider"`

    - `"model"`

    - `"cost"`

    - `"tokens"`

    - `"tokens_in"`

    - `"tokens_out"`

    - `"duration"`

    - `"feedback"`

  - `operator: "eq" or "contains" or "lt" or "gt"`

    - `"eq"`

    - `"contains"`

    - `"lt"`

    - `"gt"`

  - `value: array of string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `name: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enable": true,
          "filters": [
            {
              "key": "created_at",
              "operator": "eq",
              "value": [
                "string"
              ]
            }
          ],
          "name": "name"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Update a Dataset

**put** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}`

Updates an existing AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Body Parameters

- `enable: boolean`

- `filters: array of object { key, operator, value }`

  - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

    - `"created_at"`

    - `"request_content_type"`

    - `"response_content_type"`

    - `"success"`

    - `"cached"`

    - `"provider"`

    - `"model"`

    - `"cost"`

    - `"tokens"`

    - `"tokens_in"`

    - `"tokens_out"`

    - `"duration"`

    - `"feedback"`

  - `operator: "eq" or "contains" or "lt" or "gt"`

    - `"eq"`

    - `"contains"`

    - `"lt"`

    - `"gt"`

  - `value: array of string or number or boolean`

    - `string`

    - `number`

    - `boolean`

- `name: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets/$ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enable": true,
          "filters": [
            {
              "key": "created_at",
              "operator": "eq",
              "value": [
                "string"
              ]
            }
          ],
          "name": "name"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Delete a Dataset

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/datasets/{id}`

Deletes an AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/datasets/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "enable": true,
    "filters": [
      {
        "key": "created_at",
        "operator": "eq",
        "value": [
          "string"
        ]
      }
    ],
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```

## Domain Types

### Dataset List Response

- `DatasetListResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Get Response

- `DatasetGetResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Create Response

- `DatasetCreateResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Update Response

- `DatasetUpdateResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

### Dataset Delete Response

- `DatasetDeleteResponse object { id, created_at, enable, 4 more }`

  - `id: string`

  - `created_at: string`

  - `enable: boolean`

  - `filters: array of object { key, operator, value }`

    - `key: "created_at" or "request_content_type" or "response_content_type" or 10 more`

      - `"created_at"`

      - `"request_content_type"`

      - `"response_content_type"`

      - `"success"`

      - `"cached"`

      - `"provider"`

      - `"model"`

      - `"cost"`

      - `"tokens"`

      - `"tokens_in"`

      - `"tokens_out"`

      - `"duration"`

      - `"feedback"`

    - `operator: "eq" or "contains" or "lt" or "gt"`

      - `"eq"`

      - `"contains"`

      - `"lt"`

      - `"gt"`

    - `value: array of string or number or boolean`

      - `string`

      - `number`

      - `boolean`

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`
