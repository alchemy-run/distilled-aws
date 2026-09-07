# Magic Transit

## Domain Types

### Health Check

- `HealthCheck object { enabled, rate, target, type }`

  - `enabled: optional boolean`

    Determines whether to run healthchecks for a tunnel.

  - `rate: optional HealthCheckRate`

    How frequent the health check is run. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `target: optional object { effective, saved }  or string`

    The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

    - `MagicHealthCheckTarget object { effective, saved }`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

      - `effective: optional string`

        The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

      - `saved: optional string`

        The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

    - `string`

  - `type: optional HealthCheckType`

    The type of healthcheck to run, reply or request. The default value is `reply`.

    - `"reply"`

    - `"request"`

### Health Check Rate

- `HealthCheckRate = "low" or "mid" or "high"`

  How frequent the health check is run. The default value is `mid`.

  - `"low"`

  - `"mid"`

  - `"high"`

### Health Check Type

- `HealthCheckType = "reply" or "request"`

  The type of healthcheck to run, reply or request. The default value is `reply`.

  - `"reply"`

  - `"request"`

# Apps

## List Apps

**get** `/accounts/{account_id}/magic/apps`

Lists Apps associated with an account.

### Path Parameters

- `account_id: string`

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

- `result: array of object { account_app_id, hostnames, ip_subnets, 3 more }  or object { managed_app_id, hostnames, ip_subnets, 3 more }`

  - `MagicAccountApp object { account_app_id, hostnames, ip_subnets, 3 more }`

    Custom app defined for an account.

    - `account_app_id: string`

      Magic account app ID.

    - `hostnames: optional array of string`

      FQDNs to associate with traffic decisions.

    - `ip_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `name: optional string`

      Display name for the app.

    - `source_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `type: optional string`

      Category of the app.

  - `MagicManagedApp object { managed_app_id, hostnames, ip_subnets, 3 more }`

    Managed app defined by Cloudflare.

    - `managed_app_id: string`

      Managed app ID.

    - `hostnames: optional array of string`

      FQDNs to associate with traffic decisions.

    - `ip_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `name: optional string`

      Display name for the app.

    - `source_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `type: optional string`

      Category of the app.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps \
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
      "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
      "hostnames": [
        "auth.cloudflare.com"
      ],
      "ip_subnets": [
        "192.0.2.0/24"
      ],
      "name": "Cloudflare Dashboard",
      "source_subnets": [
        "192.0.2.0/24"
      ],
      "type": "Development"
    }
  ],
  "success": true
}
```

## Create a new App

**post** `/accounts/{account_id}/magic/apps`

Creates a new App for an account

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `name: string`

  Display name for the app.

- `type: string`

  Category of the app.

- `hostnames: optional array of string`

  FQDNs to associate with traffic decisions.

- `ip_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

- `source_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

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

- `result: object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Cloudflare Dashboard",
          "type": "Development"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "hostnames": [
      "auth.cloudflare.com"
    ],
    "ip_subnets": [
      "192.0.2.0/24"
    ],
    "name": "Cloudflare Dashboard",
    "source_subnets": [
      "192.0.2.0/24"
    ],
    "type": "Development"
  },
  "success": true
}
```

## Update an App

**put** `/accounts/{account_id}/magic/apps/{account_app_id}`

Updates an Account App

### Path Parameters

- `account_id: string`

  Identifier

- `account_app_id: string`

  Identifier

### Body Parameters

- `hostnames: optional array of string`

  FQDNs to associate with traffic decisions.

- `ip_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

- `name: optional string`

  Display name for the app.

- `source_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

- `type: optional string`

  Category of the app.

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

- `result: object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps/$ACCOUNT_APP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Cloudflare Dashboard",
          "type": "Development"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "hostnames": [
      "auth.cloudflare.com"
    ],
    "ip_subnets": [
      "192.0.2.0/24"
    ],
    "name": "Cloudflare Dashboard",
    "source_subnets": [
      "192.0.2.0/24"
    ],
    "type": "Development"
  },
  "success": true
}
```

## Update an App

**patch** `/accounts/{account_id}/magic/apps/{account_app_id}`

Updates an Account App

### Path Parameters

- `account_id: string`

  Identifier

- `account_app_id: string`

  Identifier

### Body Parameters

- `hostnames: optional array of string`

  FQDNs to associate with traffic decisions.

- `ip_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

- `name: optional string`

  Display name for the app.

- `source_subnets: optional array of string`

  IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

- `type: optional string`

  Category of the app.

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

- `result: object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps/$ACCOUNT_APP_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "Cloudflare Dashboard",
          "type": "Development"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "hostnames": [
      "auth.cloudflare.com"
    ],
    "ip_subnets": [
      "192.0.2.0/24"
    ],
    "name": "Cloudflare Dashboard",
    "source_subnets": [
      "192.0.2.0/24"
    ],
    "type": "Development"
  },
  "success": true
}
```

## Delete Account App

**delete** `/accounts/{account_id}/magic/apps/{account_app_id}`

Deletes specific Account App.

### Path Parameters

- `account_id: string`

  Identifier

- `account_app_id: string`

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

- `result: object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/apps/$ACCOUNT_APP_ID \
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "hostnames": [
      "auth.cloudflare.com"
    ],
    "ip_subnets": [
      "192.0.2.0/24"
    ],
    "name": "Cloudflare Dashboard",
    "source_subnets": [
      "192.0.2.0/24"
    ],
    "type": "Development"
  },
  "success": true
}
```

## Domain Types

### App List Response

- `AppListResponse = object { account_app_id, hostnames, ip_subnets, 3 more }  or object { managed_app_id, hostnames, ip_subnets, 3 more }`

  Collection of Hostnames and/or IP Subnets to associate with traffic decisions.

  - `MagicAccountApp object { account_app_id, hostnames, ip_subnets, 3 more }`

    Custom app defined for an account.

    - `account_app_id: string`

      Magic account app ID.

    - `hostnames: optional array of string`

      FQDNs to associate with traffic decisions.

    - `ip_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `name: optional string`

      Display name for the app.

    - `source_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `type: optional string`

      Category of the app.

  - `MagicManagedApp object { managed_app_id, hostnames, ip_subnets, 3 more }`

    Managed app defined by Cloudflare.

    - `managed_app_id: string`

      Managed app ID.

    - `hostnames: optional array of string`

      FQDNs to associate with traffic decisions.

    - `ip_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `name: optional string`

      Display name for the app.

    - `source_subnets: optional array of string`

      IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

    - `type: optional string`

      Category of the app.

### App Create Response

- `AppCreateResponse object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

### App Update Response

- `AppUpdateResponse object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

### App Edit Response

- `AppEditResponse object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

### App Delete Response

- `AppDeleteResponse object { account_app_id, hostnames, ip_subnets, 3 more }`

  Custom app defined for an account.

  - `account_app_id: string`

    Magic account app ID.

  - `hostnames: optional array of string`

    FQDNs to associate with traffic decisions.

  - `ip_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `name: optional string`

    Display name for the app.

  - `source_subnets: optional array of string`

    IPv4 CIDRs to associate with traffic decisions. (IPv6 CIDRs are currently unsupported)

  - `type: optional string`

    Category of the app.

# Cf Interconnects

## List interconnects

**get** `/accounts/{account_id}/magic/cf_interconnects`

Lists interconnects associated with an account.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { interconnects }`

  - `interconnects: optional array of object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf_interconnects \
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
    "interconnects": [
      {
        "id": "c4a7362d577a6c3019a474fd6f485821",
        "automatic_return_routing": true,
        "colo_name": "pni_ord",
        "created_on": "2017-06-14T00:00:00Z",
        "description": "Tunnel for Interconnect to ORD",
        "gre": {
          "cloudflare_endpoint": "203.0.113.1"
        },
        "health_check": {
          "enabled": true,
          "rate": "low",
          "target": {
            "effective": "203.0.113.1",
            "saved": "203.0.113.1"
          },
          "type": "request"
        },
        "interface_address": "192.0.2.0/31",
        "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
        "modified_on": "2017-06-14T05:20:00Z",
        "mtu": 0,
        "name": "pni_ord",
        "virtual_port_reservation_id": "c4a7362d577a6c3019a474fd6f485821"
      }
    ]
  },
  "success": true
}
```

## List interconnect Details

**get** `/accounts/{account_id}/magic/cf_interconnects/{cf_interconnect_id}`

Lists details for a specific interconnect.

### Path Parameters

- `account_id: string`

  Identifier

- `cf_interconnect_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { interconnect }`

  - `interconnect: optional object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf_interconnects/$CF_INTERCONNECT_ID \
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
    "interconnect": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "automatic_return_routing": true,
      "colo_name": "pni_ord",
      "created_on": "2017-06-14T00:00:00Z",
      "description": "Tunnel for Interconnect to ORD",
      "gre": {
        "cloudflare_endpoint": "203.0.113.1"
      },
      "health_check": {
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address": "192.0.2.0/31",
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "mtu": 0,
      "name": "pni_ord",
      "virtual_port_reservation_id": "c4a7362d577a6c3019a474fd6f485821"
    }
  },
  "success": true
}
```

## Update interconnect

**put** `/accounts/{account_id}/magic/cf_interconnects/{cf_interconnect_id}`

Updates a specific interconnect associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

- `cf_interconnect_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

### Body Parameters

- `automatic_return_routing: optional boolean`

  True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

- `description: optional string`

  An optional description of the interconnect.

- `gre: optional object { cloudflare_endpoint }`

  The configuration specific to GRE interconnects.

  - `cloudflare_endpoint: optional string`

    The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

- `health_check: optional HealthCheck`

  - `enabled: optional boolean`

    Determines whether to run healthchecks for a tunnel.

  - `rate: optional HealthCheckRate`

    How frequent the health check is run. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `target: optional object { effective, saved }  or string`

    The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

    - `MagicHealthCheckTarget object { effective, saved }`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

      - `effective: optional string`

        The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

      - `saved: optional string`

        The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

    - `string`

  - `type: optional HealthCheckType`

    The type of healthcheck to run, reply or request. The default value is `reply`.

    - `"reply"`

    - `"request"`

- `interface_address: optional string`

  A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

- `interface_address6: optional string`

  A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

- `mtu: optional number`

  The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

- `name: optional string`

  The name of the interconnect. The name cannot share a name with other tunnels.

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

- `result: object { modified, modified_interconnect }`

  - `modified: optional boolean`

  - `modified_interconnect: optional object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf_interconnects/$CF_INTERCONNECT_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "automatic_return_routing": true,
          "description": "Tunnel for Interconnect to ORD",
          "interface_address": "192.0.2.0/31",
          "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
          "name": "pni_ord"
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
    "modified": true,
    "modified_interconnect": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "automatic_return_routing": true,
      "colo_name": "pni_ord",
      "created_on": "2017-06-14T00:00:00Z",
      "description": "Tunnel for Interconnect to ORD",
      "gre": {
        "cloudflare_endpoint": "203.0.113.1"
      },
      "health_check": {
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address": "192.0.2.0/31",
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "mtu": 0,
      "name": "pni_ord",
      "virtual_port_reservation_id": "c4a7362d577a6c3019a474fd6f485821"
    }
  },
  "success": true
}
```

## Update multiple interconnects

**put** `/accounts/{account_id}/magic/cf_interconnects`

Updates multiple interconnects associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { modified, modified_interconnects }`

  - `modified: optional boolean`

  - `modified_interconnects: optional array of object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf_interconnects \
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
    "modified": true,
    "modified_interconnects": [
      {
        "id": "c4a7362d577a6c3019a474fd6f485821",
        "automatic_return_routing": true,
        "colo_name": "pni_ord",
        "created_on": "2017-06-14T00:00:00Z",
        "description": "Tunnel for Interconnect to ORD",
        "gre": {
          "cloudflare_endpoint": "203.0.113.1"
        },
        "health_check": {
          "enabled": true,
          "rate": "low",
          "target": {
            "effective": "203.0.113.1",
            "saved": "203.0.113.1"
          },
          "type": "request"
        },
        "interface_address": "192.0.2.0/31",
        "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
        "modified_on": "2017-06-14T05:20:00Z",
        "mtu": 0,
        "name": "pni_ord",
        "virtual_port_reservation_id": "c4a7362d577a6c3019a474fd6f485821"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Cf Interconnect List Response

- `CfInterconnectListResponse object { interconnects }`

  - `interconnects: optional array of object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

### Cf Interconnect Get Response

- `CfInterconnectGetResponse object { interconnect }`

  - `interconnect: optional object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

### Cf Interconnect Update Response

- `CfInterconnectUpdateResponse object { modified, modified_interconnect }`

  - `modified: optional boolean`

  - `modified_interconnect: optional object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

### Cf Interconnect Bulk Update Response

- `CfInterconnectBulkUpdateResponse object { modified, modified_interconnects }`

  - `modified: optional boolean`

  - `modified_interconnects: optional array of object { id, automatic_return_routing, colo_name, 10 more }`

    - `id: optional string`

      Identifier

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `colo_name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the interconnect.

    - `gre: optional object { cloudflare_endpoint }`

      The configuration specific to GRE interconnects.

      - `cloudflare_endpoint: optional string`

        The IP address assigned to the Cloudflare side of the GRE tunnel created as part of the Interconnect.

    - `health_check: optional HealthCheck`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address: optional string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      The Maximum Transmission Unit (MTU) in bytes for the interconnect. The minimum value is 576.

    - `name: optional string`

      The name of the interconnect. The name cannot share a name with other tunnels.

    - `virtual_port_reservation_id: optional string`

      An identifier that correlates this interconnect with the corresponding V2 CNI interconnect resource.

# GRE Tunnels

## List GRE tunnels

**get** `/accounts/{account_id}/magic/gre_tunnels`

Lists GRE tunnels associated with an account.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { gre_tunnels }`

  - `gre_tunnels: optional array of object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/gre_tunnels \
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
    "gre_tunnels": [
      {
        "id": "c4a7362d577a6c3019a474fd6f485821",
        "cloudflare_gre_endpoint": "203.0.113.1",
        "customer_gre_endpoint": "203.0.113.1",
        "interface_address": "192.0.2.0/31",
        "name": "GRE_1",
        "automatic_return_routing": true,
        "bgp": {
          "customer_asn": 0,
          "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "extra_prefixes": [
            "string"
          ],
          "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "md5_key": "md5_key"
        },
        "bgp_status": {
          "state": "BGP_DOWN",
          "tcp_established": true,
          "updated_at": "2019-12-27T18:11:19.117Z",
          "bgp_state": "bgp_state",
          "cf_speaker_ip": "192.168.1.1",
          "cf_speaker_port": 1,
          "customer_speaker_ip": "192.168.1.1",
          "customer_speaker_port": 1
        },
        "created_on": "2017-06-14T00:00:00Z",
        "description": "Tunnel for ISP X",
        "health_check": {
          "direction": "bidirectional",
          "enabled": true,
          "rate": "low",
          "target": {
            "effective": "203.0.113.1",
            "saved": "203.0.113.1"
          },
          "type": "request"
        },
        "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
        "modified_on": "2017-06-14T05:20:00Z",
        "mtu": 0,
        "ttl": 0
      }
    ]
  },
  "success": true
}
```

## List GRE Tunnel Details

**get** `/accounts/{account_id}/magic/gre_tunnels/{gre_tunnel_id}`

Lists informtion for a specific GRE tunnel.

### Path Parameters

- `account_id: string`

  Identifier

- `gre_tunnel_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { gre_tunnel }`

  - `gre_tunnel: optional object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/gre_tunnels/$GRE_TUNNEL_ID \
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
    "gre_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_gre_endpoint": "203.0.113.1",
      "customer_gre_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "GRE_1",
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "mtu": 0,
      "ttl": 0
    }
  },
  "success": true
}
```

## Create a GRE tunnel

**post** `/accounts/{account_id}/magic/gre_tunnels`

Creates a new GRE tunnel. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

### Body Parameters

- `cloudflare_gre_endpoint: string`

  The IP address assigned to the Cloudflare side of the GRE tunnel.

- `customer_gre_endpoint: string`

  The IP address assigned to the customer side of the GRE tunnel.

- `interface_address: string`

  A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

- `name: string`

  The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

- `automatic_return_routing: optional boolean`

  True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

- `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

  - `customer_asn: number`

    ASN used on the customer end of the BGP session

  - `export_filter_id: optional string`

    ID of the BGP filter profile applied to routes advertised to the customer.

  - `extra_prefixes: optional array of string`

    Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

  - `import_filter_id: optional string`

    ID of the BGP filter profile applied to routes received from the customer.

  - `md5_key: optional string`

    MD5 key to use for session authentication.

    Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
    key is not treated as a secret value. This is *only* supported for preventing
    misconfiguration, not for defending against malicious attacks.

    The MD5 key, if set, must be of non-zero length and consist only of the following types of
    character:

    * ASCII alphanumerics: `[a-zA-Z0-9]`
    * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

    In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
    quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
    (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
    these disallowed characters will be rejected.

- `description: optional string`

  An optional description of the GRE tunnel.

- `health_check: optional object { direction, enabled, rate, 2 more }`

  - `direction: optional "unidirectional" or "bidirectional"`

    The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

    - `"unidirectional"`

    - `"bidirectional"`

  - `enabled: optional boolean`

    Determines whether to run healthchecks for a tunnel.

  - `rate: optional HealthCheckRate`

    How frequent the health check is run. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `target: optional object { effective, saved }  or string`

    The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

    - `MagicHealthCheckTarget object { effective, saved }`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

      - `effective: optional string`

        The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

      - `saved: optional string`

        The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

    - `string`

  - `type: optional HealthCheckType`

    The type of healthcheck to run, reply or request. The default value is `reply`.

    - `"reply"`

    - `"request"`

- `interface_address6: optional string`

  A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

- `mtu: optional number`

  Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

- `ttl: optional number`

  Time To Live (TTL) in number of hops of the GRE tunnel.

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

- `result: object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

  - `id: string`

    Identifier

  - `cloudflare_gre_endpoint: string`

    The IP address assigned to the Cloudflare side of the GRE tunnel.

  - `customer_gre_endpoint: string`

    The IP address assigned to the customer side of the GRE tunnel.

  - `interface_address: string`

    A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

  - `name: string`

    The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

  - `automatic_return_routing: optional boolean`

    True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

  - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

    - `customer_asn: number`

      ASN used on the customer end of the BGP session

    - `export_filter_id: optional string`

      ID of the BGP filter profile applied to routes advertised to the customer.

    - `extra_prefixes: optional array of string`

      Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

    - `import_filter_id: optional string`

      ID of the BGP filter profile applied to routes received from the customer.

    - `md5_key: optional string`

      MD5 key to use for session authentication.

      Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
      key is not treated as a secret value. This is *only* supported for preventing
      misconfiguration, not for defending against malicious attacks.

      The MD5 key, if set, must be of non-zero length and consist only of the following types of
      character:

      * ASCII alphanumerics: `[a-zA-Z0-9]`
      * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

      In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
      quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
      (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
      these disallowed characters will be rejected.

  - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

    - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

      - `"BGP_DOWN"`

      - `"BGP_UP"`

      - `"BGP_ESTABLISHING"`

    - `tcp_established: boolean`

    - `updated_at: string`

    - `bgp_state: optional string`

    - `cf_speaker_ip: optional string`

    - `cf_speaker_port: optional number`

    - `customer_speaker_ip: optional string`

    - `customer_speaker_port: optional number`

  - `created_on: optional string`

    The date and time the tunnel was created.

  - `description: optional string`

    An optional description of the GRE tunnel.

  - `health_check: optional object { direction, enabled, rate, 2 more }`

    - `direction: optional "unidirectional" or "bidirectional"`

      The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

      - `"unidirectional"`

      - `"bidirectional"`

    - `enabled: optional boolean`

      Determines whether to run healthchecks for a tunnel.

    - `rate: optional HealthCheckRate`

      How frequent the health check is run. The default value is `mid`.

      - `"low"`

      - `"mid"`

      - `"high"`

    - `target: optional object { effective, saved }  or string`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

      - `MagicHealthCheckTarget object { effective, saved }`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

        - `effective: optional string`

          The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

        - `saved: optional string`

          The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

      - `string`

    - `type: optional HealthCheckType`

      The type of healthcheck to run, reply or request. The default value is `reply`.

      - `"reply"`

      - `"request"`

  - `interface_address6: optional string`

    A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

  - `modified_on: optional string`

    The date and time the tunnel was last modified.

  - `mtu: optional number`

    Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

  - `ttl: optional number`

    Time To Live (TTL) in number of hops of the GRE tunnel.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/gre_tunnels \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cloudflare_gre_endpoint": "203.0.113.1",
          "customer_gre_endpoint": "203.0.113.1",
          "interface_address": "192.0.2.0/31",
          "name": "GRE_1",
          "automatic_return_routing": true,
          "description": "Tunnel for ISP X",
          "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127"
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
    "id": "c4a7362d577a6c3019a474fd6f485821",
    "cloudflare_gre_endpoint": "203.0.113.1",
    "customer_gre_endpoint": "203.0.113.1",
    "interface_address": "192.0.2.0/31",
    "name": "GRE_1",
    "automatic_return_routing": true,
    "bgp": {
      "customer_asn": 0,
      "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
      "extra_prefixes": [
        "string"
      ],
      "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
      "md5_key": "md5_key"
    },
    "bgp_status": {
      "state": "BGP_DOWN",
      "tcp_established": true,
      "updated_at": "2019-12-27T18:11:19.117Z",
      "bgp_state": "bgp_state",
      "cf_speaker_ip": "192.168.1.1",
      "cf_speaker_port": 1,
      "customer_speaker_ip": "192.168.1.1",
      "customer_speaker_port": 1
    },
    "created_on": "2017-06-14T00:00:00Z",
    "description": "Tunnel for ISP X",
    "health_check": {
      "direction": "bidirectional",
      "enabled": true,
      "rate": "low",
      "target": {
        "effective": "203.0.113.1",
        "saved": "203.0.113.1"
      },
      "type": "request"
    },
    "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
    "modified_on": "2017-06-14T05:20:00Z",
    "mtu": 0,
    "ttl": 0
  },
  "success": true
}
```

## Update GRE Tunnel

**put** `/accounts/{account_id}/magic/gre_tunnels/{gre_tunnel_id}`

Updates a specific GRE tunnel. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

- `gre_tunnel_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

### Body Parameters

- `cloudflare_gre_endpoint: string`

  The IP address assigned to the Cloudflare side of the GRE tunnel.

- `customer_gre_endpoint: string`

  The IP address assigned to the customer side of the GRE tunnel.

- `interface_address: string`

  A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

- `name: string`

  The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

- `automatic_return_routing: optional boolean`

  True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

- `description: optional string`

  An optional description of the GRE tunnel.

- `health_check: optional object { direction, enabled, rate, 2 more }`

  - `direction: optional "unidirectional" or "bidirectional"`

    The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

    - `"unidirectional"`

    - `"bidirectional"`

  - `enabled: optional boolean`

    Determines whether to run healthchecks for a tunnel.

  - `rate: optional HealthCheckRate`

    How frequent the health check is run. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `target: optional object { effective, saved }  or string`

    The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

    - `MagicHealthCheckTarget object { effective, saved }`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

      - `effective: optional string`

        The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

      - `saved: optional string`

        The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

    - `string`

  - `type: optional HealthCheckType`

    The type of healthcheck to run, reply or request. The default value is `reply`.

    - `"reply"`

    - `"request"`

- `interface_address6: optional string`

  A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

- `mtu: optional number`

  Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

- `ttl: optional number`

  Time To Live (TTL) in number of hops of the GRE tunnel.

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

- `result: object { modified, modified_gre_tunnel }`

  - `modified: optional boolean`

  - `modified_gre_tunnel: optional object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/gre_tunnels/$GRE_TUNNEL_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cloudflare_gre_endpoint": "203.0.113.1",
          "customer_gre_endpoint": "203.0.113.1",
          "interface_address": "192.0.2.0/31",
          "name": "GRE_1",
          "automatic_return_routing": true,
          "description": "Tunnel for ISP X",
          "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127"
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
    "modified": true,
    "modified_gre_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_gre_endpoint": "203.0.113.1",
      "customer_gre_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "GRE_1",
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "mtu": 0,
      "ttl": 0
    }
  },
  "success": true
}
```

## Delete GRE Tunnel

**delete** `/accounts/{account_id}/magic/gre_tunnels/{gre_tunnel_id}`

Disables and removes a specific static GRE tunnel. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

- `gre_tunnel_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { deleted, deleted_gre_tunnel }`

  - `deleted: optional boolean`

  - `deleted_gre_tunnel: optional object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/gre_tunnels/$GRE_TUNNEL_ID \
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
    "deleted": true,
    "deleted_gre_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_gre_endpoint": "203.0.113.1",
      "customer_gre_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "GRE_1",
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "mtu": 0,
      "ttl": 0
    }
  },
  "success": true
}
```

## Update multiple GRE tunnels

**put** `/accounts/{account_id}/magic/gre_tunnels`

Updates multiple GRE tunnels. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { modified, modified_gre_tunnels }`

  - `modified: optional boolean`

  - `modified_gre_tunnels: optional array of object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/gre_tunnels \
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
    "modified": true,
    "modified_gre_tunnels": [
      {
        "id": "c4a7362d577a6c3019a474fd6f485821",
        "cloudflare_gre_endpoint": "203.0.113.1",
        "customer_gre_endpoint": "203.0.113.1",
        "interface_address": "192.0.2.0/31",
        "name": "GRE_1",
        "automatic_return_routing": true,
        "bgp": {
          "customer_asn": 0,
          "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "extra_prefixes": [
            "string"
          ],
          "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "md5_key": "md5_key"
        },
        "bgp_status": {
          "state": "BGP_DOWN",
          "tcp_established": true,
          "updated_at": "2019-12-27T18:11:19.117Z",
          "bgp_state": "bgp_state",
          "cf_speaker_ip": "192.168.1.1",
          "cf_speaker_port": 1,
          "customer_speaker_ip": "192.168.1.1",
          "customer_speaker_port": 1
        },
        "created_on": "2017-06-14T00:00:00Z",
        "description": "Tunnel for ISP X",
        "health_check": {
          "direction": "bidirectional",
          "enabled": true,
          "rate": "low",
          "target": {
            "effective": "203.0.113.1",
            "saved": "203.0.113.1"
          },
          "type": "request"
        },
        "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
        "modified_on": "2017-06-14T05:20:00Z",
        "mtu": 0,
        "ttl": 0
      }
    ]
  },
  "success": true
}
```

## Domain Types

### GRE Tunnel List Response

- `GRETunnelListResponse object { gre_tunnels }`

  - `gre_tunnels: optional array of object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

### GRE Tunnel Get Response

