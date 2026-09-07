## Set the Split Tunnel include list

**put** `/accounts/{account_id}/devices/policy/include`

Sets the list of routes included in the WARP client's tunnel.

### Path Parameters

- `account_id: string`

### Body Parameters

- `body: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

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

- `result: array of SplitTunnelInclude`

  - `TeamsDevicesIncludeSplitTunnelWithAddress object { address, description }`

    - `address: string`

      The address in CIDR format to include in the tunnel. If `address` is present, `host` must not be present.

    - `description: optional string`

      A description of the Split Tunnel item, displayed in the client UI.

  - `TeamsDevicesIncludeSplitTunnelWithHost object { host, description }`

    - `host: string`

      The domain name to include in the tunnel. If `host` is present, `address` must not be present.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/include \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "address": "192.0.2.0/24",
            "description": "Include testing domains in the tunnel"
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
      "description": "Include testing domains in the tunnel"
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
