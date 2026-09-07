# Downloads

## Download command output file

**get** `/accounts/{account_id}/dex/commands/{command_id}/downloads/{filename}`

Downloads artifacts for an executed command. Bulk downloads are not supported

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `command_id: string`

  Unique identifier for a command

- `filename: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/commands/$COMMAND_ID/downloads/$FILENAME \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
