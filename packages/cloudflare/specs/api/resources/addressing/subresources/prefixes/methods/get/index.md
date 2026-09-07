## Prefix Details

**get** `/accounts/{account_id}/addressing/prefixes/{prefix_id}`

List a particular prefix owned by the account.

### Path Parameters

- `account_id: string`

  Identifier of a Cloudflare account.

- `prefix_id: string`

  Identifier of an IP Prefix.

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

- `result: optional Prefix`

  - `id: optional string`

    Identifier of an IP Prefix.

  - `account_id: optional string`

    Identifier of a Cloudflare account.

  - `advertised: optional boolean`

    Prefix advertisement status to the Internet. This field is only not 'null' if on demand is enabled.

  - `advertised_modified_at: optional string`

    Last time the advertisement status was changed. This field is only not 'null' if on demand is enabled.

  - `approved: optional string`

    Approval state of the prefix (P = pending, V = active).

  - `asn: optional number`

    Autonomous System Number (ASN) the prefix will be advertised under.

  - `cidr: optional string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `created_at: optional string`

  - `delegate_loa_creation: optional boolean`

    Whether Cloudflare is allowed to generate the LOA document on behalf of the prefix owner.

  - `description: optional string`

    Description of the prefix.

  - `irr_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `loa_document_id: optional string`

    Identifier for the uploaded LOA document.

  - `modified_at: optional string`

  - `on_demand_enabled: optional boolean`

    Whether advertisement of the prefix to the Internet may be dynamically enabled or disabled.

  - `on_demand_locked: optional boolean`

    Whether advertisement status of the prefix is locked, meaning it cannot be changed.

  - `ownership_validation_state: optional string`

    State of one kind of validation for an IP prefix.

  - `ownership_validation_token: optional string`

    Token provided to demonstrate ownership of the prefix.

  - `rpki_validation_state: optional string`

    State of one kind of validation for an IP prefix.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/addressing/prefixes/$PREFIX_ID \
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
    "id": "2af39739cc4e3b5910c918468bb89828",
    "account_id": "258def64c72dae45f3e4c8516e2111f2",
    "advertised": true,
    "advertised_modified_at": "2014-01-01T05:20:00.12345Z",
    "approved": "P",
    "asn": 13335,
    "cidr": "192.0.2.0/24",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "delegate_loa_creation": true,
    "description": "Internal test prefix",
    "irr_validation_state": "pending",
    "loa_document_id": "d933b1530bc56c9953cf8ce166da8004",
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "on_demand_enabled": true,
    "on_demand_locked": false,
    "ownership_validation_state": "pending",
    "ownership_validation_token": "1234a5b6-1234-1abc-12a3-1234a5b6789c",
    "rpki_validation_state": "pending"
  }
}
```
