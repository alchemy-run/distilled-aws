# Datasets

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

## Reads a dataset

**get** `/accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}`

Reads a dataset

### Path Parameters

- `account_id: string`

  Account ID.

- `dataset_id: string`

  Dataset ID.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "deletedAt": "deletedAt"
}
```

## Creates a dataset

**post** `/accounts/{account_id}/cloudforce-one/events/dataset/create`

Creates a dataset

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `isPublic: boolean`

  If true, then anyone can search the dataset. If false, then its limited to the account.

- `name: string`

  Used to describe the dataset within the account context.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/create \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "isPublic": true,
          "name": "x"
        }'
```

#### Response

```json
{
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "deletedAt": "deletedAt"
}
```

## Updates an existing dataset

**patch** `/accounts/{account_id}/cloudforce-one/events/dataset/{dataset_id}`

Updates an existing dataset

### Path Parameters

- `account_id: string`

  Account ID.

- `dataset_id: string`

  Dataset ID.

### Body Parameters

- `isPublic: boolean`

  If true, then anyone can search the dataset. If false, then its limited to the account.

- `name: string`

  Used to describe the dataset within the account context.

### Returns

- `isPublic: boolean`

- `name: string`

- `uuid: string`

- `deletedAt: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/events/dataset/$DATASET_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "isPublic": true,
          "name": "x"
        }'
```

#### Response

```json
{
  "isPublic": true,
  "name": "friendly dataset name",
  "uuid": "12345678-1234-1234-1234-1234567890ab",
  "deletedAt": "deletedAt"
}
```

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

## Domain Types

### Dataset List Response

- `DatasetListResponse = array of object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Get Response

- `DatasetGetResponse object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Create Response

- `DatasetCreateResponse object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Edit Response

- `DatasetEditResponse object { isPublic, name, uuid, deletedAt }`

  - `isPublic: boolean`

  - `name: string`

  - `uuid: string`

  - `deletedAt: optional string`

### Dataset Raw Response

- `DatasetRawResponse object { id, accountId, created, 3 more }`

  - `id: number`

  - `accountId: number`

  - `created: string`

  - `data: string`

  - `source: string`

  - `tlp: string`

# Health
