# Email Routing

## Get Email Routing settings

**get** `/zones/{zone_id}/email/routing`

Get information about the settings for your Email Routing zone.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing \
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

**post** `/zones/{zone_id}/email/routing/disable`

Disable your Email Routing zone. Also removes additional MX records previously required for Email Routing to work.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: unknown`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/disable \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
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

## Enable Email Routing

**post** `/zones/{zone_id}/email/routing/enable`

Enable you Email Routing zone. Add and lock the necessary MX and SPF records.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: unknown`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/enable \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
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

**post** `/zones/{zone_id}/email/routing/unlock`

Unlock MX records previously locked by Email Routing. Deprecated - use PATCH /zones/{zone_id}/email/routing/dns instead.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/unlock \
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

## Domain Types

### Settings

- `Settings object { id, enabled, name, 6 more }`

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

# Rules

## Get routing rule

**get** `/zones/{zone_id}/email/routing/rules/{rule_identifier}`

Get information for a specific routing rule already created.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_identifier: string`

  Routing rule identifier.

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

- `result: optional EmailRoutingRule`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of Action`

    List actions patterns.

    - `type: "drop" or "forward" or "worker"`

      Type of supported action.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of Matcher`

    Matching patterns to forward to your actions.

    - `type: "all" or "literal"`

      Type of matcher.

      - `"all"`

      - `"literal"`

    - `field: optional "to"`

      Field for type matcher.

      - `"to"`

    - `value: optional string`

      Value for matcher.

  - `name: optional string`

    Routing rule name.

  - `priority: optional number`

    Priority of the routing rule.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/$RULE_IDENTIFIER \
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
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "literal",
        "field": "to",
        "value": "test@example.com"
      }
    ],
    "name": "Send to user@example.net rule.",
    "priority": 0,
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Create routing rule

**post** `/zones/{zone_id}/email/routing/rules`

Rules consist of a set of criteria for matching emails (such as an email being sent to a specific custom email address) plus a set of actions to take on the email (like forwarding it to a specific destination address). Forward actions require all destination addresses to be verified.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `actions: array of Action`

  List actions patterns.

  - `type: "drop" or "forward" or "worker"`

    Type of supported action.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

- `matchers: array of Matcher`

  Matching patterns to forward to your actions.

  - `type: "all" or "literal"`

    Type of matcher.

    - `"all"`

    - `"literal"`

  - `field: optional "to"`

    Field for type matcher.

    - `"to"`

  - `value: optional string`

    Value for matcher.

- `enabled: optional true or false`

  Routing rule status.

  - `true`

  - `false`

- `name: optional string`

  Routing rule name.

- `owner_worker_tag: optional string`

  Public tag (script_tag) of the Worker that owns this rule. Required when
  `source` is `wrangler`.

- `priority: optional number`

  Priority of the routing rule.

- `source: optional "api" or "wrangler"`

  Who manages the rule. `api` covers dashboard, generic API, and Terraform;
  `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
  to `api` when omitted on write.

  - `"api"`

  - `"wrangler"`

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

- `result: optional EmailRoutingRule`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of Action`

    List actions patterns.

    - `type: "drop" or "forward" or "worker"`

      Type of supported action.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of Matcher`

    Matching patterns to forward to your actions.

    - `type: "all" or "literal"`

      Type of matcher.

      - `"all"`

      - `"literal"`

    - `field: optional "to"`

      Field for type matcher.

      - `"to"`

    - `value: optional string`

      Value for matcher.

  - `name: optional string`

    Routing rule name.

  - `priority: optional number`

    Priority of the routing rule.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "actions": [
            {
              "type": "forward"
            }
          ],
          "matchers": [
            {
              "type": "literal"
            }
          ],
          "enabled": true,
          "name": "Send to user@example.net rule.",
          "owner_worker_tag": "a7e6fb77503c41d8a7f3113c6918f10c",
          "source": "api"
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
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "literal",
        "field": "to",
        "value": "test@example.com"
      }
    ],
    "name": "Send to user@example.net rule.",
    "priority": 0,
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Update routing rule

**put** `/zones/{zone_id}/email/routing/rules/{rule_identifier}`

Update actions and matches, or enable/disable specific routing rules. Forward actions require all destination addresses to be verified.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_identifier: string`

  Routing rule identifier.

### Body Parameters

- `actions: array of Action`

  List actions patterns.

  - `type: "drop" or "forward" or "worker"`

    Type of supported action.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

- `matchers: array of Matcher`

  Matching patterns to forward to your actions.

  - `type: "all" or "literal"`

    Type of matcher.

    - `"all"`

    - `"literal"`

  - `field: optional "to"`

    Field for type matcher.

    - `"to"`

  - `value: optional string`

    Value for matcher.

- `enabled: optional true or false`

  Routing rule status.

  - `true`

  - `false`

- `name: optional string`

  Routing rule name.

- `owner_worker_tag: optional string`

  Public tag (script_tag) of the Worker that owns this rule. Required when
  `source` is `wrangler`.

- `priority: optional number`

  Priority of the routing rule.

- `source: optional "api" or "wrangler"`

  Who manages the rule. `api` covers dashboard, generic API, and Terraform;
  `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
  to `api` when omitted on write.

  - `"api"`

  - `"wrangler"`

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

