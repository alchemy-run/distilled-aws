# Alerting

## Get CT Alerting Subscription

**get** `/zones/{zone_id}/ct/alerting`

Retrieve the Certificate Transparency alerting subscription settings for a zone. Returns whether CT monitoring is enabled and, for Business and Enterprise zones, the list of email addresses that receive alerts.

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

- `result: optional object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ct/alerting \
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
    "enabled": true,
    "emails": [
      "security@example.com",
      "admin@example.com"
    ]
  }
}
```

## Update CT Alerting Subscription

**patch** `/zones/{zone_id}/ct/alerting`

Create or update the Certificate Transparency alerting subscription for a zone. Enables or disables email notifications when certificates are issued for the zone's domains.
For Free and Pro zones, the subscription is toggled on or off using the enabled field. Notification emails are sent to all users with SSL permissions on the zone.
For Business and Enterprise zones, the emails field is required and controls which addresses receive alerts. Setting emails to an empty list disables the subscription regardless of the enabled field. A maximum of 10 email addresses may be configured.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: boolean`

  Whether CT alerting is enabled for the zone.

- `emails: optional array of string`

  Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

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

- `result: optional object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/ct/alerting \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true,
          "emails": [
            "security@example.com",
            "admin@example.com"
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
    "enabled": true,
    "emails": [
      "security@example.com",
      "admin@example.com"
    ]
  }
}
```

## Domain Types

### Alerting Get Response

- `AlertingGetResponse object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.

### Alerting Edit Response

- `AlertingEditResponse object { enabled, emails }`

  Certificate Transparency alerting subscription settings for a zone.

  - `enabled: boolean`

    Whether CT alerting is enabled for the zone.

  - `emails: optional array of string`

    Email addresses that receive CT alert notifications. Only present and configurable for Business and Enterprise zones. Maximum of 10 addresses. For Free and Pro zones, notifications are sent to all users with SSL permissions on the zone.
