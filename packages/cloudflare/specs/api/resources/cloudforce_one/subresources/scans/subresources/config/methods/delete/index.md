## Delete a Scan Config

**delete** `/accounts/{account_id}/cloudforce-one/scans/config/{config_id}`

Delete a Scan Config

### Path Parameters

- `account_id: string`

  Defines the Account ID.

- `config_id: string`

  Defines the Config ID.

### Returns

- `errors: array of string`

- `messages: array of string`

- `result: unknown`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/config/$CONFIG_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    "string"
  ],
  "messages": [
    "string"
  ],
  "result": {},
  "success": true
}
```
