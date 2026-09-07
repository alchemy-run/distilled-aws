## Delete organization member

**delete** `/organizations/{organization_id}/members/{member_id}`

Delete a membership to a particular Organization. (Currently in Public Beta - see https://developers.cloudflare.com/fundamentals/organizations/)

### Path Parameters

- `organization_id: string`

- `member_id: string`

  Organization Member ID

### Example

```http
curl https://api.cloudflare.com/client/v4/organizations/$ORGANIZATION_ID/members/$MEMBER_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```
