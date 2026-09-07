## Get IP address details

**get** `/radar/entities/ip`

Retrieves IP address information.

### Query Parameters

- `ip: string`

  IP address.

- `format: optional "JSON" or "CSV"`

  Format in which results will be returned.

  - `"JSON"`

  - `"CSV"`

### Returns

- `result: object { ip }`

  - `ip: object { asn, asnLocation, asnName, 5 more }`

    - `asn: string`

    - `asnLocation: string`

    - `asnName: string`

    - `asnOrgName: string`

    - `ip: string`

    - `ipVersion: string`

    - `location: string`

    - `locationName: string`

- `success: boolean`

### Example

```http
curl https://api.cloudflare.com/client/v4/radar/entities/ip \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

#### Response

```json
{
  "result": {
    "ip": {
      "asn": "15169",
      "asnLocation": "US",
      "asnName": "GOOGLE",
      "asnOrgName": "Google LLC",
      "ip": "8.8.8.8",
      "ipVersion": "IPv4",
      "location": "GB",
      "locationName": "United Kingdom"
    }
  },
  "success": true
}
```
