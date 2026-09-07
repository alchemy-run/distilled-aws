## Get tenant

**get** `/tenants/{tenant_id}`

Retrieves a Tenant by Tenant ID.

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

- `result: Tenant`

  - `cdate: string`

  - `edate: string`

  - `tenant_contacts: object { email, website }`

    - `email: optional string`

    - `website: optional string`

  - `tenant_labels: array of string`

  - `tenant_metadata: object { dns }`

    - `dns: optional object { ns_pool }`

      - `ns_pool: object { primary, secondary }`

        - `primary: optional string`

        - `secondary: optional string`

  - `tenant_name: string`

  - `tenant_network: unknown`

  - `tenant_status: string`

  - `tenant_tag: string`

  - `tenant_type: string`

  - `tenant_units: array of object { unit_memberships, unit_metadata, unit_name, 2 more }`

    - `unit_memberships: array of unknown`

    - `unit_metadata: unknown`

    - `unit_name: string`

    - `unit_status: string`

    - `unit_tag: string`

  - `customer_id: optional string`

- `success: true`

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_ID \
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
    "cdate": "2019-12-27T18:11:19.117Z",
    "edate": "2019-12-27T18:11:19.117Z",
    "tenant_contacts": {
      "email": "email",
      "website": "website"
    },
    "tenant_labels": [
      "string"
    ],
    "tenant_metadata": {
      "dns": {
        "ns_pool": {
          "primary": "primary",
          "secondary": "secondary"
        }
      }
    },
    "tenant_name": "tenant_name",
    "tenant_network": {},
    "tenant_status": "tenant_status",
    "tenant_tag": "tenant_tag",
    "tenant_type": "tenant_type",
    "tenant_units": [
      {
        "unit_memberships": [
          {}
        ],
        "unit_metadata": {},
        "unit_name": "unit_name",
        "unit_status": "unit_status",
        "unit_tag": "unit_tag"
      }
    ],
    "customer_id": "customer_id"
  },
  "success": true
}
```
