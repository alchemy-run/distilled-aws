## Get an AI Gateway Dynamic Route Version.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions/{version_id}`

Get an AI Gateway Dynamic Route Version.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

- `version_id: string`

### Returns

- `result: object { id, active, created_at, 7 more }`

  - `id: string`

  - `active: "true" or "false"`

    - `"true"`

    - `"false"`

  - `created_at: string`

  - `data: string`

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

  - `version_id: string`

  - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/versions/$VERSION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "active": "true",
    "created_at": "created_at",
    "data": "data",
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
    "name": "name",
    "version_id": "version_id",
    "is_valid": true
  },
  "success": true
}
```
