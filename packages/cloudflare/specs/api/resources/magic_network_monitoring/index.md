# Magic Network Monitoring

# VPC Flows

# Tokens

## Generate authentication token for VPC flow logs export.

**post** `/accounts/{account_id}/mnm/vpc-flows/token`

Generate authentication token for VPC flow logs export.

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

- `result: string`

  Authentication token to be used for VPC Flows export authentication.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/vpc-flows/token \
    -X POST \
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
  "result": "JWE/JWT auth token",
  "success": true
}
```

## Domain Types

### Token Create Response

- `TokenCreateResponse = string`

  Authentication token to be used for VPC Flows export authentication.

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

# Rules

## List rules

**get** `/accounts/{account_id}/mnm/rules`

Lists network monitoring rules for account.

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

- `result: array of MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service

  - `page: optional number`

    Current page within paginated list of results

  - `per_page: optional number`

    Number of results per page of results

  - `total_count: optional number`

    Total results available without any search parameters

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules \
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
  "result": [
    {
      "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
      "automatic_advertisement": true,
      "name": "my_rule_1",
      "prefixes": [
        "203.0.113.1/32"
      ],
      "type": "zscore",
      "bandwidth_threshold": 1000,
      "duration": "1m",
      "packet_threshold": 10000,
      "prefix_match": "exact",
      "zscore_sensitivity": "high",
      "zscore_target": "bits"
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

## Get rule

**get** `/accounts/{account_id}/mnm/rules/{rule_id}`

List a single network monitoring rule for account.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID \
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
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Create rules

**post** `/accounts/{account_id}/mnm/rules`

Create network monitoring rules for account. Currently only supports creating a single rule per API request.

### Path Parameters

- `account_id: string`

### Body Parameters

- `automatic_advertisement: boolean`

  Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `name: string`

  The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

- `prefixes: array of string`

- `type: "threshold" or "zscore" or "advanced_ddos"`

  MNM rule type.

  - `"threshold"`

  - `"zscore"`

  - `"advanced_ddos"`

- `bandwidth_threshold: optional number`

  The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `duration: optional "1m" or "5m" or "10m" or 5 more`

  The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

  - `"1m"`

  - `"5m"`

  - `"10m"`

  - `"15m"`

  - `"20m"`

  - `"30m"`

  - `"45m"`

  - `"60m"`

- `packet_threshold: optional number`

  The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `prefix_match: optional "exact" or "subnet" or "supernet"`

  Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

  - `"exact"`

  - `"subnet"`

  - `"supernet"`

- `zscore_sensitivity: optional "low" or "medium" or "high"`

  Level of sensitivity set for zscore rules.

  - `"low"`

  - `"medium"`

  - `"high"`

- `zscore_target: optional "bits" or "packets"`

  Target of the zscore rule analysis.

  - `"bits"`

  - `"packets"`

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "automatic_advertisement": true,
          "name": "my_rule_1",
          "prefixes": [
            "203.0.113.1/32"
          ],
          "type": "zscore",
          "bandwidth_threshold": 1000,
          "packet_threshold": 10000,
          "prefix_match": "exact",
          "zscore_sensitivity": "high",
          "zscore_target": "bits"
        }'
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
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Update rules

**put** `/accounts/{account_id}/mnm/rules`

Update network monitoring rules for account.

### Path Parameters

- `account_id: string`

### Body Parameters

- `automatic_advertisement: boolean`

  Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `name: string`

  The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

- `prefixes: array of string`

- `type: "threshold" or "zscore" or "advanced_ddos"`

  MNM rule type.

  - `"threshold"`

  - `"zscore"`

  - `"advanced_ddos"`

- `bandwidth_threshold: optional number`

  The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `duration: optional "1m" or "5m" or "10m" or 5 more`

  The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

  - `"1m"`

  - `"5m"`

  - `"10m"`

  - `"15m"`

  - `"20m"`

  - `"30m"`

  - `"45m"`

  - `"60m"`

- `packet_threshold: optional number`

  The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `prefix_match: optional "exact" or "subnet" or "supernet"`

  Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

  - `"exact"`

  - `"subnet"`

  - `"supernet"`

- `zscore_sensitivity: optional "low" or "medium" or "high"`

  Level of sensitivity set for zscore rules.

  - `"low"`

  - `"medium"`

  - `"high"`

- `zscore_target: optional "bits" or "packets"`

  Target of the zscore rule analysis.

  - `"bits"`

  - `"packets"`

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "automatic_advertisement": true,
          "name": "my_rule_1",
          "prefixes": [
            "203.0.113.1/32"
          ],
          "type": "zscore",
          "bandwidth_threshold": 1000,
          "packet_threshold": 10000,
          "prefix_match": "exact",
          "zscore_sensitivity": "high",
          "zscore_target": "bits"
        }'
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
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Update rule

**patch** `/accounts/{account_id}/mnm/rules/{rule_id}`

Update a network monitoring rule for account.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

### Body Parameters

