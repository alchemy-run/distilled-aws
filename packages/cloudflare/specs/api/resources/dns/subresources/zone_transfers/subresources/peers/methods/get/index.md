## Peer Details

**get** `/accounts/{account_id}/secondary_dns/peers/{peer_id}`

Get Peer.

### Path Parameters

- `account_id: string`

- `peer_id: string`

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

- `result: optional Peer`

  - `id: string`

  - `name: string`

    The name of the peer.

  - `ip: optional string`

    IPv4/IPv6 address of primary or secondary nameserver, depending on what zone this peer is linked to. For primary zones this IP defines the IP of the secondary nameserver Cloudflare will NOTIFY upon zone changes. For secondary zones this IP defines the IP of the primary nameserver Cloudflare will send AXFR/IXFR requests to.

  - `ixfr_enable: optional boolean`

    Enable IXFR transfer protocol, default is AXFR. Only applicable to secondary zones.

  - `port: optional number`

    DNS port of primary or secondary nameserver, depending on what zone this peer is linked to.

  - `tsig_id: optional string`

    TSIG authentication will be used for zone transfer if configured.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/secondary_dns/peers/$PEER_ID \
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
    "id": "23ff594956f20c2a721606e94745a8aa",
    "name": "my-peer-1",
    "ip": "192.0.2.53",
    "ixfr_enable": false,
    "port": 53,
    "tsig_id": "69cd1e104af3e6ed3cb344f263fd0d5a"
  }
}
```
