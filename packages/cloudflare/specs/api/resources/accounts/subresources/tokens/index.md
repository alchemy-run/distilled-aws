# Tokens

## List Tokens

**get** `/accounts/{account_id}/tokens`

List all Account Owned API tokens created for this account.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Direction to order results.

  - `"asc"`

  - `"desc"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

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

- `result: optional array of Token`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens \
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
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

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

## Create Token

**post** `/accounts/{account_id}/tokens`

Create a new Account Owned API token.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `name: string`

  Token name.

- `policies: array of TokenPolicy`

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

- `condition: optional object { request_ip }`

  - `request_ip: optional object { in, not_in }`

    Client IP restrictions.

    - `in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

    - `not_in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

- `expires_on: optional string`

  The expiration time on or after which the JWT MUST NOT be accepted for processing.

- `not_before: optional string`

  The time before which the token MUST NOT be accepted for processing.

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

- `result: optional object { id, condition, expires_on, 8 more }`

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

  - `value: optional TokenValue`

    The token value.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "readonly token",
          "policies": [
            {
              "effect": "allow",
              "permission_groups": [
                {
                  "id": "c8fed203ed3043cba015a93ad1616f1f",
                  "meta": {}
                },
                {
                  "id": "82e64a83756745bbbb1c9c2701bf816b",
                  "meta": {}
                }
              ],
              "resources": {
                "foo": "string"
              }
            }
          ],
          "expires_on": "2020-01-01T00:00:00Z",
          "not_before": "2018-07-01T05:20:00Z"
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
    "status": "active",
    "value": "8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
  }
}
```

## Update Token

**put** `/accounts/{account_id}/tokens/{token_id}`

Update an existing token.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `token_id: string`

  Token identifier tag.

### Body Parameters

- `name: string`

  Token name.

- `policies: array of TokenPolicy`

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

- `condition: optional object { request_ip }`

  - `request_ip: optional object { in, not_in }`

    Client IP restrictions.

    - `in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

    - `not_in: optional array of TokenConditionCIDRList`

      List of IPv4/IPv6 CIDR addresses.

- `expires_on: optional string`

  The expiration time on or after which the JWT MUST NOT be accepted for processing.

- `not_before: optional string`

  The time before which the token MUST NOT be accepted for processing.

- `status: optional "active" or "disabled" or "expired"`

  Status of the token.

  - `"active"`

  - `"disabled"`

  - `"expired"`

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
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "readonly token",
          "policies": [
            {
              "effect": "allow",
              "permission_groups": [
                {
                  "id": "c8fed203ed3043cba015a93ad1616f1f",
                  "meta": {}
                },
                {
                  "id": "82e64a83756745bbbb1c9c2701bf816b",
                  "meta": {}
                }
              ],
              "resources": {
                "foo": "string"
              }
            }
          ],
          "expires_on": "2020-01-01T00:00:00Z",
          "not_before": "2018-07-01T05:20:00Z",
          "status": "active"
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

## Delete Token

**delete** `/accounts/{account_id}/tokens/{token_id}`

Destroy an Account Owned API token.

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

- `result: optional object { id }`

  - `id: string`

    Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/$TOKEN_ID \
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

## Verify Token

**get** `/accounts/{account_id}/tokens/verify`

Test whether a token works.

### Path Parameters

- `account_id: string`

  Account identifier tag.

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

- `result: optional object { id, status, expires_on, not_before }`

  - `id: string`

    Token identifier tag.

  - `status: "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/verify \
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
    "status": "active",
    "expires_on": "2020-01-01T00:00:00Z",
    "not_before": "2018-07-01T05:20:00Z"
  }
}
```

## Domain Types

### Token Create Response

- `TokenCreateResponse object { id, condition, expires_on, 8 more }`

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

  - `value: optional TokenValue`

    The token value.

### Token Delete Response

- `TokenDeleteResponse object { id }`

  - `id: string`

    Identifier

### Token Verify Response

- `TokenVerifyResponse object { id, status, expires_on, not_before }`

  - `id: string`

    Token identifier tag.

  - `status: "active" or "disabled" or "expired"`

    Status of the token.

    - `"active"`

    - `"disabled"`

    - `"expired"`

  - `expires_on: optional string`

    The expiration time on or after which the JWT MUST NOT be accepted for processing.

  - `not_before: optional string`

    The time before which the token MUST NOT be accepted for processing.

# Permission Groups

## List Permission Groups

**get** `/accounts/{account_id}/tokens/permission_groups`

Find all available permission groups for Account Owned API Tokens

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `name: optional string`

  Filter by the name of the permission group.
  The value must be URL-encoded.

- `scope: optional string`

  Filter by the scope of the permission group.
  The value must be URL-encoded.

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

- `result: optional array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/permission_groups \
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
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## List Permission Groups

