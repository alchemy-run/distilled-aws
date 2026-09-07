## Cloudflare/JD Cloud IP Details

**get** `/ips`

Get IPs used on the Cloudflare/JD Cloud network, see https://www.cloudflare.com/ips for Cloudflare IPs or https://developers.cloudflare.com/china-network/reference/infrastructure/ for JD Cloud IPs.

### Query Parameters

- `networks: optional string`

  Specified as `jdcloud` to list IPs used by JD Cloud data centers.

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

- `result: optional object { etag, ipv4_cidrs, ipv6_cidrs }  or object { etag, ipv4_cidrs, ipv6_cidrs, jdcloud_cidrs }`

  - `PublicIPIPs object { etag, ipv4_cidrs, ipv6_cidrs }`

    - `etag: optional string`

      A digest of the IP data. Useful for determining if the data has changed.

    - `ipv4_cidrs: optional array of string`

      List of Cloudflare IPv4 CIDR addresses.

    - `ipv6_cidrs: optional array of string`

      List of Cloudflare IPv6 CIDR addresses.

  - `PublicIPIPsJDCloud object { etag, ipv4_cidrs, ipv6_cidrs, jdcloud_cidrs }`

    - `etag: optional string`

      A digest of the IP data. Useful for determining if the data has changed.

    - `ipv4_cidrs: optional array of string`

      List of Cloudflare IPv4 CIDR addresses.

    - `ipv6_cidrs: optional array of string`

      List of Cloudflare IPv6 CIDR addresses.

    - `jdcloud_cidrs: optional array of string`

      List IPv4 and IPv6 CIDRs, only populated if `?networks=jdcloud` is used.

### Example

```http
curl https://api.cloudflare.com/client/v4/ips
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
    "etag": "a8e453d9d129a3769407127936edfdb0",
    "ipv4_cidrs": [
      "199.27.128.0/21"
    ],
    "ipv6_cidrs": [
      "2400:cb00::/32"
    ]
  }
}
```
