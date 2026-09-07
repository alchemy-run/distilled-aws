# Apps

## List Spectrum applications

**get** `/zones/{zone_id}/spectrum/apps`

Retrieves a list of currently existing Spectrum applications inside a zone.

### Path Parameters

- `zone_id: string`

  Zone identifier.

### Query Parameters

- `direction: optional "asc" or "desc"`

  Sets the direction by which results are ordered.

  - `"asc"`

  - `"desc"`

- `order: optional "protocol" or "app_id" or "created_on" or 2 more`

  Application field by which results are ordered.

  - `"protocol"`

  - `"app_id"`

  - `"created_on"`

  - `"modified_on"`

  - `"dns"`

- `page: optional number`

  Page number of paginated results. This parameter is required in order to use other pagination parameters. If included in the query, `result_info` will be present in the response.

- `per_page: optional number`

  Sets the maximum number of results per page.

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

- `result: optional array of object { id, created_on, dns, 12 more }  or array of object { id, created_on, dns, 3 more }`

  - `array of object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `array of object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

- `result_info: optional object { count, page, per_page, 2 more }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

  - `total_pages: optional number`

    The number of total pages in the entire result set.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps \
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
  "result": [
    {
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "created_on": "2014-01-01T05:20:00.12345Z",
      "dns": {
        "name": "ssh.example.com",
        "type": "CNAME"
      },
      "modified_on": "2014-01-01T05:20:00.12345Z",
      "protocol": "tcp/22",
      "traffic_type": "direct",
      "argo_smart_routing": true,
      "edge_ips": {
        "connectivity": "all",
        "type": "dynamic"
      },
      "ip_firewall": false,
      "origin_direct": [
        "tcp://127.0.0.1:8080"
      ],
      "origin_dns": {
        "name": "origin.example.com",
        "ttl": 600,
        "type": ""
      },
      "origin_port": 22,
      "proxy_protocol": "off",
      "tls": "off",
      "virtual_network_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get Spectrum application configuration

**get** `/zones/{zone_id}/spectrum/apps/{app_id}`

Gets the application configuration of a specific application inside a zone.

### Path Parameters

- `zone_id: string`

  Zone identifier.

- `app_id: string`

  App identifier.

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

- `result: optional object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps/$APP_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "dns": {
      "name": "ssh.example.com",
      "type": "CNAME"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "protocol": "tcp/22",
    "traffic_type": "direct",
    "argo_smart_routing": true,
    "edge_ips": {
      "connectivity": "all",
      "type": "dynamic"
    },
    "ip_firewall": false,
    "origin_direct": [
      "tcp://127.0.0.1:8080"
    ],
    "origin_dns": {
      "name": "origin.example.com",
      "ttl": 600,
      "type": ""
    },
    "origin_port": 22,
    "proxy_protocol": "off",
    "tls": "off",
    "virtual_network_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Create Spectrum application using a name for the origin

**post** `/zones/{zone_id}/spectrum/apps`

Creates a new Spectrum application from a configuration using a name for the origin.

### Path Parameters

- `zone_id: string`

  Zone identifier.

### Body Parameters

- `body: object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

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

- `result: optional object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dns": {},
          "protocol": "tcp/22",
          "traffic_type": "direct",
          "argo_smart_routing": true,
          "origin_port": 22,
          "proxy_protocol": "off",
          "tls": "off"
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "dns": {
      "name": "ssh.example.com",
      "type": "CNAME"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "protocol": "tcp/22",
    "traffic_type": "direct",
    "argo_smart_routing": true,
    "edge_ips": {
      "connectivity": "all",
      "type": "dynamic"
    },
    "ip_firewall": false,
    "origin_direct": [
      "tcp://127.0.0.1:8080"
    ],
    "origin_dns": {
      "name": "origin.example.com",
      "ttl": 600,
      "type": ""
    },
    "origin_port": 22,
    "proxy_protocol": "off",
    "tls": "off",
    "virtual_network_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Update Spectrum application configuration using a name for the origin

**put** `/zones/{zone_id}/spectrum/apps/{app_id}`

Updates a previously existing application's configuration that uses a name for the origin.

### Path Parameters

- `zone_id: string`

  Zone identifier.

- `app_id: string`

  App identifier.

### Body Parameters

- `body: object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

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

- `result: optional object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps/$APP_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "dns": {},
          "protocol": "tcp/22",
          "traffic_type": "direct",
          "argo_smart_routing": true,
          "origin_port": 22,
          "proxy_protocol": "off",
          "tls": "off"
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "created_on": "2014-01-01T05:20:00.12345Z",
    "dns": {
      "name": "ssh.example.com",
      "type": "CNAME"
    },
    "modified_on": "2014-01-01T05:20:00.12345Z",
    "protocol": "tcp/22",
    "traffic_type": "direct",
    "argo_smart_routing": true,
    "edge_ips": {
      "connectivity": "all",
      "type": "dynamic"
    },
    "ip_firewall": false,
    "origin_direct": [
      "tcp://127.0.0.1:8080"
    ],
    "origin_dns": {
      "name": "origin.example.com",
      "ttl": 600,
      "type": ""
    },
    "origin_port": 22,
    "proxy_protocol": "off",
    "tls": "off",
    "virtual_network_id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e"
  }
}
```

## Delete Spectrum application

**delete** `/zones/{zone_id}/spectrum/apps/{app_id}`

Deletes a previously existing application.

### Path Parameters

- `zone_id: string`

  Zone identifier.

- `app_id: string`

  App identifier.

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

- `result: optional object { id }`

  - `id: string`

    Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/spectrum/apps/$APP_ID \
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
  "success": true,
  "result": {
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### App List Response

- `AppListResponse = object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

