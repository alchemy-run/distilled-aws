# Dynamic Routing

## List all AI Gateway Dynamic Routes.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes`

List all AI Gateway Dynamic Routes.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

### Query Parameters

- `page: optional number`

  Page number

- `per_page: optional number`

  Number of routes per page

### Returns

- `data: object { order_by, order_by_direction, page, 2 more }`

  - `order_by: string`

  - `order_by_direction: string`

  - `page: number`

  - `per_page: number`

  - `routes: array of object { id, account_tag, created_at, 6 more }`

    - `id: string`

    - `account_tag: string`

    - `created_at: string`

    - `deployment: object { created_at, deployment_id, version_id }`

      - `created_at: string`

      - `deployment_id: string`

      - `version_id: string`

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

    - `version: object { active, created_at, data, 2 more }`

      - `active: "true" or "false"`

        - `"true"`

        - `"false"`

      - `created_at: string`

      - `data: string`

      - `version_id: string`

      - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0,
    "routes": [
      {
        "id": "id",
        "account_tag": "account_tag",
        "created_at": "2019-12-27T18:11:19.117Z",
        "deployment": {
          "created_at": "created_at",
          "deployment_id": "deployment_id",
          "version_id": "version_id"
        },
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
        "version": {
          "active": "true",
          "created_at": "created_at",
          "data": "data",
          "version_id": "version_id",
          "is_valid": true
        }
      }
    ]
  },
  "success": true
}
```

## Get an AI Gateway Dynamic Route.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}`

Get an AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Returns

- `result: object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

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

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "deployment": {
      "created_at": "created_at",
      "deployment_id": "deployment_id",
      "version_id": "version_id"
    },
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
    "version": {
      "active": "true",
      "created_at": "created_at",
      "data": "data",
      "version_id": "version_id",
      "is_valid": true
    }
  },
  "success": true
}
```

## Create a new AI Gateway Dynamic Route.

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes`

Create a new AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

### Body Parameters

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

- `name: string`

### Returns

- `result: object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

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

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
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
          "name": "name"
        }'
```

#### Response

```json
{
  "result": {
    "id": "id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "deployment": {
      "created_at": "created_at",
      "deployment_id": "deployment_id",
      "version_id": "version_id"
    },
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
    "version": {
      "active": "true",
      "created_at": "created_at",
      "data": "data",
      "version_id": "version_id",
      "is_valid": true
    }
  },
  "success": true
}
```

## Update an AI Gateway Dynamic Route.

**patch** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}`

Update an AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Body Parameters

- `name: string`

### Returns

- `route: object { id, account_tag, created_at, 6 more }`

  - `id: string`

  - `account_tag: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

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

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Route Name"
        }'
```

#### Response

```json
{
  "route": {
    "id": "id",
    "account_tag": "account_tag",
    "created_at": "2019-12-27T18:11:19.117Z",
    "deployment": {
      "created_at": "created_at",
      "deployment_id": "deployment_id",
      "version_id": "version_id"
    },
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
    "version": {
      "active": "true",
      "created_at": "created_at",
      "data": "data",
      "version_id": "version_id",
      "is_valid": true
    }
  },
  "success": true
}
```

## Delete an AI Gateway Dynamic Route.

**delete** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}`

Delete an AI Gateway Dynamic Route.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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

## List all AI Gateway Dynamic Route Deployments.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/deployments`

List all AI Gateway Dynamic Route Deployments.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Returns

- `data: object { deployments, order_by, order_by_direction, 2 more }`

  - `deployments: array of object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

  - `order_by: string`

  - `order_by_direction: string`

  - `page: number`

  - `per_page: number`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/deployments \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "deployments": [
      {
        "created_at": "created_at",
        "deployment_id": "deployment_id",
        "version_id": "version_id"
      }
    ],
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0
  },
  "success": true
}
```

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

## List all AI Gateway Dynamic Route Versions.

