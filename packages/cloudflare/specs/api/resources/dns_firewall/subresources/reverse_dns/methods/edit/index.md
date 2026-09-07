## Update DNS Firewall Cluster Reverse DNS

**patch** `/accounts/{account_id}/dns_firewall/{dns_firewall_id}/reverse_dns`

Update reverse DNS configuration (PTR records) for a DNS Firewall cluster

### Path Parameters

- `account_id: string`

  Identifier.

- `dns_firewall_id: string`

  Identifier.

### Body Parameters

- `ptr: optional map[string]`

  Map of cluster IP addresses to PTR record contents

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

- `result: optional object { ptr }`

  - `ptr: map[string]`

    Map of cluster IP addresses to PTR record contents

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_firewall/$DNS_FIREWALL_ID/reverse_dns \
    -X PATCH \
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
  "result": {
    "ptr": {
      "foo": "string"
    }
  }
}
```
