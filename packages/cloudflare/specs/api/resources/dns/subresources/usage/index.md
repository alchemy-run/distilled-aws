# Usage

# Zone

## Get DNS Record Usage

**get** `/zones/{zone_id}/dns_records/usage`

Get the current DNS record usage for a zone, including the number of records and the quota limit.

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

- `result: optional object { record_quota, record_usage }`

  - `record_quota: number`

    Maximum number of DNS records allowed for the zone. Null if using account-level quota.

  - `record_usage: number`

    Current number of DNS records in the zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/usage \
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
    "record_quota": 200,
    "record_usage": 150
  }
}
```

## Domain Types

### Zone Get Response

- `ZoneGetResponse object { record_quota, record_usage }`

  - `record_quota: number`

    Maximum number of DNS records allowed for the zone. Null if using account-level quota.

  - `record_usage: number`

    Current number of DNS records in the zone.

# Account

## Get DNS Record Usage for Account

**get** `/accounts/{account_id}/dns_records/usage`

Get the current DNS record usage and quota for an account. May include internal DNS usage and quota.

### Path Parameters

- `account_id: string`

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

- `result: optional object { record_quota, record_usage, internal_record_quota, internal_record_usage }`

  - `record_quota: number`

    Maximum number of DNS records allowed across all public zones in the account. Null if using zone-level quota.

  - `record_usage: number`

    Current number of DNS records across all public zones in the account.

  - `internal_record_quota: optional number`

    Maximum number of DNS records allowed across all internal zones in the account. Only present if internal DNS is enabled.

  - `internal_record_usage: optional number`

    Current number of DNS records across all internal zones in the account. Only present if internal DNS is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dns_records/usage \
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
    "record_quota": 1000000,
    "record_usage": 5000,
    "internal_record_quota": 1000000,
    "internal_record_usage": 5000
  }
}
```

## Domain Types

### Account Get Response

- `AccountGetResponse object { record_quota, record_usage, internal_record_quota, internal_record_usage }`

  - `record_quota: number`

    Maximum number of DNS records allowed across all public zones in the account. Null if using zone-level quota.

  - `record_usage: number`

    Current number of DNS records across all public zones in the account.

  - `internal_record_quota: optional number`

    Maximum number of DNS records allowed across all internal zones in the account. Only present if internal DNS is enabled.

  - `internal_record_usage: optional number`

    Current number of DNS records across all internal zones in the account. Only present if internal DNS is enabled.
