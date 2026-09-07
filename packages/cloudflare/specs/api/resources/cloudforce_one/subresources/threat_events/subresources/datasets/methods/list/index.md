## Lists all datasets in an account

**get** `/accounts/{account_id}/cloudforce-one/events/dataset`

Lists all datasets in an account

### Path Parameters

- `account_id: string`

  Account ID.

### Query Parameters

- `includeDeleted: optional boolean`

  When true, include soft-deleted datasets in the response. Each item includes a `deletedAt` field (ISO 8601 or null). Default: false.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "isPublic": true,
    "name": "friendly dataset name",
    "uuid": "12345678-1234-1234-1234-1234567890ab",
    "deletedAt": "deletedAt"
  }
]
```
