# DNS

## Get Passive DNS by IP

**get** `/accounts/{account_id}/intel/dns`

Gets a list of all the domains that have resolved to a specific IP address.

### Path Parameters

- `account_id: string`

  Identifier.

### Query Parameters

- `ipv4: optional string`

- `page: optional number`

  Requested page within paginated list of results.

- `per_page: optional number`

  Maximum number of results requested.

- `start_end_params: optional object { end, start }`

  - `end: optional string`

    Defaults to the current date.

  - `start: optional string`

    Defaults to 30 days before the end parameter value.

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

- `result: optional DNS`

  - `count: optional number`

    Total results returned based on your search parameters.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `reverse_records: optional array of object { first_seen, hostname, last_seen }`

    Reverse DNS look-ups observed during the time period.

    - `first_seen: optional string`

      First seen date of the DNS record during the time period.

    - `hostname: optional string`

      Hostname that the IP was observed resolving to.

    - `last_seen: optional string`

      Last seen date of the DNS record during the time period.

- `result_info: optional object { count, page, per_page, total_count }`

  - `count: optional number`

    Total number of results for the requested service.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `total_count: optional number`

    Total results available without any search parameters.

### Example

```http
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/intel/dns \
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
    "count": 1,
    "page": 1,
    "per_page": 20,
    "reverse_records": [
      {
        "first_seen": "2021-04-01",
        "hostname": "hostname",
        "last_seen": "2021-04-30"
      }
    ]
  },
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Domain Types

### DNS

- `DNS object { count, page, per_page, reverse_records }`

  - `count: optional number`

    Total results returned based on your search parameters.

  - `page: optional number`

    Current page within paginated list of results.

  - `per_page: optional number`

    Number of results per page of results.

  - `reverse_records: optional array of object { first_seen, hostname, last_seen }`

    Reverse DNS look-ups observed during the time period.

    - `first_seen: optional string`

      First seen date of the DNS record during the time period.

    - `hostname: optional string`

      Hostname that the IP was observed resolving to.

    - `last_seen: optional string`

      Last seen date of the DNS record during the time period.
