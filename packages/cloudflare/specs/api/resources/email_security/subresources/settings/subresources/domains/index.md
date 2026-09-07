# Domains

## List protected email domains

**get** `/accounts/{account_id}/email-security/settings/domains`

Returns a paginated list of email domains protected by Email Security. Includes domain configuration, delivery modes, and authorization status. Supports filtering by delivery mode and integration ID.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `active_delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 2 more`

  Currently active delivery mode to filter by.

  - `"DIRECT"`

  - `"BCC"`

  - `"JOURNAL"`

  - `"API"`

  - `"RETRO_SCAN"`

- `allowed_delivery_mode: optional "DIRECT" or "BCC" or "JOURNAL" or 2 more`

  Delivery mode to filter by.

  - `"DIRECT"`

  - `"BCC"`

  - `"JOURNAL"`

  - `"API"`

  - `"RETRO_SCAN"`

- `direction: optional "asc" or "desc"`

  The sorting direction.

  - `"asc"`

  - `"desc"`

- `domain: optional array of string`

  Domain names to filter by.

- `integration_id: optional string`

  Integration ID to filter by.

- `order: optional "domain" or "created_at"`

  Field to sort by.

  - `"domain"`

  - `"created_at"`

- `page: optional number`

  Current page within paginated list of results.

- `per_page: optional number`

  The number of results per page. Maximum value is 1000.

- `search: optional string`

  Search term for filtering records. Behavior may change.

- `status: optional "pending" or "active" or "failed" or "timeout"`

  Filters response to domains with the provided status.

  - `"pending"`

  - `"active"`

  - `"failed"`

  - `"timeout"`

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

- `result: optional array of object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "allowed_delivery_modes": [
        "DIRECT"
      ],
      "authorization": {
        "authorized": true,
        "timestamp": "2019-12-27T18:11:19.117Z",
        "status_message": "status_message"
      },
      "created_at": "2014-01-01T05:20:00.12345Z",
      "dmarc_status": "none",
      "domain": "example.com",
      "drop_dispositions": [
        "MALICIOUS"
      ],
      "emails_processed": {
        "timestamp": "2019-12-27T18:11:19.117Z",
        "total_emails_processed": 0,
        "total_emails_processed_previous": 0
      },
      "folder": "AllItems",
      "inbox_provider": "Microsoft",
      "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "ip_restrictions": [
        "192.0.2.0/24",
        "2001:db8::/32"
      ],
      "last_modified": "2014-01-01T05:20:00.12345Z",
      "lookback_hops": 0,
      "modified_at": "2014-01-01T05:20:00.12345Z",
      "o365_tenant_id": "o365_tenant_id",
      "regions": [
        "GLOBAL"
      ],
      "require_tls_inbound": true,
      "require_tls_outbound": true,
      "spf_status": "none",
      "status": "pending",
      "transport": "transport"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get an email domain

**get** `/accounts/{account_id}/email-security/settings/domains/{domain_id}`

Retrieves detailed information for a specific protected email domain including its delivery configuration, SPF/DMARC status, and authorization state.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  Domain identifier

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

- `result: optional object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains/$DOMAIN_ID \
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
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "allowed_delivery_modes": [
      "DIRECT"
    ],
    "authorization": {
      "authorized": true,
      "timestamp": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dmarc_status": "none",
    "domain": "example.com",
    "drop_dispositions": [
      "MALICIOUS"
    ],
    "emails_processed": {
      "timestamp": "2019-12-27T18:11:19.117Z",
      "total_emails_processed": 0,
      "total_emails_processed_previous": 0
    },
    "folder": "AllItems",
    "inbox_provider": "Microsoft",
    "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "ip_restrictions": [
      "192.0.2.0/24",
      "2001:db8::/32"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "lookback_hops": 0,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "o365_tenant_id": "o365_tenant_id",
    "regions": [
      "GLOBAL"
    ],
    "require_tls_inbound": true,
    "require_tls_outbound": true,
    "spf_status": "none",
    "status": "pending",
    "transport": "transport"
  }
}
```

## Update an email domain

**patch** `/accounts/{account_id}/email-security/settings/domains/{domain_id}`

Updates configuration for a protected email domain. Only provided fields will be modified. Changes affect delivery mode, security settings, and regional processing.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  Domain identifier

### Body Parameters

- `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

  - `"DIRECT"`

  - `"BCC"`

  - `"JOURNAL"`

  - `"API"`

  - `"RETRO_SCAN"`

- `domain: optional string`

- `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

  - `"MALICIOUS"`

  - `"MALICIOUS-BEC"`

  - `"SUSPICIOUS"`

  - `"SPOOF"`

  - `"SPAM"`

  - `"BULK"`

  - `"ENCRYPTED"`

  - `"EXTERNAL"`

  - `"UNKNOWN"`

  - `"NONE"`

- `folder: optional "AllItems" or "Inbox"`

  - `"AllItems"`

  - `"Inbox"`

- `integration_id: optional string`

- `ip_restrictions: optional array of string`

- `lookback_hops: optional number`

- `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

  - `"GLOBAL"`

  - `"AU"`

  - `"DE"`

  - `"IN"`

  - `"US"`

