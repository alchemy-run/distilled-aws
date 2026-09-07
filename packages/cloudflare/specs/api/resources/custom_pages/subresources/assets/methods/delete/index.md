## Delete a custom asset

**delete** `/{accounts_or_zones}/{account_or_zone_id}/custom_pages/assets/{asset_name}`

Deletes an existing custom asset.

### Path Parameters

- `asset_name: string`

  The unique name of the custom asset. Can only contain letters (A-Z, a-z), numbers (0-9), and underscores (_).

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_pages/assets/$ASSET_NAME \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```
