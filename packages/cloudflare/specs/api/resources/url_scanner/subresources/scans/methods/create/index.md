## Create URL Scan

**post** `/accounts/{account_id}/urlscanner/v2/scan`

Submit a URL to scan. Check limits at https://developers.cloudflare.com/security-center/investigate/scan-limits/.

### Path Parameters

- `account_id: string`

  Account ID.

### Body Parameters

- `url: string`

- `agentReadiness: optional boolean`

  Enable agent readiness checks.

- `country: optional "AF" or "AL" or "DZ" or 192 more`

  Country to geo egress from

  - `"AF"`

  - `"AL"`

  - `"DZ"`

  - `"AD"`

  - `"AO"`

  - `"AG"`

  - `"AR"`

  - `"AM"`

  - `"AU"`

  - `"AT"`

  - `"AZ"`

  - `"BH"`

  - `"BD"`

  - `"BB"`

  - `"BY"`

  - `"BE"`

  - `"BZ"`

  - `"BJ"`

  - `"BM"`

  - `"BT"`

  - `"BO"`

  - `"BA"`

  - `"BW"`

  - `"BR"`

  - `"BN"`

  - `"BG"`

  - `"BF"`

  - `"BI"`

  - `"KH"`

  - `"CM"`

  - `"CA"`

  - `"CV"`

  - `"KY"`

  - `"CF"`

  - `"TD"`

  - `"CL"`

  - `"CN"`

  - `"CO"`

  - `"KM"`

  - `"CG"`

  - `"CR"`

  - `"CI"`

  - `"HR"`

  - `"CU"`

  - `"CY"`

  - `"CZ"`

  - `"CD"`

  - `"DK"`

  - `"DJ"`

  - `"DM"`

  - `"DO"`

  - `"EC"`

  - `"EG"`

  - `"SV"`

  - `"GQ"`

  - `"ER"`

  - `"EE"`

  - `"SZ"`

  - `"ET"`

  - `"FJ"`

  - `"FI"`

  - `"FR"`

  - `"GA"`

  - `"GE"`

  - `"DE"`

  - `"GH"`

  - `"GR"`

  - `"GL"`

  - `"GD"`

  - `"GT"`

  - `"GN"`

  - `"GW"`

  - `"GY"`

  - `"HT"`

  - `"HN"`

  - `"HU"`

  - `"IS"`

  - `"IN"`

  - `"ID"`

  - `"IR"`

  - `"IQ"`

  - `"IE"`

  - `"IL"`

  - `"IT"`

  - `"JM"`

  - `"JP"`

  - `"JO"`

  - `"KZ"`

  - `"KE"`

  - `"KI"`

  - `"KW"`

  - `"KG"`

  - `"LA"`

  - `"LV"`

  - `"LB"`

  - `"LS"`

  - `"LR"`

  - `"LY"`

  - `"LI"`

  - `"LT"`

  - `"LU"`

  - `"MO"`

  - `"MG"`

  - `"MW"`

  - `"MY"`

  - `"MV"`

  - `"ML"`

  - `"MR"`

  - `"MU"`

  - `"MX"`

  - `"FM"`

  - `"MD"`

  - `"MC"`

  - `"MN"`

  - `"MS"`

  - `"MA"`

  - `"MZ"`

  - `"MM"`

  - `"NA"`

  - `"NR"`

  - `"NP"`

  - `"NL"`

  - `"NZ"`

  - `"NI"`

  - `"NE"`

  - `"NG"`

  - `"KP"`

  - `"MK"`

  - `"NO"`

  - `"OM"`

  - `"PK"`

  - `"PS"`

  - `"PA"`

  - `"PG"`

  - `"PY"`

  - `"PE"`

  - `"PH"`

  - `"PL"`

  - `"PT"`

  - `"QA"`

  - `"RO"`

  - `"RU"`

  - `"RW"`

  - `"SH"`

  - `"KN"`

  - `"LC"`

  - `"VC"`

  - `"WS"`

  - `"SM"`

  - `"ST"`

  - `"SA"`

  - `"SN"`

  - `"RS"`

  - `"SC"`

  - `"SL"`

  - `"SK"`

  - `"SI"`

  - `"SB"`

  - `"SO"`

  - `"ZA"`

  - `"KR"`

  - `"SS"`

  - `"ES"`

  - `"LK"`

  - `"SD"`

  - `"SR"`

  - `"SE"`

  - `"CH"`

  - `"SY"`

  - `"TW"`

  - `"TJ"`

  - `"TZ"`

  - `"TH"`

  - `"BS"`

  - `"GM"`

  - `"TL"`

  - `"TG"`

  - `"TO"`

  - `"TT"`

  - `"TN"`

  - `"TR"`

  - `"TM"`

  - `"UG"`

  - `"UA"`

  - `"AE"`

  - `"GB"`

  - `"US"`

  - `"UY"`

  - `"UZ"`

  - `"VU"`

  - `"VE"`

  - `"VN"`

  - `"YE"`

  - `"ZM"`

  - `"ZW"`

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

- `message: string`

- `result: string`

  Public URL to report.

- `url: string`

  Canonical form of submitted URL. Use this if you want to later search by URL.

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/urlscanner/v2/scan \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '{
          "url": "https://www.example.com"
        }'
```

#### Response

```json
{
  "api": "api",
  "message": "Submission successful",
  "result": "result",
  "url": "url",
  "uuid": "182bd5e5-6e1a-4fe4-a799-aa6d9a6ab26e",
  "visibility": "public",
  "options": {
    "useragent": "useragent"
  }
}
```
