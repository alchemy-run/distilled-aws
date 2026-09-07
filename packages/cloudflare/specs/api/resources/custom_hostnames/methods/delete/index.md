## Delete Custom Hostname (and any issued SSL certificates)

**delete** `/zones/{zone_id}/custom_hostnames/{custom_hostname_id}`

Permanently deletes a custom hostname and revokes any SSL certificates that were issued for it. This action cannot be undone.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_hostname_id: string`

  Identifier.

### Returns

- `id: optional string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```
