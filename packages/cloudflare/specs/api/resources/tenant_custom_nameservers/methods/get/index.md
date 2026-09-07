## List Tenant Custom Nameservers

**get** `/tenants/{tenant_tag}/custom_ns`

List a tenant's custom nameservers.

### Path Parameters

- `tenant_tag: string`

  Tenant identifier tag.

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

- `result: optional array of object { dns_records, ns_name, status, 2 more }`

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

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/tenants/$TENANT_TAG/custom_ns \
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
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
