# Search

## Search for locations, ASes, reports, and more

**get** `/radar/search/global`

Searches for locations, autonomous systems, reports, bots, certificate logs, certificate authorities, industries and verticals. Location names can be localized by sending an `Accept-Language` HTTP header with a BCP 47 language tag (e.g., `Accept-Language: pt-PT`). The full quality-value chain is supported (e.g., `pt-PT,pt;q=0.9,en;q=0.8`).

### Query Parameters

- `query: string`

  String used to perform the search operation.

- `exclude: optional array of "ADM1S" or "ASNS" or "BOTS" or 9 more`

  Search types excluded from results.

  - `"ADM1S"`

  - `"ASNS"`

  - `"BOTS"`

  - `"CERTIFICATE_AUTHORITIES"`

  - `"CERTIFICATE_LOGS"`

  - `"ORIGINS"`

  - `"ORIGIN_REGIONS"`

  - `"INDUSTRIES"`

  - `"LOCATIONS"`

  - `"NOTEBOOKS"`

  - `"TLDS"`

  - `"VERTICALS"`

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

- `include: optional array of "ADM1S" or "ASNS" or "BOTS" or 9 more`

  Search types included in results.

  - `"ADM1S"`

  - `"ASNS"`

  - `"BOTS"`

  - `"CERTIFICATE_AUTHORITIES"`

  - `"CERTIFICATE_LOGS"`

  - `"ORIGINS"`

  - `"ORIGIN_REGIONS"`

  - `"INDUSTRIES"`

  - `"LOCATIONS"`

  - `"NOTEBOOKS"`

  - `"TLDS"`

  - `"VERTICALS"`

- `limit: optional number`

  Limits the number of objects returned in the response.

- `limitPerGroup: optional number`

  Limits the number of objects per search category.

### Returns

- `result: object { search }`

  - `search: array of object { code, name, type }`

    - `code: string`

    - `name: string`

    - `type: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/search/global \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "search": [
      {
        "code": "13335",
        "name": "Cloudflare",
        "type": "asn"
      }
    ]
  },
  "success": true
}
```

## Domain Types

### Search Global Response

- `SearchGlobalResponse object { search }`

  - `search: array of object { code, name, type }`

    - `code: string`

    - `name: string`

    - `type: string`
