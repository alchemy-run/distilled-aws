## List Scan Configs

**get** `/accounts/{account_id}/cloudforce-one/scans/config`

List Scan Configs

### Path Parameters

- `account_id: string`

  Defines the Account ID.

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

- `result: optional array of object { id, account_id, frequency, 2 more }`

  - `id: string`

    Defines the Config ID.

  - `account_id: string`

  - `frequency: number`

    Defines the number of days between each scan (0 = One-off scan).

  - `ips: array of string`

    Defines a list of IP addresses or CIDR blocks to scan. The maximum number of total IP addresses allowed is 5000.

  - `ports: array of string`

    Defines a list of ports to scan. Valid values are:"default", "all", or a comma-separated list of ports or range of ports (e.g. ["1-80", "443"]). "default" scans the 100 most commonly open ports.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cloudforce-one/scans/config \
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
  "result": [
    {
      "id": "uuid",
      "account_id": "abcd1234abcd1234abcd1234abcd1234",
      "frequency": 7,
      "ips": [
        "1.1.1.1",
        "2606:4700:4700::1111"
      ],
      "ports": [
        "default"
      ]
    }
  ]
}
```
