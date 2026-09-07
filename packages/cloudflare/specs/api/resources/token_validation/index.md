# Token Validation

# Configuration

## List token validation configurations

**get** `/zones/{zone_id}/token_validation/config`

Lists all token validation configurations for this zone

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of TokenConfig`

  - `id: string`

    UUID.

  - `created_at: string`

  - `credentials: object { keys }`

    - `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

      - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

        JSON representation of an RSA key.

        - `alg: "RS256" or "RS384" or "RS512" or 3 more`

          Algorithm

          - `"RS256"`

          - `"RS384"`

          - `"RS512"`

          - `"PS256"`

          - `"PS384"`

          - `"PS512"`

        - `e: string`

          RSA exponent

        - `kid: string`

          Key ID

        - `kty: "RSA"`

          Key Type

          - `"RSA"`

        - `n: string`

          RSA modulus

      - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

        JSON representation of an ES256 key

        - `alg: "ES256"`

          Algorithm

          - `"ES256"`

        - `crv: "P-256"`

          Curve

          - `"P-256"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

      - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

        JSON representation of an ES384 key

        - `alg: "ES384"`

          Algorithm

          - `"ES384"`

        - `crv: "P-384"`

          Curve

          - `"P-384"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

  - `description: string`

  - `last_updated: string`

  - `title: string`

  - `token_sources: array of string`

  - `token_type: "JWT"`

    - `"JWT"`

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "credentials": {
        "keys": [
          {
            "alg": "ES256",
            "crv": "P-256",
            "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
            "kty": "EC",
            "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
            "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
          }
        ]
      },
      "description": "Long description for Token Validation Configuration",
      "last_updated": "2014-01-01T05:20:00.12345Z",
      "title": "Example Token Validation Configuration",
      "token_sources": [
        "http.request.headers[\"x-auth\"][0]",
        "http.request.cookies[\"Authorization\"][0]"
      ],
      "token_type": "JWT"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get a single Token Configuration

**get** `/zones/{zone_id}/token_validation/config/{config_id}`

Get a single Token Configuration

### Path Parameters

- `zone_id: string`

  Identifier.

- `config_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: TokenConfig`

  - `id: string`

    UUID.

  - `created_at: string`

  - `credentials: object { keys }`

    - `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

      - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

        JSON representation of an RSA key.

        - `alg: "RS256" or "RS384" or "RS512" or 3 more`

          Algorithm

          - `"RS256"`

          - `"RS384"`

          - `"RS512"`

          - `"PS256"`

          - `"PS384"`

          - `"PS512"`

        - `e: string`

          RSA exponent

        - `kid: string`

          Key ID

        - `kty: "RSA"`

          Key Type

          - `"RSA"`

        - `n: string`

          RSA modulus

      - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

        JSON representation of an ES256 key

        - `alg: "ES256"`

          Algorithm

          - `"ES256"`

        - `crv: "P-256"`

          Curve

          - `"P-256"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

      - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

        JSON representation of an ES384 key

        - `alg: "ES384"`

          Algorithm

          - `"ES384"`

        - `crv: "P-384"`

          Curve

          - `"P-384"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

  - `description: string`

  - `last_updated: string`

  - `title: string`

  - `token_sources: array of string`

  - `token_type: "JWT"`

    - `"JWT"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config/$CONFIG_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "credentials": {
      "keys": [
        {
          "alg": "ES256",
          "crv": "P-256",
          "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
          "kty": "EC",
          "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
          "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
        }
      ]
    },
    "description": "Long description for Token Validation Configuration",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "title": "Example Token Validation Configuration",
    "token_sources": [
      "http.request.headers[\"x-auth\"][0]",
      "http.request.cookies[\"Authorization\"][0]"
    ],
    "token_type": "JWT"
  },
  "success": true
}
```

## Create a new Token Validation configuration

**post** `/zones/{zone_id}/token_validation/config`

Create a new Token Validation configuration

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `credentials: object { keys }`

  - `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

    - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

      JSON representation of an RSA key.

      - `alg: "RS256" or "RS384" or "RS512" or 3 more`

        Algorithm

        - `"RS256"`

        - `"RS384"`

        - `"RS512"`

        - `"PS256"`

        - `"PS384"`

        - `"PS512"`

      - `e: string`

        RSA exponent

      - `kid: string`

        Key ID

      - `kty: "RSA"`

        Key Type

        - `"RSA"`

      - `n: string`

        RSA modulus

    - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

      JSON representation of an ES256 key

      - `alg: "ES256"`

        Algorithm

        - `"ES256"`

      - `crv: "P-256"`

        Curve

        - `"P-256"`

      - `kid: string`

        Key ID

      - `kty: "EC"`

        Key Type

        - `"EC"`

      - `x: string`

        X EC coordinate

      - `y: string`

        Y EC coordinate

    - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

      JSON representation of an ES384 key

      - `alg: "ES384"`

        Algorithm

        - `"ES384"`

      - `crv: "P-384"`

        Curve

        - `"P-384"`

      - `kid: string`

        Key ID

      - `kty: "EC"`

        Key Type

        - `"EC"`

      - `x: string`

        X EC coordinate

      - `y: string`

        Y EC coordinate

