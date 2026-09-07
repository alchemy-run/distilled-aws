# App Configuration

## List App Configs

**get** `/accounts/{account_id}/magic/sites/{site_id}/app_configs`

Lists App Configs associated with a site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

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

- `result: array of object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs \
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
  "result": [
    {
      "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "breakout": true,
      "preferred_wans": [
        "023e105f4ecef8ad9ca31a8372d0c353"
      ],
      "priority": 0,
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
    }
  ],
  "success": true
}
```

## Create a new App Config

**post** `/accounts/{account_id}/magic/sites/{site_id}/app_configs`

Creates a new App Config for a site

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `body: object { account_app_id, breakout, preferred_wans, priority }  or object { managed_app_id, breakout, preferred_wans, priority }`

  - `AccountApp object { account_app_id, breakout, preferred_wans, priority }`

    - `account_app_id: string`

      Magic account app ID.

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

  - `ManagedApp object { managed_app_id, breakout, preferred_wans, priority }`

    - `managed_app_id: string`

      Managed app ID.

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
          "breakout": true
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Update an App Config

**put** `/accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}`

Updates an App Config for a site

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `app_config_id: string`

  Identifier

### Body Parameters

- `account_app_id: optional string`

  Magic account app ID.

- `breakout: optional boolean`

  Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

- `managed_app_id: optional string`

  Managed app ID.

- `preferred_wans: optional array of string`

  WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

- `priority: optional number`

  Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs/$APP_CONFIG_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
          "breakout": true,
          "managed_app_id": "cloudflare"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Update an App Config

**patch** `/accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}`

Updates an App Config for a site

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `app_config_id: string`

  Identifier

### Body Parameters

- `account_app_id: optional string`

  Magic account app ID.

- `breakout: optional boolean`

  Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

- `managed_app_id: optional string`

  Managed app ID.

- `preferred_wans: optional array of string`

  WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

- `priority: optional number`

  Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs/$APP_CONFIG_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
          "breakout": true,
          "managed_app_id": "cloudflare"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Delete App Config

**delete** `/accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}`

Deletes specific App Config associated with a site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `app_config_id: string`

  Identifier

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs/$APP_CONFIG_ID \
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
  "result": {
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Domain Types

### App Configuration List Response

- `AppConfigurationListResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Create Response

- `AppConfigurationCreateResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Update Response

- `AppConfigurationUpdateResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Edit Response

- `AppConfigurationEditResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Delete Response

- `AppConfigurationDeleteResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier
