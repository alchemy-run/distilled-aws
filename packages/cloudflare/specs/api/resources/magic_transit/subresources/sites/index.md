# Sites

## List Sites

**get** `/accounts/{account_id}/magic/sites`

Lists Sites associated with an account. Use connectorid query param to return sites where connectorid matches either site.ConnectorID or site.SecondaryConnectorID.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `connectorid: optional string`

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

- `result: array of Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "connector_id": "ac60d3d0435248289d446cedd870bcf4",
      "description": "description",
      "ha_mode": true,
      "location": {
        "lat": "37.6192",
        "lon": "122.3816"
      },
      "name": "site_1",
      "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
    }
  ],
  "success": true
}
```

## Site Details

**get** `/accounts/{account_id}/magic/sites/{site_id}`

Get a specific Site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Create a new Site

**post** `/accounts/{account_id}/magic/sites`

Creates a new Site

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `name: string`

  The name of the site.

- `connector_id: optional string`

  Magic Connector identifier tag.

- `description: optional string`

- `ha_mode: optional boolean`

  Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

- `location: optional SiteLocation`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

- `secondary_connector_id: optional string`

  Magic Connector identifier tag. Used when high availability mode is on.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "site_1",
          "connector_id": "ac60d3d0435248289d446cedd870bcf4",
          "ha_mode": true,
          "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Update Site

**put** `/accounts/{account_id}/magic/sites/{site_id}`

Update a specific Site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `connector_id: optional string`

  Magic Connector identifier tag.

- `description: optional string`

- `location: optional SiteLocation`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

- `name: optional string`

  The name of the site.

- `secondary_connector_id: optional string`

  Magic Connector identifier tag. Used when high availability mode is on.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "connector_id": "ac60d3d0435248289d446cedd870bcf4",
          "name": "site_1",
          "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Patch Site

**patch** `/accounts/{account_id}/magic/sites/{site_id}`

Patch a specific Site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `connector_id: optional string`

  Magic Connector identifier tag.

- `description: optional string`

- `location: optional SiteLocation`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

- `name: optional string`

  The name of the site.

- `secondary_connector_id: optional string`

  Magic Connector identifier tag. Used when high availability mode is on.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "connector_id": "ac60d3d0435248289d446cedd870bcf4",
          "name": "site_1",
          "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Delete Site

**delete** `/accounts/{account_id}/magic/sites/{site_id}`

Remove a specific Site.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Domain Types

### Site

- `Site object { id, connector_id, description, 4 more }`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

### Site Location

- `SiteLocation object { lat, lon }`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

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

# ACLs

## List Site ACLs

**get** `/accounts/{account_id}/magic/sites/{site_id}/acls`

Lists Site ACLs associated with an account.

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

