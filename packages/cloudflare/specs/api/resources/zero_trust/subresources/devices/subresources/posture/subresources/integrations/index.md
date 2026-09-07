# Integrations

## List your device posture integrations

**get** `/accounts/{account_id}/devices/posture/integration`

Fetches the list of device posture integrations for an account.

### Path Parameters

- `account_id: string`

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

- `result: array of Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "config": {
        "api_url": "https://as123.awmdm.com/API",
        "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
        "client_id": "example client id"
      },
      "interval": "10m",
      "name": "My Workspace One Integration",
      "type": "workspace_one"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get device posture integration details

**get** `/accounts/{account_id}/devices/posture/integration/{integration_id}`

Fetches details for a single device posture integration.

### Path Parameters

- `account_id: string`

- `integration_id: string`

  API UUID.

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

- `result: Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration/$INTEGRATION_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
  },
  "success": true
}
```

## Create a device posture integration

**post** `/accounts/{account_id}/devices/posture/integration`

Create a new device posture integration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `config: object { api_url, auth_url, client_id, client_secret }  or object { api_url, client_id, client_secret, customer_id }  or object { api_url, client_key, client_secret, customer_id }  or 5 more`

  The configuration object containing third-party integration information.

  - `TeamsDevicesWorkspaceOneConfigRequest object { api_url, auth_url, client_id, client_secret }`

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

    - `client_secret: string`

      The Workspace One client secret provided in the Workspace One Admin Dashboard.

  - `TeamsDevicesCrowdstrikeConfigRequest object { api_url, client_id, client_secret, customer_id }`

    - `api_url: string`

      The Crowdstrike API URL.

    - `client_id: string`

      The Crowdstrike client ID.

    - `client_secret: string`

      The Crowdstrike client secret.

    - `customer_id: string`

      The Crowdstrike customer ID.

  - `TeamsDevicesUptycsConfigRequest object { api_url, client_key, client_secret, customer_id }`

    - `api_url: string`

      The Uptycs API URL.

    - `client_key: string`

      The Uptycs client secret.

    - `client_secret: string`

      The Uptycs client secret.

    - `customer_id: string`

      The Uptycs customer ID.

  - `TeamsDevicesIntuneConfigRequest object { client_id, client_secret, customer_id }`

    - `client_id: string`

      The Intune client ID.

    - `client_secret: string`

      The Intune client secret.

    - `customer_id: string`

      The Intune customer ID.

  - `TeamsDevicesKolideConfigRequest object { client_id, client_secret }`

    - `client_id: string`

      The Kolide client ID.

    - `client_secret: string`

      The Kolide client secret.

  - `TeamsDevicesTaniumConfigRequest object { api_url, client_secret, access_client_id, access_client_secret }`

    - `api_url: string`

      The Tanium API URL.

    - `client_secret: string`

      The Tanium client secret.

    - `access_client_id: optional string`

      If present, this id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: optional string`

      If present, this secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

  - `TeamsDevicesSentineloneS2sConfigRequest object { api_url, client_secret }`

    - `api_url: string`

      The SentinelOne S2S API URL.

    - `client_secret: string`

      The SentinelOne S2S client secret.

  - `TeamsDevicesCustomS2sConfigRequest object { access_client_id, access_client_secret, api_url }`

    - `access_client_id: string`

      This id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: string`

      This secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

    - `api_url: string`

      The Custom Device Posture Integration  API URL.

- `interval: string`

  The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

- `name: string`

  The name of the device posture integration.

- `type: "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

  The type of device posture integration.

  - `"workspace_one"`

  - `"crowdstrike_s2s"`

  - `"uptycs"`

  - `"intune"`

  - `"kolide"`

  - `"tanium_s2s"`

  - `"sentinelone_s2s"`

  - `"custom_s2s"`

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

- `result: Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "api_url": "https://as123.awmdm.com/API",
            "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
            "client_id": "example client id",
            "client_secret": "example client secret"
          },
          "interval": "10m",
          "name": "My Workspace One Integration",
          "type": "workspace_one"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
  },
  "success": true
}
```

## Update a device posture integration

**patch** `/accounts/{account_id}/devices/posture/integration/{integration_id}`

Updates a configured device posture integration.

### Path Parameters

- `account_id: string`

- `integration_id: string`

  API UUID.

### Body Parameters

