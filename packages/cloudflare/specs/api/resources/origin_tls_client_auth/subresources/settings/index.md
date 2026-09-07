# Settings

## Get Enablement Setting for Zone

**get** `/zones/{zone_id}/origin_tls_client_auth/settings`

Get whether zone-level authenticated origin pulls is enabled or not. It is false by default.

### Path Parameters

- `zone_id: string`

  Identifier.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { enabled }`

  - `enabled: optional boolean`

    Indicates whether zone-level authenticated origin pulls is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/settings \
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
    "enabled": true
  }
}
```

## Set Enablement for Zone

**put** `/zones/{zone_id}/origin_tls_client_auth/settings`

Enable or disable zone-level authenticated origin pulls. 'enabled' should be set true either before/after the certificate is uploaded to see the certificate in use.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `enabled: boolean`

  Indicates whether zone-level authenticated origin pulls is enabled.

### Returns

- `errors: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of object { code, message, documentation_url, source }`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional object { enabled }`

  - `enabled: optional boolean`

    Indicates whether zone-level authenticated origin pulls is enabled.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/origin_tls_client_auth/settings \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "enabled": true
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
    "enabled": true
  }
}
```

## Domain Types

### Setting Get Response

- `SettingGetResponse object { enabled }`

  - `enabled: optional boolean`

    Indicates whether zone-level authenticated origin pulls is enabled.

### Setting Update Response

- `SettingUpdateResponse object { enabled }`

  - `enabled: optional boolean`

    Indicates whether zone-level authenticated origin pulls is enabled.
