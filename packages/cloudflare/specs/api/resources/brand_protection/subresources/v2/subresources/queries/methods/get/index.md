## Get queries

**get** `/accounts/{account_id}/cloudforce-one/v2/brand-protection/domain/queries`

Get all saved brand protection queries for an account

### Path Parameters

- `account_id: string`

### Query Parameters

- `id: optional string`

### Returns

- `created: string`

- `parameters: object { string_matches, max_time, min_time }`

  - `string_matches: array of object { pattern }`

    - `pattern: string`

  - `max_time: optional string`

  - `min_time: optional string`

- `query_id: number`

- `query_tag: string`

- `scan: boolean`

- `updated: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/v2/brand-protection/domain/queries \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "created": "created",
    "parameters": {
      "string_matches": [
        {
          "pattern": "x"
        }
      ],
      "max_time": "max_time",
      "min_time": "min_time"
    },
    "query_id": 0,
    "query_tag": "query_tag",
    "scan": true,
    "updated": "updated"
  }
]
```
