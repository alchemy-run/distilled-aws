# Alerting

# Available Alerts

## Get Alert Types

**get** `/accounts/{account_id}/alerting/v3/available_alerts`

Gets a list of all alert types for which an account is eligible.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional map[array of object { description, display_name, filter_options, type } ]`

  - `description: optional string`

    Describes the alert type.

  - `display_name: optional string`

    Alert type name.

  - `filter_options: optional array of unknown`

    Format of additional configuration options (filters) for the alert type. Data type of filters during policy creation: Array of strings.

  - `type: optional string`

    Use this value when creating and updating a notification policy.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/available_alerts \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "Origin Monitoring": [
      {
        "description": "High levels of 5xx HTTP errors at your origin.",
        "display_name": "Origin Error Rate Alert",
        "filter_options": [
          {
            "AvailableValues": null,
            "ComparisonOperator": "==",
            "Key": "zones",
            "Range": "1-n"
          },
          {
            "AvailableValues": [
              {
                "Description": "Service-Level Objective of 99.7",
                "ID": "99.7"
              },
              {
                "Description": "Service-Level Objective of 99.8",
                "ID": "99.8"
              }
            ],
            "ComparisonOperator": ">=",
            "Key": "slo",
            "Range": "0-1"
          }
        ],
        "type": "http_alert_origin_error"
      }
    ]
  }
}
```

## Domain Types

### Available Alert List Response

- `AvailableAlertListResponse = map[array of object { description, display_name, filter_options, type } ]`

  - `description: optional string`

    Describes the alert type.

  - `display_name: optional string`

    Alert type name.

  - `filter_options: optional array of unknown`

    Format of additional configuration options (filters) for the alert type. Data type of filters during policy creation: Array of strings.

  - `type: optional string`

    Use this value when creating and updating a notification policy.

# Destinations

# Eligible

## Get delivery mechanism eligibility

**get** `/accounts/{account_id}/alerting/v3/destinations/eligible`

Get a list of all delivery mechanism types for which an account is eligible.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional map[array of object { eligible, ready, type } ]`

  - `eligible: optional boolean`

    Determines whether or not the account is eligible for the delivery mechanism.

  - `ready: optional boolean`

    Beta flag. Users can create a policy with a mechanism that is not ready, but we cannot guarantee successful delivery of notifications.

  - `type: optional "email" or "pagerduty" or "webhook"`

    Determines type of delivery mechanism.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/eligible \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "foo": [
      {
        "eligible": true,
        "ready": true,
        "type": "email"
      }
    ]
  }
}
```

## Domain Types

### Eligible Get Response

- `EligibleGetResponse = map[array of object { eligible, ready, type } ]`

  - `eligible: optional boolean`

    Determines whether or not the account is eligible for the delivery mechanism.

  - `ready: optional boolean`

    Beta flag. Users can create a policy with a mechanism that is not ready, but we cannot guarantee successful delivery of notifications.

  - `type: optional "email" or "pagerduty" or "webhook"`

    Determines type of delivery mechanism.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`

# Pagerduty

## List PagerDuty services

**get** `/accounts/{account_id}/alerting/v3/destinations/pagerduty`

Get a list of all configured PagerDuty services.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of Pagerduty`

  - `id: optional string`

    UUID

  - `name: optional string`

    The name of the pagerduty service.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/pagerduty \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f174e90afafe4643bbbc4a0ed4fc8415",
      "name": "My PagerDuty Service"
    }
  ]
}
```

## Create PagerDuty integration token

**post** `/accounts/{account_id}/alerting/v3/destinations/pagerduty/connect`

Creates a new token for integrating with PagerDuty.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    token in form of UUID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/pagerduty/connect \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "a313ba7d3e464c0ea40808fafbc3816a"
  }
}
```

## Delete PagerDuty Services

**delete** `/accounts/{account_id}/alerting/v3/destinations/pagerduty`

Deletes all the PagerDuty Services connected to the account.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/pagerduty \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true
}
```

## Connect PagerDuty

**get** `/accounts/{account_id}/alerting/v3/destinations/pagerduty/connect/{token_id}`

Links PagerDuty with the account using the integration token.

### Path Parameters

- `account_id: string`

  The account id

- `token_id: string`

  The token integration key

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    UUID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/pagerduty/connect/$TOKEN_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
  }
}
```

## Domain Types

### Pagerduty

- `Pagerduty object { id, name }`

  - `id: optional string`

    UUID

  - `name: optional string`

    The name of the pagerduty service.

### Pagerduty Create Response

- `PagerdutyCreateResponse object { id }`

  - `id: optional string`

    token in form of UUID

### Pagerduty Delete Response

- `PagerdutyDeleteResponse object { errors, messages, success }`

  - `errors: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `messages: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `success: true`

    Whether the API call was successful

    - `true`

### Pagerduty Link Response

- `PagerdutyLinkResponse object { id }`

  - `id: optional string`

    UUID

# Webhooks

## List webhooks

**get** `/accounts/{account_id}/alerting/v3/destinations/webhooks`

Gets a list of all configured webhook destinations.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of Webhooks`

  - `id: optional string`

    The unique identifier of a webhook

  - `created_at: optional string`

    Timestamp of when the webhook destination was created.

  - `last_failure: optional string`

    Timestamp of the last time an attempt to dispatch a notification to this webhook failed.

  - `last_success: optional string`

    Timestamp of the last time Cloudflare was able to successfully dispatch a notification using this webhook.

  - `name: optional string`

    The name of the webhook destination. This will be included in the request body when you receive a webhook notification.

  - `secret: optional string`

    Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.

  - `type: optional "datadog" or "discord" or "feishu" or 5 more`

    Type of webhook endpoint.

    - `"datadog"`

    - `"discord"`

    - `"feishu"`

    - `"gchat"`

    - `"generic"`

    - `"opsgenie"`

    - `"slack"`

    - `"splunk"`

  - `url: optional string`

    The POST endpoint to call when dispatching a notification.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/webhooks \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "b115d5ec15c641ee8b7692c449b5227b",
      "created_at": "2020-10-26T18:25:04.532316Z",
      "last_failure": "2020-10-26T18:25:04.532316Z",
      "last_success": "2020-10-26T18:25:04.532316Z",
      "name": "Slack Webhook",
      "type": "slack",
      "url": "https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd"
    }
  ]
}
```

## Get a webhook

**get** `/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhook_id}`

Get details for a single webhooks destination.

### Path Parameters

- `account_id: string`

  The account id

- `webhook_id: string`

  The unique identifier of a webhook

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional Webhooks`

  - `id: optional string`

    The unique identifier of a webhook

  - `created_at: optional string`

    Timestamp of when the webhook destination was created.

  - `last_failure: optional string`

    Timestamp of the last time an attempt to dispatch a notification to this webhook failed.

  - `last_success: optional string`

    Timestamp of the last time Cloudflare was able to successfully dispatch a notification using this webhook.

  - `name: optional string`

    The name of the webhook destination. This will be included in the request body when you receive a webhook notification.

  - `secret: optional string`

    Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.

  - `type: optional "datadog" or "discord" or "feishu" or 5 more`

    Type of webhook endpoint.

    - `"datadog"`

    - `"discord"`

    - `"feishu"`

    - `"gchat"`

    - `"generic"`

    - `"opsgenie"`

    - `"slack"`

    - `"splunk"`

  - `url: optional string`

    The POST endpoint to call when dispatching a notification.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/webhooks/$WEBHOOK_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "b115d5ec15c641ee8b7692c449b5227b",
    "created_at": "2020-10-26T18:25:04.532316Z",
    "last_failure": "2020-10-26T18:25:04.532316Z",
    "last_success": "2020-10-26T18:25:04.532316Z",
    "name": "Slack Webhook",
    "type": "slack",
    "url": "https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd"
  }
}
```

## Create a webhook

**post** `/accounts/{account_id}/alerting/v3/destinations/webhooks`

Creates a new webhook destination.

### Path Parameters

- `account_id: string`

  The account id

### Body Parameters

- `name: string`

  The name of the webhook destination. This will be included in the request body when you receive a webhook notification.

- `url: string`

  The POST endpoint to call when dispatching a notification.

