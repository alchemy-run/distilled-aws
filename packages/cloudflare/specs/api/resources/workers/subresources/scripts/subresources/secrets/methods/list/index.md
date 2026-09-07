## List script secrets

**get** `/accounts/{account_id}/workers/scripts/{script_name}/secrets`

List secrets bound to a script.

### Path Parameters

- `account_id: string`

  Identifier.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

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

- `result: optional array of object { name, text, type }  or object { algorithm, format, name, 4 more }`

  - `SecretText object { name, text, type }`

    - `name: string`

      A JavaScript variable name for the binding.

    - `text: string`

      The secret value to use.

    - `type: "secret_text"`

      The kind of resource that the binding provides.

      - `"secret_text"`

  - `SecretKey object { algorithm, format, name, 4 more }`

    - `algorithm: unknown`

      Algorithm-specific key parameters. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#algorithm).

    - `format: "raw" or "pkcs8" or "spki" or "jwk"`

      Data format of the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#format).

      - `"raw"`

      - `"pkcs8"`

      - `"spki"`

      - `"jwk"`

    - `name: string`

      A JavaScript variable name for the binding.

    - `type: "secret_key"`

      The kind of resource that the binding provides.

      - `"secret_key"`

    - `usages: array of "encrypt" or "decrypt" or "sign" or 5 more`

      Allowed operations with the key. [Learn more](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#keyUsages).

      - `"encrypt"`

      - `"decrypt"`

      - `"sign"`

      - `"verify"`

      - `"deriveKey"`

      - `"deriveBits"`

      - `"wrapKey"`

      - `"unwrapKey"`

    - `key_base64: optional string`

      Base64-encoded key data. Required if `format` is "raw", "pkcs8", or "spki".

    - `key_jwk: optional unknown`

      Key data in [JSON Web Key](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/importKey#json_web_key) format. Required if `format` is "jwk".

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$SCRIPT_NAME/secrets \
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
      "name": "myBinding",
      "type": "secret_text"
    }
  ]
}
```
