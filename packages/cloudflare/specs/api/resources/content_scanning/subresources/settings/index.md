# Settings

## Get Content Scanning Status

**get** `/zones/{zone_id}/content-upload-scan/settings`

Retrieve the current status of Content Scanning.

### Path Parameters

- `zone_id: string`

  Defines an identifier.

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

- `result: object { modified, value }`

  Defines the status for Content Scanning.

  - `modified: optional string`

    Defines the last modification date (ISO 8601) of the Content Scanning status.

  - `value: optional string`

    Defines the status of Content Scanning.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/content-upload-scan/settings \
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
    "modified": "2024-12-02T09:57:23.150259Z",
    "value": "enabled"
  },
  "success": true
}
```

## Domain Types

### Setting Get Response

- `SettingGetResponse object { modified, value }`

  Defines the status for Content Scanning.

  - `modified: optional string`

    Defines the last modification date (ISO 8601) of the Content Scanning status.

  - `value: optional string`

    Defines the status of Content Scanning.
