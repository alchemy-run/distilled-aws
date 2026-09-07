## Email Routing - DNS settings

**get** `/zones/{zone_id}/email/routing/dns`

Show the DNS records needed to configure your Email Routing zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `subdomain: optional string`

  Domain of your zone.

### Returns

- `EmailEmailRoutingDNSQueryResponse object { errors, messages, success, 2 more }`

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

  - `result: optional object { errors, record }`

    - `errors: optional array of object { code, missing }`

      - `code: optional string`

      - `missing: optional DNSRecord`

        List of records needed to enable an Email Routing zone.

        - `content: optional string`

          DNS record content.

        - `name: optional string`

          DNS record name (or @ for the zone apex).

        - `priority: optional number`

          Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.

        - `ttl: optional number or 1`

          Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.

          - `number`

          - `1`

            Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.

            - `1`

        - `type: optional "A" or "AAAA" or "CNAME" or 15 more`

          DNS record type.

          - `"A"`

          - `"AAAA"`

          - `"CNAME"`

          - `"HTTPS"`

          - `"TXT"`

          - `"SRV"`

          - `"LOC"`

          - `"MX"`

          - `"NS"`

          - `"CERT"`

          - `"DNSKEY"`

          - `"DS"`

          - `"NAPTR"`

          - `"SMIMEA"`

          - `"SSHFP"`

          - `"SVCB"`

          - `"TLSA"`

          - `"URI"`

    - `record: optional array of DNSRecord`

      - `content: optional string`

        DNS record content.

      - `name: optional string`

        DNS record name (or @ for the zone apex).

      - `priority: optional number`

        Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.

      - `ttl: optional number or 1`

        Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.

      - `type: optional "A" or "AAAA" or "CNAME" or 15 more`

        DNS record type.

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

- `EmailDNSSettingsResponseCollection object { errors, messages, success, 2 more }`

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

  - `result: optional array of DNSRecord`

    - `content: optional string`

      DNS record content.

    - `name: optional string`

      DNS record name (or @ for the zone apex).

    - `priority: optional number`

      Required for MX, SRV and URI records. Unused by other record types. Records with lower priorities are preferred.

    - `ttl: optional number or 1`

      Time to live, in seconds, of the DNS record. Must be between 60 and 86400, or 1 for 'automatic'.

    - `type: optional "A" or "AAAA" or "CNAME" or 15 more`

      DNS record type.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/dns \
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
    "errors": [
      {
        "code": "code",
        "missing": {
          "content": "route1.mx.cloudflare.net",
          "name": "example.com",
          "priority": 12,
          "ttl": 1,
          "type": "NS"
        }
      }
    ],
    "record": [
      {
        "content": "route1.mx.cloudflare.net",
        "name": "example.com",
        "priority": 12,
        "ttl": 1,
        "type": "NS"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
