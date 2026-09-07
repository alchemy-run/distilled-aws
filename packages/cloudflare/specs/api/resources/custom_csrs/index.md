# Custom Csrs

## List Custom CSRs

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_csrs`

List all custom Certificate Signing Requests (CSRs) for an account or zone.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Query Parameters

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of custom CSRs per page.

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

- `result: optional array of object { id, created_at, key_type, 11 more }`

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `account_tag: optional string`

    Account identifier associated with this CSR.

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `description: optional string`

    Optional description for the CSR.

  - `locality: optional string`

    City or locality name.

  - `name: optional string`

    Human-readable name for the CSR.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit name.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

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
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_csrs \
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
      "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
      "created_at": "2024-01-15T10:30:00Z",
      "key_type": "rsa2048",
      "account_tag": "23e087bd19bc1d40ae95b6f297263ceb",
      "common_name": "example.com",
      "country": "US",
      "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICYzCCAUsCAQAwHj...",
      "description": "CSR for example.com wildcard",
      "locality": "San Francisco",
      "name": "My Custom CSR",
      "organization": "Cloudflare, Inc.",
      "organizational_unit": "Engineering",
      "sans": [
        "example.com",
        "www.example.com"
      ],
      "state": "California"
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

## Create Custom CSR

**post** `/{accounts_or_zones}/{account_or_zone_id}/custom_csrs`

Generate a new custom Certificate Signing Request (CSR) for an account or zone. Cloudflare generates and securely stores the private key associated with the CSR.

### Path Parameters

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

### Body Parameters

- `common_name: string`

  The common name (domain) for the CSR. Must be at most 64 characters.

- `country: string`

  Two-letter ISO 3166-1 alpha-2 country code.

- `locality: string`

  City or locality name.

- `organization: string`

  Organization name.

- `sans: array of string`

  Subject Alternative Names for the CSR. At least one SAN is required.

- `state: string`

  State or province name.

- `description: optional string`

  Optional description for the CSR.

- `key_type: optional "rsa2048" or "p256v1"`

  Key algorithm to use for the CSR. Defaults to rsa2048 if not specified.

  - `"rsa2048"`

  - `"p256v1"`

- `name: optional string`

  Human-readable name for the CSR.

- `organizational_unit: optional string`

  Organizational unit name.

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

- `result: optional object { id, created_at, key_type, 11 more }`

  A custom Certificate Signing Request (CSR).

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `account_tag: optional string`

    Account identifier associated with this CSR.

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `description: optional string`

    Optional description for the CSR.

  - `locality: optional string`

    City or locality name.

  - `name: optional string`

    Human-readable name for the CSR.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit name.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_csrs \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "common_name": "example.com",
          "country": "US",
          "locality": "San Francisco",
          "organization": "Cloudflare, Inc.",
          "sans": [
            "example.com",
            "www.example.com"
          ],
          "state": "California",
          "description": "CSR for example.com wildcard",
          "key_type": "rsa2048",
          "name": "My Custom CSR",
          "organizational_unit": "Engineering"
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
    "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "created_at": "2024-01-15T10:30:00Z",
    "key_type": "rsa2048",
    "account_tag": "23e087bd19bc1d40ae95b6f297263ceb",
    "common_name": "example.com",
    "country": "US",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICYzCCAUsCAQAwHj...",
    "description": "CSR for example.com wildcard",
    "locality": "San Francisco",
    "name": "My Custom CSR",
    "organization": "Cloudflare, Inc.",
    "organizational_unit": "Engineering",
    "sans": [
      "example.com",
      "www.example.com"
    ],
    "state": "California"
  }
}
```

## Custom CSR Details

**get** `/{accounts_or_zones}/{account_or_zone_id}/custom_csrs/{custom_csr_id}`

Retrieve details for a specific custom Certificate Signing Request (CSR).

### Path Parameters

- `custom_csr_id: string`

  Custom CSR identifier tag.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

