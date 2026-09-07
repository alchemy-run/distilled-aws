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