### App Get Response

- `AppGetResponse = object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

### App Create Response

- `AppCreateResponse = object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

### App Update Response

- `AppUpdateResponse = object { id, created_on, dns, 12 more }  or object { id, created_on, dns, 3 more }`

  - `SpectrumConfigAppConfig object { id, created_on, dns, 12 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the application.

      - `type: optional "CNAME" or "ADDRESS"`

        The type of DNS record associated with the application.

        - `"CNAME"`

        - `"ADDRESS"`

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `traffic_type: "direct" or "http" or "https"`

      Determines how data travels from the edge to your origin. When set to "direct", Spectrum will send traffic directly to your origin, and the application's type is derived from the `protocol`. When set to "http" or "https", Spectrum will apply Cloudflare's HTTP/HTTPS features as it sends traffic to your origin, and the application type matches this property exactly.

      - `"direct"`

      - `"http"`

      - `"https"`

    - `argo_smart_routing: optional boolean`

      Enables Argo Smart Routing for this application.
      Notes: Only available for TCP applications with traffic_type set to "direct".

    - `edge_ips: optional EdgeIPs`

      The anycast edge IP configuration for the hostname of this application.

      - `Dynamic object { connectivity, type }`

        - `connectivity: optional "all" or "ipv4" or "ipv6"`

          The IP versions supported for inbound connections on Spectrum anycast IPs.

          - `"all"`

          - `"ipv4"`

          - `"ipv6"`

        - `type: optional "dynamic"`

          The type of edge IP configuration specified. Dynamically allocated edge IPs use Spectrum anycast IPs in accordance with the connectivity you specify. Only valid with CNAME DNS names.

          - `"dynamic"`

      - `Static object { ips, type }`

        - `ips: optional array of string`

          The array of customer owned IPs we broadcast via anycast for this hostname and application.

        - `type: optional "static"`

          The type of edge IP configuration specified. Statically allocated edge IPs use customer IPs in accordance with the ips array you specify. Only valid with ADDRESS DNS names.

          - `"static"`

    - `ip_firewall: optional boolean`

      Enables IP Access Rules for this application.
      Notes: Only available for TCP applications.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

    - `origin_dns: optional OriginDNS`

      The name and type of DNS record for the Spectrum application.

      - `name: optional string`

        The name of the DNS record associated with the origin.

      - `ttl: optional number`

        The TTL of our resolution of your DNS record in seconds.

      - `type: optional "" or "A" or "AAAA" or "SRV"`

        The type of DNS record associated with the origin. "" is used to specify a combination of A/AAAA records.

        - `""`

        - `"A"`

        - `"AAAA"`

        - `"SRV"`

    - `origin_port: optional OriginPort`

      The destination port at the origin. Only specified in conjunction with origin_dns. May use an integer to specify a single origin port, for example `1000`, or a string to specify a range of origin ports, for example `"1000-2000"`.
      Notes: If specifying a port range, the number of ports in the range must match the number of ports specified in the "protocol" field.

      - `number`

      - `string`

    - `proxy_protocol: optional "off" or "v1" or "v2" or "simple"`

      Enables Proxy Protocol to the origin. Refer to [Enable Proxy protocol](https://developers.cloudflare.com/spectrum/getting-started/proxy-protocol/) for implementation details on PROXY Protocol V1, PROXY Protocol V2, and Simple Proxy Protocol.

      - `"off"`

      - `"v1"`

      - `"v2"`

      - `"simple"`

    - `tls: optional "off" or "flexible" or "full" or "strict"`

      The type of TLS termination associated with the application.

      - `"off"`

      - `"flexible"`

      - `"full"`

      - `"strict"`

    - `virtual_network_id: optional string`

      Optional UUID of a virtual network for routing origin traffic through tunnel virtual networks.

  - `SpectrumConfigPaygoAppConfig object { id, created_on, dns, 3 more }`

    - `id: string`

      App identifier.

    - `created_on: string`

      When the Application was created.

    - `dns: DNS`

      The name and type of DNS record for the Spectrum application.

    - `modified_on: string`

      When the Application was last modified.

    - `protocol: string`

      The port configuration at Cloudflare's edge. May specify a single port, for example `"tcp/1000"`, or a range of ports, for example `"tcp/1000-2000"`.

    - `origin_direct: optional array of string`

      List of origin IP addresses. Array may contain multiple IP addresses for load balancing.

### App Delete Response

- `AppDeleteResponse object { id }`

  - `id: string`

    Identifier.
