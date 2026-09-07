## Delete waiting room

**delete** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}`

Deletes a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

### Returns

- `result: object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "699d98642c564d2e855e9661899b7252"
  }
}
```
