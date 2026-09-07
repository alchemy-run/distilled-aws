## List device ISPs

**get** `/accounts/{account_id}/dex/devices/{device_id}/isps`

List ISP information observed for a specific device during traceroute tests.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

- `device_id: string`

  API Resource UUID tag.

### Query Parameters

- `per_page: number`

  Number of items per page

- `cursor: optional string`

  Cursor for cursor-based pagination. Mutually exclusive with page.

- `from: optional string`

  Start time for the query in ISO 8601 format.

- `page: optional number`

  Page number of paginated results. Mutually exclusive with cursor.

- `sort_by: optional "time_start"`

  The field to sort results by.

  - `"time_start"`

- `sort_order: optional "ASC" or "DESC"`

  The order to sort results.

  - `"ASC"`

  - `"DESC"`

- `to: optional string`

  End time for the query in ISO 8601 format.

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

- `result: optional ISPs`

  - `isps: array of object { test_id, test_result_id, time_start, ip }`

    - `test_id: string`

      The test that generated this result.

    - `test_result_id: string`

      The specific test result.

    - `time_start: string`

      Timestamp of when the ISP was observed.

    - `ip: optional object { address, asn, aso, 4 more }`

      IP address information for the ISP hop. Fields marked as PII-gated (`name`, `address`, `netmask`, and all `location` sub-fields) will be returned as the literal string `"REDACTED"` for callers that do not have the PII permission. `asn`, `aso`, and `version` are always returned regardless of PII access.

      - `address: optional string`

        IP address. Returned as `"REDACTED"` without PII permission.

      - `asn: optional number`

        Autonomous System Number.

      - `aso: optional string`

        Autonomous System Organization name.

      - `location: optional object { city, country_iso, state_iso, zip }`

        Geographic location information. All fields are returned as the literal string `"REDACTED"` for callers that do not have the PII permission.

        - `city: optional string`

          City name. Returned as `"REDACTED"` without PII permission.

        - `country_iso: optional string`

          Country ISO code. Returned as `"REDACTED"` without PII permission.

        - `state_iso: optional string`

          State/province ISO code. Returned as `"REDACTED"` without PII permission.

        - `zip: optional string`

          ZIP/postal code. Returned as `"REDACTED"` without PII permission.

      - `name: optional string`

        Named IP address (reverse DNS hostname when available). Returned as `"REDACTED"` without PII permission.

      - `netmask: optional string`

        Network mask. Returned as `"REDACTED"` without PII permission.

      - `version: optional number`

        IP version (`1` for IPv4, `2` for IPv6, `0` if unknown).

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/devices/$DEVICE_ID/isps \
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
    "isps": [
      {
        "test_id": "f174e90a-fafe-4643-bbbc-4a0ed4fc8415",
        "test_result_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
        "time_start": "2024-06-01T12:00:00Z",
        "ip": {
          "address": "203.0.113.1",
          "asn": 13335,
          "aso": "CLOUDFLARENET",
          "location": {
            "city": "San Francisco",
            "country_iso": "US",
            "state_iso": "CA",
            "zip": "94107"
          },
          "name": "isp-gateway.example.com",
          "netmask": "255.255.255.0",
          "version": 1
        }
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000,
    "total_pages": 100
  }
}
```
