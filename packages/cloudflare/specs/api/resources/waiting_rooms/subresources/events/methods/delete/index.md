## Delete event

**delete** `/zones/{zone_id}/waiting_rooms/{waiting_room_id}/events/{event_id}`

Deletes an event for a waiting room.

### Path Parameters

- `zone_id: string`

  Identifier.

- `waiting_room_id: string`

- `event_id: string`

### Returns

- `result: object { id }`

  - `id: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/waiting_rooms/$WAITING_ROOM_ID/events/$EVENT_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "id": "25756b2dfe6e378a06b033b670413757"
  }
}
```
