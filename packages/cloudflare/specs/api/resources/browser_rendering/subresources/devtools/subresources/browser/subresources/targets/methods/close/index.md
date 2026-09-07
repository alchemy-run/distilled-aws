## Close a browser target.

**get** `/accounts/{account_id}/browser-rendering/devtools/browser/{session_id}/json/close/{target_id}`

Closes a specific browser target (tab, page, etc.) by its ID. Returns 'Target is closing' on success or an error if the target is not found.

### Path Parameters

- `account_id: string`

  Account ID.

- `session_id: string`

  Browser session ID.

- `target_id: string`

  Target ID to close.

### Returns

- `message: string`

  Target is closing.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/browser-rendering/devtools/browser/$SESSION_ID/json/close/$TARGET_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "message": "message"
}
```
