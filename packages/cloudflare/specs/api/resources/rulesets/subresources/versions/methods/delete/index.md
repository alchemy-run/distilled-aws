## Delete an account or zone ruleset version

**delete** `/{accounts_or_zones}/{account_or_zone_id}/rulesets/{ruleset_id}/versions/{ruleset_version}`

Deletes an existing version of an account or zone ruleset.

### Path Parameters

- `ruleset_id: string`

  The unique ID of the ruleset.

- `ruleset_version: string`

  The version of the ruleset.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/rulesets/$RULESET_ID/versions/$RULESET_VERSION \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
