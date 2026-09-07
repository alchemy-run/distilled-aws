# ACLs

## List Site ACLs

**get** `/accounts/{account_id}/magic/sites/{site_id}/acls`

Lists Site ACLs associated with an account.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

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

- `result: array of ACL`

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "description": "Allows local traffic between PIN pads and cash register.",
      "forward_locally": true,
      "lan_1": {
        "lan_id": "lan_id",
        "lan_name": "lan_name",
        "port_ranges": [
          "8080-9000"
        ],
        "ports": [
          1
        ],
        "subnets": [
          "192.0.2.1"
        ]
      },
      "lan_2": {
        "lan_id": "lan_id",
        "lan_name": "lan_name",
        "port_ranges": [
          "8080-9000"
        ],
        "ports": [
          1
        ],
        "subnets": [
          "192.0.2.1"
        ]
      },
      "name": "PIN Pad - Cash Register",
      "protocols": [
        "tcp"
      ],
      "unidirectional": true
    }
  ],
  "success": true
}
```

## Site ACL Details

**get** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Get a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

  Identifier

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Create a new Site ACL

**post** `/accounts/{account_id}/magic/sites/{site_id}/acls`

Creates a new Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `lan_1: ACLConfiguration`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

- `lan_2: ACLConfiguration`

- `name: string`

  The name of the ACL.

- `description: optional string`

  Description for the ACL.

- `forward_locally: optional boolean`

  The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

- `protocols: optional array of AllowedProtocol`

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

- `unidirectional: optional boolean`

  The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "lan_1": {
            "lan_id": "lan_id"
          },
          "lan_2": {
            "lan_id": "lan_id"
          },
          "name": "PIN Pad - Cash Register",
          "description": "Allows local traffic between PIN pads and cash register."
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Update Site ACL

**put** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Update a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  Description for the ACL.

- `forward_locally: optional boolean`

  The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

- `lan_1: optional ACLConfiguration`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

- `lan_2: optional ACLConfiguration`

- `name: optional string`

  The name of the ACL.

- `protocols: optional array of AllowedProtocol`

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

- `unidirectional: optional boolean`

  The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Allows local traffic between PIN pads and cash register.",
          "name": "PIN Pad - Cash Register"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Patch Site ACL

**patch** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Patch a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  Description for the ACL.

- `forward_locally: optional boolean`

  The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

- `lan_1: optional ACLConfiguration`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

- `lan_2: optional ACLConfiguration`

- `name: optional string`

  The name of the ACL.

- `protocols: optional array of AllowedProtocol`

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

- `unidirectional: optional boolean`

  The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Allows local traffic between PIN pads and cash register.",
          "name": "PIN Pad - Cash Register"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Delete Site ACL

**delete** `/accounts/{account_id}/magic/sites/{site_id}/acls/{acl_id}`

Remove a specific Site ACL.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `acl_id: string`

  Identifier

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

- `result: ACL`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/acls/$ACL_ID \
    -X DELETE \
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
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "description": "Allows local traffic between PIN pads and cash register.",
    "forward_locally": true,
    "lan_1": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "lan_2": {
      "lan_id": "lan_id",
      "lan_name": "lan_name",
      "port_ranges": [
        "8080-9000"
      ],
      "ports": [
        1
      ],
      "subnets": [
        "192.0.2.1"
      ]
    },
    "name": "PIN Pad - Cash Register",
    "protocols": [
      "tcp"
    ],
    "unidirectional": true
  },
  "success": true
}
```

## Domain Types

### ACL

- `ACL object { id, description, forward_locally, 5 more }`

  Bidirectional ACL policy for network traffic within a site.

  - `id: optional string`

    Identifier

  - `description: optional string`

    Description for the ACL.

  - `forward_locally: optional boolean`

    The desired forwarding action for this ACL policy. If set to "false", the policy will forward traffic to Cloudflare. If set to "true", the policy will forward traffic locally on the Magic Connector. If not included in request, will default to false.

  - `lan_1: optional ACLConfiguration`

    - `lan_id: string`

      The identifier for the LAN you want to create an ACL policy with.

    - `lan_name: optional string`

      The name of the LAN based on the provided lan_id.

    - `port_ranges: optional array of string`

      Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

    - `ports: optional array of number`

      Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

    - `subnets: optional array of Subnet`

      Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

  - `lan_2: optional ACLConfiguration`

  - `name: optional string`

    The name of the ACL.

  - `protocols: optional array of AllowedProtocol`

    - `"tcp"`

    - `"udp"`

    - `"icmp"`

  - `unidirectional: optional boolean`

    The desired traffic direction for this ACL policy. If set to "false", the policy will allow bidirectional traffic. If set to "true", the policy will only allow traffic in one direction. If not included in request, will default to false.

### ACL Configuration

- `ACLConfiguration object { lan_id, lan_name, port_ranges, 2 more }`

  - `lan_id: string`

    The identifier for the LAN you want to create an ACL policy with.

  - `lan_name: optional string`

    The name of the LAN based on the provided lan_id.

  - `port_ranges: optional array of string`

    Array of port ranges on the provided LAN that will be included in the ACL. If no ports or port rangess are provided, communication on any port on this LAN is allowed.

  - `ports: optional array of number`

    Array of ports on the provided LAN that will be included in the ACL. If no ports or port ranges are provided, communication on any port on this LAN is allowed.

  - `subnets: optional array of Subnet`

    Array of subnet IPs within the LAN that will be included in the ACL. If no subnets are provided, communication on any subnets on this LAN are allowed.

### Allowed Protocol

- `AllowedProtocol = "tcp" or "udp" or "icmp"`

  Array of allowed communication protocols between configured LANs. If no protocols are provided, all protocols are allowed.

  - `"tcp"`

  - `"udp"`

  - `"icmp"`

### Subnet

- `Subnet = string`

  A valid IPv4 address.
