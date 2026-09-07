## Patch Automatic SSL/TLS Enrollment status for given zone

**patch** `/zones/{zone_id}/settings/ssl_automatic_mode`

The automatic system is enabled when this endpoint is hit with value in the request body is set to "auto", and disabled when the request body value is set to "custom".

### Path Parameters

- `zone_id: string`

### Body Parameters

- `value: "auto" or "custom"`

  Controls enablement of Automatic SSL/TLS.

  - `"auto"`

  - `"custom"`

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

- `result: object { id, editable, modified_on, 2 more }`

  - `id: string`

  - `editable: boolean`

    Whether this setting can be updated or not.

  - `modified_on: string`

    Last time this setting was modified.

  - `value: "auto" or "custom"`

    Current setting of the automatic SSL/TLS.

    - `"auto"`

    - `"custom"`

  - `next_scheduled_scan: optional string`

    Next time this zone will be scanned by the Automatic SSL/TLS.

- `success: boolean`

  Indicates the API call's success or failure.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/ssl_automatic_mode \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "auto"
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "editable": true,
    "id": "ssl_automatic_mode",
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "next_scheduled_scan": "2014-02-01T05:20:00.12345Z",
    "value": "auto"
  },
  "success": true
}
```
