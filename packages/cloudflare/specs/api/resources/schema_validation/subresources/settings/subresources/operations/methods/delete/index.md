## Delete per-operation schema validation setting

**delete** `/zones/{zone_id}/schema_validation/settings/operations/{operation_id}`

Removes custom schema validation settings for a specific API operation, reverting to zone-level defaults.

### Path Parameters

- `zone_id: string`

  Identifier.

- `operation_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { operation_id }`

  - `operation_id: optional string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/schema_validation/settings/operations/$OPERATION_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "messages": [
    {
      "code": 1000,
      "message": "message",
      "documentation_url": "documentation_url",
      "source": {
        "pointer": "pointer"
      }
    }
  ],
  "result": {
    "operation_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```