- `result: array of ACL`

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "description": "Allows local traffic between PIN pads and cash register.",
      "forward_locally": true,
      "lan_1": {
        "lan_id": "lan_id",
        "lan_name": "lan_name",
        "port_ranges": [
          "8080-9000"
        ],
        "ports": [
          1
        ],
        "subnets": [
          "192.0.2.1"
        ]
      },
      "lan_2": {
        "lan_id": "lan_id",
        "lan_name": "lan_name",
        "port_ranges": [
          "8080-9000"
        ],
        "ports": [
          1
        ],
        "subnets": [
          "192.0.2.1"
        ]
      },
      "name": "PIN Pad - Cash Register",
      "protocols": [
        "tcp"
      ],
      "unidirectional": true
    }
  ],
  "success": true
}
```

## Site ACL Details

**get** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Get a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Create a new Site ACL

**post** `/accounts/{account_id}/magic/sites/{site_id}/acls`

Creates a new Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `lan_1: ACLConfiguration`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

- `lan_2: ACLConfiguration`

- `name: string`

  The name of the ACL.

- `description: optional string`

  Description for the ACL.

- `forward_locally: optional boolean`

  The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

- `protocols: optional array of AllowedProtocol`

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

- `unidirectional: optional boolean`

  The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "lan_1": {
            "lan_id": "lan_id"
          },
          "lan_2": {
            "lan_id": "lan_id"
          },
          "name": "PIN Pad - Cash Register",
          "description": "Allows local traffic between PIN pads and cash register."
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Update Site ACL

**put** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Update a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  Description for the ACL.

- `forward_locally: optional boolean`

  The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

- `lan_1: optional ACLConfiguration`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

- `lan_2: optional ACLConfiguration`

- `name: optional string`

  The name of the ACL.

- `protocols: optional array of AllowedProtocol`

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

- `unidirectional: optional boolean`

  The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Allows local traffic between PIN pads and cash register.",
          "name": "PIN Pad - Cash Register"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Patch Site ACL

**patch** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Patch a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  Description for the ACL.

- `forward_locally: optional boolean`

  The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

- `lan_1: optional ACLConfiguration`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

- `lan_2: optional ACLConfiguration`

- `name: optional string`

  The name of the ACL.

- `protocols: optional array of AllowedProtocol`

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

- `unidirectional: optional boolean`

  The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Allows local traffic between PIN pads and cash register.",
          "name": "PIN Pad - Cash Register"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Delete Site ACL

**delete** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Remove a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Domain Types

### ACL

- `ACL object { id, description, forward_locally, 5 more }`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

### ACL Configuration

- `ACLConfiguration object { lan_id, lan_name, port_ranges, 2 more }`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

### Allowed Protocol

- `AllowedProtocol = "tcp" or "udp" or "icmp"`

  Array of allowed communication protocols between configured LANs. If no protocols are provided, all protocols are allowed.

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

### Subnet

- `Subnet = string`

  A valid IPv4 address.

# LANs

## List Site LANs

**get** `/accounts/{account_id}/magic/sites/{site_id}/lans`

Lists Site LANs associated with an account.

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

- `result: array of LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "bond_id": 2,
      "ha_link": true,
      "is_breakout": true,
      "is_prioritized": true,
      "name": "name",
      "nat": {
        "static_prefix": "192.0.2.0/24"
      },
      "physport": 1,
      "routed_subnets": [
        {
          "next_hop": "192.0.2.1",
          "prefix": "192.0.2.0/24",
          "nat": {
            "static_prefix": "192.0.2.0/24"
          }
        }
      ],
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "dhcp_relay": {
          "server_addresses": [
            "192.0.2.1"
          ]
        },
        "dhcp_server": {
          "dhcp_options": [
            {
              "code": 66,
              "type": "ip",
              "value": "10.20.30.40"
            }
          ],
          "dhcp_pool_end": "192.0.2.1",
          "dhcp_pool_start": "192.0.2.1",
          "dns_server": "192.0.2.1",
          "dns_servers": [
            "192.0.2.1"
          ],
          "reservations": {
            "00:11:22:33:44:55": "192.0.2.100",
            "AA:BB:CC:DD:EE:FF": "192.168.1.101"
          }
        },
        "secondary_address": "192.0.2.0/24",
        "virtual_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Site LAN Details

**get** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Get a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Create a new Site LAN

**post** `/accounts/{account_id}/magic/sites/{site_id}/lans`

Creates a new Site LAN. If the site is in high availability mode, static_addressing is required along with secondary and virtual address.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `bond_id: optional number`

- `ha_link: optional boolean`

  mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

- `is_breakout: optional boolean`

  mark true to use this LAN for source-based breakout traffic

- `is_prioritized: optional boolean`

  mark true to use this LAN for source-based prioritized traffic

- `name: optional string`

- `nat: optional Nat`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

- `physport: optional number`

- `routed_subnets: optional array of RoutedSubnet`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

- `static_addressing: optional LANStaticAddressing`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: array of LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "bond_id": 2,
      "ha_link": true,
      "is_breakout": true,
      "is_prioritized": true,
      "name": "name",
      "nat": {
        "static_prefix": "192.0.2.0/24"
      },
      "physport": 1,
      "routed_subnets": [
        {
          "next_hop": "192.0.2.1",
          "prefix": "192.0.2.0/24",
          "nat": {
            "static_prefix": "192.0.2.0/24"
          }
        }
      ],
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "dhcp_relay": {
          "server_addresses": [
            "192.0.2.1"
          ]
        },
        "dhcp_server": {
          "dhcp_options": [
            {
              "code": 66,
              "type": "ip",
              "value": "10.20.30.40"
            }
          ],
          "dhcp_pool_end": "192.0.2.1",
          "dhcp_pool_start": "192.0.2.1",
          "dns_server": "192.0.2.1",
          "dns_servers": [
            "192.0.2.1"
          ],
          "reservations": {
            "00:11:22:33:44:55": "192.0.2.100",
            "AA:BB:CC:DD:EE:FF": "192.168.1.101"
          }
        },
        "secondary_address": "192.0.2.0/24",
        "virtual_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Update Site LAN

