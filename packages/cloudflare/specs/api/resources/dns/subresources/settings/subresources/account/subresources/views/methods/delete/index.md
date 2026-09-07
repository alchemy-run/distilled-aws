## Delete Internal DNS View

**delete** `/accounts/{account_id}/dns_settings/views/{view_id}`

Delete an existing Internal DNS View

### Path Parameters

- `account_id: string`

  Identifier.

- `view_id: string`

  Identifier.

### Returns

- `result: optional object { id }`

  - `id: optional string`

    Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_settings/views/$VIEW_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```
