## Delete a Page Shield policy

**delete** `/zones/{zone_id}/page_shield/policies/{policy_id}`

Delete a Page Shield policy by ID.

### Path Parameters

- `zone_id: string`

  Identifier

- `policy_id: string`

  Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/page_shield/policies/$POLICY_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```
