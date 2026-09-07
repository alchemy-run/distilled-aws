## Export DNS Records

**get** `/zones/{zone_id}/dns_records/export`

You can export your [BIND config](https://en.wikipedia.org/wiki/Zone_file "Zone file") through this endpoint.

See [the documentation](https://developers.cloudflare.com/dns/manage-dns-records/how-to/import-and-export/ "Import and export records") for more information.

### Path Parameters

- `zone_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/export \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