- `description: string`

- `title: string`

- `token_sources: array of string`

- `token_type: "JWT"`

  - `"JWT"`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: TokenConfig`

  - `id: string`

    UUID.

  - `created_at: string`

  - `credentials: object { keys }`

    - `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

      - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

        JSON representation of an RSA key.

        - `alg: "RS256" or "RS384" or "RS512" or 3 more`

          Algorithm

          - `"RS256"`

          - `"RS384"`

          - `"RS512"`

          - `"PS256"`

          - `"PS384"`

          - `"PS512"`

        - `e: string`

          RSA exponent

        - `kid: string`

          Key ID

        - `kty: "RSA"`

          Key Type

          - `"RSA"`

        - `n: string`

          RSA modulus

      - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

        JSON representation of an ES256 key

        - `alg: "ES256"`

          Algorithm

          - `"ES256"`

        - `crv: "P-256"`

          Curve

          - `"P-256"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

      - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

        JSON representation of an ES384 key

        - `alg: "ES384"`

          Algorithm

          - `"ES384"`

        - `crv: "P-384"`

          Curve

          - `"P-384"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

  - `description: string`

  - `last_updated: string`

  - `title: string`

  - `token_sources: array of string`

  - `token_type: "JWT"`

    - `"JWT"`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "credentials": {
            "keys": [
              {
                "alg": "ES256",
                "crv": "P-256",
                "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
                "kty": "EC",
                "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
                "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
              }
            ]
          },
          "description": "Long description for Token Validation Configuration",
          "title": "Example Token Validation Configuration",
          "token_sources": [
            "http.request.headers[\\"x-auth\\"][0]",
            "http.request.cookies[\\"Authorization\\"][0]"
          ],
          "token_type": "JWT"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "credentials": {
      "keys": [
        {
          "alg": "ES256",
          "crv": "P-256",
          "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
          "kty": "EC",
          "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
          "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
        }
      ]
    },
    "description": "Long description for Token Validation Configuration",
    "last_updated": "2014-01-01T05:20:00.12345Z",
    "title": "Example Token Validation Configuration",
    "token_sources": [
      "http.request.headers[\"x-auth\"][0]",
      "http.request.cookies[\"Authorization\"][0]"
    ],
    "token_type": "JWT"
  },
  "success": true
}
```

## Edit an existing Token Configuration

**patch** `/zones/{zone_id}/token_validation/config/{config_id}`

Edit fields of an existing Token Configuration

### Path Parameters

- `zone_id: string`

  Identifier.

- `config_id: string`

  UUID.

### Body Parameters

- `description: optional string`

- `title: optional string`

- `token_sources: optional array of string`

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { id, description, title, token_sources }`

  - `id: optional string`

    UUID.

  - `description: optional string`

  - `title: optional string`

  - `token_sources: optional array of string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config/$CONFIG_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "description": "Long description for Token Validation Configuration",
          "title": "Example Token Validation Configuration",
          "token_sources": [
            "http.request.headers[\\"x-auth\\"][0]",
            "http.request.cookies[\\"Authorization\\"][0]"
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "description": "Long description for Token Validation Configuration",
    "title": "Example Token Validation Configuration",
    "token_sources": [
      "http.request.headers[\"x-auth\"][0]",
      "http.request.cookies[\"Authorization\"][0]"
    ]
  },
  "success": true
}
```