- `GRETunnelGetResponse object { gre_tunnel }`

  - `gre_tunnel: optional object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

### GRE Tunnel Create Response

- `GRETunnelCreateResponse object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

  - `id: string`

    Identifier

  - `cloudflare_gre_endpoint: string`

    The IP address assigned to the Cloudflare side of the GRE tunnel.

  - `customer_gre_endpoint: string`

    The IP address assigned to the customer side of the GRE tunnel.

  - `interface_address: string`

    A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

  - `name: string`

    The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

  - `automatic_return_routing: optional boolean`

    True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

  - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

    - `customer_asn: number`

      ASN used on the customer end of the BGP session

    - `export_filter_id: optional string`

      ID of the BGP filter profile applied to routes advertised to the customer.

    - `extra_prefixes: optional array of string`

      Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

    - `import_filter_id: optional string`

      ID of the BGP filter profile applied to routes received from the customer.

    - `md5_key: optional string`

      MD5 key to use for session authentication.

      Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
      key is not treated as a secret value. This is *only* supported for preventing
      misconfiguration, not for defending against malicious attacks.

      The MD5 key, if set, must be of non-zero length and consist only of the following types of
      character:

      * ASCII alphanumerics: `[a-zA-Z0-9]`
      * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

      In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
      quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
      (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
      these disallowed characters will be rejected.

  - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

    - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

      - `"BGP_DOWN"`

      - `"BGP_UP"`

      - `"BGP_ESTABLISHING"`

    - `tcp_established: boolean`

    - `updated_at: string`

    - `bgp_state: optional string`

    - `cf_speaker_ip: optional string`

    - `cf_speaker_port: optional number`

    - `customer_speaker_ip: optional string`

    - `customer_speaker_port: optional number`

  - `created_on: optional string`

    The date and time the tunnel was created.

  - `description: optional string`

    An optional description of the GRE tunnel.

  - `health_check: optional object { direction, enabled, rate, 2 more }`

    - `direction: optional "unidirectional" or "bidirectional"`

      The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

      - `"unidirectional"`

      - `"bidirectional"`

    - `enabled: optional boolean`

      Determines whether to run healthchecks for a tunnel.

    - `rate: optional HealthCheckRate`

      How frequent the health check is run. The default value is `mid`.

      - `"low"`

      - `"mid"`

      - `"high"`

    - `target: optional object { effective, saved }  or string`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

      - `MagicHealthCheckTarget object { effective, saved }`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

        - `effective: optional string`

          The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

        - `saved: optional string`

          The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

      - `string`

    - `type: optional HealthCheckType`

      The type of healthcheck to run, reply or request. The default value is `reply`.

      - `"reply"`

      - `"request"`

  - `interface_address6: optional string`

    A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

  - `modified_on: optional string`

    The date and time the tunnel was last modified.

  - `mtu: optional number`

    Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

  - `ttl: optional number`

    Time To Live (TTL) in number of hops of the GRE tunnel.

### GRE Tunnel Update Response

- `GRETunnelUpdateResponse object { modified, modified_gre_tunnel }`

  - `modified: optional boolean`

  - `modified_gre_tunnel: optional object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

### GRE Tunnel Delete Response

- `GRETunnelDeleteResponse object { deleted, deleted_gre_tunnel }`

  - `deleted: optional boolean`

  - `deleted_gre_tunnel: optional object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

### GRE Tunnel Bulk Update Response

- `GRETunnelBulkUpdateResponse object { modified, modified_gre_tunnels }`

  - `modified: optional boolean`

  - `modified_gre_tunnels: optional array of object { id, cloudflare_gre_endpoint, customer_gre_endpoint, 12 more }`

    - `id: string`

      Identifier

    - `cloudflare_gre_endpoint: string`

      The IP address assigned to the Cloudflare side of the GRE tunnel.

    - `customer_gre_endpoint: string`

      The IP address assigned to the customer side of the GRE tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the tunnel. The name cannot contain spaces or special characters, must be 15 characters or less, and cannot share a name with another GRE tunnel.

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `description: optional string`

      An optional description of the GRE tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `mtu: optional number`

      Maximum Transmission Unit (MTU) in bytes for the GRE tunnel. The minimum value is 576.

    - `ttl: optional number`

      Time To Live (TTL) in number of hops of the GRE tunnel.

# IPSEC Tunnels

## List IPsec tunnels

**get** `/accounts/{account_id}/magic/ipsec_tunnels`

Lists IPsec tunnels associated with an account.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { ipsec_tunnels }`

  - `ipsec_tunnels: optional array of object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels \
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
    "ipsec_tunnels": [
      {
        "id": "c4a7362d577a6c3019a474fd6f485821",
        "cloudflare_endpoint": "203.0.113.1",
        "interface_address": "192.0.2.0/31",
        "name": "IPsec_1",
        "allow_null_cipher": true,
        "automatic_return_routing": true,
        "bgp": {
          "customer_asn": 0,
          "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "extra_prefixes": [
            "string"
          ],
          "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "md5_key": "md5_key"
        },
        "bgp_status": {
          "state": "BGP_DOWN",
          "tcp_established": true,
          "updated_at": "2019-12-27T18:11:19.117Z",
          "bgp_state": "bgp_state",
          "cf_speaker_ip": "192.168.1.1",
          "cf_speaker_port": 1,
          "customer_speaker_ip": "192.168.1.1",
          "customer_speaker_port": 1
        },
        "created_on": "2017-06-14T00:00:00Z",
        "custom_remote_identities": {
          "fqdn_id": "fqdn_id"
        },
        "customer_endpoint": "203.0.113.1",
        "description": "Tunnel for ISP X",
        "health_check": {
          "direction": "bidirectional",
          "enabled": true,
          "rate": "low",
          "target": {
            "effective": "203.0.113.1",
            "saved": "203.0.113.1"
          },
          "type": "request"
        },
        "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
        "modified_on": "2017-06-14T05:20:00Z",
        "psk_metadata": {
          "last_generated_on": "2017-06-14T05:20:00Z"
        },
        "replay_protection": false
      }
    ]
  },
  "success": true
}
```

## List IPsec tunnel details

**get** `/accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}`

Lists details for a specific IPsec tunnel.

### Path Parameters

- `account_id: string`

  Identifier

- `ipsec_tunnel_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { ipsec_tunnel }`

  - `ipsec_tunnel: optional object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/$IPSEC_TUNNEL_ID \
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
    "ipsec_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "IPsec_1",
      "allow_null_cipher": true,
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "custom_remote_identities": {
        "fqdn_id": "fqdn_id"
      },
      "customer_endpoint": "203.0.113.1",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "psk_metadata": {
        "last_generated_on": "2017-06-14T05:20:00Z"
      },
      "replay_protection": false
    }
  },
  "success": true
}
```

## Create an IPsec tunnel

**post** `/accounts/{account_id}/magic/ipsec_tunnels`

Creates a new IPsec tunnel associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

### Body Parameters

- `cloudflare_endpoint: string`

  The IP address assigned to the Cloudflare side of the IPsec tunnel.

- `interface_address: string`

  A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

- `name: string`

  The name of the IPsec tunnel. The name cannot share a name with other tunnels.

- `automatic_return_routing: optional boolean`

  True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

- `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

  - `customer_asn: number`

    ASN used on the customer end of the BGP session

  - `export_filter_id: optional string`

    ID of the BGP filter profile applied to routes advertised to the customer.

  - `extra_prefixes: optional array of string`

    Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

  - `import_filter_id: optional string`

    ID of the BGP filter profile applied to routes received from the customer.

  - `md5_key: optional string`

    MD5 key to use for session authentication.

    Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
    key is not treated as a secret value. This is *only* supported for preventing
    misconfiguration, not for defending against malicious attacks.

    The MD5 key, if set, must be of non-zero length and consist only of the following types of
    character:

    * ASCII alphanumerics: `[a-zA-Z0-9]`
    * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

    In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
    quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
    (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
    these disallowed characters will be rejected.

- `custom_remote_identities: optional object { fqdn_id }`

  - `fqdn_id: optional string`

    A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
    generated IKE IDs can still be used even if this custom value is specified.

    Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

    This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
    fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
    cannot have the same cloudflare_endpoint.

- `customer_endpoint: optional string`

  The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

- `description: optional string`

  An optional description forthe IPsec tunnel.

- `health_check: optional object { direction, enabled, rate, 2 more }`

  - `direction: optional "unidirectional" or "bidirectional"`

    The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

    - `"unidirectional"`

    - `"bidirectional"`

  - `enabled: optional boolean`

    Determines whether to run healthchecks for a tunnel.

  - `rate: optional HealthCheckRate`

    How frequent the health check is run. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `target: optional object { effective, saved }  or string`

    The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

    - `MagicHealthCheckTarget object { effective, saved }`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

      - `effective: optional string`

        The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

      - `saved: optional string`

        The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

    - `string`

  - `type: optional HealthCheckType`

    The type of healthcheck to run, reply or request. The default value is `reply`.

    - `"reply"`

    - `"request"`

- `interface_address6: optional string`

  A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

- `psk: optional string`

  A randomly generated or provided string for use in the IPsec tunnel.

- `replay_protection: optional boolean`

  If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

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

- `result: object { id, cloudflare_endpoint, interface_address, 14 more }`

  - `id: string`

    Identifier

  - `cloudflare_endpoint: string`

    The IP address assigned to the Cloudflare side of the IPsec tunnel.

  - `interface_address: string`

    A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

  - `name: string`

    The name of the IPsec tunnel. The name cannot share a name with other tunnels.

  - `allow_null_cipher: optional boolean`

    When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

  - `automatic_return_routing: optional boolean`

    True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

  - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

    - `customer_asn: number`

      ASN used on the customer end of the BGP session

    - `export_filter_id: optional string`

      ID of the BGP filter profile applied to routes advertised to the customer.

    - `extra_prefixes: optional array of string`

      Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

    - `import_filter_id: optional string`

      ID of the BGP filter profile applied to routes received from the customer.

    - `md5_key: optional string`

      MD5 key to use for session authentication.

      Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
      key is not treated as a secret value. This is *only* supported for preventing
      misconfiguration, not for defending against malicious attacks.

      The MD5 key, if set, must be of non-zero length and consist only of the following types of
      character:

      * ASCII alphanumerics: `[a-zA-Z0-9]`
      * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

      In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
      quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
      (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
      these disallowed characters will be rejected.

  - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

    - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

      - `"BGP_DOWN"`

      - `"BGP_UP"`

      - `"BGP_ESTABLISHING"`

    - `tcp_established: boolean`

    - `updated_at: string`

    - `bgp_state: optional string`

    - `cf_speaker_ip: optional string`

    - `cf_speaker_port: optional number`

    - `customer_speaker_ip: optional string`

    - `customer_speaker_port: optional number`

  - `created_on: optional string`

    The date and time the tunnel was created.

  - `custom_remote_identities: optional object { fqdn_id }`

    - `fqdn_id: optional string`

      A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
      generated IKE IDs can still be used even if this custom value is specified.

      Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

      This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
      fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
      cannot have the same cloudflare_endpoint.

  - `customer_endpoint: optional string`

    The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

  - `description: optional string`

    An optional description forthe IPsec tunnel.

  - `health_check: optional object { direction, enabled, rate, 2 more }`

    - `direction: optional "unidirectional" or "bidirectional"`

      The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

      - `"unidirectional"`

      - `"bidirectional"`

    - `enabled: optional boolean`

      Determines whether to run healthchecks for a tunnel.

    - `rate: optional HealthCheckRate`

      How frequent the health check is run. The default value is `mid`.

      - `"low"`

      - `"mid"`

      - `"high"`

    - `target: optional object { effective, saved }  or string`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

      - `MagicHealthCheckTarget object { effective, saved }`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

        - `effective: optional string`

          The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

        - `saved: optional string`

          The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

      - `string`

    - `type: optional HealthCheckType`

      The type of healthcheck to run, reply or request. The default value is `reply`.

      - `"reply"`

      - `"request"`

  - `interface_address6: optional string`

    A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

  - `modified_on: optional string`

    The date and time the tunnel was last modified.

  - `psk_metadata: optional PSKMetadata`

    The PSK metadata that includes when the PSK was generated.

    - `last_generated_on: optional string`

      The date and time the tunnel was last modified.

  - `replay_protection: optional boolean`

    If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cloudflare_endpoint": "203.0.113.1",
          "interface_address": "192.0.2.0/31",
          "name": "IPsec_1",
          "automatic_return_routing": true,
          "customer_endpoint": "203.0.113.1",
          "description": "Tunnel for ISP X",
          "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
          "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy"
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
    "id": "c4a7362d577a6c3019a474fd6f485821",
    "cloudflare_endpoint": "203.0.113.1",
    "interface_address": "192.0.2.0/31",
    "name": "IPsec_1",
    "allow_null_cipher": true,
    "automatic_return_routing": true,
    "bgp": {
      "customer_asn": 0,
      "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
      "extra_prefixes": [
        "string"
      ],
      "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
      "md5_key": "md5_key"
    },
    "bgp_status": {
      "state": "BGP_DOWN",
      "tcp_established": true,
      "updated_at": "2019-12-27T18:11:19.117Z",
      "bgp_state": "bgp_state",
      "cf_speaker_ip": "192.168.1.1",
      "cf_speaker_port": 1,
      "customer_speaker_ip": "192.168.1.1",
      "customer_speaker_port": 1
    },
    "created_on": "2017-06-14T00:00:00Z",
    "custom_remote_identities": {
      "fqdn_id": "fqdn_id"
    },
    "customer_endpoint": "203.0.113.1",
    "description": "Tunnel for ISP X",
    "health_check": {
      "direction": "bidirectional",
      "enabled": true,
      "rate": "low",
      "target": {
        "effective": "203.0.113.1",
        "saved": "203.0.113.1"
      },
      "type": "request"
    },
    "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
    "modified_on": "2017-06-14T05:20:00Z",
    "psk_metadata": {
      "last_generated_on": "2017-06-14T05:20:00Z"
    },
    "replay_protection": false
  },
  "success": true
}
```

## Update IPsec Tunnel

**put** `/accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}`

Updates a specific IPsec tunnel associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

- `ipsec_tunnel_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

### Body Parameters

- `cloudflare_endpoint: string`

  The IP address assigned to the Cloudflare side of the IPsec tunnel.

- `interface_address: string`

  A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

- `name: string`

  The name of the IPsec tunnel. The name cannot share a name with other tunnels.

- `automatic_return_routing: optional boolean`

  True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

- `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

  - `customer_asn: number`

    ASN used on the customer end of the BGP session

  - `export_filter_id: optional string`

    ID of the BGP filter profile applied to routes advertised to the customer.

  - `extra_prefixes: optional array of string`

    Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

  - `import_filter_id: optional string`

    ID of the BGP filter profile applied to routes received from the customer.

  - `md5_key: optional string`

    MD5 key to use for session authentication.

    Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
    key is not treated as a secret value. This is *only* supported for preventing
    misconfiguration, not for defending against malicious attacks.

    The MD5 key, if set, must be of non-zero length and consist only of the following types of
    character:

    * ASCII alphanumerics: `[a-zA-Z0-9]`
    * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

    In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
    quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
    (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
    these disallowed characters will be rejected.

- `custom_remote_identities: optional object { fqdn_id }`

  - `fqdn_id: optional string`

    A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
    generated IKE IDs can still be used even if this custom value is specified.

    Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

    This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
    fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
    cannot have the same cloudflare_endpoint.

- `customer_endpoint: optional string`

  The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

- `description: optional string`

  An optional description forthe IPsec tunnel.

- `health_check: optional object { direction, enabled, rate, 2 more }`

  - `direction: optional "unidirectional" or "bidirectional"`

    The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

    - `"unidirectional"`

    - `"bidirectional"`

  - `enabled: optional boolean`

    Determines whether to run healthchecks for a tunnel.

  - `rate: optional HealthCheckRate`

    How frequent the health check is run. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `target: optional object { effective, saved }  or string`

    The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

    - `MagicHealthCheckTarget object { effective, saved }`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

      - `effective: optional string`

        The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

      - `saved: optional string`

        The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

    - `string`

  - `type: optional HealthCheckType`

    The type of healthcheck to run, reply or request. The default value is `reply`.

    - `"reply"`

    - `"request"`

- `interface_address6: optional string`

  A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

- `psk: optional string`

  A randomly generated or provided string for use in the IPsec tunnel.

- `replay_protection: optional boolean`

  If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

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

- `result: object { modified, modified_ipsec_tunnel }`

  - `modified: optional boolean`

  - `modified_ipsec_tunnel: optional object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/$IPSEC_TUNNEL_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "cloudflare_endpoint": "203.0.113.1",
          "interface_address": "192.0.2.0/31",
          "name": "IPsec_1",
          "automatic_return_routing": true,
          "customer_endpoint": "203.0.113.1",
          "description": "Tunnel for ISP X",
          "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
          "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy"
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
    "modified": true,
    "modified_ipsec_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "IPsec_1",
      "allow_null_cipher": true,
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "custom_remote_identities": {
        "fqdn_id": "fqdn_id"
      },
      "customer_endpoint": "203.0.113.1",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "psk_metadata": {
        "last_generated_on": "2017-06-14T05:20:00Z"
      },
      "replay_protection": false
    }
  },
  "success": true
}
```

## Delete IPsec Tunnel

**delete** `/accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}`

Disables and removes a specific static IPsec Tunnel associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

- `ipsec_tunnel_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { deleted, deleted_ipsec_tunnel }`

  - `deleted: optional boolean`

  - `deleted_ipsec_tunnel: optional object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/$IPSEC_TUNNEL_ID \
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
    "deleted": true,
    "deleted_ipsec_tunnel": {
      "id": "c4a7362d577a6c3019a474fd6f485821",
      "cloudflare_endpoint": "203.0.113.1",
      "interface_address": "192.0.2.0/31",
      "name": "IPsec_1",
      "allow_null_cipher": true,
      "automatic_return_routing": true,
      "bgp": {
        "customer_asn": 0,
        "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "extra_prefixes": [
          "string"
        ],
        "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
        "md5_key": "md5_key"
      },
      "bgp_status": {
        "state": "BGP_DOWN",
        "tcp_established": true,
        "updated_at": "2019-12-27T18:11:19.117Z",
        "bgp_state": "bgp_state",
        "cf_speaker_ip": "192.168.1.1",
        "cf_speaker_port": 1,
        "customer_speaker_ip": "192.168.1.1",
        "customer_speaker_port": 1
      },
      "created_on": "2017-06-14T00:00:00Z",
      "custom_remote_identities": {
        "fqdn_id": "fqdn_id"
      },
      "customer_endpoint": "203.0.113.1",
      "description": "Tunnel for ISP X",
      "health_check": {
        "direction": "bidirectional",
        "enabled": true,
        "rate": "low",
        "target": {
          "effective": "203.0.113.1",
          "saved": "203.0.113.1"
        },
        "type": "request"
      },
      "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
      "modified_on": "2017-06-14T05:20:00Z",
      "psk_metadata": {
        "last_generated_on": "2017-06-14T05:20:00Z"
      },
      "replay_protection": false
    }
  },
  "success": true
}
```

## Update multiple IPsec tunnels

**put** `/accounts/{account_id}/magic/ipsec_tunnels`

Update multiple IPsec tunnels associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: object { modified, modified_ipsec_tunnels }`

  - `modified: optional boolean`

  - `modified_ipsec_tunnels: optional array of object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels \
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
    "modified": true,
    "modified_ipsec_tunnels": [
      {
        "id": "c4a7362d577a6c3019a474fd6f485821",
        "cloudflare_endpoint": "203.0.113.1",
        "interface_address": "192.0.2.0/31",
        "name": "IPsec_1",
        "allow_null_cipher": true,
        "automatic_return_routing": true,
        "bgp": {
          "customer_asn": 0,
          "export_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "extra_prefixes": [
            "string"
          ],
          "import_filter_id": "a1b2c3d4e5f647890a1b2c3d4e5f6789",
          "md5_key": "md5_key"
        },
        "bgp_status": {
          "state": "BGP_DOWN",
          "tcp_established": true,
          "updated_at": "2019-12-27T18:11:19.117Z",
          "bgp_state": "bgp_state",
          "cf_speaker_ip": "192.168.1.1",
          "cf_speaker_port": 1,
          "customer_speaker_ip": "192.168.1.1",
          "customer_speaker_port": 1
        },
        "created_on": "2017-06-14T00:00:00Z",
        "custom_remote_identities": {
          "fqdn_id": "fqdn_id"
        },
        "customer_endpoint": "203.0.113.1",
        "description": "Tunnel for ISP X",
        "health_check": {
          "direction": "bidirectional",
          "enabled": true,
          "rate": "low",
          "target": {
            "effective": "203.0.113.1",
            "saved": "203.0.113.1"
          },
          "type": "request"
        },
        "interface_address6": "2606:54c1:7:0:a9fe:12d2:1:200/127",
        "modified_on": "2017-06-14T05:20:00Z",
        "psk_metadata": {
          "last_generated_on": "2017-06-14T05:20:00Z"
        },
        "replay_protection": false
      }
    ]
  },
  "success": true
}
```

## Generate Pre-Shared Key (PSK) for IPsec tunnels

**post** `/accounts/{account_id}/magic/ipsec_tunnels/{ipsec_tunnel_id}/psk_generate`

Generates a Pre-Shared Key for a specific IPsec tunnel used in the IKE session. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes. After a PSK is generated, the PSK is immediately persisted to Cloudflare's edge and cannot be retrieved later. Store the PSK in a safe place.

### Path Parameters

- `account_id: string`

  Identifier

- `ipsec_tunnel_id: string`

  Identifier

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

- `result: object { ipsec_tunnel_id, psk, psk_metadata }`

  - `ipsec_tunnel_id: optional string`

    Identifier

  - `psk: optional string`

    A randomly generated or provided string for use in the IPsec tunnel.

  - `psk_metadata: optional PSKMetadata`

    The PSK metadata that includes when the PSK was generated.

    - `last_generated_on: optional string`

      The date and time the tunnel was last modified.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/$IPSEC_TUNNEL_ID/psk_generate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
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
    "ipsec_tunnel_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy",
    "psk_metadata": {
      "last_generated_on": "2017-06-14T05:20:00Z"
    }
  },
  "success": true
}
```

## Set Pre-Shared Keys (PSK) for IPsec tunnels

**post** `/accounts/{account_id}/magic/ipsec_tunnels/psk`

Sets Pre-Shared Keys for multiple IPsec tunnels associated with an account. Use `?validate_only=true` as an optional query parameter to only run validation without persisting changes. After PSKs are applied, they are immediately persisted to Cloudflare's edge and cannot be retrieved later. Store the PSKs in a safe place.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `validate_only: optional boolean`

  If `true`, only run validation without persisting changes.

### Body Parameters

- `psks: array of object { id, psk }`

  List of tunnel ID and PSK pairs.

  - `id: string`

    The ID of the IPsec tunnel.

  - `psk: string`

    A randomly generated or provided string for use in the IPsec tunnel.

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

- `result: object { successfully_applied_psks, unapplied_psks }`

  - `successfully_applied_psks: optional map[object { ipsec_id, ipsec_tunnel_id, psk, psk_metadata } ]`

    Map of tunnel IDs to successfully applied PSK details.

    - `ipsec_id: string`

      The IKE identifier used for this tunnel on the Cloudflare edge.

    - `ipsec_tunnel_id: string`

      Identifier

    - `psk: string`

      A randomly generated or provided string for use in the IPsec tunnel.

    - `psk_metadata: PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

  - `unapplied_psks: optional map[string]`

    Map of tunnel IDs to failure reasons for PSKs that could not be applied.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/ipsec_tunnels/psk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "psks": [
            {
              "id": "023e105f4ecef8ad9ca31a8372d0c353",
              "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy"
            }
          ]
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
    "successfully_applied_psks": {
      "foo": {
        "ipsec_id": "12345_abc123def4567890abcdef1234567890",
        "ipsec_tunnel_id": "023e105f4ecef8ad9ca31a8372d0c353",
        "psk": "O3bwKSjnaoCxDoUxjcq4Rk8ZKkezQUiy",
        "psk_metadata": {
          "last_generated_on": "2017-06-14T05:20:00Z"
        }
      }
    },
    "unapplied_psks": {
      "foo": "string"
    }
  },
  "success": true
}
```

## Domain Types

### PSK Metadata

- `PSKMetadata object { last_generated_on }`

  The PSK metadata that includes when the PSK was generated.

  - `last_generated_on: optional string`

    The date and time the tunnel was last modified.

### IPSEC Tunnel List Response

- `IPSECTunnelListResponse object { ipsec_tunnels }`

  - `ipsec_tunnels: optional array of object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

### IPSEC Tunnel Get Response

- `IPSECTunnelGetResponse object { ipsec_tunnel }`

  - `ipsec_tunnel: optional object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

### IPSEC Tunnel Create Response

- `IPSECTunnelCreateResponse object { id, cloudflare_endpoint, interface_address, 14 more }`

  - `id: string`

    Identifier

  - `cloudflare_endpoint: string`

    The IP address assigned to the Cloudflare side of the IPsec tunnel.

  - `interface_address: string`

    A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

  - `name: string`

    The name of the IPsec tunnel. The name cannot share a name with other tunnels.

  - `allow_null_cipher: optional boolean`

    When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

  - `automatic_return_routing: optional boolean`

    True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

  - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

    - `customer_asn: number`

      ASN used on the customer end of the BGP session

    - `export_filter_id: optional string`

      ID of the BGP filter profile applied to routes advertised to the customer.

    - `extra_prefixes: optional array of string`

      Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

    - `import_filter_id: optional string`

      ID of the BGP filter profile applied to routes received from the customer.

    - `md5_key: optional string`

      MD5 key to use for session authentication.

      Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
      key is not treated as a secret value. This is *only* supported for preventing
      misconfiguration, not for defending against malicious attacks.

      The MD5 key, if set, must be of non-zero length and consist only of the following types of
      character:

      * ASCII alphanumerics: `[a-zA-Z0-9]`
      * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

      In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
      quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
      (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
      these disallowed characters will be rejected.

  - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

    - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

      - `"BGP_DOWN"`

      - `"BGP_UP"`

      - `"BGP_ESTABLISHING"`

    - `tcp_established: boolean`

    - `updated_at: string`

    - `bgp_state: optional string`

    - `cf_speaker_ip: optional string`

    - `cf_speaker_port: optional number`

    - `customer_speaker_ip: optional string`

    - `customer_speaker_port: optional number`

  - `created_on: optional string`

    The date and time the tunnel was created.

  - `custom_remote_identities: optional object { fqdn_id }`

    - `fqdn_id: optional string`

      A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
      generated IKE IDs can still be used even if this custom value is specified.

      Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

      This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
      fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
      cannot have the same cloudflare_endpoint.

  - `customer_endpoint: optional string`

    The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

  - `description: optional string`

    An optional description forthe IPsec tunnel.

  - `health_check: optional object { direction, enabled, rate, 2 more }`

    - `direction: optional "unidirectional" or "bidirectional"`

      The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

      - `"unidirectional"`

      - `"bidirectional"`

    - `enabled: optional boolean`

      Determines whether to run healthchecks for a tunnel.

    - `rate: optional HealthCheckRate`

      How frequent the health check is run. The default value is `mid`.

      - `"low"`

      - `"mid"`

      - `"high"`

    - `target: optional object { effective, saved }  or string`

      The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

      - `MagicHealthCheckTarget object { effective, saved }`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

        - `effective: optional string`

          The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

        - `saved: optional string`

          The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

      - `string`

    - `type: optional HealthCheckType`

      The type of healthcheck to run, reply or request. The default value is `reply`.

      - `"reply"`

      - `"request"`

  - `interface_address6: optional string`

    A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

  - `modified_on: optional string`

    The date and time the tunnel was last modified.

  - `psk_metadata: optional PSKMetadata`

    The PSK metadata that includes when the PSK was generated.

    - `last_generated_on: optional string`

      The date and time the tunnel was last modified.

  - `replay_protection: optional boolean`

    If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

### IPSEC Tunnel Update Response

- `IPSECTunnelUpdateResponse object { modified, modified_ipsec_tunnel }`

  - `modified: optional boolean`

  - `modified_ipsec_tunnel: optional object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

### IPSEC Tunnel Delete Response

