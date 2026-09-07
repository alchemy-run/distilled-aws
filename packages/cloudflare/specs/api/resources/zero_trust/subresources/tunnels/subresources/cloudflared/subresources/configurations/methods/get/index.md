## Get configuration

**get** `/accounts/{account_id}/cfd_tunnel/{tunnel_id}/configurations`

Gets the configuration for a remotely-managed tunnel

### Path Parameters

- `account_id: string`

  Identifier.

- `tunnel_id: string`

  UUID of the tunnel.

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

- `result: optional object { account_id, config, created_at, 3 more }`

  Cloudflare Tunnel configuration

  - `account_id: optional string`

    Identifier.

  - `config: optional object { ingress, originRequest }`

    The tunnel configuration and ingress rules.

    - `ingress: optional array of object { hostname, service, originRequest, path }`

      List of public hostname definitions. At least one ingress rule needs to be defined for the tunnel.

      - `hostname: string`

        Public hostname for this service.

      - `service: string`

        Protocol and address of destination server. Supported protocols: http://, https://, unix://, tcp://, ssh://, rdp://, unix+tls://, smb://. Alternatively can return a HTTP status code http_status:[code] e.g. 'http_status:404'.

      - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

        Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

        - `access: optional object { audTag, teamName, required }`

          For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

          - `audTag: array of string`

            Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

          - `teamName: string`

          - `required: optional boolean`

            Deny traffic that has not fulfilled Access authorization.

        - `caPool: optional string`

          Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

        - `connectTimeout: optional number`

          Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

        - `disableChunkedEncoding: optional boolean`

          Disables chunked transfer encoding. Useful if you are running a WSGI server.

        - `http2Origin: optional boolean`

          Attempt to connect to origin using HTTP2. Origin must be configured as https.

        - `httpHostHeader: optional string`

          Sets the HTTP Host header on requests sent to the local service.

        - `keepAliveConnections: optional number`

          Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

        - `keepAliveTimeout: optional number`

          Timeout after which an idle keepalive connection can be discarded.

        - `matchSNItoHost: optional boolean`

          Auto configure the Hostname on the origin server certificate.

        - `noHappyEyeballs: optional boolean`

          Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

        - `noTLSVerify: optional boolean`

          Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

        - `originServerName: optional string`

          Hostname that cloudflared should expect from your origin server certificate.

        - `proxyType: optional string`

          cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

        - `tcpKeepAlive: optional number`

          The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

        - `tlsTimeout: optional number`

          Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

      - `path: optional string`

        Requests with this path route to this public hostname.

    - `originRequest: optional object { access, caPool, connectTimeout, 12 more }`

      Configuration parameters for the public hostname specific connection settings between cloudflared and origin server.

      - `access: optional object { audTag, teamName, required }`

        For all L7 requests to this hostname, cloudflared will validate each request's Cf-Access-Jwt-Assertion request header.

        - `audTag: array of string`

          Access applications that are allowed to reach this hostname for this Tunnel. Audience tags can be identified in the dashboard or via the List Access policies API.

        - `teamName: string`

        - `required: optional boolean`

          Deny traffic that has not fulfilled Access authorization.

      - `caPool: optional string`

        Path to the certificate authority (CA) for the certificate of your origin. This option should be used only if your certificate is not signed by Cloudflare.

      - `connectTimeout: optional number`

        Timeout for establishing a new TCP connection to your origin server. This excludes the time taken to establish TLS, which is controlled by tlsTimeout.

      - `disableChunkedEncoding: optional boolean`

        Disables chunked transfer encoding. Useful if you are running a WSGI server.

      - `http2Origin: optional boolean`

        Attempt to connect to origin using HTTP2. Origin must be configured as https.

      - `httpHostHeader: optional string`

        Sets the HTTP Host header on requests sent to the local service.

      - `keepAliveConnections: optional number`

        Maximum number of idle keepalive connections between Tunnel and your origin. This does not restrict the total number of concurrent connections.

      - `keepAliveTimeout: optional number`

        Timeout after which an idle keepalive connection can be discarded.

      - `matchSNItoHost: optional boolean`

        Auto configure the Hostname on the origin server certificate.

      - `noHappyEyeballs: optional boolean`

        Disable the “happy eyeballs” algorithm for IPv4/IPv6 fallback if your local network has misconfigured one of the protocols.

      - `noTLSVerify: optional boolean`

        Disables TLS verification of the certificate presented by your origin. Will allow any certificate from the origin to be accepted.

      - `originServerName: optional string`

        Hostname that cloudflared should expect from your origin server certificate.

      - `proxyType: optional string`

        cloudflared starts a proxy server to translate HTTP traffic into TCP when proxying, for example, SSH or RDP. This configures what type of proxy will be started. Valid options are: "" for the regular proxy and "socks" for a SOCKS5 proxy.

      - `tcpKeepAlive: optional number`

        The timeout after which a TCP keepalive packet is sent on a connection between Tunnel and the origin server.

      - `tlsTimeout: optional number`

        Timeout for completing a TLS handshake to your origin server, if you have chosen to connect Tunnel to an HTTPS server.

  - `created_at: optional string`

  - `source: optional "local" or "cloudflare"`

    Indicates if this is a locally or remotely configured tunnel. If `local`, manage the tunnel using a YAML file on the origin machine. If `cloudflare`, manage the tunnel's configuration on the Zero Trust dashboard.

    - `"local"`

    - `"cloudflare"`

  - `tunnel_id: optional string`

    UUID of the tunnel.

  - `version: optional number`

    The version of the Tunnel Configuration.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/cfd_tunnel/$TUNNEL_ID/configurations \
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
    "account_id": "023e105f4ecef8ad9ca31a8372d0c353",
    "config": {
      "ingress": [
        {
          "hostname": "tunnel.example.com",
          "service": "https://localhost:8001",
          "originRequest": {
            "access": {
              "audTag": [
                "string"
              ],
              "teamName": "zero-trust-organization-name",
              "required": false
            },
            "caPool": "caPool",
            "connectTimeout": 10,
            "disableChunkedEncoding": true,
            "http2Origin": true,
            "httpHostHeader": "httpHostHeader",
            "keepAliveConnections": 100,
            "keepAliveTimeout": 90,
            "matchSNItoHost": false,
            "noHappyEyeballs": false,
            "noTLSVerify": false,
            "originServerName": "originServerName",
            "proxyType": "proxyType",
            "tcpKeepAlive": 30,
            "tlsTimeout": 10
          },
          "path": "subpath"
        }
      ],
      "originRequest": {
        "access": {
          "audTag": [
            "string"
          ],
          "teamName": "zero-trust-organization-name",
          "required": false
        },
        "caPool": "caPool",
        "connectTimeout": 10,
        "disableChunkedEncoding": true,
        "http2Origin": true,
        "httpHostHeader": "httpHostHeader",
        "keepAliveConnections": 100,
        "keepAliveTimeout": 90,
        "matchSNItoHost": false,
        "noHappyEyeballs": false,
        "noTLSVerify": false,
        "originServerName": "originServerName",
        "proxyType": "proxyType",
        "tcpKeepAlive": 30,
        "tlsTimeout": 10
      },
      "warp-routing": {
        "enabled": true
      }
    },
    "created_at": "2014-01-01T05:20:00.12345Z",
    "source": "cloudflare",
    "tunnel_id": "f70ff985-a4ef-4643-bbbc-4a0ed4fc8415",
    "version": 0
  }
}
```
