# Addresses

## List destination addresses

**get** `/accounts/{account_id}/email/routing/addresses`

Lists existing destination addresses.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Sorts results in an ascending or descending order.

  - `"asc"`

  - `"desc"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `verified: optional true or false`

  Filter by verified destination addresses.

  - `true`

  - `false`

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional array of Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true,
  "result": [
    {
      "id": "ea95132c15732412d22c1476fa83f27a",
      "created": "2014-01-02T02:20:00Z",
      "email": "user@example.com",
      "modified": "2014-01-02T02:20:00Z",
      "tag": "ea95132c15732412d22c1476fa83f27a",
      "verified": "2014-01-02T02:20:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 1,
    "total_pages": 100
  }
}
```

## Get a destination address

**get** `/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}`

Gets information for a specific destination email already created.

### Path Parameters

- `account_id: string`

  Identifier.

- `destination_address_identifier: string`

  Destination address identifier.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses/$DESTINATION_ADDRESS_IDENTIFIER \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true,
  "result": {
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Create a destination address

**post** `/accounts/{account_id}/email/routing/addresses`

Create a destination address to forward your emails to. Destination addresses need to be verified before they can be used.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `email: string`

  The contact email address of the user.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "email": "user@example.com"
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
  "success": true,
  "result": {
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Update destination address

**patch** `/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}`

Updates the status of a specific destination address.

### Path Parameters

- `account_id: string`

  Identifier.

- `destination_address_identifier: string`

  Destination address identifier.

### Body Parameters

- `status: "unverified" or "verified"`

  Destination address status. Non-admin callers may only set verified addresses back to unverified; setting to verified requires admin privileges.

  - `"unverified"`

  - `"verified"`

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses/$DESTINATION_ADDRESS_IDENTIFIER \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "status": "verified"
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
  "success": true,
  "result": {
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Delete destination address

**delete** `/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}`

Deletes a specific destination address.

### Path Parameters

- `account_id: string`

  Identifier.

- `destination_address_identifier: string`

  Destination address identifier.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses/$DESTINATION_ADDRESS_IDENTIFIER \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
  "success": true,
  "result": {
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Domain Types

### Address

- `Address object { id, created, email, 3 more }`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.
