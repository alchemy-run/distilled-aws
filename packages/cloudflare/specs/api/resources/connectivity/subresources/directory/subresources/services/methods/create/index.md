## Create Workers VPC connectivity service

**post** `/accounts/{account_id}/connectivity/directory/services`

Create Workers VPC connectivity service

### Path Parameters

- `account_id: string`

  Account identifier

### Body Parameters

- `body: object { host, name, type, 6 more }  or object { host, name, type, 6 more }`

  - `InfraHTTPServiceConfig object { host, name, type, 6 more }`

    - `host: object { ipv4, network }  or object { ipv6, network }  or object { ipv4, ipv6, network }  or object { hostname, resolver_network }`

      - `InfraIPv4Host object { ipv4, network }`

        - `ipv4: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraIPv6Host object { ipv6, network }`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraDualStackHost object { ipv4, ipv6, network }`

        - `ipv4: string`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraHostnameHost object { hostname, resolver_network }`

        - `hostname: string`

        - `resolver_network: object { tunnel_id, resolver_ips }`

          - `tunnel_id: string`

          - `resolver_ips: optional array of string`

    - `name: string`

    - `type: "tcp" or "http"`

      - `"tcp"`

      - `"http"`

    - `created_at: optional string`

    - `http_port: optional number`

    - `https_port: optional number`

    - `service_id: optional string`

    - `tls_settings: optional object { cert_verification_mode }`

      TLS settings for a connectivity service.

      If omitted, the default mode (`verify_full`) is used.

      - `cert_verification_mode: string`

        TLS certificate verification mode for the connection to the origin.

        - `"verify_full"` — verify certificate chain and hostname (default)
        - `"verify_ca"` — verify certificate chain only, skip hostname check
        - `"disabled"` — do not verify the server certificate at all

    - `updated_at: optional string`

  - `InfraTCPServiceConfig object { host, name, type, 6 more }`

    - `host: object { ipv4, network }  or object { ipv6, network }  or object { ipv4, ipv6, network }  or object { hostname, resolver_network }`

      - `InfraIPv4Host object { ipv4, network }`

        - `ipv4: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraIPv6Host object { ipv6, network }`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraDualStackHost object { ipv4, ipv6, network }`

        - `ipv4: string`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraHostnameHost object { hostname, resolver_network }`

        - `hostname: string`

        - `resolver_network: object { tunnel_id, resolver_ips }`

          - `tunnel_id: string`

          - `resolver_ips: optional array of string`

    - `name: string`

    - `type: "tcp" or "http"`

      - `"tcp"`

      - `"http"`

    - `app_protocol: optional "postgresql" or "mysql"`

      - `"postgresql"`

      - `"mysql"`

    - `created_at: optional string`

    - `service_id: optional string`

    - `tcp_port: optional number`

    - `tls_settings: optional object { cert_verification_mode }`

      TLS settings for a connectivity service.

      If omitted, the default mode (`verify_full`) is used.

      - `cert_verification_mode: string`

        TLS certificate verification mode for the connection to the origin.

        - `"verify_full"` — verify certificate chain and hostname (default)
        - `"verify_ca"` — verify certificate chain only, skip hostname check
        - `"disabled"` — do not verify the server certificate at all

    - `updated_at: optional string`

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

- `result: optional object { host, name, type, 6 more }  or object { host, name, type, 6 more }`

  - `InfraHTTPServiceConfig object { host, name, type, 6 more }`

    - `host: object { ipv4, network }  or object { ipv6, network }  or object { ipv4, ipv6, network }  or object { hostname, resolver_network }`

      - `InfraIPv4Host object { ipv4, network }`

        - `ipv4: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraIPv6Host object { ipv6, network }`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraDualStackHost object { ipv4, ipv6, network }`

        - `ipv4: string`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraHostnameHost object { hostname, resolver_network }`

        - `hostname: string`

        - `resolver_network: object { tunnel_id, resolver_ips }`

          - `tunnel_id: string`

          - `resolver_ips: optional array of string`

    - `name: string`

    - `type: "tcp" or "http"`

      - `"tcp"`

      - `"http"`

    - `created_at: optional string`

    - `http_port: optional number`

    - `https_port: optional number`

    - `service_id: optional string`

    - `tls_settings: optional object { cert_verification_mode }`

      TLS settings for a connectivity service.

      If omitted, the default mode (`verify_full`) is used.

      - `cert_verification_mode: string`

        TLS certificate verification mode for the connection to the origin.

        - `"verify_full"` — verify certificate chain and hostname (default)
        - `"verify_ca"` — verify certificate chain only, skip hostname check
        - `"disabled"` — do not verify the server certificate at all

    - `updated_at: optional string`

  - `InfraTCPServiceConfig object { host, name, type, 6 more }`

    - `host: object { ipv4, network }  or object { ipv6, network }  or object { ipv4, ipv6, network }  or object { hostname, resolver_network }`

      - `InfraIPv4Host object { ipv4, network }`

        - `ipv4: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraIPv6Host object { ipv6, network }`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraDualStackHost object { ipv4, ipv6, network }`

        - `ipv4: string`

        - `ipv6: string`

        - `network: object { tunnel_id }`

          - `tunnel_id: string`

      - `InfraHostnameHost object { hostname, resolver_network }`

        - `hostname: string`

        - `resolver_network: object { tunnel_id, resolver_ips }`

          - `tunnel_id: string`

          - `resolver_ips: optional array of string`

    - `name: string`

    - `type: "tcp" or "http"`

      - `"tcp"`

      - `"http"`

    - `app_protocol: optional "postgresql" or "mysql"`

      - `"postgresql"`

      - `"mysql"`

    - `created_at: optional string`

    - `service_id: optional string`

    - `tcp_port: optional number`

    - `tls_settings: optional object { cert_verification_mode }`

      TLS settings for a connectivity service.

      If omitted, the default mode (`verify_full`) is used.

      - `cert_verification_mode: string`

        TLS certificate verification mode for the connection to the origin.

        - `"verify_full"` — verify certificate chain and hostname (default)
        - `"verify_ca"` — verify certificate chain only, skip hostname check
        - `"disabled"` — do not verify the server certificate at all

    - `updated_at: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/connectivity/directory/services \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "host": {
            "ipv4": "10.0.0.1",
            "network": {
              "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da"
            }
          },
          "name": "web-app",
          "type": "http",
          "http_port": 8080,
          "https_port": 8443
        }'
```

#### Response

```json
{
  "errors": [],
  "messages": [],
  "result": {
    "created_at": "2024-01-15T09:30:00Z",
    "host": {
      "hostname": "api.example.com",
      "resolver_network": {
        "tunnel_id": "0191dce4-9ab4-7fce-b660-8e5dec5172da"
      }
    },
    "name": "web-server",
    "service_id": "550e8400-e29b-41d4-a716-446655440000",
    "type": "http",
    "updated_at": "2024-01-15T09:30:00Z"
  },
  "success": true
}
```
