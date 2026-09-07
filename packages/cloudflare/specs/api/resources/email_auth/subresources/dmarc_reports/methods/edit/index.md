## Configure DMARC Reports

**patch** `/zones/{zone_id}/email/auth/dmarc-reports`

Updates the DMARC report configuration for a zone.
At least one of `enabled` or `skip_wizard` must be provided.
When enabling, the handler will ensure the DMARC RUA record exists in DNS.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: optional boolean`

  Enable or disable DMARC reports for this zone

- `skip_wizard: optional boolean`

  Skip the DMARC setup wizard

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

- `result: optional object { approved_sources, created, created_at, 9 more }`

  Response for GET/PATCH /dmarc-reports

  - `approved_sources: optional array of object { created, created_at, domain, 6 more }`

    List of approved sending sources (omitted when empty)

    - `created: optional string`

      Deprecated, use created_at

    - `created_at: optional string`

      Creation timestamp

    - `domain: optional string`

      The source domain

    - `ips: optional array of string`

      Resolved IP addresses from SPF

    - `modified: optional string`

      Deprecated, use modified_at

    - `modified_at: optional string`

      Last modification timestamp

    - `name: optional string`

      Source name (typically same as domain)

    - `slug: optional string`

      URL-friendly identifier

    - `tag: optional string`

      Source UUID

  - `created: optional string`

    Deprecated, use created_at

  - `created_at: optional string`

    Creation timestamp

  - `enabled: optional boolean`

    Whether DMARC reports are enabled

  - `modified: optional string`

    Deprecated, use modified_at

  - `modified_at: optional string`

    Last modification timestamp

  - `records: optional object { bimi_records, cname_dkim_records, cname_dmarc_records, 4 more }`

    Live DNS records for the zone, grouped by type

    - `bimi_records: optional array of object { id, content, name, 2 more }`

      BIMI TXT records

      - `id: optional string`

        DNS record ID

      - `content: optional string`

        Record content

      - `name: optional string`

        DNS record name

      - `ttl: optional number`

        Time to live in seconds

      - `type: optional string`

        Record type

    - `cname_dkim_records: optional array of object { id, content, name, 2 more }`

      CNAME records for DKIM

      - `id: optional string`

        DNS record ID

      - `content: optional string`

        Record content

      - `name: optional string`

        DNS record name

      - `ttl: optional number`

        Time to live in seconds

      - `type: optional string`

        Record type

    - `cname_dmarc_records: optional array of object { id, content, name, 2 more }`

      CNAME records at _dmarc (problematic)

      - `id: optional string`

        DNS record ID

      - `content: optional string`

        Record content

      - `name: optional string`

        DNS record name

      - `ttl: optional number`

        Time to live in seconds

      - `type: optional string`

        Record type

    - `cname_spf_records: optional array of object { id, content, name, 2 more }`

      CNAME records for SPF

      - `id: optional string`

        DNS record ID

      - `content: optional string`

        Record content

      - `name: optional string`

        DNS record name

      - `ttl: optional number`

        Time to live in seconds

      - `type: optional string`

        Record type

    - `dkim_records: optional array of object { id, content, name, 2 more }`

      DKIM TXT records

      - `id: optional string`

        DNS record ID

      - `content: optional string`

        Record content

      - `name: optional string`

        DNS record name

      - `ttl: optional number`

        Time to live in seconds

      - `type: optional string`

        Record type

    - `dmarc_records: optional array of object { id, content, name, 2 more }`

      DMARC TXT records

      - `id: optional string`

        DNS record ID

      - `content: optional string`

        Record content

      - `name: optional string`

        DNS record name

      - `ttl: optional number`

        Time to live in seconds

      - `type: optional string`

        Record type

    - `spf_records: optional array of object { id, content, name, 2 more }`

      SPF TXT records

      - `id: optional string`

        DNS record ID

      - `content: optional string`

        Record content

      - `name: optional string`

        DNS record name

      - `ttl: optional number`

        Time to live in seconds

      - `type: optional string`

        Record type

  - `rua_prefix: optional string`

    Prefix for DMARC RUA addresses (32-char hex string)

  - `skip_wizard: optional boolean`

    Whether to skip the setup wizard

  - `status: optional "missing-dmarc-report" or "multiple-dmarc-reports" or "missing-dmarc-rua" or "cname-on-dmarc-record"`

    DMARC configuration status

    - `"missing-dmarc-report"`

    - `"multiple-dmarc-reports"`

    - `"missing-dmarc-rua"`

    - `"cname-on-dmarc-record"`

  - `tag: optional string`

    Use `zone_id` instead

  - `zone_id: optional string`

    Zone identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/email/auth/dmarc-reports \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "approved_sources": [
      {
        "created": "2024-01-15T10:30:00.12345Z",
        "created_at": "2024-01-15T10:30:00.12345Z",
        "domain": "sendgrid.net",
        "ips": [
          "192.168.1.1",
          "10.0.0.1"
        ],
        "modified": "2024-01-15T11:45:00.12345Z",
        "modified_at": "2024-01-15T11:45:00.12345Z",
        "name": "SendGrid",
        "slug": "sendgrid-net",
        "tag": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      }
    ],
    "created": "2024-01-15T10:30:00.12345Z",
    "created_at": "2024-01-15T10:30:00.12345Z",
    "enabled": true,
    "modified": "2024-01-15T11:45:00.12345Z",
    "modified_at": "2024-01-15T11:45:00.12345Z",
    "records": {
      "bimi_records": [
        {
          "id": "e5bb46707a802688812d5d1c9f7977d4",
          "content": "\"v=DMARC1; p=none; rua=mailto:rua@dmarc-reports.cloudflare.net\"",
          "name": "_dmarc.example.com",
          "ttl": 300,
          "type": "TXT"
        }
      ],
      "cname_dkim_records": [
        {
          "id": "e5bb46707a802688812d5d1c9f7977d4",
          "content": "\"v=DMARC1; p=none; rua=mailto:rua@dmarc-reports.cloudflare.net\"",
          "name": "_dmarc.example.com",
          "ttl": 300,
          "type": "TXT"
        }
      ],
      "cname_dmarc_records": [
        {
          "id": "e5bb46707a802688812d5d1c9f7977d4",
          "content": "\"v=DMARC1; p=none; rua=mailto:rua@dmarc-reports.cloudflare.net\"",
          "name": "_dmarc.example.com",
          "ttl": 300,
          "type": "TXT"
        }
      ],
      "cname_spf_records": [
        {
          "id": "e5bb46707a802688812d5d1c9f7977d4",
          "content": "\"v=DMARC1; p=none; rua=mailto:rua@dmarc-reports.cloudflare.net\"",
          "name": "_dmarc.example.com",
          "ttl": 300,
          "type": "TXT"
        }
      ],
      "dkim_records": [
        {
          "id": "e5bb46707a802688812d5d1c9f7977d4",
          "content": "\"v=DMARC1; p=none; rua=mailto:rua@dmarc-reports.cloudflare.net\"",
          "name": "_dmarc.example.com",
          "ttl": 300,
          "type": "TXT"
        }
      ],
      "dmarc_records": [
        {
          "id": "e5bb46707a802688812d5d1c9f7977d4",
          "content": "\"v=DMARC1; p=none; rua=mailto:rua@dmarc-reports.cloudflare.net\"",
          "name": "_dmarc.example.com",
          "ttl": 300,
          "type": "TXT"
        }
      ],
      "spf_records": [
        {
          "id": "e5bb46707a802688812d5d1c9f7977d4",
          "content": "\"v=DMARC1; p=none; rua=mailto:rua@dmarc-reports.cloudflare.net\"",
          "name": "_dmarc.example.com",
          "ttl": 300,
          "type": "TXT"
        }
      ]
    },
    "rua_prefix": "9233c80fc89f43e3a7b749605f651868",
    "skip_wizard": false,
    "status": "missing-dmarc-report",
    "tag": "023e105f4ecef8ad9ca31a8372d0c353",
    "zone_id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```
