## Patch Hyperdrive

**patch** `/accounts/{account_id}/hyperdrive/configs/{hyperdrive_id}`

Patches and returns the specified Hyperdrive configuration. Custom caching settings are not kept if caching is disabled.

### Path Parameters

- `account_id: string`

  Define configurations using a unique string identifier.

- `hyperdrive_id: string`

  Define configurations using a unique string identifier.

### Body Parameters

- `caching: optional object { disabled }  or object { disabled, max_age, stale_while_revalidate }`

  - `HyperdriveHyperdriveCachingCommon object { disabled }`

    - `disabled: optional boolean`

      Set to true to disable caching of SQL responses. Default is false.

  - `HyperdriveHyperdriveCachingEnabled object { disabled, max_age, stale_while_revalidate }`

    - `disabled: optional boolean`

      Set to true to disable caching of SQL responses. Default is false.

    - `max_age: optional number`

      Specify the maximum duration (in seconds) items should persist in the cache. Defaults to 60 seconds if not specified.

    - `stale_while_revalidate: optional number`

      Specify the number of seconds the cache may serve a stale response. Defaults to 15 seconds if not specified.

- `mtls: optional object { ca_certificate_id, mtls_certificate_id, sslmode }`

  mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.

  - `ca_certificate_id: optional string`

    Define CA certificate ID obtained after uploading CA cert.

  - `mtls_certificate_id: optional string`

    Define mTLS certificate ID obtained after uploading client cert.

  - `sslmode: optional string`

    Set SSL mode to 'require', 'verify-ca', or 'verify-full' to verify the CA.

- `name: optional string`

  The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.

- `origin: optional object { database, password, scheme, user }  or object { host, port }  or object { access_client_id, access_client_secret, host }  or object { service_id }`

  Connect to a database through a Workers VPC Service. TLS settings (mTLS, sslmode) cannot be configured on the Hyperdrive when using a VPC Service origin; TLS must be managed on the VPC Service itself.

  - `HyperdriveHyperdriveDatabase object { database, password, scheme, user }`

    - `database: optional string`

      Set the name of your origin database.

    - `password: optional string`

      Set the password needed to access your origin database. The API never returns this write-only value.

    - `scheme: optional "postgres" or "postgresql" or "mysql"`

      Specifies the URL scheme used to connect to your origin database.

      - `"postgres"`

      - `"postgresql"`

      - `"mysql"`

    - `user: optional string`

      Set the user of your origin database.

  - `HyperdriveInternetOrigin object { host, port }`

    - `host: string`

      Defines the host (hostname or IP) of your origin database.

    - `port: number`

      Defines the port of your origin database. Defaults to 5432 for PostgreSQL or 3306 for MySQL if not specified.

  - `HyperdriveOverAccessOrigin object { access_client_id, access_client_secret, host }`

    - `access_client_id: string`

      Defines the Client ID of the Access token to use when connecting to the origin database.

    - `access_client_secret: string`

      Defines the Client Secret of the Access Token to use when connecting to the origin database. The API never returns this write-only value.

    - `host: string`

      Defines the host (hostname or IP) of your origin database.

  - `HyperdriveVPCServiceOrigin object { service_id }`

    Connect to a database through a Workers VPC Service. TLS settings (mTLS, sslmode) cannot be configured on the Hyperdrive when using a VPC Service origin; TLS must be managed on the VPC Service itself.

    - `service_id: string`

      The identifier of the Workers VPC Service to connect through. Hyperdrive will egress through the specified VPC Service to reach the origin database.

- `origin_connection_limit: optional number`

  The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.

  Maximum allowed: 20 for free tier accounts, 100 for paid tier accounts.
  If not specified, defaults to 20 for free tier and 60 for paid tier.
  Contact Cloudflare if you need a higher limit.

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

