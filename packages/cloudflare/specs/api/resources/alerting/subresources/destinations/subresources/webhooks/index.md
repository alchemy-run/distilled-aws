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
