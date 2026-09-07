## Edit TLS setting for hostname

**put** `/zones/{zone_id}/hostnames/settings/{setting_id}/{hostname}`

Update the tls setting value for the hostname.

### Path Parameters

- `zone_id: string`

  Identifier.

- `setting_id: "ciphers" or "min_tls_version" or "http2"`

  The TLS Setting name.
  The value type depends on the setting:

  - `ciphers`: value is an array of cipher suite strings (e.g., `["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]`).
  - `min_tls_version`: value is a TLS version string (`"1.0"`, `"1.1"`, `"1.2"`, or `"1.3"`).
  - `http2`: value is `"on"` or `"off"`.

  - `"ciphers"`

  - `"min_tls_version"`

  - `"http2"`

- `hostname: string`

  The hostname for which the tls settings are set.

### Body Parameters

- `value: SettingValue`

  The TLS setting value.
  The type depends on the `setting_id` used in the request path:

  - `ciphers`: an array of allowed cipher suite strings in BoringSSL format (e.g., `["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]`).
  - `min_tls_version`: a string indicating the minimum TLS version — one of `"1.0"`, `"1.1"`, `"1.2"`, or `"1.3"` (e.g., `"1.2"`).
  - `http2`: a string indicating whether HTTP/2 is enabled — `"on"` or `"off"` (e.g., `"on"`).

  - `"1.0" or "1.1" or "1.2" or 3 more`

    - `"1.0"`

    - `"1.1"`

    - `"1.2"`

    - `"1.3"`

    - `"on"`

    - `"off"`

  - `array of string`

    Used when `setting_id` is `ciphers`. An array of allowed cipher suite strings.

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

- `result: optional Setting`

  - `created_at: optional string`

    This is the time the tls setting was originally created for this hostname.

  - `hostname: optional string`

    The hostname for which the tls settings are set.

  - `status: optional string`

    Deployment status for the given tls setting.

  - `updated_at: optional string`

    This is the time the tls setting was updated.

  - `value: optional SettingValue`

    The TLS setting value.
    The type depends on the `setting_id` used in the request path:

    - `ciphers`: an array of allowed cipher suite strings in BoringSSL format (e.g., `["ECDHE-RSA-AES128-GCM-SHA256", "AES128-GCM-SHA256"]`).
    - `min_tls_version`: a string indicating the minimum TLS version — one of `"1.0"`, `"1.1"`, `"1.2"`, or `"1.3"` (e.g., `"1.2"`).
    - `http2`: a string indicating whether HTTP/2 is enabled — `"on"` or `"off"` (e.g., `"on"`).

    - `"1.0" or "1.1" or "1.2" or 3 more`

      - `"1.0"`

      - `"1.1"`

      - `"1.2"`

      - `"1.3"`

      - `"on"`

      - `"off"`

    - `array of string`

      Used when `setting_id` is `ciphers`. An array of allowed cipher suite strings.

### Example

```http
curl https://api.cloudflare.com/client/v4/zones/$ZONE_ID/hostnames/settings/$SETTING_ID/$HOSTNAME \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "value": [
            "ECDHE-RSA-AES128-GCM-SHA256",
            "AES128-GCM-SHA256"
          ]
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
    "created_at": "2023-07-10T20:01:50.219171Z",
    "hostname": "app.example.com",
    "status": "pending_deployment",
    "updated_at": "2023-07-10T20:01:50.219171Z",
    "value": [
      "ECDHE-RSA-AES128-GCM-SHA256",
      "AES128-GCM-SHA256"
    ]
  }
}
```
