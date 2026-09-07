## Revoke all Access tokens for a user

**post** `/{accounts_or_zones}/{account_or_zone_id}/access/organizations/revoke_user`

Revokes a user's access across all applications.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `devices: optional boolean`

  When set to `true`, all devices associated with the user will be revoked.

### Body Parameters

- `email: string`

  The email of the user to revoke.

- `devices: optional boolean`

  When set to `true`, all devices associated with the user will be revoked.

- `user_uid: optional string`

  The uuid of the user to revoke.

- `warp_session_reauth: optional boolean`

  When set to `true`, the user will be required to re-authenticate to WARP for all Gateway policies that enforce a WARP client session duration. When `false`, the user’s WARP session will remain active

### Returns

- `result: optional true or false`

  - `true`

  - `false`

- `success: optional true or false`

  - `true`

  - `false`

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/access/organizations/revoke_user \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "email": "test@example.com",
          "devices": true,
          "user_uid": "699d98642c564d2e855e9661899b7252",
          "warp_session_reauth": true
        }'
```

#### Response

```json
{
  "result": true,
  "success": true
}
```
