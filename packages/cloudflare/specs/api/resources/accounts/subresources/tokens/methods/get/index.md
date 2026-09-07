## Token Details

**get** `/accounts/{account_id}/tokens/{token_id}`

Get information about a specific Account Owned API token.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `token_id: string`

  Token identifier tag.

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

- `result: optional Token`

  - `id: optional string`

    Token identifier tag.

  - `condition: optional object { request_ip }`

    - `request_ip: optional object { in, not_in }`

      Client IP restrictions.

      - `in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

      - `not_in: optional array of TokenConditionCIDRList`

        List of IPv4/IPv6 CIDR addresses.

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `issued_on: optional string`

    The time on which the token was created.

  - `last_used_on: optional string`

    Last time the token was used.

  - `modified_on: optional string`

    Last time the token was modified.

  - `name: optional string`

    Token name.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

  - `policies: optional array of TokenPolicy`

    List of access policies assigned to the token.

    - `id: string`

      Policy identifier.

    - `effect: "allow" or "deny"`

      Allow or deny operations against the resources.

      - `"allow"`

      - `"deny"`

    - `permission_groups: array of object { id, meta, name }`

      A set of permission groups that are specified to the policy.

      - `id: string`

        Identifier of the permission group.

      - `meta: optional object { key, value }`

        Attributes associated to the permission group.

        - `key: optional string`

        - `value: optional string`

      - `name: optional string`

        Name of the permission group.

    - `resources: map[string] or map[map[string]]`

      A list of resource names that the policy applies to.

      - `IAMResourcesTypeObjectString = map[string]`

        Map of simple string resource permissions

      - `IAMResourcesTypeObjectNested = map[map[string]]`

        Map of nested resource permissions

  - `status: optional "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/$TOKEN_ID \
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
    "id": "ed17574386854bf78a67040be0a770b0",
    "condition": {
      "request_ip": {
        "in": [
          "123.123.123.0/24",
          "2606:4700::/32"
        ],
        "not_in": [
          "123.123.123.100/24",
          "2606:4700:4700::/48"
        ]
      }
    },
    "expires_on": "2020-01-01T00:00:00Z",
    "issued_on": "2018-07-01T05:20:00Z",
    "last_used_on": "2020-01-02T12:34:00Z",
    "modified_on": "2018-07-02T05:20:00Z",
    "name": "readonly token",
    "not_before": "2018-07-01T05:20:00Z",
    "policies": [
      {
        "id": "f267e341f3dd4697bd3b9f71dd96247f",
        "effect": "allow",
        "permission_groups": [
          {
            "id": "c8fed203ed3043cba015a93ad1616f1f",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Zone Read"
          },
          {
            "id": "82e64a83756745bbbb1c9c2701bf816b",
            "meta": {
              "key": "key",
              "value": "value"
            },
            "name": "Magic Network Monitoring"
          }
        ],
        "resources": {
          "foo": "string"
        }
      }
    ],
    "status": "active"
  }
}
```
