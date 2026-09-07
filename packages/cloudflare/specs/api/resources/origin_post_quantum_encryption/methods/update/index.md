## Change Origin Post-Quantum Encryption setting

**put** `/zones/{zone_id}/cache/origin_post_quantum_encryption`

Instructs Cloudflare to use Post-Quantum (PQ) key agreement algorithms when connecting to your origin. Preferred instructs Cloudflare to opportunistically send a Post-Quantum keyshare in the first message to the origin (for fastest connections when the origin supports and prefers PQ), supported means that PQ algorithms are advertised but only used when requested by the origin, and off means that PQ algorithms are not advertised.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: "preferred" or "supported" or "off"`

  Value of the Origin Post Quantum Encryption Setting.

  - `"preferred"`

  - `"supported"`

  - `"off"`

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

- `result: optional object { id, editable, value, modified_on }`

  - `id: "origin_pqe"`

    The identifier of the caching setting.

    - `"origin_pqe"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "preferred" or "supported" or "off"`

    Value of the Origin Post Quantum Encryption Setting.

    - `"preferred"`

    - `"supported"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/cache/origin_post_quantum_encryption \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "preferred"
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
  "success": true,
  "result": {
    "id": "origin_pqe",
    "editable": true,
    "value": "preferred",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```