- `secret: optional string`

  Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    UUID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/webhooks \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Slack Webhook",
          "url": "https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
  }
}
```

## Update a webhook

**put** `/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhook_id}`

Update a webhook destination.

### Path Parameters

- `account_id: string`

  The account id

- `webhook_id: string`

  The unique identifier of a webhook

### Body Parameters

- `name: string`

  The name of the webhook destination. This will be included in the request body when you receive a webhook notification.

- `url: string`

  The POST endpoint to call when dispatching a notification.

- `secret: optional string`

  Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    UUID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/webhooks/$WEBHOOK_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Slack Webhook",
          "url": "https://hooks.slack.com/services/Ds3fdBFbV/456464Gdd"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
  }
}
```

## Delete a webhook

**delete** `/accounts/{account_id}/alerting/v3/destinations/webhooks/{webhook_id}`

Delete a configured webhook destination.

### Path Parameters

- `account_id: string`

  The account id

- `webhook_id: string`

  The unique identifier of a webhook

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/destinations/webhooks/$WEBHOOK_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true
}
```

## Domain Types

### Webhooks

- `Webhooks object { id, created_at, last_failure, 5 more }`

  - `id: optional string`

    The unique identifier of a webhook

  - `created_at: optional string`

    Timestamp of when the webhook destination was created.

  - `last_failure: optional string`

    Timestamp of the last time an attempt to dispatch a notification to this webhook failed.

  - `last_success: optional string`

    Timestamp of the last time Cloudflare was able to successfully dispatch a notification using this webhook.

  - `name: optional string`

    The name of the webhook destination. This will be included in the request body when you receive a webhook notification.

  - `secret: optional string`

    Optional secret that will be passed in the `cf-webhook-auth` header when dispatching generic webhook notifications or formatted for supported destinations. Secrets are not returned in any API response body.

  - `type: optional "datadog" or "discord" or "feishu" or 5 more`

    Type of webhook endpoint.

    - `"datadog"`

    - `"discord"`

    - `"feishu"`

    - `"gchat"`

    - `"generic"`

    - `"opsgenie"`

    - `"slack"`

    - `"splunk"`

  - `url: optional string`

    The POST endpoint to call when dispatching a notification.

### Webhook Create Response

- `WebhookCreateResponse object { id }`

  - `id: optional string`

    UUID

### Webhook Update Response

- `WebhookUpdateResponse object { id }`

  - `id: optional string`

    UUID

### Webhook Delete Response

- `WebhookDeleteResponse object { errors, messages, success }`

  - `errors: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `messages: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `success: true`

    Whether the API call was successful

    - `true`

# History

## List History

**get** `/accounts/{account_id}/alerting/v3/history`

Gets a list of history records for notifications sent to an account. The records are displayed for last `x` number of days based on the zone plan (free = 30, pro = 30, biz = 30, ent = 90).

### Path Parameters

- `account_id: string`

  The account id

### Query Parameters

- `before: optional string`

  Limit the returned results to history records older than the specified date. This must be a timestamp that conforms to RFC3339.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of items per page.

- `since: optional string`

  Limit the returned results to history records newer than the specified date. This must be a timestamp that conforms to RFC3339.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of History`

  - `id: optional string`

    UUID

  - `alert_body: optional string`

    Message body included in the notification sent.

  - `alert_type: optional string`

    Type of notification that has been dispatched.

  - `description: optional string`

    Description of the notification policy (if present).

  - `mechanism: optional string`

    The mechanism to which the notification has been dispatched.

  - `mechanism_type: optional "email" or "pagerduty" or "webhook"`

    The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`

  - `name: optional string`

    Name of the policy.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `sent: optional string`

    Timestamp of when the notification was dispatched in ISO 8601 format.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/history \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f174e90afafe4643bbbc4a0ed4fc8415",
      "alert_body": "SSL certificate has expired",
      "alert_type": "universal_ssl_event_type",
      "description": "Universal Certificate validation status, issuance, renewal, and expiration notices",
      "mechanism": "test@example.com",
      "mechanism_type": "email",
      "name": "SSL Notification Event Policy",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "sent": "2021-10-08T17:52:17.571336Z"
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

## Domain Types

### History

- `History object { id, alert_body, alert_type, 6 more }`

  - `id: optional string`

    UUID

  - `alert_body: optional string`

    Message body included in the notification sent.

  - `alert_type: optional string`

    Type of notification that has been dispatched.

  - `description: optional string`

    Description of the notification policy (if present).

  - `mechanism: optional string`

    The mechanism to which the notification has been dispatched.

  - `mechanism_type: optional "email" or "pagerduty" or "webhook"`

    The type of mechanism to which the notification has been dispatched. This can be email/pagerduty/webhook based on the mechanism configured.

    - `"email"`

    - `"pagerduty"`

    - `"webhook"`

  - `name: optional string`

    Name of the policy.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `sent: optional string`

    Timestamp of when the notification was dispatched in ISO 8601 format.

# Policies

## List Notification policies

**get** `/accounts/{account_id}/alerting/v3/policies`

Get a list of all Notification policies.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of Policy`

  - `id: optional string`

    The unique identifier of a notification policy

  - `alert_interval: optional string`

    Optional specification of how often to re-alert from the same incident, not support on all alert types.

  - `alert_type: optional "abuse_report_alert" or "access_custom_certificate_expiration_type" or "advanced_ddos_attack_l4_alert" or 66 more`

    Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.

    - `"abuse_report_alert"`

    - `"access_custom_certificate_expiration_type"`

    - `"advanced_ddos_attack_l4_alert"`

    - `"advanced_ddos_attack_l7_alert"`

    - `"advanced_http_alert_error"`

    - `"bgp_hijack_notification"`

    - `"billing_usage_alert"`

    - `"block_notification_block_removed"`

    - `"block_notification_new_block"`

    - `"block_notification_review_rejected"`

    - `"bot_traffic_basic_alert"`

    - `"brand_protection_alert"`

    - `"brand_protection_digest"`

    - `"clickhouse_alert_fw_anomaly"`

    - `"clickhouse_alert_fw_ent_anomaly"`

    - `"cloudforce_one_request_notification"`

    - `"cni_maintenance_notification"`

    - `"custom_analytics"`

    - `"custom_bot_detection_alert"`

    - `"custom_ssl_certificate_event_type"`

    - `"dedicated_ssl_certificate_event_type"`

    - `"device_connectivity_anomaly_alert"`

    - `"dos_attack_l4"`

    - `"dos_attack_l7"`

    - `"expiring_service_token_alert"`

    - `"failing_logpush_job_disabled_alert"`

    - `"fbm_auto_advertisement"`

    - `"fbm_dosd_attack"`

    - `"fbm_volumetric_attack"`

    - `"health_check_status_notification"`

    - `"hostname_aop_custom_certificate_expiration_type"`

    - `"http_alert_edge_error"`

    - `"http_alert_origin_error"`

    - `"image_notification"`

    - `"image_resizing_notification"`

    - `"incident_alert"`

    - `"load_balancing_health_alert"`

    - `"load_balancing_pool_enablement_alert"`

    - `"logo_match_alert"`

    - `"magic_tunnel_health_check_event"`

    - `"magic_wan_tunnel_health"`

    - `"maintenance_event_notification"`

    - `"mtls_certificate_store_certificate_expiration_type"`

    - `"pages_event_alert"`

    - `"radar_notification"`

    - `"real_origin_monitoring"`

    - `"scriptmonitor_alert_new_code_change_detections"`

    - `"scriptmonitor_alert_new_hosts"`

    - `"scriptmonitor_alert_new_malicious_hosts"`

    - `"scriptmonitor_alert_new_malicious_scripts"`

    - `"scriptmonitor_alert_new_malicious_url"`

    - `"scriptmonitor_alert_new_max_length_resource_url"`

    - `"scriptmonitor_alert_new_resources"`

    - `"secondary_dns_all_primaries_failing"`

    - `"secondary_dns_primaries_failing"`

    - `"secondary_dns_warning"`

    - `"secondary_dns_zone_successfully_updated"`

    - `"secondary_dns_zone_validation_warning"`

    - `"security_insights_alert"`

    - `"sentinel_alert"`

    - `"stream_live_notifications"`

    - `"synthetic_test_latency_alert"`

    - `"synthetic_test_low_availability_alert"`

    - `"traffic_anomalies_alert"`

    - `"tunnel_health_event"`

    - `"tunnel_update_event"`

    - `"universal_ssl_event_type"`

    - `"web_analytics_metrics_update"`

    - `"zone_aop_custom_certificate_expiration_type"`

  - `created: optional string`

  - `description: optional string`

    Optional description for the Notification policy.

  - `enabled: optional boolean`

    Whether or not the Notification policy is enabled.

  - `filters: optional PolicyFilter`

    Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

    - `actions: optional array of string`

      Usage depends on specific alert type

    - `affected_asns: optional array of string`

      Used for configuring radar_notification

    - `affected_components: optional array of string`

      Used for configuring incident_alert

    - `affected_locations: optional array of string`

      Used for configuring radar_notification

    - `airport_code: optional array of string`

      Used for configuring maintenance_event_notification

    - `alert_trigger_preferences: optional array of string`

      Usage depends on specific alert type

    - `alert_trigger_preferences_value: optional array of string`

      Usage depends on specific alert type

    - `enabled: optional array of string`

      Used for configuring load_balancing_pool_enablement_alert

    - `environment: optional array of string`

      Used for configuring pages_event_alert

    - `event: optional array of string`

      Used for configuring pages_event_alert

    - `event_source: optional array of string`

      Used for configuring load_balancing_health_alert

    - `event_type: optional array of string`

      Usage depends on specific alert type

    - `group_by: optional array of string`

      Usage depends on specific alert type

    - `health_check_id: optional array of string`

      Used for configuring health_check_status_notification

    - `incident_impact: optional array of "INCIDENT_IMPACT_NONE" or "INCIDENT_IMPACT_MINOR" or "INCIDENT_IMPACT_MAJOR" or "INCIDENT_IMPACT_CRITICAL"`

      Used for configuring incident_alert

      - `"INCIDENT_IMPACT_NONE"`

      - `"INCIDENT_IMPACT_MINOR"`

      - `"INCIDENT_IMPACT_MAJOR"`

      - `"INCIDENT_IMPACT_CRITICAL"`

    - `input_id: optional array of string`

      Used for configuring stream_live_notifications

    - `insight_class: optional array of string`

      Used for configuring security_insights_alert

    - `limit: optional array of string`

      Used for configuring billing_usage_alert

    - `logo_tag: optional array of string`

      Used for configuring logo_match_alert

    - `megabits_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `new_health: optional array of string`

      Used for configuring load_balancing_health_alert

    - `new_status: optional array of string`

      Used for configuring tunnel_health_event

    - `packets_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `pool_id: optional array of string`

      Usage depends on specific alert type

    - `pop_names: optional array of string`

      Usage depends on specific alert type

    - `product: optional array of string`

      Used for configuring billing_usage_alert

    - `project_id: optional array of string`

      Used for configuring pages_event_alert

    - `protocol: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `query_tag: optional array of string`

      Usage depends on specific alert type

    - `requests_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `selectors: optional array of string`

      Usage depends on specific alert type

    - `services: optional array of string`

      Used for configuring clickhouse_alert_fw_ent_anomaly

    - `slo: optional array of string`

      Usage depends on specific alert type

    - `status: optional array of string`

      Used for configuring health_check_status_notification

    - `target_hostname: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `target_ip: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `target_zone_name: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `traffic_exclusions: optional array of "security_events"`

      Used for configuring traffic_anomalies_alert

      - `"security_events"`

    - `tunnel_id: optional array of string`

      Used for configuring tunnel_health_event

    - `tunnel_name: optional array of string`

      Usage depends on specific alert type

    - `type: optional array of string`

      Usage depends on specific alert type

    - `where: optional array of string`

      Usage depends on specific alert type

    - `zones: optional array of string`

      Usage depends on specific alert type

  - `mechanisms: optional Mechanism`

    List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

    - `email: optional array of object { id }`

      - `id: optional string`

        The email address

    - `pagerduty: optional array of object { id }`

      - `id: optional string`

        UUID

    - `webhooks: optional array of object { id }`

      - `id: optional string`

        UUID

  - `modified: optional string`

  - `name: optional string`

    Name of the policy.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "0da2b59ef118439d8097bdfb215203c9",
      "alert_interval": "30m",
      "alert_type": "universal_ssl_event_type",
      "created": "2014-01-01T05:20:00.12345Z",
      "description": "Something describing the policy.",
      "enabled": true,
      "filters": {
        "actions": [
          "string"
        ],
        "affected_asns": [
          "string"
        ],
        "affected_components": [
          "string"
        ],
        "affected_locations": [
          "string"
        ],
        "airport_code": [
          "string"
        ],
        "alert_trigger_preferences": [
          "string"
        ],
        "alert_trigger_preferences_value": [
          "string"
        ],
        "enabled": [
          "string"
        ],
        "environment": [
          "string"
        ],
        "event": [
          "string"
        ],
        "event_source": [
          "string"
        ],
        "event_type": [
          "string"
        ],
        "group_by": [
          "string"
        ],
        "health_check_id": [
          "string"
        ],
        "incident_impact": [
          "INCIDENT_IMPACT_NONE"
        ],
        "input_id": [
          "string"
        ],
        "insight_class": [
          "string"
        ],
        "limit": [
          "string"
        ],
        "logo_tag": [
          "string"
        ],
        "megabits_per_second": [
          "string"
        ],
        "new_health": [
          "string"
        ],
        "new_status": [
          "string"
        ],
        "packets_per_second": [
          "string"
        ],
        "pool_id": [
          "string"
        ],
        "pop_names": [
          "string"
        ],
        "product": [
          "string"
        ],
        "project_id": [
          "string"
        ],
        "protocol": [
          "string"
        ],
        "query_tag": [
          "string"
        ],
        "requests_per_second": [
          "string"
        ],
        "selectors": [
          "string"
        ],
        "services": [
          "string"
        ],
        "slo": [
          "99.9"
        ],
        "status": [
          "string"
        ],
        "target_hostname": [
          "string"
        ],
        "target_ip": [
          "string"
        ],
        "target_zone_name": [
          "string"
        ],
        "traffic_exclusions": [
          "security_events"
        ],
        "tunnel_id": [
          "string"
        ],
        "tunnel_name": [
          "string"
        ],
        "type": [
          "string"
        ],
        "where": [
          "string"
        ],
        "zones": [
          "string"
        ]
      },
      "mechanisms": {
        "email": [
          {
            "id": "id"
          }
        ],
        "pagerduty": [
          {
            "id": "f174e90afafe4643bbbc4a0ed4fc8415"
          }
        ],
        "webhooks": [
          {
            "id": "f174e90afafe4643bbbc4a0ed4fc8415"
          }
        ]
      },
      "modified": "2014-01-01T05:20:00.12345Z",
      "name": "SSL Notification Event Policy"
    }
  ]
}
```

