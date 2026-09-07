## Create a new AI Gateway Dynamic Route Deployment.

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments`

Create a new AI Gateway Dynamic Route Deployment.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Body Parameters

- `version_id: string`

### Returns

- `result: object { id, created_at, elements, 3 more }`

  - `id: string`

  - `created_at: string`

  - `elements: array of object { id, outputs, type }  or object { id, outputs, properties, type }  or object { id, outputs, type }  or 3 more`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: object { next }`

        - `next: object { elementId }`

          - `elementId: string`

      - `type: "start"`

        - `"start"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { false, true }`

        - `false: object { elementId }`

          - `elementId: string`

        - `true: object { elementId }`

          - `elementId: string`

      - `properties: object { conditions }`

        - `conditions: optional unknown`

      - `type: "conditional"`

        - `"conditional"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "percentage"`

        - `"percentage"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { key, limit, limitType, window }`

        - `key: string`

        - `limit: number`

        - `limitType: "count" or "cost"`

          - `"count"`

          - `"cost"`

        - `window: number`

      - `type: "rate"`

        - `"rate"`

    - `object { id, outputs, properties, type }`

      - `id: string`

      - `outputs: object { fallback, success }`

        - `fallback: object { elementId }`

          - `elementId: string`

        - `success: object { elementId }`

          - `elementId: string`

      - `properties: object { model, provider, retries, timeout }`

        - `model: string`

        - `provider: string`

        - `retries: number`

        - `timeout: number`

      - `type: "model"`

        - `"model"`

    - `object { id, outputs, type }`

      - `id: string`

      - `outputs: map[object { elementId } ]`

        - `elementId: string`

      - `type: "end"`

        - `"end"`

  - `gateway_id: string`

  - `modified_at: string`

  - `name: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/deployments \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "version_id": "54442216"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "elements": [
      {
        "id": "id",
        "outputs": {
          "next": {
            "elementId": "elementId"
          }
        },
        "type": "start"
      }
    ],
    "gateway_id": "gateway_id",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name"
  },
  "success": true
}
```
