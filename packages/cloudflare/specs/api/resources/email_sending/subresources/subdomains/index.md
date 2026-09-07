# Subdomains

## List sending subdomains

**get** `/zones/{zone_id}/email/sending/subdomains`

Lists all sending-enabled subdomains for the zone.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional array of object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains \
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
  "result": [
    {
      "enabled": true,
      "name": "sub.example.com",
      "tag": "aabbccdd11223344aabbccdd11223344",
      "created": "2014-01-02T02:20:00Z",
      "dkim_selector": "cf-bounce",
      "modified": "2014-01-02T02:20:00Z",
      "preview_enabled": true,
      "return_path_domain": "cf-bounce.sub.example.com"
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

## Get a sending subdomain

**get** `/zones/{zone_id}/email/sending/subdomains/{subdomain_id}`

Gets information for a specific sending subdomain.

### Path Parameters

- `zone_id: string`

  Identifier.

- `subdomain_id: string`

  Sending subdomain identifier.

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

- `result: optional object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains/$SUBDOMAIN_ID \
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
    "enabled": true,
    "name": "sub.example.com",
    "tag": "aabbccdd11223344aabbccdd11223344",
    "created": "2014-01-02T02:20:00Z",
    "dkim_selector": "cf-bounce",
    "modified": "2014-01-02T02:20:00Z",
    "preview_enabled": true,
    "return_path_domain": "cf-bounce.sub.example.com"
  }
}
```

## Create a sending subdomain

**post** `/zones/{zone_id}/email/sending/subdomains`

Creates a new sending subdomain or re-enables sending on an existing subdomain that had it disabled. If zone-level Email Sending has not been enabled yet, the zone flag is automatically set when the entitlement is present.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `name: string`

  The subdomain name. Must be within the zone.

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

- `result: optional object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "name": "sub.example.com"
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
    "enabled": true,
    "name": "sub.example.com",
    "tag": "aabbccdd11223344aabbccdd11223344",
    "created": "2014-01-02T02:20:00Z",
    "dkim_selector": "cf-bounce",
    "modified": "2014-01-02T02:20:00Z",
    "preview_enabled": true,
    "return_path_domain": "cf-bounce.sub.example.com"
  }
}
```

## Delete a sending subdomain

**delete** `/zones/{zone_id}/email/sending/subdomains/{subdomain_id}`

Disables sending on a subdomain and removes its DNS records. If routing is still active on the subdomain, only sending is disabled.

### Path Parameters

- `zone_id: string`

  Identifier.

- `subdomain_id: string`

  Sending subdomain identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains/$SUBDOMAIN_ID \
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

### Subdomain List Response

- `SubdomainListResponse object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

### Subdomain Get Response

- `SubdomainGetResponse object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

### Subdomain Create Response

- `SubdomainCreateResponse object { enabled, name, tag, 5 more }`

  - `enabled: boolean`

    Whether Email Sending is enabled on this subdomain.

  - `name: string`

    The subdomain domain name.

  - `tag: string`

    Sending subdomain identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `dkim_selector: optional string`

    The DKIM selector used for email signing.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `preview_enabled: optional boolean`

    Whether sent messages from this subdomain can be previewed in the activity log.

  - `return_path_domain: optional string`

    The return-path domain used for bounce handling.

### Subdomain Delete Response

- `SubdomainDeleteResponse object { errors, messages, success }`

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

# DNS

## Get sending subdomain DNS records

**get** `/zones/{zone_id}/email/sending/subdomains/{subdomain_id}/dns`

Returns the expected DNS records for a sending subdomain.

### Path Parameters

- `zone_id: string`

  Identifier.

- `subdomain_id: string`

  Sending subdomain identifier.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/sending/subdomains/$SUBDOMAIN_ID/dns \
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
  "result": [
    {
      "content": "route1.mx.cloudflare.net",
      "name": "example.com",
      "priority": 12,
      "ttl": 1,
      "type": "NS"
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