- `IPSECTunnelDeleteResponse object { deleted, deleted_ipsec_tunnel }`

  - `deleted: optional boolean`

  - `deleted_ipsec_tunnel: optional object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

### IPSEC Tunnel Bulk Update Response

- `IPSECTunnelBulkUpdateResponse object { modified, modified_ipsec_tunnels }`

  - `modified: optional boolean`

  - `modified_ipsec_tunnels: optional array of object { id, cloudflare_endpoint, interface_address, 14 more }`

    - `id: string`

      Identifier

    - `cloudflare_endpoint: string`

      The IP address assigned to the Cloudflare side of the IPsec tunnel.

    - `interface_address: string`

      A 31-bit prefix (/31 in CIDR notation) supporting two hosts, one for each side of the tunnel. Select the subnet from the following private IP space: 10.0.0.0–10.255.255.255, 172.16.0.0–172.31.255.255, 192.168.0.0–192.168.255.255.

    - `name: string`

      The name of the IPsec tunnel. The name cannot share a name with other tunnels.

    - `allow_null_cipher: optional boolean`

      When `true`, the tunnel can use a null-cipher (`ENCR_NULL`) in the ESP tunnel (Phase 2).

    - `automatic_return_routing: optional boolean`

      True if automatic stateful return routing should be enabled for a tunnel, false otherwise. Requires the `coupler_integration` account flag to be enabled; requests setting this to `true` without that flag will be rejected.

    - `bgp: optional object { customer_asn, export_filter_id, extra_prefixes, 2 more }`

      - `customer_asn: number`

        ASN used on the customer end of the BGP session

      - `export_filter_id: optional string`

        ID of the BGP filter profile applied to routes advertised to the customer.

      - `extra_prefixes: optional array of string`

        Prefixes in this list will be advertised to the customer device, in addition to the routes in the Magic routing table.

      - `import_filter_id: optional string`

        ID of the BGP filter profile applied to routes received from the customer.

      - `md5_key: optional string`

        MD5 key to use for session authentication.

        Note that *this is not a security measure*. MD5 is not a valid security mechanism, and the
        key is not treated as a secret value. This is *only* supported for preventing
        misconfiguration, not for defending against malicious attacks.

        The MD5 key, if set, must be of non-zero length and consist only of the following types of
        character:

        * ASCII alphanumerics: `[a-zA-Z0-9]`
        * Special characters in the set `'!@#$%^&*()+[]{}<>/.,;:_-~`= |`

        In other words, MD5 keys may contain any printable ASCII character aside from newline (0x0A),
        quotation mark (`"`), vertical tab (0x0B), carriage return (0x0D), tab (0x09), form feed
        (0x0C), and the question mark (`?`). Requests specifying an MD5 key with one or more of
        these disallowed characters will be rejected.

    - `bgp_status: optional object { state, tcp_established, updated_at, 5 more }`

      - `state: "BGP_DOWN" or "BGP_UP" or "BGP_ESTABLISHING"`

        - `"BGP_DOWN"`

        - `"BGP_UP"`

        - `"BGP_ESTABLISHING"`

      - `tcp_established: boolean`

      - `updated_at: string`

      - `bgp_state: optional string`

      - `cf_speaker_ip: optional string`

      - `cf_speaker_port: optional number`

      - `customer_speaker_ip: optional string`

      - `customer_speaker_port: optional number`

    - `created_on: optional string`

      The date and time the tunnel was created.

    - `custom_remote_identities: optional object { fqdn_id }`

      - `fqdn_id: optional string`

        A custom IKE ID of type FQDN that may be used to identity the IPsec tunnel. The
        generated IKE IDs can still be used even if this custom value is specified.

        Must be of the form `<custom label>.<account ID>.custom.ipsec.cloudflare.com`.

        This custom ID does not need to be unique. Two IPsec tunnels may have the same custom
        fqdn_id. However, if another IPsec tunnel has the same value then the two tunnels
        cannot have the same cloudflare_endpoint.

    - `customer_endpoint: optional string`

      The IP address assigned to the customer side of the IPsec tunnel. Not required, but must be set for proactive traceroutes to work.

    - `description: optional string`

      An optional description forthe IPsec tunnel.

    - `health_check: optional object { direction, enabled, rate, 2 more }`

      - `direction: optional "unidirectional" or "bidirectional"`

        The direction of the flow of the healthcheck. Either unidirectional, where the probe comes to you via the tunnel and the result comes back to Cloudflare via the open Internet, or bidirectional where both the probe and result come and go via the tunnel.

        - `"unidirectional"`

        - `"bidirectional"`

      - `enabled: optional boolean`

        Determines whether to run healthchecks for a tunnel.

      - `rate: optional HealthCheckRate`

        How frequent the health check is run. The default value is `mid`.

        - `"low"`

        - `"mid"`

        - `"high"`

      - `target: optional object { effective, saved }  or string`

        The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target. Must be in object form if the x-magic-new-hc-target header is set to true and string form if x-magic-new-hc-target is absent or set to false.

        - `MagicHealthCheckTarget object { effective, saved }`

          The destination address in a request type health check. After the healthcheck is decapsulated at the customer end of the tunnel, the ICMP echo will be forwarded to this address. This field defaults to `customer_gre_endpoint address`. This field is ignored for bidirectional healthchecks as the interface_address (not assigned to the Cloudflare side of the tunnel) is used as the target.

          - `effective: optional string`

            The effective health check target. If 'saved' is empty, then this field will be populated with the calculated default value on GET requests. Ignored in POST, PUT, and PATCH requests.

          - `saved: optional string`

            The saved health check target. Setting the value to the empty string indicates that the calculated default value will be used.

        - `string`

      - `type: optional HealthCheckType`

        The type of healthcheck to run, reply or request. The default value is `reply`.

        - `"reply"`

        - `"request"`

    - `interface_address6: optional string`

      A 127 bit IPV6 prefix from within the virtual_subnet6 prefix space with the address being the first IP of the subnet and not same as the address of virtual_subnet6. Eg if virtual_subnet6 is 2606:54c1:7:0:a9fe:12d2::/127 , interface_address6 could be 2606:54c1:7:0:a9fe:12d2:1:200/127

    - `modified_on: optional string`

      The date and time the tunnel was last modified.

    - `psk_metadata: optional PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

    - `replay_protection: optional boolean`

      If `true`, then IPsec replay protection will be supported in the Cloudflare-to-customer direction.

### IPSEC Tunnel PSK Generate Response

- `IPSECTunnelPSKGenerateResponse object { ipsec_tunnel_id, psk, psk_metadata }`

  - `ipsec_tunnel_id: optional string`

    Identifier

  - `psk: optional string`

    A randomly generated or provided string for use in the IPsec tunnel.

  - `psk_metadata: optional PSKMetadata`

    The PSK metadata that includes when the PSK was generated.

    - `last_generated_on: optional string`

      The date and time the tunnel was last modified.

### IPSEC Tunnel PSK Set Response

- `IPSECTunnelPSKSetResponse object { successfully_applied_psks, unapplied_psks }`

  - `successfully_applied_psks: optional map[object { ipsec_id, ipsec_tunnel_id, psk, psk_metadata } ]`

    Map of tunnel IDs to successfully applied PSK details.

    - `ipsec_id: string`

      The IKE identifier used for this tunnel on the Cloudflare edge.

    - `ipsec_tunnel_id: string`

      Identifier

    - `psk: string`

      A randomly generated or provided string for use in the IPsec tunnel.

    - `psk_metadata: PSKMetadata`

      The PSK metadata that includes when the PSK was generated.

      - `last_generated_on: optional string`

        The date and time the tunnel was last modified.

  - `unapplied_psks: optional map[string]`

    Map of tunnel IDs to failure reasons for PSKs that could not be applied.

# Routes

## List Routes

**get** `/accounts/{account_id}/magic/routes`

List all Magic static routes.

### Path Parameters

- `account_id: string`

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

- `result: object { routes }`

  - `routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
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
    "routes": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "nexthop": "203.0.113.1",
        "prefix": "192.0.2.0/24",
        "priority": 0,
        "created_on": "2017-06-14T00:00:00Z",
        "description": "New route for new prefix 203.0.113.1",
        "modified_on": "2017-06-14T05:20:00Z",
        "scope": {
          "colo_names": [
            "den01"
          ],
          "colo_regions": [
            "APAC"
          ]
        },
        "weight": 0
      }
    ]
  },
  "success": true
}
```

## Route Details

**get** `/accounts/{account_id}/magic/routes/{route_id}`

Get a specific Magic static route.

### Path Parameters

- `account_id: string`

  Identifier

- `route_id: string`

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

- `result: object { route }`

  - `route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID \
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
    "route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
  },
  "success": true
}
```

## Create a Route

**post** `/accounts/{account_id}/magic/routes`

Creates a new Magic static route. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `nexthop: string`

  The next-hop IP Address for the static route.

- `prefix: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `priority: number`

  Priority of the static route.

- `description: optional string`

  An optional human provided description of the static route.

- `scope: optional Scope`

  Used only for ECMP routes.

  - `colo_names: optional array of string`

    List of colo names for the ECMP scope.

  - `colo_regions: optional array of string`

    List of colo regions for the ECMP scope.

- `weight: optional number`

  Optional weight of the ECMP scope - if provided.

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

- `result: object { id, nexthop, prefix, 6 more }`

  - `id: string`

    Identifier

  - `nexthop: string`

    The next-hop IP Address for the static route.

  - `prefix: string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `priority: number`

    Priority of the static route.

  - `created_on: optional string`

    When the route was created.

  - `description: optional string`

    An optional human provided description of the static route.

  - `modified_on: optional string`

    When the route was last modified.

  - `scope: optional Scope`

    Used only for ECMP routes.

    - `colo_names: optional array of string`

      List of colo names for the ECMP scope.

    - `colo_regions: optional array of string`

      List of colo regions for the ECMP scope.

  - `weight: optional number`

    Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "nexthop": "203.0.113.1",
          "prefix": "192.0.2.0/24",
          "priority": 0,
          "description": "New route for new prefix 203.0.113.1"
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
    "nexthop": "203.0.113.1",
    "prefix": "192.0.2.0/24",
    "priority": 0,
    "created_on": "2017-06-14T00:00:00Z",
    "description": "New route for new prefix 203.0.113.1",
    "modified_on": "2017-06-14T05:20:00Z",
    "scope": {
      "colo_names": [
        "den01"
      ],
      "colo_regions": [
        "APAC"
      ]
    },
    "weight": 0
  },
  "success": true
}
```

## Update Route

**put** `/accounts/{account_id}/magic/routes/{route_id}`

Update a specific Magic static route. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes.

### Path Parameters

- `account_id: string`

  Identifier

- `route_id: string`

  Identifier

### Body Parameters

- `nexthop: string`

  The next-hop IP Address for the static route.

- `prefix: string`

  IP Prefix in Classless Inter-Domain Routing format.

- `priority: number`

  Priority of the static route.

- `description: optional string`

  An optional human provided description of the static route.

- `scope: optional Scope`

  Used only for ECMP routes.

  - `colo_names: optional array of string`

    List of colo names for the ECMP scope.

  - `colo_regions: optional array of string`

    List of colo regions for the ECMP scope.

- `weight: optional number`

  Optional weight of the ECMP scope - if provided.

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

- `result: object { modified, modified_route }`

  - `modified: optional boolean`

  - `modified_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "nexthop": "203.0.113.1",
          "prefix": "192.0.2.0/24",
          "priority": 0,
          "description": "New route for new prefix 203.0.113.1"
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
    "modified": true,
    "modified_route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
  },
  "success": true
}
```

## Delete Route

**delete** `/accounts/{account_id}/magic/routes/{route_id}`

Disable and remove a specific Magic static route.

### Path Parameters

- `account_id: string`

  Identifier

- `route_id: string`

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

- `result: object { deleted, deleted_route }`

  - `deleted: optional boolean`

  - `deleted_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes/$ROUTE_ID \
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
    "deleted": true,
    "deleted_route": {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "nexthop": "203.0.113.1",
      "prefix": "192.0.2.0/24",
      "priority": 0,
      "created_on": "2017-06-14T00:00:00Z",
      "description": "New route for new prefix 203.0.113.1",
      "modified_on": "2017-06-14T05:20:00Z",
      "scope": {
        "colo_names": [
          "den01"
        ],
        "colo_regions": [
          "APAC"
        ]
      },
      "weight": 0
    }
  },
  "success": true
}
```

## Update Many Routes

**put** `/accounts/{account_id}/magic/routes`

Update multiple Magic static routes. Use `?validate_only=true` as an optional query parameter to run validation only without persisting changes. Only fields for a route that need to be changed need be provided.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `routes: array of object { id, nexthop, prefix, 4 more }`

  - `id: string`

    Identifier

  - `nexthop: string`

    The next-hop IP Address for the static route.

  - `prefix: string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `priority: number`

    Priority of the static route.

  - `description: optional string`

    An optional human provided description of the static route.

  - `scope: optional Scope`

    Used only for ECMP routes.

    - `colo_names: optional array of string`

      List of colo names for the ECMP scope.

    - `colo_regions: optional array of string`

      List of colo regions for the ECMP scope.

  - `weight: optional number`

    Optional weight of the ECMP scope - if provided.

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

- `result: object { modified, modified_routes }`

  - `modified: optional boolean`

  - `modified_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "routes": [
            {
              "id": "023e105f4ecef8ad9ca31a8372d0c353",
              "nexthop": "203.0.113.1",
              "prefix": "192.0.2.0/24",
              "priority": 0
            }
          ]
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
    "modified": true,
    "modified_routes": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "nexthop": "203.0.113.1",
        "prefix": "192.0.2.0/24",
        "priority": 0,
        "created_on": "2017-06-14T00:00:00Z",
        "description": "New route for new prefix 203.0.113.1",
        "modified_on": "2017-06-14T05:20:00Z",
        "scope": {
          "colo_names": [
            "den01"
          ],
          "colo_regions": [
            "APAC"
          ]
        },
        "weight": 0
      }
    ]
  },
  "success": true
}
```

## Delete Many Routes

**delete** `/accounts/{account_id}/magic/routes`

Delete multiple Magic static routes.

### Path Parameters

- `account_id: string`

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

- `result: object { deleted, deleted_routes }`

  - `deleted: optional boolean`

  - `deleted_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/routes \
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
    "deleted": true,
    "deleted_routes": [
      {
        "id": "023e105f4ecef8ad9ca31a8372d0c353",
        "nexthop": "203.0.113.1",
        "prefix": "192.0.2.0/24",
        "priority": 0,
        "created_on": "2017-06-14T00:00:00Z",
        "description": "New route for new prefix 203.0.113.1",
        "modified_on": "2017-06-14T05:20:00Z",
        "scope": {
          "colo_names": [
            "den01"
          ],
          "colo_regions": [
            "APAC"
          ]
        },
        "weight": 0
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Scope

- `Scope object { colo_names, colo_regions }`

  Used only for ECMP routes.

  - `colo_names: optional array of string`

    List of colo names for the ECMP scope.

  - `colo_regions: optional array of string`

    List of colo regions for the ECMP scope.

### Route List Response

- `RouteListResponse object { routes }`

  - `routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Get Response

- `RouteGetResponse object { route }`

  - `route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Create Response

- `RouteCreateResponse object { id, nexthop, prefix, 6 more }`

  - `id: string`

    Identifier

  - `nexthop: string`

    The next-hop IP Address for the static route.

  - `prefix: string`

    IP Prefix in Classless Inter-Domain Routing format.

  - `priority: number`

    Priority of the static route.

  - `created_on: optional string`

    When the route was created.

  - `description: optional string`

    An optional human provided description of the static route.

  - `modified_on: optional string`

    When the route was last modified.

  - `scope: optional Scope`

    Used only for ECMP routes.

    - `colo_names: optional array of string`

      List of colo names for the ECMP scope.

    - `colo_regions: optional array of string`

      List of colo regions for the ECMP scope.

  - `weight: optional number`

    Optional weight of the ECMP scope - if provided.

### Route Update Response

- `RouteUpdateResponse object { modified, modified_route }`

  - `modified: optional boolean`

  - `modified_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Delete Response

- `RouteDeleteResponse object { deleted, deleted_route }`

  - `deleted: optional boolean`

  - `deleted_route: optional object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Bulk Update Response

- `RouteBulkUpdateResponse object { modified, modified_routes }`

  - `modified: optional boolean`

  - `modified_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

### Route Empty Response

- `RouteEmptyResponse object { deleted, deleted_routes }`

  - `deleted: optional boolean`

  - `deleted_routes: optional array of object { id, nexthop, prefix, 6 more }`

    - `id: string`

      Identifier

    - `nexthop: string`

      The next-hop IP Address for the static route.

    - `prefix: string`

      IP Prefix in Classless Inter-Domain Routing format.

    - `priority: number`

      Priority of the static route.

    - `created_on: optional string`

      When the route was created.

    - `description: optional string`

      An optional human provided description of the static route.

    - `modified_on: optional string`

      When the route was last modified.

    - `scope: optional Scope`

      Used only for ECMP routes.

      - `colo_names: optional array of string`

        List of colo names for the ECMP scope.

      - `colo_regions: optional array of string`

        List of colo regions for the ECMP scope.

    - `weight: optional number`

      Optional weight of the ECMP scope - if provided.

# Sites

## List Sites

**get** `/accounts/{account_id}/magic/sites`

Lists Sites associated with an account. Use connectorid query param to return sites where connectorid matches either site.ConnectorID or site.SecondaryConnectorID.

### Path Parameters

- `account_id: string`

  Identifier

### Query Parameters

- `connectorid: optional string`

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

- `result: array of Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites \
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
      "connector_id": "ac60d3d0435248289d446cedd870bcf4",
      "description": "description",
      "ha_mode": true,
      "location": {
        "lat": "37.6192",
        "lon": "122.3816"
      },
      "name": "site_1",
      "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
    }
  ],
  "success": true
}
```

## Site Details

**get** `/accounts/{account_id}/magic/sites/{site_id}`

Get a specific Site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Header Parameters

- `"x-magic-new-hc-target": optional boolean`

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
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
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Create a new Site

**post** `/accounts/{account_id}/magic/sites`

Creates a new Site

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `name: string`

  The name of the site.

- `connector_id: optional string`

  Magic Connector identifier tag.

- `description: optional string`

- `ha_mode: optional boolean`

  Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

- `location: optional SiteLocation`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

- `secondary_connector_id: optional string`

  Magic Connector identifier tag. Used when high availability mode is on.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "site_1",
          "connector_id": "ac60d3d0435248289d446cedd870bcf4",
          "ha_mode": true,
          "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Update Site

**put** `/accounts/{account_id}/magic/sites/{site_id}`

Update a specific Site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `connector_id: optional string`

  Magic Connector identifier tag.

- `description: optional string`

- `location: optional SiteLocation`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

- `name: optional string`

  The name of the site.

- `secondary_connector_id: optional string`

  Magic Connector identifier tag. Used when high availability mode is on.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "connector_id": "ac60d3d0435248289d446cedd870bcf4",
          "name": "site_1",
          "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Patch Site

**patch** `/accounts/{account_id}/magic/sites/{site_id}`

Patch a specific Site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `connector_id: optional string`

  Magic Connector identifier tag.

- `description: optional string`

- `location: optional SiteLocation`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

- `name: optional string`

  The name of the site.

- `secondary_connector_id: optional string`

  Magic Connector identifier tag. Used when high availability mode is on.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "connector_id": "ac60d3d0435248289d446cedd870bcf4",
          "name": "site_1",
          "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
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
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Delete Site

**delete** `/accounts/{account_id}/magic/sites/{site_id}`

Remove a specific Site.

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

- `result: Site`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID \
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
    "connector_id": "ac60d3d0435248289d446cedd870bcf4",
    "description": "description",
    "ha_mode": true,
    "location": {
      "lat": "37.6192",
      "lon": "122.3816"
    },
    "name": "site_1",
    "secondary_connector_id": "8d67040d3835dbcf46ce29da440dc482"
  },
  "success": true
}
```

## Domain Types

### Site

- `Site object { id, connector_id, description, 4 more }`

  - `id: optional string`

    Identifier

  - `connector_id: optional string`

    Magic Connector identifier tag.

  - `description: optional string`

  - `ha_mode: optional boolean`

    Site high availability mode. If set to true, the site can have two connectors and runs in high availability mode.

  - `location: optional SiteLocation`

    Location of site in latitude and longitude.

    - `lat: optional string`

      Latitude

    - `lon: optional string`

      Longitude

  - `name: optional string`

    The name of the site.

  - `secondary_connector_id: optional string`

    Magic Connector identifier tag. Used when high availability mode is on.

### Site Location

- `SiteLocation object { lat, lon }`

  Location of site in latitude and longitude.

  - `lat: optional string`

    Latitude

  - `lon: optional string`

    Longitude

# App Configuration

## List App Configs

**get** `/accounts/{account_id}/magic/sites/{site_id}/app_configs`

Lists App Configs associated with a site.

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

- `result: array of object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs \
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
      "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "breakout": true,
      "preferred_wans": [
        "023e105f4ecef8ad9ca31a8372d0c353"
      ],
      "priority": 0,
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
    }
  ],
  "success": true
}
```

## Create a new App Config

**post** `/accounts/{account_id}/magic/sites/{site_id}/app_configs`

Creates a new App Config for a site

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `body: object { account_app_id, breakout, preferred_wans, priority }  or object { managed_app_id, breakout, preferred_wans, priority }`

  - `AccountApp object { account_app_id, breakout, preferred_wans, priority }`

    - `account_app_id: string`

      Magic account app ID.

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

  - `ManagedApp object { managed_app_id, breakout, preferred_wans, priority }`

    - `managed_app_id: string`

      Managed app ID.

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
          "breakout": true
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Update an App Config

**put** `/accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}`

Updates an App Config for a site

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `app_config_id: string`

  Identifier

### Body Parameters

- `account_app_id: optional string`

  Magic account app ID.

- `breakout: optional boolean`

  Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

- `managed_app_id: optional string`

  Managed app ID.

- `preferred_wans: optional array of string`

  WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

- `priority: optional number`

  Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs/$APP_CONFIG_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
          "breakout": true,
          "managed_app_id": "cloudflare"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Update an App Config

**patch** `/accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}`

Updates an App Config for a site

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `app_config_id: string`

  Identifier

### Body Parameters

- `account_app_id: optional string`

  Magic account app ID.

- `breakout: optional boolean`

  Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

- `managed_app_id: optional string`

  Managed app ID.

- `preferred_wans: optional array of string`

  WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

- `priority: optional number`

  Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs/$APP_CONFIG_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
          "breakout": true,
          "managed_app_id": "cloudflare"
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Delete App Config

**delete** `/accounts/{account_id}/magic/sites/{site_id}/app_configs/{app_config_id}`

Deletes specific App Config associated with a site.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `app_config_id: string`

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

- `result: object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/app_configs/$APP_CONFIG_ID \
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
    "account_app_id": "ac60d3d0435248289d446cedd870bcf4",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "breakout": true,
    "preferred_wans": [
      "023e105f4ecef8ad9ca31a8372d0c353"
    ],
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353"
  },
  "success": true
}
```

## Domain Types

### App Configuration List Response

- `AppConfigurationListResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Create Response

- `AppConfigurationCreateResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Update Response

- `AppConfigurationUpdateResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Edit Response

- `AppConfigurationEditResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

### App Configuration Delete Response

- `AppConfigurationDeleteResponse = object { account_app_id, id, breakout, 3 more }  or object { managed_app_id, id, breakout, 3 more }`

  Traffic decision configuration for an app.

  - `AccountApp object { account_app_id, id, breakout, 3 more }`

    - `account_app_id: string`

      Magic account app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

  - `ManagedApp object { managed_app_id, id, breakout, 3 more }`

    - `managed_app_id: string`

      Managed app ID.

    - `id: optional string`

      Identifier

    - `breakout: optional boolean`

      Whether to breakout traffic to the app's endpoints directly. Null preserves default behavior.

    - `preferred_wans: optional array of string`

      WAN interfaces to prefer over default WANs, highest-priority first. Can only be specified for breakout rules (breakout must be true).

    - `priority: optional number`

      Priority of traffic. 0 is default, anything greater is prioritized. (Currently only 0 and 1 are supported)

    - `site_id: optional string`

      Identifier

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

# LANs

## List Site LANs

**get** `/accounts/{account_id}/magic/sites/{site_id}/lans`

Lists Site LANs associated with an account.

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

- `result: array of LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans \
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
      "bond_id": 2,
      "ha_link": true,
      "is_breakout": true,
      "is_prioritized": true,
      "name": "name",
      "nat": {
        "static_prefix": "192.0.2.0/24"
      },
      "physport": 1,
      "routed_subnets": [
        {
          "next_hop": "192.0.2.1",
          "prefix": "192.0.2.0/24",
          "nat": {
            "static_prefix": "192.0.2.0/24"
          }
        }
      ],
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "dhcp_relay": {
          "server_addresses": [
            "192.0.2.1"
          ]
        },
        "dhcp_server": {
          "dhcp_options": [
            {
              "code": 66,
              "type": "ip",
              "value": "10.20.30.40"
            }
          ],
          "dhcp_pool_end": "192.0.2.1",
          "dhcp_pool_start": "192.0.2.1",
          "dns_server": "192.0.2.1",
          "dns_servers": [
            "192.0.2.1"
          ],
          "reservations": {
            "00:11:22:33:44:55": "192.0.2.100",
            "AA:BB:CC:DD:EE:FF": "192.168.1.101"
          }
        },
        "secondary_address": "192.0.2.0/24",
        "virtual_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Site LAN Details

**get** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Get a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
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
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Create a new Site LAN

**post** `/accounts/{account_id}/magic/sites/{site_id}/lans`

Creates a new Site LAN. If the site is in high availability mode, static_addressing is required along with secondary and virtual address.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `bond_id: optional number`

- `ha_link: optional boolean`

  mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

- `is_breakout: optional boolean`

  mark true to use this LAN for source-based breakout traffic

- `is_prioritized: optional boolean`

  mark true to use this LAN for source-based prioritized traffic

- `name: optional string`

- `nat: optional Nat`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

- `physport: optional number`

- `routed_subnets: optional array of RoutedSubnet`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

- `static_addressing: optional LANStaticAddressing`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: array of LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "bond_id": 2,
      "ha_link": true,
      "is_breakout": true,
      "is_prioritized": true,
      "name": "name",
      "nat": {
        "static_prefix": "192.0.2.0/24"
      },
      "physport": 1,
      "routed_subnets": [
        {
          "next_hop": "192.0.2.1",
          "prefix": "192.0.2.0/24",
          "nat": {
            "static_prefix": "192.0.2.0/24"
          }
        }
      ],
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "dhcp_relay": {
          "server_addresses": [
            "192.0.2.1"
          ]
        },
        "dhcp_server": {
          "dhcp_options": [
            {
              "code": 66,
              "type": "ip",
              "value": "10.20.30.40"
            }
          ],
          "dhcp_pool_end": "192.0.2.1",
          "dhcp_pool_start": "192.0.2.1",
          "dns_server": "192.0.2.1",
          "dns_servers": [
            "192.0.2.1"
          ],
          "reservations": {
            "00:11:22:33:44:55": "192.0.2.100",
            "AA:BB:CC:DD:EE:FF": "192.168.1.101"
          }
        },
        "secondary_address": "192.0.2.0/24",
        "virtual_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Update Site LAN

**put** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Update a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

  Identifier

### Body Parameters

- `bond_id: optional number`

- `is_breakout: optional boolean`

  mark true to use this LAN for source-based breakout traffic

- `is_prioritized: optional boolean`

  mark true to use this LAN for source-based prioritized traffic

- `name: optional string`

- `nat: optional Nat`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

- `physport: optional number`

- `routed_subnets: optional array of RoutedSubnet`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

- `static_addressing: optional LANStaticAddressing`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
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
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Patch Site LAN

**patch** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Patch a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

  Identifier

### Body Parameters

- `bond_id: optional number`

- `is_breakout: optional boolean`

  mark true to use this LAN for source-based breakout traffic

- `is_prioritized: optional boolean`

  mark true to use this LAN for source-based prioritized traffic

- `name: optional string`

- `nat: optional Nat`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

- `physport: optional number`

- `routed_subnets: optional array of RoutedSubnet`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

- `static_addressing: optional LANStaticAddressing`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "bond_id": 2,
          "physport": 1,
          "vlan_tag": 42
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
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Delete Site LAN

**delete** `/accounts/{account_id}/magic/sites/{site_id}/lans/{lan_id}`

Remove a specific Site LAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `lan_id: string`

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

- `result: LAN`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/lans/$LAN_ID \
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
    "bond_id": 2,
    "ha_link": true,
    "is_breakout": true,
    "is_prioritized": true,
    "name": "name",
    "nat": {
      "static_prefix": "192.0.2.0/24"
    },
    "physport": 1,
    "routed_subnets": [
      {
        "next_hop": "192.0.2.1",
        "prefix": "192.0.2.0/24",
        "nat": {
          "static_prefix": "192.0.2.0/24"
        }
      }
    ],
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "dhcp_relay": {
        "server_addresses": [
          "192.0.2.1"
        ]
      },
      "dhcp_server": {
        "dhcp_options": [
          {
            "code": 66,
            "type": "ip",
            "value": "10.20.30.40"
          }
        ],
        "dhcp_pool_end": "192.0.2.1",
        "dhcp_pool_start": "192.0.2.1",
        "dns_server": "192.0.2.1",
        "dns_servers": [
          "192.0.2.1"
        ],
        "reservations": {
          "00:11:22:33:44:55": "192.0.2.100",
          "AA:BB:CC:DD:EE:FF": "192.168.1.101"
        }
      },
      "secondary_address": "192.0.2.0/24",
      "virtual_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Domain Types

### DHCP Relay

- `DHCPRelay object { server_addresses }`

  - `server_addresses: optional array of string`

    List of DHCP server IPs.

### DHCP Server

- `DHCPServer object { dhcp_options, dhcp_pool_end, dhcp_pool_start, 3 more }`

  - `dhcp_options: optional array of object { code, type, value }`

    Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

    - `code: number`

      DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

    - `type: "text" or "hex" or "ip" or 3 more`

      The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

      - `"text"`

      - `"hex"`

      - `"ip"`

      - `"byte"`

      - `"short"`

      - `"integer"`

    - `value: string`

      The option value, interpreted according to the type field.

  - `dhcp_pool_end: optional string`

    A valid IPv4 address.

  - `dhcp_pool_start: optional string`

    A valid IPv4 address.

  - `dns_server: optional string`

    A valid IPv4 address.

  - `dns_servers: optional array of string`

  - `reservations: optional map[string]`

    Mapping of MAC addresses to IP addresses

### LAN

- `LAN object { id, bond_id, ha_link, 9 more }`

  - `id: optional string`

    Identifier

  - `bond_id: optional number`

  - `ha_link: optional boolean`

    mark true to use this LAN for HA probing. only works for site with HA turned on. only one LAN can be set as the ha_link.

  - `is_breakout: optional boolean`

    mark true to use this LAN for source-based breakout traffic

  - `is_prioritized: optional boolean`

    mark true to use this LAN for source-based prioritized traffic

  - `name: optional string`

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

  - `physport: optional number`

  - `routed_subnets: optional array of RoutedSubnet`

    - `next_hop: string`

      A valid IPv4 address.

    - `prefix: string`

      A valid CIDR notation representing an IP range.

    - `nat: optional Nat`

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional LANStaticAddressing`

    If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `dhcp_relay: optional DHCPRelay`

      - `server_addresses: optional array of string`

        List of DHCP server IPs.

    - `dhcp_server: optional DHCPServer`

      - `dhcp_options: optional array of object { code, type, value }`

        Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

        - `code: number`

          DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

        - `type: "text" or "hex" or "ip" or 3 more`

          The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

          - `"text"`

          - `"hex"`

          - `"ip"`

          - `"byte"`

          - `"short"`

          - `"integer"`

        - `value: string`

          The option value, interpreted according to the type field.

      - `dhcp_pool_end: optional string`

        A valid IPv4 address.

      - `dhcp_pool_start: optional string`

        A valid IPv4 address.

      - `dns_server: optional string`

        A valid IPv4 address.

      - `dns_servers: optional array of string`

      - `reservations: optional map[string]`

        Mapping of MAC addresses to IP addresses

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

    - `virtual_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

### LAN Static Addressing

- `LANStaticAddressing object { address, dhcp_relay, dhcp_server, 2 more }`

  If the site is not configured in high availability mode, this configuration is optional (if omitted, use DHCP). However, if in high availability mode, static_address is required along with secondary and virtual address.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `dhcp_relay: optional DHCPRelay`

    - `server_addresses: optional array of string`

      List of DHCP server IPs.

  - `dhcp_server: optional DHCPServer`

    - `dhcp_options: optional array of object { code, type, value }`

      Optional list of custom DHCP options to include in DHCP responses. Only valid when DHCP server is enabled.

      - `code: number`

        DHCP option number (1-254). Options 0 and 255 are reserved by RFC 2132. Options 3, 6, and 51 are not allowed because they conflict with connector-managed configuration.

      - `type: "text" or "hex" or "ip" or 3 more`

        The type of the option value. text: a string (max 255 bytes). hex: colon-separated hex bytes (e.g. "01:04:aa:bb:cc", max 255 bytes). ip: an IPv4 address (e.g. "10.20.30.40"). byte: an unsigned integer 0-255 (1 byte). short: an unsigned integer 0-65535 (2 bytes). integer: an unsigned integer 0-4294967295 (4 bytes).

        - `"text"`

        - `"hex"`

        - `"ip"`

        - `"byte"`

        - `"short"`

        - `"integer"`

      - `value: string`

        The option value, interpreted according to the type field.

    - `dhcp_pool_end: optional string`

      A valid IPv4 address.

    - `dhcp_pool_start: optional string`

      A valid IPv4 address.

    - `dns_server: optional string`

      A valid IPv4 address.

    - `dns_servers: optional array of string`

    - `reservations: optional map[string]`

      Mapping of MAC addresses to IP addresses

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

  - `virtual_address: optional string`

    A valid CIDR notation representing an IP range.

### Nat

- `Nat object { static_prefix }`

  - `static_prefix: optional string`

    A valid CIDR notation representing an IP range.

### Routed Subnet

- `RoutedSubnet object { next_hop, prefix, nat }`

  - `next_hop: string`

    A valid IPv4 address.

  - `prefix: string`

    A valid CIDR notation representing an IP range.

  - `nat: optional Nat`

    - `static_prefix: optional string`

      A valid CIDR notation representing an IP range.

# WANs

## List Site WANs

**get** `/accounts/{account_id}/magic/sites/{site_id}/wans`

Lists Site WANs associated with an account.

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

- `result: array of WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans \
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
      "health_check_rate": "low",
      "name": "name",
      "physport": 1,
      "priority": 0,
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "gateway_address": "192.0.2.1",
        "secondary_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Site WAN Details

