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
