# Account Mapping

## Get mapping

**get** `/accounts/{account_id}/dlp/email/account_mapping`

Retrieves the email provider mapping configuration for DLP email scanning.

### Path Parameters

- `account_id: string`

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

- `result: optional object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/account_mapping \
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
    "addin_identifier_token": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "auth_requirements": {
      "allowed_microsoft_organizations": [
        "string"
      ],
      "type": "Org"
    }
  }
}
```

## Create mapping

**post** `/accounts/{account_id}/dlp/email/account_mapping`

Creates a mapping between a Cloudflare account and an email provider for DLP email scanning integration.

### Path Parameters

- `account_id: string`

### Body Parameters

- `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

  - `object { allowed_microsoft_organizations, type }`

    - `allowed_microsoft_organizations: array of string`

    - `type: "Org"`

      - `"Org"`

  - `Type object { type }`

    - `type: "NoAuth"`

      - `"NoAuth"`

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

- `result: optional object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dlp/email/account_mapping \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "auth_requirements": {
            "allowed_microsoft_organizations": [
              "string"
            ],
            "type": "Org"
          }
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
    "addin_identifier_token": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "auth_requirements": {
      "allowed_microsoft_organizations": [
        "string"
      ],
      "type": "Org"
    }
  }
}
```

## Domain Types

### Account Mapping Get Response

- `AccountMappingGetResponse object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`

### Account Mapping Create Response

- `AccountMappingCreateResponse object { addin_identifier_token, auth_requirements }`

  - `addin_identifier_token: string`

  - `auth_requirements: object { allowed_microsoft_organizations, type }  or object { type }`

    - `object { allowed_microsoft_organizations, type }`

      - `allowed_microsoft_organizations: array of string`

      - `type: "Org"`

        - `"Org"`

    - `Type object { type }`

      - `type: "NoAuth"`

        - `"NoAuth"`
