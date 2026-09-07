## Patch Smart Shield Settings

**patch** `/zones/{zone_id}/smart_shield`

Set Smart Shield Settings.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `cache_reserve: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Cache Reserve.

    - `"on"`

    - `"off"`

- `regional_tiered_cache: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Regional Tiered Cache.

    - `"on"`

    - `"off"`

- `smart_routing: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Smart Routing.

    - `"on"`

    - `"off"`

- `smart_tiered_cache: optional object { value }`

  - `value: optional "on" or "off"`

    Specifies the enablement value of Smart Tiered Cache.

    - `"on"`

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

- `result: object { smart_tiered_cache }`

  A consolidated object containing settings from multiple APIs for partial updates.

  - `smart_tiered_cache: object { id, editable, modified_on, value }`

    - `id: optional string`

      The id of the Smart Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `modified_on: optional string`

      The last time the setting was modified.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Tiered Cache.

      - `"on"`

      - `"off"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/smart_shield \
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
    "smart_tiered_cache": {
      "id": "smart_tiered_cache",
      "editable": true,
      "modified_on": "2025-09-10T22:53:22.946098Z",
      "value": "on"
    }
  },
  "success": true
}
```
