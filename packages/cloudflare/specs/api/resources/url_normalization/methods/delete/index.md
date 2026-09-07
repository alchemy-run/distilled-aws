## Delete URL Normalization settings

**delete** `/zones/{zone_id}/url_normalization`

Deletes the URL Normalization settings.

### Path Parameters

- `zone_id: string`

  The unique ID of the zone.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/url_normalization \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
