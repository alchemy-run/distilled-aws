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
