## Removes an event reference

**delete** `/accounts/{account_id}/cloudforce-one/events/relate/{event_id}`

Removes an event reference

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Returns

- `result: object { success }`

  - `success: boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/relate/$EVENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "success": true
  },
  "success": true
}
```