**get** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Get a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
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
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Create a new Site WAN

**post** `/accounts/{account_id}/magic/sites/{site_id}/wans`

Creates a new Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

### Body Parameters

- `physport: number`

- `name: optional string`

- `priority: optional number`

- `static_addressing: optional WANStaticAddressing`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: array of WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "physport": 1,
          "vlan_tag": 42
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "health_check_rate": "low",
      "name": "name",
      "physport": 1,
      "priority": 0,
      "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
      "static_addressing": {
        "address": "192.0.2.0/24",
        "gateway_address": "192.0.2.1",
        "secondary_address": "192.0.2.0/24"
      },
      "vlan_tag": 42
    }
  ],
  "success": true
}
```

## Update Site WAN

**put** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Update a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

  Identifier

### Body Parameters

- `name: optional string`

- `physport: optional number`

- `priority: optional number`

- `static_addressing: optional WANStaticAddressing`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "physport": 1,
          "vlan_tag": 42
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
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Patch Site WAN

**patch** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Patch a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

  Identifier

### Body Parameters

- `name: optional string`

- `physport: optional number`

- `priority: optional number`

- `static_addressing: optional WANStaticAddressing`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

- `vlan_tag: optional number`

  VLAN ID. Use zero for untagged.

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "physport": 1,
          "vlan_tag": 42
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
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Delete Site WAN

**delete** `/accounts/{account_id}/magic/sites/{site_id}/wans/{wan_id}`

Remove a specific Site WAN.

### Path Parameters

- `account_id: string`

  Identifier

- `site_id: string`

  Identifier

- `wan_id: string`

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

- `result: WAN`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/sites/$SITE_ID/wans/$WAN_ID \
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
    "health_check_rate": "low",
    "name": "name",
    "physport": 1,
    "priority": 0,
    "site_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "static_addressing": {
      "address": "192.0.2.0/24",
      "gateway_address": "192.0.2.1",
      "secondary_address": "192.0.2.0/24"
    },
    "vlan_tag": 42
  },
  "success": true
}
```

## Domain Types

### WAN

- `WAN object { id, health_check_rate, name, 5 more }`

  - `id: optional string`

    Identifier

  - `health_check_rate: optional "low" or "mid" or "high"`

    Magic WAN health check rate for tunnels created on this link. The default value is `mid`.

    - `"low"`

    - `"mid"`

    - `"high"`

  - `name: optional string`

  - `physport: optional number`

  - `priority: optional number`

    Priority of WAN for traffic loadbalancing.

  - `site_id: optional string`

    Identifier

  - `static_addressing: optional WANStaticAddressing`

    (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

    - `address: string`

      A valid CIDR notation representing an IP range.

    - `gateway_address: string`

      A valid IPv4 address.

    - `secondary_address: optional string`

      A valid CIDR notation representing an IP range.

  - `vlan_tag: optional number`

    VLAN ID. Use zero for untagged.

### WAN Static Addressing

- `WANStaticAddressing object { address, gateway_address, secondary_address }`

  (optional) if omitted, use DHCP. Submit secondary_address when site is in high availability mode.

  - `address: string`

    A valid CIDR notation representing an IP range.

  - `gateway_address: string`

    A valid IPv4 address.

  - `secondary_address: optional string`

    A valid CIDR notation representing an IP range.

# Connectors

## List Connectors

**get** `/accounts/{account_id}/magic/connectors`

List Connectors

### Path Parameters

- `account_id: string`

  Account identifier

### Query Parameters

- `device_type: optional "MANAGED" or "LICENSED"`

  Filter connectors by device type.

  - `"MANAGED"`

  - `"LICENSED"`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: array of object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors \
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
  "result": [
    {
      "id": "id",
      "activated": true,
      "interrupt_window_days_of_week": [
        "Sunday"
      ],
      "interrupt_window_duration_hours": 1,
      "interrupt_window_embargo_dates": [
        "string"
      ],
      "interrupt_window_hour_of_day": 0,
      "last_updated": "last_updated",
      "notes": "notes",
      "primary": true,
      "timezone": "timezone",
      "device": {
        "id": "id",
        "serial_number": "serial_number",
        "type": "MANAGED"
      },
      "last_heartbeat": "last_heartbeat",
      "last_seen_version": "last_seen_version",
      "license_key": "license_key",
      "site_id": "site_id"
    }
  ],
  "success": true
}
```

## Fetch Connector

**get** `/accounts/{account_id}/magic/connectors/{connector_id}`

Fetch Connector

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID \
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
  "result": {
    "id": "id",
    "activated": true,
    "interrupt_window_days_of_week": [
      "Sunday"
    ],
    "interrupt_window_duration_hours": 1,
    "interrupt_window_embargo_dates": [
      "string"
    ],
    "interrupt_window_hour_of_day": 0,
    "last_updated": "last_updated",
    "notes": "notes",
    "primary": true,
    "timezone": "timezone",
    "device": {
      "id": "id",
      "serial_number": "serial_number",
      "type": "MANAGED"
    },
    "last_heartbeat": "last_heartbeat",
    "last_seen_version": "last_seen_version",
    "license_key": "license_key",
    "site_id": "site_id"
  },
  "success": true
}
```

## Add a connector to your account

**post** `/accounts/{account_id}/magic/connectors`

Add a connector to your account

### Path Parameters

- `account_id: string`

  Account identifier

### Body Parameters

- `device: object { id, provision_license, serial_number }`

  Exactly one of id, serial_number, or provision_license must be provided.

  - `id: optional string`

  - `provision_license: optional boolean`

    When true, create and provision a new licence key for the connector.

  - `serial_number: optional string`

- `activated: optional boolean`

- `interrupt_window_days_of_week: optional array of "Sunday" or "Monday" or "Tuesday" or 4 more`

  Allowed days of the week for upgrades. Default is all days.

  - `"Sunday"`

  - `"Monday"`

  - `"Tuesday"`

  - `"Wednesday"`

  - `"Thursday"`

  - `"Friday"`

  - `"Saturday"`

- `interrupt_window_duration_hours: optional number`

- `interrupt_window_embargo_dates: optional array of string`

  List of dates (YYYY-MM-DD) when upgrades are blocked.

- `interrupt_window_hour_of_day: optional number`

- `notes: optional string`

- `primary: optional boolean`

- `site_id: optional string`

- `timezone: optional string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "device": {}
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
  "result": {
    "id": "id",
    "activated": true,
    "interrupt_window_days_of_week": [
      "Sunday"
    ],
    "interrupt_window_duration_hours": 1,
    "interrupt_window_embargo_dates": [
      "string"
    ],
    "interrupt_window_hour_of_day": 0,
    "last_updated": "last_updated",
    "notes": "notes",
    "primary": true,
    "timezone": "timezone",
    "device": {
      "id": "id",
      "serial_number": "serial_number",
      "type": "MANAGED"
    },
    "last_heartbeat": "last_heartbeat",
    "last_seen_version": "last_seen_version",
    "license_key": "license_key",
    "site_id": "site_id"
  },
  "success": true
}
```

## Replace Connector or Re-provision License Key

**put** `/accounts/{account_id}/magic/connectors/{connector_id}`

Replace Connector or Re-provision License Key

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Body Parameters

- `activated: optional boolean`

- `interrupt_window_days_of_week: optional array of "Sunday" or "Monday" or "Tuesday" or 4 more`

  Allowed days of the week for upgrades. Default is all days.

  - `"Sunday"`

  - `"Monday"`

  - `"Tuesday"`

  - `"Wednesday"`

  - `"Thursday"`

  - `"Friday"`

  - `"Saturday"`

- `interrupt_window_duration_hours: optional number`

- `interrupt_window_embargo_dates: optional array of string`

  List of dates (YYYY-MM-DD) when upgrades are blocked.

- `interrupt_window_hour_of_day: optional number`

- `notes: optional string`

- `primary: optional boolean`

- `provision_license: optional boolean`

  When true, regenerate license key for the connector.

- `site_id: optional string`

- `timezone: optional string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID \
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
  "result": {
    "id": "id",
    "activated": true,
    "interrupt_window_days_of_week": [
      "Sunday"
    ],
    "interrupt_window_duration_hours": 1,
    "interrupt_window_embargo_dates": [
      "string"
    ],
    "interrupt_window_hour_of_day": 0,
    "last_updated": "last_updated",
    "notes": "notes",
    "primary": true,
    "timezone": "timezone",
    "device": {
      "id": "id",
      "serial_number": "serial_number",
      "type": "MANAGED"
    },
    "last_heartbeat": "last_heartbeat",
    "last_seen_version": "last_seen_version",
    "license_key": "license_key",
    "site_id": "site_id"
  },
  "success": true
}
```

## Edit Connector to update specific properties or Re-provision License Key

**patch** `/accounts/{account_id}/magic/connectors/{connector_id}`

Edit Connector to update specific properties or Re-provision License Key

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Body Parameters

- `activated: optional boolean`

- `interrupt_window_days_of_week: optional array of "Sunday" or "Monday" or "Tuesday" or 4 more`

  Allowed days of the week for upgrades. Default is all days.

  - `"Sunday"`

  - `"Monday"`

  - `"Tuesday"`

  - `"Wednesday"`

  - `"Thursday"`

  - `"Friday"`

  - `"Saturday"`

- `interrupt_window_duration_hours: optional number`

- `interrupt_window_embargo_dates: optional array of string`

  List of dates (YYYY-MM-DD) when upgrades are blocked.

- `interrupt_window_hour_of_day: optional number`

- `notes: optional string`

- `primary: optional boolean`

- `provision_license: optional boolean`

  When true, regenerate license key for the connector.

- `site_id: optional string`

- `timezone: optional string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID \
    -X PATCH \
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
  "result": {
    "id": "id",
    "activated": true,
    "interrupt_window_days_of_week": [
      "Sunday"
    ],
    "interrupt_window_duration_hours": 1,
    "interrupt_window_embargo_dates": [
      "string"
    ],
    "interrupt_window_hour_of_day": 0,
    "last_updated": "last_updated",
    "notes": "notes",
    "primary": true,
    "timezone": "timezone",
    "device": {
      "id": "id",
      "serial_number": "serial_number",
      "type": "MANAGED"
    },
    "last_heartbeat": "last_heartbeat",
    "last_seen_version": "last_seen_version",
    "license_key": "license_key",
    "site_id": "site_id"
  },
  "success": true
}
```

## Remove a connector from your account

**delete** `/accounts/{account_id}/magic/connectors/{connector_id}`

Remove a connector from your account

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Returns

- `errors: array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: array of object { code, message }`

  - `code: number`

  - `message: string`

- `result: object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID \
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
  "result": {
    "id": "id",
    "activated": true,
    "interrupt_window_days_of_week": [
      "Sunday"
    ],
    "interrupt_window_duration_hours": 1,
    "interrupt_window_embargo_dates": [
      "string"
    ],
    "interrupt_window_hour_of_day": 0,
    "last_updated": "last_updated",
    "notes": "notes",
    "primary": true,
    "timezone": "timezone",
    "device": {
      "id": "id",
      "serial_number": "serial_number",
      "type": "MANAGED"
    },
    "last_heartbeat": "last_heartbeat",
    "last_seen_version": "last_seen_version",
    "license_key": "license_key",
    "site_id": "site_id"
  },
  "success": true
}
```

## Domain Types

### Connector List Response

- `ConnectorListResponse object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

### Connector Get Response

- `ConnectorGetResponse object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

### Connector Create Response

- `ConnectorCreateResponse object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

### Connector Update Response

- `ConnectorUpdateResponse object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

### Connector Edit Response

- `ConnectorEditResponse object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

### Connector Delete Response

- `ConnectorDeleteResponse object { id, activated, interrupt_window_days_of_week, 12 more }`

  - `id: string`

  - `activated: boolean`

  - `interrupt_window_days_of_week: array of "Sunday" or "Monday" or "Tuesday" or 4 more`

    Allowed days of the week for upgrades. Default is all days.

    - `"Sunday"`

    - `"Monday"`

    - `"Tuesday"`

    - `"Wednesday"`

    - `"Thursday"`

    - `"Friday"`

    - `"Saturday"`

  - `interrupt_window_duration_hours: number`

  - `interrupt_window_embargo_dates: array of string`

    List of dates (YYYY-MM-DD) when upgrades are blocked.

  - `interrupt_window_hour_of_day: number`

  - `last_updated: string`

  - `notes: string`

  - `primary: boolean`

  - `timezone: string`

  - `device: optional object { id, serial_number, type }`

    - `id: string`

    - `serial_number: optional string`

    - `type: optional "MANAGED" or "LICENSED"`

      - `"MANAGED"`

      - `"LICENSED"`

  - `last_heartbeat: optional string`

  - `last_seen_version: optional string`

  - `license_key: optional string`

  - `site_id: optional string`

# Events

## List Events

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events`

List Events

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Query Parameters

- `from: number`

- `to: number`

- `cursor: optional string`

- `k: optional string`

  Filter by event kind

- `limit: optional number`

### Returns

- `result: object { count, items, cursor }`

  - `count: number`

  - `items: array of object { a, k, n, t }`

    - `a: number`

      Time the Event was collected (seconds since the Unix epoch)

    - `k: string`

      Kind

    - `n: number`

      Sequence number, used to order events with the same timestamp

    - `t: number`

      Time the Event was recorded (seconds since the Unix epoch)

  - `cursor: optional string`

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/events \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "a": 0,
        "k": "k",
        "n": 0,
        "t": 0
      }
    ],
    "cursor": "cursor"
  },
  "success": true,
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
  ]
}
```

## Get Event

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/{event_t}.{event_n}`

Get Event

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

- `event_t: number`

- `event_n: number`

### Returns

- `result: object { e, n, t, v }`

  Recorded Event

  - `e: object { k }  or object { k }  or object { k }  or 18 more`

    - `Init object { k }`

      - `k: "Init"`

        Initialized process

        - `"Init"`

    - `Leave object { k }`

      - `k: "Leave"`

        Stopped process

        - `"Leave"`

    - `StartAttestation object { k }`

      - `k: "StartAttestation"`

        Started attestation

        - `"StartAttestation"`

    - `FinishAttestationSuccess object { k }`

      - `k: "FinishAttestationSuccess"`

        Finished attestation

        - `"FinishAttestationSuccess"`

    - `FinishAttestationFailure object { k }`

      - `k: "FinishAttestationFailure"`

        Failed attestation

        - `"FinishAttestationFailure"`

    - `StartRotateCryptKey object { k }`

      - `k: "StartRotateCryptKey"`

        Started crypt key rotation

        - `"StartRotateCryptKey"`

    - `FinishRotateCryptKeySuccess object { k }`

      - `k: "FinishRotateCryptKeySuccess"`

        Finished crypt key rotation

        - `"FinishRotateCryptKeySuccess"`

    - `FinishRotateCryptKeyFailure object { k }`

      - `k: "FinishRotateCryptKeyFailure"`

        Failed crypt key rotation

        - `"FinishRotateCryptKeyFailure"`

    - `StartRotatePki object { k }`

      - `k: "StartRotatePki"`

        Started PKI rotation

        - `"StartRotatePki"`

    - `FinishRotatePkiSuccess object { k }`

      - `k: "FinishRotatePkiSuccess"`

        Finished PKI rotation

        - `"FinishRotatePkiSuccess"`

    - `FinishRotatePkiFailure object { k }`

      - `k: "FinishRotatePkiFailure"`

        Failed PKI rotation

        - `"FinishRotatePkiFailure"`

    - `StartUpgrade object { k, url }`

      - `k: "StartUpgrade"`

        Started upgrade

        - `"StartUpgrade"`

      - `url: string`

        Location of upgrade bundle

    - `FinishUpgradeSuccess object { k }`

      - `k: "FinishUpgradeSuccess"`

        Finished upgrade

        - `"FinishUpgradeSuccess"`

    - `FinishUpgradeFailure object { k }`

      - `k: "FinishUpgradeFailure"`

        Failed upgrade

        - `"FinishUpgradeFailure"`

    - `Reconcile object { k }`

      - `k: "Reconcile"`

        Reconciled

        - `"Reconcile"`

    - `ConfigureCloudflaredTunnel object { k }`

      - `k: "ConfigureCloudflaredTunnel"`

        Configured Cloudflared tunnel

        - `"ConfigureCloudflaredTunnel"`

    - `RekeyInstallBoth object { k, tunnel_id }`

      - `k: "RekeyInstallBoth"`

        Installed initial inbound and outbound keys

        - `"RekeyInstallBoth"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyStart object { k, tunnel_id }`

      - `k: "RekeyStart"`

        Installed new inbound key, kept old outbound

        - `"RekeyStart"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyAdvance object { k, tunnel_id }`

      - `k: "RekeyAdvance"`

        Confirmed traffic on new inbound key, swapped outbound to new

        - `"RekeyAdvance"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyComplete object { k, tunnel_id }`

      - `k: "RekeyComplete"`

        Deleted old keys

        - `"RekeyComplete"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyReset object { k, tunnel_id }`

      - `k: "RekeyReset"`

        Deleted all keys after receiving an unexpected key

        - `"RekeyReset"`

      - `tunnel_id: string`

        Tunnel identifier

  - `n: number`

    Sequence number, used to order events with the same timestamp

  - `t: number`

    Time the Event was recorded (seconds since the Unix epoch)

  - `v: optional string`

    Version

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/events/$EVENT_T.$EVENT_N \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "e": {
      "k": "Init"
    },
    "n": 0,
    "t": 0,
    "v": "v"
  },
  "success": true,
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
  ]
}
```

## Domain Types

### Event List Response

- `EventListResponse object { count, items, cursor }`

  - `count: number`

  - `items: array of object { a, k, n, t }`

    - `a: number`

      Time the Event was collected (seconds since the Unix epoch)

    - `k: string`

      Kind

    - `n: number`

      Sequence number, used to order events with the same timestamp

    - `t: number`

      Time the Event was recorded (seconds since the Unix epoch)

  - `cursor: optional string`

### Event Get Response

- `EventGetResponse object { e, n, t, v }`

  Recorded Event

  - `e: object { k }  or object { k }  or object { k }  or 18 more`

    - `Init object { k }`

      - `k: "Init"`

        Initialized process

        - `"Init"`

    - `Leave object { k }`

      - `k: "Leave"`

        Stopped process

        - `"Leave"`

    - `StartAttestation object { k }`

      - `k: "StartAttestation"`

        Started attestation

        - `"StartAttestation"`

    - `FinishAttestationSuccess object { k }`

      - `k: "FinishAttestationSuccess"`

        Finished attestation

        - `"FinishAttestationSuccess"`

    - `FinishAttestationFailure object { k }`

      - `k: "FinishAttestationFailure"`

        Failed attestation

        - `"FinishAttestationFailure"`

    - `StartRotateCryptKey object { k }`

      - `k: "StartRotateCryptKey"`

        Started crypt key rotation

        - `"StartRotateCryptKey"`

    - `FinishRotateCryptKeySuccess object { k }`

      - `k: "FinishRotateCryptKeySuccess"`

        Finished crypt key rotation

        - `"FinishRotateCryptKeySuccess"`

    - `FinishRotateCryptKeyFailure object { k }`

      - `k: "FinishRotateCryptKeyFailure"`

        Failed crypt key rotation

        - `"FinishRotateCryptKeyFailure"`

    - `StartRotatePki object { k }`

      - `k: "StartRotatePki"`

        Started PKI rotation

        - `"StartRotatePki"`

    - `FinishRotatePkiSuccess object { k }`

      - `k: "FinishRotatePkiSuccess"`

        Finished PKI rotation

        - `"FinishRotatePkiSuccess"`

    - `FinishRotatePkiFailure object { k }`

      - `k: "FinishRotatePkiFailure"`

        Failed PKI rotation

        - `"FinishRotatePkiFailure"`

    - `StartUpgrade object { k, url }`

      - `k: "StartUpgrade"`

        Started upgrade

        - `"StartUpgrade"`

      - `url: string`

        Location of upgrade bundle

    - `FinishUpgradeSuccess object { k }`

      - `k: "FinishUpgradeSuccess"`

        Finished upgrade

        - `"FinishUpgradeSuccess"`

    - `FinishUpgradeFailure object { k }`

      - `k: "FinishUpgradeFailure"`

        Failed upgrade

        - `"FinishUpgradeFailure"`

    - `Reconcile object { k }`

      - `k: "Reconcile"`

        Reconciled

        - `"Reconcile"`

    - `ConfigureCloudflaredTunnel object { k }`

      - `k: "ConfigureCloudflaredTunnel"`

        Configured Cloudflared tunnel

        - `"ConfigureCloudflaredTunnel"`

    - `RekeyInstallBoth object { k, tunnel_id }`

      - `k: "RekeyInstallBoth"`

        Installed initial inbound and outbound keys

        - `"RekeyInstallBoth"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyStart object { k, tunnel_id }`

      - `k: "RekeyStart"`

        Installed new inbound key, kept old outbound

        - `"RekeyStart"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyAdvance object { k, tunnel_id }`

      - `k: "RekeyAdvance"`

        Confirmed traffic on new inbound key, swapped outbound to new

        - `"RekeyAdvance"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyComplete object { k, tunnel_id }`

      - `k: "RekeyComplete"`

        Deleted old keys

        - `"RekeyComplete"`

      - `tunnel_id: string`

        Tunnel identifier

    - `RekeyReset object { k, tunnel_id }`

      - `k: "RekeyReset"`

        Deleted all keys after receiving an unexpected key

        - `"RekeyReset"`

      - `tunnel_id: string`

        Tunnel identifier

  - `n: number`

    Sequence number, used to order events with the same timestamp

  - `t: number`

    Time the Event was recorded (seconds since the Unix epoch)

  - `v: optional string`

    Version

# Latest

## Get latest Events

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/events/latest`

Get latest Events

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Returns

- `result: object { count, items }`

  - `count: number`

  - `items: array of object { e, n, t, v }`

    - `e: object { k }  or object { k }  or object { k }  or 18 more`

      - `Init object { k }`

        - `k: "Init"`

          Initialized process

          - `"Init"`

      - `Leave object { k }`

        - `k: "Leave"`

          Stopped process

          - `"Leave"`

      - `StartAttestation object { k }`

        - `k: "StartAttestation"`

          Started attestation

          - `"StartAttestation"`

      - `FinishAttestationSuccess object { k }`

        - `k: "FinishAttestationSuccess"`

          Finished attestation

          - `"FinishAttestationSuccess"`

      - `FinishAttestationFailure object { k }`

        - `k: "FinishAttestationFailure"`

          Failed attestation

          - `"FinishAttestationFailure"`

      - `StartRotateCryptKey object { k }`

        - `k: "StartRotateCryptKey"`

          Started crypt key rotation

          - `"StartRotateCryptKey"`

      - `FinishRotateCryptKeySuccess object { k }`

        - `k: "FinishRotateCryptKeySuccess"`

          Finished crypt key rotation

          - `"FinishRotateCryptKeySuccess"`

      - `FinishRotateCryptKeyFailure object { k }`

        - `k: "FinishRotateCryptKeyFailure"`

          Failed crypt key rotation

          - `"FinishRotateCryptKeyFailure"`

      - `StartRotatePki object { k }`

        - `k: "StartRotatePki"`

          Started PKI rotation

          - `"StartRotatePki"`

      - `FinishRotatePkiSuccess object { k }`

        - `k: "FinishRotatePkiSuccess"`

          Finished PKI rotation

          - `"FinishRotatePkiSuccess"`

      - `FinishRotatePkiFailure object { k }`

        - `k: "FinishRotatePkiFailure"`

          Failed PKI rotation

          - `"FinishRotatePkiFailure"`

      - `StartUpgrade object { k, url }`

        - `k: "StartUpgrade"`

          Started upgrade

          - `"StartUpgrade"`

        - `url: string`

          Location of upgrade bundle

      - `FinishUpgradeSuccess object { k }`

        - `k: "FinishUpgradeSuccess"`

          Finished upgrade

          - `"FinishUpgradeSuccess"`

      - `FinishUpgradeFailure object { k }`

        - `k: "FinishUpgradeFailure"`

          Failed upgrade

          - `"FinishUpgradeFailure"`

      - `Reconcile object { k }`

        - `k: "Reconcile"`

          Reconciled

          - `"Reconcile"`

      - `ConfigureCloudflaredTunnel object { k }`

        - `k: "ConfigureCloudflaredTunnel"`

          Configured Cloudflared tunnel

          - `"ConfigureCloudflaredTunnel"`

      - `RekeyInstallBoth object { k, tunnel_id }`

        - `k: "RekeyInstallBoth"`

          Installed initial inbound and outbound keys

          - `"RekeyInstallBoth"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyStart object { k, tunnel_id }`

        - `k: "RekeyStart"`

          Installed new inbound key, kept old outbound

          - `"RekeyStart"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyAdvance object { k, tunnel_id }`

        - `k: "RekeyAdvance"`

          Confirmed traffic on new inbound key, swapped outbound to new

          - `"RekeyAdvance"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyComplete object { k, tunnel_id }`

        - `k: "RekeyComplete"`

          Deleted old keys

          - `"RekeyComplete"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyReset object { k, tunnel_id }`

        - `k: "RekeyReset"`

          Deleted all keys after receiving an unexpected key

          - `"RekeyReset"`

        - `tunnel_id: string`

          Tunnel identifier

    - `n: number`

      Sequence number, used to order events with the same timestamp

    - `t: number`

      Time the Event was recorded (seconds since the Unix epoch)

    - `v: optional string`

      Version

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/events/latest \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "e": {
          "k": "Init"
        },
        "n": 0,
        "t": 0,
        "v": "v"
      }
    ]
  },
  "success": true,
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
  ]
}
```

## Domain Types

### Latest List Response

- `LatestListResponse object { count, items }`

  - `count: number`

  - `items: array of object { e, n, t, v }`

    - `e: object { k }  or object { k }  or object { k }  or 18 more`

      - `Init object { k }`

        - `k: "Init"`

          Initialized process

          - `"Init"`

      - `Leave object { k }`

        - `k: "Leave"`

          Stopped process

          - `"Leave"`

      - `StartAttestation object { k }`

        - `k: "StartAttestation"`

          Started attestation

          - `"StartAttestation"`

      - `FinishAttestationSuccess object { k }`

        - `k: "FinishAttestationSuccess"`

          Finished attestation

          - `"FinishAttestationSuccess"`

      - `FinishAttestationFailure object { k }`

        - `k: "FinishAttestationFailure"`

          Failed attestation

          - `"FinishAttestationFailure"`

      - `StartRotateCryptKey object { k }`

        - `k: "StartRotateCryptKey"`

          Started crypt key rotation

          - `"StartRotateCryptKey"`

      - `FinishRotateCryptKeySuccess object { k }`

        - `k: "FinishRotateCryptKeySuccess"`

          Finished crypt key rotation

          - `"FinishRotateCryptKeySuccess"`

      - `FinishRotateCryptKeyFailure object { k }`

        - `k: "FinishRotateCryptKeyFailure"`

          Failed crypt key rotation

          - `"FinishRotateCryptKeyFailure"`

      - `StartRotatePki object { k }`

        - `k: "StartRotatePki"`

          Started PKI rotation

          - `"StartRotatePki"`

      - `FinishRotatePkiSuccess object { k }`

        - `k: "FinishRotatePkiSuccess"`

          Finished PKI rotation

          - `"FinishRotatePkiSuccess"`

      - `FinishRotatePkiFailure object { k }`

        - `k: "FinishRotatePkiFailure"`

          Failed PKI rotation

          - `"FinishRotatePkiFailure"`

      - `StartUpgrade object { k, url }`

        - `k: "StartUpgrade"`

          Started upgrade

          - `"StartUpgrade"`

        - `url: string`

          Location of upgrade bundle

      - `FinishUpgradeSuccess object { k }`

        - `k: "FinishUpgradeSuccess"`

          Finished upgrade

          - `"FinishUpgradeSuccess"`

      - `FinishUpgradeFailure object { k }`

        - `k: "FinishUpgradeFailure"`

          Failed upgrade

          - `"FinishUpgradeFailure"`

      - `Reconcile object { k }`

        - `k: "Reconcile"`

          Reconciled

          - `"Reconcile"`

      - `ConfigureCloudflaredTunnel object { k }`

        - `k: "ConfigureCloudflaredTunnel"`

          Configured Cloudflared tunnel

          - `"ConfigureCloudflaredTunnel"`

      - `RekeyInstallBoth object { k, tunnel_id }`

        - `k: "RekeyInstallBoth"`

          Installed initial inbound and outbound keys

          - `"RekeyInstallBoth"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyStart object { k, tunnel_id }`

        - `k: "RekeyStart"`

          Installed new inbound key, kept old outbound

          - `"RekeyStart"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyAdvance object { k, tunnel_id }`

        - `k: "RekeyAdvance"`

          Confirmed traffic on new inbound key, swapped outbound to new

          - `"RekeyAdvance"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyComplete object { k, tunnel_id }`

        - `k: "RekeyComplete"`

          Deleted old keys

          - `"RekeyComplete"`

        - `tunnel_id: string`

          Tunnel identifier

      - `RekeyReset object { k, tunnel_id }`

        - `k: "RekeyReset"`

          Deleted all keys after receiving an unexpected key

          - `"RekeyReset"`

        - `tunnel_id: string`

          Tunnel identifier

    - `n: number`

      Sequence number, used to order events with the same timestamp

    - `t: number`

      Time the Event was recorded (seconds since the Unix epoch)

    - `v: optional string`

      Version

# Snapshots

## List Snapshots

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots`

