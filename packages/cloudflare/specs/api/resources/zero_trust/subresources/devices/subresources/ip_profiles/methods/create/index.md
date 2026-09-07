## Create IP profile

**post** `/accounts/{account_id}/devices/ip-profiles`

Creates a WARP Device IP profile. Currently, only IPv4 Device subnets can be associated.

### Path Parameters

- `account_id: string`

### Body Parameters

- `match: string`

  The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

- `name: string`

  A user-friendly name for the Device IP profile.

- `precedence: number`

  The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

- `subnet_id: string`

  The ID of the Subnet.

- `description: optional string`

  An optional description of the Device IP profile.

- `enabled: optional boolean`

  Whether the Device IP profile will be applied to matching devices.

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: IPProfile`

  - `id: string`

    The ID of the Device IP profile.

  - `created_at: string`

    The RFC3339Nano timestamp when the Device IP profile was created.

  - `description: string`

    An optional description of the Device IP profile.

  - `enabled: boolean`

    Whether the Device IP profile is enabled.

  - `match: string`

    The wirefilter expression to match registrations. Available values: "identity.name", "identity.email", "identity.groups.id", "identity.groups.name", "identity.groups.email", "identity.saml_attributes".

  - `name: string`

    A user-friendly name for the Device IP profile.

  - `precedence: number`

    The precedence of the Device IP profile. Lower values indicate higher precedence. Device IP profile will be evaluated in ascending order of this field.

  - `subnet_id: string`

    The ID of the Subnet.

  - `updated_at: string`

    The RFC3339Nano timestamp when the Device IP profile was last updated.

- `success: boolean`

  Whether the API call was successful.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/ip-profiles \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "match": "identity.email == \\"test@cloudflare.com\\"",
          "name": "IPv4 Cloudflare Source IPs",
          "precedence": 100,
          "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
          "description": "example comment",
          "enabled": true
        }'
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "result": {
    "id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "created_at": "2025-02-14T13:17:00.123456789Z",
    "description": "example comment",
    "enabled": true,
    "match": "identity.email == \"test@cloudflare.com\"",
    "name": "IPv4 Cloudflare Source IPs",
    "precedence": 100,
    "subnet_id": "b70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "updated_at": "2025-02-14T13:17:00.123456789Z"
  },
  "success": true
}
```
