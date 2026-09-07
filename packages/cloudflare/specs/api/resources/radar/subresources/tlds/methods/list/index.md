## List TLDs

**get** `/radar/tlds`

Retrieves a list of TLDs.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `offset: optional number`

  Skips the specified number of objects before fetching the results.

- `tld: optional string`

  Filters results by top-level domain. Specify a comma-separated list of TLDs.

- `tldManager: optional string`

  Filters results by TLD manager.

- `tldType: optional "GENERIC" or "COUNTRY_CODE" or "GENERIC_RESTRICTED" or 2 more`

  Filters results by TLD type.

  - `"GENERIC"`

  - `"COUNTRY_CODE"`

  - `"GENERIC_RESTRICTED"`

  - `"INFRASTRUCTURE"`

  - `"SPONSORED"`

### Returns

- `result: object { tlds }`

  - `tlds: array of object { manager, tld, type }`

    - `manager: string`

      The organization that manages the TLD.

    - `tld: string`

      The actual TLD.

    - `type: string`

      The type of TLD.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/tlds \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "tlds": [
      {
        "manager": "VeriSign Global Registry Services",
        "tld": "com",
        "type": "GENERIC"
      }
    ]
  },
  "success": true
}
```
