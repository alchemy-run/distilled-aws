## Update Managed Transforms

**patch** `/zones/{zone_id}/managed_headers`

Updates the status of one or more Managed Transforms.

### Path Parameters

- `zone_id: string`

  The unique ID of the zone.

### Body Parameters

- `managed_request_headers: optional array of object { id, enabled, has_conflict, conflicts_with }`

  The list of Managed Request Transforms.

  - `id: string`

    The human-readable identifier of the Managed Transform.

  - `enabled: boolean`

    Whether the Managed Transform is enabled.

  - `has_conflict: boolean`

    Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

  - `conflicts_with: optional array of string`

    The Managed Transforms that this Managed Transform conflicts with.

- `managed_response_headers: optional array of object { id, enabled, has_conflict, conflicts_with }`

  The list of Managed Response Transforms.

  - `id: string`

    The human-readable identifier of the Managed Transform.

  - `enabled: boolean`

    Whether the Managed Transform is enabled.

  - `has_conflict: boolean`

    Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

  - `conflicts_with: optional array of string`

    The Managed Transforms that this Managed Transform conflicts with.

### Returns

- `errors: array of object { message, code, source }`

  A list of error messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `messages: array of object { message, code, source }`

  A list of warning messages.

  - `message: string`

    A text description of this message.

  - `code: optional number`

    A unique code for this message.

  - `source: optional object { pointer }`

    The source of this message.

    - `pointer: string`

      A JSON pointer to the field that is the source of the message.

- `result: object { managed_request_headers, managed_response_headers }`

  A result.

  - `managed_request_headers: array of object { id, enabled, has_conflict, conflicts_with }`

    The list of Managed Request Transforms.

    - `id: string`

      The human-readable identifier of the Managed Transform.

    - `enabled: boolean`

      Whether the Managed Transform is enabled.

    - `has_conflict: boolean`

      Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

    - `conflicts_with: optional array of string`

      The Managed Transforms that this Managed Transform conflicts with.

  - `managed_response_headers: array of object { id, enabled, has_conflict, conflicts_with }`

    The list of Managed Response Transforms.

    - `id: string`

      The human-readable identifier of the Managed Transform.

    - `enabled: boolean`

      Whether the Managed Transform is enabled.

    - `has_conflict: boolean`

      Whether the Managed Transform conflicts with the currently-enabled Managed Transforms.

    - `conflicts_with: optional array of string`

      The Managed Transforms that this Managed Transform conflicts with.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/managed_headers \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
```

#### Response

```json
{
  "errors": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "messages": [
    {
      "message": "something bad happened",
      "code": 10000,
      "source": {
        "pointer": "/rules/0/action"
      }
    }
  ],
  "result": {
    "managed_request_headers": [
      {
        "id": "add_bot_protection_headers",
        "enabled": true,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
      }
    ],
    "managed_response_headers": [
      {
        "id": "add_security_headers",
        "enabled": true,
        "has_conflict": false,
        "conflicts_with": [
          "add_true_client_ip_headers"
        ]
      }
    ]
  },
  "success": true
}
```