- `automatic_advertisement: boolean`

  Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `name: string`

  The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

- `prefixes: array of string`

- `type: "threshold" or "zscore" or "advanced_ddos"`

  MNM rule type.

  - `"threshold"`

  - `"zscore"`

  - `"advanced_ddos"`

- `bandwidth_threshold: optional number`

  The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `duration: optional "1m" or "5m" or "10m" or 5 more`

  The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

  - `"1m"`

  - `"5m"`

  - `"10m"`

  - `"15m"`

  - `"20m"`

  - `"30m"`

  - `"45m"`

  - `"60m"`

- `packet_threshold: optional number`

  The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

- `prefix_match: optional "exact" or "subnet" or "supernet"`

  Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

  - `"exact"`

  - `"subnet"`

  - `"supernet"`

- `zscore_sensitivity: optional "low" or "medium" or "high"`

  Level of sensitivity set for zscore rules.

  - `"low"`

  - `"medium"`

  - `"high"`

- `zscore_target: optional "bits" or "packets"`

  Target of the zscore rule analysis.

  - `"bits"`

  - `"packets"`

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{
          "automatic_advertisement": true,
          "name": "my_rule_1",
          "prefixes": [
            "203.0.113.1/32"
          ],
          "type": "zscore",
          "bandwidth_threshold": 1000,
          "packet_threshold": 10000,
          "prefix_match": "exact",
          "zscore_sensitivity": "high",
          "zscore_target": "bits"
        }'
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
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Delete rule

**delete** `/accounts/{account_id}/mnm/rules/{rule_id}`

Delete a network monitoring rule for account.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

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

- `result: MagicNetworkMonitoringRule`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID \
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
    "id": "2890e6fa406311ed9b5a23f70f6fb8cf",
    "automatic_advertisement": true,
    "name": "my_rule_1",
    "prefixes": [
      "203.0.113.1/32"
    ],
    "type": "zscore",
    "bandwidth_threshold": 1000,
    "duration": "1m",
    "packet_threshold": 10000,
    "prefix_match": "exact",
    "zscore_sensitivity": "high",
    "zscore_target": "bits"
  },
  "success": true
}
```

## Domain Types

### Magic Network Monitoring Rule

- `MagicNetworkMonitoringRule object { id, automatic_advertisement, name, 8 more }`

  - `id: string`

    The id of the rule. Must be unique.

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

  - `name: string`

    The name of the rule. Must be unique. Supports characters A-Z, a-z, 0-9, underscore (_), dash (-), period (.), and tilde (~). You can’t have a space in the rule name. Max 256 characters.

  - `prefixes: array of string`

  - `type: "threshold" or "zscore" or "advanced_ddos"`

    MNM rule type.

    - `"threshold"`

    - `"zscore"`

    - `"advanced_ddos"`

  - `bandwidth_threshold: optional number`

    The number of bits per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `duration: optional "1m" or "5m" or "10m" or 5 more`

    The amount of time that the rule threshold must be exceeded to send an alert notification. The final value must be equivalent to one of the following 8 values ["1m","5m","10m","15m","20m","30m","45m","60m"].

    - `"1m"`

    - `"5m"`

    - `"10m"`

    - `"15m"`

    - `"20m"`

    - `"30m"`

    - `"45m"`

    - `"60m"`

  - `packet_threshold: optional number`

    The number of packets per second for the rule. When this value is exceeded for the set duration, an alert notification is sent. Minimum of 1 and no maximum.

  - `prefix_match: optional "exact" or "subnet" or "supernet"`

    Prefix match type to be applied for a prefix auto advertisement when using an advanced_ddos rule.

    - `"exact"`

    - `"subnet"`

    - `"supernet"`

  - `zscore_sensitivity: optional "low" or "medium" or "high"`

    Level of sensitivity set for zscore rules.

    - `"low"`

    - `"medium"`

    - `"high"`

  - `zscore_target: optional "bits" or "packets"`

    Target of the zscore rule analysis.

    - `"bits"`

    - `"packets"`

# Advertisements

## Update advertisement for rule

**patch** `/accounts/{account_id}/mnm/rules/{rule_id}/advertisement`

Update advertisement for rule.

### Path Parameters

- `account_id: string`

- `rule_id: string`

  The id of the rule. Must be unique.

### Body Parameters

- `body: unknown`

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

- `result: Advertisement`

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mnm/rules/$RULE_ID/advertisement \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "X-Auth-Email: $CLOUDFLARE_EMAIL" \
    -H "X-Auth-Key: $CLOUDFLARE_API_KEY" \
    -d '{}'
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
    "automatic_advertisement": true
  },
  "success": true
}
```

## Domain Types

### Advertisement

- `Advertisement object { automatic_advertisement }`

  - `automatic_advertisement: boolean`

    Toggle on if you would like Cloudflare to automatically advertise the IP Prefixes within the rule via Magic Transit when the rule is triggered. Only available for users of Magic Transit.
