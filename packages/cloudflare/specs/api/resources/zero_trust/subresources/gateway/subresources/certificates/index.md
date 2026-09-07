# Certificates

## List Zero Trust certificates

**get** `/accounts/{account_id}/gateway/certificates`

List all Zero Trust certificates for an account.

### Path Parameters

- `account_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional array of object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Indicate the total number of results for the requested service.

  - `page: optional number`

    Indicate the current page within a paginated list of results.

  - `per_page: optional number`

    Indicate the number of results per page.

  - `total_count: optional number`

    Indicate the total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates \
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
      "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
      "binding_status": "pending_deployment",
      "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
      "created_at": "2014-01-01T05:20:00.12345Z",
      "expires_on": "2014-01-01T05:20:00.12345Z",
      "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
      "in_use": true,
      "issuer_org": "Example Inc.",
      "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
      "type": "gateway_managed",
      "updated_at": "2014-01-01T05:20:00.12345Z",
      "uploaded_on": "2014-01-01T05:20:00.12345Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Get Zero Trust certificate details

**get** `/accounts/{account_id}/gateway/certificates/{certificate_id}`

Get a single Zero Trust certificate.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Create Zero Trust certificate

**post** `/accounts/{account_id}/gateway/certificates`

Create a new Zero Trust certificate.

### Path Parameters

- `account_id: string`

### Body Parameters

- `validity_period_days: optional number`

  Sets the certificate validity period in days (range: 1-10,950 days / ~30 years). Defaults to 1,825 days (5 years). **Important**: This field is only settable during the certificate creation.  Certificates becomes immutable after creation - use the `/activate` and `/deactivate` endpoints to manage certificate lifecycle.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates \
    -X POST \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Delete Zero Trust certificate

**delete** `/accounts/{account_id}/gateway/certificates/{certificate_id}`

Delete a gateway-managed Zero Trust certificate. You must deactivate the certificate from the edge (inactive) before deleting it.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID \
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
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Activate a Zero Trust certificate

**post** `/accounts/{account_id}/gateway/certificates/{certificate_id}/activate`

Bind a single Zero Trust certificate to the edge.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Body Parameters

- `body: unknown`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID/activate \
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Deactivate a Zero Trust certificate

**post** `/accounts/{account_id}/gateway/certificates/{certificate_id}/deactivate`

Unbind a single Zero Trust certificate from the edge.

### Path Parameters

- `account_id: string`

- `certificate_id: string`

  Identify the certificate with a UUID.

### Body Parameters

- `body: unknown`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `success: true`

  Indicate whether the API call was successful.

  - `true`

- `result: optional object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/gateway/certificates/$CERTIFICATE_ID/deactivate \
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
  "success": true,
  "result": {
    "id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
    "binding_status": "pending_deployment",
    "certificate": "-----BEGIN CERTIFICATE-----\\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQELBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIxNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwgJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kCM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9K3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1MxuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcLypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7z2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQEAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7NDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ7111Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTii7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomoShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4JhqeoTewsxndhDDE\\n-----END CERTIFICATE-----\\n",
    "created_at": "2014-01-01T05:20:00.12345Z",
    "expires_on": "2014-01-01T05:20:00.12345Z",
    "fingerprint": "E9:19:49:AA:DD:D8:1E:C1:20:2A:D8:22:BF:A5:F8:FC:1A:F7:10:9F:C7:5B:69:AB:0:31:91:8B:61:B4:BF:1C",
    "in_use": true,
    "issuer_org": "Example Inc.",
    "issuer_raw": "O=Example Inc.,L=California,ST=San Francisco,C=US",
    "type": "gateway_managed",
    "updated_at": "2014-01-01T05:20:00.12345Z",
    "uploaded_on": "2014-01-01T05:20:00.12345Z"
  }
}
```

## Domain Types

### Certificate List Response

- `CertificateListResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Get Response

- `CertificateGetResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Create Response

- `CertificateCreateResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Delete Response

- `CertificateDeleteResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Activate Response

- `CertificateActivateResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`

### Certificate Deactivate Response

- `CertificateDeactivateResponse object { id, binding_status, certificate, 9 more }`

  - `id: optional string`

    Identify the certificate with a UUID.

  - `binding_status: optional "pending_deployment" or "available" or "pending_deletion" or "inactive"`

    Indicate the read-only deployment status of the certificate on Cloudflare's edge. Gateway TLS interception can use certificates in the 'available' (previously called 'active') state.

    - `"pending_deployment"`

    - `"available"`

    - `"pending_deletion"`

    - `"inactive"`

  - `certificate: optional string`

    Provide the CA certificate (read-only).

  - `created_at: optional string`

  - `expires_on: optional string`

  - `fingerprint: optional string`

    Provide the SHA256 fingerprint of the certificate (read-only).

  - `in_use: optional boolean`

    Indicate whether Gateway TLS interception uses this certificate (read-only). You cannot set this value directly. To configure interception, use the Gateway configuration setting named `certificate` (read-only).

  - `issuer_org: optional string`

    Indicate the organization that issued the certificate (read-only).

  - `issuer_raw: optional string`

    Provide the entire issuer field of the certificate (read-only).

  - `type: optional "custom" or "gateway_managed"`

    Indicate the read-only certificate type, BYO-PKI (custom) or Gateway-managed.

    - `"custom"`

    - `"gateway_managed"`

  - `updated_at: optional string`

  - `uploaded_on: optional string`
