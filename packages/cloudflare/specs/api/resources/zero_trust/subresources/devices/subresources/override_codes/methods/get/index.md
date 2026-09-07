## Get override codes

**get** `/accounts/{account_id}/devices/registrations/{registration_id}/override_codes`

Fetches one-time use admin override codes for a registration. This relies on the **Admin Override** setting being enabled in your device configuration.

### Path Parameters

- `account_id: string`

- `registration_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { disable_for_time }`

  - `disable_for_time: optional map[string]`

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/registrations/$REGISTRATION_ID/override_codes \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "disable_for_time": {
      "foo": "string"
    }
  },
  "success": true
}
```
