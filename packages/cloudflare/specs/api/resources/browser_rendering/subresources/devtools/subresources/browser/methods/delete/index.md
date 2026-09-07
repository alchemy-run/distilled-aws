## Close browser session.

**delete** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}`

Closes an existing browser session.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID to close.

### Returns

- `status: "closing" or "closed"`

  - `"closing"`

  - `"closed"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "status": "closing"
}
```