List Snapshots

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Query Parameters

- `from: number`

- `to: number`

- `cursor: optional string`

- `limit: optional number`

### Returns

- `result: object { count, items, cursor }`

  - `count: number`

  - `items: array of object { a, t }`

    - `a: number`

      Time the Snapshot was collected (seconds since the Unix epoch)

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

  - `cursor: optional string`

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/snapshots \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "a": 0,
        "t": 0
      }
    ],
    "cursor": "cursor"
  },
  "success": true,
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
  ]
}
```

## Get Snapshot

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/{snapshot_t}`

Get Snapshot

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

- `snapshot_t: number`

### Returns

- `result: object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

  Snapshot

  - `count_reclaim_failures: number`

    Count of failures to reclaim space

  - `count_reclaimed_paths: number`

    Count of reclaimed paths

  - `count_record_failed: number`

    Count of failed snapshot recordings

  - `count_transmit_failures: number`

    Count of failed snapshot transmissions

  - `t: number`

    Time the Snapshot was recorded (seconds since the Unix epoch)

  - `v: string`

    Version

  - `bonds: optional array of object { name, status }`

    - `name: string`

      Name of the network interface

    - `status: string`

      Current status of the network interface

  - `cpu_count: optional number`

    Count of processors/cores

  - `cpu_pressure_10s: optional number`

    Percentage of time over a 10 second window that tasks were stalled

  - `cpu_pressure_300s: optional number`

    Percentage of time over a 5 minute window that tasks were stalled

  - `cpu_pressure_60s: optional number`

    Percentage of time over a 1 minute window that tasks were stalled

  - `cpu_pressure_total_us: optional number`

    Total stall time (microseconds)

  - `cpu_time_guest_ms: optional number`

    Time spent running a virtual CPU or guest OS (milliseconds)

  - `cpu_time_guest_nice_ms: optional number`

    Time spent running a niced guest (milliseconds)

  - `cpu_time_idle_ms: optional number`

    Time spent in idle state (milliseconds)

  - `cpu_time_iowait_ms: optional number`

    Time spent wait for I/O to complete (milliseconds)

  - `cpu_time_irq_ms: optional number`

    Time spent servicing interrupts (milliseconds)

  - `cpu_time_nice_ms: optional number`

    Time spent in low-priority user mode (milliseconds)

  - `cpu_time_softirq_ms: optional number`

    Time spent servicing softirqs (milliseconds)

  - `cpu_time_steal_ms: optional number`

    Time stolen (milliseconds)

  - `cpu_time_system_ms: optional number`

    Time spent in system mode (milliseconds)

  - `cpu_time_user_ms: optional number`

    Time spent in user mode (milliseconds)

  - `delta: optional number`

    Number of network operations applied during state transition

  - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

    - `client_id: string`

      Client ID of the device the IP Address was leased to

    - `expiry_time: number`

      Expiry time of the DHCP lease (seconds since the Unix epoch)

    - `hostname: string`

      Hostname of the device the IP Address was leased to

    - `interface_name: string`

      Name of the network interface

    - `ip_address: string`

      IP Address that was leased

    - `mac_address: string`

      MAC Address of the device the IP Address was leased to

  - `disks: optional array of object { in_progress, major, merged, 17 more }`

    - `in_progress: number`

      I/Os currently in progress

    - `major: number`

      Device major number

    - `merged: number`

      Reads merged

    - `minor: number`

      Device minor number

    - `name: string`

      Device name

    - `reads: number`

      Reads completed successfully

    - `sectors_read: number`

      Sectors read successfully

    - `sectors_written: number`

      Sectors written successfully

    - `time_in_progress_ms: number`

      Time spent doing I/Os (milliseconds)

    - `time_reading_ms: number`

      Time spent reading (milliseconds)

    - `time_writing_ms: number`

      Time spent writing (milliseconds)

    - `weighted_time_in_progress_ms: number`

      Weighted time spent doing I/Os (milliseconds)

    - `writes: number`

      Writes completed

    - `writes_merged: number`

      Writes merged

    - `discards: optional number`

      Discards completed successfully

    - `discards_merged: optional number`

      Discards merged

    - `flushes: optional number`

      Flushes completed successfully

    - `sectors_discarded: optional number`

      Sectors discarded

    - `time_discarding_ms: optional number`

      Time spent discarding (milliseconds)

    - `time_flushing_ms: optional number`

      Time spent flushing (milliseconds)

  - `epsilon: optional number`

    Simulated number of network operations applied during state transition

  - `ha_state: optional string`

    Name of high availability state

  - `ha_value: optional number`

    Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

  - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

    - `name: string`

      Name of the network interface

    - `operstate: string`

      UP/DOWN state of the network interface

    - `ip_addresses: optional array of object { interface_name, ip_address }`

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP address of the network interface

    - `speed: optional number`

      Speed of the network interface (bits per second)

  - `io_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `io_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `io_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `io_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `io_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `io_pressure_some_300s: optional number`

    Percentage of time over a 3 minute window that some tasks were stalled

  - `io_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `io_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `kernel_btime: optional number`

    Boot time (seconds since Unix epoch)

  - `kernel_ctxt: optional number`

    Number of context switches that the system underwent

  - `kernel_processes: optional number`

    Number of forks since boot

  - `kernel_processes_blocked: optional number`

    Number of processes blocked waiting for I/O

  - `kernel_processes_running: optional number`

    Number of processes in runnable state

  - `load_average_15m: optional number`

    The fifteen-minute load average

  - `load_average_1m: optional number`

    The one-minute load average

  - `load_average_5m: optional number`

    The five-minute load average

  - `load_average_cur: optional number`

    Number of currently runnable kernel scheduling entities

  - `load_average_max: optional number`

    Number of kernel scheduling entities that currently exist on the system

  - `memory_active_bytes: optional number`

    Memory that has been used more recently

  - `memory_anon_hugepages_bytes: optional number`

    Non-file backed huge pages mapped into user-space page tables

  - `memory_anon_pages_bytes: optional number`

    Non-file backed pages mapped into user-space page tables

  - `memory_available_bytes: optional number`

    Estimate of how much memory is available for starting new applications

  - `memory_bounce_bytes: optional number`

    Memory used for block device bounce buffers

  - `memory_buffers_bytes: optional number`

    Relatively temporary storage for raw disk blocks

  - `memory_cached_bytes: optional number`

    In-memory cache for files read from the disk

  - `memory_cma_free_bytes: optional number`

    Free CMA (Contiguous Memory Allocator) pages

  - `memory_cma_total_bytes: optional number`

    Total CMA (Contiguous Memory Allocator) pages

  - `memory_commit_limit_bytes: optional number`

    Total amount of memory currently available to be allocated on the system

  - `memory_committed_as_bytes: optional number`

    Amount of memory presently allocated on the system

  - `memory_dirty_bytes: optional number`

    Memory which is waiting to get written back to the disk

  - `memory_free_bytes: optional number`

    The sum of LowFree and HighFree

  - `memory_high_free_bytes: optional number`

    Amount of free highmem

  - `memory_high_total_bytes: optional number`

    Total amount of highmem

  - `memory_hugepages_free: optional number`

    The number of huge pages in the pool that are not yet allocated

  - `memory_hugepages_rsvd: optional number`

    Number of huge pages for which a commitment has been made, but no allocation has yet been made

  - `memory_hugepages_surp: optional number`

    Number of huge pages in the pool above the threshold

  - `memory_hugepages_total: optional number`

    The size of the pool of huge pages

  - `memory_hugepagesize_bytes: optional number`

    The size of huge pages

  - `memory_inactive_bytes: optional number`

    Memory which has been less recently used

  - `memory_k_reclaimable_bytes: optional number`

    Kernel allocations that the kernel will attempt to reclaim under memory pressure

  - `memory_kernel_stack_bytes: optional number`

    Amount of memory allocated to kernel stacks

  - `memory_low_free_bytes: optional number`

    Amount of free lowmem

  - `memory_low_total_bytes: optional number`

    Total amount of lowmem

  - `memory_mapped_bytes: optional number`

    Files which have been mapped into memory

  - `memory_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_per_cpu_bytes: optional number`

    Memory allocated to the per-cpu alloctor used to back per-cpu allocations

  - `memory_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `memory_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `memory_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `memory_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `memory_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `memory_pressure_some_300s: optional number`

    Percentage of time over a 5 minute window that some tasks were stalled

  - `memory_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `memory_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `memory_s_reclaimable_bytes: optional number`

    Part of slab that can be reclaimed on memory pressure

  - `memory_s_unreclaim_bytes: optional number`

    Part of slab that cannot be reclaimed on memory pressure

  - `memory_secondary_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_shmem_bytes: optional number`

    Amount of memory consumed by tmpfs

  - `memory_shmem_hugepages_bytes: optional number`

    Memory used by shmem and tmpfs, allocated with huge pages

  - `memory_shmem_pmd_mapped_bytes: optional number`

    Shared memory mapped into user space with huge pages

  - `memory_slab_bytes: optional number`

    In-kernel data structures cache

  - `memory_swap_cached_bytes: optional number`

    Memory swapped out and back in while still in swap file

  - `memory_swap_free_bytes: optional number`

    Amount of swap space that is currently unused

  - `memory_swap_total_bytes: optional number`

    Total amount of swap space available

  - `memory_total_bytes: optional number`

    Total usable RAM

  - `memory_vmalloc_chunk_bytes: optional number`

    Largest contiguous block of vmalloc area which is free

  - `memory_vmalloc_total_bytes: optional number`

    Total size of vmalloc memory area

  - `memory_vmalloc_used_bytes: optional number`

    Amount of vmalloc area which is used

  - `memory_writeback_bytes: optional number`

    Memory which is actively being written back to the disk

  - `memory_writeback_tmp_bytes: optional number`

    Memory used by FUSE for temporary writeback buffers

  - `memory_z_swap_bytes: optional number`

    Memory consumed by the zswap backend, compressed

  - `memory_z_swapped_bytes: optional number`

    Amount of anonymous memory stored in zswap, uncompressed

  - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

    - `file_system: string`

      File system on disk (EXT4, NTFS, etc.)

    - `kind: string`

      Kind of disk (HDD, SSD, etc.)

    - `mount_point: string`

      Path where disk is mounted

    - `name: string`

      Name of the disk mount

    - `available_bytes: optional number`

      Available disk size (bytes)

    - `available_inodes: optional number`

      Available inodes on filesystem

    - `is_read_only: optional boolean`

      Determines whether the disk is read-only

    - `is_removable: optional boolean`

      Determines whether the disk is removable

    - `total_bytes: optional number`

      Total disk size (bytes)

    - `total_inodes: optional number`

      Total inodes on filesystem

  - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

    - `name: string`

      Name of the network device

    - `recv_bytes: number`

      Total bytes received

    - `recv_compressed: number`

      Compressed packets received

    - `recv_drop: number`

      Packets dropped

    - `recv_errs: number`

      Bad packets received

    - `recv_fifo: number`

      FIFO overruns

    - `recv_frame: number`

      Frame alignment errors

    - `recv_multicast: number`

      Multicast packets received

    - `recv_packets: number`

      Total packets received

    - `sent_bytes: number`

      Total bytes transmitted

    - `sent_carrier: number`

      Number of packets not sent due to carrier errors

    - `sent_colls: number`

      Number of collisions

    - `sent_compressed: number`

      Number of compressed packets transmitted

    - `sent_drop: number`

      Number of packets dropped during transmission

    - `sent_errs: number`

      Number of transmission errors

    - `sent_fifo: number`

      FIFO overruns

    - `sent_packets: number`

      Total packets transmitted

  - `platform: optional string`

    Platform identifier

  - `snmp_icmp_in_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages received

  - `snmp_icmp_in_addr_masks: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_csum_errors: optional number`

    Number of ICMP messages received with bad checksums

  - `snmp_icmp_in_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages received

  - `snmp_icmp_in_echo_reps: optional number`

    Number of ICMP Echo Reply messages received

  - `snmp_icmp_in_echos: optional number`

    Number of ICMP Echo (request) messages received

  - `snmp_icmp_in_errors: optional number`

    Number of ICMP messages received with ICMP-specific errors

  - `snmp_icmp_in_msgs: optional number`

    Number of ICMP messages received

  - `snmp_icmp_in_parm_probs: optional number`

    Number of ICMP Parameter Problem messages received

  - `snmp_icmp_in_redirects: optional number`

    Number of ICMP Redirect messages received

  - `snmp_icmp_in_src_quenchs: optional number`

    Number of ICMP Source Quench messages received

  - `snmp_icmp_in_time_excds: optional number`

    Number of ICMP Time Exceeded messages received

  - `snmp_icmp_in_timestamp_reps: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_timestamps: optional number`

    Number of ICMP Timestamp (request) messages received

  - `snmp_icmp_out_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages sent

  - `snmp_icmp_out_addr_masks: optional number`

    Number of ICMP Address Mask Request messages sent

  - `snmp_icmp_out_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages sent

  - `snmp_icmp_out_echo_reps: optional number`

    Number of ICMP Echo Reply messages sent

  - `snmp_icmp_out_echos: optional number`

    Number of ICMP Echo (request) messages sent

  - `snmp_icmp_out_errors: optional number`

    Number of ICMP messages which this entity did not send due to ICMP-specific errors

  - `snmp_icmp_out_msgs: optional number`

    Number of ICMP messages attempted to send

  - `snmp_icmp_out_parm_probs: optional number`

    Number of ICMP Parameter Problem messages sent

  - `snmp_icmp_out_redirects: optional number`

    Number of ICMP Redirect messages sent

  - `snmp_icmp_out_src_quenchs: optional number`

    Number of ICMP Source Quench messages sent

  - `snmp_icmp_out_time_excds: optional number`

    Number of ICMP Time Exceeded messages sent

  - `snmp_icmp_out_timestamp_reps: optional number`

    Number of ICMP Timestamp Reply messages sent

  - `snmp_icmp_out_timestamps: optional number`

    Number of ICMP Timestamp (request) messages sent

  - `snmp_ip_default_ttl: optional number`

    Default value of the Time-To-Live field of the IP header

  - `snmp_ip_forw_datagrams: optional number`

    Number of datagrams forwarded to their final destination

  - `snmp_ip_forwarding_enabled: optional boolean`

    Set when acting as an IP gateway

  - `snmp_ip_frag_creates: optional number`

    Number of datagrams generated by fragmentation

  - `snmp_ip_frag_fails: optional number`

    Number of datagrams discarded because fragmentation failed

  - `snmp_ip_frag_oks: optional number`

    Number of datagrams successfully fragmented

  - `snmp_ip_in_addr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP address

  - `snmp_ip_in_delivers: optional number`

    Number of input datagrams successfully delivered to IP user-protocols

  - `snmp_ip_in_discards: optional number`

    Number of input datagrams otherwise discarded

  - `snmp_ip_in_hdr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP header

  - `snmp_ip_in_receives: optional number`

    Number of input datagrams received from interfaces

  - `snmp_ip_in_unknown_protos: optional number`

    Number of input datagrams discarded due unknown or unsupported protocol

  - `snmp_ip_out_discards: optional number`

    Number of output datagrams otherwise discarded

  - `snmp_ip_out_no_routes: optional number`

    Number of output datagrams discarded because no route matched

  - `snmp_ip_out_requests: optional number`

    Number of datagrams supplied for transmission

  - `snmp_ip_reasm_fails: optional number`

    Number of failures detected by the reassembly algorithm

  - `snmp_ip_reasm_oks: optional number`

    Number of datagrams successfully reassembled

  - `snmp_ip_reasm_reqds: optional number`

    Number of fragments received which needed to be reassembled

  - `snmp_ip_reasm_timeout: optional number`

    Number of seconds fragments are held while awaiting reassembly

  - `snmp_tcp_active_opens: optional number`

    Number of times TCP transitions to SYN-SENT from CLOSED

  - `snmp_tcp_attempt_fails: optional number`

    Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

  - `snmp_tcp_curr_estab: optional number`

    Number of TCP connections in ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_estab_resets: optional number`

    Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_in_csum_errors: optional number`

    Number of TCP segments received with checksum errors

  - `snmp_tcp_in_errs: optional number`

    Number of TCP segments received in error

  - `snmp_tcp_in_segs: optional number`

    Number of TCP segments received

  - `snmp_tcp_max_conn: optional number`

    Limit on the total number of TCP connections

  - `snmp_tcp_out_rsts: optional number`

    Number of TCP segments sent with RST flag

  - `snmp_tcp_out_segs: optional number`

    Number of TCP segments sent

  - `snmp_tcp_passive_opens: optional number`

    Number of times TCP transitions to SYN-RCVD from LISTEN

  - `snmp_tcp_retrans_segs: optional number`

    Number of TCP segments retransmitted

  - `snmp_tcp_rto_max: optional number`

    Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_tcp_rto_min: optional number`

    Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_udp_in_datagrams: optional number`

    Number of UDP datagrams delivered to UDP applications

  - `snmp_udp_in_errors: optional number`

    Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

  - `snmp_udp_no_ports: optional number`

    Number of UDP datagrams received for which there was not application at the destination port

  - `snmp_udp_out_datagrams: optional number`

    Number of UDP datagrams sent

  - `system_boot_time_s: optional number`

    Boottime of the system (seconds since the Unix epoch)

  - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

    - `label: string`

      Sensor identifier for the component

    - `critical_celcius: optional number`

      Critical failure temperature of the component (degrees Celsius)

    - `current_celcius: optional number`

      Current temperature of the component (degrees Celsius)

    - `max_celcius: optional number`

      Maximum temperature of the component (degrees Celsius)

  - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

    - `health_state: string`

      Name of tunnel health state (unknown, healthy, degraded, down)

    - `health_value: number`

      Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

    - `interface_name: string`

      The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

    - `tunnel_id: string`

      Tunnel identifier

    - `natd_result: optional string`

      Public socket address returned by the NAT detector

    - `natd_state: optional number`

      Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

    - `natd_target: optional string`

      Target socket address probed by the NAT detector, using the detector source port

    - `probed_mtu: optional number`

      MTU as measured between the two ends of the tunnel

    - `recent_healthy_pings: optional number`

      Number of recent healthy pings for this tunnel

    - `recent_unhealthy_pings: optional number`

      Number of recent unhealthy pings for this tunnel

  - `uptime_idle_ms: optional number`

    Sum of how much time each core has spent idle

  - `uptime_total_ms: optional number`

    Uptime of the system, including time spent in suspend

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/snapshots/$SNAPSHOT_T \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count_reclaim_failures": 0,
    "count_reclaimed_paths": 0,
    "count_record_failed": 0,
    "count_transmit_failures": 0,
    "t": 0,
    "v": "v",
    "bonds": [
      {
        "name": "name",
        "status": "status"
      }
    ],
    "cpu_count": 0,
    "cpu_pressure_10s": 0,
    "cpu_pressure_300s": 0,
    "cpu_pressure_60s": 0,
    "cpu_pressure_total_us": 0,
    "cpu_time_guest_ms": 0,
    "cpu_time_guest_nice_ms": 0,
    "cpu_time_idle_ms": 0,
    "cpu_time_iowait_ms": 0,
    "cpu_time_irq_ms": 0,
    "cpu_time_nice_ms": 0,
    "cpu_time_softirq_ms": 0,
    "cpu_time_steal_ms": 0,
    "cpu_time_system_ms": 0,
    "cpu_time_user_ms": 0,
    "delta": 0,
    "dhcp_leases": [
      {
        "client_id": "client_id",
        "expiry_time": 0,
        "hostname": "hostname",
        "interface_name": "interface_name",
        "ip_address": "ip_address",
        "mac_address": "mac_address"
      }
    ],
    "disks": [
      {
        "in_progress": 0,
        "major": 0,
        "merged": 0,
        "minor": 0,
        "name": "name",
        "reads": 0,
        "sectors_read": 0,
        "sectors_written": 0,
        "time_in_progress_ms": 0,
        "time_reading_ms": 0,
        "time_writing_ms": 0,
        "weighted_time_in_progress_ms": 0,
        "writes": 0,
        "writes_merged": 0,
        "discards": 0,
        "discards_merged": 0,
        "flushes": 0,
        "sectors_discarded": 0,
        "time_discarding_ms": 0,
        "time_flushing_ms": 0
      }
    ],
    "epsilon": 0,
    "ha_state": "ha_state",
    "ha_value": 0,
    "interfaces": [
      {
        "name": "name",
        "operstate": "operstate",
        "ip_addresses": [
          {
            "interface_name": "interface_name",
            "ip_address": "ip_address"
          }
        ],
        "speed": 0
      }
    ],
    "io_pressure_full_10s": 0,
    "io_pressure_full_300s": 0,
    "io_pressure_full_60s": 0,
    "io_pressure_full_total_us": 0,
    "io_pressure_some_10s": 0,
    "io_pressure_some_300s": 0,
    "io_pressure_some_60s": 0,
    "io_pressure_some_total_us": 0,
    "kernel_btime": 0,
    "kernel_ctxt": 0,
    "kernel_processes": 0,
    "kernel_processes_blocked": 0,
    "kernel_processes_running": 0,
    "load_average_15m": 0,
    "load_average_1m": 0,
    "load_average_5m": 0,
    "load_average_cur": 0,
    "load_average_max": 0,
    "memory_active_bytes": 0,
    "memory_anon_hugepages_bytes": 0,
    "memory_anon_pages_bytes": 0,
    "memory_available_bytes": 0,
    "memory_bounce_bytes": 0,
    "memory_buffers_bytes": 0,
    "memory_cached_bytes": 0,
    "memory_cma_free_bytes": 0,
    "memory_cma_total_bytes": 0,
    "memory_commit_limit_bytes": 0,
    "memory_committed_as_bytes": 0,
    "memory_dirty_bytes": 0,
    "memory_free_bytes": 0,
    "memory_high_free_bytes": 0,
    "memory_high_total_bytes": 0,
    "memory_hugepages_free": 0,
    "memory_hugepages_rsvd": 0,
    "memory_hugepages_surp": 0,
    "memory_hugepages_total": 0,
    "memory_hugepagesize_bytes": 0,
    "memory_inactive_bytes": 0,
    "memory_k_reclaimable_bytes": 0,
    "memory_kernel_stack_bytes": 0,
    "memory_low_free_bytes": 0,
    "memory_low_total_bytes": 0,
    "memory_mapped_bytes": 0,
    "memory_page_tables_bytes": 0,
    "memory_per_cpu_bytes": 0,
    "memory_pressure_full_10s": 0,
    "memory_pressure_full_300s": 0,
    "memory_pressure_full_60s": 0,
    "memory_pressure_full_total_us": 0,
    "memory_pressure_some_10s": 0,
    "memory_pressure_some_300s": 0,
    "memory_pressure_some_60s": 0,
    "memory_pressure_some_total_us": 0,
    "memory_s_reclaimable_bytes": 0,
    "memory_s_unreclaim_bytes": 0,
    "memory_secondary_page_tables_bytes": 0,
    "memory_shmem_bytes": 0,
    "memory_shmem_hugepages_bytes": 0,
    "memory_shmem_pmd_mapped_bytes": 0,
    "memory_slab_bytes": 0,
    "memory_swap_cached_bytes": 0,
    "memory_swap_free_bytes": 0,
    "memory_swap_total_bytes": 0,
    "memory_total_bytes": 0,
    "memory_vmalloc_chunk_bytes": 0,
    "memory_vmalloc_total_bytes": 0,
    "memory_vmalloc_used_bytes": 0,
    "memory_writeback_bytes": 0,
    "memory_writeback_tmp_bytes": 0,
    "memory_z_swap_bytes": 0,
    "memory_z_swapped_bytes": 0,
    "mounts": [
      {
        "file_system": "file_system",
        "kind": "kind",
        "mount_point": "mount_point",
        "name": "name",
        "available_bytes": 0,
        "available_inodes": 0,
        "is_read_only": true,
        "is_removable": true,
        "total_bytes": 0,
        "total_inodes": 0
      }
    ],
    "netdevs": [
      {
        "name": "name",
        "recv_bytes": 0,
        "recv_compressed": 0,
        "recv_drop": 0,
        "recv_errs": 0,
        "recv_fifo": 0,
        "recv_frame": 0,
        "recv_multicast": 0,
        "recv_packets": 0,
        "sent_bytes": 0,
        "sent_carrier": 0,
        "sent_colls": 0,
        "sent_compressed": 0,
        "sent_drop": 0,
        "sent_errs": 0,
        "sent_fifo": 0,
        "sent_packets": 0
      }
    ],
    "platform": "platform",
    "snmp_icmp_in_addr_mask_reps": 0,
    "snmp_icmp_in_addr_masks": 0,
    "snmp_icmp_in_csum_errors": 0,
    "snmp_icmp_in_dest_unreachs": 0,
    "snmp_icmp_in_echo_reps": 0,
    "snmp_icmp_in_echos": 0,
    "snmp_icmp_in_errors": 0,
    "snmp_icmp_in_msgs": 0,
    "snmp_icmp_in_parm_probs": 0,
    "snmp_icmp_in_redirects": 0,
    "snmp_icmp_in_src_quenchs": 0,
    "snmp_icmp_in_time_excds": 0,
    "snmp_icmp_in_timestamp_reps": 0,
    "snmp_icmp_in_timestamps": 0,
    "snmp_icmp_out_addr_mask_reps": 0,
    "snmp_icmp_out_addr_masks": 0,
    "snmp_icmp_out_dest_unreachs": 0,
    "snmp_icmp_out_echo_reps": 0,
    "snmp_icmp_out_echos": 0,
    "snmp_icmp_out_errors": 0,
    "snmp_icmp_out_msgs": 0,
    "snmp_icmp_out_parm_probs": 0,
    "snmp_icmp_out_redirects": 0,
    "snmp_icmp_out_src_quenchs": 0,
    "snmp_icmp_out_time_excds": 0,
    "snmp_icmp_out_timestamp_reps": 0,
    "snmp_icmp_out_timestamps": 0,
    "snmp_ip_default_ttl": 0,
    "snmp_ip_forw_datagrams": 0,
    "snmp_ip_forwarding_enabled": true,
    "snmp_ip_frag_creates": 0,
    "snmp_ip_frag_fails": 0,
    "snmp_ip_frag_oks": 0,
    "snmp_ip_in_addr_errors": 0,
    "snmp_ip_in_delivers": 0,
    "snmp_ip_in_discards": 0,
    "snmp_ip_in_hdr_errors": 0,
    "snmp_ip_in_receives": 0,
    "snmp_ip_in_unknown_protos": 0,
    "snmp_ip_out_discards": 0,
    "snmp_ip_out_no_routes": 0,
    "snmp_ip_out_requests": 0,
    "snmp_ip_reasm_fails": 0,
    "snmp_ip_reasm_oks": 0,
    "snmp_ip_reasm_reqds": 0,
    "snmp_ip_reasm_timeout": 0,
    "snmp_tcp_active_opens": 0,
    "snmp_tcp_attempt_fails": 0,
    "snmp_tcp_curr_estab": 0,
    "snmp_tcp_estab_resets": 0,
    "snmp_tcp_in_csum_errors": 0,
    "snmp_tcp_in_errs": 0,
    "snmp_tcp_in_segs": 0,
    "snmp_tcp_max_conn": 0,
    "snmp_tcp_out_rsts": 0,
    "snmp_tcp_out_segs": 0,
    "snmp_tcp_passive_opens": 0,
    "snmp_tcp_retrans_segs": 0,
    "snmp_tcp_rto_max": 0,
    "snmp_tcp_rto_min": 0,
    "snmp_udp_in_datagrams": 0,
    "snmp_udp_in_errors": 0,
    "snmp_udp_no_ports": 0,
    "snmp_udp_out_datagrams": 0,
    "system_boot_time_s": 0,
    "thermals": [
      {
        "label": "label",
        "critical_celcius": 0,
        "current_celcius": 0,
        "max_celcius": 0
      }
    ],
    "tunnels": [
      {
        "health_state": "health_state",
        "health_value": 0,
        "interface_name": "interface_name",
        "tunnel_id": "tunnel_id",
        "natd_result": "natd_result",
        "natd_state": 0,
        "natd_target": "natd_target",
        "probed_mtu": 0,
        "recent_healthy_pings": 0,
        "recent_unhealthy_pings": 0
      }
    ],
    "uptime_idle_ms": 0,
    "uptime_total_ms": 0
  },
  "success": true,
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
  ]
}
```

