## Delete a Zone Lockdown rule

**delete** `/zones/{zone_id}/firewall/lockdowns/{lock_downs_id}`

Deletes an existing Zone Lockdown rule.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `lock_downs_id: string`

  The unique identifier of the Zone Lockdown rule.

### Returns

- `result: optional object { id }`

  - `id: optional string`

    The unique identifier of the Zone Lockdown rule.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/firewall/lockdowns/$LOCK_DOWNS_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "372e67954025e0ba6aaa6d586b9e0b59"
  }
}
```
