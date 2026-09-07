## Leave Organization

**delete** `/user/organizations/{organization_id}`

Removes association to an organization.

### Path Parameters

- `organization_id: string`

  Identifier

### Returns

- `id: optional string`

  Identifier

### Example

```http
curl https://api.cloudflare.com/client/v4/user/organizations/$ORGANIZATION_ID \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

#### Response

```json
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```
