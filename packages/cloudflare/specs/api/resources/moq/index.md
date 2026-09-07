# MoQ

# Relays

## List relays

**get** `/accounts/{account_id}/moq/relays`

Lists all MoQ relays for the account. Returns only metadata.
Config, status, and tokens are omitted.

Results are cursor-paginated (keyset on the `created` timestamp).
Use `created_before` / `created_after` with the `created` value of the
first/last item in a page to fetch the adjacent page. `result_info`
reports the page `count` and the `total` matching the cursor filters.

### Path Parameters

- `account_id: string`

  Cloudflare account identifier.

### Query Parameters

- `asc: optional boolean`

  Sort order by `created`. When true, results are returned oldest-first
  (ascending); otherwise newest-first (descending, the default).

- `created_after: optional string`

  Cursor for pagination. Returns relays created strictly after this
  RFC 3339 timestamp (typically the `created` value of the last item
  on the current page, to fetch the next page).

- `created_before: optional string`

  Cursor for pagination. Returns relays created strictly before this
  RFC 3339 timestamp (typically the `created` value of the first item
  on the current page, to fetch the previous page).

- `per_page: optional number`

  Maximum number of relays to return per page.

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `success: boolean`

- `result: optional array of object { created, modified, name, uid }`

  - `created: string`

  - `modified: string`

  - `name: string`

  - `uid: string`

- `result_info: optional object { count, total }`

  - `count: optional number`

  - `total: optional number`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays \
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
  "result": [
    {
      "created": "2019-12-27T18:11:19.117Z",
      "modified": "2019-12-27T18:11:19.117Z",
      "name": "name",
      "uid": "a1b2c3d4e5f67890a1b2c3d4e5f67890"
    }
  ],
  "result_info": {
    "count": 0,
    "total": 0
  }
}
```

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

## Update a relay

**put** `/accounts/{account_id}/moq/relays/{relay_id}`

Updates a relay's name and/or configuration. Partial updates:
omitted fields are preserved. Config sub-objects replace as
whole objects when present. upstreams and lingering_subscribe
are mutually exclusive.

### Path Parameters

- `account_id: string`

  Cloudflare account identifier.

- `relay_id: string`

### Body Parameters

- `config: optional object { lingering_subscribe, upstreams }`

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

- `name: optional string`

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
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{}'
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

## Delete a relay

**delete** `/accounts/{account_id}/moq/relays/{relay_id}`

Soft-deletes a MoQ relay.

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID \
    -X DELETE \
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
  "result": {}
}
```

## Domain Types

### Relay List Response

- `RelayListResponse object { created, modified, name, uid }`

  Abbreviated relay for list responses.

  - `created: string`

  - `modified: string`

  - `name: string`

  - `uid: string`

### Relay Get Response

- `RelayGetResponse object { config, created, modified, 3 more }`

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

### Relay Create Response

- `RelayCreateResponse object { config, created, modified, 4 more }`

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

### Relay Update Response

- `RelayUpdateResponse object { config, created, modified, 3 more }`

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

### Relay Delete Response

- `RelayDeleteResponse = unknown`

# Tokens

## Rotate a token

**post** `/accounts/{account_id}/moq/relays/{relay_id}/tokens/rotate`

Generates a new token for the specified type. The old token is
immediately invalidated. Token value is shown once in the response.

### Path Parameters

- `account_id: string`

  Cloudflare account identifier.

- `relay_id: string`

### Body Parameters

- `type: "publish_subscribe" or "subscribe"`

  Which token type to rotate.

  - `"publish_subscribe"`

  - `"subscribe"`

### Returns

- `errors: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `messages: array of object { code, message }`

  - `code: optional number`

  - `message: optional string`

- `success: boolean`

- `result: optional object { token, type }`

  - `token: string`

    New token value (shown once). Treat as sensitive.

  - `type: "publish_subscribe" or "subscribe"`

    - `"publish_subscribe"`

    - `"subscribe"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/moq/relays/$RELAY_ID/tokens/rotate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "type": "publish_subscribe"
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
    "token": "eyJhbGciOiJFZDI1NTE5...",
    "type": "publish_subscribe"
  }
}
```

## Domain Types

### Token Rotate Response

- `TokenRotateResponse object { token, type }`

  - `token: string`

    New token value (shown once). Treat as sensitive.

  - `type: "publish_subscribe" or "subscribe"`

    - `"publish_subscribe"`

    - `"subscribe"`
