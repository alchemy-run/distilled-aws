# Integrations

## List all risk score integrations for the account.

**get** `/accounts/{account_id}/zt_risk_scoring/integrations`

Lists all configured Zero Trust risk score integrations for the account.

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

- `result: optional array of object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/integrations \
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
      "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
      "account_tag": "account_tag",
      "active": true,
      "created_at": "2019-12-27T18:11:19.117Z",
      "integration_type": "Okta",
      "reference_id": "reference_id",
      "tenant_url": "tenant_url",
      "well_known_url": "well_known_url"
    }
  ]
}
```

## Get risk score integration by id.

**get** `/accounts/{account_id}/zt_risk_scoring/integrations/{integration_id}`

Get risk score integration by id.

### Path Parameters

- `account_id: string`

- `integration_id: string`

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

- `result: optional object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/integrations/$INTEGRATION_ID \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "account_tag": "account_tag",
    "active": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "integration_type": "Okta",
    "reference_id": "reference_id",
    "tenant_url": "tenant_url",
    "well_known_url": "well_known_url"
  }
}
```

## Create new risk score integration.

**post** `/accounts/{account_id}/zt_risk_scoring/integrations`

Creates a new Zero Trust risk score integration, connecting external risk signals to Cloudflare's risk scoring system.

### Path Parameters

- `account_id: string`

### Body Parameters

- `integration_type: "Okta"`

  - `"Okta"`

- `tenant_url: string`

  The base url of the tenant, e.g. "https://tenant.okta.com".

- `reference_id: optional string`

  A reference id that can be supplied by the client. Currently this should be set to the Access-Okta IDP ID (a UUIDv4).
  https://developers.cloudflare.com/api/operations/access-identity-providers-get-an-access-identity-provider

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

- `result: optional object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/integrations \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "integration_type": "Okta",
          "tenant_url": "https://example.com"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "account_tag": "account_tag",
    "active": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "integration_type": "Okta",
    "reference_id": "reference_id",
    "tenant_url": "tenant_url",
    "well_known_url": "well_known_url"
  }
}
```

## Update a risk score integration.

**put** `/accounts/{account_id}/zt_risk_scoring/integrations/{integration_id}`

Overwrite the reference_id, tenant_url, and active values with the ones provided.

### Path Parameters

- `account_id: string`

- `integration_id: string`

### Body Parameters

- `active: boolean`

  Whether this integration is enabled. If disabled, no risk changes will be exported to the third-party.

- `tenant_url: string`

  The base url of the tenant, e.g. "https://tenant.okta.com".

- `reference_id: optional string`

  A reference id that can be supplied by the client. Currently this should be set to the Access-Okta IDP ID (a UUIDv4).
  https://developers.cloudflare.com/api/operations/access-identity-providers-get-an-access-identity-provider

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

- `result: optional object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/integrations/$INTEGRATION_ID \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "active": true,
          "tenant_url": "https://example.com"
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "account_tag": "account_tag",
    "active": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "integration_type": "Okta",
    "reference_id": "reference_id",
    "tenant_url": "tenant_url",
    "well_known_url": "well_known_url"
  }
}
```

## Delete a risk score integration.

**delete** `/accounts/{account_id}/zt_risk_scoring/integrations/{integration_id}`

Removes a Zero Trust risk score integration, disconnecting the external risk signal source.

### Path Parameters

- `account_id: string`

- `integration_id: string`

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

- `result: optional unknown`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/integrations/$INTEGRATION_ID \
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

## Domain Types

### Integration List Response

- `IntegrationListResponse object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Integration Get Response

- `IntegrationGetResponse object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Integration Create Response

- `IntegrationCreateResponse object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Integration Update Response

- `IntegrationUpdateResponse object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Integration Delete Response

- `IntegrationDeleteResponse = unknown`

# References

## Get risk score integration by reference id.

**get** `/accounts/{account_id}/zt_risk_scoring/integrations/reference_id/{reference_id}`

Retrieves a Zero Trust risk score integration using its external reference ID.

### Path Parameters

- `account_id: string`

- `reference_id: string`

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

- `result: optional object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/zt_risk_scoring/integrations/reference_id/$REFERENCE_ID \
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
    "id": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "account_tag": "account_tag",
    "active": true,
    "created_at": "2019-12-27T18:11:19.117Z",
    "integration_type": "Okta",
    "reference_id": "reference_id",
    "tenant_url": "tenant_url",
    "well_known_url": "well_known_url"
  }
}
```

## Domain Types

### Reference Get Response

- `ReferenceGetResponse object { id, account_tag, active, 5 more }`

  - `id: string`

    The id of the integration, a UUIDv4.

  - `account_tag: string`

    The Cloudflare account tag.

  - `active: boolean`

    Whether this integration is enabled and should export changes in risk score.

  - `created_at: string`

    When the integration was created in RFC3339 format.

  - `integration_type: "Okta"`

    - `"Okta"`

  - `reference_id: string`

    A reference ID defined by the client.
    Should be set to the Access-Okta IDP integration ID.
    Useful when the risk-score integration needs to be associated with a secondary asset and recalled using that ID.

  - `tenant_url: string`

    The base URL for the tenant. E.g. "https://tenant.okta.com".

  - `well_known_url: string`

    The URL for the Shared Signals Framework configuration, e.g. "/.well-known/sse-configuration/{integration_uuid}/". https://openid.net/specs/openid-sse-framework-1_0.html#rfc.section.6.2.1.
