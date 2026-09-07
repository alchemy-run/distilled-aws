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
