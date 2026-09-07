## Adds a tag to an event

**post** `/accounts/{account_id}/cloudforce-one/events/event_tag/{event_id}/create`

Adds a tag to an event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

### Body Parameters

- `tags: array of string`

### Returns

- `result: object { success }`

  - `success: boolean`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/event_tag/$EVENT_ID/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "tags": [
            "botnet"
          ]
        }'
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
