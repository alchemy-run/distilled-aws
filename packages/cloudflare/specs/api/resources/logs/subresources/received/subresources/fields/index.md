# Fields

## List fields

**get** `/zones/{zone_id}/logs/received/fields`

Lists all fields available. The response is json object with key-value pairs, where keys are field names, and values are descriptions.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `key: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/logs/received/fields \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "key": "value"
}
```

## Domain Types

### Field Get Response

- `FieldGetResponse object { key }`

  - `key: optional string`
