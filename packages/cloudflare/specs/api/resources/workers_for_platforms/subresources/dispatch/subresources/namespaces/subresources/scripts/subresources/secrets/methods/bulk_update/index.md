## Patch multiple script secrets

**patch** `/accounts/{account_id}/workers/dispatch/namespaces/{dispatch_namespace}/scripts/{script_name}/secrets-bulk`

Create, update, or delete multiple secrets on a script in a single operation using JSON Merge Patch (RFC 7396).

Usage:

- To create or update a secret, set its value to a secret object.
- To delete a secret, set its value to `null`.
- Secrets not included in the request are left unchanged.

### Path Parameters

- `account_id: string`

  Identifier.

- `dispatch_namespace: string`

  Name of the Workers for Platforms dispatch namespace.

- `script_name: string`

  Name of the script, used in URLs and route configuration.

### Body Parameters

- `secrets: optional map[object { name, text, type }  or object { algorithm, format, name, 4 more } ]`

  Map of secret names to secret values:

  - Set to a secret object to create or update.
  - Set to `null` to delete.
  - Omit to leave unchanged.

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

- `version_tags: optional map[unknown]`

  Optional version tags to apply to the new script version.

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

- `result: map[object { name, text, type }  or object { algorithm, format, name, 4 more } ]`

  Map of secret names to secret metadata for resulting secrets.

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

- `success: true`

  Whether the API call was successful.

  - `true`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME/secrets-bulk \
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
    "foo": {
      "name": "myBinding",
      "type": "secret_text"
    }
  },
  "success": true
}
```
