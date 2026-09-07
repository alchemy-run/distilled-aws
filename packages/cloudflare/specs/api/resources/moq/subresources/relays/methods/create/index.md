## Create a relay

**post** `/accounts/{account_id}/moq/relays`

Provisions a new MoQ relay instance. Auto-creates a publish+subscribe
token and a subscribe-only token. Token values are included in the
response (shown once). Config is set to defaults (lingering subscribe
enabled, 30s ceiling, upstreams off). Use PUT to modify.

### Path Parameters

- `account_id: string`

  Cloudflare account identifier.

### Body Parameters

- `name: string`

  Human-readable name for the relay.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `success: boolean`

- `result: optional object { config, created, modified, 4 more }`

  Relay with auto-generated tokens (shown once).

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

  - `token_publish_subscribe: string`

    Full access token (publish + subscribe). Treat as sensitive.

  - `token_subscribe: string`

    Subscribe-only token. Treat as sensitive.

  - `uid: string`

    Server-generated unique identifier (32 hex chars).

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Production Live Stream"
        }'
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
    "token_publish_subscribe": "eyJhbGciOiJFZDI1NTE5...",
    "token_subscribe": "eyJhbGciOiJFZDI1NTE5...",
    "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890"
  }
}
```
