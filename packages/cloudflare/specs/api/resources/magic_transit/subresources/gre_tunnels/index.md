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
