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
