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
