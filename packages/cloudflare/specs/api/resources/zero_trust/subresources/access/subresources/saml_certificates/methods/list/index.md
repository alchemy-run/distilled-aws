## List SAML certificate sets

**get** `/accounts/{account_id}/access/saml_certificates`

Returns a paginated list of the organization's SAML encryption certificate sets.
Each certificate set includes the current and (if present) previous certificates.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `id: optional string`

  Filter by SAML certificate set UID. Accepts a comma-separated list of UIDs.

- `page: optional number`

  Page number of paginated results.

- `per_page: optional number`

  Maximum number of results per page.

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

- `result: optional array of object { created_at, uid, updated_at, 2 more }`

  - `created_at: string`

    When the certificate set was created

  - `uid: string`

    Unique identifier for the certificate set

  - `updated_at: string`

    When the certificate set was last updated

  - `current_certificate: optional object { is_current, not_after, public_certificate, uid }`

    The current active certificate

    - `is_current: boolean`

      Indicates whether the certificate can be used for IdP configuration.

    - `not_after: string`

      Certificate expiration date

    - `public_certificate: string`

      The public certificate in PEM format

    - `uid: string`

      Unique identifier for the certificate

  - `previous_certificate: optional unknown`

    The previous certificate (maintained during rotation period). May be null when no rotation has occurred. Mirrors the structure of `saml_certificate`.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/access/saml_certificates \
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
      "created_at": "2024-03-21T10:30:00Z",
      "uid": "a5bb4b3f-c2d1-4e6a-8f9b-1d3e4f5a6b7c",
      "updated_at": "2024-03-21T10:30:00Z",
      "current_certificate": {
        "is_current": true,
        "not_after": "2027-03-21T12:00:00Z",
        "public_certificate": "-----BEGIN CERTIFICATE-----\nMIIGAjCCA+qgAwIBAgIJAI7kymlF7CWT...\n...certificate content...\n-----END CERTIFICATE-----\n",
        "uid": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415"
      },
      "previous_certificate": {}
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
