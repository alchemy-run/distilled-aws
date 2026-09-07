## Get Smart Shield Settings

**get** `/zones/{zone_id}/smart_shield`

Retrieve Smart Shield Settings.

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

- `result: object { cache_reserve, healthchecks_count, regional_tiered_cache, 2 more }`

  A consolidated object containing settings from multiple APIs for partial updates.

  - `cache_reserve: object { id, editable, value }`

    - `id: optional string`

      The id of the Cache Reserve setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Cache Reserve.

      - `"on"`

      - `"off"`

  - `healthchecks_count: number`

    The total number of health checks associated with the zone.

  - `regional_tiered_cache: object { id, editable, value }`

    - `id: optional string`

      The id of the Regional Tiered Cache setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Cache Reserve.

      - `"on"`

      - `"off"`

  - `smart_routing: object { id, editable, value }`

    - `id: optional string`

      The id of the Smart Routing setting.

    - `editable: optional boolean`

      Whether the setting is editable.

    - `value: optional "on" or "off"`

      Specifies the enablement value of Argo Smart Routing.

      - `"on"`

      - `"off"`

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
  "result": {
    "cache_reserve": {
      "id": "cache_reserve",
      "editable": true,
      "value": "off"
    },
    "healthchecks_count": 5,
    "regional_tiered_cache": {
      "id": "regional_tiered_cache",
      "editable": true,
      "value": "off"
    },
    "smart_routing": {
      "id": "smart_routing",
      "editable": true,
      "value": "off"
    },
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
