# Virtual Networks

## List virtual networks

**get** `/accounts/{account_id}/teamnet/virtual_networks`

Lists and filters virtual networks in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Query Parameters

- `id: optional string`

  UUID of the virtual network.

- `is_default: optional boolean`

  If `true`, only include the default virtual network. If `false`, exclude the default virtual network. If empty, all virtual networks will be included.

- `is_default_network: optional boolean`

  If `true`, only include the default virtual network. If `false`, exclude the default virtual network. If empty, all virtual networks will be included.

- `is_deleted: optional boolean`

  If `true`, only include deleted virtual networks. If `false`, exclude deleted virtual networks. If empty, all virtual networks will be included.

- `name: optional string`

  A user-friendly name for the virtual network.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of VirtualNetwork`

  - `id: string`

    UUID of the virtual network.

  - `comment: string`

    Optional remark describing the virtual network.

  - `created_at: string`

    Timestamp of when the resource was created.

  - `is_default_network: boolean`

    If `true`, this virtual network is the default for the account.

  - `name: string`

    A user-friendly name for the virtual network.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": [
    {
      "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
      "comment": "Staging VPC for data science",
      "created_at": "2021-01-25T18:22:34.317854Z",
      "is_default_network": true,
      "name": "us-east-1-vpc",
      "deleted_at": "2009-11-10T23:00:00.000000Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get a virtual network

**get** `/accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}`

Get a virtual network.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `virtual_network_id: string`

  UUID of the virtual network.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: VirtualNetwork`

  - `id: string`

    UUID of the virtual network.

  - `comment: string`

    Optional remark describing the virtual network.

  - `created_at: string`

    Timestamp of when the resource was created.

  - `is_default_network: boolean`

    If `true`, this virtual network is the default for the account.

  - `name: string`

    A user-friendly name for the virtual network.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks/$VIRTUAL_NETWORK_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "comment": "Staging VPC for data science",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "is_default_network": true,
    "name": "us-east-1-vpc",
    "deleted_at": "2009-11-10T23:00:00.000000Z"
  },
  "success": true
}
```

## Create a virtual network

**post** `/accounts/{account_id}/teamnet/virtual_networks`

Adds a new virtual network to an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Body Parameters

- `name: string`

  A user-friendly name for the virtual network.

- `comment: optional string`

  Optional remark describing the virtual network.

- `is_default: optional boolean`

  If `true`, this virtual network is the default for the account.

- `is_default_network: optional boolean`

  If `true`, this virtual network is the default for the account.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: VirtualNetwork`

  - `id: string`

    UUID of the virtual network.

  - `comment: string`

    Optional remark describing the virtual network.

  - `created_at: string`

    Timestamp of when the resource was created.

  - `is_default_network: boolean`

    If `true`, this virtual network is the default for the account.

  - `name: string`

    A user-friendly name for the virtual network.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "us-east-1-vpc",
          "comment": "Staging VPC for data science",
          "is_default": true
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "comment": "Staging VPC for data science",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "is_default_network": true,
    "name": "us-east-1-vpc",
    "deleted_at": "2009-11-10T23:00:00.000000Z"
  },
  "success": true
}
```

## Update a virtual network

**patch** `/accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}`

Updates an existing virtual network.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `virtual_network_id: string`

  UUID of the virtual network.

### Body Parameters

- `comment: optional string`

  Optional remark describing the virtual network.

- `is_default_network: optional boolean`

  If `true`, this virtual network is the default for the account.

- `name: optional string`

  A user-friendly name for the virtual network.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: VirtualNetwork`

  - `id: string`

    UUID of the virtual network.

  - `comment: string`

    Optional remark describing the virtual network.

  - `created_at: string`

    Timestamp of when the resource was created.

  - `is_default_network: boolean`

    If `true`, this virtual network is the default for the account.

  - `name: string`

    A user-friendly name for the virtual network.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks/$VIRTUAL_NETWORK_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "Staging VPC for data science",
          "name": "us-east-1-vpc"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "comment": "Staging VPC for data science",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "is_default_network": true,
    "name": "us-east-1-vpc",
    "deleted_at": "2009-11-10T23:00:00.000000Z"
  },
  "success": true
}
```

## Delete a virtual network

**delete** `/accounts/{account_id}/teamnet/virtual_networks/{virtual_network_id}`

Deletes an existing virtual network.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `virtual_network_id: string`

  UUID of the virtual network.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: VirtualNetwork`

  - `id: string`

    UUID of the virtual network.

  - `comment: string`

    Optional remark describing the virtual network.

  - `created_at: string`

    Timestamp of when the resource was created.

  - `is_default_network: boolean`

    If `true`, this virtual network is the default for the account.

  - `name: string`

    A user-friendly name for the virtual network.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/teamnet/virtual_networks/$VIRTUAL_NETWORK_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "comment": "Staging VPC for data science",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "is_default_network": true,
    "name": "us-east-1-vpc",
    "deleted_at": "2009-11-10T23:00:00.000000Z"
  },
  "success": true
}
```

## Domain Types

### Virtual Network

- `VirtualNetwork object { id, comment, created_at, 3 more }`

  - `id: string`

    UUID of the virtual network.

  - `comment: string`

    Optional remark describing the virtual network.

  - `created_at: string`

    Timestamp of when the resource was created.

  - `is_default_network: boolean`

    If `true`, this virtual network is the default for the account.

  - `name: string`

    A user-friendly name for the virtual network.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.
