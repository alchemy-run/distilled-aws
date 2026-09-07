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
