# Raw

## Reads data for a raw event

**get** `/accounts/{account_id}/cloudforce-one/events/{event_id}/raw/{raw_id}`

Reads data for a raw event

### Path Parameters

- `account_id: string`

  Account ID.

- `event_id: string`

  Event UUID.

- `raw_id: string`

  Raw Event UUID.

### Returns

- `id: string`

- `accountId: number`

- `created: string`

- `data: unknown`

- `source: string`

- `tlp: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/$EVENT_ID/raw/$RAW_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "1234",
  "accountId": 1234,
  "created": "1970-01-01",
  "data": {},
  "source": "https://example.com",
  "tlp": "amber"
}
```

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

## Domain Types

### Raw Get Response

- `RawGetResponse object { id, accountId, created, 3 more }`

  - `id: string`

  - `accountId: number`

  - `created: string`

  - `data: unknown`

  - `source: string`

  - `tlp: string`

### Raw Edit Response

- `RawEditResponse object { id, data }`

  - `id: string`

  - `data: unknown`
