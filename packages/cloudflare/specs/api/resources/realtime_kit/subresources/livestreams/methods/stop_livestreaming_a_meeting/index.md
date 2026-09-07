## Stop livestreaming a meeting

**post** `/accounts/{account_id}/realtime/kit/{app_id}/meetings/{meeting_id}/active-livestream/stop`

Stops the active livestream of a meeting associated with the given meeting ID. Retreive the meeting ID using the `Create a meeting` API.

### Path Parameters

- `account_id: string`

  The account identifier tag.

- `app_id: string`

  The app identifier tag.

- `meeting_id: string`

### Returns

- `data: optional object { message }`

  - `message: optional string`

- `success: optional boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/realtime/kit/$APP_ID/meetings/$MEETING_ID/active-livestream/stop \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "data": {
    "message": "Stopped live stream successfully"
  },
  "success": true
}
```
