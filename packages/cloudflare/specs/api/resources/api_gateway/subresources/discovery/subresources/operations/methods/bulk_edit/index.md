## Patch discovered operations

**patch** `/zones/{zone_id}/api_gateway/discovery/operations`

Update the `state` on one or more discovered operations

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: map[object { state } ]`

  - `state: optional "review" or "ignored"`

    Mark state of operation in API Discovery

    * `review` - Mark operation as for review
    * `ignored` - Mark operation as ignored

    - `"review"`

    - `"ignored"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: map[object { state } ]`

  - `state: optional "review" or "ignored"`

    Mark state of operation in API Discovery

    * `review` - Mark operation as for review
    * `ignored` - Mark operation as ignored

    - `"review"`

    - `"ignored"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/api_gateway/discovery/operations \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "3818d821-5901-4147-a474-f5f5aec1d54e": {
            "state": "ignored"
          },
          "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
            "state": "review"
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
    "3818d821-5901-4147-a474-f5f5aec1d54e": {
      "state": "ignored"
    },
    "b17c8043-99a0-4202-b7d9-8f7cdbee02cd": {
      "state": "review"
    }
  },
  "success": true
}
```
