## Delete a WAF override

**delete** `/zones/{zone_id}/firewall/waf/overrides/{overrides_id}`

Deletes an existing URI-based WAF override.

**Note:** Applies only to the [previous version of WAF managed rules](https://developers.cloudflare.com/support/firewall/managed-rules-web-application-firewall-waf/understanding-waf-managed-rules-web-application-firewall/).

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `overrides_id: string`

  The unique identifier of the WAF override.

### Returns

- `result: optional object { id }`

  - `id: optional string`

    The unique identifier of the WAF override.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/waf/overrides/$OVERRIDES_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "de677e5818985db1285d0e80225f06e5"
  }
}
```
