## Get TLD details

**get** `/radar/tlds/{tld}`

Retrieves the requested TLD information.

### Path Parameters

- `tld: string`

  Top-level domain.

### Query Parameters

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { tld }`

  - `tld: object { manager, tld, type }`

    - `manager: string`

      The organization that manages the TLD.

    - `tld: string`

      The actual TLD.

    - `type: string`

      The type of TLD.

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/tlds/$TLD \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "tld": {
      "manager": "VeriSign Global Registry Services",
      "tld": "com",
      "type": "GENERIC"
    }
  },
  "success": true
}
```
