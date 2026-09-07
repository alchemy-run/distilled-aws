## Get a relay

**get** `/accounts/{account_id}/moq/relays/{relay_id}`

Retrieves a single MoQ relay including config and status.
Tokens are NOT included.

### Path Parameters

- `account_id: string`

  Cloudflare account identifier.

- `relay_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `success: boolean`

- `result: optional object { config, created, modified, 3 more }`

  Full relay details (no tokens).

  - `config: object { lingering_subscribe, upstreams }`

    upstreams and lingering_subscribe are mutually exclusive.

    - `lingering_subscribe: optional object { enabled, max_timeout_ms }`

      - `enabled: optional boolean`

      - `max_timeout_ms: optional number`

        Relay-level ceiling on lingering subscribe timeout (ms). Default 30000.

    - `upstreams: optional object { enabled, upstreams }`

      Upstreams are external MOQT server publishers that a relay falls back
      to when it has no local publisher for a requested namespace/track.

      - `enabled: optional boolean`

      - `upstreams: optional array of object { url }`

        Ordered list of upstream MOQT server publishers. Each entry is an
        object (not a bare string) so per-upstream configuration can be
        added in the future without another breaking change.

        - `url: optional string`

          Upstream MOQT server publisher URL.

  - `created: string`

  - `modified: string`

  - `name: string`

  - `uid: string`

  - `status: optional "connected"`

    "connected" when active, omitted otherwise.

    - `"connected"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "errors": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "messages": [
    {
      "code": 0,
      "message": "message"
    }
  ],
  "success": true,
  "result": {
    "config": {
      "lingering_subscribe": {
        "enabled": true,
        "max_timeout_ms": 0
      },
      "upstreams": {
        "enabled": true,
        "upstreams": [
          {
            "url": "url"
          }
        ]
      }
    },
    "created": "2019-12-27T18:11:19.117Z",
    "modified": "2019-12-27T18:11:19.117Z",
    "name": "Production Live Stream",
    "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890",
    "status": "connected"
  }
}
```
