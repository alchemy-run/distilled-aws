# Custom Trust Store

## List Custom Origin Trust Store Details

**get** `/zones/{zone_id}/acm/custom_trust_store`

Get Custom Origin Trust Store for a Zone.

### Path Parameters

- `zone_id: string`

  Identifier.

### Query Parameters

- `limit: optional number`

  Limit to the number of records returned.

- `offset: optional number`

  Offset the results.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Number of records per page.

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

- `result: optional array of CustomTrustStore`

  - `id: string`

    Identifier.

  - `certificate: string`

    The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

  - `expires_on: string`

    When the certificate expires.

  - `issuer: string`

    The certificate authority that issued the certificate.

  - `signature: string`

    The type of hash used for the certificate.

  - `status: "initializing" or "pending_deployment" or "active" or 3 more`

    Status of the zone's custom SSL.

    - `"initializing"`

    - `"pending_deployment"`

    - `"active"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"expired"`

  - `updated_at: string`

    When the certificate was last modified.

  - `uploaded_on: string`

    When the certificate was uploaded to Cloudflare.

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
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/custom_trust_store \
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
      "id": "023e105f4ecef8ad9ca31a8372d0c353",
      "certificate": "-----BEGIN CERTIFICATE-----\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\n-----END CERTIFICATE-----\n",
      "expires_on": "2122-10-29T16:59:47Z",
      "issuer": "GlobalSign",
      "signature": "SHA256WithRSA",
      "status": "active",
      "updated_at": "2014-01-01T05:20:00Z",
      "uploaded_on": "2014-01-01T05:20:00Z"
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

## Upload Custom Origin Trust Store

**post** `/zones/{zone_id}/acm/custom_trust_store`

Upload a root CA certificate to the Custom Origin Trust Store for a Zone. Only root CA certificates are accepted.

### Path Parameters

- `zone_id: string`

  Identifier.

### Body Parameters

- `certificate: string`

  The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

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

- `result: optional CustomTrustStore`

  - `id: string`

    Identifier.

  - `certificate: string`

    The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

  - `expires_on: string`

    When the certificate expires.

  - `issuer: string`

    The certificate authority that issued the certificate.

  - `signature: string`

    The type of hash used for the certificate.

  - `status: "initializing" or "pending_deployment" or "active" or 3 more`

    Status of the zone's custom SSL.

    - `"initializing"`

    - `"pending_deployment"`

    - `"active"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"expired"`

  - `updated_at: string`

    When the certificate was last modified.

  - `uploaded_on: string`

    When the certificate was uploaded to Cloudflare.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/custom_trust_store \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\\n-----END CERTIFICATE-----\\n"
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\n-----END CERTIFICATE-----\n",
    "expires_on": "2122-10-29T16:59:47Z",
    "issuer": "GlobalSign",
    "signature": "SHA256WithRSA",
    "status": "active",
    "updated_at": "2014-01-01T05:20:00Z",
    "uploaded_on": "2014-01-01T05:20:00Z"
  }
}
```

## Custom Origin Trust Store Details

**get** `/zones/{zone_id}/acm/custom_trust_store/{custom_origin_trust_store_id}`

Retrieves details about a specific root CA certificate in the custom origin trust store, including expiration and subject information.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_origin_trust_store_id: string`

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

- `result: optional CustomTrustStore`

  - `id: string`

    Identifier.

  - `certificate: string`

    The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

  - `expires_on: string`

    When the certificate expires.

  - `issuer: string`

    The certificate authority that issued the certificate.

  - `signature: string`

    The type of hash used for the certificate.

  - `status: "initializing" or "pending_deployment" or "active" or 3 more`

    Status of the zone's custom SSL.

    - `"initializing"`

    - `"pending_deployment"`

    - `"active"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"expired"`

  - `updated_at: string`

    When the certificate was last modified.

  - `uploaded_on: string`

    When the certificate was uploaded to Cloudflare.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/custom_trust_store/$CUSTOM_ORIGIN_TRUST_STORE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353",
    "certificate": "-----BEGIN CERTIFICATE-----\nMIIDdjCCAl6gAwIBAgIJAPnMg0Fs+/B0MA0GCSqGSIb3DQEBCwUAMFsx...\n-----END CERTIFICATE-----\n",
    "expires_on": "2122-10-29T16:59:47Z",
    "issuer": "GlobalSign",
    "signature": "SHA256WithRSA",
    "status": "active",
    "updated_at": "2014-01-01T05:20:00Z",
    "uploaded_on": "2014-01-01T05:20:00Z"
  }
}
```

## Delete Custom Origin Trust Store

**delete** `/zones/{zone_id}/acm/custom_trust_store/{custom_origin_trust_store_id}`

Removes a root CA certificate from the custom origin trust store. Origins using certificates signed by this CA will no longer be trusted.

### Path Parameters

- `zone_id: string`

  Identifier.

- `custom_origin_trust_store_id: string`

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

- `result: optional object { id }`

  - `id: optional string`

    Identifier.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/acm/custom_trust_store/$CUSTOM_ORIGIN_TRUST_STORE_ID \
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
    "id": "023e105f4ecef8ad9ca31a8372d0c353"
  }
}
```

## Domain Types

### Custom Trust Store

- `CustomTrustStore object { id, certificate, expires_on, 5 more }`

  - `id: string`

    Identifier.

  - `certificate: string`

    The root CA certificate in PEM format. Only root CA certificates are accepted; intermediate and leaf certificates are not supported.

  - `expires_on: string`

    When the certificate expires.

  - `issuer: string`

    The certificate authority that issued the certificate.

  - `signature: string`

    The type of hash used for the certificate.

  - `status: "initializing" or "pending_deployment" or "active" or 3 more`

    Status of the zone's custom SSL.

    - `"initializing"`

    - `"pending_deployment"`

    - `"active"`

    - `"pending_deletion"`

    - `"deleted"`

    - `"expired"`

  - `updated_at: string`

    When the certificate was last modified.

  - `uploaded_on: string`

    When the certificate was uploaded to Cloudflare.

### Custom Trust Store Delete Response

- `CustomTrustStoreDeleteResponse object { id }`

  - `id: optional string`

    Identifier.
