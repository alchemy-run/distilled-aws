## Update Leaked Credential Checks Custom Detection

**put** `/zones/{zone_id}/leaked-credential-checks/detections/{detection_id}`

Update user-defined detection pattern for Leaked Credential Checks.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

- `detection_id: string`

  Defines the unique ID for this custom detection.

### Body Parameters

- `password: optional string`

  Defines ehe ruleset expression to use in matching the password in a request.

- `username: optional string`

  Defines the ruleset expression to use in matching the username in a request.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: object { id, password, username }`

  Defines a custom set of username/password expressions to match Leaked Credential Checks on.

  - `id: optional string`

    Defines the unique ID for this custom detection.

  - `password: optional string`

    Defines ehe ruleset expression to use in matching the password in a request.

  - `username: optional string`

    Defines the ruleset expression to use in matching the username in a request.

- `success: true`

  Defines whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/leaked-credential-checks/detections/$DETECTION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "password": "lookup_json_string(http.request.body.raw, \\"secret\\")",
          "username": "lookup_json_string(http.request.body.raw, \\"user\\")"
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
    "id": "18a14bafaa8eb1df04ce683ec18c765e",
    "password": "lookup_json_string(http.request.body.raw, \"secret\")",
    "username": "lookup_json_string(http.request.body.raw, \"user\")"
  },
  "success": true
}
```