## Domain Types

### Snapshot List Response

- `SnapshotListResponse object { count, items, cursor }`

  - `count: number`

  - `items: array of object { a, t }`

    - `a: number`

      Time the Snapshot was collected (seconds since the Unix epoch)

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

  - `cursor: optional string`

### Snapshot Get Response

- `SnapshotGetResponse object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

  Snapshot

  - `count_reclaim_failures: number`

    Count of failures to reclaim space

  - `count_reclaimed_paths: number`

    Count of reclaimed paths

  - `count_record_failed: number`

    Count of failed snapshot recordings

  - `count_transmit_failures: number`

    Count of failed snapshot transmissions

  - `t: number`

    Time the Snapshot was recorded (seconds since the Unix epoch)

  - `v: string`

    Version

  - `bonds: optional array of object { name, status }`

    - `name: string`

      Name of the network interface

    - `status: string`

      Current status of the network interface

  - `cpu_count: optional number`

    Count of processors/cores

  - `cpu_pressure_10s: optional number`

    Percentage of time over a 10 second window that tasks were stalled

  - `cpu_pressure_300s: optional number`

    Percentage of time over a 5 minute window that tasks were stalled

  - `cpu_pressure_60s: optional number`

    Percentage of time over a 1 minute window that tasks were stalled

  - `cpu_pressure_total_us: optional number`

    Total stall time (microseconds)

  - `cpu_time_guest_ms: optional number`

    Time spent running a virtual CPU or guest OS (milliseconds)

  - `cpu_time_guest_nice_ms: optional number`

    Time spent running a niced guest (milliseconds)

  - `cpu_time_idle_ms: optional number`

    Time spent in idle state (milliseconds)

  - `cpu_time_iowait_ms: optional number`

    Time spent wait for I/O to complete (milliseconds)

  - `cpu_time_irq_ms: optional number`

    Time spent servicing interrupts (milliseconds)

  - `cpu_time_nice_ms: optional number`

    Time spent in low-priority user mode (milliseconds)

  - `cpu_time_softirq_ms: optional number`

    Time spent servicing softirqs (milliseconds)

  - `cpu_time_steal_ms: optional number`

    Time stolen (milliseconds)

  - `cpu_time_system_ms: optional number`

    Time spent in system mode (milliseconds)

  - `cpu_time_user_ms: optional number`

    Time spent in user mode (milliseconds)

  - `delta: optional number`

    Number of network operations applied during state transition

  - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

    - `client_id: string`

      Client ID of the device the IP Address was leased to

    - `expiry_time: number`

      Expiry time of the DHCP lease (seconds since the Unix epoch)

    - `hostname: string`

      Hostname of the device the IP Address was leased to

    - `interface_name: string`

      Name of the network interface

    - `ip_address: string`

      IP Address that was leased

    - `mac_address: string`

      MAC Address of the device the IP Address was leased to

  - `disks: optional array of object { in_progress, major, merged, 17 more }`

    - `in_progress: number`

      I/Os currently in progress

    - `major: number`

      Device major number

    - `merged: number`

      Reads merged

    - `minor: number`

      Device minor number

    - `name: string`

      Device name

    - `reads: number`

      Reads completed successfully

    - `sectors_read: number`

      Sectors read successfully

    - `sectors_written: number`

      Sectors written successfully

    - `time_in_progress_ms: number`

      Time spent doing I/Os (milliseconds)

    - `time_reading_ms: number`

      Time spent reading (milliseconds)

    - `time_writing_ms: number`

      Time spent writing (milliseconds)

    - `weighted_time_in_progress_ms: number`

      Weighted time spent doing I/Os (milliseconds)

    - `writes: number`

      Writes completed

    - `writes_merged: number`

      Writes merged

    - `discards: optional number`

      Discards completed successfully

    - `discards_merged: optional number`

      Discards merged

    - `flushes: optional number`

      Flushes completed successfully

    - `sectors_discarded: optional number`

      Sectors discarded

    - `time_discarding_ms: optional number`

      Time spent discarding (milliseconds)

    - `time_flushing_ms: optional number`

      Time spent flushing (milliseconds)

  - `epsilon: optional number`

    Simulated number of network operations applied during state transition

  - `ha_state: optional string`

    Name of high availability state

  - `ha_value: optional number`

    Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

  - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

    - `name: string`

      Name of the network interface

    - `operstate: string`

      UP/DOWN state of the network interface

    - `ip_addresses: optional array of object { interface_name, ip_address }`

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP address of the network interface

    - `speed: optional number`

      Speed of the network interface (bits per second)

  - `io_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `io_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `io_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `io_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `io_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `io_pressure_some_300s: optional number`

    Percentage of time over a 3 minute window that some tasks were stalled

  - `io_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `io_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `kernel_btime: optional number`

    Boot time (seconds since Unix epoch)

  - `kernel_ctxt: optional number`

    Number of context switches that the system underwent

  - `kernel_processes: optional number`

    Number of forks since boot

  - `kernel_processes_blocked: optional number`

    Number of processes blocked waiting for I/O

  - `kernel_processes_running: optional number`

    Number of processes in runnable state

  - `load_average_15m: optional number`

    The fifteen-minute load average

  - `load_average_1m: optional number`

    The one-minute load average

  - `load_average_5m: optional number`

    The five-minute load average

  - `load_average_cur: optional number`

    Number of currently runnable kernel scheduling entities

  - `load_average_max: optional number`

    Number of kernel scheduling entities that currently exist on the system

  - `memory_active_bytes: optional number`

    Memory that has been used more recently

  - `memory_anon_hugepages_bytes: optional number`

    Non-file backed huge pages mapped into user-space page tables

  - `memory_anon_pages_bytes: optional number`

    Non-file backed pages mapped into user-space page tables

  - `memory_available_bytes: optional number`

    Estimate of how much memory is available for starting new applications

  - `memory_bounce_bytes: optional number`

    Memory used for block device bounce buffers

  - `memory_buffers_bytes: optional number`

    Relatively temporary storage for raw disk blocks

  - `memory_cached_bytes: optional number`

    In-memory cache for files read from the disk

  - `memory_cma_free_bytes: optional number`

    Free CMA (Contiguous Memory Allocator) pages

  - `memory_cma_total_bytes: optional number`

    Total CMA (Contiguous Memory Allocator) pages

  - `memory_commit_limit_bytes: optional number`

    Total amount of memory currently available to be allocated on the system

  - `memory_committed_as_bytes: optional number`

    Amount of memory presently allocated on the system

  - `memory_dirty_bytes: optional number`

    Memory which is waiting to get written back to the disk

  - `memory_free_bytes: optional number`

    The sum of LowFree and HighFree

  - `memory_high_free_bytes: optional number`

    Amount of free highmem

  - `memory_high_total_bytes: optional number`

    Total amount of highmem

  - `memory_hugepages_free: optional number`

    The number of huge pages in the pool that are not yet allocated

  - `memory_hugepages_rsvd: optional number`

    Number of huge pages for which a commitment has been made, but no allocation has yet been made

  - `memory_hugepages_surp: optional number`

    Number of huge pages in the pool above the threshold

  - `memory_hugepages_total: optional number`

    The size of the pool of huge pages

  - `memory_hugepagesize_bytes: optional number`

    The size of huge pages

  - `memory_inactive_bytes: optional number`

    Memory which has been less recently used

  - `memory_k_reclaimable_bytes: optional number`

    Kernel allocations that the kernel will attempt to reclaim under memory pressure

  - `memory_kernel_stack_bytes: optional number`

    Amount of memory allocated to kernel stacks

  - `memory_low_free_bytes: optional number`

    Amount of free lowmem

  - `memory_low_total_bytes: optional number`

    Total amount of lowmem

  - `memory_mapped_bytes: optional number`

    Files which have been mapped into memory

  - `memory_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_per_cpu_bytes: optional number`

    Memory allocated to the per-cpu alloctor used to back per-cpu allocations

  - `memory_pressure_full_10s: optional number`

    Percentage of time over a 10 second window that all tasks were stalled

  - `memory_pressure_full_300s: optional number`

    Percentage of time over a 5 minute window that all tasks were stalled

  - `memory_pressure_full_60s: optional number`

    Percentage of time over a 1 minute window that all tasks were stalled

  - `memory_pressure_full_total_us: optional number`

    Total stall time (microseconds)

  - `memory_pressure_some_10s: optional number`

    Percentage of time over a 10 second window that some tasks were stalled

  - `memory_pressure_some_300s: optional number`

    Percentage of time over a 5 minute window that some tasks were stalled

  - `memory_pressure_some_60s: optional number`

    Percentage of time over a 1 minute window that some tasks were stalled

  - `memory_pressure_some_total_us: optional number`

    Total stall time (microseconds)

  - `memory_s_reclaimable_bytes: optional number`

    Part of slab that can be reclaimed on memory pressure

  - `memory_s_unreclaim_bytes: optional number`

    Part of slab that cannot be reclaimed on memory pressure

  - `memory_secondary_page_tables_bytes: optional number`

    Amount of memory dedicated to the lowest level of page tables

  - `memory_shmem_bytes: optional number`

    Amount of memory consumed by tmpfs

  - `memory_shmem_hugepages_bytes: optional number`

    Memory used by shmem and tmpfs, allocated with huge pages

  - `memory_shmem_pmd_mapped_bytes: optional number`

    Shared memory mapped into user space with huge pages

  - `memory_slab_bytes: optional number`

    In-kernel data structures cache

  - `memory_swap_cached_bytes: optional number`

    Memory swapped out and back in while still in swap file

  - `memory_swap_free_bytes: optional number`

    Amount of swap space that is currently unused

  - `memory_swap_total_bytes: optional number`

    Total amount of swap space available

  - `memory_total_bytes: optional number`

    Total usable RAM

  - `memory_vmalloc_chunk_bytes: optional number`

    Largest contiguous block of vmalloc area which is free

  - `memory_vmalloc_total_bytes: optional number`

    Total size of vmalloc memory area

  - `memory_vmalloc_used_bytes: optional number`

    Amount of vmalloc area which is used

  - `memory_writeback_bytes: optional number`

    Memory which is actively being written back to the disk

  - `memory_writeback_tmp_bytes: optional number`

    Memory used by FUSE for temporary writeback buffers

  - `memory_z_swap_bytes: optional number`

    Memory consumed by the zswap backend, compressed

  - `memory_z_swapped_bytes: optional number`

    Amount of anonymous memory stored in zswap, uncompressed

  - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

    - `file_system: string`

      File system on disk (EXT4, NTFS, etc.)

    - `kind: string`

      Kind of disk (HDD, SSD, etc.)

    - `mount_point: string`

      Path where disk is mounted

    - `name: string`

      Name of the disk mount

    - `available_bytes: optional number`

      Available disk size (bytes)

    - `available_inodes: optional number`

      Available inodes on filesystem

    - `is_read_only: optional boolean`

      Determines whether the disk is read-only

    - `is_removable: optional boolean`

      Determines whether the disk is removable

    - `total_bytes: optional number`

      Total disk size (bytes)

    - `total_inodes: optional number`

      Total inodes on filesystem

  - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

    - `name: string`

      Name of the network device

    - `recv_bytes: number`

      Total bytes received

    - `recv_compressed: number`

      Compressed packets received

    - `recv_drop: number`

      Packets dropped

    - `recv_errs: number`

      Bad packets received

    - `recv_fifo: number`

      FIFO overruns

    - `recv_frame: number`

      Frame alignment errors

    - `recv_multicast: number`

      Multicast packets received

    - `recv_packets: number`

      Total packets received

    - `sent_bytes: number`

      Total bytes transmitted

    - `sent_carrier: number`

      Number of packets not sent due to carrier errors

    - `sent_colls: number`

      Number of collisions

    - `sent_compressed: number`

      Number of compressed packets transmitted

    - `sent_drop: number`

      Number of packets dropped during transmission

    - `sent_errs: number`

      Number of transmission errors

    - `sent_fifo: number`

      FIFO overruns

    - `sent_packets: number`

      Total packets transmitted

  - `platform: optional string`

    Platform identifier

  - `snmp_icmp_in_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages received

  - `snmp_icmp_in_addr_masks: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_csum_errors: optional number`

    Number of ICMP messages received with bad checksums

  - `snmp_icmp_in_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages received

  - `snmp_icmp_in_echo_reps: optional number`

    Number of ICMP Echo Reply messages received

  - `snmp_icmp_in_echos: optional number`

    Number of ICMP Echo (request) messages received

  - `snmp_icmp_in_errors: optional number`

    Number of ICMP messages received with ICMP-specific errors

  - `snmp_icmp_in_msgs: optional number`

    Number of ICMP messages received

  - `snmp_icmp_in_parm_probs: optional number`

    Number of ICMP Parameter Problem messages received

  - `snmp_icmp_in_redirects: optional number`

    Number of ICMP Redirect messages received

  - `snmp_icmp_in_src_quenchs: optional number`

    Number of ICMP Source Quench messages received

  - `snmp_icmp_in_time_excds: optional number`

    Number of ICMP Time Exceeded messages received

  - `snmp_icmp_in_timestamp_reps: optional number`

    Number of ICMP Address Mask Request messages received

  - `snmp_icmp_in_timestamps: optional number`

    Number of ICMP Timestamp (request) messages received

  - `snmp_icmp_out_addr_mask_reps: optional number`

    Number of ICMP Address Mask Reply messages sent

  - `snmp_icmp_out_addr_masks: optional number`

    Number of ICMP Address Mask Request messages sent

  - `snmp_icmp_out_dest_unreachs: optional number`

    Number of ICMP Destination Unreachable messages sent

  - `snmp_icmp_out_echo_reps: optional number`

    Number of ICMP Echo Reply messages sent

  - `snmp_icmp_out_echos: optional number`

    Number of ICMP Echo (request) messages sent

  - `snmp_icmp_out_errors: optional number`

    Number of ICMP messages which this entity did not send due to ICMP-specific errors

  - `snmp_icmp_out_msgs: optional number`

    Number of ICMP messages attempted to send

  - `snmp_icmp_out_parm_probs: optional number`

    Number of ICMP Parameter Problem messages sent

  - `snmp_icmp_out_redirects: optional number`

    Number of ICMP Redirect messages sent

  - `snmp_icmp_out_src_quenchs: optional number`

    Number of ICMP Source Quench messages sent

  - `snmp_icmp_out_time_excds: optional number`

    Number of ICMP Time Exceeded messages sent

  - `snmp_icmp_out_timestamp_reps: optional number`

    Number of ICMP Timestamp Reply messages sent

  - `snmp_icmp_out_timestamps: optional number`

    Number of ICMP Timestamp (request) messages sent

  - `snmp_ip_default_ttl: optional number`

    Default value of the Time-To-Live field of the IP header

  - `snmp_ip_forw_datagrams: optional number`

    Number of datagrams forwarded to their final destination

  - `snmp_ip_forwarding_enabled: optional boolean`

    Set when acting as an IP gateway

  - `snmp_ip_frag_creates: optional number`

    Number of datagrams generated by fragmentation

  - `snmp_ip_frag_fails: optional number`

    Number of datagrams discarded because fragmentation failed

  - `snmp_ip_frag_oks: optional number`

    Number of datagrams successfully fragmented

  - `snmp_ip_in_addr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP address

  - `snmp_ip_in_delivers: optional number`

    Number of input datagrams successfully delivered to IP user-protocols

  - `snmp_ip_in_discards: optional number`

    Number of input datagrams otherwise discarded

  - `snmp_ip_in_hdr_errors: optional number`

    Number of input datagrams discarded due to errors in the IP header

  - `snmp_ip_in_receives: optional number`

    Number of input datagrams received from interfaces

  - `snmp_ip_in_unknown_protos: optional number`

    Number of input datagrams discarded due unknown or unsupported protocol

  - `snmp_ip_out_discards: optional number`

    Number of output datagrams otherwise discarded

  - `snmp_ip_out_no_routes: optional number`

    Number of output datagrams discarded because no route matched

  - `snmp_ip_out_requests: optional number`

    Number of datagrams supplied for transmission

  - `snmp_ip_reasm_fails: optional number`

    Number of failures detected by the reassembly algorithm

  - `snmp_ip_reasm_oks: optional number`

    Number of datagrams successfully reassembled

  - `snmp_ip_reasm_reqds: optional number`

    Number of fragments received which needed to be reassembled

  - `snmp_ip_reasm_timeout: optional number`

    Number of seconds fragments are held while awaiting reassembly

  - `snmp_tcp_active_opens: optional number`

    Number of times TCP transitions to SYN-SENT from CLOSED

  - `snmp_tcp_attempt_fails: optional number`

    Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

  - `snmp_tcp_curr_estab: optional number`

    Number of TCP connections in ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_estab_resets: optional number`

    Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

  - `snmp_tcp_in_csum_errors: optional number`

    Number of TCP segments received with checksum errors

  - `snmp_tcp_in_errs: optional number`

    Number of TCP segments received in error

  - `snmp_tcp_in_segs: optional number`

    Number of TCP segments received

  - `snmp_tcp_max_conn: optional number`

    Limit on the total number of TCP connections

  - `snmp_tcp_out_rsts: optional number`

    Number of TCP segments sent with RST flag

  - `snmp_tcp_out_segs: optional number`

    Number of TCP segments sent

  - `snmp_tcp_passive_opens: optional number`

    Number of times TCP transitions to SYN-RCVD from LISTEN

  - `snmp_tcp_retrans_segs: optional number`

    Number of TCP segments retransmitted

  - `snmp_tcp_rto_max: optional number`

    Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_tcp_rto_min: optional number`

    Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

  - `snmp_udp_in_datagrams: optional number`

    Number of UDP datagrams delivered to UDP applications

  - `snmp_udp_in_errors: optional number`

    Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

  - `snmp_udp_no_ports: optional number`

    Number of UDP datagrams received for which there was not application at the destination port

  - `snmp_udp_out_datagrams: optional number`

    Number of UDP datagrams sent

  - `system_boot_time_s: optional number`

    Boottime of the system (seconds since the Unix epoch)

  - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

    - `label: string`

      Sensor identifier for the component

    - `critical_celcius: optional number`

      Critical failure temperature of the component (degrees Celsius)

    - `current_celcius: optional number`

      Current temperature of the component (degrees Celsius)

    - `max_celcius: optional number`

      Maximum temperature of the component (degrees Celsius)

  - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

    - `health_state: string`

      Name of tunnel health state (unknown, healthy, degraded, down)

    - `health_value: number`

      Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

    - `interface_name: string`

      The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

    - `tunnel_id: string`

      Tunnel identifier

    - `natd_result: optional string`

      Public socket address returned by the NAT detector

    - `natd_state: optional number`

      Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

    - `natd_target: optional string`

      Target socket address probed by the NAT detector, using the detector source port

    - `probed_mtu: optional number`

      MTU as measured between the two ends of the tunnel

    - `recent_healthy_pings: optional number`

      Number of recent healthy pings for this tunnel

    - `recent_unhealthy_pings: optional number`

      Number of recent unhealthy pings for this tunnel

  - `uptime_idle_ms: optional number`

    Sum of how much time each core has spent idle

  - `uptime_total_ms: optional number`

    Uptime of the system, including time spent in suspend

# Latest

## Get latest Snapshots

**get** `/accounts/{account_id}/magic/connectors/{connector_id}/telemetry/snapshots/latest`

Get latest Snapshots

### Path Parameters

- `account_id: string`

  Account identifier

- `connector_id: string`

### Returns

- `result: object { count, items }`

  - `count: number`

  - `items: array of object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

    - `count_reclaim_failures: number`

      Count of failures to reclaim space

    - `count_reclaimed_paths: number`

      Count of reclaimed paths

    - `count_record_failed: number`

      Count of failed snapshot recordings

    - `count_transmit_failures: number`

      Count of failed snapshot transmissions

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

    - `v: string`

      Version

    - `bonds: optional array of object { name, status }`

      - `name: string`

        Name of the network interface

      - `status: string`

        Current status of the network interface

    - `cpu_count: optional number`

      Count of processors/cores

    - `cpu_pressure_10s: optional number`

      Percentage of time over a 10 second window that tasks were stalled

    - `cpu_pressure_300s: optional number`

      Percentage of time over a 5 minute window that tasks were stalled

    - `cpu_pressure_60s: optional number`

      Percentage of time over a 1 minute window that tasks were stalled

    - `cpu_pressure_total_us: optional number`

      Total stall time (microseconds)

    - `cpu_time_guest_ms: optional number`

      Time spent running a virtual CPU or guest OS (milliseconds)

    - `cpu_time_guest_nice_ms: optional number`

      Time spent running a niced guest (milliseconds)

    - `cpu_time_idle_ms: optional number`

      Time spent in idle state (milliseconds)

    - `cpu_time_iowait_ms: optional number`

      Time spent wait for I/O to complete (milliseconds)

    - `cpu_time_irq_ms: optional number`

      Time spent servicing interrupts (milliseconds)

    - `cpu_time_nice_ms: optional number`

      Time spent in low-priority user mode (milliseconds)

    - `cpu_time_softirq_ms: optional number`

      Time spent servicing softirqs (milliseconds)

    - `cpu_time_steal_ms: optional number`

      Time stolen (milliseconds)

    - `cpu_time_system_ms: optional number`

      Time spent in system mode (milliseconds)

    - `cpu_time_user_ms: optional number`

      Time spent in user mode (milliseconds)

    - `delta: optional number`

      Number of network operations applied during state transition

    - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

      - `client_id: string`

        Client ID of the device the IP Address was leased to

      - `expiry_time: number`

        Expiry time of the DHCP lease (seconds since the Unix epoch)

      - `hostname: string`

        Hostname of the device the IP Address was leased to

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP Address that was leased

      - `mac_address: string`

        MAC Address of the device the IP Address was leased to

    - `disks: optional array of object { in_progress, major, merged, 17 more }`

      - `in_progress: number`

        I/Os currently in progress

      - `major: number`

        Device major number

      - `merged: number`

        Reads merged

      - `minor: number`

        Device minor number

      - `name: string`

        Device name

      - `reads: number`

        Reads completed successfully

      - `sectors_read: number`

        Sectors read successfully

      - `sectors_written: number`

        Sectors written successfully

      - `time_in_progress_ms: number`

        Time spent doing I/Os (milliseconds)

      - `time_reading_ms: number`

        Time spent reading (milliseconds)

      - `time_writing_ms: number`

        Time spent writing (milliseconds)

      - `weighted_time_in_progress_ms: number`

        Weighted time spent doing I/Os (milliseconds)

      - `writes: number`

        Writes completed

      - `writes_merged: number`

        Writes merged

      - `discards: optional number`

        Discards completed successfully

      - `discards_merged: optional number`

        Discards merged

      - `flushes: optional number`

        Flushes completed successfully

      - `sectors_discarded: optional number`

        Sectors discarded

      - `time_discarding_ms: optional number`

        Time spent discarding (milliseconds)

      - `time_flushing_ms: optional number`

        Time spent flushing (milliseconds)

    - `epsilon: optional number`

      Simulated number of network operations applied during state transition

    - `ha_state: optional string`

      Name of high availability state

    - `ha_value: optional number`

      Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

    - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

      - `name: string`

        Name of the network interface

      - `operstate: string`

        UP/DOWN state of the network interface

      - `ip_addresses: optional array of object { interface_name, ip_address }`

        - `interface_name: string`

          Name of the network interface

        - `ip_address: string`

          IP address of the network interface

      - `speed: optional number`

        Speed of the network interface (bits per second)

    - `io_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `io_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `io_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `io_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `io_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `io_pressure_some_300s: optional number`

      Percentage of time over a 3 minute window that some tasks were stalled

    - `io_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `io_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `kernel_btime: optional number`

      Boot time (seconds since Unix epoch)

    - `kernel_ctxt: optional number`

      Number of context switches that the system underwent

    - `kernel_processes: optional number`

      Number of forks since boot

    - `kernel_processes_blocked: optional number`

      Number of processes blocked waiting for I/O

    - `kernel_processes_running: optional number`

      Number of processes in runnable state

    - `load_average_15m: optional number`

      The fifteen-minute load average

    - `load_average_1m: optional number`

      The one-minute load average

    - `load_average_5m: optional number`

      The five-minute load average

    - `load_average_cur: optional number`

      Number of currently runnable kernel scheduling entities

    - `load_average_max: optional number`

      Number of kernel scheduling entities that currently exist on the system

    - `memory_active_bytes: optional number`

      Memory that has been used more recently

    - `memory_anon_hugepages_bytes: optional number`

      Non-file backed huge pages mapped into user-space page tables

    - `memory_anon_pages_bytes: optional number`

      Non-file backed pages mapped into user-space page tables

    - `memory_available_bytes: optional number`

      Estimate of how much memory is available for starting new applications

    - `memory_bounce_bytes: optional number`

      Memory used for block device bounce buffers

    - `memory_buffers_bytes: optional number`

      Relatively temporary storage for raw disk blocks

    - `memory_cached_bytes: optional number`

      In-memory cache for files read from the disk

    - `memory_cma_free_bytes: optional number`

      Free CMA (Contiguous Memory Allocator) pages

    - `memory_cma_total_bytes: optional number`

      Total CMA (Contiguous Memory Allocator) pages

    - `memory_commit_limit_bytes: optional number`

      Total amount of memory currently available to be allocated on the system

    - `memory_committed_as_bytes: optional number`

      Amount of memory presently allocated on the system

    - `memory_dirty_bytes: optional number`

      Memory which is waiting to get written back to the disk

    - `memory_free_bytes: optional number`

      The sum of LowFree and HighFree

    - `memory_high_free_bytes: optional number`

      Amount of free highmem

    - `memory_high_total_bytes: optional number`

      Total amount of highmem

    - `memory_hugepages_free: optional number`

      The number of huge pages in the pool that are not yet allocated

    - `memory_hugepages_rsvd: optional number`

      Number of huge pages for which a commitment has been made, but no allocation has yet been made

    - `memory_hugepages_surp: optional number`

      Number of huge pages in the pool above the threshold

    - `memory_hugepages_total: optional number`

      The size of the pool of huge pages

    - `memory_hugepagesize_bytes: optional number`

      The size of huge pages

    - `memory_inactive_bytes: optional number`

      Memory which has been less recently used

    - `memory_k_reclaimable_bytes: optional number`

      Kernel allocations that the kernel will attempt to reclaim under memory pressure

    - `memory_kernel_stack_bytes: optional number`

      Amount of memory allocated to kernel stacks

    - `memory_low_free_bytes: optional number`

      Amount of free lowmem

    - `memory_low_total_bytes: optional number`

      Total amount of lowmem

    - `memory_mapped_bytes: optional number`

      Files which have been mapped into memory

    - `memory_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_per_cpu_bytes: optional number`

      Memory allocated to the per-cpu alloctor used to back per-cpu allocations

    - `memory_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `memory_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `memory_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `memory_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `memory_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `memory_pressure_some_300s: optional number`

      Percentage of time over a 5 minute window that some tasks were stalled

    - `memory_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `memory_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `memory_s_reclaimable_bytes: optional number`

      Part of slab that can be reclaimed on memory pressure

    - `memory_s_unreclaim_bytes: optional number`

      Part of slab that cannot be reclaimed on memory pressure

    - `memory_secondary_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_shmem_bytes: optional number`

      Amount of memory consumed by tmpfs

    - `memory_shmem_hugepages_bytes: optional number`

      Memory used by shmem and tmpfs, allocated with huge pages

    - `memory_shmem_pmd_mapped_bytes: optional number`

      Shared memory mapped into user space with huge pages

    - `memory_slab_bytes: optional number`

      In-kernel data structures cache

    - `memory_swap_cached_bytes: optional number`

      Memory swapped out and back in while still in swap file

    - `memory_swap_free_bytes: optional number`

      Amount of swap space that is currently unused

    - `memory_swap_total_bytes: optional number`

      Total amount of swap space available

    - `memory_total_bytes: optional number`

      Total usable RAM

    - `memory_vmalloc_chunk_bytes: optional number`

      Largest contiguous block of vmalloc area which is free

    - `memory_vmalloc_total_bytes: optional number`

      Total size of vmalloc memory area

    - `memory_vmalloc_used_bytes: optional number`

      Amount of vmalloc area which is used

    - `memory_writeback_bytes: optional number`

      Memory which is actively being written back to the disk

    - `memory_writeback_tmp_bytes: optional number`

      Memory used by FUSE for temporary writeback buffers

    - `memory_z_swap_bytes: optional number`

      Memory consumed by the zswap backend, compressed

    - `memory_z_swapped_bytes: optional number`

      Amount of anonymous memory stored in zswap, uncompressed

    - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

      - `file_system: string`

        File system on disk (EXT4, NTFS, etc.)

      - `kind: string`

        Kind of disk (HDD, SSD, etc.)

      - `mount_point: string`

        Path where disk is mounted

      - `name: string`

        Name of the disk mount

      - `available_bytes: optional number`

        Available disk size (bytes)

      - `available_inodes: optional number`

        Available inodes on filesystem

      - `is_read_only: optional boolean`

        Determines whether the disk is read-only

      - `is_removable: optional boolean`

        Determines whether the disk is removable

      - `total_bytes: optional number`

        Total disk size (bytes)

      - `total_inodes: optional number`

        Total inodes on filesystem

    - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

      - `name: string`

        Name of the network device

      - `recv_bytes: number`

        Total bytes received

      - `recv_compressed: number`

        Compressed packets received

      - `recv_drop: number`

        Packets dropped

      - `recv_errs: number`

        Bad packets received

      - `recv_fifo: number`

        FIFO overruns

      - `recv_frame: number`

        Frame alignment errors

      - `recv_multicast: number`

        Multicast packets received

      - `recv_packets: number`

        Total packets received

      - `sent_bytes: number`

        Total bytes transmitted

      - `sent_carrier: number`

        Number of packets not sent due to carrier errors

      - `sent_colls: number`

        Number of collisions

      - `sent_compressed: number`

        Number of compressed packets transmitted

      - `sent_drop: number`

        Number of packets dropped during transmission

      - `sent_errs: number`

        Number of transmission errors

      - `sent_fifo: number`

        FIFO overruns

      - `sent_packets: number`

        Total packets transmitted

    - `platform: optional string`

      Platform identifier

    - `snmp_icmp_in_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages received

    - `snmp_icmp_in_addr_masks: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_csum_errors: optional number`

      Number of ICMP messages received with bad checksums

    - `snmp_icmp_in_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages received

    - `snmp_icmp_in_echo_reps: optional number`

      Number of ICMP Echo Reply messages received

    - `snmp_icmp_in_echos: optional number`

      Number of ICMP Echo (request) messages received

    - `snmp_icmp_in_errors: optional number`

      Number of ICMP messages received with ICMP-specific errors

    - `snmp_icmp_in_msgs: optional number`

      Number of ICMP messages received

    - `snmp_icmp_in_parm_probs: optional number`

      Number of ICMP Parameter Problem messages received

    - `snmp_icmp_in_redirects: optional number`

      Number of ICMP Redirect messages received

    - `snmp_icmp_in_src_quenchs: optional number`

      Number of ICMP Source Quench messages received

    - `snmp_icmp_in_time_excds: optional number`

      Number of ICMP Time Exceeded messages received

    - `snmp_icmp_in_timestamp_reps: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_timestamps: optional number`

      Number of ICMP Timestamp (request) messages received

    - `snmp_icmp_out_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages sent

    - `snmp_icmp_out_addr_masks: optional number`

      Number of ICMP Address Mask Request messages sent

    - `snmp_icmp_out_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages sent

    - `snmp_icmp_out_echo_reps: optional number`

      Number of ICMP Echo Reply messages sent

    - `snmp_icmp_out_echos: optional number`

      Number of ICMP Echo (request) messages sent

    - `snmp_icmp_out_errors: optional number`

      Number of ICMP messages which this entity did not send due to ICMP-specific errors

    - `snmp_icmp_out_msgs: optional number`

      Number of ICMP messages attempted to send

    - `snmp_icmp_out_parm_probs: optional number`

      Number of ICMP Parameter Problem messages sent

    - `snmp_icmp_out_redirects: optional number`

      Number of ICMP Redirect messages sent

    - `snmp_icmp_out_src_quenchs: optional number`

      Number of ICMP Source Quench messages sent

    - `snmp_icmp_out_time_excds: optional number`

      Number of ICMP Time Exceeded messages sent

    - `snmp_icmp_out_timestamp_reps: optional number`

      Number of ICMP Timestamp Reply messages sent

    - `snmp_icmp_out_timestamps: optional number`

      Number of ICMP Timestamp (request) messages sent

    - `snmp_ip_default_ttl: optional number`

      Default value of the Time-To-Live field of the IP header

    - `snmp_ip_forw_datagrams: optional number`

      Number of datagrams forwarded to their final destination

    - `snmp_ip_forwarding_enabled: optional boolean`

      Set when acting as an IP gateway

    - `snmp_ip_frag_creates: optional number`

      Number of datagrams generated by fragmentation

    - `snmp_ip_frag_fails: optional number`

      Number of datagrams discarded because fragmentation failed

    - `snmp_ip_frag_oks: optional number`

      Number of datagrams successfully fragmented

    - `snmp_ip_in_addr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP address

    - `snmp_ip_in_delivers: optional number`

      Number of input datagrams successfully delivered to IP user-protocols

    - `snmp_ip_in_discards: optional number`

      Number of input datagrams otherwise discarded

    - `snmp_ip_in_hdr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP header

    - `snmp_ip_in_receives: optional number`

      Number of input datagrams received from interfaces

    - `snmp_ip_in_unknown_protos: optional number`

      Number of input datagrams discarded due unknown or unsupported protocol

    - `snmp_ip_out_discards: optional number`

      Number of output datagrams otherwise discarded

    - `snmp_ip_out_no_routes: optional number`

      Number of output datagrams discarded because no route matched

    - `snmp_ip_out_requests: optional number`

      Number of datagrams supplied for transmission

    - `snmp_ip_reasm_fails: optional number`

      Number of failures detected by the reassembly algorithm

    - `snmp_ip_reasm_oks: optional number`

      Number of datagrams successfully reassembled

    - `snmp_ip_reasm_reqds: optional number`

      Number of fragments received which needed to be reassembled

    - `snmp_ip_reasm_timeout: optional number`

      Number of seconds fragments are held while awaiting reassembly

    - `snmp_tcp_active_opens: optional number`

      Number of times TCP transitions to SYN-SENT from CLOSED

    - `snmp_tcp_attempt_fails: optional number`

      Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

    - `snmp_tcp_curr_estab: optional number`

      Number of TCP connections in ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_estab_resets: optional number`

      Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_in_csum_errors: optional number`

      Number of TCP segments received with checksum errors

    - `snmp_tcp_in_errs: optional number`

      Number of TCP segments received in error

    - `snmp_tcp_in_segs: optional number`

      Number of TCP segments received

    - `snmp_tcp_max_conn: optional number`

      Limit on the total number of TCP connections

    - `snmp_tcp_out_rsts: optional number`

      Number of TCP segments sent with RST flag

    - `snmp_tcp_out_segs: optional number`

      Number of TCP segments sent

    - `snmp_tcp_passive_opens: optional number`

      Number of times TCP transitions to SYN-RCVD from LISTEN

    - `snmp_tcp_retrans_segs: optional number`

      Number of TCP segments retransmitted

    - `snmp_tcp_rto_max: optional number`

      Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_tcp_rto_min: optional number`

      Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_udp_in_datagrams: optional number`

      Number of UDP datagrams delivered to UDP applications

    - `snmp_udp_in_errors: optional number`

      Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

    - `snmp_udp_no_ports: optional number`

      Number of UDP datagrams received for which there was not application at the destination port

    - `snmp_udp_out_datagrams: optional number`

      Number of UDP datagrams sent

    - `system_boot_time_s: optional number`

      Boottime of the system (seconds since the Unix epoch)

    - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

      - `label: string`

        Sensor identifier for the component

      - `critical_celcius: optional number`

        Critical failure temperature of the component (degrees Celsius)

      - `current_celcius: optional number`

        Current temperature of the component (degrees Celsius)

      - `max_celcius: optional number`

        Maximum temperature of the component (degrees Celsius)

    - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

      - `health_state: string`

        Name of tunnel health state (unknown, healthy, degraded, down)

      - `health_value: number`

        Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

      - `interface_name: string`

        The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

      - `tunnel_id: string`

        Tunnel identifier

      - `natd_result: optional string`

        Public socket address returned by the NAT detector

      - `natd_state: optional number`

        Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

      - `natd_target: optional string`

        Target socket address probed by the NAT detector, using the detector source port

      - `probed_mtu: optional number`

        MTU as measured between the two ends of the tunnel

      - `recent_healthy_pings: optional number`

        Number of recent healthy pings for this tunnel

      - `recent_unhealthy_pings: optional number`

        Number of recent unhealthy pings for this tunnel

    - `uptime_idle_ms: optional number`

      Sum of how much time each core has spent idle

    - `uptime_total_ms: optional number`

      Uptime of the system, including time spent in suspend

