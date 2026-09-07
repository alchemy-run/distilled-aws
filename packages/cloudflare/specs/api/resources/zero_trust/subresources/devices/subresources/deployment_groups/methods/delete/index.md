## Delete deployment group

**delete** `/accounts/{account_id}/devices/deployment-groups/{group_id}`

Deletes a deployment group. Associated policies no longer apply and devices stop receiving version targets. This endpoint is in Beta.

### Path Parameters

- `account_id: string`

- `group_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id }`

  - `id: optional string`

    The ID of a deleted deployment group.

- `success: boolean`

  Indicates whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/deployment-groups/$GROUP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "550e8400-e29b-41d4-a716-446655440000"
  },
  "success": true
}
```
