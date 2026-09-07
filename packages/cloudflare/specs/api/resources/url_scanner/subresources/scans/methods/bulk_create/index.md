## Bulk create URL Scans

**post** `/accounts/{account_id}/urlscanner/v2/bulk`

Submit URLs to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/ and take into account scans submitted in bulk have lower priority and may take longer to finish.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `body: optional array of object { url, agentReadiness, customagent, 4 more }`

  List of urls to scan (up to a 100).

  - `url: string`

  - `agentReadiness: optional boolean`

    Enable agent readiness checks.

  - `customagent: optional string`

  - `customHeaders: optional map[string]`

    Set custom headers.

  - `referer: optional string`

  - `screenshotsResolutions: optional array of "desktop" or "mobile" or "tablet"`

    Take multiple screenshots targeting different device types.

    - `"desktop"`

    - `"mobile"`

    - `"tablet"`

  - `visibility: optional "Public" or "Unlisted"`

    The option `Public` means it will be included in listings like recent scans and search results. `Unlisted` means it will not be included in the aforementioned listings, users will need to have the scan's ID to access it. A a scan will be automatically marked as unlisted if it fails, if it contains potential PII or other sensitive material.

    - `"Public"`

    - `"Unlisted"`

### Returns

- `api: string`

  URL to api report.

- `result: string`

  URL to report.

- `url: string`

  Submitted URL

- `uuid: string`

  Scan ID.

- `visibility: "public" or "unlisted"`

  Submitted visibility status.

  - `"public"`

  - `"unlisted"`

- `options: optional object { useragent }`

  - `useragent: optional string`

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/bulk \
    -X POST \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
[
  {
    "api": "api",
    "result": "result",
    "url": "url",
    "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
    "visibility": "public",
    "options": {
      "useragent": "useragent"
    }
  }
]
```
