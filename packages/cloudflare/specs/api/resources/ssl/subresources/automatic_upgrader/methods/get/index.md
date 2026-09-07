## Get Automatic SSL/TLS enrollment status for the given zone

**get** `/zones/{zone_id}/settings/ssl_automatic_mode`

If the system is enabled, the response will include next_scheduled_scan, representing the next time this zone will be scanned and the zone's ssl/tls encryption mode is potentially upgraded by the system. If the system is disabled, next_scheduled_scan will not be present in the response body.

### Path Parameters

- `zone_id: string`

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
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
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
