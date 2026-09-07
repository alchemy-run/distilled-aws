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
