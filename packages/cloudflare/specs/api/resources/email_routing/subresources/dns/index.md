# DNS

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

## Enable Email Routing

**post** `/zones/{zone_id}/email/routing/dns`

Enable you Email Routing zone. Add and lock the necessary MX and SPF records.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `name: optional string`

  Domain of your zone.

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

- `result: optional Settings`

  - `id: string`

    Email Routing settings identifier.

  - `enabled: true or false`

    State of the zone settings for Email Routing.

    - `true`

    - `false`

  - `name: string`

    Domain of your zone.

  - `created: optional string`

    The date and time the settings have been created.

  - `modified: optional string`

    The date and time the settings have been modified.

  - `skip_wizard: optional true or false`

    Flag to check if the user skipped the configuration wizard.

    - `true`

    - `false`

  - `status: optional "ready" or "unconfigured" or "misconfigured" or 2 more`

    Show the state of your account, and the type or configuration error.

    - `"ready"`

    - `"unconfigured"`

    - `"misconfigured"`

    - `"misconfigured/locked"`

    - `"unlocked"`

  - `support_subaddress: optional true or false`

    Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.

    - `true`

    - `false`

  - `tag: optional string`

    Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/dns \
    -X POST \
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
    "id": "75610dab9e69410a82cf7e400a09ecec",
    "enabled": true,
    "name": "example.net",
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "skip_wizard": true,
    "status": "ready",
    "support_subaddress": true,
    "tag": "75610dab9e69410a82cf7e400a09ecec"
  }
}
```

## Unlock Email Routing

**patch** `/zones/{zone_id}/email/routing/dns`

Unlock MX Records previously locked by Email Routing.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `name: optional string`

  Domain of your zone.

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

- `result: optional Settings`

  - `id: string`

    Email Routing settings identifier.

  - `enabled: true or false`

    State of the zone settings for Email Routing.

    - `true`

    - `false`

  - `name: string`

    Domain of your zone.

  - `created: optional string`

    The date and time the settings have been created.

  - `modified: optional string`

    The date and time the settings have been modified.

  - `skip_wizard: optional true or false`

    Flag to check if the user skipped the configuration wizard.

    - `true`

    - `false`

  - `status: optional "ready" or "unconfigured" or "misconfigured" or 2 more`

    Show the state of your account, and the type or configuration error.

    - `"ready"`

    - `"unconfigured"`

    - `"misconfigured"`

    - `"misconfigured/locked"`

    - `"unlocked"`

  - `support_subaddress: optional true or false`

    Whether subaddressing (plus-addressing) is honored when matching incoming mail against routing rules.

    - `true`

    - `false`

  - `tag: optional string`

    Email Routing settings tag. (Deprecated, replaced by Email Routing settings identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/dns \
    -X PATCH \
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
    "id": "75610dab9e69410a82cf7e400a09ecec",
    "enabled": true,
    "name": "example.net",
    "created": "2014-01-02T02:20:00Z",
    "modified": "2014-01-02T02:20:00Z",
    "skip_wizard": true,
    "status": "ready",
    "support_subaddress": true,
    "tag": "75610dab9e69410a82cf7e400a09ecec"
  }
}
```

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

## Domain Types

### DNS Record

- `DNSRecord object { content, name, priority, 2 more }`

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

### DNS Get Response

- `DNSGetResponse = object { errors, messages, success, 2 more }  or object { errors, messages, success, 2 more }`

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
