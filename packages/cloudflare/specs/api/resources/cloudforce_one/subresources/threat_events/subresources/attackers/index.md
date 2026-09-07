# Attackers

## Lists attackers across multiple datasets

**get** `/accounts/{account_id}/cloudforce-one/events/attackers`

Lists attackers across multiple datasets

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `datasetIds: optional array of string`

  Array of dataset IDs to query attackers from. If not provided, uses the default dataset.

### Returns

- `items: object { type }`

  - `type: string`

- `type: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/attackers \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "items": {
    "type": "string"
  },
  "type": "array"
}
```

## Domain Types

### Attacker List Response

- `AttackerListResponse object { items, type }`

  - `items: object { type }`

    - `type: string`

  - `type: string`
