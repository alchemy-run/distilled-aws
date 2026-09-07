# Argo

# Smart Routing

## Get Argo Smart Routing setting

**get** `/zones/{zone_id}/argo/smart_routing`

Retrieves the value of Argo Smart Routing enablement setting.

### Path Parameters

- `zone_id: string`

  Specifies the zone associated with the API call.

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

- `result: object { id, editable, value, modified_on }`

  - `id: string`

    Specifies the identifier of the Argo Smart Routing setting.

  - `editable: boolean`

    Specifies if the setting is editable.

  - `value: "on" or "off"`

    Specifies the enablement value of Argo Smart Routing.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Specifies the time when the setting was last modified.

- `success: true`

  Describes a successful API response.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/argo/smart_routing \
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
    "id": "id",
    "editable": true,
    "value": "on",
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Patch Argo Smart Routing setting

**patch** `/zones/{zone_id}/argo/smart_routing`

Configures the value of the Argo Smart Routing enablement setting.

### Path Parameters

- `zone_id: string`

  Specifies the zone associated with the API call.

### Body Parameters

- `value: "on" or "off"`

  Specifies the enablement value of Argo Smart Routing.

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

- `result: object { id, editable, value, modified_on }`

  - `id: string`

    Specifies the identifier of the Argo Smart Routing setting.

  - `editable: boolean`

    Specifies if the setting is editable.

  - `value: "on" or "off"`

    Specifies the enablement value of Argo Smart Routing.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Specifies the time when the setting was last modified.

- `success: true`

  Describes a successful API response.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/argo/smart_routing \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "on"
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
    "id": "id",
    "editable": true,
    "value": "on",
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Domain Types

### Smart Routing Get Response

- `SmartRoutingGetResponse object { id, editable, value, modified_on }`

  - `id: string`

    Specifies the identifier of the Argo Smart Routing setting.

  - `editable: boolean`

    Specifies if the setting is editable.

  - `value: "on" or "off"`

    Specifies the enablement value of Argo Smart Routing.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Specifies the time when the setting was last modified.

### Smart Routing Edit Response

- `SmartRoutingEditResponse object { id, editable, value, modified_on }`

  - `id: string`

    Specifies the identifier of the Argo Smart Routing setting.

  - `editable: boolean`

    Specifies if the setting is editable.

  - `value: "on" or "off"`

    Specifies the enablement value of Argo Smart Routing.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Specifies the time when the setting was last modified.

# Tiered Caching

## Get Tiered Caching setting

**get** `/zones/{zone_id}/argo/tiered_caching`

Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate. Additionally, Tiered Cache concentrates connections to origin servers so they come from a small number of data centers rather than the full set of network locations. This results in fewer open connections using server resources.

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

- `result: optional object { id, editable, value, modified_on }`

  - `id: "tiered_caching"`

    The identifier of the caching setting.

    - `"tiered_caching"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/argo/tiered_caching \
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
    "id": "tiered_caching",
    "editable": true,
    "value": "on",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Patch Tiered Caching setting

**patch** `/zones/{zone_id}/argo/tiered_caching`

Tiered Cache works by dividing Cloudflare's data centers into a hierarchy of lower-tiers and upper-tiers. If content is not cached in lower-tier data centers (generally the ones closest to a visitor), the lower-tier must ask an upper-tier to see if it has the content. If the upper-tier does not have the content, only the upper-tier can ask the origin for content. This practice improves bandwidth efficiency by limiting the number of data centers that can ask the origin for content, which reduces origin load and makes websites more cost-effective to operate. Additionally, Tiered Cache concentrates connections to origin servers so they come from a small number of data centers rather than the full set of network locations. This results in fewer open connections using server resources.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `value: "on" or "off"`

  Enables Tiered Caching.

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

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { id, editable, value, modified_on }`

  - `id: "tiered_caching"`

    The identifier of the caching setting.

    - `"tiered_caching"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/argo/tiered_caching \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": "on"
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
    "id": "tiered_caching",
    "editable": true,
    "value": "on",
    "modified_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Tiered Caching Get Response

- `TieredCachingGetResponse object { id, editable, value, modified_on }`

  - `id: "tiered_caching"`

    The identifier of the caching setting.

    - `"tiered_caching"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.

### Tiered Caching Edit Response

- `TieredCachingEditResponse object { id, editable, value, modified_on }`

  - `id: "tiered_caching"`

    The identifier of the caching setting.

    - `"tiered_caching"`

  - `editable: boolean`

    Whether the setting is editable.

  - `value: "on" or "off"`

    Value of the Tiered Cache zone setting.

    - `"on"`

    - `"off"`

  - `modified_on: optional string`

    Last time this setting was modified.
