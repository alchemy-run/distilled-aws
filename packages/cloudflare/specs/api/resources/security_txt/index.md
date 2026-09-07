# Security TXT

## Retrieves security.txt

**get** `/zones/{zone_id}/security-center/securitytxt`

Retrieves the current security.txt file configuration for a zone, used for security vulnerability reporting.

### Path Parameters

- `zone_id: string`

  Identifier.

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

- `result: optional object { acknowledgments, canonical, contact, 6 more }`

  - `acknowledgments: optional array of string`

  - `canonical: optional array of string`

  - `contact: optional array of string`

  - `enabled: optional boolean`

  - `encryption: optional array of string`

  - `expires: optional string`

  - `hiring: optional array of string`

  - `policy: optional array of string`

  - `preferred_languages: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/security-center/securitytxt \
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
    "acknowledgments": [
      "https://example.com/hall-of-fame.html"
    ],
    "canonical": [
      "https://www.example.com/.well-known/security.txt"
    ],
    "contact": [
      "mailto:security@example.com",
      "tel:+1-201-555-0123",
      "https://example.com/security-contact.html"
    ],
    "enabled": true,
    "encryption": [
      "https://example.com/pgp-key.txt",
      "dns:5d2d37ab76d47d36._openpgpkey.example.com?type=OPENPGPKEY",
      "openpgp4fpr:5f2de5521c63a801ab59ccb603d49de44b29100f"
    ],
    "expires": "2019-12-27T18:11:19.117Z",
    "hiring": [
      "https://example.com/jobs.html"
    ],
    "policy": [
      "https://example.com/disclosure-policy.html"
    ],
    "preferred_languages": "en, es, fr"
  }
}
```

## Updates security.txt

**put** `/zones/{zone_id}/security-center/securitytxt`

Updates the security.txt file configuration for a zone, which provides security researchers with vulnerability reporting information.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `acknowledgments: optional array of string`

- `canonical: optional array of string`

- `contact: optional array of string`

- `enabled: optional boolean`

- `encryption: optional array of string`

- `expires: optional string`

- `hiring: optional array of string`

- `policy: optional array of string`

- `preferred_languages: optional string`

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/security-center/securitytxt \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "acknowledgments": [
            "https://example.com/hall-of-fame.html"
          ],
          "canonical": [
            "https://www.example.com/.well-known/security.txt"
          ],
          "contact": [
            "mailto:security@example.com",
            "tel:+1-201-555-0123",
            "https://example.com/security-contact.html"
          ],
          "enabled": true,
          "encryption": [
            "https://example.com/pgp-key.txt",
            "dns:5d2d37ab76d47d36._openpgpkey.example.com?type=OPENPGPKEY",
            "openpgp4fpr:5f2de5521c63a801ab59ccb603d49de44b29100f"
          ],
          "hiring": [
            "https://example.com/jobs.html"
          ],
          "policy": [
            "https://example.com/disclosure-policy.html"
          ],
          "preferred_languages": "en, es, fr"
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
  "success": true
}
```

## Deletes security.txt

**delete** `/zones/{zone_id}/security-center/securitytxt`

Removes the security.txt file configuration for a zone. The /.well-known/security.txt endpoint will no longer be served.

### Path Parameters

- `zone_id: string`

  Identifier.

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

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/security-center/securitytxt \
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
  "success": true
}
```

## Domain Types

### Security TXT Get Response

- `SecurityTXTGetResponse object { acknowledgments, canonical, contact, 6 more }`

  - `acknowledgments: optional array of string`

  - `canonical: optional array of string`

  - `contact: optional array of string`

  - `enabled: optional boolean`

  - `encryption: optional array of string`

  - `expires: optional string`

  - `hiring: optional array of string`

  - `policy: optional array of string`

  - `preferred_languages: optional string`

### Security TXT Update Response

- `SecurityTXTUpdateResponse object { errors, messages, success }`

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

### Security TXT Delete Response

- `SecurityTXTDeleteResponse object { errors, messages, success }`

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
