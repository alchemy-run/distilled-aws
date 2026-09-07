# Configs

## List account configuration

**get** `/accounts/{account_id}/mnm/config`

Lists default sampling, router IPs and warp devices for account.

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

- `result: Configuration`

  - `default_sampling: number`

    Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

  - `name: string`

    The account name.

  - `router_ips: array of string`

  - `warp_devices: array of object { id, name, router_ip }`

    - `id: string`

      Unique identifier for the warp device.

    - `name: string`

      Name of the warp device.

    - `router_ip: string`

      IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
    ]
  },
  "success": true
}
```

## Create account configuration

**post** `/accounts/{account_id}/mnm/config`

Create a new network monitoring configuration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `default_sampling: number`

  Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

- `name: string`

  The account name.

- `router_ips: optional array of string`

- `warp_devices: optional array of object { id, name, router_ip }`

  - `id: string`

    Unique identifier for the warp device.

  - `name: string`

    Name of the warp device.

  - `router_ip: string`

    IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

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

- `result: Configuration`

  - `default_sampling: number`

    Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

  - `name: string`

    The account name.

  - `router_ips: array of string`

  - `warp_devices: array of object { id, name, router_ip }`

    - `id: string`

      Unique identifier for the warp device.

    - `name: string`

      Name of the warp device.

    - `router_ip: string`

      IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d "{
          \"default_sampling\": 1,
          \"name\": \"cloudflare user's account\"
        }"
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
    ]
  },
  "success": true
}
```

## Update an entire account configuration

**put** `/accounts/{account_id}/mnm/config`

Update an existing network monitoring configuration, requires the entire configuration to be updated at once.

### Path Parameters

- `account_id: string`

### Body Parameters

- `default_sampling: number`

  Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

- `name: string`

  The account name.

- `router_ips: optional array of string`

- `warp_devices: optional array of object { id, name, router_ip }`

  - `id: string`

    Unique identifier for the warp device.

  - `name: string`

    Name of the warp device.

  - `router_ip: string`

    IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

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

- `result: Configuration`

  - `default_sampling: number`

    Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

  - `name: string`

    The account name.

  - `router_ips: array of string`

  - `warp_devices: array of object { id, name, router_ip }`

    - `id: string`

      Unique identifier for the warp device.

    - `name: string`

      Name of the warp device.

    - `router_ip: string`

      IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d "{
          \"default_sampling\": 1,
          \"name\": \"cloudflare user's account\"
        }"
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
    ]
  },
  "success": true
}
```

## Update account configuration fields

**patch** `/accounts/{account_id}/mnm/config`

Update fields in an existing network monitoring configuration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `default_sampling: optional number`

  Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

- `name: optional string`

  The account name.

- `router_ips: optional array of string`

- `warp_devices: optional array of object { id, name, router_ip }`

  - `id: string`

    Unique identifier for the warp device.

  - `name: string`

    Name of the warp device.

  - `router_ip: string`

    IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

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

- `result: Configuration`

  - `default_sampling: number`

    Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

  - `name: string`

    The account name.

  - `router_ips: array of string`

  - `warp_devices: array of object { id, name, router_ip }`

    - `id: string`

      Unique identifier for the warp device.

    - `name: string`

      Name of the warp device.

    - `router_ip: string`

      IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d "{
          \"name\": \"cloudflare user's account\"
        }"
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
    ]
  },
  "success": true
}
```

## Delete account configuration

**delete** `/accounts/{account_id}/mnm/config`

Delete an existing network monitoring configuration.

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

- `result: Configuration`

  - `default_sampling: number`

    Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

  - `name: string`

    The account name.

  - `router_ips: array of string`

  - `warp_devices: array of object { id, name, router_ip }`

    - `id: string`

      Unique identifier for the warp device.

    - `name: string`

      Name of the warp device.

    - `router_ip: string`

      IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config \
    -X DELETE \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Configuration

- `Configuration object { default_sampling, name, router_ips, warp_devices }`

  - `default_sampling: number`

    Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

  - `name: string`

    The account name.

  - `router_ips: array of string`

  - `warp_devices: array of object { id, name, router_ip }`

    - `id: string`

      Unique identifier for the warp device.

    - `name: string`

      Name of the warp device.

    - `router_ip: string`

      IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

# Full

## List rules and account configuration

**get** `/accounts/{account_id}/mnm/config/full`

Lists default sampling, router IPs, warp devices, and rules for account.

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

- `result: Configuration`

  - `default_sampling: number`

    Fallback sampling rate of flow messages being sent in packets per second. This should match the packet sampling rate configured on the router.

  - `name: string`

    The account name.

  - `router_ips: array of string`

  - `warp_devices: array of object { id, name, router_ip }`

    - `id: string`

      Unique identifier for the warp device.

    - `name: string`

      Name of the warp device.

    - `router_ip: string`

      IPv4 CIDR of the router sourcing flow data associated with this warp device. Only /32 addresses are currently supported.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/config/full \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY"
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
    "default_sampling": 1,
    "name": "cloudflare user's account",
    "router_ips": [
      "203.0.113.1"
    ],
    "warp_devices": [
      {
        "id": "5360368d-b351-4791-abe1-93550dabd351",
        "name": "My warp device",
        "router_ip": "203.0.113.1"
      }
    ]
  },
  "success": true
}
```