**get** `/accounts/{account_id}/tokens/permission_groups`

Find all available permission groups for Account Owned API Tokens

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Query Parameters

- `name: optional string`

  Filter by the name of the permission group.
  The value must be URL-encoded.

- `scope: optional string`

  Filter by the scope of the permission group.
  The value must be URL-encoded.

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

- `result: optional array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/permission_groups \
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
      "id": "7cf72faf220841aabcfdfab81c43c4f6",
      "category": "account_and_billing",
      "name": "Billing Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "9d24387c6e8544e2bc4024a03991339f",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "d2a1802cc9a34e30852f8b33869b2f3c",
      "category": "network_services",
      "name": "Load Balancing: Monitors and Pools Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "8b47d2786a534c08a1f94ee8f9f599ef",
      "category": "developer_platform",
      "name": "Workers KV Storage Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "f7f0eda5697f475c90846e879bab8666",
      "category": "developer_platform",
      "name": "Workers KV Storage Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "1a71c399035b4950a1bd1466bbe4f420",
      "category": "developer_platform",
      "name": "Workers Scripts Read",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    },
    {
      "id": "e086da7e2179491d91ee5f35b3ca210a",
      "category": "developer_platform",
      "name": "Workers Scripts Write",
      "scopes": [
        "com.cloudflare.api.account"
      ]
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Permission Group List Response

- `PermissionGroupListResponse object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

### Permission Group Get Response

- `PermissionGroupGetResponse = array of object { id, category, name, scopes }`

  - `id: optional string`

    Public ID.

  - `category: optional "developer_platform" or "ai_and_machine_learning" or "dns_and_zones" or 10 more`

    Product category that this permission group belongs to.

    - `"developer_platform"`

    - `"ai_and_machine_learning"`

    - `"dns_and_zones"`

    - `"app_security"`

    - `"rules_and_configuration"`

    - `"cloudflare_one_and_zero_trust"`

    - `"analytics_and_logs"`

    - `"network_services"`

    - `"media"`

    - `"email_and_messaging"`

    - `"cache_and_performance"`

    - `"account_and_billing"`

    - `"other"`

  - `name: optional string`

    Permission Group Name

  - `scopes: optional array of "com.cloudflare.api.account" or "com.cloudflare.api.account.zone" or "com.cloudflare.api.user" or "com.cloudflare.edge.r2.bucket"`

    Resources to which the Permission Group is scoped

    - `"com.cloudflare.api.account"`

    - `"com.cloudflare.api.account.zone"`

    - `"com.cloudflare.api.user"`

    - `"com.cloudflare.edge.r2.bucket"`

# Value

## Roll Token

**put** `/accounts/{account_id}/tokens/{token_id}/value`

Roll the Account Owned API token secret.

### Path Parameters

- `account_id: string`

  Account identifier tag.

- `token_id: string`

  Token identifier tag.

### Body Parameters

- `body: unknown`

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

- `result: optional TokenValue`

  The token value.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/tokens/$TOKEN_ID/value \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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
  "result": "8M7wS6hCpXVc-DoRnPPY_UCWPgy8aea4Wy6kCe5T"
}
```
