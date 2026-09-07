## List mTLS certificates

**get** `/accounts/{account_id}/mtls_certificates`

Lists all mTLS certificates uploaded to your account, such as Bring Your Own CA (BYO-CA) for mTLS. To list certificates issued by the Cloudflare managed CA, use the [List Client Certificates endpoint](/api/resources/client_certificates/methods/list/).

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `type: optional array of "custom" or "gateway_managed" or "access_managed"`

  Filters results by certificate type. Multiple types can be comma-separated.

  - `"custom"`

  - `"gateway_managed"`

  - `"access_managed"`

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

- `result: optional array of MTLSCertificate`

  - `id: optional string`

    Identifier.

  - `ca: optional boolean`

    Indicates whether the certificate is a CA or leaf certificate.

  - `certificates: optional string`

    The uploaded root CA certificate.

  - `expires_on: optional string`

    When the certificate expires.

  - `issuer: optional string`

    The certificate authority that issued the certificate.

  - `name: optional string`

    Optional unique name for the certificate. Only used for human readability.

  - `serial_number: optional string`

    The certificate serial number.

  - `signature: optional string`

    The type of hash used for the certificate.

  - `type: optional "custom" or "gateway_managed" or "access_managed"`

    The type of the certificate, indicating how it was created and who manages it.

    - `"custom"`

    - `"gateway_managed"`

    - `"access_managed"`

  - `uploaded_on: optional string`

    This is the time the certificate was uploaded.

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

    Total pages available of results.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/mtls_certificates \
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
      "ca": true,
      "certificates": "-----BEGIN CERTIFICATE-----\nMIIDmDCCAoCgAwIBAgIUKTOAZNjcXVZRj4oQt0SHsl1c1vMwDQYJKoZIhvcNAQEL\nBQAwUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgMDVNhbiBGcmFuY2lzY28xEzARBgNV\nBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4YW1wbGUgSW5jLjAgFw0yMjExMjIx\nNjU5NDdaGA8yMTIyMTAyOTE2NTk0N1owUTELMAkGA1UEBhMCVVMxFjAUBgNVBAgM\nDVNhbiBGcmFuY2lzY28xEzARBgNVBAcMCkNhbGlmb3JuaWExFTATBgNVBAoMDEV4\nYW1wbGUgSW5jLjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAMRcORwg\nJFTdcG/2GKI+cFYiOBNDKjCZUXEOvXWY42BkH9wxiMT869CO+enA1w5pIrXow6kC\nM1sQspHHaVmJUlotEMJxyoLFfA/8Kt1EKFyobOjuZs2SwyVyJ2sStvQuUQEosULZ\nCNGZEqoH5g6zhMPxaxm7ZLrrsDZ9maNGVqo7EWLWHrZ57Q/5MtTrbxQL+eXjUmJ9\nK3kS+3uEwMdqR6Z3BluU1ivanpPc1CN2GNhdO0/hSY4YkGEnuLsqJyDd3cIiB1Mx\nuCBJ4ZaqOd2viV1WcP3oU3dxVPm4MWyfYIldMWB14FahScxLhWdRnM9YZ/i9IFcL\nypXsuz7DjrJPtPUCAwEAAaNmMGQwHQYDVR0OBBYEFP5JzLUawNF+c3AXsYTEWHh7\nz2czMB8GA1UdIwQYMBaAFP5JzLUawNF+c3AXsYTEWHh7z2czMA4GA1UdDwEB/wQE\nAwIBBjASBgNVHRMBAf8ECDAGAQH/AgEBMA0GCSqGSIb3DQEBCwUAA4IBAQBc+Be7\nNDhpE09y7hLPZGRPl1cSKBw4RI0XIv6rlbSTFs5EebpTGjhx/whNxwEZhB9HZ711\n1Oa1YlT8xkI9DshB78mjAHCKBAJ76moK8tkG0aqdYpJ4ZcJTVBB7l98Rvgc7zfTi\ni7WemTy72deBbSeiEtXavm4EF0mWjHhQ5Nxpnp00Bqn5g1x8CyTDypgmugnep+xG\n+iFzNmTdsz7WI9T/7kDMXqB7M/FPWBORyS98OJqNDswCLF8bIZYwUBEe+bRHFomo\nShMzaC3tvim7WCb16noDkSTMlfKO4pnvKhpcVdSgwcruATV7y+W+Lvmz2OT/Gui4\nJhqeoTewsxndhDDE\n-----END CERTIFICATE-----",
      "expires_on": "2122-10-29T16:59:47Z",
      "issuer": "O=Example Inc.,L=California,ST=San Francisco,C=US",
      "name": "example_ca_cert",
      "serial_number": "235217144297995885180570755458463043449861756659",
      "signature": "SHA256WithRSA",
      "type": "custom",
      "uploaded_on": "2022-11-22T17:32:30.467938Z"
    }
  ],
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 50,
    "total_count": 1,
    "total_pages": 1
  }
}
```
