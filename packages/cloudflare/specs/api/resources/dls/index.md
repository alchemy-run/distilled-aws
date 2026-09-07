# Data Localization Suite

# Regions

## List DLS regions for an account

**get** `/accounts/{account_id}/dls/regions`

List DLS regions for an account

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

### Query Parameters

- `cursor: optional string`

  Opaque token for cursor-based pagination. Omit for the first page. Pass the value from a previous response to fetch the next page.

- `per_page: optional number`

- `type: optional "managed" or "custom"`

  Filter regions by type. Omit to return all regions.

  - `"managed"`

  - `"custom"`

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

- `result: array of object { id, created_on, modified_on, 4 more }`

  - `id: string`

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

  - `region_key: string`

  - `version: number`

  - `version_created_on: string`

- `result_info: object { count, cursor, per_page }`

  - `count: number`

    Number of items in the current page.

  - `cursor: string`

    Opaque cursor for the next page. Empty string when there are no more results.

  - `per_page: number`

    Maximum number of items per page.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regions \
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
      "id": "id",
      "created_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "region_key": "x",
      "version": 0,
      "version_created_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0
  },
  "success": true
}
```

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

## Domain Types

### Region List Response

- `RegionListResponse object { id, created_on, modified_on, 4 more }`

  - `id: string`

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

  - `region_key: string`

  - `version: number`

  - `version_created_on: string`

### Region Get Response

- `RegionGetResponse object { id, created_on, modified_on, 4 more }`

  - `id: string`

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

  - `region_key: string`

  - `version: number`

  - `version_created_on: string`

# Regional Services

# Prefix Bindings

## List DLS prefix bindings for an account

**get** `/accounts/{account_id}/dls/regional_services/prefix_bindings`

List DLS prefix bindings for an account

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

### Query Parameters

- `cursor: optional string`

  Opaque token for cursor-based pagination. Omit for the first page. Pass the value from a previous response to fetch the next page.

- `per_page: optional number`

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

- `result: array of object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

- `result_info: object { count, cursor, per_page }`

  - `count: number`

    Number of items in the current page.

  - `cursor: string`

    Opaque cursor for the next page. Empty string when there are no more results.

  - `per_page: number`

    Maximum number of items per page.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regional_services/prefix_bindings \
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
      "id": "id",
      "cidr": "cidr",
      "prefix_id": "prefix_id",
      "region_key": "x"
    }
  ],
  "result_info": {
    "count": 0,
    "cursor": "cursor",
    "per_page": 0
  },
  "success": true
}
```

## Get a DLS prefix binding

**get** `/accounts/{account_id}/dls/regional_services/prefix_bindings/{binding_id}`

Get a DLS prefix binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `binding_id: string`

  Unique identifier for the prefix binding.

### Returns

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

- `success: boolean`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regional_services/prefix_bindings/$BINDING_ID \
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
    "cidr": "cidr",
    "prefix_id": "prefix_id",
    "region_key": "x"
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

## Create a DLS prefix binding

**post** `/accounts/{account_id}/dls/regional_services/prefix_bindings`

Create a DLS prefix binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

### Body Parameters

- `cidr: string`

  IP prefix in CIDR notation to bind.

- `prefix_id: string`

  The ID of the parent IP prefix that contains the CIDR.

- `region_key: string`

  Region key from managed regions (e.g., "us", "eu").

### Returns

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

- `success: boolean`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regional_services/prefix_bindings \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cidr": "10.0.1.0/24",
          "prefix_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
          "region_key": "eu"
        }'
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
    "cidr": "cidr",
    "prefix_id": "prefix_id",
    "region_key": "x"
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

## Update a DLS prefix binding

**patch** `/accounts/{account_id}/dls/regional_services/prefix_bindings/{binding_id}`

Update a DLS prefix binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `binding_id: string`

  Unique identifier for the prefix binding.

### Body Parameters

- `region_key: string`

  New region key to assign (e.g., "us", "eu", "cfcanary").

### Returns

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

- `success: boolean`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regional_services/prefix_bindings/$BINDING_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "region_key": "eu"
        }'
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
    "cidr": "cidr",
    "prefix_id": "prefix_id",
    "region_key": "x"
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

## Delete a DLS prefix binding

**delete** `/accounts/{account_id}/dls/regional_services/prefix_bindings/{binding_id}`

Delete a DLS prefix binding

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `binding_id: string`

  Unique identifier for the prefix binding.

### Returns

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: boolean`

- `errors: optional array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dls/regional_services/prefix_bindings/$BINDING_ID \
    -X DELETE \
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

## Domain Types

### Prefix Binding List Response

- `PrefixBindingListResponse object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

### Prefix Binding Get Response

- `PrefixBindingGetResponse object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

### Prefix Binding Create Response

- `PrefixBindingCreateResponse object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

### Prefix Binding Edit Response

- `PrefixBindingEditResponse object { id, cidr, prefix_id, region_key }`

  - `id: string`

    The ID of the binding.

  - `cidr: string`

    The CIDR that is bound.

  - `prefix_id: string`

    The ID of the parent prefix.

  - `region_key: string`

    The region key used for the binding.

### Prefix Binding Delete Response

- `PrefixBindingDeleteResponse object { messages, success, errors }`

  - `messages: array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `success: boolean`

  - `errors: optional array of ResponseInfo`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`
