## Update user label

**put** `/zones/{zone_id}/api_gateway/labels/user/{name}`

Update all fields on a label

### Path Parameters

- `zone_id: string`

  Identifier.

- `name: string`

  The name of the label

### Body Parameters

- `description: optional string`

  The description of the label

- `metadata: optional unknown`

  Metadata for the label

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { created_at, description, last_updated, 3 more }`

  - `created_at: string`

  - `description: string`

    The description of the label

  - `last_updated: string`

  - `metadata: unknown`

    Metadata for the label

  - `name: string`

    The name of the label

  - `source: "user" or "managed"`

    * `user` - label is owned by the user
    * `managed` - label is owned by cloudflare

    - `"user"`

    - `"managed"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/labels/user/$NAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "All endpoints that deal with logins",
          "metadata": {
            "foo": "bar"
          }
        }'
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
    "created_at": "2014-01-01T05:20:00.12345Z",
    "description": "All endpoints that deal with logins",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "metadata": {
      "foo": "bar"
    },
    "name": "login",
    "source": "user"
  },
  "success": true
}
```