## Delete Token Configuration

**delete** `/zones/{zone_id}/token_validation/config/{config_id}`

Delete Token Configuration

### Path Parameters

- `zone_id: string`

  Identifier.

- `config_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: object { id }`

  - `id: optional string`

    UUID.

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config/$CONFIG_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
  },
  "success": true
}
```

## Domain Types

### Token Config

- `TokenConfig object { id, created_at, credentials, 5 more }`

  - `id: string`

    UUID.

  - `created_at: string`

  - `credentials: object { keys }`

    - `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

      - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

        JSON representation of an RSA key.

        - `alg: "RS256" or "RS384" or "RS512" or 3 more`

          Algorithm

          - `"RS256"`

          - `"RS384"`

          - `"RS512"`

          - `"PS256"`

          - `"PS384"`

          - `"PS512"`

        - `e: string`

          RSA exponent

        - `kid: string`

          Key ID

        - `kty: "RSA"`

          Key Type

          - `"RSA"`

        - `n: string`

          RSA modulus

      - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

        JSON representation of an ES256 key

        - `alg: "ES256"`

          Algorithm

          - `"ES256"`

        - `crv: "P-256"`

          Curve

          - `"P-256"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

      - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

        JSON representation of an ES384 key

        - `alg: "ES384"`

          Algorithm

          - `"ES384"`

        - `crv: "P-384"`

          Curve

          - `"P-384"`

        - `kid: string`

          Key ID

        - `kty: "EC"`

          Key Type

          - `"EC"`

        - `x: string`

          X EC coordinate

        - `y: string`

          Y EC coordinate

  - `description: string`

  - `last_updated: string`

  - `title: string`

  - `token_sources: array of string`

  - `token_type: "JWT"`

    - `"JWT"`

### Configuration Edit Response

- `ConfigurationEditResponse object { id, description, title, token_sources }`

  - `id: optional string`

    UUID.

  - `description: optional string`

  - `title: optional string`

  - `token_sources: optional array of string`

### Configuration Delete Response

- `ConfigurationDeleteResponse object { id }`

  - `id: optional string`

    UUID.

# Credentials

## Update Token Configuration credentials

**put** `/zones/{zone_id}/token_validation/config/{config_id}/credentials`

Update Token Configuration credentials

### Path Parameters

- `zone_id: string`

  Identifier.

- `config_id: string`

  UUID.

### Body Parameters

- `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

  - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

    JSON representation of an RSA key.

    - `alg: "RS256" or "RS384" or "RS512" or 3 more`

      Algorithm

      - `"RS256"`

      - `"RS384"`

      - `"RS512"`

      - `"PS256"`

      - `"PS384"`

      - `"PS512"`

    - `e: string`

      RSA exponent

    - `kid: string`

      Key ID

    - `kty: "RSA"`

      Key Type

      - `"RSA"`

    - `n: string`

      RSA modulus

  - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

    JSON representation of an ES256 key

    - `alg: "ES256"`

      Algorithm

      - `"ES256"`

    - `crv: "P-256"`

      Curve

      - `"P-256"`

    - `kid: string`

      Key ID

    - `kty: "EC"`

      Key Type

      - `"EC"`

    - `x: string`

      X EC coordinate

    - `y: string`

      Y EC coordinate

  - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

    JSON representation of an ES384 key

    - `alg: "ES384"`

      Algorithm

      - `"ES384"`

    - `crv: "P-384"`

      Curve

      - `"P-384"`

    - `kid: string`

      Key ID

    - `kty: "EC"`

      Key Type

      - `"EC"`

    - `x: string`

      X EC coordinate

    - `y: string`

      Y EC coordinate

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

  - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

    JSON representation of an RSA key.

    - `alg: "RS256" or "RS384" or "RS512" or 3 more`

      Algorithm

      - `"RS256"`

      - `"RS384"`

      - `"RS512"`

      - `"PS256"`

      - `"PS384"`

      - `"PS512"`

    - `e: string`

      RSA exponent

    - `kid: string`

      Key ID

    - `kty: "RSA"`

      Key Type

      - `"RSA"`

    - `n: string`

      RSA modulus

  - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

    JSON representation of an ES256 key

    - `alg: "ES256"`

      Algorithm

      - `"ES256"`

    - `crv: "P-256"`

      Curve

      - `"P-256"`

    - `kid: string`

      Key ID

    - `kty: "EC"`

      Key Type

      - `"EC"`

    - `x: string`

      X EC coordinate

    - `y: string`

      Y EC coordinate

  - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

    JSON representation of an ES384 key

    - `alg: "ES384"`

      Algorithm

      - `"ES384"`

    - `crv: "P-384"`

      Curve

      - `"P-384"`

    - `kid: string`

      Key ID

    - `kty: "EC"`

      Key Type

      - `"EC"`

    - `x: string`

      X EC coordinate

    - `y: string`

      Y EC coordinate

