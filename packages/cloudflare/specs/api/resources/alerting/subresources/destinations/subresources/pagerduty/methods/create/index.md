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