- `result: Hyperdrive`

  - `id: string`

    Define configurations using a unique string identifier.

  - `name: string`

    The name of the Hyperdrive configuration. Used to identify the configuration in the Cloudflare dashboard and API.

  - `origin: object { database, host, password, 3 more }  or object { access_client_id, access_client_secret, database, 4 more }  or object { database, password, scheme, 2 more }`

    - `PublicDatabase object { database, host, password, 3 more }`

      - `database: string`

        Set the name of your origin database.

      - `host: string`

        Defines the host (hostname or IP) of your origin database.

      - `password: string`

        Set the password needed to access your origin database. The API never returns this write-only value.

      - `port: number`

        Defines the port of your origin database. Defaults to 5432 for PostgreSQL or 3306 for MySQL if not specified.

      - `scheme: "postgres" or "postgresql" or "mysql"`

        Specifies the URL scheme used to connect to your origin database.

        - `"postgres"`

        - `"postgresql"`

        - `"mysql"`

      - `user: string`

        Set the user of your origin database.

    - `AccessProtectedDatabaseBehindCloudflareTunnel object { access_client_id, access_client_secret, database, 4 more }`

      - `access_client_id: string`

        Defines the Client ID of the Access token to use when connecting to the origin database.

      - `access_client_secret: string`

        Defines the Client Secret of the Access Token to use when connecting to the origin database. The API never returns this write-only value.

      - `database: string`

        Set the name of your origin database.

      - `host: string`

        Defines the host (hostname or IP) of your origin database.

      - `password: string`

        Set the password needed to access your origin database. The API never returns this write-only value.

      - `scheme: "postgres" or "postgresql" or "mysql"`

        Specifies the URL scheme used to connect to your origin database.

        - `"postgres"`

        - `"postgresql"`

        - `"mysql"`

      - `user: string`

        Set the user of your origin database.

    - `DatabaseReachableThroughAWorkersVPC object { database, password, scheme, 2 more }`

      - `database: string`

        Set the name of your origin database.

      - `password: string`

        Set the password needed to access your origin database. The API never returns this write-only value.

      - `scheme: "postgres" or "postgresql" or "mysql"`

        Specifies the URL scheme used to connect to your origin database.

        - `"postgres"`

        - `"postgresql"`

        - `"mysql"`

      - `service_id: string`

        The identifier of the Workers VPC Service to connect through. Hyperdrive will egress through the specified VPC Service to reach the origin database.

      - `user: string`

        Set the user of your origin database.

  - `caching: optional object { disabled }  or object { disabled, max_age, stale_while_revalidate }`

    - `HyperdriveHyperdriveCachingCommon object { disabled }`

      - `disabled: optional boolean`

        Set to true to disable caching of SQL responses. Default is false.

    - `HyperdriveHyperdriveCachingEnabled object { disabled, max_age, stale_while_revalidate }`

      - `disabled: optional boolean`

        Set to true to disable caching of SQL responses. Default is false.

      - `max_age: optional number`

        Specify the maximum duration (in seconds) items should persist in the cache. Defaults to 60 seconds if not specified.

      - `stale_while_revalidate: optional number`

        Specify the number of seconds the cache may serve a stale response. Defaults to 15 seconds if not specified.

  - `created_on: optional string`

    Defines the creation time of the Hyperdrive configuration.

  - `modified_on: optional string`

    Defines the last modified time of the Hyperdrive configuration.

  - `mtls: optional object { ca_certificate_id, mtls_certificate_id, sslmode }`

    mTLS configuration for the origin connection. Cannot be used with VPC Service origins; TLS must be managed on the VPC Service.

    - `ca_certificate_id: optional string`

      Define CA certificate ID obtained after uploading CA cert.

    - `mtls_certificate_id: optional string`

      Define mTLS certificate ID obtained after uploading client cert.

    - `sslmode: optional string`

      Set SSL mode to 'require', 'verify-ca', or 'verify-full' to verify the CA.

  - `origin_connection_limit: optional number`

    The (soft) maximum number of connections the Hyperdrive is allowed to make to the origin database.

    Maximum allowed: 20 for free tier accounts, 100 for paid tier accounts.
    If not specified, defaults to 20 for free tier and 60 for paid tier.
    Contact Cloudflare if you need a higher limit.

- `success: true`

  Return the status of the API call success.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/hyperdrive/configs/$HYPERDRIVE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "name": "example-hyperdrive",
          "origin_connection_limit": 60
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
    "name": "example-hyperdrive",
    "origin": {
      "database": "postgres",
      "host": "database.example.com",
      "port": 5432,
      "scheme": "postgres",
      "user": "postgres"
    },
    "caching": {
      "disabled": true
    },
    "created_on": "2017-01-01T00:00:00Z",
    "modified_on": "2017-01-01T00:00:00Z",
    "mtls": {
      "ca_certificate_id": "00000000-0000-0000-0000-0000000000",
      "mtls_certificate_id": "00000000-0000-0000-0000-0000000000",
      "sslmode": "verify-full"
    },
    "origin_connection_limit": 60
  },
  "success": true
}
```
