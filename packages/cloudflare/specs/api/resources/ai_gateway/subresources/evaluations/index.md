# Evaluations

## List Evaluations

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations`

Lists all AI Gateway evaluator types configured for the account.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Query Parameters

- `name: optional string`

- `page: optional number`

- `per_page: optional number`

- `processed: optional boolean`

- `search: optional string`

  Search by id, name

### Returns

- `result: array of object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": [
    {
      "id": "id",
      "created_at": "2019-12-27T18:11:19.117Z",
      "datasets": [
        {
          "id": "id",
          "account_id": "account_id",
          "account_tag": "account_tag",
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
      "gateway_id": "my-gateway",
      "modified_at": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "processed": true,
      "results": [
        {
          "id": "id",
          "created_at": "2019-12-27T18:11:19.117Z",
          "evaluation_id": "evaluation_id",
          "evaluation_type_id": "evaluation_type_id",
          "modified_at": "2019-12-27T18:11:19.117Z",
          "result": "result",
          "status": 0,
          "status_description": "status_description",
          "total_logs": 0
        }
      ],
      "total_logs": 0
    }
  ],
  "success": true
}
```

## Fetch a Evaluation

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}`

Retrieves details for a specific AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "datasets": [
      {
        "id": "id",
        "account_id": "account_id",
        "account_tag": "account_tag",
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
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "processed": true,
    "results": [
      {
        "id": "id",
        "created_at": "2019-12-27T18:11:19.117Z",
        "evaluation_id": "evaluation_id",
        "evaluation_type_id": "evaluation_type_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "result": "result",
        "status": 0,
        "status_description": "status_description",
        "total_logs": 0
      }
    ],
    "total_logs": 0
  },
  "success": true
}
```

## Create a new Evaluation

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations`

Creates a new AI Gateway.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

### Body Parameters

- `dataset_ids: array of string`

- `evaluation_type_ids: array of string`

- `name: string`

### Returns

- `result: object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dataset_ids": [
            "string"
          ],
          "evaluation_type_ids": [
            "string"
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
    "datasets": [
      {
        "id": "id",
        "account_id": "account_id",
        "account_tag": "account_tag",
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
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "processed": true,
    "results": [
      {
        "id": "id",
        "created_at": "2019-12-27T18:11:19.117Z",
        "evaluation_id": "evaluation_id",
        "evaluation_type_id": "evaluation_type_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "result": "result",
        "status": 0,
        "status_description": "status_description",
        "total_logs": 0
      }
    ],
    "total_logs": 0
  },
  "success": true
}
```

## Delete a Evaluation

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/evaluations/{id}`

Deletes an AI Gateway dataset.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

  gateway id

- `id: string`

### Returns

- `result: object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/evaluations/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "datasets": [
      {
        "id": "id",
        "account_id": "account_id",
        "account_tag": "account_tag",
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
    "gateway_id": "my-gateway",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "processed": true,
    "results": [
      {
        "id": "id",
        "created_at": "2019-12-27T18:11:19.117Z",
        "evaluation_id": "evaluation_id",
        "evaluation_type_id": "evaluation_type_id",
        "modified_at": "2019-12-27T18:11:19.117Z",
        "result": "result",
        "status": 0,
        "status_description": "status_description",
        "total_logs": 0
      }
    ],
    "total_logs": 0
  },
  "success": true
}
```

## Domain Types

### Evaluation List Response

- `EvaluationListResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

### Evaluation Get Response

- `EvaluationGetResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

### Evaluation Create Response

- `EvaluationCreateResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`

### Evaluation Delete Response

- `EvaluationDeleteResponse object { id, created_at, datasets, 6 more }`

  - `id: string`

  - `created_at: string`

  - `datasets: array of object { id, account_id, account_tag, 6 more }`

    - `id: string`

    - `account_id: string`

    - `account_tag: string`

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

  - `gateway_id: string`

    gateway id

  - `modified_at: string`

  - `name: string`

  - `processed: boolean`

  - `results: array of object { id, created_at, evaluation_id, 6 more }`

    - `id: string`

    - `created_at: string`

    - `evaluation_id: string`

    - `evaluation_type_id: string`

    - `modified_at: string`

    - `result: string`

    - `status: number`

    - `status_description: string`

    - `total_logs: number`

  - `total_logs: number`
