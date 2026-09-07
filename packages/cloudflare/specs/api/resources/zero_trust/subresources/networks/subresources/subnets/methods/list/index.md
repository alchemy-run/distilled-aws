## List Subnets

**get** `/accounts/{account_id}/zerotrust/subnets`

Lists and filters subnets in an account.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Query Parameters

- `address_family: optional "v4" or "v6"`

  If set, only include subnets in the given address family - `v4` or `v6`

  - `"v4"`

  - `"v6"`

- `comment: optional string`

  If set, only list subnets with the given comment.

- `existed_at: optional string`

  If provided, include only resources that were created (and not deleted) before this time. URL encoded.

- `is_default_network: optional boolean`

  If `true`, only include default subnets. If `false`, exclude default subnets subnets. If not set, all subnets will be included.

- `is_deleted: optional boolean`

  If `true`, only include deleted subnets. If `false`, exclude deleted subnets. If not set, all subnets will be included.

- `name: optional string`

  If set, only list subnets with the given name

- `network: optional string`

  If set, only list the subnet whose network exactly matches the given CIDR.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of results to display.

- `sort_order: optional "asc" or "desc"`

  Sort order of the results. `asc` means oldest to newest, `desc` means newest to oldest. If not set, they will not be in any particular order.

  - `"asc"`

  - `"desc"`

- `subnet_types: optional "cloudflare_source" or "warp"`

  If set, the types of subnets to include, separated by comma.

  - `"cloudflare_source"`

  - `"warp"`

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

- `result: array of Subnet`

  - `id: optional string`

    The UUID of the subnet.

  - `comment: optional string`

    An optional description of the subnet.

  - `created_at: optional string`

    Timestamp of when the resource was created.

  - `deleted_at: optional string`

    Timestamp of when the resource was deleted. If `null`, the resource has not been deleted.

  - `is_default_network: optional boolean`

    If `true`, this is the default subnet for the account. There can only be one default subnet per account.

  - `name: optional string`

    A user-friendly name for the subnet.

  - `network: optional string`

    The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

  - `subnet_type: optional "cloudflare_source" or "warp"`

    The type of subnet.

    - `"cloudflare_source"`

    - `"warp"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets \
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
      "comment": "example comment",
      "created_at": "2021-01-25T18:22:34.317854Z",
      "deleted_at": "2009-11-10T23:00:00.000000Z",
      "is_default_network": true,
      "name": "IPv4 Cloudflare Source IPs",
      "network": "100.64.0.0/12",
      "subnet_type": "cloudflare_source"
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
