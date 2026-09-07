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
