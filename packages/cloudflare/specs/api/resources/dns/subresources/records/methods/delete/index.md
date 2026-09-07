## Delete DNS Record

**delete** `/zones/{zone_id}/dns_records/{dns_record_id}`

Permanently removes a DNS record from the zone.

### Path Parameters

- `zone_id: string`

  Identifier.

- `dns_record_id: string`

  Identifier.

### Returns

- `result: optional object { id }`

  - `id: optional string`

    Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records/$DNS_RECORD_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```
