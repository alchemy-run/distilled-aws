## Reads raw data for an event by UUID

**get** `/accounts/{account_id}/cloudforce-one/events/raw/{dataset_id}/{event_id}`

Retrieves the raw data associated with an event. Searches across all shards in the dataset.

### Path Parameters

- `account_id: string`

  Account ID.

- `dataset_id: string`

  Dataset ID.

- `event_id: string`

  Event ID.

### Returns

- `id: number`

- `accountId: number`

- `created: string`

- `data: string`

- `source: string`

- `tlp: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/raw/$DATASET_ID/$EVENT_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": 1,
  "accountId": 1234,
  "created": "1970-01-01T00:00:00.000Z",
  "data": "{\"foo\": \"bar\"}",
  "source": "https://example.com",
  "tlp": "amber"
}
```
