# Subnets

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

# WARP

## Create WARP IP subnet

**post** `/accounts/{account_id}/zerotrust/subnets/warp`

Create a WARP IP assignment subnet. Currently, only IPv4 subnets can be created.

**Network constraints:**

- The network must be within one of the following private IP ranges:
  - `10.0.0.0/8` (RFC 1918)
  - `172.16.0.0/12` (RFC 1918)
  - `192.168.0.0/16` (RFC 1918)
  - `100.64.0.0/10` (RFC 6598 - CGNAT)
- The subnet must have a prefix length of `/24` or larger (e.g., `/16`, `/20`, `/24` are valid; `/25`, `/28` are not)

### Path Parameters

- `account_id: string`

  Cloudflare account ID

### Body Parameters

- `name: string`

  A user-friendly name for the subnet.

- `network: string`

  The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

- `comment: optional string`

  An optional description of the subnet.

- `is_default_network: optional boolean`

  If `true`, this is the default subnet for the account. There can only be one default subnet per account.

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

- `result: Subnet`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/warp \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "IPv4 Cloudflare Source IPs",
          "network": "100.64.0.0/12",
          "comment": "example comment"
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
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "is_default_network": true,
    "name": "IPv4 Cloudflare Source IPs",
    "network": "100.64.0.0/12",
    "subnet_type": "cloudflare_source"
  },
  "success": true
}
```

## Get WARP IP subnet

**get** `/accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}`

Get a WARP IP assignment subnet.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `subnet_id: string`

  The UUID of the subnet.

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

- `result: Subnet`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/warp/$SUBNET_ID \
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
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "is_default_network": true,
    "name": "IPv4 Cloudflare Source IPs",
    "network": "100.64.0.0/12",
    "subnet_type": "cloudflare_source"
  },
  "success": true
}
```

## Update WARP IP subnet

**patch** `/accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}`

Updates a WARP IP assignment subnet.

**Update constraints:**

- The `network` field cannot be modified for WARP subnets. Only `name`, `comment`, and `is_default_network` can be updated.
- IPv6 subnets cannot be updated

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `subnet_id: string`

  The UUID of the subnet.

### Body Parameters

- `comment: optional string`

  An optional description of the subnet.

- `is_default_network: optional boolean`

  If `true`, this is the default subnet for the account. There can only be one default subnet per account.

- `name: optional string`

  A user-friendly name for the subnet.

- `network: optional string`

  The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

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

- `result: Subnet`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/warp/$SUBNET_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "example comment",
          "name": "IPv4 Cloudflare Source IPs",
          "network": "100.64.0.0/12"
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
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "is_default_network": true,
    "name": "IPv4 Cloudflare Source IPs",
    "network": "100.64.0.0/12",
    "subnet_type": "cloudflare_source"
  },
  "success": true
}
```

## Delete WARP IP subnet

**delete** `/accounts/{account_id}/zerotrust/subnets/warp/{subnet_id}`

Delete a WARP IP assignment subnet. This operation is idempotent - deleting an already-deleted or non-existent subnet will return success with a null result.

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `subnet_id: string`

  The UUID of the subnet.

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

- `result: object { id, comment, created_at, 5 more }`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/warp/$SUBNET_ID \
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
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "is_default_network": true,
    "name": "IPv4 Cloudflare Source IPs",
    "network": "100.64.0.0/12",
    "subnet_type": "cloudflare_source"
  },
  "success": true
}
```

## Domain Types

### Subnet

- `Subnet object { id, comment, created_at, 5 more }`

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

### WARP Delete Response

- `WARPDeleteResponse object { id, comment, created_at, 5 more }`

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

# Cloudflare Source

## Update Cloudflare Source Subnet

**patch** `/accounts/{account_id}/zerotrust/subnets/cloudflare_source/{address_family}`

Updates the Cloudflare Source subnet of the given address family

### Path Parameters

- `account_id: string`

  Cloudflare account ID

- `address_family: "v4" or "v6"`

  IP address family, either `v4` (IPv4) or `v6` (IPv6)

  - `"v4"`

  - `"v6"`

### Body Parameters

- `comment: optional string`

  An optional description of the subnet.

- `name: optional string`

  A user-friendly name for the subnet.

- `network: optional string`

  The private IPv4 or IPv6 range defining the subnet, in CIDR notation.

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

- `result: Subnet`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zerotrust/subnets/cloudflare_source/$ADDRESS_FAMILY \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "comment": "example comment",
          "name": "IPv4 Cloudflare Source IPs",
          "network": "100.64.0.0/12"
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
    "comment": "example comment",
    "created_at": "2021-01-25T18:22:34.317854Z",
    "deleted_at": "2009-11-10T23:00:00.000000Z",
    "is_default_network": true,
    "name": "IPv4 Cloudflare Source IPs",
    "network": "100.64.0.0/12",
    "subnet_type": "cloudflare_source"
  },
  "success": true
}
```
