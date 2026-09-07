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
