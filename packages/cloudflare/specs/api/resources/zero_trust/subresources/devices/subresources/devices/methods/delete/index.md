## Delete device

**delete** `/accounts/{account_id}/devices/physical-devices/{device_id}`

Deletes a WARP device.

### Path Parameters

- `account_id: string`

- `device_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `success: boolean`

  Whether the API call was successful.

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/physical-devices/$DEVICE_ID \
    -X DELETE \
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
  "success": true,
  "result": {}
}
```
