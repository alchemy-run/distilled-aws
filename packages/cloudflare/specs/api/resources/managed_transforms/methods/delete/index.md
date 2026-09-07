## Delete Managed Transforms

**delete** `/zones/{zone_id}/managed_headers`

Disables all Managed Transforms.

### Path Parameters

- `zone_id: string`

  The unique ID of the zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/managed_headers \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
