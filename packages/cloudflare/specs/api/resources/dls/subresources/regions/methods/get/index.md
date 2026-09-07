## Get a DLS region

**get** `/accounts/{account_id}/dls/regions/{region_id}`

Get a DLS region

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `region_id: string`

  UUID of the region (custom or managed) or region_key of a managed region.

### Returns

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { id, created_on, modified_on, 4 more }`

  - `id: string`

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

  - `region_key: string`

  - `version: number`

  - `version_created_on: string`

- `success: boolean`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regions/$REGION_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
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
    "id": "id",
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "name",
    "region_key": "x",
    "version": 0,
    "version_created_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true,
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ]
}
```
