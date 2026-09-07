## Delete namespace.

**delete** `/accounts/{account_id}/ai-search/namespaces/{name}`

Delete namespace.

### Path Parameters

- `account_id: string`

- `name: string`

### Returns

- `result: unknown`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/namespaces/$NAME \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```
