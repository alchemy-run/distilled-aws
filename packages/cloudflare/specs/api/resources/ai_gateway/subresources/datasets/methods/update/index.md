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