**get** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions`

List all AI Gateway Dynamic Route Versions.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Returns

- `data: object { order_by, order_by_direction, page, 2 more }`

  - `order_by: string`

  - `order_by_direction: string`

  - `page: number`

  - `per_page: number`

  - `versions: array of object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/versions \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "order_by": "order_by",
    "order_by_direction": "order_by_direction",
    "page": 0,
    "per_page": 0,
    "versions": [
      {
        "active": "true",
        "created_at": "created_at",
        "data": "data",
        "version_id": "version_id",
        "is_valid": true
      }
    ]
  },
  "success": true
}
```

## Create a new AI Gateway Dynamic Route Version.

**post** `/accounts/{account_id}/ai-gateway/gateways/{gateway_id}/routes/{id}/versions`

Create a new AI Gateway Dynamic Route Version.

### Path Parameters

- `account_id: string`

- `gateway_id: string`

- `id: string`

### Body Parameters

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-gateway/gateways/$GATEWAY_ID/routes/$ID/versions \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
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
          ]
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

## Domain Types

### Dynamic Routing List Response

- `DynamicRoutingListResponse object { data, success }`

  - `data: object { order_by, order_by_direction, page, 2 more }`

    - `order_by: string`

    - `order_by_direction: string`

    - `page: number`

    - `per_page: number`

    - `routes: array of object { id, account_tag, created_at, 6 more }`

      - `id: string`

      - `account_tag: string`

      - `created_at: string`

      - `deployment: object { created_at, deployment_id, version_id }`

        - `created_at: string`

        - `deployment_id: string`

        - `version_id: string`

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

      - `version: object { active, created_at, data, 2 more }`

        - `active: "true" or "false"`

          - `"true"`

          - `"false"`

        - `created_at: string`

        - `data: string`

        - `version_id: string`

        - `is_valid: optional boolean`

  - `success: boolean`

### Dynamic Routing Get Response

- `DynamicRoutingGetResponse object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

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

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

### Dynamic Routing Create Response

- `DynamicRoutingCreateResponse object { id, created_at, deployment, 5 more }`

  - `id: string`

  - `created_at: string`

  - `deployment: object { created_at, deployment_id, version_id }`

    - `created_at: string`

    - `deployment_id: string`

    - `version_id: string`

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

  - `version: object { active, created_at, data, 2 more }`

    - `active: "true" or "false"`

      - `"true"`

      - `"false"`

    - `created_at: string`

    - `data: string`

    - `version_id: string`

    - `is_valid: optional boolean`

### Dynamic Routing Update Response

- `DynamicRoutingUpdateResponse object { route, success }`

  - `route: object { id, account_tag, created_at, 6 more }`

    - `id: string`

    - `account_tag: string`

    - `created_at: string`

    - `deployment: object { created_at, deployment_id, version_id }`

      - `created_at: string`

      - `deployment_id: string`

      - `version_id: string`

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

    - `version: object { active, created_at, data, 2 more }`

      - `active: "true" or "false"`

        - `"true"`

        - `"false"`

      - `created_at: string`

      - `data: string`

      - `version_id: string`

      - `is_valid: optional boolean`

  - `success: boolean`

### Dynamic Routing Delete Response

- `DynamicRoutingDeleteResponse object { id, created_at, elements, 3 more }`

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

### Dynamic Routing List Deployments Response

- `DynamicRoutingListDeploymentsResponse object { data, success }`

  - `data: object { deployments, order_by, order_by_direction, 2 more }`

    - `deployments: array of object { created_at, deployment_id, version_id }`

      - `created_at: string`

      - `deployment_id: string`

      - `version_id: string`

    - `order_by: string`

    - `order_by_direction: string`

    - `page: number`

    - `per_page: number`

  - `success: boolean`

### Dynamic Routing Create Deployment Response

- `DynamicRoutingCreateDeploymentResponse object { id, created_at, elements, 3 more }`

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

### Dynamic Routing List Versions Response

- `DynamicRoutingListVersionsResponse object { data, success }`

  - `data: object { order_by, order_by_direction, page, 2 more }`

    - `order_by: string`

    - `order_by_direction: string`

    - `page: number`

    - `per_page: number`

    - `versions: array of object { active, created_at, data, 2 more }`

      - `active: "true" or "false"`

        - `"true"`

        - `"false"`

      - `created_at: string`

      - `data: string`

      - `version_id: string`

      - `is_valid: optional boolean`

  - `success: boolean`

### Dynamic Routing Create Version Response

- `DynamicRoutingCreateVersionResponse object { id, created_at, elements, 3 more }`

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

### Dynamic Routing Get Version Response

- `DynamicRoutingGetVersionResponse object { id, active, created_at, 7 more }`

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