- `success: boolean`

- `errors: optional array of object { code, message }`

  - `code: number`

  - `message: string`

- `messages: optional array of object { code, message }`

  - `code: number`

  - `message: string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/connectors/$CONNECTOR_ID/telemetry/snapshots/latest \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "count": 0,
    "items": [
      {
        "count_reclaim_failures": 0,
        "count_reclaimed_paths": 0,
        "count_record_failed": 0,
        "count_transmit_failures": 0,
        "t": 0,
        "v": "v",
        "bonds": [
          {
            "name": "name",
            "status": "status"
          }
        ],
        "cpu_count": 0,
        "cpu_pressure_10s": 0,
        "cpu_pressure_300s": 0,
        "cpu_pressure_60s": 0,
        "cpu_pressure_total_us": 0,
        "cpu_time_guest_ms": 0,
        "cpu_time_guest_nice_ms": 0,
        "cpu_time_idle_ms": 0,
        "cpu_time_iowait_ms": 0,
        "cpu_time_irq_ms": 0,
        "cpu_time_nice_ms": 0,
        "cpu_time_softirq_ms": 0,
        "cpu_time_steal_ms": 0,
        "cpu_time_system_ms": 0,
        "cpu_time_user_ms": 0,
        "delta": 0,
        "dhcp_leases": [
          {
            "client_id": "client_id",
            "expiry_time": 0,
            "hostname": "hostname",
            "interface_name": "interface_name",
            "ip_address": "ip_address",
            "mac_address": "mac_address"
          }
        ],
        "disks": [
          {
            "in_progress": 0,
            "major": 0,
            "merged": 0,
            "minor": 0,
            "name": "name",
            "reads": 0,
            "sectors_read": 0,
            "sectors_written": 0,
            "time_in_progress_ms": 0,
            "time_reading_ms": 0,
            "time_writing_ms": 0,
            "weighted_time_in_progress_ms": 0,
            "writes": 0,
            "writes_merged": 0,
            "discards": 0,
            "discards_merged": 0,
            "flushes": 0,
            "sectors_discarded": 0,
            "time_discarding_ms": 0,
            "time_flushing_ms": 0
          }
        ],
        "epsilon": 0,
        "ha_state": "ha_state",
        "ha_value": 0,
        "interfaces": [
          {
            "name": "name",
            "operstate": "operstate",
            "ip_addresses": [
              {
                "interface_name": "interface_name",
                "ip_address": "ip_address"
              }
            ],
            "speed": 0
          }
        ],
        "io_pressure_full_10s": 0,
        "io_pressure_full_300s": 0,
        "io_pressure_full_60s": 0,
        "io_pressure_full_total_us": 0,
        "io_pressure_some_10s": 0,
        "io_pressure_some_300s": 0,
        "io_pressure_some_60s": 0,
        "io_pressure_some_total_us": 0,
        "kernel_btime": 0,
        "kernel_ctxt": 0,
        "kernel_processes": 0,
        "kernel_processes_blocked": 0,
        "kernel_processes_running": 0,
        "load_average_15m": 0,
        "load_average_1m": 0,
        "load_average_5m": 0,
        "load_average_cur": 0,
        "load_average_max": 0,
        "memory_active_bytes": 0,
        "memory_anon_hugepages_bytes": 0,
        "memory_anon_pages_bytes": 0,
        "memory_available_bytes": 0,
        "memory_bounce_bytes": 0,
        "memory_buffers_bytes": 0,
        "memory_cached_bytes": 0,
        "memory_cma_free_bytes": 0,
        "memory_cma_total_bytes": 0,
        "memory_commit_limit_bytes": 0,
        "memory_committed_as_bytes": 0,
        "memory_dirty_bytes": 0,
        "memory_free_bytes": 0,
        "memory_high_free_bytes": 0,
        "memory_high_total_bytes": 0,
        "memory_hugepages_free": 0,
        "memory_hugepages_rsvd": 0,
        "memory_hugepages_surp": 0,
        "memory_hugepages_total": 0,
        "memory_hugepagesize_bytes": 0,
        "memory_inactive_bytes": 0,
        "memory_k_reclaimable_bytes": 0,
        "memory_kernel_stack_bytes": 0,
        "memory_low_free_bytes": 0,
        "memory_low_total_bytes": 0,
        "memory_mapped_bytes": 0,
        "memory_page_tables_bytes": 0,
        "memory_per_cpu_bytes": 0,
        "memory_pressure_full_10s": 0,
        "memory_pressure_full_300s": 0,
        "memory_pressure_full_60s": 0,
        "memory_pressure_full_total_us": 0,
        "memory_pressure_some_10s": 0,
        "memory_pressure_some_300s": 0,
        "memory_pressure_some_60s": 0,
        "memory_pressure_some_total_us": 0,
        "memory_s_reclaimable_bytes": 0,
        "memory_s_unreclaim_bytes": 0,
        "memory_secondary_page_tables_bytes": 0,
        "memory_shmem_bytes": 0,
        "memory_shmem_hugepages_bytes": 0,
        "memory_shmem_pmd_mapped_bytes": 0,
        "memory_slab_bytes": 0,
        "memory_swap_cached_bytes": 0,
        "memory_swap_free_bytes": 0,
        "memory_swap_total_bytes": 0,
        "memory_total_bytes": 0,
        "memory_vmalloc_chunk_bytes": 0,
        "memory_vmalloc_total_bytes": 0,
        "memory_vmalloc_used_bytes": 0,
        "memory_writeback_bytes": 0,
        "memory_writeback_tmp_bytes": 0,
        "memory_z_swap_bytes": 0,
        "memory_z_swapped_bytes": 0,
        "mounts": [
          {
            "file_system": "file_system",
            "kind": "kind",
            "mount_point": "mount_point",
            "name": "name",
            "available_bytes": 0,
            "available_inodes": 0,
            "is_read_only": true,
            "is_removable": true,
            "total_bytes": 0,
            "total_inodes": 0
          }
        ],
        "netdevs": [
          {
            "name": "name",
            "recv_bytes": 0,
            "recv_compressed": 0,
            "recv_drop": 0,
            "recv_errs": 0,
            "recv_fifo": 0,
            "recv_frame": 0,
            "recv_multicast": 0,
            "recv_packets": 0,
            "sent_bytes": 0,
            "sent_carrier": 0,
            "sent_colls": 0,
            "sent_compressed": 0,
            "sent_drop": 0,
            "sent_errs": 0,
            "sent_fifo": 0,
            "sent_packets": 0
          }
        ],
        "platform": "platform",
        "snmp_icmp_in_addr_mask_reps": 0,
        "snmp_icmp_in_addr_masks": 0,
        "snmp_icmp_in_csum_errors": 0,
        "snmp_icmp_in_dest_unreachs": 0,
        "snmp_icmp_in_echo_reps": 0,
        "snmp_icmp_in_echos": 0,
        "snmp_icmp_in_errors": 0,
        "snmp_icmp_in_msgs": 0,
        "snmp_icmp_in_parm_probs": 0,
        "snmp_icmp_in_redirects": 0,
        "snmp_icmp_in_src_quenchs": 0,
        "snmp_icmp_in_time_excds": 0,
        "snmp_icmp_in_timestamp_reps": 0,
        "snmp_icmp_in_timestamps": 0,
        "snmp_icmp_out_addr_mask_reps": 0,
        "snmp_icmp_out_addr_masks": 0,
        "snmp_icmp_out_dest_unreachs": 0,
        "snmp_icmp_out_echo_reps": 0,
        "snmp_icmp_out_echos": 0,
        "snmp_icmp_out_errors": 0,
        "snmp_icmp_out_msgs": 0,
        "snmp_icmp_out_parm_probs": 0,
        "snmp_icmp_out_redirects": 0,
        "snmp_icmp_out_src_quenchs": 0,
        "snmp_icmp_out_time_excds": 0,
        "snmp_icmp_out_timestamp_reps": 0,
        "snmp_icmp_out_timestamps": 0,
        "snmp_ip_default_ttl": 0,
        "snmp_ip_forw_datagrams": 0,
        "snmp_ip_forwarding_enabled": true,
        "snmp_ip_frag_creates": 0,
        "snmp_ip_frag_fails": 0,
        "snmp_ip_frag_oks": 0,
        "snmp_ip_in_addr_errors": 0,
        "snmp_ip_in_delivers": 0,
        "snmp_ip_in_discards": 0,
        "snmp_ip_in_hdr_errors": 0,
        "snmp_ip_in_receives": 0,
        "snmp_ip_in_unknown_protos": 0,
        "snmp_ip_out_discards": 0,
        "snmp_ip_out_no_routes": 0,
        "snmp_ip_out_requests": 0,
        "snmp_ip_reasm_fails": 0,
        "snmp_ip_reasm_oks": 0,
        "snmp_ip_reasm_reqds": 0,
        "snmp_ip_reasm_timeout": 0,
        "snmp_tcp_active_opens": 0,
        "snmp_tcp_attempt_fails": 0,
        "snmp_tcp_curr_estab": 0,
        "snmp_tcp_estab_resets": 0,
        "snmp_tcp_in_csum_errors": 0,
        "snmp_tcp_in_errs": 0,
        "snmp_tcp_in_segs": 0,
        "snmp_tcp_max_conn": 0,
        "snmp_tcp_out_rsts": 0,
        "snmp_tcp_out_segs": 0,
        "snmp_tcp_passive_opens": 0,
        "snmp_tcp_retrans_segs": 0,
        "snmp_tcp_rto_max": 0,
        "snmp_tcp_rto_min": 0,
        "snmp_udp_in_datagrams": 0,
        "snmp_udp_in_errors": 0,
        "snmp_udp_no_ports": 0,
        "snmp_udp_out_datagrams": 0,
        "system_boot_time_s": 0,
        "thermals": [
          {
            "label": "label",
            "critical_celcius": 0,
            "current_celcius": 0,
            "max_celcius": 0
          }
        ],
        "tunnels": [
          {
            "health_state": "health_state",
            "health_value": 0,
            "interface_name": "interface_name",
            "tunnel_id": "tunnel_id",
            "natd_result": "natd_result",
            "natd_state": 0,
            "natd_target": "natd_target",
            "probed_mtu": 0,
            "recent_healthy_pings": 0,
            "recent_unhealthy_pings": 0
          }
        ],
        "uptime_idle_ms": 0,
        "uptime_total_ms": 0
      }
    ]
  },
  "success": true,
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
  ]
}
```

## Domain Types

### Latest List Response

- `LatestListResponse object { count, items }`

  - `count: number`

  - `items: array of object { count_reclaim_failures, count_reclaimed_paths, count_record_failed, 170 more }`

    - `count_reclaim_failures: number`

      Count of failures to reclaim space

    - `count_reclaimed_paths: number`

      Count of reclaimed paths

    - `count_record_failed: number`

      Count of failed snapshot recordings

    - `count_transmit_failures: number`

      Count of failed snapshot transmissions

    - `t: number`

      Time the Snapshot was recorded (seconds since the Unix epoch)

    - `v: string`

      Version

    - `bonds: optional array of object { name, status }`

      - `name: string`

        Name of the network interface

      - `status: string`

        Current status of the network interface

    - `cpu_count: optional number`

      Count of processors/cores

    - `cpu_pressure_10s: optional number`

      Percentage of time over a 10 second window that tasks were stalled

    - `cpu_pressure_300s: optional number`

      Percentage of time over a 5 minute window that tasks were stalled

    - `cpu_pressure_60s: optional number`

      Percentage of time over a 1 minute window that tasks were stalled

    - `cpu_pressure_total_us: optional number`

      Total stall time (microseconds)

    - `cpu_time_guest_ms: optional number`

      Time spent running a virtual CPU or guest OS (milliseconds)

    - `cpu_time_guest_nice_ms: optional number`

      Time spent running a niced guest (milliseconds)

    - `cpu_time_idle_ms: optional number`

      Time spent in idle state (milliseconds)

    - `cpu_time_iowait_ms: optional number`

      Time spent wait for I/O to complete (milliseconds)

    - `cpu_time_irq_ms: optional number`

      Time spent servicing interrupts (milliseconds)

    - `cpu_time_nice_ms: optional number`

      Time spent in low-priority user mode (milliseconds)

    - `cpu_time_softirq_ms: optional number`

      Time spent servicing softirqs (milliseconds)

    - `cpu_time_steal_ms: optional number`

      Time stolen (milliseconds)

    - `cpu_time_system_ms: optional number`

      Time spent in system mode (milliseconds)

    - `cpu_time_user_ms: optional number`

      Time spent in user mode (milliseconds)

    - `delta: optional number`

      Number of network operations applied during state transition

    - `dhcp_leases: optional array of object { client_id, expiry_time, hostname, 3 more }`

      - `client_id: string`

        Client ID of the device the IP Address was leased to

      - `expiry_time: number`

        Expiry time of the DHCP lease (seconds since the Unix epoch)

      - `hostname: string`

        Hostname of the device the IP Address was leased to

      - `interface_name: string`

        Name of the network interface

      - `ip_address: string`

        IP Address that was leased

      - `mac_address: string`

        MAC Address of the device the IP Address was leased to

    - `disks: optional array of object { in_progress, major, merged, 17 more }`

      - `in_progress: number`

        I/Os currently in progress

      - `major: number`

        Device major number

      - `merged: number`

        Reads merged

      - `minor: number`

        Device minor number

      - `name: string`

        Device name

      - `reads: number`

        Reads completed successfully

      - `sectors_read: number`

        Sectors read successfully

      - `sectors_written: number`

        Sectors written successfully

      - `time_in_progress_ms: number`

        Time spent doing I/Os (milliseconds)

      - `time_reading_ms: number`

        Time spent reading (milliseconds)

      - `time_writing_ms: number`

        Time spent writing (milliseconds)

      - `weighted_time_in_progress_ms: number`

        Weighted time spent doing I/Os (milliseconds)

      - `writes: number`

        Writes completed

      - `writes_merged: number`

        Writes merged

      - `discards: optional number`

        Discards completed successfully

      - `discards_merged: optional number`

        Discards merged

      - `flushes: optional number`

        Flushes completed successfully

      - `sectors_discarded: optional number`

        Sectors discarded

      - `time_discarding_ms: optional number`

        Time spent discarding (milliseconds)

      - `time_flushing_ms: optional number`

        Time spent flushing (milliseconds)

    - `epsilon: optional number`

      Simulated number of network operations applied during state transition

    - `ha_state: optional string`

      Name of high availability state

    - `ha_value: optional number`

      Numeric value associated with high availability state (0 = disabled, 1 = active, 2 = standby, 3 = stopped, 4 = fault)

    - `interfaces: optional array of object { name, operstate, ip_addresses, speed }`

      - `name: string`

        Name of the network interface

      - `operstate: string`

        UP/DOWN state of the network interface

      - `ip_addresses: optional array of object { interface_name, ip_address }`

        - `interface_name: string`

          Name of the network interface

        - `ip_address: string`

          IP address of the network interface

      - `speed: optional number`

        Speed of the network interface (bits per second)

    - `io_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `io_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `io_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `io_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `io_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `io_pressure_some_300s: optional number`

      Percentage of time over a 3 minute window that some tasks were stalled

    - `io_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `io_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `kernel_btime: optional number`

      Boot time (seconds since Unix epoch)

    - `kernel_ctxt: optional number`

      Number of context switches that the system underwent

    - `kernel_processes: optional number`

      Number of forks since boot

    - `kernel_processes_blocked: optional number`

      Number of processes blocked waiting for I/O

    - `kernel_processes_running: optional number`

      Number of processes in runnable state

    - `load_average_15m: optional number`

      The fifteen-minute load average

    - `load_average_1m: optional number`

      The one-minute load average

    - `load_average_5m: optional number`

      The five-minute load average

    - `load_average_cur: optional number`

      Number of currently runnable kernel scheduling entities

    - `load_average_max: optional number`

      Number of kernel scheduling entities that currently exist on the system

    - `memory_active_bytes: optional number`

      Memory that has been used more recently

    - `memory_anon_hugepages_bytes: optional number`

      Non-file backed huge pages mapped into user-space page tables

    - `memory_anon_pages_bytes: optional number`

      Non-file backed pages mapped into user-space page tables

    - `memory_available_bytes: optional number`

      Estimate of how much memory is available for starting new applications

    - `memory_bounce_bytes: optional number`

      Memory used for block device bounce buffers

    - `memory_buffers_bytes: optional number`

      Relatively temporary storage for raw disk blocks

    - `memory_cached_bytes: optional number`

      In-memory cache for files read from the disk

    - `memory_cma_free_bytes: optional number`

      Free CMA (Contiguous Memory Allocator) pages

    - `memory_cma_total_bytes: optional number`

      Total CMA (Contiguous Memory Allocator) pages

    - `memory_commit_limit_bytes: optional number`

      Total amount of memory currently available to be allocated on the system

    - `memory_committed_as_bytes: optional number`

      Amount of memory presently allocated on the system

    - `memory_dirty_bytes: optional number`

      Memory which is waiting to get written back to the disk

    - `memory_free_bytes: optional number`

      The sum of LowFree and HighFree

    - `memory_high_free_bytes: optional number`

      Amount of free highmem

    - `memory_high_total_bytes: optional number`

      Total amount of highmem

    - `memory_hugepages_free: optional number`

      The number of huge pages in the pool that are not yet allocated

    - `memory_hugepages_rsvd: optional number`

      Number of huge pages for which a commitment has been made, but no allocation has yet been made

    - `memory_hugepages_surp: optional number`

      Number of huge pages in the pool above the threshold

    - `memory_hugepages_total: optional number`

      The size of the pool of huge pages

    - `memory_hugepagesize_bytes: optional number`

      The size of huge pages

    - `memory_inactive_bytes: optional number`

      Memory which has been less recently used

    - `memory_k_reclaimable_bytes: optional number`

      Kernel allocations that the kernel will attempt to reclaim under memory pressure

    - `memory_kernel_stack_bytes: optional number`

      Amount of memory allocated to kernel stacks

    - `memory_low_free_bytes: optional number`

      Amount of free lowmem

    - `memory_low_total_bytes: optional number`

      Total amount of lowmem

    - `memory_mapped_bytes: optional number`

      Files which have been mapped into memory

    - `memory_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_per_cpu_bytes: optional number`

      Memory allocated to the per-cpu alloctor used to back per-cpu allocations

    - `memory_pressure_full_10s: optional number`

      Percentage of time over a 10 second window that all tasks were stalled

    - `memory_pressure_full_300s: optional number`

      Percentage of time over a 5 minute window that all tasks were stalled

    - `memory_pressure_full_60s: optional number`

      Percentage of time over a 1 minute window that all tasks were stalled

    - `memory_pressure_full_total_us: optional number`

      Total stall time (microseconds)

    - `memory_pressure_some_10s: optional number`

      Percentage of time over a 10 second window that some tasks were stalled

    - `memory_pressure_some_300s: optional number`

      Percentage of time over a 5 minute window that some tasks were stalled

    - `memory_pressure_some_60s: optional number`

      Percentage of time over a 1 minute window that some tasks were stalled

    - `memory_pressure_some_total_us: optional number`

      Total stall time (microseconds)

    - `memory_s_reclaimable_bytes: optional number`

      Part of slab that can be reclaimed on memory pressure

    - `memory_s_unreclaim_bytes: optional number`

      Part of slab that cannot be reclaimed on memory pressure

    - `memory_secondary_page_tables_bytes: optional number`

      Amount of memory dedicated to the lowest level of page tables

    - `memory_shmem_bytes: optional number`

      Amount of memory consumed by tmpfs

    - `memory_shmem_hugepages_bytes: optional number`

      Memory used by shmem and tmpfs, allocated with huge pages

    - `memory_shmem_pmd_mapped_bytes: optional number`

      Shared memory mapped into user space with huge pages

    - `memory_slab_bytes: optional number`

      In-kernel data structures cache

    - `memory_swap_cached_bytes: optional number`

      Memory swapped out and back in while still in swap file

    - `memory_swap_free_bytes: optional number`

      Amount of swap space that is currently unused

    - `memory_swap_total_bytes: optional number`

      Total amount of swap space available

    - `memory_total_bytes: optional number`

      Total usable RAM

    - `memory_vmalloc_chunk_bytes: optional number`

      Largest contiguous block of vmalloc area which is free

    - `memory_vmalloc_total_bytes: optional number`

      Total size of vmalloc memory area

    - `memory_vmalloc_used_bytes: optional number`

      Amount of vmalloc area which is used

    - `memory_writeback_bytes: optional number`

      Memory which is actively being written back to the disk

    - `memory_writeback_tmp_bytes: optional number`

      Memory used by FUSE for temporary writeback buffers

    - `memory_z_swap_bytes: optional number`

      Memory consumed by the zswap backend, compressed

    - `memory_z_swapped_bytes: optional number`

      Amount of anonymous memory stored in zswap, uncompressed

    - `mounts: optional array of object { file_system, kind, mount_point, 7 more }`

      - `file_system: string`

        File system on disk (EXT4, NTFS, etc.)

      - `kind: string`

        Kind of disk (HDD, SSD, etc.)

      - `mount_point: string`

        Path where disk is mounted

      - `name: string`

        Name of the disk mount

      - `available_bytes: optional number`

        Available disk size (bytes)

      - `available_inodes: optional number`

        Available inodes on filesystem

      - `is_read_only: optional boolean`

        Determines whether the disk is read-only

      - `is_removable: optional boolean`

        Determines whether the disk is removable

      - `total_bytes: optional number`

        Total disk size (bytes)

      - `total_inodes: optional number`

        Total inodes on filesystem

    - `netdevs: optional array of object { name, recv_bytes, recv_compressed, 14 more }`

      - `name: string`

        Name of the network device

      - `recv_bytes: number`

        Total bytes received

      - `recv_compressed: number`

        Compressed packets received

      - `recv_drop: number`

        Packets dropped

      - `recv_errs: number`

        Bad packets received

      - `recv_fifo: number`

        FIFO overruns

      - `recv_frame: number`

        Frame alignment errors

      - `recv_multicast: number`

        Multicast packets received

      - `recv_packets: number`

        Total packets received

      - `sent_bytes: number`

        Total bytes transmitted

      - `sent_carrier: number`

        Number of packets not sent due to carrier errors

      - `sent_colls: number`

        Number of collisions

      - `sent_compressed: number`

        Number of compressed packets transmitted

      - `sent_drop: number`

        Number of packets dropped during transmission

      - `sent_errs: number`

        Number of transmission errors

      - `sent_fifo: number`

        FIFO overruns

      - `sent_packets: number`

        Total packets transmitted

    - `platform: optional string`

      Platform identifier

    - `snmp_icmp_in_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages received

    - `snmp_icmp_in_addr_masks: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_csum_errors: optional number`

      Number of ICMP messages received with bad checksums

    - `snmp_icmp_in_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages received

    - `snmp_icmp_in_echo_reps: optional number`

      Number of ICMP Echo Reply messages received

    - `snmp_icmp_in_echos: optional number`

      Number of ICMP Echo (request) messages received

    - `snmp_icmp_in_errors: optional number`

      Number of ICMP messages received with ICMP-specific errors

    - `snmp_icmp_in_msgs: optional number`

      Number of ICMP messages received

    - `snmp_icmp_in_parm_probs: optional number`

      Number of ICMP Parameter Problem messages received

    - `snmp_icmp_in_redirects: optional number`

      Number of ICMP Redirect messages received

    - `snmp_icmp_in_src_quenchs: optional number`

      Number of ICMP Source Quench messages received

    - `snmp_icmp_in_time_excds: optional number`

      Number of ICMP Time Exceeded messages received

    - `snmp_icmp_in_timestamp_reps: optional number`

      Number of ICMP Address Mask Request messages received

    - `snmp_icmp_in_timestamps: optional number`

      Number of ICMP Timestamp (request) messages received

    - `snmp_icmp_out_addr_mask_reps: optional number`

      Number of ICMP Address Mask Reply messages sent

    - `snmp_icmp_out_addr_masks: optional number`

      Number of ICMP Address Mask Request messages sent

    - `snmp_icmp_out_dest_unreachs: optional number`

      Number of ICMP Destination Unreachable messages sent

    - `snmp_icmp_out_echo_reps: optional number`

      Number of ICMP Echo Reply messages sent

    - `snmp_icmp_out_echos: optional number`

      Number of ICMP Echo (request) messages sent

    - `snmp_icmp_out_errors: optional number`

      Number of ICMP messages which this entity did not send due to ICMP-specific errors

    - `snmp_icmp_out_msgs: optional number`

      Number of ICMP messages attempted to send

    - `snmp_icmp_out_parm_probs: optional number`

      Number of ICMP Parameter Problem messages sent

    - `snmp_icmp_out_redirects: optional number`

      Number of ICMP Redirect messages sent

    - `snmp_icmp_out_src_quenchs: optional number`

      Number of ICMP Source Quench messages sent

    - `snmp_icmp_out_time_excds: optional number`

      Number of ICMP Time Exceeded messages sent

    - `snmp_icmp_out_timestamp_reps: optional number`

      Number of ICMP Timestamp Reply messages sent

    - `snmp_icmp_out_timestamps: optional number`

      Number of ICMP Timestamp (request) messages sent

    - `snmp_ip_default_ttl: optional number`

      Default value of the Time-To-Live field of the IP header

    - `snmp_ip_forw_datagrams: optional number`

      Number of datagrams forwarded to their final destination

    - `snmp_ip_forwarding_enabled: optional boolean`

      Set when acting as an IP gateway

    - `snmp_ip_frag_creates: optional number`

      Number of datagrams generated by fragmentation

    - `snmp_ip_frag_fails: optional number`

      Number of datagrams discarded because fragmentation failed

    - `snmp_ip_frag_oks: optional number`

      Number of datagrams successfully fragmented

    - `snmp_ip_in_addr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP address

    - `snmp_ip_in_delivers: optional number`

      Number of input datagrams successfully delivered to IP user-protocols

    - `snmp_ip_in_discards: optional number`

      Number of input datagrams otherwise discarded

    - `snmp_ip_in_hdr_errors: optional number`

      Number of input datagrams discarded due to errors in the IP header

    - `snmp_ip_in_receives: optional number`

      Number of input datagrams received from interfaces

    - `snmp_ip_in_unknown_protos: optional number`

      Number of input datagrams discarded due unknown or unsupported protocol

    - `snmp_ip_out_discards: optional number`

      Number of output datagrams otherwise discarded

    - `snmp_ip_out_no_routes: optional number`

      Number of output datagrams discarded because no route matched

    - `snmp_ip_out_requests: optional number`

      Number of datagrams supplied for transmission

    - `snmp_ip_reasm_fails: optional number`

      Number of failures detected by the reassembly algorithm

    - `snmp_ip_reasm_oks: optional number`

      Number of datagrams successfully reassembled

    - `snmp_ip_reasm_reqds: optional number`

      Number of fragments received which needed to be reassembled

    - `snmp_ip_reasm_timeout: optional number`

      Number of seconds fragments are held while awaiting reassembly

    - `snmp_tcp_active_opens: optional number`

      Number of times TCP transitions to SYN-SENT from CLOSED

    - `snmp_tcp_attempt_fails: optional number`

      Number of times TCP transitions to CLOSED from SYN-SENT or SYN-RCVD, plus transitions to LISTEN from SYN-RCVD

    - `snmp_tcp_curr_estab: optional number`

      Number of TCP connections in ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_estab_resets: optional number`

      Number of times TCP transitions to CLOSED from ESTABLISHED or CLOSE-WAIT

    - `snmp_tcp_in_csum_errors: optional number`

      Number of TCP segments received with checksum errors

    - `snmp_tcp_in_errs: optional number`

      Number of TCP segments received in error

    - `snmp_tcp_in_segs: optional number`

      Number of TCP segments received

    - `snmp_tcp_max_conn: optional number`

      Limit on the total number of TCP connections

    - `snmp_tcp_out_rsts: optional number`

      Number of TCP segments sent with RST flag

    - `snmp_tcp_out_segs: optional number`

      Number of TCP segments sent

    - `snmp_tcp_passive_opens: optional number`

      Number of times TCP transitions to SYN-RCVD from LISTEN

    - `snmp_tcp_retrans_segs: optional number`

      Number of TCP segments retransmitted

    - `snmp_tcp_rto_max: optional number`

      Maximum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_tcp_rto_min: optional number`

      Minimum value permitted by a TCP implementation for the retransmission timeout (milliseconds)

    - `snmp_udp_in_datagrams: optional number`

      Number of UDP datagrams delivered to UDP applications

    - `snmp_udp_in_errors: optional number`

      Number of UDP datagrams failed to be delivered for reasons other than lack of application at the destination port

    - `snmp_udp_no_ports: optional number`

      Number of UDP datagrams received for which there was not application at the destination port

    - `snmp_udp_out_datagrams: optional number`

      Number of UDP datagrams sent

    - `system_boot_time_s: optional number`

      Boottime of the system (seconds since the Unix epoch)

    - `thermals: optional array of object { label, critical_celcius, current_celcius, max_celcius }`

      - `label: string`

        Sensor identifier for the component

      - `critical_celcius: optional number`

        Critical failure temperature of the component (degrees Celsius)

      - `current_celcius: optional number`

        Current temperature of the component (degrees Celsius)

      - `max_celcius: optional number`

        Maximum temperature of the component (degrees Celsius)

    - `tunnels: optional array of object { health_state, health_value, interface_name, 7 more }`

      - `health_state: string`

        Name of tunnel health state (unknown, healthy, degraded, down)

      - `health_value: number`

        Numeric value associated with tunnel state (0 = unknown, 1 = healthy, 2 = degraded, 3 = down)

      - `interface_name: string`

        The tunnel interface name (i.e. xfrm1, xfrm3.99, etc.)

      - `tunnel_id: string`

        Tunnel identifier

      - `natd_result: optional string`

        Public socket address returned by the NAT detector

      - `natd_state: optional number`

        Numeric NAT detector state (0 = detected, 1 = missing result, 2 = stale result)

      - `natd_target: optional string`

        Target socket address probed by the NAT detector, using the detector source port

      - `probed_mtu: optional number`

        MTU as measured between the two ends of the tunnel

      - `recent_healthy_pings: optional number`

        Number of recent healthy pings for this tunnel

      - `recent_unhealthy_pings: optional number`

        Number of recent unhealthy pings for this tunnel

    - `uptime_idle_ms: optional number`

      Sum of how much time each core has spent idle

    - `uptime_total_ms: optional number`

      Uptime of the system, including time spent in suspend

