## Delete Origin TLS Compliance Modes setting

**delete** `/zones/{zone_id}/settings/origin_tls_compliance_modes`

Delete the Origin TLS Compliance Modes setting for the zone, removing any configured compliance constraint. After deletion, Cloudflare's default behavior applies (no compliance filtering of the key-exchange algorithm list sent to the origin).

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, modified_on }`

  - `id: "origin_tls_compliance_modes"`

    The identifier of the caching setting.

    - `"origin_tls_compliance_modes"`

  - `editable: boolean`

    Whether the setting is editable.

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/settings/origin_tls_compliance_modes \
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
  "success": true,
  "result": {
    "id": "origin_tls_compliance_modes",
    "editable": true,
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```
