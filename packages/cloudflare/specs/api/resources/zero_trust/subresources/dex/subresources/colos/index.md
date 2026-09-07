# Colos

## List Cloudflare colos

**get** `/accounts/{account_id}/dex/colos`

List Cloudflare colos that account's devices were connected to during a time period, sorted by usage starting from the most used colo. Colos without traffic are also returned and sorted alphabetically.

### Path Parameters

- `account_id: string`

  Unique identifier linked to an account.

### Query Parameters

- `from: string`

  Start time for connection period in ISO (RFC3339 - ISO 8601) format.

- `to: string`

  End time for connection period in ISO (RFC3339 - ISO 8601) format.

- `sortBy: optional "fleet-status-usage" or "application-tests-usage"`

  Type of usage that colos should be sorted by. If unspecified, returns all Cloudflare colos sorted alphabetically.

  - `"fleet-status-usage"`

  - `"application-tests-usage"`

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

- `result: optional array of object { airportCode, city, countryCode }`

  array of colos.

  - `airportCode: string`

    Airport code

  - `city: string`

    City

  - `countryCode: string`

    Country code

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/dex/colos \
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
      "airportCode": "SFO",
      "city": "San Francisco",
      "countryCode": "US"
    }
  ]
}
```

## Domain Types

### Colo List Response

- `ColoListResponse object { airportCode, city, countryCode }`

  - `airportCode: string`

    Airport code

  - `city: string`

    City

  - `countryCode: string`

    Country code