- `require_tls_inbound: optional boolean`

- `require_tls_outbound: optional boolean`

- `transport: optional string`

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

- `result: optional object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains/$DOMAIN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "ip_restrictions": [
            "192.0.2.0/24",
            "2001:db8::/32"
          ]
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "allowed_delivery_modes": [
      "DIRECT"
    ],
    "authorization": {
      "authorized": true,
      "timestamp": "2019-12-27T18:11:19.117Z",
      "status_message": "status_message"
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "dmarc_status": "none",
    "domain": "example.com",
    "drop_dispositions": [
      "MALICIOUS"
    ],
    "emails_processed": {
      "timestamp": "2019-12-27T18:11:19.117Z",
      "total_emails_processed": 0,
      "total_emails_processed_previous": 0
    },
    "folder": "AllItems",
    "inbox_provider": "Microsoft",
    "integration_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "ip_restrictions": [
      "192.0.2.0/24",
      "2001:db8::/32"
    ],
    "last_modified": "2014-01-01T05:20:00.12345Z",
    "lookback_hops": 0,
    "modified_at": "2014-01-01T05:20:00.12345Z",
    "o365_tenant_id": "o365_tenant_id",
    "regions": [
      "GLOBAL"
    ],
    "require_tls_inbound": true,
    "require_tls_outbound": true,
    "spf_status": "none",
    "status": "pending",
    "transport": "transport"
  }
}
```

## Unprotect an email domain

**delete** `/accounts/{account_id}/email-security/settings/domains/{domain_id}`

Removes email security protection from a domain. After deletion, emails for this domain will no longer be processed by Email Security. This action cannot be undone.

### Path Parameters

- `account_id: string`

  Identifier.

- `domain_id: string`

  Domain identifier

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

- `result: optional object { id }`

  - `id: string`

    Domain identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/email-security/settings/domains/$DOMAIN_ID \
    -X DELETE \
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
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  }
}
```

## Domain Types

### Domain List Response

- `DomainListResponse object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Domain Get Response

- `DomainGetResponse object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Domain Edit Response

- `DomainEditResponse object { id, allowed_delivery_modes, authorization, 19 more }`

  - `id: optional string`

    Domain identifier

  - `allowed_delivery_modes: optional array of "DIRECT" or "BCC" or "JOURNAL" or 2 more`

    - `"DIRECT"`

    - `"BCC"`

    - `"JOURNAL"`

    - `"API"`

    - `"RETRO_SCAN"`

  - `authorization: optional object { authorized, timestamp, status_message }`

    - `authorized: boolean`

    - `timestamp: string`

    - `status_message: optional string`

  - `created_at: optional string`

  - `dmarc_status: optional "none" or "good" or "invalid"`

    - `"none"`

    - `"good"`

    - `"invalid"`

  - `domain: optional string`

  - `drop_dispositions: optional array of "MALICIOUS" or "MALICIOUS-BEC" or "SUSPICIOUS" or 7 more`

    - `"MALICIOUS"`

    - `"MALICIOUS-BEC"`

    - `"SUSPICIOUS"`

    - `"SPOOF"`

    - `"SPAM"`

    - `"BULK"`

    - `"ENCRYPTED"`

    - `"EXTERNAL"`

    - `"UNKNOWN"`

    - `"NONE"`

  - `emails_processed: optional object { timestamp, total_emails_processed, total_emails_processed_previous }`

    - `timestamp: string`

    - `total_emails_processed: number`

    - `total_emails_processed_previous: number`

  - `folder: optional "AllItems" or "Inbox"`

    - `"AllItems"`

    - `"Inbox"`

  - `inbox_provider: optional "Microsoft" or "Google"`

    - `"Microsoft"`

    - `"Google"`

  - `integration_id: optional string`

  - `ip_restrictions: optional array of string`

  - `last_modified: optional string`

    Deprecated, use `modified_at` instead. End of life: November 1, 2026.

  - `lookback_hops: optional number`

  - `modified_at: optional string`

  - `o365_tenant_id: optional string`

  - `regions: optional array of "GLOBAL" or "AU" or "DE" or 2 more`

    - `"GLOBAL"`

    - `"AU"`

    - `"DE"`

    - `"IN"`

    - `"US"`

  - `require_tls_inbound: optional boolean`

  - `require_tls_outbound: optional boolean`

  - `spf_status: optional "none" or "good" or "neutral" or 2 more`

    - `"none"`

    - `"good"`

    - `"neutral"`

    - `"open"`

    - `"invalid"`

  - `status: optional "pending" or "active" or "failed" or "timeout"`

    - `"pending"`

    - `"active"`

    - `"failed"`

    - `"timeout"`

  - `transport: optional string`

### Domain Delete Response

- `DomainDeleteResponse object { id }`

  - `id: string`

    Domain identifier