## Get a Notification policy

**get** `/accounts/{account_id}/alerting/v3/policies/{policy_id}`

Get details for a single policy.

### Path Parameters

- `account_id: string`

  The account id

- `policy_id: string`

  The unique identifier of a notification policy

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional Policy`

  - `id: optional string`

    The unique identifier of a notification policy

  - `alert_interval: optional string`

    Optional specification of how often to re-alert from the same incident, not support on all alert types.

  - `alert_type: optional "abuse_report_alert" or "access_custom_certificate_expiration_type" or "advanced_ddos_attack_l4_alert" or 66 more`

    Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.

    - `"abuse_report_alert"`

    - `"access_custom_certificate_expiration_type"`

    - `"advanced_ddos_attack_l4_alert"`

    - `"advanced_ddos_attack_l7_alert"`

    - `"advanced_http_alert_error"`

    - `"bgp_hijack_notification"`

    - `"billing_usage_alert"`

    - `"block_notification_block_removed"`

    - `"block_notification_new_block"`

    - `"block_notification_review_rejected"`

    - `"bot_traffic_basic_alert"`

    - `"brand_protection_alert"`

    - `"brand_protection_digest"`

    - `"clickhouse_alert_fw_anomaly"`

    - `"clickhouse_alert_fw_ent_anomaly"`

    - `"cloudforce_one_request_notification"`

    - `"cni_maintenance_notification"`

    - `"custom_analytics"`

    - `"custom_bot_detection_alert"`

    - `"custom_ssl_certificate_event_type"`

    - `"dedicated_ssl_certificate_event_type"`

    - `"device_connectivity_anomaly_alert"`

    - `"dos_attack_l4"`

    - `"dos_attack_l7"`

    - `"expiring_service_token_alert"`

    - `"failing_logpush_job_disabled_alert"`

    - `"fbm_auto_advertisement"`

    - `"fbm_dosd_attack"`

    - `"fbm_volumetric_attack"`

    - `"health_check_status_notification"`

    - `"hostname_aop_custom_certificate_expiration_type"`

    - `"http_alert_edge_error"`

    - `"http_alert_origin_error"`

    - `"image_notification"`

    - `"image_resizing_notification"`

    - `"incident_alert"`

    - `"load_balancing_health_alert"`

    - `"load_balancing_pool_enablement_alert"`

    - `"logo_match_alert"`

    - `"magic_tunnel_health_check_event"`

    - `"magic_wan_tunnel_health"`

    - `"maintenance_event_notification"`

    - `"mtls_certificate_store_certificate_expiration_type"`

    - `"pages_event_alert"`

    - `"radar_notification"`

    - `"real_origin_monitoring"`

    - `"scriptmonitor_alert_new_code_change_detections"`

    - `"scriptmonitor_alert_new_hosts"`

    - `"scriptmonitor_alert_new_malicious_hosts"`

    - `"scriptmonitor_alert_new_malicious_scripts"`

    - `"scriptmonitor_alert_new_malicious_url"`

    - `"scriptmonitor_alert_new_max_length_resource_url"`

    - `"scriptmonitor_alert_new_resources"`

    - `"secondary_dns_all_primaries_failing"`

    - `"secondary_dns_primaries_failing"`

    - `"secondary_dns_warning"`

    - `"secondary_dns_zone_successfully_updated"`

    - `"secondary_dns_zone_validation_warning"`

    - `"security_insights_alert"`

    - `"sentinel_alert"`

    - `"stream_live_notifications"`

    - `"synthetic_test_latency_alert"`

    - `"synthetic_test_low_availability_alert"`

    - `"traffic_anomalies_alert"`

    - `"tunnel_health_event"`

    - `"tunnel_update_event"`

    - `"universal_ssl_event_type"`

    - `"web_analytics_metrics_update"`

    - `"zone_aop_custom_certificate_expiration_type"`

  - `created: optional string`

  - `description: optional string`

    Optional description for the Notification policy.

  - `enabled: optional boolean`

    Whether or not the Notification policy is enabled.

  - `filters: optional PolicyFilter`

    Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

    - `actions: optional array of string`

      Usage depends on specific alert type

    - `affected_asns: optional array of string`

      Used for configuring radar_notification

    - `affected_components: optional array of string`

      Used for configuring incident_alert

    - `affected_locations: optional array of string`

      Used for configuring radar_notification

    - `airport_code: optional array of string`

      Used for configuring maintenance_event_notification

    - `alert_trigger_preferences: optional array of string`

      Usage depends on specific alert type

    - `alert_trigger_preferences_value: optional array of string`

      Usage depends on specific alert type

    - `enabled: optional array of string`

      Used for configuring load_balancing_pool_enablement_alert

    - `environment: optional array of string`

      Used for configuring pages_event_alert

    - `event: optional array of string`

      Used for configuring pages_event_alert

    - `event_source: optional array of string`

      Used for configuring load_balancing_health_alert

    - `event_type: optional array of string`

      Usage depends on specific alert type

    - `group_by: optional array of string`

      Usage depends on specific alert type

    - `health_check_id: optional array of string`

      Used for configuring health_check_status_notification

    - `incident_impact: optional array of "INCIDENT_IMPACT_NONE" or "INCIDENT_IMPACT_MINOR" or "INCIDENT_IMPACT_MAJOR" or "INCIDENT_IMPACT_CRITICAL"`

      Used for configuring incident_alert

      - `"INCIDENT_IMPACT_NONE"`

      - `"INCIDENT_IMPACT_MINOR"`

      - `"INCIDENT_IMPACT_MAJOR"`

      - `"INCIDENT_IMPACT_CRITICAL"`

    - `input_id: optional array of string`

      Used for configuring stream_live_notifications

    - `insight_class: optional array of string`

      Used for configuring security_insights_alert

    - `limit: optional array of string`

      Used for configuring billing_usage_alert

    - `logo_tag: optional array of string`

      Used for configuring logo_match_alert

    - `megabits_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `new_health: optional array of string`

      Used for configuring load_balancing_health_alert

    - `new_status: optional array of string`

      Used for configuring tunnel_health_event

    - `packets_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `pool_id: optional array of string`

      Usage depends on specific alert type

    - `pop_names: optional array of string`

      Usage depends on specific alert type

    - `product: optional array of string`

      Used for configuring billing_usage_alert

    - `project_id: optional array of string`

      Used for configuring pages_event_alert

    - `protocol: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `query_tag: optional array of string`

      Usage depends on specific alert type

    - `requests_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `selectors: optional array of string`

      Usage depends on specific alert type

    - `services: optional array of string`

      Used for configuring clickhouse_alert_fw_ent_anomaly

    - `slo: optional array of string`

      Usage depends on specific alert type

    - `status: optional array of string`

      Used for configuring health_check_status_notification

    - `target_hostname: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `target_ip: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `target_zone_name: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `traffic_exclusions: optional array of "security_events"`

      Used for configuring traffic_anomalies_alert

      - `"security_events"`

    - `tunnel_id: optional array of string`

      Used for configuring tunnel_health_event

    - `tunnel_name: optional array of string`

      Usage depends on specific alert type

    - `type: optional array of string`

      Usage depends on specific alert type

    - `where: optional array of string`

      Usage depends on specific alert type

    - `zones: optional array of string`

      Usage depends on specific alert type

  - `mechanisms: optional Mechanism`

    List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

    - `email: optional array of object { id }`

      - `id: optional string`

        The email address

    - `pagerduty: optional array of object { id }`

      - `id: optional string`

        UUID

    - `webhooks: optional array of object { id }`

      - `id: optional string`

        UUID

  - `modified: optional string`

  - `name: optional string`

    Name of the policy.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies/$POLICY_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "0da2b59ef118439d8097bdfb215203c9",
    "alert_interval": "30m",
    "alert_type": "universal_ssl_event_type",
    "created": "2014-01-01T05:20:00.12345Z",
    "description": "Something describing the policy.",
    "enabled": true,
    "filters": {
      "actions": [
        "string"
      ],
      "affected_asns": [
        "string"
      ],
      "affected_components": [
        "string"
      ],
      "affected_locations": [
        "string"
      ],
      "airport_code": [
        "string"
      ],
      "alert_trigger_preferences": [
        "string"
      ],
      "alert_trigger_preferences_value": [
        "string"
      ],
      "enabled": [
        "string"
      ],
      "environment": [
        "string"
      ],
      "event": [
        "string"
      ],
      "event_source": [
        "string"
      ],
      "event_type": [
        "string"
      ],
      "group_by": [
        "string"
      ],
      "health_check_id": [
        "string"
      ],
      "incident_impact": [
        "INCIDENT_IMPACT_NONE"
      ],
      "input_id": [
        "string"
      ],
      "insight_class": [
        "string"
      ],
      "limit": [
        "string"
      ],
      "logo_tag": [
        "string"
      ],
      "megabits_per_second": [
        "string"
      ],
      "new_health": [
        "string"
      ],
      "new_status": [
        "string"
      ],
      "packets_per_second": [
        "string"
      ],
      "pool_id": [
        "string"
      ],
      "pop_names": [
        "string"
      ],
      "product": [
        "string"
      ],
      "project_id": [
        "string"
      ],
      "protocol": [
        "string"
      ],
      "query_tag": [
        "string"
      ],
      "requests_per_second": [
        "string"
      ],
      "selectors": [
        "string"
      ],
      "services": [
        "string"
      ],
      "slo": [
        "99.9"
      ],
      "status": [
        "string"
      ],
      "target_hostname": [
        "string"
      ],
      "target_ip": [
        "string"
      ],
      "target_zone_name": [
        "string"
      ],
      "traffic_exclusions": [
        "security_events"
      ],
      "tunnel_id": [
        "string"
      ],
      "tunnel_name": [
        "string"
      ],
      "type": [
        "string"
      ],
      "where": [
        "string"
      ],
      "zones": [
        "string"
      ]
    },
    "mechanisms": {
      "email": [
        {
          "id": "id"
        }
      ],
      "pagerduty": [
        {
          "id": "f174e90afafe4643bbbc4a0ed4fc8415"
        }
      ],
      "webhooks": [
        {
          "id": "f174e90afafe4643bbbc4a0ed4fc8415"
        }
      ]
    },
    "modified": "2014-01-01T05:20:00.12345Z",
    "name": "SSL Notification Event Policy"
  }
}
```

## Create a Notification policy

**post** `/accounts/{account_id}/alerting/v3/policies`

Creates a new Notification policy.

### Path Parameters

- `account_id: string`

  The account id

### Body Parameters

- `alert_type: "abuse_report_alert" or "access_custom_certificate_expiration_type" or "advanced_ddos_attack_l4_alert" or 66 more`

  Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.

  - `"abuse_report_alert"`

  - `"access_custom_certificate_expiration_type"`

  - `"advanced_ddos_attack_l4_alert"`

  - `"advanced_ddos_attack_l7_alert"`

  - `"advanced_http_alert_error"`

  - `"bgp_hijack_notification"`

  - `"billing_usage_alert"`

  - `"block_notification_block_removed"`

  - `"block_notification_new_block"`

  - `"block_notification_review_rejected"`

  - `"bot_traffic_basic_alert"`

  - `"brand_protection_alert"`

  - `"brand_protection_digest"`

  - `"clickhouse_alert_fw_anomaly"`

  - `"clickhouse_alert_fw_ent_anomaly"`

  - `"cloudforce_one_request_notification"`

  - `"cni_maintenance_notification"`

  - `"custom_analytics"`

  - `"custom_bot_detection_alert"`

  - `"custom_ssl_certificate_event_type"`

  - `"dedicated_ssl_certificate_event_type"`

  - `"device_connectivity_anomaly_alert"`

  - `"dos_attack_l4"`

  - `"dos_attack_l7"`

  - `"expiring_service_token_alert"`

  - `"failing_logpush_job_disabled_alert"`

  - `"fbm_auto_advertisement"`

  - `"fbm_dosd_attack"`

  - `"fbm_volumetric_attack"`

  - `"health_check_status_notification"`

  - `"hostname_aop_custom_certificate_expiration_type"`

  - `"http_alert_edge_error"`

  - `"http_alert_origin_error"`

  - `"image_notification"`

  - `"image_resizing_notification"`

  - `"incident_alert"`

  - `"load_balancing_health_alert"`

  - `"load_balancing_pool_enablement_alert"`

  - `"logo_match_alert"`

  - `"magic_tunnel_health_check_event"`

  - `"magic_wan_tunnel_health"`

  - `"maintenance_event_notification"`

  - `"mtls_certificate_store_certificate_expiration_type"`

  - `"pages_event_alert"`

  - `"radar_notification"`

  - `"real_origin_monitoring"`

  - `"scriptmonitor_alert_new_code_change_detections"`

  - `"scriptmonitor_alert_new_hosts"`

  - `"scriptmonitor_alert_new_malicious_hosts"`

  - `"scriptmonitor_alert_new_malicious_scripts"`

  - `"scriptmonitor_alert_new_malicious_url"`

  - `"scriptmonitor_alert_new_max_length_resource_url"`

  - `"scriptmonitor_alert_new_resources"`

  - `"secondary_dns_all_primaries_failing"`

  - `"secondary_dns_primaries_failing"`

  - `"secondary_dns_warning"`

  - `"secondary_dns_zone_successfully_updated"`

  - `"secondary_dns_zone_validation_warning"`

  - `"security_insights_alert"`

  - `"sentinel_alert"`

  - `"stream_live_notifications"`

  - `"synthetic_test_latency_alert"`

  - `"synthetic_test_low_availability_alert"`

  - `"traffic_anomalies_alert"`

  - `"tunnel_health_event"`

  - `"tunnel_update_event"`

  - `"universal_ssl_event_type"`

  - `"web_analytics_metrics_update"`

  - `"zone_aop_custom_certificate_expiration_type"`

- `enabled: boolean`

  Whether or not the Notification policy is enabled.

- `mechanisms: Mechanism`

  List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

  - `email: optional array of object { id }`

    - `id: optional string`

      The email address

  - `pagerduty: optional array of object { id }`

    - `id: optional string`

      UUID

  - `webhooks: optional array of object { id }`

    - `id: optional string`

      UUID

- `name: string`

  Name of the policy.

- `alert_interval: optional string`

  Optional specification of how often to re-alert from the same incident, not support on all alert types.

- `description: optional string`

  Optional description for the Notification policy.

- `filters: optional PolicyFilter`

  Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

  - `actions: optional array of string`

    Usage depends on specific alert type

  - `affected_asns: optional array of string`

    Used for configuring radar_notification

  - `affected_components: optional array of string`

    Used for configuring incident_alert

  - `affected_locations: optional array of string`

    Used for configuring radar_notification

  - `airport_code: optional array of string`

    Used for configuring maintenance_event_notification

  - `alert_trigger_preferences: optional array of string`

    Usage depends on specific alert type

  - `alert_trigger_preferences_value: optional array of string`

    Usage depends on specific alert type

  - `enabled: optional array of string`

    Used for configuring load_balancing_pool_enablement_alert

  - `environment: optional array of string`

    Used for configuring pages_event_alert

  - `event: optional array of string`

    Used for configuring pages_event_alert

  - `event_source: optional array of string`

    Used for configuring load_balancing_health_alert

  - `event_type: optional array of string`

    Usage depends on specific alert type

  - `group_by: optional array of string`

    Usage depends on specific alert type

  - `health_check_id: optional array of string`

    Used for configuring health_check_status_notification

  - `incident_impact: optional array of "INCIDENT_IMPACT_NONE" or "INCIDENT_IMPACT_MINOR" or "INCIDENT_IMPACT_MAJOR" or "INCIDENT_IMPACT_CRITICAL"`

    Used for configuring incident_alert

    - `"INCIDENT_IMPACT_NONE"`

    - `"INCIDENT_IMPACT_MINOR"`

    - `"INCIDENT_IMPACT_MAJOR"`

    - `"INCIDENT_IMPACT_CRITICAL"`

  - `input_id: optional array of string`

    Used for configuring stream_live_notifications

  - `insight_class: optional array of string`

    Used for configuring security_insights_alert

  - `limit: optional array of string`

    Used for configuring billing_usage_alert

  - `logo_tag: optional array of string`

    Used for configuring logo_match_alert

  - `megabits_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `new_health: optional array of string`

    Used for configuring load_balancing_health_alert

  - `new_status: optional array of string`

    Used for configuring tunnel_health_event

  - `packets_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `pool_id: optional array of string`

    Usage depends on specific alert type

  - `pop_names: optional array of string`

    Usage depends on specific alert type

  - `product: optional array of string`

    Used for configuring billing_usage_alert

  - `project_id: optional array of string`

    Used for configuring pages_event_alert

  - `protocol: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `query_tag: optional array of string`

    Usage depends on specific alert type

  - `requests_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `selectors: optional array of string`

    Usage depends on specific alert type

  - `services: optional array of string`

    Used for configuring clickhouse_alert_fw_ent_anomaly

  - `slo: optional array of string`

    Usage depends on specific alert type

  - `status: optional array of string`

    Used for configuring health_check_status_notification

  - `target_hostname: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `target_ip: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `target_zone_name: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `traffic_exclusions: optional array of "security_events"`

    Used for configuring traffic_anomalies_alert

    - `"security_events"`

  - `tunnel_id: optional array of string`

    Used for configuring tunnel_health_event

  - `tunnel_name: optional array of string`

    Usage depends on specific alert type

  - `type: optional array of string`

    Usage depends on specific alert type

  - `where: optional array of string`

    Usage depends on specific alert type

  - `zones: optional array of string`

    Usage depends on specific alert type

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    UUID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "alert_type": "universal_ssl_event_type",
          "enabled": true,
          "mechanisms": {},
          "name": "SSL Notification Event Policy",
          "alert_interval": "30m",
          "description": "Something describing the policy.",
          "filters": {
            "slo": [
              "99.9"
            ]
          }
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
  }
}
```

## Update a Notification policy

**put** `/accounts/{account_id}/alerting/v3/policies/{policy_id}`

Update a Notification policy.

### Path Parameters

- `account_id: string`

  The account id

- `policy_id: string`

  The unique identifier of a notification policy

### Body Parameters

- `alert_interval: optional string`

  Optional specification of how often to re-alert from the same incident, not support on all alert types.

- `alert_type: optional "abuse_report_alert" or "access_custom_certificate_expiration_type" or "advanced_ddos_attack_l4_alert" or 66 more`

  Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.

  - `"abuse_report_alert"`

  - `"access_custom_certificate_expiration_type"`

  - `"advanced_ddos_attack_l4_alert"`

  - `"advanced_ddos_attack_l7_alert"`

  - `"advanced_http_alert_error"`

  - `"bgp_hijack_notification"`

  - `"billing_usage_alert"`

  - `"block_notification_block_removed"`

  - `"block_notification_new_block"`

  - `"block_notification_review_rejected"`

  - `"bot_traffic_basic_alert"`

  - `"brand_protection_alert"`

  - `"brand_protection_digest"`

  - `"clickhouse_alert_fw_anomaly"`

  - `"clickhouse_alert_fw_ent_anomaly"`

  - `"cloudforce_one_request_notification"`

  - `"cni_maintenance_notification"`

  - `"custom_analytics"`

  - `"custom_bot_detection_alert"`

  - `"custom_ssl_certificate_event_type"`

  - `"dedicated_ssl_certificate_event_type"`

  - `"device_connectivity_anomaly_alert"`

  - `"dos_attack_l4"`

  - `"dos_attack_l7"`

  - `"expiring_service_token_alert"`

  - `"failing_logpush_job_disabled_alert"`

  - `"fbm_auto_advertisement"`

  - `"fbm_dosd_attack"`

  - `"fbm_volumetric_attack"`

  - `"health_check_status_notification"`

  - `"hostname_aop_custom_certificate_expiration_type"`

  - `"http_alert_edge_error"`

  - `"http_alert_origin_error"`

  - `"image_notification"`

  - `"image_resizing_notification"`

  - `"incident_alert"`

  - `"load_balancing_health_alert"`

  - `"load_balancing_pool_enablement_alert"`

  - `"logo_match_alert"`

  - `"magic_tunnel_health_check_event"`

  - `"magic_wan_tunnel_health"`

  - `"maintenance_event_notification"`

  - `"mtls_certificate_store_certificate_expiration_type"`

  - `"pages_event_alert"`

  - `"radar_notification"`

  - `"real_origin_monitoring"`

  - `"scriptmonitor_alert_new_code_change_detections"`

  - `"scriptmonitor_alert_new_hosts"`

  - `"scriptmonitor_alert_new_malicious_hosts"`

  - `"scriptmonitor_alert_new_malicious_scripts"`

  - `"scriptmonitor_alert_new_malicious_url"`

  - `"scriptmonitor_alert_new_max_length_resource_url"`

  - `"scriptmonitor_alert_new_resources"`

  - `"secondary_dns_all_primaries_failing"`

  - `"secondary_dns_primaries_failing"`

  - `"secondary_dns_warning"`

  - `"secondary_dns_zone_successfully_updated"`

  - `"secondary_dns_zone_validation_warning"`

  - `"security_insights_alert"`

  - `"sentinel_alert"`

  - `"stream_live_notifications"`

  - `"synthetic_test_latency_alert"`

  - `"synthetic_test_low_availability_alert"`

  - `"traffic_anomalies_alert"`

  - `"tunnel_health_event"`

  - `"tunnel_update_event"`

  - `"universal_ssl_event_type"`

  - `"web_analytics_metrics_update"`

  - `"zone_aop_custom_certificate_expiration_type"`

- `description: optional string`

  Optional description for the Notification policy.

- `enabled: optional boolean`

  Whether or not the Notification policy is enabled.

- `filters: optional PolicyFilter`

  Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

  - `actions: optional array of string`

    Usage depends on specific alert type

  - `affected_asns: optional array of string`

    Used for configuring radar_notification

  - `affected_components: optional array of string`

    Used for configuring incident_alert

  - `affected_locations: optional array of string`

    Used for configuring radar_notification

  - `airport_code: optional array of string`

    Used for configuring maintenance_event_notification

  - `alert_trigger_preferences: optional array of string`

    Usage depends on specific alert type

  - `alert_trigger_preferences_value: optional array of string`

    Usage depends on specific alert type

  - `enabled: optional array of string`

    Used for configuring load_balancing_pool_enablement_alert

  - `environment: optional array of string`

    Used for configuring pages_event_alert

  - `event: optional array of string`

    Used for configuring pages_event_alert

  - `event_source: optional array of string`

    Used for configuring load_balancing_health_alert

  - `event_type: optional array of string`

    Usage depends on specific alert type

  - `group_by: optional array of string`

    Usage depends on specific alert type

  - `health_check_id: optional array of string`

    Used for configuring health_check_status_notification

  - `incident_impact: optional array of "INCIDENT_IMPACT_NONE" or "INCIDENT_IMPACT_MINOR" or "INCIDENT_IMPACT_MAJOR" or "INCIDENT_IMPACT_CRITICAL"`

    Used for configuring incident_alert

    - `"INCIDENT_IMPACT_NONE"`

    - `"INCIDENT_IMPACT_MINOR"`

    - `"INCIDENT_IMPACT_MAJOR"`

    - `"INCIDENT_IMPACT_CRITICAL"`

  - `input_id: optional array of string`

    Used for configuring stream_live_notifications

  - `insight_class: optional array of string`

    Used for configuring security_insights_alert

  - `limit: optional array of string`

    Used for configuring billing_usage_alert

  - `logo_tag: optional array of string`

    Used for configuring logo_match_alert

  - `megabits_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `new_health: optional array of string`

    Used for configuring load_balancing_health_alert

  - `new_status: optional array of string`

    Used for configuring tunnel_health_event

  - `packets_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `pool_id: optional array of string`

    Usage depends on specific alert type

  - `pop_names: optional array of string`

    Usage depends on specific alert type

  - `product: optional array of string`

    Used for configuring billing_usage_alert

  - `project_id: optional array of string`

    Used for configuring pages_event_alert

  - `protocol: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `query_tag: optional array of string`

    Usage depends on specific alert type

  - `requests_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `selectors: optional array of string`

    Usage depends on specific alert type

  - `services: optional array of string`

    Used for configuring clickhouse_alert_fw_ent_anomaly

  - `slo: optional array of string`

    Usage depends on specific alert type

  - `status: optional array of string`

    Used for configuring health_check_status_notification

  - `target_hostname: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `target_ip: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `target_zone_name: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `traffic_exclusions: optional array of "security_events"`

    Used for configuring traffic_anomalies_alert

    - `"security_events"`

  - `tunnel_id: optional array of string`

    Used for configuring tunnel_health_event

  - `tunnel_name: optional array of string`

    Usage depends on specific alert type

  - `type: optional array of string`

    Usage depends on specific alert type

  - `where: optional array of string`

    Usage depends on specific alert type

  - `zones: optional array of string`

    Usage depends on specific alert type

