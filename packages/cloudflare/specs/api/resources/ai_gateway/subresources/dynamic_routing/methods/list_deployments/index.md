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
