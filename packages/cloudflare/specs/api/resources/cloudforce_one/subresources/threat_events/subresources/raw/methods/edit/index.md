## Updates a raw event

**patch** `/accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}`

Updates a raw event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

- `raw_id: string`

  Raw Event UUID.

### Body Parameters

- `data: optional unknown`

- `source: optional string`

- `tlp: optional string`

### Returns

- `id: string`

- `data: unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID/raw/$RAW_ID \
    -X PATCH \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "1234",
  "data": {}
}
```
