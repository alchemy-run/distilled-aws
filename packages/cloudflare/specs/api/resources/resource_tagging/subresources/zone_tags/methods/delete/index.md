## Delete tags from a zone-level resource

**delete** `/zones/{zone_id}/tags`

Removes all tags from a specific zone-level resource.

### Path Parameters

- `zone_id: string`

  Zone ID is required only for zone-level resources

### Header Parameters

- `"If-Match": optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/tags \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
```