**put** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Update a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

  Identifier

### Body Parameters

- `bond_id: optional number`

- `is_breakout: optional boolean`

  mark true to use this LAN for source-based breakout traffic

- `is_prioritized: optional boolean`

  mark true to use this LAN for source-based prioritized traffic

- `name: optional string`

- `nat: optional Nat`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

- `physport: optional number`

- `routed_subnets: optional array of RoutedSubnet`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

- `static_addressing: optional LANStaticAddressing`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Patch Site LAN

**patch** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Patch a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

  Identifier

### Body Parameters

- `bond_id: optional number`

- `is_breakout: optional boolean`

  mark true to use this LAN for source-based breakout traffic

- `is_prioritized: optional boolean`

  mark true to use this LAN for source-based prioritized traffic

- `name: optional string`

- `nat: optional Nat`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

- `physport: optional number`

- `routed_subnets: optional array of RoutedSubnet`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

- `static_addressing: optional LANStaticAddressing`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Delete Site LAN

**delete** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Remove a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Domain Types

### DHCP Relay

- `DHCPRelay object { server_addresses }`

  - `server_addresses: optional array of string`

    List of DHCP server IPs.

### DHCP Server

- `DHCPServer object { dhcp_options, dhcp_pool_end, dhcp_pool_start, 3 more }`

  - `dhcp_options: optional array of object { code, type, value }`

    Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

    - `code: number`

      DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

    - `type: "text" or "hex" or "ip" or 3 more`

      The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

      - `"text"`

      - `"hex"`

      - `"ip"`

      - `"byte"`

      - `"short"`

      - `"integer"`

    - `value: string`

      The option value, interpreted according to the type field.

  - `dhcp_pool_end: optional string`

    A valid IPv4 address.

  - `dhcp_pool_start: optional string`

    A valid IPv4 address.

  - `dns_server: optional string`

    A valid IPv4 address.

  - `dns_servers: optional array of string`

  - `reservations: optional map[string]`

    Mapping of MAC addresses to IP addresses

### LAN

- `LAN object { id, bond_id, ha_link, 9 more }`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

### LAN Static Addressing

- `LANStaticAddressing object { address, dhcp_relay, dhcp_server, 2 more }`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

### Nat

- `Nat object { static_prefix }`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

### Routed Subnet

- `RoutedSubnet object { next_hop, prefix, nat }`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

# WANs

## List Site WANs

**get** `/accounts/{account_id}/magic/sites/{site_id}/wans`

Lists Site WANs associated with an account.

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

- `result: array of WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "health_check_rate": "low",
      "name": "name",
      "physport": 1,
      "priority": 0,
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "gateway_address": "192.0.2.1",
        "secondary_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Site WAN Details

**get** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Get a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Create a new Site WAN

**post** `/accounts/{account_id}/magic/sites/{site_id}/wans`

Creates a new Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `physport: number`

- `name: optional string`

- `priority: optional number`

- `static_addressing: optional WANStaticAddressing`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: array of WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "physport": 1,
          "vlan_tag": 42
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "health_check_rate": "low",
      "name": "name",
      "physport": 1,
      "priority": 0,
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "gateway_address": "192.0.2.1",
        "secondary_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Update Site WAN

**put** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Update a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

  Identifier

### Body Parameters

- `name: optional string`

- `physport: optional number`

- `priority: optional number`

- `static_addressing: optional WANStaticAddressing`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "physport": 1,
          "vlan_tag": 42
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Patch Site WAN

**patch** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Patch a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

  Identifier

### Body Parameters

- `name: optional string`

- `physport: optional number`

- `priority: optional number`

- `static_addressing: optional WANStaticAddressing`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "physport": 1,
          "vlan_tag": 42
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Delete Site WAN

**delete** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Remove a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Domain Types

### WAN

- `WAN object { id, health_check_rate, name, 5 more }`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

### WAN Static Addressing

- `WANStaticAddressing object { address, gateway_address, secondary_address }`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.