- `mechanisms: optional Mechanism`

  List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

  - `email: optional array of object { id }`

    - `id: optional string`

      The email address

  - `pagerduty: optional array of object { id }`

    - `id: optional string`

      UUID

  - `webhooks: optional array of object { id }`

    - `id: optional string`

      UUID

- `name: optional string`

  Name of the policy.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id }`

  - `id: optional string`

    UUID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies/$POLICY_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "alert_interval": "30m",
          "alert_type": "universal_ssl_event_type",
          "description": "Something describing the policy.",
          "enabled": true,
          "filters": {
            "slo": [
              "99.9"
            ]
          },
          "name": "SSL Notification Event Policy"
        }'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f174e90afafe4643bbbc4a0ed4fc8415"
  }
}
```

## Delete a Notification policy

**delete** `/accounts/{account_id}/alerting/v3/policies/{policy_id}`

Delete a Notification policy.

### Path Parameters

- `account_id: string`

  The account id

- `policy_id: string`

  The unique identifier of a notification policy

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/policies/$POLICY_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### Mechanism

- `Mechanism object { email, pagerduty, webhooks }`

  List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

  - `email: optional array of object { id }`

    - `id: optional string`

      The email address

  - `pagerduty: optional array of object { id }`

    - `id: optional string`

      UUID

  - `webhooks: optional array of object { id }`

    - `id: optional string`

      UUID

### Policy

- `Policy object { id, alert_interval, alert_type, 7 more }`

  - `id: optional string`

    The unique identifier of a notification policy

  - `alert_interval: optional string`

    Optional specification of how often to re-alert from the same incident, not support on all alert types.

  - `alert_type: optional "abuse_report_alert" or "access_custom_certificate_expiration_type" or "advanced_ddos_attack_l4_alert" or 66 more`

    Refers to which event will trigger a Notification dispatch. You can use the endpoint to get available alert types which then will give you a list of possible values.

    - `"abuse_report_alert"`

    - `"access_custom_certificate_expiration_type"`

    - `"advanced_ddos_attack_l4_alert"`

    - `"advanced_ddos_attack_l7_alert"`

    - `"advanced_http_alert_error"`

    - `"bgp_hijack_notification"`

    - `"billing_usage_alert"`

    - `"block_notification_block_removed"`

    - `"block_notification_new_block"`

    - `"block_notification_review_rejected"`

    - `"bot_traffic_basic_alert"`

    - `"brand_protection_alert"`

    - `"brand_protection_digest"`

    - `"clickhouse_alert_fw_anomaly"`

    - `"clickhouse_alert_fw_ent_anomaly"`

    - `"cloudforce_one_request_notification"`

    - `"cni_maintenance_notification"`

    - `"custom_analytics"`

    - `"custom_bot_detection_alert"`

    - `"custom_ssl_certificate_event_type"`

    - `"dedicated_ssl_certificate_event_type"`

    - `"device_connectivity_anomaly_alert"`

    - `"dos_attack_l4"`

    - `"dos_attack_l7"`

    - `"expiring_service_token_alert"`

    - `"failing_logpush_job_disabled_alert"`

    - `"fbm_auto_advertisement"`

    - `"fbm_dosd_attack"`

    - `"fbm_volumetric_attack"`

    - `"health_check_status_notification"`

    - `"hostname_aop_custom_certificate_expiration_type"`

    - `"http_alert_edge_error"`

    - `"http_alert_origin_error"`

    - `"image_notification"`

    - `"image_resizing_notification"`

    - `"incident_alert"`

    - `"load_balancing_health_alert"`

    - `"load_balancing_pool_enablement_alert"`

    - `"logo_match_alert"`

    - `"magic_tunnel_health_check_event"`

    - `"magic_wan_tunnel_health"`

    - `"maintenance_event_notification"`

    - `"mtls_certificate_store_certificate_expiration_type"`

    - `"pages_event_alert"`

    - `"radar_notification"`

    - `"real_origin_monitoring"`

    - `"scriptmonitor_alert_new_code_change_detections"`

    - `"scriptmonitor_alert_new_hosts"`

    - `"scriptmonitor_alert_new_malicious_hosts"`

    - `"scriptmonitor_alert_new_malicious_scripts"`

    - `"scriptmonitor_alert_new_malicious_url"`

    - `"scriptmonitor_alert_new_max_length_resource_url"`

    - `"scriptmonitor_alert_new_resources"`

    - `"secondary_dns_all_primaries_failing"`

    - `"secondary_dns_primaries_failing"`

    - `"secondary_dns_warning"`

    - `"secondary_dns_zone_successfully_updated"`

    - `"secondary_dns_zone_validation_warning"`

    - `"security_insights_alert"`

    - `"sentinel_alert"`

    - `"stream_live_notifications"`

    - `"synthetic_test_latency_alert"`

    - `"synthetic_test_low_availability_alert"`

    - `"traffic_anomalies_alert"`

    - `"tunnel_health_event"`

    - `"tunnel_update_event"`

    - `"universal_ssl_event_type"`

    - `"web_analytics_metrics_update"`

    - `"zone_aop_custom_certificate_expiration_type"`

  - `created: optional string`

  - `description: optional string`

    Optional description for the Notification policy.

  - `enabled: optional boolean`

    Whether or not the Notification policy is enabled.

  - `filters: optional PolicyFilter`

    Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

    - `actions: optional array of string`

      Usage depends on specific alert type

    - `affected_asns: optional array of string`

      Used for configuring radar_notification

    - `affected_components: optional array of string`

      Used for configuring incident_alert

    - `affected_locations: optional array of string`

      Used for configuring radar_notification

    - `airport_code: optional array of string`

      Used for configuring maintenance_event_notification

    - `alert_trigger_preferences: optional array of string`

      Usage depends on specific alert type

    - `alert_trigger_preferences_value: optional array of string`

      Usage depends on specific alert type

    - `enabled: optional array of string`

      Used for configuring load_balancing_pool_enablement_alert

    - `environment: optional array of string`

      Used for configuring pages_event_alert

    - `event: optional array of string`

      Used for configuring pages_event_alert

    - `event_source: optional array of string`

      Used for configuring load_balancing_health_alert

    - `event_type: optional array of string`

      Usage depends on specific alert type

    - `group_by: optional array of string`

      Usage depends on specific alert type

    - `health_check_id: optional array of string`

      Used for configuring health_check_status_notification

    - `incident_impact: optional array of "INCIDENT_IMPACT_NONE" or "INCIDENT_IMPACT_MINOR" or "INCIDENT_IMPACT_MAJOR" or "INCIDENT_IMPACT_CRITICAL"`

      Used for configuring incident_alert

      - `"INCIDENT_IMPACT_NONE"`

      - `"INCIDENT_IMPACT_MINOR"`

      - `"INCIDENT_IMPACT_MAJOR"`

      - `"INCIDENT_IMPACT_CRITICAL"`

    - `input_id: optional array of string`

      Used for configuring stream_live_notifications

    - `insight_class: optional array of string`

      Used for configuring security_insights_alert

    - `limit: optional array of string`

      Used for configuring billing_usage_alert

    - `logo_tag: optional array of string`

      Used for configuring logo_match_alert

    - `megabits_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `new_health: optional array of string`

      Used for configuring load_balancing_health_alert

    - `new_status: optional array of string`

      Used for configuring tunnel_health_event

    - `packets_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `pool_id: optional array of string`

      Usage depends on specific alert type

    - `pop_names: optional array of string`

      Usage depends on specific alert type

    - `product: optional array of string`

      Used for configuring billing_usage_alert

    - `project_id: optional array of string`

      Used for configuring pages_event_alert

    - `protocol: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `query_tag: optional array of string`

      Usage depends on specific alert type

    - `requests_per_second: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `selectors: optional array of string`

      Usage depends on specific alert type

    - `services: optional array of string`

      Used for configuring clickhouse_alert_fw_ent_anomaly

    - `slo: optional array of string`

      Usage depends on specific alert type

    - `status: optional array of string`

      Used for configuring health_check_status_notification

    - `target_hostname: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `target_ip: optional array of string`

      Used for configuring advanced_ddos_attack_l4_alert

    - `target_zone_name: optional array of string`

      Used for configuring advanced_ddos_attack_l7_alert

    - `traffic_exclusions: optional array of "security_events"`

      Used for configuring traffic_anomalies_alert

      - `"security_events"`

    - `tunnel_id: optional array of string`

      Used for configuring tunnel_health_event

    - `tunnel_name: optional array of string`

      Usage depends on specific alert type

    - `type: optional array of string`

      Usage depends on specific alert type

    - `where: optional array of string`

      Usage depends on specific alert type

    - `zones: optional array of string`

      Usage depends on specific alert type

  - `mechanisms: optional Mechanism`

    List of IDs that will be used when dispatching a notification. IDs for email type will be the email address.

    - `email: optional array of object { id }`

      - `id: optional string`

        The email address

    - `pagerduty: optional array of object { id }`

      - `id: optional string`

        UUID

    - `webhooks: optional array of object { id }`

      - `id: optional string`

        UUID

  - `modified: optional string`

  - `name: optional string`

    Name of the policy.

### Policy Filter

- `PolicyFilter object { actions, affected_asns, affected_components, 40 more }`

  Optional filters that allow you to be alerted only on a subset of events for that alert type based on some criteria. This is only available for select alert types. See alert type documentation for more details.

  - `actions: optional array of string`

    Usage depends on specific alert type

  - `affected_asns: optional array of string`

    Used for configuring radar_notification

  - `affected_components: optional array of string`

    Used for configuring incident_alert

  - `affected_locations: optional array of string`

    Used for configuring radar_notification

  - `airport_code: optional array of string`

    Used for configuring maintenance_event_notification

  - `alert_trigger_preferences: optional array of string`

    Usage depends on specific alert type

  - `alert_trigger_preferences_value: optional array of string`

    Usage depends on specific alert type

  - `enabled: optional array of string`

    Used for configuring load_balancing_pool_enablement_alert

  - `environment: optional array of string`

    Used for configuring pages_event_alert

  - `event: optional array of string`

    Used for configuring pages_event_alert

  - `event_source: optional array of string`

    Used for configuring load_balancing_health_alert

  - `event_type: optional array of string`

    Usage depends on specific alert type

  - `group_by: optional array of string`

    Usage depends on specific alert type

  - `health_check_id: optional array of string`

    Used for configuring health_check_status_notification

  - `incident_impact: optional array of "INCIDENT_IMPACT_NONE" or "INCIDENT_IMPACT_MINOR" or "INCIDENT_IMPACT_MAJOR" or "INCIDENT_IMPACT_CRITICAL"`

    Used for configuring incident_alert

    - `"INCIDENT_IMPACT_NONE"`

    - `"INCIDENT_IMPACT_MINOR"`

    - `"INCIDENT_IMPACT_MAJOR"`

    - `"INCIDENT_IMPACT_CRITICAL"`

  - `input_id: optional array of string`

    Used for configuring stream_live_notifications

  - `insight_class: optional array of string`

    Used for configuring security_insights_alert

  - `limit: optional array of string`

    Used for configuring billing_usage_alert

  - `logo_tag: optional array of string`

    Used for configuring logo_match_alert

  - `megabits_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `new_health: optional array of string`

    Used for configuring load_balancing_health_alert

  - `new_status: optional array of string`

    Used for configuring tunnel_health_event

  - `packets_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `pool_id: optional array of string`

    Usage depends on specific alert type

  - `pop_names: optional array of string`

    Usage depends on specific alert type

  - `product: optional array of string`

    Used for configuring billing_usage_alert

  - `project_id: optional array of string`

    Used for configuring pages_event_alert

  - `protocol: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `query_tag: optional array of string`

    Usage depends on specific alert type

  - `requests_per_second: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `selectors: optional array of string`

    Usage depends on specific alert type

  - `services: optional array of string`

    Used for configuring clickhouse_alert_fw_ent_anomaly

  - `slo: optional array of string`

    Usage depends on specific alert type

  - `status: optional array of string`

    Used for configuring health_check_status_notification

  - `target_hostname: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `target_ip: optional array of string`

    Used for configuring advanced_ddos_attack_l4_alert

  - `target_zone_name: optional array of string`

    Used for configuring advanced_ddos_attack_l7_alert

  - `traffic_exclusions: optional array of "security_events"`

    Used for configuring traffic_anomalies_alert

    - `"security_events"`

  - `tunnel_id: optional array of string`

    Used for configuring tunnel_health_event

  - `tunnel_name: optional array of string`

    Usage depends on specific alert type

  - `type: optional array of string`

    Usage depends on specific alert type

  - `where: optional array of string`

    Usage depends on specific alert type

  - `zones: optional array of string`

    Usage depends on specific alert type

