## Revoke application tokens

**post** `/{accounts_or_zones}/{account_or_zone_id}/access/apps/{app_id}/revoke_tokens`

Revokes all tokens issued for an application.

### Path Parameters

- `app_id: AppID`

  Identifier.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Returns

- `result: optional unknown`

- `success: optional true or false`

  - `true`

  - `false`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/apps/$APP_ID/revoke_tokens \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {},
  "success": true
}
```