- `messages: Message`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/config/$CONFIG_ID/credentials \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "keys": [
            {
              "alg": "ES256",
              "crv": "P-256",
              "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
              "kty": "EC",
              "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
              "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
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
  "keys": [
    {
      "alg": "ES256",
      "crv": "P-256",
      "kid": "38013f13-c266-4eec-a72a-92ec92779f21",
      "kty": "EC",
      "x": "KN53JRwN3wCjm2o39bvZUX2VdrsHzS8pxOAGjm8m7EQ",
      "y": "lnkkzIxaveggz-HFhcMWW15nxvOj0Z_uQsXbpK0GFcY"
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
  "success": true
}
```

## Domain Types

### Credential Update Response

- `CredentialUpdateResponse object { errors, keys, messages, success }`

  - `errors: Message`

    - `code: number`

    - `message: string`

    - `documentation_url: optional string`

    - `source: optional object { pointer }`

      - `pointer: optional string`

  - `keys: array of object { alg, e, kid, 2 more }  or object { alg, crv, kid, 3 more }  or object { alg, crv, kid, 3 more }`

    - `APIShieldCredentialsJWTKeyRSA object { alg, e, kid, 2 more }`

      JSON representation of an RSA key.

      - `alg: "RS256" or "RS384" or "RS512" or 3 more`

        Algorithm

        - `"RS256"`

        - `"RS384"`

        - `"RS512"`

        - `"PS256"`

        - `"PS384"`

        - `"PS512"`

      - `e: string`

        RSA exponent

      - `kid: string`

        Key ID

      - `kty: "RSA"`

        Key Type

        - `"RSA"`

      - `n: string`

        RSA modulus

    - `APIShieldCredentialsJWTKeyEcEs256 object { alg, crv, kid, 3 more }`

      JSON representation of an ES256 key

      - `alg: "ES256"`

        Algorithm

        - `"ES256"`

      - `crv: "P-256"`

        Curve

        - `"P-256"`

      - `kid: string`

        Key ID

      - `kty: "EC"`

        Key Type

        - `"EC"`

      - `x: string`

        X EC coordinate

      - `y: string`

        Y EC coordinate

    - `APIShieldCredentialsJWTKeyEcEs384 object { alg, crv, kid, 3 more }`

      JSON representation of an ES384 key

      - `alg: "ES384"`

        Algorithm

        - `"ES384"`

      - `crv: "P-384"`

        Curve

        - `"P-384"`

      - `kid: string`

        Key ID

      - `kty: "EC"`

        Key Type

        - `"EC"`

      - `x: string`

        X EC coordinate

      - `y: string`

        Y EC coordinate

  - `messages: Message`

  - `success: true`

    Whether the API call was successful.

    - `true`

# Rules

## List token validation rules

**get** `/zones/{zone_id}/token_validation/rules`

List token validation rules

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `id: optional string`

  Select rules with these IDs.

- `action: optional "log" or "block"`

  Action to take on requests that match operations included in `selector` and fail `expression`.

  - `"log"`

  - `"block"`

- `enabled: optional boolean`

  Toggle rule on or off.

- `host: optional string`

  Select rules with this host in `include`.

- `hostname: optional string`

  Select rules with this host in `include`.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

- `rule_id: optional string`

  Select rules with these IDs.

- `token_configuration: optional array of string`

  Select rules using any of these token configurations.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of TokenValidationRule`

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules \
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
      "action": "log",
      "description": "Long description for Token Validation Rule",
      "enabled": true,
      "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
      "selector": {
        "exclude": [
          {
            "operation_ids": [
              "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
              "56828eae-035a-4396-ba07-51c66d680a04"
            ]
          }
        ],
        "include": [
          {
            "host": [
              "v1.example.com",
              "v2.example.com"
            ]
          }
        ]
      },
      "title": "Example Token Validation Rule",
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "last_updated": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Create a token validation rule

**post** `/zones/{zone_id}/token_validation/rules`

Create a token validation rule.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `action: "log" or "block"`

  Action to take on requests that match operations included in `selector` and fail `expression`.

  - `"log"`

  - `"block"`

- `description: string`

  A human-readable description that gives more details than `title`.

- `enabled: boolean`

  Toggle rule on or off.

- `expression: string`

  Rule expression. Requests that fail to match this expression will be subject to `action`.

  For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

- `selector: object { exclude, include }`

  Select operations covered by this rule.

  For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `exclude: optional array of object { operation_ids }`

    Ignore operations that were otherwise included by `include`.

    - `operation_ids: optional array of string`

      Excluded operation IDs.

  - `include: optional array of object { host }`

    Select all matching operations.

    - `host: optional array of string`

      Included hostnames.

- `title: string`

  A human-readable name for the rule.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: TokenValidationRule`

  A Token Validation rule that can enforce security policies using JWT Tokens.

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "log",
          "description": "Long description for Token Validation Rule",
          "enabled": true,
          "expression": "is_jwt_valid(\\"52973293-cb04-4a97-8f55-e7d2ad1107dd\\") or is_jwt_valid(\\"46eab8d1-6376-45e3-968f-2c649d77d423\\")",
          "selector": {},
          "title": "Example Token Validation Rule"
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
    "action": "log",
    "description": "Long description for Token Validation Rule",
    "enabled": true,
    "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
    "selector": {
      "exclude": [
        {
          "operation_ids": [
            "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
            "56828eae-035a-4396-ba07-51c66d680a04"
          ]
        }
      ],
      "include": [
        {
          "host": [
            "v1.example.com",
            "v2.example.com"
          ]
        }
      ]
    },
    "title": "Example Token Validation Rule",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_updated": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Bulk create token validation rules

**post** `/zones/{zone_id}/token_validation/rules/bulk`

Create zone token validation rules.

A request can create multiple Token Validation Rules.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { action, description, enabled, 3 more }`

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of TokenValidationRule`

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules/bulk \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "action": "log",
            "description": "Long description for Token Validation Rule",
            "enabled": true,
            "expression": "is_jwt_valid(\\"52973293-cb04-4a97-8f55-e7d2ad1107dd\\") or is_jwt_valid(\\"46eab8d1-6376-45e3-968f-2c649d77d423\\")",
            "selector": {
              "exclude": [
                {
                  "operation_ids": [
                    "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
                    "56828eae-035a-4396-ba07-51c66d680a04"
                  ]
                }
              ],
              "include": [
                {
                  "host": [
                    "v1.example.com",
                    "v2.example.com"
                  ]
                }
              ]
            },
            "title": "Example Token Validation Rule"
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
      "action": "log",
      "description": "Long description for Token Validation Rule",
      "enabled": true,
      "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
      "selector": {
        "exclude": [
          {
            "operation_ids": [
              "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
              "56828eae-035a-4396-ba07-51c66d680a04"
            ]
          }
        ],
        "include": [
          {
            "host": [
              "v1.example.com",
              "v2.example.com"
            ]
          }
        ]
      },
      "title": "Example Token Validation Rule",
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "last_updated": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Bulk edit token validation rules

**patch** `/zones/{zone_id}/token_validation/rules/bulk`

Edit token validation rules.

A request can update multiple Token Validation Rules.

Rules can be re-ordered using the `position` field.

Returns all updated rules.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `body: array of object { id, action, description, 5 more }`

  - `id: string`

    Rule ID this patch applies to

  - `action: optional "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: optional string`

    A human-readable description that gives more details than `title`.

  - `enabled: optional boolean`

    Toggle rule on or off.

  - `expression: optional string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `position: optional object { index }  or object { before }  or object { after }`

    Update rule order among zone rules.

    - `APIShieldIndex object { index }`

      - `index: number`

        Move rule to this position

    - `APIShieldBefore object { before }`

      Move rule to after rule with ID.

      - `before: optional string`

        Move rule to before rule with this ID.

    - `APIShieldAfter object { after }`

      Move rule to before rule with ID.

      - `after: optional string`

        Move rule to after rule with this ID.

  - `selector: optional object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: optional string`

    A human-readable name for the rule.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: array of TokenValidationRule`

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules/bulk \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "id": "0d9bf70c-92e1-4bb3-9411-34a3bcc59003",
            "action": "log",
            "description": "Long description for Token Validation Rule",
            "enabled": true,
            "expression": "is_jwt_valid(\\"52973293-cb04-4a97-8f55-e7d2ad1107dd\\") or is_jwt_valid(\\"46eab8d1-6376-45e3-968f-2c649d77d423\\")",
            "position": {
              "index": 2
            },
            "selector": {
              "exclude": [
                {
                  "operation_ids": [
                    "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
                    "56828eae-035a-4396-ba07-51c66d680a04"
                  ]
                }
              ],
              "include": [
                {
                  "host": [
                    "v1.example.com",
                    "v2.example.com"
                  ]
                }
              ]
            },
            "title": "Example Token Validation Rule"
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
      "action": "log",
      "description": "Long description for Token Validation Rule",
      "enabled": true,
      "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
      "selector": {
        "exclude": [
          {
            "operation_ids": [
              "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
              "56828eae-035a-4396-ba07-51c66d680a04"
            ]
          }
        ],
        "include": [
          {
            "host": [
              "v1.example.com",
              "v2.example.com"
            ]
          }
        ]
      },
      "title": "Example Token Validation Rule",
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "last_updated": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```

## Get a zone token validation rule

**get** `/zones/{zone_id}/token_validation/rules/{rule_id}`

Get a zone token validation rule.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: TokenValidationRule`

  A Token Validation rule that can enforce security policies using JWT Tokens.

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules/$RULE_ID \
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
    "action": "log",
    "description": "Long description for Token Validation Rule",
    "enabled": true,
    "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
    "selector": {
      "exclude": [
        {
          "operation_ids": [
            "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
            "56828eae-035a-4396-ba07-51c66d680a04"
          ]
        }
      ],
      "include": [
        {
          "host": [
            "v1.example.com",
            "v2.example.com"
          ]
        }
      ]
    },
    "title": "Example Token Validation Rule",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_updated": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Delete a zone token validation rule

**delete** `/zones/{zone_id}/token_validation/rules/{rule_id}`

Delete a zone token validation rule.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_id: string`

  UUID.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `success: true`

  Whether the API call was successful.

  - `true`

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules/$RULE_ID \
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
  "result": {}
}
```

## Edit a zone token validation rule

**patch** `/zones/{zone_id}/token_validation/rules/{rule_id}`

Edit a zone token validation rule.

### Path Parameters

- `zone_id: string`

  Identifier.

- `rule_id: string`

  UUID.

### Body Parameters

- `action: optional "log" or "block"`

  Action to take on requests that match operations included in `selector` and fail `expression`.

  - `"log"`

  - `"block"`

- `description: optional string`

  A human-readable description that gives more details than `title`.

- `enabled: optional boolean`

  Toggle rule on or off.

- `expression: optional string`

  Rule expression. Requests that fail to match this expression will be subject to `action`.

  For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

- `position: optional object { index }  or object { before }  or object { after }`

  Update rule order among zone rules.

  - `APIShieldIndex object { index }`

    - `index: number`

      Move rule to this position

  - `APIShieldBefore object { before }`

    Move rule to after rule with ID.

    - `before: optional string`

      Move rule to before rule with this ID.

  - `APIShieldAfter object { after }`

    Move rule to before rule with ID.

    - `after: optional string`

      Move rule to after rule with this ID.

- `selector: optional object { exclude, include }`

  Select operations covered by this rule.

  For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `exclude: optional array of object { operation_ids }`

    Ignore operations that were otherwise included by `include`.

    - `operation_ids: optional array of string`

      Excluded operation IDs.

  - `include: optional array of object { host }`

    Select all matching operations.

    - `host: optional array of string`

      Included hostnames.

- `title: optional string`

  A human-readable name for the rule.

### Returns

- `errors: Message`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: Message`

- `result: TokenValidationRule`

  A Token Validation rule that can enforce security policies using JWT Tokens.

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/token_validation/rules/$RULE_ID \
    -X PATCH \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "action": "log",
          "description": "Long description for Token Validation Rule",
          "enabled": true,
          "expression": "is_jwt_valid(\\"52973293-cb04-4a97-8f55-e7d2ad1107dd\\") or is_jwt_valid(\\"46eab8d1-6376-45e3-968f-2c649d77d423\\")",
          "title": "Example Token Validation Rule"
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
    "action": "log",
    "description": "Long description for Token Validation Rule",
    "enabled": true,
    "expression": "is_jwt_valid(\"52973293-cb04-4a97-8f55-e7d2ad1107dd\") or is_jwt_valid(\"46eab8d1-6376-45e3-968f-2c649d77d423\")",
    "selector": {
      "exclude": [
        {
          "operation_ids": [
            "f9c5615e-fe15-48ce-bec6-cfc1946f1bec",
            "56828eae-035a-4396-ba07-51c66d680a04"
          ]
        }
      ],
      "include": [
        {
          "host": [
            "v1.example.com",
            "v2.example.com"
          ]
        }
      ]
    },
    "title": "Example Token Validation Rule",
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "last_updated": "2014-01-01T05:20:00.12345Z"
  },
  "success": true
}
```

## Domain Types

### Token Validation Rule

- `TokenValidationRule object { action, description, enabled, 6 more }`

  A Token Validation rule that can enforce security policies using JWT Tokens.

  - `action: "log" or "block"`

    Action to take on requests that match operations included in `selector` and fail `expression`.

    - `"log"`

    - `"block"`

  - `description: string`

    A human-readable description that gives more details than `title`.

  - `enabled: boolean`

    Toggle rule on or off.

  - `expression: string`

    Rule expression. Requests that fail to match this expression will be subject to `action`.

    For details on expressions, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

  - `selector: object { exclude, include }`

    Select operations covered by this rule.

    For details on selectors, see the [Cloudflare Docs](https://developers.cloudflare.com/api-shield/security/jwt-validation/).

    - `exclude: optional array of object { operation_ids }`

      Ignore operations that were otherwise included by `include`.

      - `operation_ids: optional array of string`

        Excluded operation IDs.

    - `include: optional array of object { host }`

      Select all matching operations.

      - `host: optional array of string`

        Included hostnames.

  - `title: string`

    A human-readable name for the rule.

  - `id: optional string`

    UUID.

  - `created_at: optional string`

  - `last_updated: optional string`

### Rule Delete Response

- `RuleDeleteResponse = unknown`