### Policy Create Response

- `PolicyCreateResponse object { id }`

  - `id: optional string`

    UUID

### Policy Update Response

- `PolicyUpdateResponse object { id }`

  - `id: optional string`

    UUID

### Policy Delete Response

- `PolicyDeleteResponse object { errors, messages, success, result_info }`

  - `errors: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `messages: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `success: true`

    Whether the API call was successful

    - `true`

  - `result_info: optional object { count, page, per_page, total_count }`

    - `count: optional number`

      Total number of results for the requested service

    - `page: optional number`

      Current page within paginated list of results

    - `per_page: optional number`

      Number of results per page of results

    - `total_count: optional number`

      Total results available without any search parameters

# Silences

## List Silences

**get** `/accounts/{account_id}/alerting/v3/silences`

Gets a list of silences for an account.

### Path Parameters

- `account_id: string`

  The account id

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f878e90c23f44126ae3cfc399f646977",
      "created_at": "2022-01-01T00:00:00Z",
      "end_time": "2022-01-01T00:00:00Z",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "start_time": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
    }
  ]
}
```

## Get Silence

**get** `/accounts/{account_id}/alerting/v3/silences/{silence_id}`

Gets a specific silence for an account.

### Path Parameters

- `account_id: string`

  The account id

- `silence_id: string`

  Silence ID

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences/$SILENCE_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": {
    "id": "f878e90c23f44126ae3cfc399f646977",
    "created_at": "2022-01-01T00:00:00Z",
    "end_time": "2022-01-01T00:00:00Z",
    "policy_id": "0da2b59ef118439d8097bdfb215203c9",
    "start_time": "2022-01-01T00:00:00Z",
    "updated_at": "2022-01-01T00:00:00Z"
  }
}
```

