## Delete Single Certificate And Key For Custom Hostname

**delete** `/zones/{zone_id}/custom_hostnames/{custom_hostname_id}/certificate_pack/{certificate_pack_id}/certificates/{certificate_id}`

Delete a single custom certificate from a certificate pack that contains two bundled certificates. Deletion is subject to the following constraints. You cannot delete a certificate if it is the only remaining certificate in the pack. At least one certificate must remain in the pack.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_hostname_id: string`

  Identifier.

- `certificate_pack_id: string`

  Identifier.

- `certificate_id: string`

  Identifier.

### Returns

- `id: optional string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/custom_hostnames/$CUSTOM_HOSTNAME_ID/certificate_pack/$CERTIFICATE_PACK_ID/certificates/$CERTIFICATE_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "id": "023e105f4ecef8ad9ca31a8372d0c353"
}
```
