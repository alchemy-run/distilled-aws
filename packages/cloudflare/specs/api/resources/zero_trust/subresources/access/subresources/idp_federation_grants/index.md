# IdP Federation Grants

## List IdP federation grants

**get** `/accounts/{account_id}/access/idp_federation_grants`

Lists the IdP federation grants owned by the account.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: optional array of IdPFederationGrant`

  - `id: string`

    UID of the IdP federation grant.

  - `idp_id: string`

    UID of the identity provider being federated.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/idp_federation_grants \
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
  "success": true,
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "idp_id": "a79de439-0e7f-4ebb-8a02-222222222222"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Create an IdP federation grant

**post** `/accounts/{account_id}/access/idp_federation_grants`

Creates an IdP federation grant for the specified identity provider, making it
available for federation to other accounts in the same Cloudflare organization.

The account must belong to a Cloudflare organization. One-time pin and
Cloudflare-managed identity providers cannot be federated. An account
can federate at most five identity providers at a time.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `idp_id: string`

  UID of the identity provider to federate. Must be an existing identity provider in this account. One-time pin and Cloudflare-managed identity providers cannot be federated.

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

- `result: optional IdPFederationGrant`

  - `id: string`

    UID of the IdP federation grant.

  - `idp_id: string`

    UID of the identity provider being federated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/idp_federation_grants \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "idp_id": "a79de439-0e7f-4ebb-8a02-222222222222"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "idp_id": "a79de439-0e7f-4ebb-8a02-222222222222"
  }
}
```

## Get an IdP federation grant

**get** `/accounts/{account_id}/access/idp_federation_grants/{grant_id}`

Retrieves a single IdP federation grant by its UID.

### Path Parameters

- `account_id: string`

  Identifier.

- `grant_id: string`

  Identifier.

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

- `result: optional IdPFederationGrant`

  - `id: string`

    UID of the IdP federation grant.

  - `idp_id: string`

    UID of the identity provider being federated.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/idp_federation_grants/$GRANT_ID \
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "idp_id": "a79de439-0e7f-4ebb-8a02-222222222222"
  }
}
```

## Delete an IdP federation grant

**delete** `/accounts/{account_id}/access/idp_federation_grants/{grant_id}`

Deletes an IdP federation grant. The identity provider remains in the account,
but it is no longer available for federation to other accounts.

### Path Parameters

- `account_id: string`

  Identifier.

- `grant_id: string`

  Identifier.

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

- `result: optional object { id }`

  - `id: optional string`

    UID of the deleted IdP federation grant.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/idp_federation_grants/$GRANT_ID \
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### IdP Federation Grant

- `IdPFederationGrant object { id, idp_id }`

  - `id: string`

    UID of the IdP federation grant.

  - `idp_id: string`

    UID of the identity provider being federated.

### IdP Federation Grant List Response

- `IdPFederationGrantListResponse = array of IdPFederationGrant`

  - `id: string`

    UID of the IdP federation grant.

  - `idp_id: string`

    UID of the identity provider being federated.

### IdP Federation Grant Delete Response

- `IdPFederationGrantDeleteResponse object { id }`

  - `id: optional string`

    UID of the deleted IdP federation grant.