# Cf1 Sites

## List CF1 Sites

**get** `/accounts/{account_id}/magic/cf1_sites`

Lists CF1 Sites associated with an account. A CF1 Site represents a physical customer network location with optional geographic coordinates.

### Path Parameters

- `account_id: string`

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

- `result: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites \
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
      "name": "Pad 34",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "description": "Launch Pad 34",
      "location": {
        "lat": 28.521339842093845,
        "long": -80.56092644815843,
        "name": "Cape Canaveral"
      },
      "modified_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```

## Get CF1 Site

**get** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}`

Gets a specific CF1 Site for an account.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

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

- `result: Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID \
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
    "name": "Pad 34",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "description": "Launch Pad 34",
    "location": {
      "lat": 28.521339842093845,
      "long": -80.56092644815843,
      "name": "Cape Canaveral"
    },
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Create CF1 Sites

**post** `/accounts/{account_id}/magic/cf1_sites`

Creates new CF1 Sites for an account. Each site must have a unique name within the account.

### Path Parameters

- `account_id: string`

  Identifier

### Body Parameters

- `body: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

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

- `result: array of Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "name": "Pad 34",
            "description": "Launch Pad 34",
            "location": {
              "lat": 28.521339842093845,
              "long": -80.56092644815843,
              "name": "Cape Canaveral"
            }
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
      "name": "Pad 34",
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "description": "Launch Pad 34",
      "location": {
        "lat": 28.521339842093845,
        "long": -80.56092644815843,
        "name": "Cape Canaveral"
      },
      "modified_on": "2019-12-27T18:11:19.117Z"
    }
  ],
  "success": true
}
```

## Update CF1 Site

**patch** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}`

Partially updates a specific CF1 Site for an account. Only the fields included in the request body are modified; omitted fields retain their existing values.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

### Body Parameters

- `description: optional string`

  A human-provided description of the CF1 Site.

- `location: optional Cf1SiteLocation`

  - `lat: optional number`

    Latitude of the CF1 Site.

  - `long: optional number`

    Longitude of the CF1 Site.

  - `name: optional string`

    Name of nearest town, city, or village.

- `name: optional string`

  A human-provided name describing the CF1 Site that should be unique within the account.

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

- `result: Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Launch Pad 34",
          "name": "Pad 34"
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
    "name": "Pad 34",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "description": "Launch Pad 34",
    "location": {
      "lat": 28.521339842093845,
      "long": -80.56092644815843,
      "name": "Cape Canaveral"
    },
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Delete CF1 Site

**delete** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}`

Deletes a specific CF1 Site for an account.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

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

- `result: Cf1Site`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID \
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
    "name": "Pad 34",
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2019-12-27T18:11:19.117Z",
    "description": "Launch Pad 34",
    "location": {
      "lat": 28.521339842093845,
      "long": -80.56092644815843,
      "name": "Cape Canaveral"
    },
    "modified_on": "2019-12-27T18:11:19.117Z"
  },
  "success": true
}
```

## Domain Types

### Cf1 Site

- `Cf1Site object { name, id, created_on, 3 more }`

  - `name: string`

    A human-provided name describing the CF1 Site that should be unique within the account.

  - `id: optional string`

    Identifier

  - `created_on: optional string`

  - `description: optional string`

    A human-provided description of the CF1 Site.

  - `location: optional Cf1SiteLocation`

    - `lat: optional number`

      Latitude of the CF1 Site.

    - `long: optional number`

      Longitude of the CF1 Site.

    - `name: optional string`

      Name of nearest town, city, or village.

  - `modified_on: optional string`

### Cf1 Site Location

- `Cf1SiteLocation object { lat, long, name }`

  - `lat: optional number`

    Latitude of the CF1 Site.

  - `long: optional number`

    Longitude of the CF1 Site.

  - `name: optional string`

    Name of nearest town, city, or village.

# Ramps

## List CF1 Site Ramps

**get** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps`

Lists ramps (network connections) associated with a CF1 Site. Ramps represent GRE tunnels, IPsec tunnels, interconnects, or MCONN links.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

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

- `result: array of Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps \
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
      "created_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "primary_gre_ramp",
      "type": "gre",
      "description": "Primary CF GRE tunnel",
      "gre": {
        "managed_by": "managed_by"
      },
      "gre_interconnect": {
        "managed_by": "managed_by"
      },
      "ipsec": {
        "managed_by": "managed_by"
      },
      "mconn": {
        "managed_by": "managed_by"
      },
      "mpls_interconnect": {
        "managed_by": "managed_by"
      }
    }
  ],
  "success": true
}
```

## Get CF1 Site Ramp

**get** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps/{ramp_id}`

Gets a specific ramp for a CF1 Site.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

- `ramp_id: string`

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

- `result: Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps/$RAMP_ID \
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
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "primary_gre_ramp",
    "type": "gre",
    "description": "Primary CF GRE tunnel",
    "gre": {
      "managed_by": "managed_by"
    },
    "gre_interconnect": {
      "managed_by": "managed_by"
    },
    "ipsec": {
      "managed_by": "managed_by"
    },
    "mconn": {
      "managed_by": "managed_by"
    },
    "mpls_interconnect": {
      "managed_by": "managed_by"
    }
  },
  "success": true
}
```

## Create CF1 Site Ramps

**post** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps`

Creates ramps (network connections) for a CF1 Site.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

### Body Parameters

- `body: array of object { source_ramp_id, type }`

  - `source_ramp_id: string`

    Identifier of the source network resource to associate as a ramp.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

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

- `result: array of Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "source_ramp_id": "023e105f4ecef8ad9ca31a8372d0c353",
            "type": "gre"
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2019-12-27T18:11:19.117Z",
      "modified_on": "2019-12-27T18:11:19.117Z",
      "name": "primary_gre_ramp",
      "type": "gre",
      "description": "Primary CF GRE tunnel",
      "gre": {
        "managed_by": "managed_by"
      },
      "gre_interconnect": {
        "managed_by": "managed_by"
      },
      "ipsec": {
        "managed_by": "managed_by"
      },
      "mconn": {
        "managed_by": "managed_by"
      },
      "mpls_interconnect": {
        "managed_by": "managed_by"
      }
    }
  ],
  "success": true
}
```

## Delete CF1 Site Ramp

**delete** `/accounts/{account_id}/magic/cf1_sites/{cf1_site_id}/ramps/{ramp_id}`

Deletes a specific ramp from a CF1 Site.

### Path Parameters

- `account_id: string`

  Identifier

- `cf1_site_id: string`

  Identifier

- `ramp_id: string`

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

- `result: Ramp`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

- `success: true`

  Whether the API call was successful

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/magic/cf1_sites/$CF1_SITE_ID/ramps/$RAMP_ID \
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
    "created_on": "2019-12-27T18:11:19.117Z",
    "modified_on": "2019-12-27T18:11:19.117Z",
    "name": "primary_gre_ramp",
    "type": "gre",
    "description": "Primary CF GRE tunnel",
    "gre": {
      "managed_by": "managed_by"
    },
    "gre_interconnect": {
      "managed_by": "managed_by"
    },
    "ipsec": {
      "managed_by": "managed_by"
    },
    "mconn": {
      "managed_by": "managed_by"
    },
    "mpls_interconnect": {
      "managed_by": "managed_by"
    }
  },
  "success": true
}
```

## Domain Types

### Ramp

- `Ramp object { id, created_on, modified_on, 8 more }`

  - `id: string`

    Identifier

  - `created_on: string`

  - `modified_on: string`

  - `name: string`

    A human-provided name describing the ramp that should be unique within the CF1 Site.

  - `type: RampType`

    The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

    - `"gre"`

    - `"gre_interconnect"`

    - `"mpls_interconnect"`

    - `"mconn"`

    - `"ipsec"`

  - `description: optional string`

    A human-provided description of the ramp.

  - `gre: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `gre_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `ipsec: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mconn: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

  - `mpls_interconnect: optional object { managed_by }`

    - `managed_by: optional string`

      URL reference to the source network resource that this ramp is managed by.

### Ramp Type

- `RampType = "gre" or "gre_interconnect" or "mpls_interconnect" or 2 more`

  The type of network connection (ramp) linking a CF1 Site to Cloudflare's network.

  - `"gre"`

  - `"gre_interconnect"`

  - `"mpls_interconnect"`

  - `"mconn"`

  - `"ipsec"`

# PCAPs

## List packet capture requests

**get** `/accounts/{account_id}/pcaps`

Lists all packet capture requests for an account.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: array of PCAP or object { id, byte_limit, colo_name, 10 more }`

  - `PCAP object { id, filter_v1, offset_time, 5 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

  - `MagicVisibilityPCAPsPCAPsResponseFull object { id, byte_limit, colo_name, 10 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `colo_name: optional string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: optional string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `error_message: optional string`

      An error message that describes why the packet capture failed. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packets_captured: optional number`

      The number of packets captured.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `stop_requested: optional string`

      The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps \
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
      "id": "66802ca5668e47a2b82c2e6746e45037",
      "filter_v1": {
        "destination_address": "1.2.3.4",
        "destination_port": 80,
        "protocol": 6,
        "source_address": "1.2.3.4",
        "source_port": 123
      },
      "offset_time": "2020-01-01T08:00:00Z",
      "status": "success",
      "submitted": "2020-01-01T08:00:00Z",
      "system": "magic-transit",
      "time_limit": 300,
      "type": "simple"
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

## Get PCAP request

**get** `/accounts/{account_id}/pcaps/{pcap_id}`

Get information for a PCAP request by id.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

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

- `result: PCAP or object { id, byte_limit, colo_name, 10 more }`

  - `PCAP object { id, filter_v1, offset_time, 5 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

  - `MagicVisibilityPCAPsPCAPsResponseFull object { id, byte_limit, colo_name, 10 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `colo_name: optional string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: optional string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `error_message: optional string`

      An error message that describes why the packet capture failed. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packets_captured: optional number`

      The number of packets captured.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `stop_requested: optional string`

      The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID \
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
    "id": "66802ca5668e47a2b82c2e6746e45037",
    "filter_v1": {
      "destination_address": "1.2.3.4",
      "destination_port": 80,
      "protocol": 6,
      "source_address": "1.2.3.4",
      "source_port": 123
    },
    "offset_time": "2020-01-01T08:00:00Z",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "system": "magic-transit",
    "time_limit": 300,
    "type": "simple"
  },
  "success": true
}
```

## Create PCAP request

**post** `/accounts/{account_id}/pcaps`

Create new PCAP request for account.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `body: object { packet_limit, system, time_limit, 3 more }  or object { colo_name, destination_conf, system, 5 more }`

  - `MagicVisibilityPCAPsPCAPsRequestSimple object { packet_limit, system, time_limit, 3 more }`

    - `packet_limit: number`

      The limit of packets contained in a packet capture.

    - `system: "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: number`

      The packet capture duration in seconds.

    - `type: "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

  - `MagicVisibilityPCAPsPCAPsRequestFull object { colo_name, destination_conf, system, 5 more }`

    - `colo_name: string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `system: "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: number`

      The packet capture duration in seconds.

    - `type: "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packet_limit: optional number`

      The limit of packets contained in a packet capture.

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

- `result: PCAP or object { id, byte_limit, colo_name, 10 more }`

  - `PCAP object { id, filter_v1, offset_time, 5 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

  - `MagicVisibilityPCAPsPCAPsResponseFull object { id, byte_limit, colo_name, 10 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `colo_name: optional string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: optional string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `error_message: optional string`

      An error message that describes why the packet capture failed. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packets_captured: optional number`

      The number of packets captured.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `stop_requested: optional string`

      The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "packet_limit": 10000,
          "system": "magic-transit",
          "time_limit": 300,
          "type": "simple",
          "offset_time": "2020-01-01T08:00:00Z"
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
    "id": "66802ca5668e47a2b82c2e6746e45037",
    "filter_v1": {
      "destination_address": "1.2.3.4",
      "destination_port": 80,
      "protocol": 6,
      "source_address": "1.2.3.4",
      "source_port": 123
    },
    "offset_time": "2020-01-01T08:00:00Z",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "system": "magic-transit",
    "time_limit": 300,
    "type": "simple"
  },
  "success": true
}
```

## Stop full PCAP

**put** `/accounts/{account_id}/pcaps/{pcap_id}/stop`

Stop full PCAP.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID/stop \
    -X PUT \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Domain Types

### PCAP

- `PCAP object { id, filter_v1, offset_time, 5 more }`

  - `id: optional string`

    The ID for the packet capture.

  - `filter_v1: optional PCAPFilter`

    The packet capture filter. When this field is empty, all packets are captured.

    - `destination_address: optional string`

      The destination IP address of the packet.

    - `destination_port: optional number`

      The destination port of the packet.

    - `protocol: optional number`

      The protocol number of the packet.

    - `source_address: optional string`

      The source IP address of the packet.

    - `source_port: optional number`

      The source port of the packet.

  - `offset_time: optional string`

    The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

  - `status: optional "unknown" or "success" or "pending" or 5 more`

    The status of the packet capture request.

    - `"unknown"`

    - `"success"`

    - `"pending"`

    - `"running"`

    - `"conversion_pending"`

    - `"conversion_running"`

    - `"complete"`

    - `"failed"`

  - `submitted: optional string`

    The RFC 3339 timestamp when the packet capture was created.

  - `system: optional "magic-transit"`

    The system used to collect packet captures.

    - `"magic-transit"`

  - `time_limit: optional number`

    The packet capture duration in seconds.

  - `type: optional "simple" or "full"`

    The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

    - `"simple"`

    - `"full"`

### PCAP Filter

- `PCAPFilter object { destination_address, destination_port, protocol, 2 more }`

  The packet capture filter. When this field is empty, all packets are captured.

  - `destination_address: optional string`

    The destination IP address of the packet.

  - `destination_port: optional number`

    The destination port of the packet.

  - `protocol: optional number`

    The protocol number of the packet.

  - `source_address: optional string`

    The source IP address of the packet.

  - `source_port: optional number`

    The source port of the packet.

### PCAP List Response

- `PCAPListResponse = PCAP or object { id, byte_limit, colo_name, 10 more }`

  - `PCAP object { id, filter_v1, offset_time, 5 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

  - `MagicVisibilityPCAPsPCAPsResponseFull object { id, byte_limit, colo_name, 10 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `colo_name: optional string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: optional string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `error_message: optional string`

      An error message that describes why the packet capture failed. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packets_captured: optional number`

      The number of packets captured.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `stop_requested: optional string`

      The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

### PCAP Get Response

- `PCAPGetResponse = PCAP or object { id, byte_limit, colo_name, 10 more }`

  - `PCAP object { id, filter_v1, offset_time, 5 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

  - `MagicVisibilityPCAPsPCAPsResponseFull object { id, byte_limit, colo_name, 10 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `colo_name: optional string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: optional string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `error_message: optional string`

      An error message that describes why the packet capture failed. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packets_captured: optional number`

      The number of packets captured.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `stop_requested: optional string`

      The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

### PCAP Create Response

- `PCAPCreateResponse = PCAP or object { id, byte_limit, colo_name, 10 more }`

  - `PCAP object { id, filter_v1, offset_time, 5 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

      - `destination_address: optional string`

        The destination IP address of the packet.

      - `destination_port: optional number`

        The destination port of the packet.

      - `protocol: optional number`

        The protocol number of the packet.

      - `source_address: optional string`

        The source IP address of the packet.

      - `source_port: optional number`

        The source port of the packet.

    - `offset_time: optional string`

      The RFC 3339 offset timestamp from which to query backwards for packets. Must be within the last 24h. When this field is empty, defaults to time of request.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

  - `MagicVisibilityPCAPsPCAPsResponseFull object { id, byte_limit, colo_name, 10 more }`

    - `id: optional string`

      The ID for the packet capture.

    - `byte_limit: optional number`

      The maximum number of bytes to capture. This field only applies to `full` packet captures.

    - `colo_name: optional string`

      The name of the data center used for the packet capture. This can be a specific colo (ord02) or a multi-colo name (ORD). This field only applies to `full` packet captures.

    - `destination_conf: optional string`

      The full URI for the bucket. This field only applies to `full` packet captures.

    - `error_message: optional string`

      An error message that describes why the packet capture failed. This field only applies to `full` packet captures.

    - `filter_v1: optional PCAPFilter`

      The packet capture filter. When this field is empty, all packets are captured.

    - `packets_captured: optional number`

      The number of packets captured.

    - `status: optional "unknown" or "success" or "pending" or 5 more`

      The status of the packet capture request.

      - `"unknown"`

      - `"success"`

      - `"pending"`

      - `"running"`

      - `"conversion_pending"`

      - `"conversion_running"`

      - `"complete"`

      - `"failed"`

    - `stop_requested: optional string`

      The RFC 3339 timestamp when stopping the packet capture was requested. This field only applies to `full` packet captures.

    - `submitted: optional string`

      The RFC 3339 timestamp when the packet capture was created.

    - `system: optional "magic-transit"`

      The system used to collect packet captures.

      - `"magic-transit"`

    - `time_limit: optional number`

      The packet capture duration in seconds.

    - `type: optional "simple" or "full"`

      The type of packet capture. `Simple` captures sampled packets, and `full` captures entire payloads and non-sampled packets.

      - `"simple"`

      - `"full"`

# Ownership

## List PCAPs Bucket Ownership

**get** `/accounts/{account_id}/pcaps/ownership`

List all buckets configured for use with PCAPs API.

### Path Parameters

- `account_id: string`

  Identifier.

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

- `result: array of Ownership`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership \
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
      "id": "9883874ecac311ec8475433579a6bf5f",
      "destination_conf": "s3://pcaps-bucket?region=us-east-1",
      "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
      "status": "success",
      "submitted": "2020-01-01T08:00:00Z",
      "validated": "2020-01-01T08:00:00Z"
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

## Add buckets for full packet captures

**post** `/accounts/{account_id}/pcaps/ownership`

Adds an AWS or GCP bucket to use with full packet captures.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `destination_conf: string`

  The full URI for the bucket. This field only applies to `full` packet captures.

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

- `result: Ownership`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://pcaps-bucket?region=us-east-1"
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
    "id": "9883874ecac311ec8475433579a6bf5f",
    "destination_conf": "s3://pcaps-bucket?region=us-east-1",
    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "validated": "2020-01-01T08:00:00Z"
  },
  "success": true
}
```

## Delete buckets for full packet captures

**delete** `/accounts/{account_id}/pcaps/ownership/{ownership_id}`

Deletes buckets added to the packet captures API.

### Path Parameters

- `account_id: string`

  Identifier.

- `ownership_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership/$OWNERSHIP_ID \
    -X DELETE \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

## Validate buckets for full packet captures

**post** `/accounts/{account_id}/pcaps/ownership/validate`

Validates buckets added to the packet captures API.

### Path Parameters

- `account_id: string`

  Identifier.

### Body Parameters

- `destination_conf: string`

  The full URI for the bucket. This field only applies to `full` packet captures.

- `ownership_challenge: string`

  The ownership challenge filename stored in the bucket.

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

- `result: Ownership`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/ownership/validate \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "destination_conf": "s3://pcaps-bucket?region=us-east-1",
          "ownership_challenge": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt"
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
    "id": "9883874ecac311ec8475433579a6bf5f",
    "destination_conf": "s3://pcaps-bucket?region=us-east-1",
    "filename": "ownership-challenge-9883874ecac311ec8475433579a6bf5f.txt",
    "status": "success",
    "submitted": "2020-01-01T08:00:00Z",
    "validated": "2020-01-01T08:00:00Z"
  },
  "success": true
}
```

## Domain Types

### Ownership

- `Ownership object { id, destination_conf, filename, 3 more }`

  - `id: string`

    The bucket ID associated with the packet captures API.

  - `destination_conf: string`

    The full URI for the bucket. This field only applies to `full` packet captures.

  - `filename: string`

    The ownership challenge filename stored in the bucket.

  - `status: "pending" or "success" or "failed"`

    The status of the ownership challenge. Can be pending, success or failed.

    - `"pending"`

    - `"success"`

    - `"failed"`

  - `submitted: string`

    The RFC 3339 timestamp when the bucket was added to packet captures API.

  - `validated: optional string`

    The RFC 3339 timestamp when the bucket was validated.

# Download

## Download Simple PCAP

**get** `/accounts/{account_id}/pcaps/{pcap_id}/download`

Download PCAP information into a file. Response is a binary PCAP file.

### Path Parameters

- `account_id: string`

  Identifier.

- `pcap_id: string`

  Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pcaps/$PCAP_ID/download \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```
