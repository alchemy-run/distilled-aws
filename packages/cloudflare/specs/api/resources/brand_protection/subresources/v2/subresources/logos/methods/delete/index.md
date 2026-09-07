## Delete logo query

**delete** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/logo/queries/{query_id}`

Delete a saved brand protection logo query. Returns 404 if the query ID doesn't exist.

### Path Parameters

- `account_id: string`

- `query_id: string`

### Returns

- `message: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/logo/queries/$QUERY_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "message": "message",
  "success": true
}
```