- `result: optional object { id, created_at, key_type, 11 more }`

  A custom Certificate Signing Request (CSR).

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `account_tag: optional string`

    Account identifier associated with this CSR.

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `description: optional string`

    Optional description for the CSR.

  - `locality: optional string`

    City or locality name.

  - `name: optional string`

    Human-readable name for the CSR.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit name.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_csrs/$CUSTOM_CSR_ID \
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
    "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752",
    "created_at": "2024-01-15T10:30:00Z",
    "key_type": "rsa2048",
    "account_tag": "23e087bd19bc1d40ae95b6f297263ceb",
    "common_name": "example.com",
    "country": "US",
    "csr": "-----BEGIN CERTIFICATE REQUEST-----\nMIICYzCCAUsCAQAwHj...",
    "description": "CSR for example.com wildcard",
    "locality": "San Francisco",
    "name": "My Custom CSR",
    "organization": "Cloudflare, Inc.",
    "organizational_unit": "Engineering",
    "sans": [
      "example.com",
      "www.example.com"
    ],
    "state": "California"
  }
}
```

## Delete Custom CSR

**delete** `/{accounts_or_zones}/{account_or_zone_id}/custom_csrs/{custom_csr_id}`

Delete a custom Certificate Signing Request (CSR) and its associated private key.

### Path Parameters

- `custom_csr_id: string`

  Custom CSR identifier tag.

- `account_id: optional string`

  The Account ID to use for this endpoint. Mutually exclusive with the Zone ID.

- `zone_id: optional string`

  The Zone ID to use for this endpoint. Mutually exclusive with the Account ID.

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

  - `id: optional string`

    Custom CSR identifier tag.

### Example

```http
curl https://api.cloudflare.com/client/v4/$ACCOUNTS_OR_ZONES/$ACCOUNT_OR_ZONE_ID/custom_csrs/$CUSTOM_CSR_ID \
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
    "id": "7b163417-1d2b-4c84-a38a-2fb7a0cd7752"
  }
}
```

## Domain Types

### Custom Csr

- `CustomCsr object { id, created_at, key_type, 8 more }`

  A custom Certificate Signing Request (CSR).

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `locality: optional string`

    City or locality name.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit for the CSR subject.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

### Custom Csr List Response

- `CustomCsrListResponse object { id, created_at, key_type, 11 more }`

  A custom Certificate Signing Request (CSR).

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `account_tag: optional string`

    Account identifier associated with this CSR.

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `description: optional string`

    Optional description for the CSR.

  - `locality: optional string`

    City or locality name.

  - `name: optional string`

    Human-readable name for the CSR.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit name.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

### Custom Csr Create Response

- `CustomCsrCreateResponse object { id, created_at, key_type, 11 more }`

  A custom Certificate Signing Request (CSR).

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `account_tag: optional string`

    Account identifier associated with this CSR.

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `description: optional string`

    Optional description for the CSR.

  - `locality: optional string`

    City or locality name.

  - `name: optional string`

    Human-readable name for the CSR.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit name.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

### Custom Csr Get Response

- `CustomCsrGetResponse object { id, created_at, key_type, 11 more }`

  A custom Certificate Signing Request (CSR).

  - `id: string`

    Custom CSR identifier tag.

  - `created_at: string`

    When the CSR was created.

  - `key_type: "rsa2048" or "p256v1"`

    The key algorithm used to generate the CSR.

    - `"rsa2048"`

    - `"p256v1"`

  - `account_tag: optional string`

    Account identifier associated with this CSR.

  - `common_name: optional string`

    The common name (domain) for the CSR.

  - `country: optional string`

    Two-letter ISO 3166-1 alpha-2 country code.

  - `csr: optional string`

    The PEM-encoded Certificate Signing Request.

  - `description: optional string`

    Optional description for the CSR.

  - `locality: optional string`

    City or locality name.

  - `name: optional string`

    Human-readable name for the CSR.

  - `organization: optional string`

    Organization name.

  - `organizational_unit: optional string`

    Organizational unit name.

  - `sans: optional array of string`

    Subject Alternative Names included in the CSR.

  - `state: optional string`

    State or province name.

### Custom Csr Delete Response

- `CustomCsrDeleteResponse object { id }`

  - `id: optional string`

    Custom CSR identifier tag.
