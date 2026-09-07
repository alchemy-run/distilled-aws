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
