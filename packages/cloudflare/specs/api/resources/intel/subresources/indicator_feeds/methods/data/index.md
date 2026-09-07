## Get indicator feed data

**get** `/accounts/{account_id}/intel/indicator-feeds/{feed_id}/data`

Retrieves the raw data entries in a custom threat indicator feed.

### Path Parameters

- `account_id: string`

  Identifier

- `feed_id: number`

  Indicator feed ID

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/indicator-feeds/$FEED_ID/data \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```
