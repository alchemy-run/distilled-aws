## Read token.

**get** `/accounts/{account_id}/ai-search/tokens/{id}`

Read token.

### Path Parameters

- `account_id: string`

- `id: string`

### Returns

- `result: object { id, cf_api_id, created_at, 6 more }`

  - `id: string`

  - `cf_api_id: string`

  - `created_at: string`

  - `modified_at: string`

  - `name: string`

  - `created_by: optional string`

  - `enabled: optional boolean`

  - `legacy: optional boolean`

  - `modified_by: optional string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/ai-search/tokens/$ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "cf_api_id": "cf_api_id",
    "created_at": "2019-12-27T18:11:19.117Z",
    "modified_at": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "created_by": "created_by",
    "enabled": true,
    "legacy": true,
    "modified_by": "modified_by"
  },
  "success": true
}
```
