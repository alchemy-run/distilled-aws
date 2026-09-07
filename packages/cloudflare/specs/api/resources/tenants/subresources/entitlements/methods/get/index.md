## List tenant entitlements

**get** `/tenants/{tenant_id}/entitlements`

List of innate entitlements available for the Tenant.

### Path Parameters

- `tenant_id: string`

### Returns

- `errors: array of unknown`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `result: TenantEntitlements`

  - `allow_add_subdomain: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `allow_auto_accept_invites: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `cname_setup_allowed: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

  - `custom_entitlements: array of object { allocation, feature }`

    - `allocation: object { type, value }  or object { type, value }  or object { type, value }`

      - `OrganizationsAPIMaxCountAllocation object { type, value }`

        - `type: "max_count"`

          - `"max_count"`

        - `value: number`

      - `OrganizationsAPIBoolAllocation object { type, value }`

        - `type: "bool"`

          - `"bool"`

        - `value: boolean`

      - `OrganizationsAPINullAllocation object { type, value }`

        - `type: ""`

          - `""`

        - `value: optional unknown`

    - `feature: object { key }`

      - `key: string`

  - `mhs_certificate_count: object { type, value }`

    - `type: "max_count"`

      - `"max_count"`

    - `value: number`

  - `partial_setup_allowed: object { type, value }`

    - `type: "bool"`

      - `"bool"`

    - `value: boolean`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID/entitlements \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "allow_add_subdomain": {
      "type": "bool",
      "value": true
    },
    "allow_auto_accept_invites": {
      "type": "bool",
      "value": true
    },
    "cname_setup_allowed": {
      "type": "bool",
      "value": true
    },
    "custom_entitlements": [
      {
        "allocation": {
          "type": "max_count",
          "value": 0
        },
        "feature": {
          "key": "key"
        }
      }
    ],
    "mhs_certificate_count": {
      "type": "max_count",
      "value": 0
    },
    "partial_setup_allowed": {
      "type": "bool",
      "value": true
    }
  },
  "success": true
}
```
