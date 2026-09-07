# Excludes

## Get the Split Tunnel exclude list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/exclude`

Fetches the list of routes excluded from the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

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

- `result: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/exclude \
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
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
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

## Set the Split Tunnel exclude list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/exclude`

Sets the list of routes excluded from the WARP client's tunnel for a specific device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `body: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

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

- `result: array of SplitTunnelExclude`

  - `TeamsDevicesExcludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to exclude from the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesExcludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to exclude from the tunnel. If `host` is present, `address` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/exclude \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Exclude testing domains from the tunnel"
          }
        ]'
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
      "address": "192.0.2.0/24",
      "description": "Exclude testing domains from the tunnel"
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