- `config: optional object { api_url, auth_url, client_id, client_secret }  or object { api_url, client_id, client_secret, customer_id }  or object { api_url, client_key, client_secret, customer_id }  or 5 more`

  The configuration object containing third-party integration information.

  - `TeamsDevicesWorkspaceOneConfigRequest object { api_url, auth_url, client_id, client_secret }`

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

    - `client_secret: string`

      The Workspace One client secret provided in the Workspace One Admin Dashboard.

  - `TeamsDevicesCrowdstrikeConfigRequest object { api_url, client_id, client_secret, customer_id }`

    - `api_url: string`

      The Crowdstrike API URL.

    - `client_id: string`

      The Crowdstrike client ID.

    - `client_secret: string`

      The Crowdstrike client secret.

    - `customer_id: string`

      The Crowdstrike customer ID.

  - `TeamsDevicesUptycsConfigRequest object { api_url, client_key, client_secret, customer_id }`

    - `api_url: string`

      The Uptycs API URL.

    - `client_key: string`

      The Uptycs client secret.

    - `client_secret: string`

      The Uptycs client secret.

    - `customer_id: string`

      The Uptycs customer ID.

  - `TeamsDevicesIntuneConfigRequest object { client_id, client_secret, customer_id }`

    - `client_id: string`

      The Intune client ID.

    - `client_secret: string`

      The Intune client secret.

    - `customer_id: string`

      The Intune customer ID.

  - `TeamsDevicesKolideConfigRequest object { client_id, client_secret }`

    - `client_id: string`

      The Kolide client ID.

    - `client_secret: string`

      The Kolide client secret.

  - `TeamsDevicesTaniumConfigRequest object { api_url, client_secret, access_client_id, access_client_secret }`

    - `api_url: string`

      The Tanium API URL.

    - `client_secret: string`

      The Tanium client secret.

    - `access_client_id: optional string`

      If present, this id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: optional string`

      If present, this secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

  - `TeamsDevicesSentineloneS2sConfigRequest object { api_url, client_secret }`

    - `api_url: string`

      The SentinelOne S2S API URL.

    - `client_secret: string`

      The SentinelOne S2S client secret.

  - `TeamsDevicesCustomS2sConfigRequest object { access_client_id, access_client_secret, api_url }`

    - `access_client_id: string`

      This id will be passed in the `CF-Access-Client-ID` header when hitting the `api_url`.

    - `access_client_secret: string`

      This secret will be passed in the `CF-Access-Client-Secret` header when hitting the `api_url`.

    - `api_url: string`

      The Custom Device Posture Integration  API URL.

- `interval: optional string`

  The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

- `name: optional string`

  The name of the device posture integration.

- `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

  The type of device posture integration.

  - `"workspace_one"`

  - `"crowdstrike_s2s"`

  - `"uptycs"`

  - `"intune"`

  - `"kolide"`

  - `"tanium_s2s"`

  - `"sentinelone_s2s"`

  - `"custom_s2s"`

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

- `result: Integration`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration/$INTEGRATION_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "config": {
            "api_url": "https://as123.awmdm.com/API",
            "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
            "client_id": "example client id",
            "client_secret": "example client secret"
          },
          "interval": "10m",
          "name": "My Workspace One Integration",
          "type": "workspace_one"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "config": {
      "api_url": "https://as123.awmdm.com/API",
      "auth_url": "https://na.uemauth.workspaceone.com/connect/token",
      "client_id": "example client id"
    },
    "interval": "10m",
    "name": "My Workspace One Integration",
    "type": "workspace_one"
  },
  "success": true
}
```

## Delete a device posture integration

**delete** `/accounts/{account_id}/devices/posture/integration/{integration_id}`

Delete a configured device posture integration.

### Path Parameters

- `account_id: string`

- `integration_id: string`

  API UUID.

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

- `result: unknown or string`

  - `unknown`

  - `string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/posture/integration/$INTEGRATION_ID \
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
  "result": {},
  "success": true
}
```

## Domain Types

### Integration

- `Integration object { id, config, interval, 2 more }`

  - `id: optional string`

    API UUID.

  - `config: optional object { api_url, auth_url, client_id }`

    The configuration object containing third-party integration information.

    - `api_url: string`

      The Workspace One API URL provided in the Workspace One Admin Dashboard.

    - `auth_url: string`

      The Workspace One Authorization URL depending on your region.

    - `client_id: string`

      The Workspace One client ID provided in the Workspace One Admin Dashboard.

  - `interval: optional string`

    The interval between each posture check with the third-party API. Use `m` for minutes (e.g. `5m`) and `h` for hours (e.g. `12h`).

  - `name: optional string`

    The name of the device posture integration.

  - `type: optional "workspace_one" or "crowdstrike_s2s" or "uptycs" or 5 more`

    The type of device posture integration.

    - `"workspace_one"`

    - `"crowdstrike_s2s"`

    - `"uptycs"`

    - `"intune"`

    - `"kolide"`

    - `"tanium_s2s"`

    - `"sentinelone_s2s"`

    - `"custom_s2s"`

### Integration Delete Response

- `IntegrationDeleteResponse = unknown or string`

  - `unknown`

  - `string`
