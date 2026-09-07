## Add Account Custom Nameserver

**post** `/accounts/{account_id}/custom_ns`

Adds a custom nameserver to the account for use as a vanity nameserver on zones.

### Path Parameters

- `account_id: string`

  Account identifier tag.

### Body Parameters

- `ns_name: string`

  The FQDN of the name server.

- `ns_set: optional number`

  The number of the set that this name server belongs to.

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

- `result: optional CustomNameserver`

  A single account custom nameserver.

  - `dns_records: array of object { type, value }`

    A and AAAA records associated with the nameserver.

    - `type: optional "A" or "AAAA"`

      DNS record type.

      - `"A"`

      - `"AAAA"`

    - `value: optional string`

      DNS record contents (an IPv4 or IPv6 address).

  - `ns_name: string`

    The FQDN of the name server.

  - `status: "moved" or "pending" or "verified"`

    Verification status of the nameserver.

    - `"moved"`

    - `"pending"`

    - `"verified"`

  - `zone_tag: string`

    Identifier.

  - `ns_set: optional number`

    The number of the set that this name server belongs to.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/custom_ns \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ns_name": "ns1.example.com",
          "ns_set": 1
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
    "dns_records": [
      {
        "type": "A",
        "value": "1.1.1.1"
      }
    ],
    "ns_name": "ns1.example.com",
    "status": "verified",
    "zone_tag": "023e105f4ecef8ad9ca31a8372d0c353",
    "ns_set": 1
  }
}
```
