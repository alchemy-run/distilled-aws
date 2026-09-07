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
