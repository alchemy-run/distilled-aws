## Create Prefix Delegation

**post** `/accounts/{account_id}/addressing/prefixes/{prefix_id}/delegations`

Create a new account delegation for a given IP prefix.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

### Body Parameters

- `cidr: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `delegated_account_id: string`

  Account identifier for the account to which prefix is being delegated.

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

- `result: optional Delegations`

  - `id: optional string`

    Identifier of a Delegation.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegated_account_id: optional string`

    Account identifier for the account to which prefix is being delegated.

  - `modified_at: optional string`

  - `parent_prefix_id: optional string`

    Identifier of an IP Prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID/delegations \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "cidr": "192.0.2.0/24",
          "delegated_account_id": "b1946ac92492d2347c6235b4d2611184"
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
    "id": "d933b1530bc56c9953cf8ce166da8004",
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegated_account_id": "b1946ac92492d2347c6235b4d2611184",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "parent_prefix_id": "2af39739cc4e3b5910c918468bb89828"
  }
}
```