## Create Silences

**post** `/accounts/{account_id}/alerting/v3/silences`

Creates a new silence for an account.

### Path Parameters

- `account_id: string`

  The account id

### Body Parameters

- `body: array of object { end_time, policy_id, start_time }`

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "end_time": "2022-01-01T00:00:00Z",
            "policy_id": "0da2b59ef118439d8097bdfb215203c9",
            "start_time": "2022-01-01T00:00:00Z"
          }
        ]'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true
}
```

## Update Silences

**put** `/accounts/{account_id}/alerting/v3/silences`

Updates existing silences for an account.

### Path Parameters

- `account_id: string`

  The account id

### Body Parameters

- `body: array of object { id, end_time, start_time }`

  - `id: optional string`

    Silence ID

  - `end_time: optional string`

    When the silence ends.

  - `start_time: optional string`

    When the silence starts.

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

- `result: optional array of object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "id": "f878e90c23f44126ae3cfc399f646977",
            "end_time": "2022-01-01T00:00:00Z",
            "start_time": "2022-01-01T00:00:00Z"
          }
        ]'
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true,
  "result": [
    {
      "id": "f878e90c23f44126ae3cfc399f646977",
      "created_at": "2022-01-01T00:00:00Z",
      "end_time": "2022-01-01T00:00:00Z",
      "policy_id": "0da2b59ef118439d8097bdfb215203c9",
      "start_time": "2022-01-01T00:00:00Z",
      "updated_at": "2022-01-01T00:00:00Z"
    }
  ]
}
```

## Delete Silence

**delete** `/accounts/{account_id}/alerting/v3/silences/{silence_id}`

Deletes an existing silence for an account.

### Path Parameters

- `account_id: string`

  The account id

- `silence_id: string`

  Silence ID

### Returns

- `errors: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `messages: array of object { message, code }`

  - `message: string`

  - `code: optional number`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/alerting/v3/silences/$SILENCE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "messages": [
    {
      "message": "message",
      "code": 1000
    }
  ],
  "success": true
}
```

## Domain Types

### Silence List Response

- `SilenceListResponse object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Silence Get Response

- `SilenceGetResponse object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Silence Create Response

- `SilenceCreateResponse object { errors, messages, success }`

  - `errors: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `messages: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `success: true`

    Whether the API call was successful

    - `true`

### Silence Update Response

- `SilenceUpdateResponse object { id, created_at, end_time, 3 more }`

  - `id: optional string`

    Silence ID

  - `created_at: optional string`

    When the silence was created.

  - `end_time: optional string`

    When the silence ends.

  - `policy_id: optional string`

    The unique identifier of a notification policy

  - `start_time: optional string`

    When the silence starts.

  - `updated_at: optional string`

    When the silence was modified.

### Silence Delete Response

- `SilenceDeleteResponse object { errors, messages, success }`

  - `errors: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `messages: array of object { message, code }`

    - `message: string`

    - `code: optional number`

  - `success: true`

    Whether the API call was successful

    - `true`
