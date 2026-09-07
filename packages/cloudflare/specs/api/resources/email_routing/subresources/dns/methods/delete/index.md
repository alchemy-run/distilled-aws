## Disable Email Routing

**delete** `/zones/{zone_id}/email/routing/dns`

Disable your Email Routing zone. Also removes additional MX records previously required for Email Routing to work.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `EmailAPIResponseCommon object { errors, messages, success }`

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
    -X DELETE \
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
  "success": true
}
```
