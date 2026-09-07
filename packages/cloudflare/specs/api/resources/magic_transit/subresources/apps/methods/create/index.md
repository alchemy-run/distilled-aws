## Create a new App

**post** `/accounts/{account_id}/magic/apps`

Creates a new App for an account

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `name: string`

  Display name for the app.

- `type: string`

  Category of the app.

- `hostnames: optional array of string`

  FQDNs to associate with traffic decisions.

- `ip_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

- `source_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Cloudflare Dashboard",
          "type": "Development"
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
  "result": {
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "hostnames": [
      "auth.cloudflare.com"
    ],
    "ip_subnets": [
      "192.0.2.0/24"
    ],
    "name": "Cloudflare Dashboard",
    "source_subnets": [
      "192.0.2.0/24"
    ],
    "type": "Development"
  },
  "success": true
}
```
