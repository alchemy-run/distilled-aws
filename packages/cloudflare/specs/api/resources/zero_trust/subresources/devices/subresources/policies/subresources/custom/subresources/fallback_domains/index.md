# Fallback Domains

## Get the Local Domain Fallback list for a device settings profile

**get** `/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains`

Fetches the list of domains to bypass Gateway DNS resolution from a specified device settings profile. These domains will use the specified local DNS resolver instead.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/fallback_domains \
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
  "result": [
    {
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```

## Set the Local Domain Fallback list for a device settings profile

**put** `/accounts/{account_id}/devices/policy/{policy_id}/fallback_domains`

Sets the list of domains to bypass Gateway DNS resolution. These domains will use the specified local DNS resolver instead. This will only apply to the specified device settings profile.

### Path Parameters

- `account_id: string`

- `policy_id: string`

### Body Parameters

- `domains: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

### Returns

- `errors: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

    - `pointer: optional string`

- `messages: array of ResponseInfo`

  - `code: number`

  - `message: string`

  - `documentation_url: optional string`

  - `source: optional object { pointer }`

- `result: array of FallbackDomain`

  - `suffix: string`

    The domain suffix to match when resolving locally.

  - `description: optional string`

    A description of the fallback domain, displayed in the client UI.

  - `dns_server: optional array of string`

    A list of IP addresses to handle domain resolution.

- `success: true`

  Whether the API call was successful.

  - `true`

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
curl https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/devices/policy/$POLICY_ID/fallback_domains \
    -X PUT \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
    -d '[
          {
            "suffix": "example.com",
            "description": "Domain bypass for local development",
            "dns_server": [
              "1.1.1.1"
            ]
          }
        ]'
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
  "result": [
    {
      "suffix": "example.com",
      "description": "Domain bypass for local development",
      "dns_server": [
        "1.1.1.1"
      ]
    }
  ],
  "success": true,
  "result_info": {
    "count": 1,
    "page": 1,
    "per_page": 20,
    "total_count": 2000
  }
}
```