- `result: optional EmailRoutingRule`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of Action`

    List actions patterns.

    - `type: "drop" or "forward" or "worker"`

      Type of supported action.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of Matcher`

    Matching patterns to forward to your actions.

    - `type: "all" or "literal"`

      Type of matcher.

      - `"all"`

      - `"literal"`

    - `field: optional "to"`

      Field for type matcher.

      - `"to"`

    - `value: optional string`

      Value for matcher.

  - `name: optional string`

    Routing rule name.

  - `priority: optional number`

    Priority of the routing rule.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/$RULE_IDENTIFIER \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "actions": [
            {
              "type": "forward"
            }
          ],
          "matchers": [
            {
              "type": "literal"
            }
          ],
          "enabled": true,
          "name": "Send to user@example.net rule.",
          "owner_worker_tag": "a7e6fb77503c41d8a7f3113c6918f10c",
          "source": "api"
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
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "literal",
        "field": "to",
        "value": "test@example.com"
      }
    ],
    "name": "Send to user@example.net rule.",
    "priority": 0,
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Delete routing rule

**delete** `/zones/{zone_id}/email/routing/rules/{rule_identifier}`

Delete a specific routing rule.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_identifier: string`

  Routing rule identifier.

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

- `result: optional EmailRoutingRule`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of Action`

    List actions patterns.

    - `type: "drop" or "forward" or "worker"`

      Type of supported action.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of Matcher`

    Matching patterns to forward to your actions.

    - `type: "all" or "literal"`

      Type of matcher.

      - `"all"`

      - `"literal"`

    - `field: optional "to"`

      Field for type matcher.

      - `"to"`

    - `value: optional string`

      Value for matcher.

  - `name: optional string`

    Routing rule name.

  - `priority: optional number`

    Priority of the routing rule.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/$RULE_IDENTIFIER \
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
  "success": true,
  "result": {
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "literal",
        "field": "to",
        "value": "test@example.com"
      }
    ],
    "name": "Send to user@example.net rule.",
    "priority": 0,
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Domain Types

### Action

- `Action object { type, value }`

  Actions pattern.

  - `type: "drop" or "forward" or "worker"`

    Type of supported action.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

### Email Routing Rule

- `EmailRoutingRule object { id, actions, enabled, 5 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of Action`

    List actions patterns.

    - `type: "drop" or "forward" or "worker"`

      Type of supported action.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of Matcher`

    Matching patterns to forward to your actions.

    - `type: "all" or "literal"`

      Type of matcher.

      - `"all"`

      - `"literal"`

    - `field: optional "to"`

      Field for type matcher.

      - `"to"`

    - `value: optional string`

      Value for matcher.

  - `name: optional string`

    Routing rule name.

  - `priority: optional number`

    Priority of the routing rule.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Matcher

- `Matcher object { type, field, value }`

  Matching pattern to forward your actions.

  - `type: "all" or "literal"`

    Type of matcher.

    - `"all"`

    - `"literal"`

  - `field: optional "to"`

    Field for type matcher.

    - `"to"`

  - `value: optional string`

    Value for matcher.

# Catch Alls

## Get catch-all rule

**get** `/zones/{zone_id}/email/routing/rules/catch_all`

Get information on the default catch-all routing rule.

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

- `result: optional object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/catch_all \
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
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "all"
      }
    ],
    "name": "Send to user@example.net rule.",
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Update catch-all rule

**put** `/zones/{zone_id}/email/routing/rules/catch_all`

Enable or disable catch-all routing rule, or change action to forward to specific destination address. Forward actions require all destination addresses to be verified.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `actions: array of CatchAllAction`

  List actions for the catch-all routing rule.

  - `type: "drop" or "forward" or "worker"`

    Type of action for catch-all rule.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

- `matchers: array of CatchAllMatcher`

  List of matchers for the catch-all routing rule.

  - `type: "all"`

    Type of matcher. Default is 'all'.

    - `"all"`

- `enabled: optional true or false`

  Routing rule status.

  - `true`

  - `false`

- `name: optional string`

  Routing rule name.

- `owner_worker_tag: optional string`

  Public tag (script_tag) of the Worker that owns this rule. Required when
  `source` is `wrangler`.

- `source: optional "api" or "wrangler"`

  Who manages the rule. `api` covers dashboard, generic API, and Terraform;
  `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
  to `api` when omitted on write.

  - `"api"`

  - `"wrangler"`

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

- `result: optional object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/routing/rules/catch_all \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "actions": [
            {
              "type": "forward"
            }
          ],
          "matchers": [
            {
              "type": "all"
            }
          ],
          "enabled": true,
          "name": "Send to user@example.net rule.",
          "owner_worker_tag": "a7e6fb77503c41d8a7f3113c6918f10c",
          "source": "api"
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
    "id": "a7e6fb77503c41d8a7f3113c6918f10c",
    "actions": [
      {
        "type": "forward",
        "value": [
          "destinationaddress@example.net"
        ]
      }
    ],
    "enabled": true,
    "matchers": [
      {
        "type": "all"
      }
    ],
    "name": "Send to user@example.net rule.",
    "source": "api",
    "tag": "a7e6fb77503c41d8a7f3113c6918f10c"
  }
}
```

## Domain Types

### Catch All Action

- `CatchAllAction object { type, value }`

  Action for the catch-all routing rule.

  - `type: "drop" or "forward" or "worker"`

    Type of action for catch-all rule.

    - `"drop"`

    - `"forward"`

    - `"worker"`

  - `value: optional array of string`

### Catch All Matcher

- `CatchAllMatcher object { type }`

  Matcher for catch-all routing rule.

  - `type: "all"`

    Type of matcher. Default is 'all'.

    - `"all"`

### Catch All Get Response

- `CatchAllGetResponse object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

### Catch All Update Response

- `CatchAllUpdateResponse object { id, actions, enabled, 4 more }`

  - `id: optional string`

    Routing rule identifier.

  - `actions: optional array of CatchAllAction`

    List actions for the catch-all routing rule.

    - `type: "drop" or "forward" or "worker"`

      Type of action for catch-all rule.

      - `"drop"`

      - `"forward"`

      - `"worker"`

    - `value: optional array of string`

  - `enabled: optional true or false`

    Routing rule status.

    - `true`

    - `false`

  - `matchers: optional array of CatchAllMatcher`

    List of matchers for the catch-all routing rule.

    - `type: "all"`

      Type of matcher. Default is 'all'.

      - `"all"`

  - `name: optional string`

    Routing rule name.

  - `source: optional "api" or "wrangler"`

    Who manages the rule. `api` covers dashboard, generic API, and Terraform;
    `wrangler` means the rule is managed by a Worker's wrangler.jsonc. Defaults
    to `api` when omitted on write.

    - `"api"`

    - `"wrangler"`

  - `tag: optional string`

    Routing rule tag. (Deprecated, replaced by routing rule identifier)

# Addresses

## List destination addresses

**get** `/accounts/{account_id}/email/routing/addresses`

Lists existing destination addresses.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Sorts results in an ascending or descending order.

  - `"asc"`

  - `"desc"`

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `verified: optional true or false`

  Filter by verified destination addresses.

  - `true`

  - `false`

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

- `result: optional array of Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses \
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
      "id": "ea95132c15732412d22c1476fa83f27a",
      "created": "2014-01-02T02:20:00Z",
      "email": "user@example.com",
      "modified": "2014-01-02T02:20:00Z",
      "tag": "ea95132c15732412d22c1476fa83f27a",
      "verified": "2014-01-02T02:20:00Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 1,
    "total_pages": 100
  }
}
```

## Get a destination address

**get** `/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}`

Gets information for a specific destination email already created.

### Path Parameters

- `account_id: string`

  Identifier.

- `destination_address_identifier: string`

  Destination address identifier.

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

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses/$DESTINATION_ADDRESS_IDENTIFIER \
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
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Create a destination address

**post** `/accounts/{account_id}/email/routing/addresses`

Create a destination address to forward your emails to. Destination addresses need to be verified before they can be used.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `email: string`

  The contact email address of the user.

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

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "email": "user@example.com"
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
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Update destination address

**patch** `/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}`

Updates the status of a specific destination address.

### Path Parameters

- `account_id: string`

  Identifier.

- `destination_address_identifier: string`

  Destination address identifier.

### Body Parameters

- `status: "unverified" or "verified"`

  Destination address status. Non-admin callers may only set verified addresses back to unverified; setting to verified requires admin privileges.

  - `"unverified"`

  - `"verified"`

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

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses/$DESTINATION_ADDRESS_IDENTIFIER \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "status": "verified"
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
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Delete destination address

**delete** `/accounts/{account_id}/email/routing/addresses/{destination_address_identifier}`

Deletes a specific destination address.

### Path Parameters

- `account_id: string`

  Identifier.

- `destination_address_identifier: string`

  Destination address identifier.

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

- `result: optional Address`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email/routing/addresses/$DESTINATION_ADDRESS_IDENTIFIER \
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
  "success": true,
  "result": {
    "id": "ea95132c15732412d22c1476fa83f27a",
    "created": "2014-01-02T02:20:00Z",
    "email": "user@example.com",
    "modified": "2014-01-02T02:20:00Z",
    "tag": "ea95132c15732412d22c1476fa83f27a",
    "verified": "2014-01-02T02:20:00Z"
  }
}
```

## Domain Types

### Address

- `Address object { id, created, email, 3 more }`

  - `id: optional string`

    Destination address identifier.

  - `created: optional string`

    The date and time the destination address has been created.

  - `email: optional string`

    The contact email address of the user.

  - `modified: optional string`

    The date and time the destination address was last modified.

  - `tag: optional string`

    Destination address tag. (Deprecated, replaced by destination address identifier)

  - `verified: optional string`

    The date and time the destination address has been verified. Null means not verified yet.
