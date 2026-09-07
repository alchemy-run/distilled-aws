# Account Organizations

## Move account

**post** `/accounts/{account_id}/move`

Move an account within an organization hierarchy or an account outside an organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `account_id: string`

### Body Parameters

- `destination_organization_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: object { account_id, destination_organization_id, source_organization_id }`

  - `account_id: string`

  - `destination_organization_id: string`

  - `source_organization_id: string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/move \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "destination_organization_id": "destination_organization_id"
        }'
```

#### Response

```json
{
  "errors": [],
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
    "account_id": "account_id",
    "destination_organization_id": "destination_organization_id",
    "source_organization_id": "source_organization_id"
  },
  "success": true
}
```

## Domain Types

### Account Organization Create Response

- `AccountOrganizationCreateResponse object { account_id, destination_organization_id, source_organization_id }`

  - `account_id: string`

  - `destination_organization_id: string`

  - `source_organization_id: string`
